"use client";
import { useState, useEffect, useRef, useMemo } from 'react';

const CONTAINER = { maxWidth: '1440px', margin: '0 auto', width: '100%' };
const IMG_FILL = { width: '100%', height: '100%', objectFit: 'cover' };
const SECTION_PAD = { position: 'relative', padding: '110px clamp(20px, 4vw, 48px)', background: '#F8F9F5' };

import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup, useMotionValue, useSpring, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Footer from '../components/Footer';
import SiteHeader from '../components/SiteHeader.jsx';
const BookingEngineModal = dynamic(() => import('../components/BookingEngineModal'), { ssr: false });
import { useAuth } from '../hooks/useAuth';
import { INITIAL_ALL_CAMPS, getAllCamps, getInitialCamps, saveAllCamps } from '../lib/campsData';
import { inr } from '../lib/utils';
import { waLink } from '../lib/whatsapp';
import { GraduationCap, Building2, Tent, Flame, Check, ChevronLeft, ChevronRight, ChevronDown, Download, Play, ShieldCheck, Stethoscope, Truck, Heart, MapPin, Clock, Zap, Camera, Search, MessageCircle, Star, Sunrise, Footprints, PersonStanding, Telescope, Leaf, Mountain, Waves, Link2, Sparkles } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from '../components/common/BrandIcons';
import { loadTestimonialsFromStorage } from '../lib/testimonialsCore';
import VerifiedStayBadge from '../components/common/VerifiedStayBadge';
import { SkeletonCampGrid, AssetImage } from '../components/common/SkeletonLoader';
import { treksData } from '@/content/treks';

// ── OVERVIEW HIGHLIGHTS DATA (Himachal-First with Kalga & Parvati Valley) ──
const OVERVIEW_HIGHLIGHTS = [
    {
        img: '/images/high-altitude-ridge-tent.jpg',
        title: 'Kalga Pine Homestays & Dorms',
        sub: 'Backpacker dorms from ₹249 & balcony rooms in Parvati Valley',
        objectPosition: 'center 60%'
    },
    {
        img: '/images/treks/kheerganga-trek-parvati-valley.jpg',
        title: '7,900 FT Alpine Trails & Apple Orchards',
        sub: 'Guided pine treks & orchard trails starting from Kalga Village',
        objectPosition: 'center 60%'
    },
    {
        img: '/images/acoustic-campfires-bbq.jpg',
        title: 'Acoustic Campfires & Warm Pahadi Dinners',
        sub: 'Starlit firesides & homecooked food under Himalayan skies',
        objectPosition: 'center center'
    }
];

// ── WHY AANANDHAM STAYS PILLARS (Field Notes) ──
const WHY_AANANDHAM_PILLARS = [
    {
        id: 'safety',
        badge: '100% Verified Safe',
        serial: 'STAY-TAG · 01',
        seal: 'VERIFIED SAFE',
        tagline: 'Private Grounds & En-suite Washrooms',
        title: '100% Safe For Solo & Families',
        fullTitle: '100% Female & Family-Safe Stays',
        desc: 'We eliminate uncertainty from mountain stays. Every property features private gated perimeters, dedicated on-site caretakers, clean modern western washrooms with running hot water, and 24/7 power backup.',
        image: '/images/treks/parvati-valley-himachal-hero.jpg',
        stat: 'Zero Safety Incidents',
        statIcon: ShieldCheck,
        rotation: '-1.2deg',
        paperBg: '#FFFDF6',
        accentColor: '#166534',
        highlights: ['Gated Private Property', '24/7 On-Site Hosts', 'Clean Western Washrooms & Hot Water', 'Family & Solo Female Friendly']
    },
    {
        id: 'handpicked',
        badge: 'Boutique Collection',
        serial: 'STAY-TAG · 02',
        seal: 'HANDPICKED',
        tagline: 'Himachal & Munnar Sanctuaries',
        title: 'Handpicked Mountain Stays',
        fullTitle: 'Owner-Operated Highland Sanctuaries',
        desc: 'We do not aggregate generic town hotels. Every property is personally inspected for its scenic ridge location, peaceful soul, and comfort — from pine retreats in Kasol to sunrise sky decks and timber cabins in Munnar.',
        image: '/images/treks/kasol-parvati-river-trail.jpg',
        stat: 'Owner-Operated Stays',
        statIcon: Mountain,
        rotation: '1.4deg',
        paperBg: '#FAF8EE',
        accentColor: '#B45309',
        highlights: ['Owner-Operated Boutique Stays', 'Panoramic Valley & Peak Views', 'Geodesic Domes & Timber Cabins', 'Clean En-Suite Washrooms']
    },
    {
        id: 'direct',
        badge: 'Direct Host Booking',
        serial: 'STAY-TAG · 03',
        seal: 'ZERO MARKUP',
        tagline: 'Direct WhatsApp Concierge',
        title: 'Zero Commission & Direct Rates',
        fullTitle: 'Direct Host Pricing & Zero OTA Commission',
        desc: 'Skip inflated 25% third-party portal commissions. Connect directly with our dedicated mountain desk on WhatsApp, receive honest local advice, and book at genuine direct property tariffs.',
        image: '/images/services/glamping-dome.jpg',
        stat: 'Zero OTA Fees',
        statIcon: Zap,
        rotation: '-1.0deg',
        paperBg: '#F7FAF4',
        accentColor: '#047857',
        highlights: ['100% Direct Property Tariffs', 'Zero Hidden Platform Fees', 'Direct WhatsApp Mountain Desk', 'Instant Reservation Confirmation']
    },
    {
        id: 'hospitality',
        badge: 'Highland Hospitality',
        serial: 'STAY-TAG · 04',
        seal: 'HOMECOOKED',
        tagline: 'Fresh Meals & Campfires',
        title: 'Warm Mountain Hospitality',
        fullTitle: 'Authentic Local Meals & Campfires',
        desc: 'Wake up to steaming hot tea overlooking mist-covered peaks. Enjoy authentic homecooked regional dinners (Pahadi specials in Himachal, traditional feast in Kerala), cozy firesides, and genuine local warmth.',
        image: '/images/acoustic-campfires-bbq.jpg',
        stat: 'Fresh Forest-to-Table',
        statIcon: Flame,
        rotation: '1.2deg',
        paperBg: '#F5F8FC',
        accentColor: '#1E40AF',
        highlights: ['Hot Homecooked Mountain Meals', 'Evening Fireside & Barbecue', 'Local Ridge Walk Guidance', 'Uncommercialized Solace']
    }
];

// ── STAY AMENITIES & HIGHLAND SOLACE ──
const EXPERIENCE_ITEMS = [
    {
        category: 'Sunrise & Mountain Decks',
        title: 'Sunrise Decks & Cloud Bed Vistas',
        desc: 'Wake up to golden cloud beds rolling below your private balcony or sky deck. Sip freshly brewed mountain Chai surrounded by crisp Himalayan and Western Ghats peaks.',
        icon: Sunrise
    },
    {
        category: 'Campfires & Firesides',
        title: 'Evening Campfires & Stargazing',
        desc: 'Gather around roaring woodfire pits under pristine, zero light-pollution dark skies. Savor live barbecue, acoustic tunes, and quiet conversation with fellow travelers.',
        icon: Flame
    },
    {
        category: 'Regional Dining',
        title: 'Homecooked Forest-to-Table Meals',
        desc: 'Savor authentic regional cuisine prepared by on-site family cooks. From hot Himachali Siddu and Rajma-Chawal to traditional Kerala Appam and rich coconut stews.',
        icon: Leaf
    },
    {
        category: 'Comfort & Sanctuaries',
        title: 'Heated Domes & Clean En-Suite Bathrooms',
        desc: 'Stay comfortably in insulated geodesic domes, hand-carved deodar cabins, or scenic alpine ridge dorms with clean modern western washrooms and running hot water.',
        icon: Mountain
    }
];

// ── 4-STEP STAYS BOOKING PROCESS ──
const FOUR_STEPS = [
    {
        num: '01',
        title: 'Discover Handpicked Mountain Stays',
        desc: 'Explore personally verified boutique mountain retreats, pine cottages, alpine dorms, sky deck domes, and valley ridge stays across Kasol and Munnar.'
    },
    {
        num: '02',
        title: 'Pick Your Accommodation Tier',
        desc: 'Choose from 10-bed alpine backpacker dorms, private balcony valley-view suites, insulated sky deck domes, or timber farm cabins to fit your journey and group size.'
    },
    {
        num: '03',
        title: 'Instant WhatsApp Concierge Check',
        desc: 'Connect directly with our mountain desk. Confirm live dates, ask room queries, and lock your stay with zero OTA commissions and transparent seasonal rates.'
    },
    {
        num: '04',
        title: 'Arrive, Relax & Savor Highland Hospitality',
        desc: 'Check in with dedicated on-site hosts. Enjoy hot mountain-cooked meals, evening campfire gatherings, clean modern western washrooms, and crisp alpine air.'
    }
];

// ── TESTIMONIALS DATA ──
const TESTIMONIALS = [
    {
        id: 1,
        quote: "The Nest Kalga was exactly what I needed. Waking up at 7,900 FT in Parvati Valley with hot Chai on the sunrise deck and snow peak views was unbelievable. Clean dorms and warm, down-to-earth hospitality.",
        author: "Arjun Varma",
        campBadge: "stay '26",
        batchDate: "The Nest Kalga, Parvati Valley",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ArjunVarma&backgroundColor=b6e3f4"
    },
    {
        id: 2,
        quote: "I traveled solo to Munnar and stayed at Kolukkumalai Teddy's Domes. As a woman traveling alone, I felt 100% secure. Gated grounds, clean en-suite washroom with hot water, and a breathtaking 4x4 sunrise safari.",
        author: "Anjali Menon",
        campBadge: "stay '26",
        batchDate: "Teddy's Sky Deck, Munnar",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AnjaliMenon&backgroundColor=ffd5dc"
    },
    {
        id: 3,
        quote: "We stayed in the Deluxe Balcony Suite at The Nest Kalga. Waking up to golden sunrise light pouring across Parvati Valley, hot Chai on the deck, and genuine local warmth was unforgettable.",
        author: "Gokul & Devika",
        campBadge: "stay '26",
        batchDate: "The Nest Kalga, Parvati Valley",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=GokulKrishnan&backgroundColor=c0aede"
    },
    {
        id: 4,
        quote: "Took my family to Suryanelli Valley Ridge Stay. Authentic regional Kerala buffet, immaculate washrooms, and sunset tea slope walks. Far more authentic and peaceful than crowded town hotels.",
        author: "Dr. Sneha Pillai",
        campBadge: "stay '26",
        batchDate: "Suryanelli Valley Ridge, Munnar",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=SnehaPillai&backgroundColor=d1d4f9"
    },
    {
        id: 5,
        quote: "Mini Mexico Vattavada was peaceful and pet-friendly. Handcrafted timber cabins nestled right in the step-farming valley with fresh strawberries and night campfires. 10/10 mountain stay experience.",
        author: "Nikhil R.",
        campBadge: "stay '26",
        batchDate: "Mini Mexico, Vattavada",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=NikhilDevika&backgroundColor=ffdfbf"
    }
];

