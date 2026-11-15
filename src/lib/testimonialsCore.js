// ── TESTIMONIALS (CLIENT-SAFE CORE) ──
// Pure logic + localStorage helpers. No Node-only imports — safe for client
// bundles. Server persistence lives in ./testimonials.js (fs-backed store).
// Admin edits testimonials via /api/admin/testimonials; public pages consume
// via GET /api/testimonials.

export const DEFAULT_TESTIMONIALS = [
    {
        id: 't-1',
        propertyId: 'the-nest-kalga',
        stayName: 'The Nest Kalga · Parvati Valley',
        region: 'Himachal Pradesh',
        highlight: 'Sunrise Balcony & Pine Silence',
        quote: "Waking up at The Nest Kalga at 7,900 FT with hot Chai on the panoramic sunrise deck and snow-dusted peaks in front of you is pure serenity. Clean wooden dorms, reliable solar power, and warm evening firesides made it feel like home.",
        author: "Arjun Varma",
        city: "Delhi NCR",
        campBadge: "The Nest Kalga · HP",
        batchDate: "Stayed Feb 2026",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=ArjunKalga&backgroundColor=b6e3f4",
        rating: 5,
        verifiedStay: true,
        instagram: "arjun.varma.trails",
        active: true
    },
    {
        id: 't-2',
        propertyId: 'kolukkumalai-teddy-domes',
        stayName: "Kolukkumalai Teddy's · Munnar",
        region: 'Munnar, Kerala',
        highlight: '100% Female-Safe & Cloud Sunrise',
        quote: "I traveled solo to Munnar and stayed at Kolukkumalai Teddy's Domes. As a woman traveling alone, I felt 100% secure. Gated grounds, clean en-suite washroom with running hot water, and a breathtaking dawn 4x4 sunrise safari above the cloud bed.",
        author: "Anjali Menon",
        city: "Kochi",
        campBadge: "Teddy's Munnar · KL",
        batchDate: "Stayed Jan 2026",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AnjaliMenon&backgroundColor=ffd5dc",
        rating: 5,
        verifiedStay: true,
        instagram: "anjali_menon_roams",
        active: true
    },
    {
        id: 't-3',
        propertyId: 'the-nest-kalga',
        stayName: 'The Nest Kalga · Parvati Valley',
        region: 'Himachal Pradesh',
        highlight: 'Remote Work Sanctuary & Balcony Suite',
        quote: "Spent 10 days remote working from the Balcony Room at The Nest Kalga. Reliable Wi-Fi, peaceful apple orchard surroundings, and the host team served fresh homecooked Siddu and Pahadi dal. The best budget workation in Parvati Valley.",
        author: "Rohan & Meera",
        city: "Bengaluru",
        campBadge: "The Nest Kalga · HP",
        batchDate: "Stayed March 2026",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=RohanMeera&backgroundColor=c0aede",
        rating: 5,
        verifiedStay: true,
        instagram: "rohan.meera.wander",
        active: true
    },
    {
        id: 't-4',
        propertyId: 'kolukkumalai-teddy-domes',
        stayName: "Kolukkumalai Teddy's · Munnar",
        region: 'Munnar, Kerala',
        highlight: '7,100 FT Stargazing & Warm BBQ',
        quote: "Took my family to Kolukkumalai Teddy's Sky Deck. The night sky above the tea estate ridge had zero light pollution. Authentic dinner, warm insulated dome bedding, and the 4:30 AM jeep convoy to Kolukkumalai peak was unforgettable.",
        author: "Dr. Sneha Pillai",
        city: "Thiruvananthapuram",
        campBadge: "Teddy's Munnar · KL",
        batchDate: "Stayed Jan 2026",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=SnehaPillai&backgroundColor=d1d4f9",
        rating: 5,
        verifiedStay: true,
        instagram: "dr.snehapillai",
        active: true
    },
    {
        id: 't-5',
        propertyId: 'the-nest-kalga',
        stayName: 'The Nest Kalga · Parvati Valley',
        region: 'Himachal Pradesh',
        highlight: 'Honest Direct Tariff & Warm Host Care',
        quote: "Booking directly via WhatsApp without paying inflated OTA commissions was so refreshing. The on-site caretakers met us at the apple orchard trail, helped with bags, and made the campfire circle so welcoming. Truly Aanandham.",
        author: "Karan Malhotra",
        city: "Chandigarh",
        campBadge: "The Nest Kalga · HP",
        batchDate: "Stayed Feb 2026",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=KaranMalhotra&backgroundColor=ffdfbf",
        rating: 5,
        verifiedStay: true,
        instagram: "karan.malhotra.hp",
        active: true
    }
];

// Client-side localStorage override (used by the admin UI for instant previews)
const LS_KEY = 'aanandham_admin_testimonials_v2';

export function loadTestimonialsFromStorage() {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch (e) { /* ignore */ }
    return null;
}

export function saveTestimonialsToStorage(list) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch (e) { /* ignore */ }
}

// Active (published) testimonials only
export function getActiveTestimonials(list) {
    return (Array.isArray(list) ? list : DEFAULT_TESTIMONIALS).filter(t => t.active !== false);
}