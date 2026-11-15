"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '../../components/SiteHeader.jsx';
import Footer from '../../components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { waLink } from '../../lib/whatsapp';
import { 
    Mountain, Compass, Tent, ShieldCheck, Flame, Leaf, Star, 
    Sunrise, Heart, Sparkles, Users, ChevronLeft, 
    ChevronRight, Check, Zap, MapPin, ScrollText, Hexagon, Plus, Minus,
    ArrowRight, Footprints, Bed, Coffee, Sun
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../../components/common/BrandIcons';
import { loadTestimonialsFromStorage, DEFAULT_TESTIMONIALS } from '../../lib/testimonialsCore';

const CONTAINER = { maxWidth: '1440px', margin: '0 auto', width: '100%' };

// ── HIGH-PERFORMANCE REVEAL VARIANTS ──
const sectionReveal = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.03
        }
    }
};

const cardReveal = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
    }
};

// ── 1. THE 4 PILLARS OF AANANDHAM HOSPITALITY (Tactile Sticky Notes) ──
const WILDERNESS_PILLARS = [
    {
        id: '01',
        title: '01 — Belong',
        subtitle: 'Feel at home, wherever you are.',
        tag: 'PILLAR · 01',
        paperBg: '#FEF08A',
        inkColor: '#1A1D0E',
        icon: Heart,
        desc: 'We create spaces where guests feel welcomed, comfortable and connected — not like transient visitors, but like part of an extended mountain family.',
        specs: [
            'Warm host welcomes where you are embraced like old friends',
            'Comfort-first mountain stays with thoughtful personal details',
            'Safe, inclusive sanctuary for solo travelers, couples & squads'
        ],
        memo: '“You never arrive as just a visitor; you arrive as part of something.”'
    },
    {
        id: '02',
        title: '02 — Experience',
        subtitle: 'Stay for the place. Remember the feeling.',
        tag: 'PILLAR · 02',
        paperBg: '#D9F99D',
        inkColor: '#0F2414',
        icon: Compass,
        desc: 'From Parvati Valley sunrise decks to hot Pahadi Siddu and starlit ridges, we build stays that let you genuinely feel the mountain soul.',
        specs: [
            'Golden sunrise views pouring across alpine balconies',
            'Authentic local meals & slow-cooked traditional recipes',
            'Quiet ridge evenings listening to the whispering deodar breeze'
        ],
        memo: '“Stay for the place. Remember the feeling forever.”'
    },
    {
        id: '03',
        title: '03 — Connect',
        subtitle: 'People make places memorable.',
        tag: 'PILLAR · 03',
        paperBg: '#FED7AA',
        inkColor: '#2D1406',
        icon: Users,
        desc: 'Our properties are designed to foster spontaneous conversations, shared fireside chai, and authentic bonds between travelers and village hosts.',
        specs: [
            'Campfire circles built for unhurried storytelling under the stars',
            'Genuine bonds between travelers, local guides & village caretakers',
            'Laughter and camaraderie shared with friends you just met'
        ],
        memo: '“People make places memorable. Strangers become lifelong friends.”'
    },
    {
        id: '04',
        title: '04 — Aanandham',
        subtitle: 'Hospitality that brings happiness.',
        tag: 'PILLAR · 04',
        paperBg: '#A7F3D0',
        inkColor: '#062817',
        icon: Sparkles,
        desc: 'At the heart of everything is Aanandham — creating peaceful spaces, joyful moments, and stays that leave you feeling lighter than when you arrived.',
        specs: [
            'Peaceful off-grid basecamps to unplug, read, work, and recharge',
            'Joyful mountain routines that unfold naturally without rush',
            'Honest direct host rates with zero platform markups'
        ],
        memo: '“At the heart of everything is Aanandham: hospitality that brings pure happiness.”'
    }
];

// ── 2. OUR EVOLUTION TIMELINE (2024 — 2026) ──
const TIMELINE_MILESTONES = [
    {
        year: '2024',
        title: 'The Engineering Dorm Spark',
        tag: 'WHERE IT STARTED',
        desc: 'Living the usual college life of classes and deadlines, we asked: Is life really meant to be just about routines and waiting for breaks? We packed our rucksacks for the mountains to find a freer, more grounded way of living.'
    },
    {
        year: '2024',
        title: 'Highland Scouting & The Kalga Calling',
        tag: 'PARVATI SCOUTING',
        desc: 'We hiked beyond the motorable road from Barshaini into Kalga Village, Himachal Pradesh. We discovered an untouched pine sanctuary where village hosts treated guests like family, and realized authentic stays should be transparent, personal, and commission-free.'
    },
    {
        year: '2025',
        title: 'The Nest Kalga & Munnar Sanctuaries',
        tag: 'SANCTUARY LAUNCH',
        desc: 'Established The Nest Kalga at 7,900 FT with 10-bed budget dorms from ₹249 alongside private balcony suites, paired with our high-altitude geodesic sky-deck domes at Kolukkumalai, Munnar. Clean rooms, hot geysers, and genuine host hospitality.'
    },
    {
        year: '2026',
        title: 'Aanandham Stays & Alpine Treks',
        tag: 'AANANDHAM STAYS',
        desc: 'Expanded into a verified mountain sanctuary network across Himachal Pradesh and Munnar with direct WhatsApp host booking, automated check-ins, and guided alpine treks to Kheerganga and Bhun Buni Thatch.'
    }
];