// ── FAQ DATA ──
const FAQ_DATA = [
    {
        id: 'faq-01',
        num: '01',
        question: 'How do I book a stay with Aanandham Stays?',
        answer: 'You can explore our curated stays in Himachal (Kasol, Parvati Valley) and Munnar on this platform and tap "Enquire" or "Details" to connect directly with our mountain concierge on WhatsApp. We verify live room availability and confirm your booking without third-party OTA commissions.'
    },
    {
        id: 'faq-02',
        num: '02',
        question: 'How do I reach the stays in Himachal and Munnar?',
        answer: 'For The Nest Kalga (Himachal): Take a bus or cab from Delhi/Chandigarh to Kasol or Barshaini, then take a scenic 20-minute pine-trail walk up into Kalga Village. For Munnar stays (Suryanelli & Kolukkumalai): Fly to Kochi (COK) or take a train to Aluva, then take a scenic cab/bus to Suryanelli base. Dedicated 4x4 Jeep transfers are provided up to the Kolukkumalai tea ridge.'
    },
    {
        id: 'faq-03',
        num: '03',
        question: 'Are meals and campfire gatherings included?',
        answer: 'Yes! All stays include mountain-cooked dining (complimentary breakfast, authentic Kerala buffet or traditional Pahadi dinners) and evening campfire gatherings. Barbecue platters are available on request.'
    },
    {
        id: 'faq-04',
        num: '04',
        question: 'Is it safe for solo female travelers and families?',
        answer: '100% yes. Every stay in our collection is personally verified and owner-operated. We guarantee secure gated perimeters, 24/7 on-site hospitality hosts, and clean modern western washrooms with running hot water.'
    },
    {
        id: 'faq-05',
        num: '05',
        question: 'What are the check-in and check-out timings?',
        answer: 'Standard check-in is from 1:00 PM onwards and check-out is by 11:00 AM. Early check-in or luggage drop can be arranged with our mountain desk depending on availability.'
    },
    {
        id: 'faq-06',
        num: '06',
        question: 'Can I extend or customize my stay across multiple locations?',
        answer: 'Yes! Our mountain concierge can coordinate multi-day highland stays — for example, combining dorm beds and private balcony suites at The Nest Kalga, or a Suryanelli ridge stay with Kolukkumalai sunrise sky deck. Just message our concierge.'
    },
    {
        id: 'faq-07',
        num: '07',
        question: 'Does it snow in December, and are stays open for Christmas & New Year?',
        answer: 'Yes! Kalga Village (7,900 FT) in Parvati Valley receives scenic snowfall from mid-December. The Nest Kalga is fully winter-ready with wood-burning Bukhari heating, geysers, and warm quilts. We host acoustic fireside Christmas Eve and New Year celebrations. Early reservation is advised.'
    },
    {
        id: 'faq-08',
        num: '08',
        question: 'Can I do guided treks in Himachal during winter?',
        answer: 'Yes! Guided winter treks to Kheerganga (₹900/person) run throughout December and January, featuring natural 42°C hot sulphur spring bathing amidst snow peaks. Bhun Buni Thatch and Pulga fairy forest trails are also guided with winter safety gear.'
    }
];

// ── LUXURY HIGH-PERFORMANCE CLEAR REVEAL VARIANTS (Visible & Silky 60FPS) ──
const sectionReveal = {
    hidden: { opacity: 0, y: 36 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05
        }
    }
};

const cardReveal = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -36 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 36 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
};

