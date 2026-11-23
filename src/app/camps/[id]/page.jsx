import React from 'react';
import { redirect } from 'next/navigation';
import { INITIAL_ALL_CAMPS, getCampById, getAllCamps } from '../../../lib/campsData';
import { prisma, isPrismaConfigured } from '@/lib/prisma';
import { requestPms, pmsTenantId } from '@/lib/pmsServerBridge';
import { fetchLivePropertyDetails, fetchLivePropertyRooms } from '@/lib/pmsLiveAvailability';
import CampPropertyDetailClient from './CampPropertyDetailClient';

function ensureArray(val, fallback = []) {
    if (Array.isArray(val)) return val.filter(Boolean);
    if (typeof val === 'string' && val.trim()) {
        try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch {}
        return val.split(',').map(s => s.trim()).filter(Boolean);
    }
    return fallback;
}

async function resolveCamp(id) {
    if (!id) return null;

    // 1. Live PMS query via postgres connection pool (authoritative live database)
    try {
        const liveDetails = await fetchLivePropertyDetails(id);
        if (liveDetails) {
            const liveRooms = await fetchLivePropertyRooms(id);
            const basePrice = Number(liveDetails.basePrice || 0);
            const fallbackCamp = getCampById(id);
            const liveImage = (liveDetails.image && liveDetails.image.trim() && !liveDetails.image.startsWith('data:image'))
                ? liveDetails.image.trim()
                : (fallbackCamp?.image || '');
            const rawGallery = ensureArray(liveDetails.gallery, []).filter(img => typeof img === 'string' && !img.startsWith('data:image'));
            const liveGallery = rawGallery.length > 0 ? rawGallery : (fallbackCamp?.gallery || [liveImage].filter(Boolean));

            return {
                id: liveDetails.id,
                slug: liveDetails.slug || id,
                title: liveDetails.title || 'Sanctuary',
                shortTitle: liveDetails.shortTitle || liveDetails.title,
                name: liveDetails.title,
                category: liveDetails.category || 'Campsite',
                price: basePrice,
                basePrice: basePrice,
                originalPrice: basePrice > 0 ? Math.round(basePrice * 1.3) : 0,
                region: liveDetails.region || (liveDetails.location ? liveDetails.location.split(',')[0].trim() : '') || '',
                location: liveDetails.location || '',
                altitude: liveDetails.altitude || '',
                rating: Number(liveDetails.rating || 5.0),
                description: liveDetails.description || '',
                highlights: ensureArray(liveDetails.amenities || liveDetails.highlights, []),
                inclusions: ensureArray(liveDetails.inclusions, []),
                exclusions: ensureArray(liveDetails.exclusions, []),
                amenities: liveDetails.amenities || '',
                checkInTime: liveDetails.checkInTime || '',
                checkOutTime: liveDetails.checkOutTime || '',
                cancellationPolicy: liveDetails.cancellationPolicy || null,
                arrivalInstructions: Array.isArray(liveDetails.arrivalInstructions) ? liveDetails.arrivalInstructions : null,
                latitude: (liveDetails.latitude !== null && !isNaN(Number(liveDetails.latitude))) ? Number(liveDetails.latitude) : null,
                longitude: (liveDetails.longitude !== null && !isNaN(Number(liveDetails.longitude))) ? Number(liveDetails.longitude) : null,
                phone: (liveDetails.phone && liveDetails.phone !== 'null') ? liveDetails.phone : null,
                image: liveImage,
                gallery: liveGallery,
                isAvailable: liveDetails.isActive !== false,
                rooms: (Array.isArray(liveRooms) ? liveRooms : []).map(rt => {
                    const rawImagesList = Array.isArray(rt.images)
                        ? rt.images.filter(img => typeof img === 'string' && img.trim() && !img.startsWith('data:image'))
                        : (typeof rt.images === 'string' && rt.images.trim() && !rt.images.startsWith('data:image') ? [rt.images.trim()] : []);
                    const roomImage = rawImagesList[0] || '';
                    return {
                        id: rt.id,
                        name: rt.name,
                        price: Number(rt.price ?? rt.basePrice ?? basePrice),
                        basePrice: Number(rt.price ?? rt.basePrice ?? basePrice),
                        weekendPrice: rt.weekendPrice ? Number(rt.weekendPrice) : null,
                        capacity: rt.capacity || '2 Guests',
                        guestCapacity: rt.guestCapacity || 2,
                        totalUnits: Number(rt.totalUnits) || 1,
                        features: Array.isArray(rt.features) ? rt.features : [],
                        description: rt.description || '',
                        inventoryType: rt.inventoryType || 'PRIVATE_UNIT',
                        bedConfig: rt.bedConfig || '',
                        roomSizeSqFt: rt.roomSizeSqFt || null,
                        bathroomType: rt.bathroomType || '',
                        pricingModel: rt.pricingModel || (rt.inventoryType === 'DORM_BED' ? 'PER_BED' : 'PER_ROOM'),
                        image: roomImage,
                        images: rawImagesList
                    };
                })
            };
        }
    } catch (e) {
        console.error('Error fetching live property from PMS DB:', e);
    }

    // 2. PMS HTTP API bridge
    try {
        const pmsRes = await requestPms(`/api/properties?tenantId=${pmsTenantId()}`);
        if (pmsRes && pmsRes.payload && Array.isArray(pmsRes.payload.properties)) {
            const cleanTarget = String(id).toLowerCase().replace('pkg-', '').trim();
            const liveMatch = pmsRes.payload.properties.find(p => {
                const cleanPId = String(p.id).toLowerCase().replace('pkg-', '').trim();
                const cleanPSlug = String(p.slug || '').toLowerCase().replace('pkg-', '').trim();
                return p.id === id || p.slug === id || cleanPId === cleanTarget || cleanPSlug === cleanTarget;
            });
            if (liveMatch) return liveMatch;
        }
    } catch (e) {
        // Fall back gracefully if PMS is unreachable
    }

    // 3. Local Prisma database fallback
    if (isPrismaConfigured && prisma) {
        try {
            const rows = await prisma.$queryRawUnsafe(`
                SELECT p.id, p.title, p."shortTitle", p.slug, p.category, p.region, p.location, 
                       p.altitude, p."basePrice", p.rating, p.image, p.gallery, p.description, 
                       p.inclusions, p.exclusions, p.amenities, p."checkInTime", p."checkOutTime",
                       p."cancellationPolicy", p.latitude, p.longitude, p.phone, p."isActive",
                       p."arrivalInstructions",
                       COALESCE(
                           json_agg(
                                json_build_object(
                                    'id', rt.id, 
                                    'name', rt.name, 
                                    'price', rt."basePrice", 
                                    'basePrice', rt."basePrice", 
                                    'capacity', rt.capacity, 
                                    'totalUnits', rt."totalUnits", 
                                    'description', rt.description,
                                    'features', rt.features,
                                    'inventoryType', rt."inventoryType",
                                    'bedConfig', rt."bedConfig",
                                    'roomSizeSqFt', rt."roomSizeSqFt",
                                    'bathroomType', rt."bathroomType",
                                    'pricingModel', rt."pricingModel",
                                    'images', rt.images
                                )
                           ) FILTER (WHERE rt.id IS NOT NULL), '[]'::json
                       ) as rooms
                FROM "Property" p
                LEFT JOIN "RoomType" rt ON rt."propertyId" = p.id
                WHERE (p.id = $1 OR p.slug = $1) AND p."isActive" = true
                GROUP BY p.id
            `, id);

            if (Array.isArray(rows) && rows.length > 0) {
                const dbProp = rows[0];
                const basePrice = Number(dbProp.basePrice || 0);

                return {
                    id: dbProp.id,
                    slug: dbProp.slug || id,
                    title: dbProp.title || 'Wilderness Sanctuary',
                    shortTitle: dbProp.shortTitle || dbProp.title,
                    name: dbProp.title,
                    category: dbProp.category || 'Campsite',
                    price: basePrice,
                    basePrice: basePrice,
                    originalPrice: basePrice > 0 ? Math.round(basePrice * 1.3) : 0,
                    region: dbProp.region || (dbProp.location ? dbProp.location.split(',')[0].trim() : '') || '',
                    location: dbProp.location || '',
                    altitude: dbProp.altitude || '',
                    rating: Number(dbProp.rating || 5.0),
                    description: dbProp.description || '',
                    highlights: ensureArray(dbProp.highlights || dbProp.amenities, []),
                    inclusions: ensureArray(dbProp.inclusions, []),
                    exclusions: ensureArray(dbProp.exclusions, []),
                    amenities: dbProp.amenities || '',
                    checkInTime: dbProp.checkInTime || '',
                    checkOutTime: dbProp.checkOutTime || '',
                    cancellationPolicy: dbProp.cancellationPolicy || null,
                    arrivalInstructions: Array.isArray(dbProp.arrivalInstructions) ? dbProp.arrivalInstructions : null,
                    latitude: (dbProp.latitude !== null && !isNaN(Number(dbProp.latitude))) ? Number(dbProp.latitude) : null,
                    longitude: (dbProp.longitude !== null && !isNaN(Number(dbProp.longitude))) ? Number(dbProp.longitude) : null,
                    phone: (dbProp.phone && dbProp.phone !== 'null') ? dbProp.phone : null,
                    image: dbProp.image || '',
                    gallery: ensureArray(dbProp.gallery, []),
                    isAvailable: dbProp.isActive !== false,
                    rooms: (Array.isArray(dbProp.rooms) ? dbProp.rooms : []).map(rt => ({
                        id: rt.id,
                        name: rt.name,
                        price: Number(rt.price ?? rt.basePrice ?? basePrice),
                        basePrice: Number(rt.price ?? rt.basePrice ?? basePrice),
                        capacity: typeof rt.capacity === 'number' ? `${rt.capacity} Persons` : (rt.capacity || '2 Adults'),
                        totalUnits: Number(rt.totalUnits) || 1,
                        features: Array.isArray(rt.features) ? rt.features : [],
                        description: rt.description || '',
                        inventoryType: rt.inventoryType || 'PRIVATE_UNIT',
                        bedConfig: rt.bedConfig || '',
                        roomSizeSqFt: rt.roomSizeSqFt || null,
                        bathroomType: rt.bathroomType || '',
                        pricingModel: rt.pricingModel || (rt.inventoryType === 'DORM_BED' ? 'PER_BED' : 'PER_ROOM'),
                        image: (Array.isArray(rt.images) && rt.images[0]) ? rt.images[0] : (typeof rt.images === 'string' ? rt.images : '')
                    }))
                };
            }
        } catch (e) {
            console.error('Error in resolveCamp DB lookup:', e);
        }
    }

    // 4. Static catalog fallback
    const cleanTarget = String(id).toLowerCase().replace('pkg-', '').trim();
    const fallbackMatch = INITIAL_ALL_CAMPS.find(c => {
        const cleanId = String(c.id).toLowerCase().replace('pkg-', '').trim();
        const cleanSlug = String(c.slug || '').toLowerCase().replace('pkg-', '').trim();
        return cleanId === cleanTarget ||
               cleanSlug === cleanTarget ||
               c.id === id ||
               c.slug === id ||
               c.pmsPropertyId === id ||
               (Array.isArray(c.aliases) && c.aliases.includes(id));
    });
    return fallbackMatch || null;
}