// ── 3. THE TEAM & MOUNTAIN STEWARDS ──
const FOUNDING_MEMBERS = [
    {
        id: 'lino',
        name: 'Lino',
        role: 'Creator & Founder',
        badge: 'FOUNDER & CREATOR',
        initial: 'L',
        accent: '#B45309',
        bg: 'rgba(229, 169, 59, 0.12)',
        border: 'rgba(229, 169, 59, 0.55)',
        tagBg: 'rgba(229, 169, 59, 0.16)',
        tagColor: '#92400E',
        tagline: 'The visionary spark that built an authentic network of peaceful highland sanctuaries.'
    },
    {
        id: 'jishan',
        name: 'Jishan',
        role: 'Media & Production',
        badge: 'MEDIA & VISUALS',
        initial: 'J',
        accent: '#166534',
        bg: 'rgba(22, 101, 52, 0.08)',
        border: 'rgba(22, 101, 52, 0.28)',
        tagBg: '#DCFCE7',
        tagColor: '#166534',
        tagline: 'Visual storytelling, property photography, and mountain brand aesthetics.'
    },
    {
        id: 'aman',
        name: 'Aman',
        role: 'Lead Dev & Tech',
        badge: 'TECH & PLATFORM',
        initial: 'A',
        accent: '#0369A1',
        bg: 'rgba(2, 132, 199, 0.08)',
        border: 'rgba(2, 132, 199, 0.28)',
        tagBg: '#E0F2FE',
        tagColor: '#0369A1',
        tagline: 'Architecting direct booking engines, instant passes, and reservation infrastructure.'
    },
    {
        id: 'aditya',
        name: 'Aditya',
        role: 'Creative',
        badge: 'CREATIVE',
        initial: 'A',
        accent: '#BE185D',
        bg: 'rgba(190, 24, 93, 0.08)',
        border: 'rgba(190, 24, 93, 0.28)',
        tagBg: '#FCE7F3',
        tagColor: '#BE185D',
        tagline: 'Designing immersive guest journeys, brand identity, and sanctuary aesthetics.'
    },
    {
        id: 'vishnu',
        name: 'Vishnu',
        role: 'Operations & Host Relations',
        badge: 'OPERATIONS & LOGISTICS',
        initial: 'V',
        accent: '#C2410C',
        bg: 'rgba(194, 65, 12, 0.08)',
        border: 'rgba(194, 65, 12, 0.28)',
        tagBg: '#FFEDD5',
        tagColor: '#C2410C',
        tagline: 'Managing property grounds, host hospitality relations, and guest safety standards.'
    },
    {
        id: 'prithvi',
        name: 'PR & Community',
        role: 'Community Relations',
        badge: 'PR & OUTREACH',
        initial: 'P',
        accent: '#6D28D9',
        bg: 'rgba(109, 40, 217, 0.08)',
        border: 'rgba(109, 40, 217, 0.28)',
        tagBg: '#EDE9FE',
        tagColor: '#6D28D9',
        tagline: 'Connecting travelers, community relations, and outdoor mountain culture.'
    }
];

// ── 4. ABOUT & STAY BOOKING FAQS ──
const ABOUT_FAQS = [
    {
        num: '01',
        q: 'Where is The Nest Kalga located and how do we reach it?',
        a: 'The Nest Kalga is located at 7,900 FT in Kalga Village, Parvati Valley, Himachal Pradesh. Take an HRTC bus or cab to Barshaini (the roadhead where the road ends). From Barshaini, cross the dam bridge and take a scenic 20-minute deodar pine trail ascending into Kalga Village. Our host team meets you at the trail entrance.'
    },
    {
        num: '02',
        q: 'What room formats are available at The Nest Kalga in Himachal?',
        a: 'We offer three options: (1) 10-Bed Mountain Dorm from ₹249/bed/night with individual reading lights, USB charging, shared geyser hot showers, and mountain Wi-Fi; (2) Deluxe Sunrise Balcony Rooms (₹1,499) with private apple orchard views; and (3) Deluxe Family Suites (₹1,199) with ensuite bathrooms and work desks.'
    },
    {
        num: '03',
        q: 'How does direct host booking work with zero OTA commission?',
        a: 'Unlike generic booking portals that add inflated 20-25% platform commissions, Aanandham Stays connects you directly with on-site host desks via WhatsApp. You receive genuine direct host tariffs, authentic weather guidance, and instant booking confirmation.'
    },
    {
        num: '04',
        q: 'Can we book guided treks directly from The Nest Kalga basecamp?',
        a: 'Yes! The Nest Kalga serves as our direct Himalayan basecamp for guided 2D/1N treks: Kheerganga Hot Springs Trek (₹900/person), Bhun Buni Thatch Alpine Trek (₹3,000/person), and Bhandak Thach (₹3,999/person). All treks include certified mountain guides, tents, sleeping bags, dinner, and breakfast.'
    },
    {
        num: '05',
        q: 'Is it safe for solo female travelers, couples, and workationers?',
        a: '100% yes. Every sanctuary in our collection is personally inspected and owner-operated. We maintain private gated grounds, 24/7 on-site resident hosts, secure rooms, high-speed Wi-Fi, solar backup power, and clean modern western washrooms with running hot water geysers.'
    }
];