// ── HIGH-PERFORMANCE INSTANT CTA BANNER ──
function CtaParallaxBanner({ onOpenBooking, defaultPackage }) {
    return (
        <section 
            id="cta"
            style={{ position: 'relative', padding: '80px clamp(20px, 4vw, 48px) 110px', background: '#F8F9F5' }}
        >
            <div style={CONTAINER}>
                <div 
                    style={{
                        position: 'relative',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        padding: 'clamp(80px, 10vw, 130px) 32px',
                        textAlign: 'center',
                        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.12)',
                        cursor: 'default'
                    }}
                >
                    {/* Background */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Image
                            src="/images/treks/parvati-valley-himachal-hero.jpg"
                            alt="Highland Stays & Alpine Sanctuaries in Himachal Pradesh"
                            fill
                            priority
                            sizes="100vw"
                            style={{
                                objectFit: 'cover',
                                filter: 'brightness(0.68) contrast(1.15)'
                            }}
                        />
                    </div>

                    {/* Radial & Edge Vignette Gradients */}
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(14, 24, 17, 0.3) 0%, rgba(14, 24, 17, 0.75) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14, 24, 17, 0.85) 0%, transparent 60%)' }} />

                    {/* Content Layer */}
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '900',
                            letterSpacing: '2px',
                            color: '#E5A93B',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '6px 18px',
                            borderRadius: '999px',
                            border: '1px solid rgba(213, 237, 85, 0.3)',
                            backdropFilter: 'blur(8px)',
                            marginBottom: '18px'
                        }}>
                            <span>★</span> HIGHLAND SANCTUARY AWAITS
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(32px, 5vw, 54px)',
                            fontWeight: '800',
                            color: '#FFFFFF',
                            letterSpacing: '-0.035em',
                            lineHeight: 1.15,
                            marginBottom: '32px'
                        }}>
                            Escape the crowds and reserve your <span className="text-marker-dark-2">mountain stay</span> today
                        </h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            <a
                                href="#aanandham-stays"
                                style={{
                                    background: '#E5A93B',
                                    color: '#121613',
                                    border: 'none',
                                    padding: '16px 40px',
                                    borderRadius: '999px',
                                    fontSize: '15px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    textDecoration: 'none'
                                }}
                            >
                                <span>Explore Handpicked Stays →</span>
                            </a>
                            <a
                                href={waLink('Hi Aanandham Team! I want to check room availability for a mountain stay in Himachal or Munnar.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp-glass"
                            >
                                <WhatsAppIcon size={19} color="#25D366" />
                                <span>WhatsApp Concierge</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Isolated high-performance Scroll Progress Indicator (0 parent re-renders, 0 layout reflows)
function ScrollProgressBar() {
    const barRef = useRef(null);

    useEffect(() => {
        let ticking = false;
        let cachedTotalHeight = 1;

        const updateHeight = () => {
            cachedTotalHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        };
        updateHeight();

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (barRef.current) {
                        const scale = Math.min(1, Math.max(0, window.scrollY / cachedTotalHeight));
                        barRef.current.style.transform = `scaleX(${scale})`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateHeight, { passive: true });
        window.addEventListener('orientationchange', updateHeight, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', updateHeight);
            window.removeEventListener('orientationchange', updateHeight);
        };
    }, []);

    return (
        <div className="scroll-progress-container">
            <div 
                ref={barRef}
                className="scroll-progress-bar" 
                style={{ 
                    transform: 'scaleX(0)', 
                    transformOrigin: '0% 50%',
                    willChange: 'transform' 
                }} 
            />
        </div>
    );
}

// ── 2 AUTHENTIC AANANDHAM STAYS (HIMACHAL & MUNNAR) ──
const FEATURED_AANANDHAM_STAYS = [
    {
        id: 'the-nest-kalga',
        slug: 'the-nest-kalga',
        title: 'The Nest Kalga — Dorms, Balcony Rooms & Pine Mountain Stays',
        location: 'Kasol · Parvati Valley, Himachal',
        region: 'Himachal',
        altitude: '7,900 FT',
        stayType: 'Cottages & Backpacker Dorms',
        categoryTag: 'Dorms & Suites',
        isGlamp: false,
        price: '₹249',
        priceUnit: '/ bed / night',
        desc: 'Solar-powered mountain basecamp with panoramic sunrise deck, 10-bed dorm, private balcony rooms, warm firesides & apple orchard views.',
        tags: ['Sunrise Balcony', 'Campfire & BBQ', 'Orchard Views', 'Solar Powered'],
        img: '/images/high-altitude-ridge-tent.jpg',
        href: '/camps/the-nest-kalga',
        waMessage: 'Hi Aanandham Stays! I want to check availability for The Nest Kalga in Parvati Valley, Himachal.'
    },
    {
        id: 'pkg-kolukkumalai-teddy-domes',
        slug: 'kolukkumalai-teddy-domes',
        title: "Kolukkumalai Teddy's Stays — Sky Deck & Cloud Bed Domes",
        location: 'Suryanelli / Kolukkumalai, Munnar',
        region: 'Munnar',
        altitude: '7,100 FT',
        stayType: 'Sky Deck & Geodesic Domes',
        categoryTag: 'Domes & Glamp',
        isGlamp: true,
        price: '₹2,299',
        priceUnit: '/ guest / night',
        desc: 'Elevated sky deck and weather-insulated adventure domes with sunrise cloud-bed views over Kolukkumalai peak above the clouds.',
        tags: ['Sunrise Cloud Bed', 'Sky Deck & Domes', 'Campfire & BBQ', 'Sunset Ridge Views'],
        img: '/images/teddy/teddy-dome-1.jpg',
        href: '/camps/pkg-kolukkumalai-teddy-domes',
        waMessage: "Hi Aanandham Stays! I want to check availability for Kolukkumalai Teddy's Stays in Munnar."
    }
];

export default function HomePage() {
    const router = useRouter();
    const [expandedPackageId, setExpandedPackageId] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [selectedStayRegion, setSelectedStayRegion] = useState('All');
    const [selectedTrekStartingPoint, setSelectedTrekStartingPoint] = useState('All');
    const [expandedDayIdx, setExpandedDayIdx] = useState(0);
    const [activeWhyIdx, setActiveWhyIdx] = useState(0);
    const [activeFaq, setActiveFaq] = useState(0);
    const [highlightIdx, setHighlightIdx] = useState(0);
    const [testimonialIdx, setTestimonialIdx] = useState(0);
    const [testimonials, setTestimonials] = useState(TESTIMONIALS);

    // Load admin-managed testimonials (server authoritative, localStorage fallback)
    useEffect(() => {
        const saved = loadTestimonialsFromStorage();
        if (Array.isArray(saved) && saved.length > 0) setTestimonials(saved);
        fetch('/api/testimonials', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
                    setTestimonials(data.testimonials);
                }
            })
            .catch(() => {});
    }, []);

    // Live Instagram Dispatches (Dynamic /api/instagram sync, zero hardcoded posts)
    const [instaPosts, setInstaPosts] = useState([]);

    useEffect(() => {
        fetch('/api/instagram')
            .then(res => res.json())
            .then(data => {
                if (data?.posts && Array.isArray(data.posts) && data.posts.length > 0) {
                    setInstaPosts(data.posts);
                }
            })
            .catch(() => {});
    }, []);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const openBookingModal = (pkg, opts = {}) => {
        if (pkg) setSelectedPackage(pkg);
        setIsBookingModalOpen(true);
    };
    const [selectedPackage, setSelectedPackage] = useState(() => getInitialCamps()[0] || null);
    const { user: currentUser, logout } = useAuth();
    const [campsList, setCampsList] = useState(() => getInitialCamps());
    const [isLoadingCamps, setIsLoadingCamps] = useState(false);

    useEffect(() => {
        const localCamps = getAllCamps();
        if (localCamps && localCamps.length > 0) {
            setCampsList(localCamps);
            setSelectedPackage(prev => prev || localCamps[0]);
        }
        fetch('/api/admin/camps', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    saveAllCamps(data);
                    setCampsList(data);
                    setSelectedPackage(prev => prev || data[0]);
                }
            })
            .catch(() => {})
            .finally(() => {
                setIsLoadingCamps(false);
                setCampsList(prev => (Array.isArray(prev) && prev.length > 0 ? prev : getAllCamps()));
            });
    }, []);

    // Listen for global booking open trigger from sticky bar / dock
    useEffect(() => {
        const handleGlobalBooking = (e) => {
            e.preventDefault();
            if (e.detail?.camp) {
                setSelectedPackage(e.detail.camp);
                setIsBookingModalOpen(true);
            } else {
                router.push('/camps');
            }
        };
        window.addEventListener('aanandham_open_booking', handleGlobalBooking);
        return () => window.removeEventListener('aanandham_open_booking', handleGlobalBooking);
    }, []);

    const filteredPackages = useMemo(() => {
        if (!campsList || !Array.isArray(campsList)) return [];
        if (activeTab === 'All') return campsList;
        if (activeTab === 'Munnar') {
            return campsList.filter(p => 
                p.region === 'Munnar' || 
                p.region === 'Suryanelli' || 
                p.region === 'Kolukkumalai' || 
                p.region === 'Vattavada' || 
                String(p.location || '').toLowerCase().includes('munnar')
            );
        }
        if (activeTab === 'Himachal') {
            return campsList.filter(p => 
                p.region === 'Himachal' || 
                p.region === 'Kalga' || 
                String(p.location || '').toLowerCase().includes('himachal') ||
                String(p.location || '').toLowerCase().includes('kasol') ||
                String(p.location || '').toLowerCase().includes('kalga') ||
                p.id === 'the-nest-kalga'
            );
        }
        if (activeTab === 'Domes') {
            return campsList.filter(p => 
                p.category?.toLowerCase().includes('dome') || 
                p.category?.toLowerCase().includes('glamp') || 
                p.title?.toLowerCase().includes('dome') || 
                p.title?.toLowerCase().includes('ridge') ||
                p.tag?.toLowerCase().includes('pod')
            );
        }
        return campsList;
    }, [activeTab, campsList]);

    // User Wishlist & Share Toasts
    const [wishlist, setWishlist] = useState([]);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        try {
            const savedWishlist = JSON.parse(localStorage.getItem('aanandham_user_wishlist') || '[]');
            setWishlist(savedWishlist);
        } catch (e) {}
    }, []);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleToggleWishlist = (campId, campTitle, e) => {
        e?.stopPropagation();
        e?.preventDefault();
        let updated;
        const isLiked = wishlist.includes(campId);
        if (isLiked) {
            updated = wishlist.filter(id => id !== campId);
            showToast(`Removed "${campTitle}" from your wishlist`);
        } else {
            updated = [...wishlist, campId];
            showToast(`❤️ Added "${campTitle}" to saved wishlist!`);
        }
        setWishlist(updated);
        try {
            localStorage.setItem('aanandham_user_wishlist', JSON.stringify(updated));
        } catch (e) {}
    };

    const handleShareCamp = async (pkg, e) => {
        e?.stopPropagation();
        e?.preventDefault();
        const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/camps/${pkg.id}` : '';
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${pkg.title} | Aanandham.go`,
                    text: `Check out ${pkg.title} at ${pkg.altitude} in ${pkg.location}!`,
                    url: shareUrl
                });
                return;
            } catch (e) {}
        }
        try {
            await navigator.clipboard.writeText(shareUrl);
            showToast('✓ Link copied to clipboard!');
        } catch (e) {
            window.open(waLink(`Check out this camp: ${pkg.title} - ${shareUrl}`), '_blank');
        }
    };

    // Floating Mouse-Follow Preview Card State for Program Section
    

    // Read logged-in user profile from localStorage
    const handleLogout = () => {
        logout?.();
    };

    // Disable background page scrolling when modals are open
    useEffect(() => {
        if (isVideoModalOpen || isBookingModalOpen) {
            window.__lenis?.stop();
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                window.__lenis?.start();
                document.body.style.overflow = originalOverflow || '';
            };
        }
    }, [isVideoModalOpen, isBookingModalOpen]);

    const nextTestimonial = () => setTestimonialIdx((prev) => (prev + 1) % (testimonials.length > 0 ? testimonials.length : TESTIMONIALS.length));
    const prevTestimonial = () => setTestimonialIdx((prev) => {
        const len = testimonials.length > 0 ? testimonials.length : TESTIMONIALS.length;
        return prev === 0 ? len - 1 : prev - 1;
    });
    const nextHighlight = () => setHighlightIdx((prev) => (prev + 1) % OVERVIEW_HIGHLIGHTS.length);
    const prevHighlight = () => setHighlightIdx((prev) => (prev === 0 ? OVERVIEW_HIGHLIGHTS.length - 1 : prev - 1));
    
    const nextWhyPillar = () => setActiveWhyIdx((prev) => (prev + 1) % WHY_AANANDHAM_PILLARS.length);
    const prevWhyPillar = () => setActiveWhyIdx((prev) => (prev === 0 ? WHY_AANANDHAM_PILLARS.length - 1 : prev - 1));

    const handleOpenBooking = (pkg) => {
        setSelectedPackage(pkg);
        setIsBookingModalOpen(true);
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';
    const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                'url': siteUrl,
                'name': 'Aanandham Stays — Boutique Highland Retreats (Himachal & Munnar)',
                'description': 'Owner-operated boutique mountain stays in Kalga (Parvati Valley, Himachal) and Suryanelli–Kolukkumalai (Munnar, Kerala). 100% verified rooms, alpine dorms, sky deck domes, and timber cottages.',
                'publisher': {
                    '@type': 'Organization',
                    'name': 'Aanandham Stays',
                    'url': siteUrl,
                    'logo': `${siteUrl}/logo.png`
                }
            },
            {
                '@type': 'ItemList',
                '@id': `${siteUrl}/#stays`,
                'name': 'Aanandham Stays — Handpicked Boutique Mountain Stays',
                'description': 'Verified highland stays across Kalga (Himachal Pradesh) and Munnar (Kerala).',
                'itemListElement': FEATURED_AANANDHAM_STAYS.map((stay, idx) => ({
                    '@type': 'ListItem',
                    'position': idx + 1,
                    'item': {
                        '@type': 'LodgingBusiness',
                        'name': stay.title,
                        'description': stay.desc,
                        'image': `${siteUrl}${stay.img}`,
                        'url': `${siteUrl}${stay.href}`,
                        'priceRange': stay.price,
                        'address': {
                            '@type': 'PostalAddress',
                            'addressLocality': stay.region === 'Himachal' ? 'Kalga Village, Kasol, Parvati Valley' : 'Suryanelli / Kolukkumalai, Munnar',
                            'addressRegion': stay.region === 'Himachal' ? 'Himachal Pradesh' : 'Kerala',
                            'addressCountry': 'IN'
                        },
                        'geo': {
                            '@type': 'GeoCoordinates',
                            'latitude': stay.region === 'Himachal' ? 31.9984 : 10.0261,
                            'longitude': stay.region === 'Himachal' ? 77.4526 : 77.1420
                        }
                    }
                }))
            },
            {
                '@type': 'ItemList',
                '@id': `${siteUrl}/#treks`,
                'name': 'Aanandham Alpine Treks — Parvati Valley Guided Expeditions',
                'description': 'Guided 2D/1N alpine treks starting from Kalga & Pulga villages: Kheerganga Trek, Bhun Buni Thatch Trek, and Bhandak Thach Trek.',
                'itemListElement': treksData.map((trek, idx) => ({
                    '@type': 'ListItem',
                    'position': idx + 1,
                    'item': {
                        '@type': 'TouristTrip',
                        'name': trek.name,
                        'description': trek.description,
                        'image': `${siteUrl}${trek.image}`,
                        'offers': {
                            '@type': 'Offer',
                            'price': trek.price,
                            'priceCurrency': 'INR',
                            'availability': 'https://schema.org/InStock'
                        },
                        'touristType': 'Adventure Trekker'
                    }
                }))
            },
            {
                '@type': 'FAQPage',
                '@id': `${siteUrl}/#faq`,
                'mainEntity': FAQ_DATA.map(f => ({
                    '@type': 'Question',
                    'name': f.question,
                    'acceptedAnswer': {
                        '@type': 'Answer',
                        'text': f.answer
                    }
                }))
            }
        ]
    };

    return (
        <MotionConfig reducedMotion="never">
            <div style={{ backgroundColor: '#F8F9F5', color: '#121613', minHeight: '100%', position: 'relative' }}>
            
            {/* ── GOOGLE RICH RESULTS STRUCTURED DATA ── */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            {/* ── ACCESSIBILITY: SKIP TO CONTENT LINK ── */}
            <a href="#main-content" className="skip-to-content">
                Skip to main content
            </a>

            {/* ── SCROLL PROGRESS BAR (0 React Re-renders on Scroll) ── */}
            <ScrollProgressBar />

            {/* ── UNIFIED REUSABLE SITE HEADER ── */}
            <SiteHeader 
                activePage="home" 
                currentUser={currentUser} 
                onLogout={handleLogout} 
            />

            <main id="main-content">

            {/* ─────────────────────────────────────────────────────────────
                HERO SECTION (Defensive viewport units & short screen support)
            ───────────────────────────────────────────────────────────── */}
            <section 
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    minHeight: '100vh',
                    minHeight: '100dvh',
                    padding: 'clamp(90px, 12dvh, 130px) 24px clamp(40px, 6dvh, 70px)',
                    backgroundImage: 'url("/images/home-hero-landing.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 38%',
                    backgroundRepeat: 'no-repeat',
                    color: '#FFFFFF',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at center, rgba(14, 24, 17, 0.22) 0%, rgba(14, 24, 17, 0.72) 100%)'
                }} />

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                >
                    
                    {/* Top Sub-Brand Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(213,237,85,0.12)',
                            border: '1px solid rgba(213,237,85,0.35)',
                            borderRadius: '999px',
                            padding: '6px 18px',
                            marginBottom: '14px'
                        }}
                    >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D5ED55' }} />
                        <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#D5ED55', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                            ✦ BY AANANDHAM.GO
                        </span>
                    </motion.div>

                    {/* Main Headline in Bricolage Grotesque */}
                    <motion.h1 
                        className="hero-headline"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(38px, 6.5vw, 76px)',
                            fontWeight: '800',
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                            color: '#FFFFFF',
                            margin: '0 auto 10px'
                        }}
                    >
                        <span className="text-hover-marker text-hover-marker-dark" style={{ cursor: 'pointer', display: 'inline-block' }}>
                            <span className="marker-text">
                                Aanandham<span className="brand-accent-go">.Stays</span>
                            </span>
                        </span>
                    </motion.h1>

                    {/* Compact Punchy Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.16 }}
                        style={{
                            fontSize: 'clamp(16px, 2.2vw, 20px)',
                            fontWeight: '600',
                            color: 'rgba(240, 246, 241, 0.95)',
                            lineHeight: 1.4,
                            maxWidth: '720px',
                            margin: '0 auto clamp(18px, 3.5dvh, 28px)',
                            letterSpacing: '-0.015em'
                        }}
                    >
                        Himachal Mountain Stays, Dorms &amp; Balcony Rooms · Direct Host Booking
                    </motion.p>

                    {/* Quick Action Button Cluster */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                            marginBottom: 'clamp(20px, 4dvh, 36px)'
                        }}
                    >
                        {/* Primary Explore Stays Button */}
                        <a
                            href="#stays"
                            className="btn-lime"
                            style={{
                                padding: '12px 28px',
                                fontSize: '14.5px',
                                textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(213, 237, 85, 0.28)'
                            }}
                        >
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Tent size={16} /> Explore Stays →</span>
                        </a>

                        {/* Direct WhatsApp Concierge Button */}
                        <a
                            href="https://wa.me/919074858014?text=Hi%20Aanandham%20Stays!%20I%20would%20like%20to%20check%20availability%20for%20Himachal%20and%20Munnar%20stays."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                background: 'rgba(0, 0, 0, 0.45)',
                                border: '1px solid rgba(255, 255, 255, 0.35)',
                                color: '#FFFFFF',
                                padding: '11px 24px',
                                borderRadius: '999px',
                                fontWeight: '600',
                                fontSize: '14.5px',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
                        >
                            <WhatsAppIcon size={16} color="#25D366" />
                            <span>WhatsApp Concierge</span>
                        </a>

                        {/* Live Instagram Handle Pill */}
                        <a
                            href="https://instagram.com/aanandham.go"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-instagram-btn"
                            style={{ padding: '11px 20px', fontSize: '14px' }}
                        >
                            <InstagramIcon size={15} />
                            <span>@aanandham.go</span>
                        </a>
                    </motion.div>

                    {/* Minimal Highland Hero Highlights Pill */}
                    <motion.div 
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="hero-summary-pill"
                    >
                        <span style={{ fontWeight: '800', color: '#D5ED55' }}>
                            Kalga Dorms from ₹249
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', userSelect: 'none' }}>•</span>
                        <span style={{ color: '#FFFFFF', fontWeight: '600' }}>
                            Munnar Sky Deck
                        </span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', userSelect: 'none' }}>•</span>
                        <span style={{ color: '#A3B1A7', fontWeight: '600' }}>
                            Zero Commission
                        </span>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── LIVE BASECAMP MARQUEE TICKER ── */}
            <div className="marquee-container" aria-hidden="true" style={{ background: '#0B150E', color: '#FFFFFF' }}>
                <div className="marquee-track">
                    {[
                        { icon: Sparkles, label: 'DECEMBER SNOWFALL · CHRISTMAS & NEW YEAR RETREATS', highlight: true },
                        { icon: Mountain, label: '7,900 FT THE NEST KALGA · PARVATI VALLEY', highlight: true },
                        { icon: Tent, label: 'BUDGET MOUNTAIN DORMS FROM ₹249 · SOLAR POWER & WI-FI' },
                        { icon: Flame, label: 'BUKHARI HEATED ROOMS & WINTER KHEERGANGA HOT SPRINGS', highlight: true },
                        { icon: Sunrise, label: 'PANORAMIC SUNRISE BALCONY SUITES · KALGA VILLAGE', highlight: true },
                        { icon: Star, label: '100% PRIVATE, CLEAN & FEMALE-FRIENDLY ROOMS' },
                        { icon: Flame, label: 'AUTHENTIC PAHADI SIDDU & HOMECOOKED DINING', highlight: true },
                        { icon: Footprints, label: 'KASOL & BARSHAINI PINE TRAIL ACCESS' },
                        { icon: Telescope, label: 'ZERO LIGHT-POLLUTION STARGAZING DECKS', highlight: true },
                        { icon: Truck, label: 'KOLUKKUMALAI SKY DECK GEODESIC DOMES (7,100 FT)' },
                        { icon: Sparkles, label: 'DECEMBER SNOWFALL · CHRISTMAS & NEW YEAR RETREATS', highlight: true },
                        { icon: Mountain, label: '7,900 FT THE NEST KALGA · PARVATI VALLEY', highlight: true },
                        { icon: Tent, label: 'BUDGET MOUNTAIN DORMS FROM ₹249 · SOLAR POWER & WI-FI' },
                        { icon: Flame, label: 'BUKHARI HEATED ROOMS & WINTER KHEERGANGA HOT SPRINGS', highlight: true },
                        { icon: Sunrise, label: 'PANORAMIC SUNRISE BALCONY SUITES · KALGA VILLAGE', highlight: true },
                        { icon: Star, label: '100% PRIVATE, CLEAN & FEMALE-FRIENDLY ROOMS' },
                        { icon: Flame, label: 'AUTHENTIC PAHADI SIDDU & HOMECOOKED DINING', highlight: true },
                        { icon: Footprints, label: 'KASOL & BARSHAINI PINE TRAIL ACCESS' },
                        { icon: Telescope, label: 'ZERO LIGHT-POLLUTION STARGAZING DECKS', highlight: true },
                        { icon: Truck, label: 'KOLUKKUMALAI SKY DECK GEODESIC DOMES (7,100 FT)' }
                    ].map((item, idx) => (
                        <div key={idx} className="marquee-item">
                            <item.icon size={16} strokeWidth={2.4} />
                            <span className={item.highlight ? 'highlight' : ''}>{item.label}</span>
                            <span style={{ opacity: 0.3 }}>·</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                1. CURATED HIGHLAND STAYS & SANCTUARIES (FEATURED SHOWCASE) (Himachal & Munnar)
            ───────────────────────────────────────────────────────────── */}
            <div id="stays" style={{ scrollMarginTop: '100px' }} />
            <div id="packages" style={{ scrollMarginTop: '100px' }} />
            <div id="camps" style={{ scrollMarginTop: '100px' }} />
            <div id="munnar-stays" style={{ scrollMarginTop: '100px' }} />
            <div id="himachal-stays" style={{ scrollMarginTop: '100px' }} />
            <motion.section
                id="aanandham-stays"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={{
                    position: 'relative',
                    padding: 'clamp(64px, 7vw, 92px) clamp(20px, 4vw, 48px)',
                    background: '#F8F9F5',
                    borderTop: '1px solid rgba(18, 22, 19, 0.08)',
                    borderBottom: '1px solid rgba(18, 22, 19, 0.08)',
                    overflow: 'hidden'
                }}
            >
                {/* Subtle Highland Ambient Glows */}
                <div style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '5%',
                    width: '450px',
                    height: '450px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(27, 77, 62, 0.04) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-15%',
                    right: '5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(217, 119, 6, 0.04) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                    {/* Header Row */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginBottom: '36px'
                    }}>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(27, 77, 62, 0.08)',
                                border: '1px solid rgba(27, 77, 62, 0.2)',
                                borderRadius: '999px',
                                padding: '5px 14px',
                                marginBottom: '14px'
                            }}>
                                <span style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: '#166534',
                                    boxShadow: '0 0 8px #166534',
                                    display: 'inline-block',
                                    animation: 'pulse-dot 1.8s ease-in-out infinite'
                                }} />
                                <span style={{ fontSize: '11px', fontWeight: '900', color: '#166534', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    Now Open · Aanandham.Stays
                                </span>
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 4vw, 42px)',
                                fontWeight: '900',
                                color: '#121613',
                                margin: '0 0 10px',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.15
                            }}>
                                Stays by Aanandham<span style={{ color: '#1B4D3E' }}>.Stays</span>
                            </h2>
                            <p style={{
                                fontSize: 'clamp(14px, 1.4vw, 16px)',
                                color: '#4A554D',
                                lineHeight: 1.65,
                                margin: 0,
                                maxWidth: '620px'
                            }}>
                                Boutique highland collection — featuring affordable backpacker dorms from ₹249 &amp; sunrise suites in Kalga Village (Himachal) alongside cloud-bed domes in Munnar. Personally verified, 100% owner-operated, zero OTA fees.
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {[
                                { id: 'All', label: 'All Stays (2)' },
                                { id: 'Himachal', label: 'Himachal · Parvati Valley (1)' },
                                { id: 'Munnar', label: 'Munnar · Kolukkumalai (1)' },
                                { id: 'Domes', label: 'Domes & Glamping (1)' }
                            ].map(filter => {
                                const isCurrent = selectedStayRegion === filter.id;
                                return (
                                    <button
                                        key={filter.id}
                                        type="button"
                                        onClick={() => setSelectedStayRegion(filter.id)}
                                        style={{
                                            minHeight: '44px',
                                            padding: '0 16px',
                                            borderRadius: '999px',
                                            border: isCurrent ? '1px solid #121613' : '1px solid rgba(18, 22, 19, 0.12)',
                                            background: isCurrent ? '#121613' : '#FFFFFF',
                                            color: isCurrent ? '#FFFFFF' : '#121613',
                                            fontSize: '12.5px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            boxShadow: isCurrent ? '0 4px 14px rgba(18, 22, 19, 0.12)' : '0 2px 6px rgba(18, 22, 19, 0.04)',
                                            transition: 'all 0.2s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {filter.label}
                                    </button>
                                );
                            })}
                            <a
                                href="https://wa.me/919074858014?text=Hi%20Aanandham!%20I%20want%20to%20enquire%20about%20Aanandham%20Stays%20in%20Himachal%20and%20Munnar."
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    background: '#FFFFFF',
                                    color: '#121613',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    minHeight: '44px',
                                    padding: '0 20px',
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(18, 22, 19, 0.14)',
                                    boxShadow: '0 2px 8px rgba(18, 22, 19, 0.04)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <WhatsAppIcon size={15} color="#25D366" />
                                <span>Concierge WhatsApp →</span>
                            </a>
                        </div>
                    </div>

                    {/* ── 2 AUTHENTIC AANANDHAM STAYS GRID (FIXED ERGONOMIC SIZE) ── */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 380px))',
                        gap: '24px',
                        justifyContent: 'flex-start'
                    }}>
                        {FEATURED_AANANDHAM_STAYS
                            .filter(stay => {
                                if (selectedStayRegion === 'Himachal') return stay.region === 'Himachal';
                                if (selectedStayRegion === 'Munnar') return stay.region === 'Munnar';
                                if (selectedStayRegion === 'Domes') return stay.isGlamp;
                                return true;
                            })
                            .map(stay => (
                                <div
                                    key={stay.id}
                                    onClick={() => router.push(stay.href)}
                                    role="article"
                                    aria-label={stay.title}
                                    style={{
                                        maxWidth: '380px',
                                        width: '100%',
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(18, 22, 19, 0.09)',
                                        borderRadius: '22px',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 20px rgba(18, 22, 19, 0.05)',
                                        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 16px 36px rgba(18, 22, 19, 0.12)';
                                        e.currentTarget.style.borderColor = 'rgba(27, 77, 62, 0.35)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(18, 22, 19, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(18, 22, 19, 0.09)';
                                    }}
                                >
                                    {/* Image Header with Altitude & Availability Badges */}
                                    <div style={{ height: '190px', position: 'relative', overflow: 'hidden', background: '#121613' }}>
                                        {stay.img ? (
                                            <Image
                                                src={stay.img}
                                                alt={stay.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                                style={{ objectFit: 'cover' }}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'radial-gradient(circle at 50% 40%, #162419 0%, #0A130C 100%)' }}>
                                                <Mountain size={40} color="#1B4D3E" strokeWidth={1.5} style={{ opacity: 0.85 }} />
                                                <span style={{ fontSize: '11px', fontWeight: '800', color: '#1B4D3E', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{stay.altitude} Alpine Sanctuary</span>
                                            </div>
                                        )}
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.65) 100%)' }} />

                                        {/* Top Badges */}
                                        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                            <span style={{ background: '#1B4D3E', color: '#FFFFFF', fontSize: '10px', fontWeight: '900', padding: '3px 8px', borderRadius: '999px' }}>
                                                {stay.categoryTag || stay.stayType}
                                            </span>
                                            <span style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid rgba(146, 64, 14, 0.2)', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '999px' }}>
                                                {stay.altitude}
                                            </span>
                                            <span style={{ background: 'rgba(18, 22, 19, 0.75)', color: '#FFFFFF', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '999px', backdropFilter: 'blur(4px)' }}>
                                                {stay.region}
                                            </span>
                                        </div>

                                        {/* Live Available Indicator */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '12px',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            background: 'rgba(22,101,52,0.95)',
                                            border: '1px solid #166534',
                                            padding: '3px 9px',
                                            borderRadius: '999px',
                                            backdropFilter: 'blur(6px)'
                                        }}>
                                            <span className="live-available-dot" />
                                            <span style={{ fontSize: '10px', fontWeight: '800', color: '#FFFFFF' }}>Live Available</span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                background: 'rgba(27, 77, 62, 0.08)',
                                                border: '1px solid rgba(27, 77, 62, 0.22)',
                                                color: '#1B4D3E',
                                                fontSize: '10px',
                                                fontWeight: '900',
                                                padding: '2px 8px',
                                                borderRadius: '999px'
                                            }}>
                                                <span style={{
                                                    width: '12px',
                                                    height: '12px',
                                                    borderRadius: '50%',
                                                    background: '#1B4D3E',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <Check size={8} color="#FFFFFF" strokeWidth={3.5} />
                                                </span>
                                                by Aanandham.Stays
                                            </span>
                                            <span style={{ color: 'rgba(18, 22, 19, 0.25)', fontSize: '11px' }}>•</span>
                                            <span style={{ fontSize: '11px', color: '#59655D', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                <MapPin size={11} color="#1B4D3E" />
                                                {stay.location}
                                            </span>
                                        </div>

                                        <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#121613', marginBottom: '6px', lineHeight: 1.3, margin: '0 0 6px', fontFamily: 'var(--font-heading)' }}>
                                            {stay.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '12.5px',
                                            color: '#59655D',
                                            lineHeight: 1.55,
                                            marginBottom: '14px',
                                            margin: '0 0 14px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {stay.desc}
                                        </p>

                                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                            {stay.tags.map((f, i) => (
                                                <span key={i} style={{ fontSize: '10.5px', fontWeight: '700', background: '#F0F2EC', border: '1px solid rgba(18, 22, 19, 0.06)', color: '#1B4D3E', padding: '3px 8px', borderRadius: '6px' }}>
                                                    ✓ {f}
                                                </span>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(18, 22, 19, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                                            <div>
                                                <div style={{ fontSize: '9.5px', fontWeight: '800', color: '#6B8A72', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Starts at</div>
                                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '900', color: '#121613', lineHeight: 1 }}>
                                                    {stay.price} <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#59655D' }}>{stay.priceUnit}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <Link
                                                    href={stay.href}
                                                    onClick={e => e.stopPropagation()}
                                                    style={{
                                                        minHeight: '38px',
                                                        padding: '0 14px',
                                                        borderRadius: '8px',
                                                        background: '#F0F2EC',
                                                        border: '1px solid rgba(18, 22, 19, 0.12)',
                                                        color: '#121613',
                                                        fontSize: '12px',
                                                        fontWeight: '800',
                                                        textDecoration: 'none',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer',
                                                        transition: 'background 0.2s ease'
                                                    }}
                                                >
                                                    Details →
                                                </Link>
                                                <a
                                                    href={`https://wa.me/919074858014?text=${encodeURIComponent(stay.waMessage)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={e => e.stopPropagation()}
                                                    style={{
                                                        minHeight: '38px',
                                                        padding: '0 14px',
                                                        borderRadius: '8px',
                                                        background: '#166534',
                                                        border: 'none',
                                                        color: '#FFFFFF',
                                                        fontSize: '12px',
                                                        fontWeight: '900',
                                                        textDecoration: 'none',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '5px',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 2px 8px rgba(22, 101, 52, 0.25)',
                                                        transition: 'background 0.2s ease'
                                                    }}
                                                >
                                                    <WhatsAppIcon size={13} color="#FFFFFF" />
                                                    <span>Enquire</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </motion.section>

            {/* ─────────────────────────────────────────────────────────────
                GUIDED ALPINE TREKS · PARVATI VALLEY (Kalga & Pulga Basecamp)
                - Kheerganga Trek (₹900/person · Kalga)
                - Bhun Buni Thatch Trek (₹3,000/person · Kalga)
                - Bhandak Thach Trek (₹3,999/person · Pulga)
            ───────────────────────────────────────────────────────────── */}
            <div id="treks" style={{ scrollMarginTop: '100px' }} />
            <div id="himachal-treks" style={{ scrollMarginTop: '100px' }} />
            <div id="kheerganga" style={{ scrollMarginTop: '100px' }} />
            <motion.section
                id="parvati-treks"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={{
                    position: 'relative',
                    padding: 'clamp(54px, 6vw, 84px) clamp(20px, 4vw, 48px)',
                    background: '#09120C',
                    borderTop: '1px solid rgba(213,237,85,0.12)',
                    overflow: 'hidden'
                }}
            >
                {/* Background glow highlights */}
                <div style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '5%',
                    width: '450px',
                    height: '450px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(213,237,85,0.07) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                    {/* Header Row */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        marginBottom: '36px'
                    }}>
                        <div style={{ flex: 1, minWidth: '280px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(213,237,85,0.12)',
                                border: '1px solid rgba(213,237,85,0.3)',
                                borderRadius: '999px',
                                padding: '5px 14px',
                                marginBottom: '14px'
                            }}>
                                <Footprints size={12} color="#D5ED55" />
                                <span style={{ fontSize: '11px', fontWeight: '900', color: '#D5ED55', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    Guided Alpine Trails · Kalga &amp; Pulga Basecamp
                                </span>
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 4vw, 42px)',
                                fontWeight: '900',
                                color: '#FFFFFF',
                                margin: '0 0 10px',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.15
                            }}>
                                Parvati Valley <span style={{ color: '#D5ED55' }}>Guided Alpine Treks</span>
                            </h2>
                            <p style={{
                                fontSize: 'clamp(14px, 1.4vw, 16px)',
                                color: '#A2B6A6',
                                lineHeight: 1.65,
                                margin: 0,
                                maxWidth: '660px'
                            }}>
                                Step straight out of our Kalga basecamp into the Himalayas — 2 Days / 1 Night guided alpine expeditions to natural geothermal hot springs, 360° snow peak ridges, and virgin highland pastures. Certified mountain guides, tent equipment, hearty hot meals, and direct host tariffs.
                            </p>
                        </div>

                        {/* Interactive Filter Pills & Concierge Link */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {[
                                { id: 'All', label: 'All Treks (3)' },
                                { id: 'Kalga', label: 'Starts Kalga Village (2)' },
                                { id: 'Pulga', label: 'Starts Pulga Village (1)' }
                            ].map(filter => {
                                const isCurrent = selectedTrekStartingPoint === filter.id;
                                return (
                                    <button
                                        key={filter.id}
                                        type="button"
                                        onClick={() => setSelectedTrekStartingPoint(filter.id)}
                                        style={{
                                            minHeight: '44px',
                                            padding: '0 16px',
                                            borderRadius: '999px',
                                            border: isCurrent ? '1px solid #D5ED55' : '1px solid rgba(255,255,255,0.14)',
                                            background: isCurrent ? '#D5ED55' : 'rgba(255,255,255,0.06)',
                                            color: isCurrent ? '#121613' : '#FFFFFF',
                                            fontSize: '12.5px',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {filter.label}
                                    </button>
                                );
                            })}
                            <Link
                                href="/treks"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    background: 'rgba(213,237,85,0.14)',
                                    color: '#D5ED55',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    minHeight: '44px',
                                    padding: '0 20px',
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(213,237,85,0.35)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span>Dedicated Treks Guide →</span>
                            </Link>
                            <a
                                href="https://wa.me/919074858014?text=Hi%20Aanandham!%20I%20want%20to%20enquire%20about%20guided%20alpine%20treks%20(Kheerganga,%20Bhun%20Buni%20Thatch,%20Bhandak%20Thach)%20in%20Parvati%20Valley."
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    background: 'rgba(255,255,255,0.08)',
                                    color: '#FFFFFF',
                                    fontWeight: '800',
                                    fontSize: '13px',
                                    minHeight: '44px',
                                    padding: '0 20px',
                                    borderRadius: '999px',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.18)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <WhatsAppIcon size={15} color="#25D366" />
                                <span>Trek Concierge WhatsApp →</span>
                            </a>
                        </div>
                    </div>

                    {/* 3 Authentic Parvati Valley Treks Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                        gap: '24px',
                        justifyContent: 'flex-start'
                    }}>
                        {treksData
                            .filter(trek => {
                                if (selectedTrekStartingPoint === 'Kalga') return trek.startingPoint.toLowerCase().includes('kalga');
                                if (selectedTrekStartingPoint === 'Pulga') return trek.startingPoint.toLowerCase().includes('pulga');
                                return true;
                            })
                            .map((trek) => {
                                const diffColors = trek.difficultyTone === 'easy'
                                    ? { bg: 'rgba(34, 197, 94, 0.16)', border: '#22C55E', text: '#22C55E' }
                                    : trek.difficultyTone === 'moderate'
                                    ? { bg: 'rgba(234, 179, 8, 0.16)', border: '#EAB308', text: '#FACC15' }
                                    : { bg: 'rgba(239, 68, 68, 0.16)', border: '#EF4444', text: '#F87171' };

                                return (
                                    <div
                                        key={trek.id}
                                        role="article"
                                        aria-label={`${trek.name} — ${trek.startingPoint}`}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(213,237,85,0.22)',
                                            borderRadius: '22px',
                                            overflow: 'hidden',
                                            transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(213,237,85,0.12)';
                                            e.currentTarget.style.borderColor = 'rgba(213,237,85,0.45)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.borderColor = 'rgba(213,237,85,0.22)';
                                        }}
                                    >
                                        {/* Image Header with Altitude & Duration Badges */}
                                        <div style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#0D1A10' }}>
                                            <Image
                                                src={trek.image}
                                                alt={trek.imageAlt}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                style={{ objectFit: 'cover', opacity: 0.9 }}
                                                loading="lazy"
                                            />
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />

                                            {/* Top Badges */}
                                            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                                {trek.badge && (
                                                    <span style={{
                                                        background: trek.isProposed ? '#E5A93B' : '#D5ED55',
                                                        color: '#121613',
                                                        fontSize: '10px',
                                                        fontWeight: '900',
                                                        padding: '3px 8px',
                                                        borderRadius: '999px'
                                                    }}>
                                                        {trek.badge}
                                                    </span>
                                                )}
                                                <span style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    color: '#FFFFFF',
                                                    fontSize: '10px',
                                                    fontWeight: '800',
                                                    padding: '3px 8px',
                                                    borderRadius: '999px',
                                                    backdropFilter: 'blur(4px)',
                                                    border: '1px solid rgba(255,255,255,0.14)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    <Mountain size={11} color="#D5ED55" />
                                                    {trek.altitude}
                                                </span>
                                            </div>

                                            {/* Starting Point & Duration Indicators */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '10px',
                                                left: '12px',
                                                right: '12px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: '6px'
                                            }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: 'rgba(18,22,19,0.88)',
                                                    border: '1px solid rgba(255,255,255,0.16)',
                                                    padding: '3px 9px',
                                                    borderRadius: '999px',
                                                    backdropFilter: 'blur(6px)',
                                                    fontSize: '10px',
                                                    fontWeight: '800',
                                                    color: '#FFFFFF'
                                                }}>
                                                    <MapPin size={10} color="#D5ED55" />
                                                    Starts: {trek.startingPoint}
                                                </span>

                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: 'rgba(18,22,19,0.88)',
                                                    border: '1px solid rgba(255,255,255,0.16)',
                                                    padding: '3px 9px',
                                                    borderRadius: '999px',
                                                    backdropFilter: 'blur(6px)',
                                                    fontSize: '10px',
                                                    fontWeight: '800',
                                                    color: '#D5ED55'
                                                }}>
                                                    <Clock size={10} color="#D5ED55" />
                                                    {trek.duration}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: 'rgba(213,237,85,0.14)',
                                                    border: '1px solid rgba(213,237,85,0.35)',
                                                    color: '#D5ED55',
                                                    fontSize: '10px',
                                                    fontWeight: '900',
                                                    padding: '2px 8px',
                                                    borderRadius: '999px'
                                                }}>
                                                    <span style={{
                                                        width: '12px',
                                                        height: '12px',
                                                        borderRadius: '50%',
                                                        background: '#D5ED55',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }}>
                                                        <Check size={8} color="#121613" strokeWidth={3.5} />
                                                    </span>
                                                    Aanandham Alpine Trek
                                                </span>

                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: diffColors.bg,
                                                    border: `1px solid ${diffColors.border}`,
                                                    color: diffColors.text,
                                                    fontSize: '10px',
                                                    fontWeight: '800',
                                                    padding: '2px 8px',
                                                    borderRadius: '999px'
                                                }}>
                                                    {trek.difficulty}
                                                </span>
                                            </div>

                                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF', marginBottom: '4px', lineHeight: 1.25, margin: '0 0 4px' }}>
                                                {trek.name}
                                            </h3>
                                            <div style={{ fontSize: '12px', fontWeight: '700', color: '#D5ED55', marginBottom: '8px' }}>
                                                {trek.tagline}
                                            </div>
                                            <p style={{
                                                fontSize: '12.5px',
                                                color: '#A2B6A6',
                                                lineHeight: 1.5,
                                                marginBottom: '14px',
                                                margin: '0 0 14px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {trek.description}
                                            </p>

                                            {/* Inclusions Box */}
                                            <div style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.06)',
                                                borderRadius: '12px',
                                                padding: '10px 12px',
                                                marginBottom: '16px'
                                            }}>
                                                <div style={{ fontSize: '9.5px', fontWeight: '800', color: '#8E9B92', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '6px' }}>
                                                    Package Inclusions
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                    {trek.inclusions.map((inc, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#E2E8E4', lineHeight: 1.35 }}>
                                                            <Check size={11} color="#D5ED55" strokeWidth={3} style={{ flexShrink: 0 }} />
                                                            <span>{inc}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tariff & Action Buttons */}
                                            <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                                                <div>
                                                    <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#6B8A72', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trek Tariff</div>
                                                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '900', color: '#D5ED55', lineHeight: 1 }}>
                                                        {trek.priceFormatted} <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#A2B6A6' }}>{trek.priceUnit}</span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <a
                                                        href={waLink(trek.waMessage)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`Enquire about ${trek.name} on WhatsApp`}
                                                        style={{
                                                            minHeight: '44px',
                                                            padding: '0 16px',
                                                            borderRadius: '8px',
                                                            background: '#D5ED55',
                                                            color: '#121613',
                                                            fontSize: '12.5px',
                                                            fontWeight: '900',
                                                            textDecoration: 'none',
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '6px',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <WhatsAppIcon size={14} color="#121613" />
                                                        <span>Enquire Trek</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                2. STAY OVERVIEW & ADVISORY (Ref Screenshot 3 Batch 2 - media_1786655246018.png)
            ───────────────────────────────────────────────────────────── */}
            <motion.section 
                id="overview" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                variants={staggerContainer}
                style={{ position: 'relative', padding: 'clamp(64px, 7vw, 92px) clamp(20px, 4vw, 48px) clamp(50px, 5vw, 68px)', background: '#F8F9F5' }}
            >
                <div style={CONTAINER}>
                    <div className="overview-3col-grid">
                        
                        {/* Left Column */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInLeft} 
                            className="reveal-fade-left"
                            style={{ width: '100%' }}
                        >
                            <div className="star-badge">
                                <span className="star-icon">★</span> STAY OVERVIEW &amp; ADVISORY
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 4vw, 46px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.035em',
                                lineHeight: 1.2,
                                marginBottom: '20px'
                            }}>
                                Mountain living in Parvati Valley &amp; beyond — <br />
                                <span className="text-marker-2">our handpicked stays</span> in Himachal (Kalga · Kasol) &amp; Munnar
                            </h2>

                            {/* 3 Checkmark Pills */}
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#121613', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Check size={13} color="#121613" /> Verified Clean Rooms
                                </span>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#121613', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Check size={13} color="#121613" /> 100% Host Operated
                                </span>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#121613', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Check size={13} color="#121613" /> Direct Host Rates
                                </span>
                            </div>

                            <p style={{ fontSize: '15px', color: '#59655D', lineHeight: 1.7, marginBottom: '32px' }}>
                                We operate boutique highland sanctuaries designed for genuine rest, workation, and mountain connection. From 10-bed backpacker dorms (starts ₹249) and sunrise balcony suites in Kalga Village (Parvati Valley, Himachal) to sky deck domes in Munnar — every stay is personally hosted with clean modern washrooms, homecooked meals, and evening firesides.
                            </p>

                            <Link
                                href="/camps"
                                className="action-arrow-btn"
                                style={{ textDecoration: 'none' }}
                            >
                                <span>Browse Our Stays</span>
                                <div className="btn-arrow-circle">
                                    →
                                </div>
                            </Link>
                        </motion.div>

                        {/* Center Highlight Image */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={cardReveal}
                            className="card-img-zoom reveal-zoom"
                            style={{ 
                                position: 'relative', 
                                height: 'clamp(360px, 48dvh, 500px)', 
                                width: '100%',
                                borderRadius: '32px', 
                                overflow: 'hidden', 
                                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.08)' 
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                                <AnimatePresence initial={false}>
                                    <motion.img
                                        key={highlightIdx}
                                        src={OVERVIEW_HIGHLIGHTS[highlightIdx].img}
                                        alt={OVERVIEW_HIGHLIGHTS[highlightIdx].title}
                                        width="600"
                                        height="500"
                                        decoding="async"
                                        initial={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: OVERVIEW_HIGHLIGHTS[highlightIdx]?.objectPosition || 'center' }}
                                    />
                                </AnimatePresence>
                            </div>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14, 24, 17, 0.9) 0%, transparent 60%)', pointerEvents: 'none' }} />
                            
                            <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ background: 'rgba(0,0,0,0.5)', color: '#FFFFFF', fontSize: '12px', fontWeight: '600', padding: '6px 14px', borderRadius: '999px', backdropFilter: 'blur(8px)' }}>
                                    trip highlights
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        onClick={prevHighlight} 
                                        aria-label="Previous trip highlight"
                                        style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', color: '#121613', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                                    >
                                        <ChevronLeft size={13} />
                                    </button>
                                    <button 
                                        onClick={nextHighlight} 
                                        aria-label="Next highlight"
                                        style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', color: '#121613', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                                    >
                                        <ChevronRight size={13} />
                                    </button>
                                </div>
                            </div>

                            <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '800', color: '#FFFFFF', marginBottom: '6px' }}>
                                    {OVERVIEW_HIGHLIGHTS[highlightIdx].title}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                                    {OVERVIEW_HIGHLIGHTS[highlightIdx].sub}
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Metadata + Quote Card */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInRight} 
                            className="reveal-fade-right"
                            style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}
                        >
                            
                            {/* Metadata list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(18,22,19,0.08)', paddingBottom: '12px', fontSize: '14px' }}>
                                    <span style={{ color: '#8E9B92', fontWeight: '600' }}>Regions</span>
                                    <span style={{ color: '#121613', fontWeight: '800' }}>Parvati Valley (HP) &amp; Munnar (KL)</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(18,22,19,0.08)', paddingBottom: '12px', fontSize: '14px' }}>
                                    <span style={{ color: '#8E9B92', fontWeight: '600' }}>Season</span>
                                    <span style={{ color: '#121613', fontWeight: '800' }}>Year-Round Highland Weather</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                    <span style={{ color: '#8E9B92', fontWeight: '600' }}>For Whom</span>
                                    <span style={{ color: '#121613', fontWeight: '800' }}>Solo Backpackers, Couples &amp; Families</span>
                                </div>
                            </div>

                            {/* Our Story Card */}
                            <div className="hover-lift" style={{ background: '#FFFFFF', border: '1px solid rgba(18, 22, 19, 0.08)', borderRadius: '28px', padding: '28px', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#166534', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                                        Our Story · It Started with a Feeling
                                    </div>
                                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#E5A93B', background: 'rgba(229, 169, 59, 0.12)', padding: '3px 8px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                                        EST. IN THE WESTERN GHATS
                                    </span>
                                </div>
                                <p style={{ fontSize: '15.5px', color: '#121613', lineHeight: 1.6, marginBottom: '14px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                                    “We were engineering students asking ourselves: Is life really meant to be just about classes, deadlines, and waiting for the next break?”
                                </p>
                                <p style={{ fontSize: '13px', color: '#59655D', lineHeight: 1.65, marginBottom: '16px', borderLeft: '2px solid #E5A93B', paddingLeft: '12px' }}>
                                    We took to the road to wake up surrounded by mountains, meet strangers, and feel truly alive. We discovered that happiness became easier to find when we were together — laughing by campfires and sharing stories we’d never planned. That is why we built <strong>Aanandham.go</strong>: a community where strangers become friends and happiness comes naturally.
                                </p>
                                <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#166534', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>“Go somewhere. Meet someone. Feel something. Go with Aanandham.”</span>
                                </div>
                                <Link href="/about" className="action-arrow-btn" style={{ width: '100%', justifyContent: 'space-between', textDecoration: 'none' }}>
                                    <span>Read Our Full Story</span>
                                    <div className="btn-arrow-circle">
                                        →
                                    </div>
                                </Link>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                3. WHY AANANDHAM.GO SECTION (Flagship Value & Trust Pillars)
            ───────────────────────────────────────────────────────────── */}
            <motion.section 
                id="why-aanandham" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={{ position: 'relative', padding: 'clamp(50px, 5vw, 68px) clamp(20px, 4vw, 48px) clamp(70px, 7vw, 96px)', background: '#F8F9F5' }}
            >
                <div style={CONTAINER}>
                    <div className="why-aanandham-grid">
                        
                        {/* Interactive Cinematic Showcase Card (Desktop: Left, Mobile: Below Header/Tabs) */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInLeft}
                            className="why-showcase-col reveal-fade-left"
                        >
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                                <AnimatePresence initial={false}>
                                    <motion.img
                                        key={activeWhyIdx}
                                        src={WHY_AANANDHAM_PILLARS[activeWhyIdx].image}
                                        alt={WHY_AANANDHAM_PILLARS[activeWhyIdx].title}
                                        width="800"
                                        height="590"
                                        decoding="async"
                                        initial={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
                                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
                                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Subtle Cinematic Gradient Overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14, 24, 17, 0.88) 0%, rgba(14, 24, 17, 0.15) 50%, rgba(14, 24, 17, 0.35) 100%)', pointerEvents: 'none' }} />

                            {/* Top Left Pillar Badge (Single clean badge, removed repeated top-right pill) */}
                            <div style={{
                                position: 'absolute',
                                top: 'clamp(14px, 2.5vw, 22px)',
                                left: 'clamp(14px, 2.5vw, 22px)',
                                background: 'rgba(0, 0, 0, 0.65)',
                                color: '#E5A93B',
                                fontSize: '12px',
                                fontWeight: '800',
                                padding: '6px 16px',
                                borderRadius: '999px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(229, 169, 59, 0.35)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E5A93B' }}></span>
                                <span>{WHY_AANANDHAM_PILLARS[activeWhyIdx].badge}</span>
                            </div>

                            {/* Minimized Bottom Content Card — Clean title & controls so photography breathes */}
                            <div className="why-showcase-content" style={{ position: 'absolute', bottom: '22px', left: '22px', right: '22px' }}>
                                <div style={{ fontSize: '11px', color: '#E5A93B', fontWeight: '800', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                                    {WHY_AANANDHAM_PILLARS[activeWhyIdx].tagline}
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(19px, 2.4vw, 24px)', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.25 }}>
                                    {WHY_AANANDHAM_PILLARS[activeWhyIdx].title}
                                </h3>

                                {/* Carousel Controls & Indicator */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.18)' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {WHY_AANANDHAM_PILLARS.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveWhyIdx(idx)}
                                                aria-label={`Go to pillar slide ${idx + 1}`}
                                                style={{
                                                    width: activeWhyIdx === idx ? '24px' : '8px',
                                                    height: '8px',
                                                    borderRadius: '999px',
                                                    background: activeWhyIdx === idx ? '#E5A93B' : 'rgba(255,255,255,0.3)',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.25s ease'
                                                }}
                                            >
                                                <span className="sr-only">Go to pillar slide {idx + 1}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button 
                                            onClick={prevWhyPillar} 
                                            aria-label="Previous reason"
                                            style={{ width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', color: '#121613', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                                        >
                                            <ChevronLeft size={12} />
                                        </button>
                                        <button 
                                            onClick={nextWhyPillar} 
                                            aria-label="Next reason"
                                            style={{ width: '38px', height: '38px', minWidth: '38px', minHeight: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)', border: 'none', color: '#121613', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                                        >
                                            <ChevronRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content & Interactive Feature Pillars (Desktop: Right, Mobile: Top) */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInRight} 
                            className="why-content-col reveal-fade-right"
                        >
                            <div className="star-badge">
                                <span className="star-icon">★</span> WHY AANANDHAM.GO
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 4.2vw, 48px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.035em',
                                lineHeight: 1.15,
                                marginBottom: '16px'
                            }}>
                                The <span className="text-highlight-gold">gold standard</span> in <span style={{ color: '#59655D' }}>Himachal &amp; Munnar mountain retreats</span>
                            </h2>

                            <p style={{ fontSize: '15px', color: '#59655D', lineHeight: 1.7, marginBottom: '22px' }}>
                                We believe nature should be experienced with <span className="text-highlight-subtle">absolute safety</span>, deep local knowledge, and zero compromise on comfort. From <span className="text-highlight-subtle">7,900 FT cloud ridges in Kalga</span> to <span className="text-highlight-subtle">sunrise sky deck domes in Munnar</span>, here is why 1,500+ travelers trust <span className="text-hover-marker" style={{ cursor: 'pointer' }}><span className="marker-text">Aanandham.Stays</span></span>.
                            </p>

                            {/* 4 Interactive Expedition Tag Note Cards (2x2 Grid on Desktop / Smooth Swipe Track on Mobile) */}
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(20px, 2.5vw, 26px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.02em',
                                lineHeight: 1.3,
                                marginBottom: '20px'
                            }}>
                                Four Reasons Travelers Trust Our Mountain Stays
                            </h3>
                            <div className="why-desktop-pillars" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                                gap: '16px', 
                                marginBottom: '28px',
                                paddingTop: '6px'
                            }}>
                                {WHY_AANANDHAM_PILLARS.map((pillar, idx) => {
                                    const isSelected = activeWhyIdx === idx;
                                    return (
                                        <motion.div
                                            key={pillar.id}
                                            onClick={() => setActiveWhyIdx(idx)}
                                            whileHover={{ 
                                                y: -6, 
                                                rotate: 0,
                                                scale: 1.02,
                                                boxShadow: isSelected 
                                                    ? '0 20px 40px rgba(229, 169, 59, 0.25), 0 4px 12px rgba(0,0,0,0.08)' 
                                                    : '0 16px 36px rgba(0,0,0,0.12)' 
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                                            style={{
                                                position: 'relative',
                                                background: isSelected ? '#FFFFFF' : '#FAFAF7',
                                                border: isSelected 
                                                    ? '2px solid #E5A93B' 
                                                    : '1.5px solid rgba(18, 22, 19, 0.18)',
                                                borderRadius: '16px',
                                                padding: '22px 20px 18px 20px',
                                                cursor: 'pointer',
                                                transform: 'none',
                                                transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                                                boxShadow: isSelected 
                                                    ? '0 14px 34px rgba(229, 169, 59, 0.22), 0 4px 12px rgba(0,0,0,0.06)' 
                                                    : '0 4px 14px rgba(0,0,0,0.04)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                minHeight: '175px'
                                            }}
                                        >
                                            {/* Brass Metal Eyelet Ring at Top Left */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '12px',
                                                left: '14px',
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                background: 'radial-gradient(circle at 35% 35%, #FDE047 0%, #D97706 70%, #78350F 100%)',
                                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.3)',
                                                border: '1px solid #92400E',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <div style={{
                                                    width: '4px',
                                                    height: '4px',
                                                    borderRadius: '50%',
                                                    background: '#0B150E'
                                                }} />
                                            </div>

                                            {/* Top Row: Serial Tag + Seal Stamp Badge */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingLeft: '14px' }}>
                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: '900',
                                                    letterSpacing: '1px',
                                                    color: isSelected ? '#E5A93B' : '#2D3748',
                                                    textTransform: 'uppercase',
                                                    fontFamily: 'monospace'
                                                }}>
                                                    {pillar.serial}
                                                </span>

                                                <span style={{
                                                    fontSize: '9px',
                                                    fontWeight: '900',
                                                    letterSpacing: '0.8px',
                                                    textTransform: 'uppercase',
                                                    padding: '3px 8px',
                                                    borderRadius: '4px',
                                                    background: isSelected ? 'rgba(229, 169, 59, 0.2)' : 'rgba(0, 0, 0, 0.08)',
                                                    color: isSelected ? '#92400E' : '#1A202C',
                                                    border: `1px solid ${isSelected ? 'rgba(229, 169, 59, 0.5)' : 'rgba(0,0,0,0.12)'}`
                                                }}>
                                                    ✓ {pillar.seal}
                                                </span>
                                            </div>

                                            {/* Main Content: Icon + Title */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <div style={{
                                                    width: '38px',
                                                    height: '38px',
                                                    borderRadius: '10px',
                                                    background: isSelected ? 'rgba(229, 169, 59, 0.22)' : 'rgba(0, 0, 0, 0.08)',
                                                    color: isSelected ? '#92400E' : '#121613',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '18px',
                                                    flexShrink: 0,
                                                    transition: 'background 0.25s ease, color 0.25s ease'
                                                }}>
                                                    <pillar.statIcon size={18} strokeWidth={2.4} />
                                                </div>
                                                <h4 style={{
                                                    fontFamily: 'var(--font-heading)',
                                                    fontSize: '15.5px',
                                                    fontWeight: '800',
                                                    color: '#0F172A',
                                                    margin: 0,
                                                    lineHeight: 1.25,
                                                    letterSpacing: '-0.02em'
                                                }}>
                                                    {pillar.fullTitle || pillar.title}
                                                </h4>
                                            </div>

                                            {/* High-Contrast Tagline Pill */}
                                            <div style={{
                                                fontSize: '11.5px',
                                                fontWeight: '800',
                                                color: isSelected ? '#121613' : '#1E293B',
                                                background: isSelected ? 'rgba(229, 169, 59, 0.22)' : 'rgba(0, 0, 0, 0.06)',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                marginTop: 'auto',
                                                width: 'fit-content',
                                                border: isSelected ? '1px solid rgba(229, 169, 59, 0.45)' : '1px solid rgba(0,0,0,0.06)'
                                            }}>
                                                ✦ {pillar.tagline}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Certified Trust Badges */}
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid rgba(18, 22, 19, 0.08)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#121613', fontWeight: '700' }}>
                                    <span style={{ color: '#E5A93B', display: 'inline-flex' }}><ShieldCheck size={16} /></span>
                                    <span>Verified Property Audits</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#121613', fontWeight: '700' }}>
                                    <span style={{ color: '#E5A93B', display: 'inline-flex' }}><Star size={16} fill="#E5A93B" /></span>
                                    <span>4.98 / 5.0 Rating</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#121613', fontWeight: '700' }}>
                                    <span style={{ color: '#E5A93B', display: 'inline-flex' }}><Zap size={16} /></span>
                                    <span>Zero Commission Direct Booking</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                4. STAY AMENITIES & HIGHLAND SOLACE
                   - Pinned sticky left headline while right cards scroll until section end
            ───────────────────────────────────────────────────────────── */}
            <motion.section 
                id="experiences" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={SECTION_PAD}
            >
                <div style={CONTAINER}>
                    <div className="sticky-split-grid" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 4vw, 56px)' }}>
                        
                        {/* Sticky Pinned Left Header */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInLeft}
                            className="sticky-pinned-col reveal-fade-left" 
                            style={{ position: 'sticky', top: '100px' }}
                        >
                            <div className="star-badge" style={{ marginBottom: '14px' }}>
                                <span className="star-icon">★</span> STAY AMENITIES & SOLACE
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(32px, 4.5vw, 48px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.035em',
                                lineHeight: 1.18,
                                marginBottom: '16px'
                            }}>
                                Rest, recharge, and reconnect — <span className="text-marker-3">mountain living at its finest</span>
                            </h2>
                            <p style={{ fontSize: '15.5px', color: '#59655D', lineHeight: 1.65, margin: 0, maxWidth: '420px' }}>
                                From morning Chai on misty sunrise decks and warm evening firesides to hot homecooked regional meals and heated dome comforts, our sanctuaries are built for quiet rejuvenation.
                            </p>
                        </motion.div>

                        {/* Scrolling Right Cards (Icon Above, Straight in Sight) */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            {EXPERIENCE_ITEMS.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    variants={cardReveal}
                                    className={`hover-lift reveal-fade-up reveal-delay-${(idx % 4) + 1}`}
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(18, 22, 19, 0.08)',
                                        borderRadius: '22px',
                                        padding: '24px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                                        minHeight: '210px'
                                    }}
                                >
                                    {/* Icon & Category Header Row */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#F1F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <exp.icon size={20} strokeWidth={2} />
                                                </div>
                                                <span style={{ fontSize: '11px', fontWeight: '800', color: '#8E9B92', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                                    {exp.category}
                                                </span>
                                            </div>
                                            <span style={{ fontSize: '11px', color: '#B5C0B8', fontWeight: '800' }}>
                                                0{idx + 1}
                                            </span>
                                        </div>

                                        {/* Title in Sight */}
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: '800', color: '#121613', marginBottom: '8px', lineHeight: 1.3 }}>
                                            {exp.title}
                                        </h3>

                                        {/* Compact Paragraph */}
                                        <p style={{ fontSize: '13.5px', color: '#59655D', lineHeight: 1.55, margin: 0 }}>
                                            {exp.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                9. MAKE IT HAPPEN IN JUST FOUR STEPS (Ref Screenshot 3 - media_1786656749498.png)
                   - Pinned sticky left heading while right steps scroll until section end
            ───────────────────────────────────────────────────────────── */}
            <motion.section 
                id="steps" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={SECTION_PAD}
            >
                <div style={CONTAINER}>
                    <div className="sticky-split-grid" style={{ alignItems: 'flex-start', gap: 'clamp(32px, 4vw, 56px)' }}>
                        
                        {/* Sticky Pinned Left Header */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInLeft}
                            className="sticky-pinned-col reveal-fade-left" 
                            style={{ position: 'sticky', top: '100px' }}
                        >
                            <div className="star-badge" style={{ marginBottom: '14px' }}>
                                <span className="star-icon">★</span> STEPS
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(34px, 4.5vw, 52px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.035em',
                                lineHeight: 1.1,
                                marginBottom: '24px'
                            }}>
                                Make it happen in <br />just <span className="text-marker-2">four steps</span>
                            </h2>
                            <p style={{ fontSize: '15.5px', color: '#59655D', lineHeight: 1.7, marginBottom: '32px', maxWidth: '420px' }}>
                                We’ve made the entire process smooth and hassle-free. Our team guides you through every step from booking to arrival — just show up ready for highland solace and mountain sunrises.
                            </p>
                        </motion.div>

                        {/* Scrolling Right Steps List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {FOUR_STEPS.map((step, idx) => (
                                <motion.div 
                                    key={idx} 
                                    variants={cardReveal}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.15 }}
                                    className={`hover-lift reveal-fade-up reveal-delay-${idx + 1}`}
                                    style={{ 
                                        display: 'flex', 
                                        gap: '24px', 
                                        alignItems: 'flex-start',
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(18, 22, 19, 0.08)',
                                        borderRadius: '24px',
                                        padding: '28px 28px',
                                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.02)'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: '#121613',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '15px',
                                        fontWeight: '900',
                                        color: '#E5A93B',
                                        flexShrink: 0,
                                        boxShadow: '0 4px 14px rgba(18, 22, 19, 0.15)'
                                    }}>
                                        {step.num}
                                    </div>
                                    <div style={{ flex: 1, paddingTop: '2px' }}>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800', color: '#121613', marginBottom: '8px', lineHeight: 1.3 }}>
                                            {step.title}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: '#59655D', lineHeight: 1.65, margin: 0 }}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                10. TESTIMONIALS & VIDEO DIARIES (Ref Screenshot 5 - media_1786656749593.png)
            ───────────────────────────────────────────────────────────── */}
            <motion.section 
                id="stories" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={{ position: 'relative', padding: 'clamp(44px, 5.5vw, 68px) clamp(20px, 4vw, 48px)' }}
            >
                <div style={CONTAINER}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
                        <div>
                            <div className="star-badge">
                                <span className="star-icon">★</span> TESTIMONIALS
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 3.8vw, 42px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.035em',
                                margin: '0 0 6px'
                            }}>
                                Read the stories from <span style={{ color: '#8E9B92' }}>past guests</span>
                            </h2>
                            <p style={{ color: '#59655D', fontSize: '14px', margin: 0 }}>
                                A glimpse into life at our highland sanctuaries
                            </p>
                        </div>

                        {/* Carousel Navigation Buttons */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button 
                                onClick={prevTestimonial} 
                                aria-label="Previous testimonial"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid rgba(18, 22, 19, 0.1)', color: '#121613', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}
                            >
                                <ChevronLeft size={13} />
                            </button>
                            <button 
                                onClick={nextTestimonial} 
                                aria-label="Next testimonial"
                                style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid rgba(18, 22, 19, 0.1)', color: '#121613', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}
                            >
                                <ChevronRight size={13} />
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '24px', alignItems: 'stretch' }}>
                        
                        {/* Authentic Real Polaroid Photo Card */}
                        <div 
                            onClick={() => setIsVideoModalOpen(true)} 
                            className="vintage-polaroid-frame reveal-zoom"
                            role="button"
                            tabIndex={0}
                            aria-label="Play Kolukkumalai Sunrise Guest Video"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsVideoModalOpen(true); }}
                        >
                            {/* Washi Tape Scrap on Top */}
                            <div className="polaroid-tape" />

                            {/* Sharp Authentic Photo Cutout */}
                            <div className="polaroid-inner-photo">
                                <img 
                                    src="/images/acoustic-campfires-bbq.jpg" 
                                    alt="Aanandham Stays Campfire" 
                                    loading="lazy"
                                    decoding="async"
                                    style={IMG_FILL} 
                                />
                                
                                {/* Subtle Vignette Gradient */}
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(14, 24, 17, 0.65) 0%, transparent 55%)' }} />

                                {/* Video Play Button */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '58px',
                                    height: '58px',
                                    borderRadius: '50%',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    color: '#121613',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
                                    backdropFilter: 'blur(8px)'
                                }}>
                                    <Play size={16} style={{ marginLeft: '3px' }} />
                                </div>

                                {/* Top Live Badge */}
                                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                    <span style={{ background: '#E5A93B', color: '#121613', fontSize: '10.5px', fontWeight: '800', padding: '4px 10px', borderRadius: '999px' }}>
                                        ✦ Live Stay Cam
                                    </span>
                                </div>

                                {/* Polaroid Bottom Timestamp Stamp */}
                                <div style={{ position: 'absolute', bottom: '10px', left: '12px' }}>
                                    <span style={{ background: 'rgba(18, 22, 19, 0.85)', color: '#D5ED55', fontSize: '10px', fontWeight: '800', padding: '3px 8px', borderRadius: '2px', letterSpacing: '0.5px' }}>
                                        REC ● STAY CAM #04
                                    </span>
                                </div>
                            </div>

                            {/* Authentic Polaroid Wide Bottom Chin */}
                            <div className="polaroid-chin-text">
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#121613', letterSpacing: '-0.01em' }}>
                                        Kolukkumalai Sunrise &amp; Campfire
                                    </div>
                                    <div style={{ fontSize: '11.5px', color: '#7E8B82', marginTop: '3px', fontWeight: '600' }}>
                                        Guest Diaries · Suryanelli Ridge (7,100 FT)
                                    </div>
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '800', color: '#121613', background: '#EFECE6', padding: '5px 12px', borderRadius: '999px' }}>
                                    Play Video →
                                </span>
                            </div>
                        </div>

                        {/* Real Notebook Paper Review Sheets */}
                        {(() => {
                            const list = testimonials.length > 0 ? testimonials : TESTIMONIALS;
                            const pair = [list[testimonialIdx % list.length], list[(testimonialIdx + 1) % list.length]];
                            return pair.map((t, idx) => (
                            <motion.div 
                                key={`testimonial-card-${t.id}-${testimonialIdx}-${idx}`} 
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className={`notebook-review-card reveal-fade-up reveal-delay-${idx + 1}`}
                                style={{
                                    transform: idx === 0 ? 'rotate(-0.8deg)' : 'rotate(0.8deg)'
                                }}
                            >
                                {/* Top Notebook Binder Punch Holes */}
                                <div className="notebook-binder-holes">
                                    <div className="notebook-binder-hole" />
                                    <div className="notebook-binder-hole" />
                                    <div className="notebook-binder-hole" />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', marginTop: '6px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <img 
                                            src={t.avatar} 
                                            alt={t.author} 
                                            loading="lazy"
                                            decoding="async"
                                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} 
                                        />
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '800', color: '#121613', lineHeight: 1.2 }}>
                                                {t.author}
                                            </div>
                                            <div style={{ fontSize: '11.5px', color: '#8E9B92', fontWeight: '600' }}>
                                                {t.batchDate}
                                            </div>
                                            {t.instagram ? (
                                                <a
                                                    href={`https://instagram.com/${encodeURIComponent(String(t.instagram).replace(/^@/, ''))}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{ fontSize: '11.5px', color: '#0B5CAD', fontWeight: '700', textDecoration: 'none' }}
                                                >
                                                    @{String(t.instagram).replace(/^@/, '')}
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>

                                    <span style={{ 
                                        background: '#EAE6DC', 
                                        border: '1px solid rgba(0, 0, 0, 0.08)', 
                                        color: '#3E4942', 
                                        fontSize: '11px', 
                                        fontWeight: '800', 
                                        padding: '4px 12px', 
                                        borderRadius: '4px',
                                        letterSpacing: '0.3px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {t.campBadge}
                                    </span>
                                </div>

                                <div style={{ fontSize: '28px', color: '#C89228', lineHeight: 1, marginBottom: '8px', fontWeight: '900', opacity: 0.8 }}>
                                    “
                                </div>

                                <p style={{ 
                                    fontSize: '14.5px', 
                                    color: '#1E2520', 
                                    lineHeight: '28px', /* Matches ruled notebook line height */
                                    marginBottom: '20px', 
                                    flex: 1, 
                                    fontWeight: '500',
                                    fontStyle: 'normal'
                                }}>
                                    {t.quote}
                                </p>

                                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px dashed rgba(0, 0, 0, 0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '11px', color: '#8E9B92', fontWeight: '700', letterSpacing: '0.5px' }}>
                                        VERIFIED CAMPER LOGBOOK
                                    </span>
                                    <span style={{ color: '#E5A93B', fontSize: '13px' }}>
                                        ★★★★★
                                    </span>
                                </div>
                            </motion.div>
                        ));
                        })()}
                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                11. ORGANIC CURVED NATURE CTA BANNER WITH SCROLL-DRIVEN ZOOM
            ───────────────────────────────────────────────────────────── */}
            <CtaParallaxBanner 
                onOpenBooking={handleOpenBooking} 
                defaultPackage={INITIAL_ALL_CAMPS[0]} 
            />

            {/* ─────────────────────────────────────────────────────────────
                12. FREQUENTLY ASKED QUESTIONS (Ref Screenshot 2 - media_1786656749472.png)
                   - Pinned sticky left contact card while right FAQ questions scroll until section end
            ───────────────────────────────────────────────────────────── */}
            <motion.section 
                id="faq" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionReveal}
                style={SECTION_PAD}
            >
                <div style={CONTAINER}>
                    
                    <div style={{ marginBottom: '60px' }}>
                        <div className="star-badge">
                            <span className="star-icon">★</span> FAQ
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(34px, 5vw, 52px)',
                            fontWeight: '800',
                            color: '#121613',
                            letterSpacing: '-0.035em'
                        }}>
                            Frequently <br />Asked Questions
                        </h2>
                    </div>

                    <div className="sticky-split-grid">
                        
                        {/* Sticky Pinned Left Floating Card */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInLeft}
                            className="hover-lift sticky-pinned-col faq-help-card reveal-fade-left" 
                            style={{ 
                                background: '#FFFFFF', 
                                border: '1px solid rgba(18, 22, 19, 0.08)', 
                                borderRadius: '24px', 
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
                                boxSizing: 'border-box'
                            }}
                        >
                            <div style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '14px', 
                                background: 'rgba(213, 237, 85, 0.25)', 
                                border: '1px solid rgba(18, 22, 19, 0.06)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                fontSize: '22px', 
                                marginBottom: '20px' 
                            }}>
                                <MessageCircle size={22} strokeWidth={2.2} />
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#121613', marginBottom: '10px' }}>
                                Still have questions?
                            </h3>
                            <p style={{ fontSize: '14px', color: '#59655D', lineHeight: 1.65, marginBottom: '28px' }}>
                                Whether it’s about the program, accommodation, or anything in between – we’re happy to help.
                            </p>
                            <Link
                                href="/contact"
                                className="action-arrow-btn-dark"
                                style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                            >
                                <span>Contact Us</span>
                                <div className="btn-arrow-circle">
                                    →
                                </div>
                            </Link>
                        </motion.div>

                        {/* Scrolling Right Accordions 01-06 */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={fadeInRight}
                            className="reveal-fade-right"
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            {FAQ_DATA.map((faq, index) => {
                                const isOpen = activeFaq === index;
                                return (
                                    <div key={faq.id} style={{ borderBottom: '1px solid rgba(18, 22, 19, 0.1)', padding: '24px 0' }}>
                                        <button onClick={() => setActiveFaq(isOpen ? -1 : index)} style={{ width: '100%', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '13px', fontWeight: '800', color: '#8E9B92', marginTop: '2px' }}>{faq.num}</span>
                                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: '700', color: '#121613', lineHeight: 1.4 }}>{faq.question}</span>
                                            </div>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F1F3EC', color: '#121613', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <ChevronDown size={11} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                                            </div>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{ padding: '16px 0 0 38px' }}>
                                                        <p style={{ fontSize: '15px', color: '#59655D', lineHeight: 1.65, margin: 0 }}>{faq.answer}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            


            {/* ─────────────────────────────────────────────────────────────
                INSTAGRAM HIGHLAND DIARIES SHOWCASE (@aanandham.go)
            ───────────────────────────────────────────────────────────── */}
            <section 
                className="insta-section-container"
                style={{
                    background: '#0B150E',
                    position: 'relative',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    width: '100%'
                }}
            >
                <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
                    <style dangerouslySetInnerHTML={{__html: `
                        .insta-section-container {
                            padding: 90px clamp(20px, 4vw, 48px);
                        }
                        .insta-section-header {
                            display: flex;
                            flex-direction: row;
                            align-items: flex-end;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            gap: 24px;
                            margin-bottom: 36px;
                            width: 100%;
                        }
                        .insta-stories-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(clamp(180px, 18vw, 230px), 1fr));
                            gap: 18px;
                            width: 100%;
                        }
                        .insta-story-card {
                            position: relative;
                            border-radius: 14px;
                            overflow: hidden;
                            aspect-ratio: 4 / 5;
                            display: block;
                            text-decoration: none;
                            background: #000;
                            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
                        }
                        .insta-story-card:hover {
                            transform: translateY(-4px);
                            box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
                        }
                        .insta-story-card .story-card-img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            display: block;
                            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        .insta-story-card:hover .story-card-img {
                            transform: scale(1.05);
                        }
                        .insta-story-card .story-card-overlay {
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 100%);
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;
                            padding: 22px;
                            color: #FFFFFF;
                        }
                        .insta-brand-button {
                            display: inline-flex;
                            align-items: center;
                            gap: 10px;
                            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                            color: #FFFFFF !important;
                            padding: 12px 28px;
                            border-radius: 100px;
                            text-decoration: none;
                            box-shadow: 0 4px 15px rgba(220, 39, 67, 0.3);
                            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        .insta-brand-button:hover {
                            transform: translateY(-3px) scale(1.02);
                            box-shadow: 0 8px 25px rgba(220, 39, 67, 0.5);
                        }
                        @media (max-width: 768px) {
                            .insta-section-container {
                                padding: 70px 0 50px !important;
                            }
                            .insta-section-header {
                                padding: 0 20px !important;
                                margin-bottom: 24px !important;
                            }
                            .insta-stories-grid {
                                display: flex !important;
                                overflow-x: auto !important;
                                scroll-snap-type: x mandatory !important;
                                scroll-behavior: smooth !important;
                                -webkit-overflow-scrolling: touch !important;
                                gap: 16px !important;
                                padding: 12px calc((100vw - min(80vw, 290px)) / 2) 28px !important;
                                scroll-padding: 0 calc((100vw - min(80vw, 290px)) / 2) !important;
                                scrollbar-width: none !important;
                                margin: 0 !important;
                                width: 100% !important;
                                max-width: 100% !important;
                                box-sizing: border-box !important;
                            }
                            .insta-stories-grid::-webkit-scrollbar {
                                display: none !important;
                            }
                            .insta-stories-grid .insta-story-card {
                                flex: 0 0 min(80vw, 290px) !important;
                                width: min(80vw, 290px) !important;
                                max-width: 290px !important;
                                min-width: 240px !important;
                                scroll-snap-align: center !important;
                                scroll-snap-stop: always !important;
                                margin: 0 !important;
                            }
                        }
                    `}} />
                    {/* Clean Header Strip */}
                    <div className="insta-section-header">
                        <div>
                            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px', color: '#E5A93B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                                LIVE DISPATCHES · @AANANDHAM.GO
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(28px, 3.6vw, 44px)',
                                fontWeight: '800',
                                color: '#FFFFFF',
                                margin: '0 0 10px 0',
                                letterSpacing: '-0.02em'
                            }}>
                                The Highland Diaries
                            </h2>
                            <p style={{ fontSize: '15px', color: '#A2B6A6', margin: 0, maxWidth: '580px', lineHeight: 1.6 }}>
                                Catch unscripted sunrise ridge views, night campfires, and mountain sunrises from Parvati Valley (Himachal) and Western Ghats (Munnar).
                            </p>
                        </div>

                        <a
                            href="https://www.instagram.com/aanandham.go/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="insta-brand-button"
                        >
                            <InstagramIcon size={20} />
                            <span style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '15px' }}>Instagram</span>
                        </a>
                    </div>

                    {/* Responsive Story Grid or Direct Follow Showcase */}
                    {instaPosts && instaPosts.length > 0 ? (
                        <div className="insta-stories-grid">
                            {instaPosts.map((story, idx) => (
                                <a
                                    key={story.id || idx}
                                    href={story.permalink || 'https://www.instagram.com/aanandham.go/'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="insta-story-card"
                                >
                                    <img
                                        src={story.media_url || story.img}
                                        alt={story.title}
                                        className="story-card-img"
                                        loading="lazy" 
                                        decoding="async"
                                    />
                                    <div className="story-card-overlay">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '1px', color: '#D5ED55', textTransform: 'uppercase' }}>
                                                {story.tag}
                                            </span>
                                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700', color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
                                                {story.title}
                                            </h3>
                                            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.4 }}>
                                                {story.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <a
                            href="https://www.instagram.com/aanandham.go/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                gap: '20px',
                                padding: '36px clamp(24px, 4vw, 44px)',
                                borderRadius: '22px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(213, 237, 85, 0.25)',
                                textDecoration: 'none',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                width: '100%'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(213, 237, 85, 0.5)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(213, 237, 85, 0.25)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                <div style={{
                                    width: '54px',
                                    height: '54px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    boxShadow: '0 8px 24px rgba(220, 39, 67, 0.3)'
                                }}>
                                    <InstagramIcon size={28} color="#FFFFFF" />
                                </div>
                                <div>
                                    <div style={{ fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                                        Follow @aanandham.go on Instagram
                                    </div>
                                    <div style={{ fontSize: '13.5px', color: '#A2B6A6' }}>
                                        Live morning mist over Kalga Village, campfire stories, and sunrise reels dispatched daily from our mountain stays.
                                    </div>
                                </div>
                            </div>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#D5ED55',
                                color: '#121613',
                                padding: '12px 24px',
                                borderRadius: '999px',
                                fontSize: '13.5px',
                                fontWeight: '800'
                            }}>
                                <span>Open @aanandham.go Feed</span>
                                <span>→</span>
                            </span>
                        </a>
                    )}
                </div>
            </section>

            </main>

            {/* ─────────────────────────────────────────────────────────────
                13. DEEP FOREST GREEN FOOTER (Ref Screenshot 2 Batch 3 - media_1786657185483.png)
                   - Interactive lighting & directional ↗ arrows
                   - Smooth watermark light-up
            ───────────────────────────────────────────────────────────── */}
            {/* 13. REUSABLE FOOTER */}
            <Footer />

            {/* ─────────────────────────────────────────────────────────────
                MODALS (Real Video, Gallery Lightbox & Booking Engine)
            ───────────────────────────────────────────────────────────── */}

            {/* ─────────────────────────────────────────────────────────────
                MODALS (Real Video, Gallery Lightbox & Booking Engine)
            ───────────────────────────────────────────────────────────── */}
            
            {/* 1. Real 4K Mountain Expedition Video Modal */}
            <AnimatePresence>
                {isVideoModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Aanandham Stays Mountain Video Player"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9999,
                            background: 'rgba(0, 0, 0, 0.94)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '24px'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95 }}
                            style={{
                                width: '100%',
                                maxWidth: '860px',
                                background: '#0A0D0B',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
                            }}
                        >
                            <button
                                onClick={() => setIsVideoModalOpen(false)}
                                aria-label="Close video player"
                                className="modal-close-btn"
                                style={{
                                    position: 'absolute',
                                    top: '16px',
                                    right: '16px',
                                    zIndex: 10
                                }}
                            >
                                ✕
                            </button>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                <iframe
                                    src="https://www.youtube-nocookie.com/embed/1s-P5_Lq0pI?autoplay=1"
                                    title="Aanandham Stays Mountain Video Diaries"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 0
                                    }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Interactive Full Booking Engine Modal */}
            <BookingEngineModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                initialPackage={selectedPackage}
            />

            {/* Floating Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <div style={{
                        position: 'fixed',
                        bottom: '32px',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerEvents: 'none',
                        zIndex: 100000,
                        padding: '0 16px'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.22 }}
                            style={{
                                pointerEvents: 'auto',
                                background: '#121613',
                                color: '#FFFFFF',
                                padding: '12px 24px',
                                borderRadius: '999px',
                                boxShadow: '0 12px 36px rgba(0,0,0,0.5)',
                                fontSize: '13.5px',
                                fontWeight: '700',
                                border: '1px solid rgba(213, 237, 85, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <span>{toastMessage}</span>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            </div>
        </MotionConfig>
    );
}
