export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Munnar' | 'Himachal' | 'Booking';
}

export const faqsData: FaqItem[] = [
  {
    question: 'How do we reach the high-altitude stays in Munnar & Himachal?',
    answer: 'For Munnar mountain stays (Kolukkumalai & Suryanelli ridge), dedicated 4x4 Jeep transfers are coordinated from the base parking hubs. For Himachal stays in Manali and Jibhi, stays are accessible via mountain motorable roads, with private sanctuary parking and luggage porter assistance upon arrival.',
    category: 'General',
  },
  {
    question: 'What weather and temperatures should we expect?',
    answer: 'Munnar high-altitude ridge stays range between 10°C to 22°C year-round, with crisp misty mornings and chilly nights. Himachal stays in Manali and Jibhi experience temperatures between -2°C to 15°C in winters and 12°C to 24°C in summer. All domes and premium cottages are fitted with thermal insulation, wood-fired heaters, or heated bedding.',
    category: 'General',
  },
  {
    question: 'Are washrooms private and is hot water available?',
    answer: 'Yes. Every Aanandham verified dome, cottage, and luxury ridge tent features private, clean western washrooms with dedicated hot water geysers and fresh eco-friendly toiletries.',
    category: 'General',
  },
  {
    question: 'What meals are included with the stays?',
    answer: 'All stay bookings include warm welcome herbal drinks, an evening acoustic campfire with live barbecue skewers, a regional dinner buffet (Pahadi local cuisine in Himachal, Kerala highland cuisine in Munnar), and a hearty breakfast buffet the next morning.',
    category: 'Booking',
  },
  {
    question: 'How does booking confirmation and cancellation work?',
    answer: 'Stays can be reserved directly via our instant WhatsApp concierge or online booking engine. A 50% advance secures your dates, with the remainder payable at check-in. Cancellations made 7+ days prior receive full credit vouchers or standard refunds as outlined in our cancellation policy.',
    category: 'Booking',
  },
];