export default function AboutPage() {
    const [activeFaq, setActiveFaq] = useState(0);
    const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
    const { user: currentUser, logout: handleLogout } = useAuth();
    const testimonialScrollRef = useRef(null);

    const scrollTestimonials = (direction) => {
        if (testimonialScrollRef.current) {
            const scrollAmount = direction === 'next' ? 380 : -380;
            testimonialScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

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

    const ctaRef = useRef(null);
    const { scrollYProgress: ctaScrollProgress } = useScroll({
        target: ctaRef,
        offset: ["start end", "end start"]
    });
    const ctaBgScale = useTransform(ctaScrollProgress, [0, 0.5, 1], [1.0, 1.15, 1.25]);
    const ctaBgY = useTransform(ctaScrollProgress, [0, 1], ["-5%", "5%"]);

    return (
        <div style={{
            minHeight: '100%',
            backgroundColor: '#F8F9F5',
            color: '#121613',
            fontFamily: 'var(--font-jakarta), "Plus Jakarta Sans", sans-serif',
            position: 'relative',
            overflowX: 'clip'
        }}>
            {/* ── UNIFIED REUSABLE SITE HEADER ── */}
            <SiteHeader 
                activePage="about" 
                currentUser={currentUser} 
                onLogout={handleLogout}
            />

            <main>
                {/* ─────────────────────────────────────────────────────────────
                    1. HERO SECTION: AUTHENTIC HIMALAYAN ALPINE HERO
                ───────────────────────────────────────────────────────────── */}
                <section 
                    className="hero-defensive-height"
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: 'clamp(120px, 16vh, 165px) 24px clamp(50px, 8vh, 85px)',
                        backgroundImage: 'url("/images/treks/parvati-valley-himachal-hero.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 45%',
                        color: '#FFFFFF',
                        overflow: 'hidden'
                    }}
                >
                    {/* Radial Dark Highland Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(7, 13, 9, 0.55) 0%, rgba(9, 18, 12, 0.88) 100%)'
                    }} />

                    <motion.div 
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ maxWidth: '980px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                    >
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '13px', color: '#A2B6A6' }}>
                            <Link href="/" style={{ color: '#E1E9E2', textDecoration: 'none' }}>Home</Link>
                            <span>/</span>
                            <span style={{ color: '#D5ED55', fontWeight: '700' }}>About Aanandham Stays</span>
                        </nav>

                        {/* Top Star Badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(213, 237, 85, 0.14)',
                            border: '1px solid rgba(213, 237, 85, 0.35)',
                            borderRadius: '999px',
                            padding: '6px 18px',
                            marginBottom: '20px'
                        }}>
                            <span style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: '#D5ED55',
                                boxShadow: '0 0 8px #D5ED55',
                                display: 'inline-block'
                            }} />
                            <span style={{ fontSize: '11px', fontWeight: '900', color: '#D5ED55', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                                OUR STORY · HIMACHAL &amp; MUNNAR
                            </span>
                        </div>

                        {/* Single Primary H1 */}
                        <motion.h1 
                            className="hero-headline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(38px, 6.5vw, 76px)',
                                fontWeight: '800',
                                lineHeight: 1.08,
                                letterSpacing: '-0.04em',
                                color: '#FFFFFF',
                                marginBottom: '20px'
                            }}
                        >
                            Our Story &amp; Highland Ethos
                            <br />
                            <span style={{ fontSize: '0.6em', fontWeight: '700', color: '#D5ED55', letterSpacing: '-0.02em' }}>
                                Out of the Classroom, Into the Mountains
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, delay: 0.2 }}
                            style={{
                                fontSize: 'clamp(15.5px, 1.8vw, 18.5px)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                lineHeight: 1.68,
                                maxWidth: '820px',
                                margin: '0 auto clamp(24px, 4vh, 38px)'
                            }}
                        >
                            Founded by engineering students who traded corporate cubicles for Parvati Valley pine trails and misty Western Ghats ridges. We built Aanandham Stays to give travelers authentic, owner-operated mountain homestays — from budget dorms at ₹249 in Kalga Village to geodesic domes in Munnar, free from inflated OTA markups.
                        </motion.p>

                        {/* Quick Action Button Cluster */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '14px'
                            }}
                        >
                            <Link
                                href="/camps"
                                className="btn-lime"
                                style={{
                                    padding: '14px 34px',
                                    fontSize: '15px',
                                    textDecoration: 'none',
                                    boxShadow: '0 10px 30px rgba(213, 237, 85, 0.3)'
                                }}
                            >
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Tent size={16} /> Explore Handpicked Stays →
                                </span>
                            </Link>

                            <a
                                href="#the-nest-kalga"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none',
                                    background: 'rgba(0, 0, 0, 0.45)',
                                    border: '1px solid rgba(255, 255, 255, 0.35)',
                                    color: '#FFFFFF',
                                    padding: '13px 28px',
                                    borderRadius: '999px',
                                    fontWeight: '700',
                                    fontSize: '14.5px',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Mountain size={15} color="#D5ED55" /> The Nest Kalga Basecamp ↓
                                </span>
                            </a>

                            <Link
                                href="/treks"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textDecoration: 'none',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                    color: '#FFFFFF',
                                    padding: '13px 26px',
                                    borderRadius: '999px',
                                    fontWeight: '700',
                                    fontSize: '14.5px',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <Footprints size={15} color="#D5ED55" /> Guided Alpine Treks →
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── LIVE BASECAMP MARQUEE TICKER ── */}
                <div className="marquee-container" aria-hidden="true" style={{ background: '#0B150E', color: '#FFFFFF' }}>
                    <div className="marquee-track">
                        {[
                            { icon: Mountain, label: '7,900 FT THE NEST KALGA · PARVATI VALLEY', highlight: true },
                            { icon: Tent, label: 'BUDGET MOUNTAIN DORMS FROM ₹249 · WI-FI & SOLAR POWER' },
                            { icon: Star, label: 'PANORAMIC SUNRISE BALCONIES · APPLE ORCHARDS', highlight: true },
                            { icon: Flame, label: 'AUTHENTIC HOMECOOKED PAHADI SIDDU & KERALA MEALS' },
                            { icon: ShieldCheck, label: '100% VERIFIED SAFE FOR FEMALES & FAMILIES', highlight: true },
                            { icon: Sunrise, label: 'KOLUKKUMALAI SKY DECK GEODESIC DOMES (7,100 FT)' },
                            { icon: Zap, label: 'ZERO OTA COMMISSION · DIRECT HOST RATES', highlight: true },
                            { icon: Footprints, label: 'KHEERGANGA & BHUN BUNI THATCH TREK BASECAMP' },
                            { icon: Mountain, label: '7,900 FT THE NEST KALGA · PARVATI VALLEY', highlight: true },
                            { icon: Tent, label: 'BUDGET MOUNTAIN DORMS FROM ₹249 · WI-FI & SOLAR POWER' }
                        ].map((item, idx) => (
                            <div key={idx} className="marquee-item" style={{ color: item.highlight ? '#D5ED55' : '#FFFFFF' }}>
                                <item.icon size={16} strokeWidth={2.4} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    2. OUT OF THE CLASSROOM: THE EDITORIAL STORY SECTION + PHOTO MOSAIC
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    id="story" 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionReveal}
                    style={{
                        padding: 'clamp(70px, 8vw, 110px) 24px',
                        background: '#F8F9F5',
                        position: 'relative'
                    }}
                >
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                            gap: 'clamp(36px, 5vw, 64px)',
                            alignItems: 'center'
                        }}>
                            {/* Left: Editorial Narrative */}
                            <motion.div variants={cardReveal}>
                                <div className="star-badge" style={{ marginBottom: '16px' }}>
                                    <span className="star-icon">★</span> OUR ROOTS · IT STARTED WITH A FEELING
                                </div>

                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(28px, 4vw, 44px)',
                                    fontWeight: '800',
                                    lineHeight: 1.18,
                                    letterSpacing: '-0.03em',
                                    color: '#121613',
                                    margin: '0 0 20px'
                                }}>
                                    We Were Engineering Students Asking One Question:{' '}
                                    <span style={{ color: '#166534' }}>Is Life Just About Routines?</span>
                                </h2>

                                <p style={{ fontSize: '15.5px', color: '#4A554D', lineHeight: 1.75, marginBottom: '18px' }}>
                                    We were engineering students, living the usual life — lectures, assignments, and the constant rush of careers. But during a trip into Himachal’s Parvati Valley, as we crossed the river bridge at Barshaini and climbed the silent deodar forest path into Kalga Village, everything paused.
                                </p>

                                <p style={{ fontSize: '15.5px', color: '#4A554D', lineHeight: 1.75, marginBottom: '22px' }}>
                                    We wanted to discover authentic mountain sanctuaries — places where the air smells of pine needles and woodsmoke, where you wake up to birdsong over apple orchards, and where the host serves hot fresh Siddu and sits beside the evening fire to share stories of the high passes.
                                </p>

                                {/* 5 Moments of Connection */}
                                <div style={{
                                    background: 'rgba(27, 77, 62, 0.05)',
                                    border: '1px solid rgba(27, 77, 62, 0.14)',
                                    borderRadius: '20px',
                                    padding: '22px 24px',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{ fontSize: '11.5px', fontWeight: '900', color: '#166534', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Sparkles size={14} color="#166534" />
                                        And every time we reached the high ridges, we realized:
                                    </div>
                                    <div style={{ fontSize: '15.5px', fontWeight: '800', color: '#121613', marginBottom: '14px', fontStyle: 'italic' }}>
                                        “Happiness is unhurried. It lives in warmth, shared meals, and mountain peace.”
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
                                        {[
                                            { icon: '🌲', text: 'Walking ancient deodar pine paths in Kalga' },
                                            { icon: '🍲', text: 'Sharing hot Himachali Siddu & Pahadi chai' },
                                            { icon: '🔥', text: 'Laughing by the fireside with fellow wanderers' },
                                            { icon: '🏔️', text: 'Watching sunrise light touch 12,000 FT peaks' },
                                            { icon: '🤝', text: 'Zero OTA fees — 100% direct host support' }
                                        ].map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', color: '#121613', fontWeight: '600', background: '#FFFFFF', padding: '9px 12px', borderRadius: '12px', border: '1px solid rgba(18, 22, 19, 0.08)' }}>
                                                <span style={{ fontSize: '15px' }}>{item.icon}</span>
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p style={{ fontSize: '15.5px', color: '#4A554D', lineHeight: 1.75, margin: 0 }}>
                                    The word <strong style={{ color: '#166534' }}>Aanandham</strong> translates to <em>blissful joy</em> — and that is the soul of our sub-brand. We believe luxury isn’t about gold-plated taps; it’s about waking up above the clouds, knowing your stay directly supports local families, and feeling genuinely welcomed.
                                </p>
                            </motion.div>

                            {/* Right: Visual Showcase Card */}
                            <motion.div variants={cardReveal} style={{ position: 'relative' }}>
                                <div style={{
                                    background: '#FFFFFF',
                                    borderRadius: '28px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(18, 22, 19, 0.1)',
                                    boxShadow: '0 18px 48px rgba(18, 22, 19, 0.08)',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    <div style={{ height: '320px', position: 'relative', overflow: 'hidden' }}>
                                        <Image
                                            src="/images/the-nest-kalga-apple-orchard.jpg"
                                            alt="The Nest Kalga mountain homestay surrounded by apple orchards and pine trees in Parvati Valley, Himachal"
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />

                                        {/* Floating Badges */}
                                        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{ background: '#166534', color: '#FFFFFF', fontSize: '11px', fontWeight: '900', padding: '4px 12px', borderRadius: '999px' }}>
                                                7,900 FT ELEVATION
                                            </span>
                                            <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '999px', border: '1px solid rgba(146, 64, 14, 0.2)' }}>
                                                Kalga Village · Himachal
                                            </span>
                                        </div>

                                        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: '700', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                                                The Nest Kalga · Flagship Basecamp
                                            </span>
                                            <span style={{ background: 'rgba(22, 101, 52, 0.95)', color: '#FFFFFF', fontSize: '11px', fontWeight: '800', padding: '3px 10px', borderRadius: '999px' }}>
                                                ✓ 100% Host-Operated
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stat Grid */}
                                    <div style={{ padding: '24px 26px', background: '#FFFFFF' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center', borderBottom: '1px solid rgba(18, 22, 19, 0.08)', paddingBottom: '18px', marginBottom: '18px' }}>
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '900', color: '#166534' }}>₹249</div>
                                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#6B776E', textTransform: 'uppercase' }}>Dorm Starting</div>
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '900', color: '#121613' }}>7,900 FT</div>
                                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#6B776E', textTransform: 'uppercase' }}>High Altitude</div>
                                            </div>
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: '900', color: '#D97706' }}>0%</div>
                                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#6B776E', textTransform: 'uppercase' }}>OTA Commission</div>
                                            </div>
                                        </div>

                                        <p style={{ fontSize: '13px', color: '#59655D', lineHeight: 1.6, margin: '0 0 16px' }}>
                                            “Kalga is where the road ends and the peace begins. Our crew personally walks the ridges, verifies every room, and connects you straight to resident hosts.”
                                        </p>

                                        <Link
                                            href="/camps/the-nest-kalga"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                background: '#166534',
                                                color: '#FFFFFF',
                                                fontWeight: '800',
                                                fontSize: '13.5px',
                                                padding: '12px 20px',
                                                borderRadius: '12px',
                                                textDecoration: 'none',
                                                boxShadow: '0 4px 16px rgba(22, 101, 52, 0.25)'
                                            }}
                                        >
                                            <span>Explore The Nest Kalga Details</span>
                                            <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    3. DEDICATED SHOWCASE: THE NEST KALGA & THE HIMACHAL CHAPTER
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    id="the-nest-kalga"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionReveal}
                    style={{
                        padding: 'clamp(70px, 8vw, 110px) 24px',
                        background: '#FFFFFF',
                        borderTop: '1px solid rgba(18, 22, 19, 0.08)',
                        borderBottom: '1px solid rgba(18, 22, 19, 0.08)',
                        position: 'relative'
                    }}
                >
                    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                        {/* Section Header */}
                        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px' }}>
                            <div className="star-badge" style={{ margin: '0 auto 16px' }}>
                                <span className="star-icon">★</span> FLAGSHIP HIMALAYAN SANCTUARY
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(30px, 4.4vw, 48px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.03em',
                                margin: '0 0 16px',
                                lineHeight: 1.15
                            }}>
                                The Nest Kalga — <span style={{ color: '#166534' }}>Himalayan Basecamp</span>
                            </h2>
                            <p style={{ fontSize: '16px', color: '#4A554D', lineHeight: 1.7, margin: 0 }}>
                                Perched amidst whispering deodars and ancient apple orchards at 7,900 FT in Parvati Valley, The Nest Kalga is our answer to overcommercialized hill stations. Solar-powered, female-friendly, and built for both solo backpackers and long workation stays.
                            </p>
                        </div>

                        {/* 3 Room & Basecamp Cards Grid */}
                        <motion.div 
                            variants={staggerContainer}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                                gap: '26px',
                                marginBottom: '48px'
                            }}
                        >
                            {/* Card 1: 10-Bed Backpacker Dorm */}
                            <motion.div 
                                variants={cardReveal}
                                style={{
                                    background: '#F8F9F5',
                                    border: '1px solid rgba(18, 22, 19, 0.09)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
                                    <Image
                                        src="/images/high-altitude-ridge-tent.jpg"
                                        alt="10-bed backpacker dorm beds and sunrise balcony at The Nest Kalga in Parvati Valley"
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        style={{ objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
                                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                        <span style={{ background: '#166534', color: '#FFFFFF', fontSize: '10px', fontWeight: '900', padding: '3px 9px', borderRadius: '999px' }}>
                                            DORM BEDS · FROM ₹249
                                        </span>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', color: '#FFFFFF', fontWeight: '800', fontSize: '14px' }}>
                                        10-Bed Backpacker Mountain Dorm
                                    </div>
                                </div>
                                <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <p style={{ fontSize: '13.5px', color: '#59655D', lineHeight: 1.6, margin: '0 0 16px' }}>
                                        Individual reading lights, personal charging sockets, clean lockers, high-speed Wi-Fi, and shared hot geyser showers. The ultimate affordable base for solo explorers.
                                    </p>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                                        {['USB Charging', 'Hot Showers', 'Wi-Fi', 'Orchard Deck'].map((item, idx) => (
                                            <span key={idx} style={{ fontSize: '11px', fontWeight: '700', background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.08)', color: '#166534', padding: '3px 8px', borderRadius: '6px' }}>
                                                ✓ {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(18,22,19,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#6B776E', textTransform: 'uppercase' }}>Tariff</span>
                                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '900', color: '#121613' }}>₹249 <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B776E' }}>/ bed</span></div>
                                        </div>
                                        <Link href="/camps/the-nest-kalga" style={{ fontSize: '12.5px', fontWeight: '800', color: '#166534', textDecoration: 'none' }}>
                                            Check Dorm Dates →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: Private Balcony Suites */}
                            <motion.div 
                                variants={cardReveal}
                                style={{
                                    background: '#F8F9F5',
                                    border: '1px solid rgba(18, 22, 19, 0.09)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
                                    <Image
                                        src="/images/the-nest-kalga-apple-orchard.jpg"
                                        alt="Deluxe balcony suite with mountain and apple orchard views at The Nest Kalga"
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        style={{ objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
                                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                        <span style={{ background: '#E5A93B', color: '#121613', fontSize: '10px', fontWeight: '900', padding: '3px 9px', borderRadius: '999px' }}>
                                            PRIVATE BALCONY · ₹1,499
                                        </span>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', color: '#FFFFFF', fontWeight: '800', fontSize: '14px' }}>
                                        Deluxe Sunrise Balcony Suite
                                    </div>
                                </div>
                                <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <p style={{ fontSize: '13.5px', color: '#59655D', lineHeight: 1.6, margin: '0 0 16px' }}>
                                        Private panoramic balcony overlooking Tosh peaks and snow-clad ridges. Twin beds, hot shower geyser, wooden interiors, and quiet work desk for remote work.
                                    </p>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                                        {['Private Balcony', 'Hot Geyser', 'Work Desk', 'Couples Favorite'].map((item, idx) => (
                                            <span key={idx} style={{ fontSize: '11px', fontWeight: '700', background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.08)', color: '#166534', padding: '3px 8px', borderRadius: '6px' }}>
                                                ✓ {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(18,22,19,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#6B776E', textTransform: 'uppercase' }}>Tariff</span>
                                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '900', color: '#121613' }}>₹1,499 <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B776E' }}>/ night</span></div>
                                        </div>
                                        <Link href="/camps/the-nest-kalga" style={{ fontSize: '12.5px', fontWeight: '800', color: '#166534', textDecoration: 'none' }}>
                                            Check Suite Dates →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3: Alpine Trek Basecamp */}
                            <motion.div 
                                variants={cardReveal}
                                style={{
                                    background: '#F8F9F5',
                                    border: '1px solid rgba(18, 22, 19, 0.09)',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <div style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
                                    <Image
                                        src="/images/treks/kheerganga-trek-parvati-valley.jpg"
                                        alt="Guided trekking expedition to Kheerganga hot springs starting from Kalga basecamp"
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                                        style={{ objectFit: 'cover' }}
                                        loading="lazy"
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
                                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                                        <span style={{ background: '#121613', color: '#D5ED55', fontSize: '10px', fontWeight: '900', padding: '3px 9px', borderRadius: '999px' }}>
                                            GUIDED TREKS · FROM ₹900
                                        </span>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', color: '#FFFFFF', fontWeight: '800', fontSize: '14px' }}>
                                        Alpine Trek Basecamp
                                    </div>
                                </div>
                                <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <p style={{ fontSize: '13.5px', color: '#59655D', lineHeight: 1.6, margin: '0 0 16px' }}>
                                        Walk right out of your room into the trails — 2D/1N guided expeditions to Kheerganga Geothermal Springs (₹900), Bhun Buni Thatch (₹3,000), &amp; Bhandak Thach (₹3,999) with certified local guides.
                                    </p>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                                        {['Trek Guide', 'Camp Equipment', 'Dinner & Breakfast', 'Trail Briefing'].map((item, idx) => (
                                            <span key={idx} style={{ fontSize: '11px', fontWeight: '700', background: '#FFFFFF', border: '1px solid rgba(18,22,19,0.08)', color: '#166534', padding: '3px 8px', borderRadius: '6px' }}>
                                                ✓ {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(18,22,19,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#6B776E', textTransform: 'uppercase' }}>Trek Tariff</span>
                                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: '900', color: '#121613' }}>₹900 <span style={{ fontSize: '11px', fontWeight: '600', color: '#6B776E' }}>/ person</span></div>
                                        </div>
                                        <Link href="/treks" style={{ fontSize: '12.5px', fontWeight: '800', color: '#166534', textDecoration: 'none' }}>
                                            Browse Alpine Treks →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Four Highland Living Amenities Pill Bar */}
                        <div style={{
                            background: '#F8F9F5',
                            border: '1px solid rgba(18, 22, 19, 0.08)',
                            borderRadius: '20px',
                            padding: '24px 28px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '20px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(22, 101, 52, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Sun size={20} color="#166534" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#121613' }}>Solar Powered Basecamp</div>
                                    <div style={{ fontSize: '12px', color: '#6B776E' }}>Eco-friendly mountain backup</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(229, 169, 59, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Coffee size={20} color="#92400E" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#121613' }}>Fresh Pahadi Siddu &amp; Meals</div>
                                    <div style={{ fontSize: '12px', color: '#6B776E' }}>Hearty homecooked mountain food</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(37, 211, 102, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Flame size={20} color="#166534" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#121613' }}>Evening Campfire &amp; Stars</div>
                                    <div style={{ fontSize: '12px', color: '#6B776E' }}>Zero light pollution night sky</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(18, 22, 19, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Zap size={20} color="#121613" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#121613' }}>Zero OTA Markups</div>
                                    <div style={{ fontSize: '12px', color: '#6B776E' }}>Direct WhatsApp host booking</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    4. THE 4 UNCOMPROMISING WILDERNESS PILLARS (Tactile Sticky Notes)
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    variants={sectionReveal}
                    style={{
                        padding: '120px 24px 140px',
                        background: '#0B150E',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '1000px',
                        height: '450px',
                        background: 'radial-gradient(circle, rgba(229, 169, 59, 0.14) 0%, rgba(213, 237, 85, 0.08) 45%, transparent 70%)',
                        pointerEvents: 'none',
                        filter: 'blur(80px)'
                    }} />

                    <div style={{ width: '100%', maxWidth: 'min(100%, 1340px)', margin: '0 auto', position: 'relative', zIndex: 2, boxSizing: 'border-box' }}>
                        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div className="star-badge" style={{ margin: '0 auto 16px', background: 'rgba(213, 237, 85, 0.12)', border: '1px solid rgba(213, 237, 85, 0.35)', color: '#D5ED55' }}>
                                <span className="star-icon">★</span> OUR CORE ETHOS
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(32px, 4.5vw, 52px)',
                                fontWeight: '800',
                                color: '#FFFFFF',
                                letterSpacing: '-0.03em',
                                margin: '0 0 16px'
                            }}>
                                The 4 Pillars of <span style={{ color: '#D5ED55' }}>Aanandham Hospitality</span>
                            </h2>
                            <p style={{ fontSize: '16px', color: '#A2B6A6', maxWidth: '640px', margin: '0 auto', lineHeight: 1.65 }}>
                                Four guiding commitments carved into every sanctuary we verify and operate across Himachal Pradesh and Munnar.
                            </p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                                gap: '28px'
                            }}
                        >
                            {WILDERNESS_PILLARS.map((pillar) => (
                                <motion.div
                                    key={pillar.id}
                                    variants={cardReveal}
                                    style={{
                                        background: pillar.paperBg,
                                        borderRadius: '24px',
                                        padding: '32px 28px',
                                        color: pillar.inkColor,
                                        position: 'relative',
                                        boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '18px'
                                        }}>
                                            <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', background: 'rgba(0,0,0,0.08)', padding: '4px 10px', borderRadius: '6px' }}>
                                                {pillar.tag}
                                            </span>
                                            <pillar.icon size={22} color={pillar.inkColor} />
                                        </div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontSize: '22px',
                                            fontWeight: '800',
                                            margin: '0 0 6px',
                                            color: pillar.inkColor
                                        }}>
                                            {pillar.title}
                                        </h3>
                                        <p style={{ fontSize: '13.5px', fontWeight: '700', margin: '0 0 14px', opacity: 0.85 }}>
                                            {pillar.subtitle}
                                        </p>
                                        <p style={{ fontSize: '14px', lineHeight: 1.65, margin: '0 0 18px', opacity: 0.9 }}>
                                            {pillar.desc}
                                        </p>
                                    </div>
                                    <div style={{
                                        borderTop: '1px solid rgba(0,0,0,0.12)',
                                        paddingTop: '14px',
                                        fontSize: '12.5px',
                                        fontStyle: 'italic',
                                        opacity: 0.85
                                    }}>
                                        {pillar.memo}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    5. CHRONICLES INSCRIBED IN STONE (Evolution Timeline)
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    variants={sectionReveal}
                    style={{
                        padding: '110px clamp(20px, 4vw, 48px)',
                        background: 'linear-gradient(175deg, #1A1410 0%, #0E0C0A 50%, #141008 100%)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                background: 'rgba(180, 140, 70, 0.12)',
                                border: '1px solid rgba(180, 140, 70, 0.3)',
                                borderRadius: '999px', padding: '5px 16px',
                                fontSize: '11px', fontWeight: '800',
                                color: '#C8A855', letterSpacing: '1.2px', textTransform: 'uppercase',
                                marginBottom: '18px'
                            }}>
                                <span style={{ display: 'inline-flex' }}><Hexagon size={13} /></span> CHRONICLES INSCRIBED IN STONE
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(30px, 4.2vw, 48px)',
                                fontWeight: '800',
                                color: '#F5E8C8',
                                letterSpacing: '-0.03em',
                                margin: '0 0 14px',
                                textShadow: '0 2px 20px rgba(180, 130, 50, 0.25)'
                            }}>
                                From Student Wanderlust to{' '}
                                <span style={{
                                    color: '#D4A845',
                                    textShadow: '0 0 30px rgba(212, 168, 69, 0.4)'
                                }}>Handpicked Mountain Stays</span>
                            </h2>
                            <p style={{ fontSize: '15.5px', color: '#8A7A62', maxWidth: '580px', margin: '0 auto', lineHeight: 1.65 }}>
                                Our authentic journey — from college rucksacks in 2024 to verified highland sanctuaries across Himachal Pradesh and Munnar.
                            </p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                                gap: '24px'
                            }}
                        >
                            {TIMELINE_MILESTONES.map((mile, mIdx) => (
                                <motion.div
                                    key={mIdx}
                                    variants={cardReveal}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(212, 168, 69, 0.22)',
                                        borderRadius: '24px',
                                        padding: '32px 26px',
                                        color: '#F5E8C8',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                            <span style={{ fontSize: '28px', fontWeight: '900', color: '#D4A845', fontFamily: 'var(--font-heading)' }}>{mile.year}</span>
                                            <span style={{ fontSize: '10.5px', fontWeight: '800', background: 'rgba(212,168,69,0.15)', color: '#D4A845', padding: '4px 10px', borderRadius: '6px', letterSpacing: '0.8px' }}>{mile.tag}</span>
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: '800', margin: '0 0 10px', color: '#FFFFFF' }}>{mile.title}</h3>
                                        <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#C8BBA8', margin: 0 }}>{mile.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    6. THE TEAM & STEWARDS
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={sectionReveal}
                    style={{
                        padding: '110px clamp(20px, 4vw, 48px)',
                        background: '#F8F9F5',
                        position: 'relative'
                    }}
                >
                    <div style={CONTAINER}>
                        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <div className="star-badge" style={{ margin: '0 auto 16px' }}>
                                <span className="star-icon">★</span> TEAM &amp; STEWARDS
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(32px, 4.5vw, 50px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.03em',
                                margin: '0 0 14px'
                            }}>
                                The People Behind <span style={{ color: '#166534' }}>Aanandham Stays</span>
                            </h2>
                            <p style={{ fontSize: '16px', color: '#59655D', maxWidth: '640px', margin: '0 auto' }}>
                                Connecting travelers with personally verified, peaceful mountain sanctuaries across Himachal Pradesh and Munnar.
                            </p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                                gap: '24px'
                            }}
                        >
                            {FOUNDING_MEMBERS.map((member) => (
                                <motion.div
                                    key={member.id}
                                    variants={cardReveal}
                                    style={{
                                        background: '#FFFFFF',
                                        border: '1px solid rgba(18, 22, 19, 0.08)',
                                        borderRadius: '24px',
                                        padding: '28px',
                                        display: 'flex',
                                        gap: '20px',
                                        alignItems: 'center',
                                        boxShadow: '0 6px 24px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <div style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: '20px',
                                        background: member.bg,
                                        border: `1.5px solid ${member.border}`,
                                        color: member.accent,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        fontWeight: '900',
                                        fontFamily: 'var(--font-heading)',
                                        flexShrink: 0
                                    }}>
                                        {member.initial}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: '800', margin: 0, color: '#121613' }}>
                                                {member.name}
                                            </h3>
                                            <span style={{ fontSize: '10px', fontWeight: '800', background: member.tagBg, color: member.tagColor, padding: '3px 8px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                                                {member.badge}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '12.5px', fontWeight: '700', color: member.accent, marginBottom: '6px' }}>
                                            {member.role}
                                        </div>
                                        <p style={{ fontSize: '13px', color: '#59655D', lineHeight: 1.5, margin: 0 }}>
                                            {member.tagline}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    7. GUEST STORIES & REVIEWS (From The Nest Kalga & Kolukkumalai)
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={sectionReveal}
                    style={{
                        padding: '110px clamp(20px, 4vw, 48px)',
                        background: '#0B150E',
                        position: 'relative',
                        color: '#FFFFFF'
                    }}
                >
                    <div style={CONTAINER}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            flexWrap: 'wrap',
                            gap: '24px',
                            marginBottom: '42px'
                        }}>
                            <div>
                                <div className="star-badge" style={{ marginBottom: '14px', background: 'rgba(213,237,85,0.12)', border: '1px solid rgba(213,237,85,0.3)', color: '#D5ED55' }}>
                                    <span className="star-icon">★</span> GUEST STORIES &amp; REVIEWS
                                </div>
                                <h2 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: 'clamp(30px, 4.5vw, 48px)',
                                    fontWeight: '800',
                                    color: '#FFFFFF',
                                    margin: 0,
                                    letterSpacing: '-0.02em'
                                }}>
                                    Voices from Our Highland Stays
                                </h2>
                                <p style={{
                                    fontSize: 'clamp(14px, 1.8vw, 16px)',
                                    color: '#A6BDAA',
                                    margin: '10px 0 0 0',
                                    maxWidth: '680px',
                                    lineHeight: 1.6
                                }}>
                                    Authentic guest accounts from travelers, solo wanderers, and mountain lovers at The Nest Kalga (Parvati Valley, Himachal) and Kolukkumalai Teddy&apos;s Stays (Munnar).
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => scrollTestimonials('prev')}
                                    aria-label="Previous testimonials"
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(213,237,85,0.22)',
                                        color: '#FFFFFF',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.25s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(213,237,85,0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(213,237,85,0.45)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.borderColor = 'rgba(213,237,85,0.22)';
                                    }}
                                >
                                    <ChevronLeft size={19} />
                                </button>
                                <button
                                    onClick={() => scrollTestimonials('next')}
                                    aria-label="Next testimonials"
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(213,237,85,0.22)',
                                        color: '#FFFFFF',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.25s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(213,237,85,0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(213,237,85,0.45)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.borderColor = 'rgba(213,237,85,0.22)';
                                    }}
                                >
                                    <ChevronRight size={19} />
                                </button>
                            </div>
                        </div>

                        <div 
                            ref={testimonialScrollRef}
                            style={{
                                display: 'flex',
                                gap: '24px',
                                overflowX: 'auto',
                                scrollbarWidth: 'none',
                                paddingBottom: '22px',
                                paddingTop: '8px',
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            {testimonials.map((t, idx) => {
                                const initials = (t.author || t.name || 'HG')
                                    .split(' ')
                                    .map(part => part[0])
                                    .filter(Boolean)
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase();

                                const stayLabel = t.stayName || t.campBadge || (
                                    t.propertyId === 'the-nest-kalga' 
                                        ? 'The Nest Kalga · Parvati Valley' 
                                        : "Kolukkumalai Teddy's · Munnar"
                                );

                                return (
                                    <div
                                        key={t.id || idx}
                                        className="better-review-card"
                                    >
                                        <div className="better-review-watermark" aria-hidden="true">“</div>

                                        {/* Top Row: Stay Location Pill & 5-Star Score */}
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '12px',
                                                marginBottom: '18px',
                                                flexWrap: 'wrap'
                                            }}>
                                                <div style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    background: 'rgba(213, 237, 85, 0.12)',
                                                    border: '1px solid rgba(213, 237, 85, 0.28)',
                                                    padding: '5px 12px',
                                                    borderRadius: '999px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    color: '#D5ED55',
                                                    letterSpacing: '0.04em',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    <MapPin size={11} strokeWidth={2.5} />
                                                    <span>{stayLabel}</span>
                                                </div>

                                                <div style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    background: 'rgba(229, 169, 59, 0.14)',
                                                    border: '1px solid rgba(229, 169, 59, 0.32)',
                                                    padding: '4px 10px',
                                                    borderRadius: '999px'
                                                }}>
                                                    <div style={{ display: 'flex', gap: '2px' }}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={12} fill="#E5A93B" color="#E5A93B" />
                                                        ))}
                                                    </div>
                                                    <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#FBBF24', letterSpacing: '-0.01em' }}>
                                                        5.0
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Review Highlight Title */}
                                            {t.highlight && (
                                                <h3 style={{
                                                    fontSize: '16.5px',
                                                    fontWeight: '800',
                                                    color: '#FFFFFF',
                                                    margin: '0 0 10px 0',
                                                    lineHeight: 1.35,
                                                    letterSpacing: '-0.02em'
                                                }}>
                                                    {t.highlight}
                                                </h3>
                                            )}

                                            {/* Review Quote Body */}
                                            <p style={{
                                                fontSize: '14.5px',
                                                lineHeight: 1.72,
                                                color: 'rgba(235, 243, 237, 0.92)',
                                                margin: 0,
                                                fontWeight: '400'
                                            }}>
                                                “{t.quote || t.content}”
                                            </p>
                                        </div>

                                        {/* Card Footer: Author Profile & Verified Stay Badge */}
                                        <div style={{
                                            marginTop: '22px',
                                            borderTop: '1px solid rgba(255, 255, 255, 0.09)',
                                            paddingTop: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: '12px'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                                                <div style={{
                                                    width: '42px',
                                                    height: '42px',
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, rgba(213,237,85,0.22) 0%, rgba(34,197,94,0.18) 100%)',
                                                    border: '2px solid rgba(213, 237, 85, 0.35)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: '800',
                                                    fontSize: '13.5px',
                                                    color: '#D5ED55',
                                                    flexShrink: 0,
                                                    letterSpacing: '0.02em'
                                                }}>
                                                    {initials}
                                                </div>
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{
                                                        fontSize: '15px',
                                                        fontWeight: '800',
                                                        color: '#FFFFFF',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px'
                                                    }}>
                                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                            {t.author || t.name}
                                                        </span>
                                                        <Check size={14} style={{ color: '#D5ED55', flexShrink: 0 }} strokeWidth={3} />
                                                    </div>
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#9EB4A2',
                                                        marginTop: '2px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        <span>{t.city || t.location || 'Highland Guest'}</span>
                                                        {t.batchDate && (
                                                            <>
                                                                <span style={{ opacity: 0.4 }}>•</span>
                                                                <span style={{ opacity: 0.85 }}>{t.batchDate}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                background: 'rgba(34, 197, 94, 0.12)',
                                                border: '1px solid rgba(34, 197, 94, 0.28)',
                                                padding: '5px 10px',
                                                borderRadius: '8px',
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                color: '#4ADE80',
                                                whiteSpace: 'nowrap',
                                                flexShrink: 0
                                            }}>
                                                <ShieldCheck size={13} strokeWidth={2.5} />
                                                <span>Verified Stay</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    8. ABOUT & STAY FAQS (Accordion)
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={sectionReveal}
                    style={{
                        padding: '110px clamp(20px, 4vw, 48px)',
                        background: '#F8F9F5',
                        position: 'relative'
                    }}
                >
                    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                            <div className="star-badge" style={{ margin: '0 auto 16px' }}>
                                <span className="star-icon">★</span> STAY RESERVATION FAQS
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(32px, 4.5vw, 48px)',
                                fontWeight: '800',
                                color: '#121613',
                                letterSpacing: '-0.03em',
                                margin: '0 0 14px'
                            }}>
                                Frequently Asked Questions
                            </h2>
                            <p style={{ fontSize: '16px', color: '#59655D', margin: 0 }}>
                                Clear answers about reaching Kalga Village, booking dorms, safety, and guided treks.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {ABOUT_FAQS.map((faq, fIdx) => {
                                const isOpen = activeFaq === fIdx;
                                return (
                                    <div
                                        key={fIdx}
                                        style={{
                                            background: '#FFFFFF',
                                            border: isOpen ? '1px solid #166534' : '1px solid rgba(18, 22, 19, 0.08)',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            transition: 'all 0.25s ease'
                                        }}
                                    >
                                        <button
                                            onClick={() => setActiveFaq(isOpen ? -1 : fIdx)}
                                            style={{
                                                width: '100%',
                                                padding: '24px 28px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: '900', color: '#D97706' }}>{faq.num}</span>
                                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: '800', color: '#121613' }}>
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <span style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: isOpen ? '#166534' : 'rgba(18, 22, 19, 0.05)',
                                                color: isOpen ? '#FFFFFF' : '#121613',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                            </span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{ padding: '0 28px 24px 56px', fontSize: '15px', color: '#59655D', lineHeight: 1.75 }}>
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.section>

                {/* ─────────────────────────────────────────────────────────────
                    9. ORGANIC CURVED STAY RESERVATION CTA BANNER
                ───────────────────────────────────────────────────────────── */}
                <motion.section 
                    ref={ctaRef}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={sectionReveal}
                    style={{
                        padding: '80px 24px 120px',
                        background: '#F8F9F5'
                    }}
                >
                    <div style={{
                        maxWidth: '1240px',
                        margin: '0 auto',
                        border: '1.5px solid rgba(213, 237, 85, 0.45)',
                        borderRadius: '36px',
                        padding: 'clamp(56px, 8vw, 96px) 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: '-15%',
                                backgroundImage: 'url("/images/treks/parvati-valley-himachal-hero.jpg")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 42%',
                                scale: ctaBgScale,
                                y: ctaBgY,
                                zIndex: 0
                            }}
                        />

                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(7, 14, 8, 0.78) 0%, rgba(11, 21, 14, 0.84) 55%, rgba(7, 14, 8, 0.94) 100%), radial-gradient(circle at 75% 50%, rgba(229, 169, 59, 0.35) 0%, transparent 65%)',
                            zIndex: 1
                        }} />

                        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="star-badge" style={{ marginBottom: '18px' }}>
                                <span className="star-icon">★</span> HIGHLAND SANCTUARY AWAITS
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(34px, 5.2vw, 56px)',
                                fontWeight: '800',
                                color: '#FFFFFF',
                                letterSpacing: '-0.03em',
                                maxWidth: '840px',
                                margin: '0 0 18px',
                                lineHeight: 1.15,
                                textShadow: '0 8px 30px rgba(0,0,0,0.7)'
                            }}>
                                Ready to Escape to the High Ridges?
                            </h2>
                            <p style={{
                                fontSize: '16.5px',
                                color: '#DCE7DE',
                                maxWidth: '660px',
                                margin: '0 0 40px',
                                lineHeight: 1.65,
                                textShadow: '0 4px 16px rgba(0,0,0,0.6)'
                            }}>
                                Reserve verified backpacker dorms from ₹249 in Kalga Village (Parvati Valley) or high-altitude geodesic domes in Munnar. Direct host booking with zero commission.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Link
                                    href="/camps"
                                    className="btn-lime"
                                    style={{
                                        padding: '16px 42px',
                                        fontSize: '15.5px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        boxShadow: '0 10px 30px rgba(213, 237, 85, 0.4)'
                                    }}
                                >
                                    Explore Handpicked Stays →
                                </Link>
                                <a
                                    href={waLink('Hi Aanandham Desk! I would like to check room availability for The Nest Kalga and Munnar stays.')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '16px 32px',
                                        borderRadius: '999px',
                                        background: 'rgba(11, 21, 14, 0.85)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        color: '#FFFFFF',
                                        fontSize: '15.5px',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        backdropFilter: 'blur(16px)',
                                        WebkitBackdropFilter: 'blur(16px)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <WhatsAppIcon size={18} color="#25D366" />
                                    <span>WhatsApp Concierge</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.section>

            </main>

            {/* ── UNIFIED REUSABLE FOOTER ── */}
            <Footer />
        </div>
    );
}