export async function generateStaticParams() {
    const params = new Set();
    INITIAL_ALL_CAMPS.forEach(camp => {
        if (camp.id) params.add(camp.id);
        if (camp.slug) params.add(camp.slug);
        if (Array.isArray(camp.aliases)) {
            camp.aliases.forEach(a => params.add(a));
        }
    });
    return Array.from(params).map(id => ({ id }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const camp = await resolveCamp(id);

    if (!camp) {
        return {
            title: 'Mountain Sanctuary Not Found | Aanandham Stays',
            description: 'The requested mountain stay or highland sanctuary in Himachal or Munnar was not found.',
            robots: { index: false, follow: false }
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';
    const ogImage = camp.image ? (camp.image.startsWith('http') ? camp.image : `${siteUrl}${camp.image}`) : `${siteUrl}/logo.png`;
    
    // Strict 50-60 character titles with primary topic first, brand last
    let cleanTitle = `${camp.shortTitle || camp.title} | Aanandham Stays`;
    if (camp.id === 'the-nest-kalga' || camp.slug === 'the-nest-kalga') {
        cleanTitle = 'The Nest Kalga: Dorms & Stays in Kasol | Aanandham Stays';
    } else if (cleanTitle.length > 60) {
        cleanTitle = `${(camp.shortTitle || camp.title).slice(0, 42)} | Aanandham Stays`;
    }

    // Strict 140-160 character description
    let cleanDesc = camp.id === 'the-nest-kalga' || camp.slug === 'the-nest-kalga'
        ? 'Stay at The Nest Kalga at 7,900 FT in Parvati Valley. Affordable 10-bed dorms from ₹249, private balcony suites, sunrise deck, and homecooked Pahadi food.'
        : (camp.description && camp.description.length >= 140 && camp.description.length <= 160
            ? camp.description
            : `Book ${camp.shortTitle || camp.title} at ${camp.altitude || 'high altitude'} in ${camp.location || camp.region}. Verified boutique sanctuary with direct host rates.`);
    if (cleanDesc.length > 160) cleanDesc = cleanDesc.slice(0, 157) + '...';

    return {
        title: cleanTitle,
        description: cleanDesc,
        alternates: {
            canonical: `${siteUrl}/camps/${camp.slug || camp.id}`
        },
        openGraph: {
            title: cleanTitle,
            description: cleanDesc,
            url: `${siteUrl}/camps/${camp.slug || camp.id}`,
            siteName: 'Aanandham Stays',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: camp.title
                }
            ],
            type: 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: cleanTitle,
            description: cleanDesc,
            images: [ogImage]
        }
    };
}

export default async function CampPropertyDetailPage({ params }) {
    const { id } = await params;
    const camp = await resolveCamp(id);

    // If accessed via raw DB CUID or legacy alias, permanently redirect to clean slug URL
    if (camp && camp.slug && id !== camp.slug) {
        if (id === 'cmu7f7c7q0001jf2bn12igi66' || (Array.isArray(camp.aliases) && camp.aliases.includes(id)) || camp.pmsPropertyId === id) {
            redirect(`/camps/${camp.slug}`);
        }
    }
    const allCamps = getAllCamps();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';
    const isHimachal = camp?.region === 'Himachal' || camp?.id === 'the-nest-kalga' || camp?.slug === 'the-nest-kalga';

    const campJsonLd = camp ? {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LodgingBusiness",
                "@id": `${siteUrl}/camps/${camp.slug || camp.id}#lodging`,
                "name": camp.title,
                "description": camp.description,
                "image": camp.image ? (camp.image.startsWith('http') ? camp.image : `${siteUrl}${camp.image}`) : undefined,
                "url": `${siteUrl}/camps/${camp.slug || camp.id}`,
                "telephone": "+919074858014",
                "priceRange": isHimachal ? "₹249 - ₹1499" : `₹${camp.price || 1800}`,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": isHimachal ? "Kalga Village (above Barshaini Trail)" : (camp.location || "Suryanelli"),
                    "addressLocality": isHimachal ? "Kasol, Parvati Valley" : (camp.region || "Munnar"),
                    "addressRegion": isHimachal ? "Himachal Pradesh" : "Kerala",
                    "postalCode": isHimachal ? "175105" : "685618",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": camp.latitude || (isHimachal ? 31.9984 : 10.0889),
                    "longitude": camp.longitude || (isHimachal ? 77.4526 : 77.0595)
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": (camp.rating || 4.95).toString(),
                    "reviewCount": (camp.reviewsCount || 120).toString(),
                    "bestRating": "5",
                    "worstRating": "1"
                },
                "offers": {
                    "@type": "Offer",
                    "price": camp.price || (isHimachal ? 249 : 1800),
                    "priceCurrency": "INR",
                    "priceValidUntil": "2027-12-31",
                    "availability": "https://schema.org/InStock",
                    "url": `${siteUrl}/camps/${camp.slug || camp.id}`
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${siteUrl}/camps/${camp.slug || camp.id}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": siteUrl
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": isHimachal ? "Himachal Stays" : "Munnar Stays",
                        "item": isHimachal ? `${siteUrl}/camps/himachal` : `${siteUrl}/camps/munnar`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": camp.shortTitle || camp.title,
                        "item": `${siteUrl}/camps/${camp.slug || camp.id}`
                    }
                ]
            }
        ]
    } : null;

    return (
        <>
            {campJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(campJsonLd) }}
                />
            )}
            <CampPropertyDetailClient campId={id} initialCamp={camp} initialAllCamps={allCamps} />
        </>
    );
}
