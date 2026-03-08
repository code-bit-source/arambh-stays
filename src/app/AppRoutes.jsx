import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import BookingPage from '../pages/BookingPage'
import DestinationsPage from '../pages/DestinationsPage'
import HomePage from '../pages/HomePage'
import HotelDetailPage from '../pages/HotelDetailPage'
import InfoPage from '../pages/InfoPage'
import LoginPage from '../pages/LoginPage'
import ManageBookingsPage from '../pages/ManageBookingsPage'
import NotFoundPage from '../pages/NotFoundPage'
import OffersPage from '../pages/OffersPage'
import SupportPage from '../pages/SupportPage'

const infoPageContent = {
  about: {
    variant: 'about',
    title: 'About Aarambh Stays',
    subtitle:
      'Aarambh Stays is a guest-first booking platform built to make travel planning clear, reliable, and stress free.',
    sections: [
      {
        heading: 'Our Story',
        body: 'We started with one goal: remove confusion from hotel booking and focus on real guest comfort.',
        points: [
          'Built by hospitality and product professionals',
          'Designed for transparent pricing and clear policies',
          'Focused on verified stays across major travel cities',
        ],
      },
      {
        heading: 'How We Curate Hotels',
        body: 'Each listed property is reviewed before it goes live on our platform.',
        points: [
          'Location and safety checks',
          'Room quality and hygiene validation',
          'Service and support responsiveness reviews',
        ],
      },
      {
        heading: 'Guest Promise',
        body: 'From search to check-out, we keep communication straightforward and support always available.',
        points: [
          'Instant booking confirmation',
          'Dedicated support for modifications and cancellations',
          'No hidden charges at the final payment step',
        ],
      },
      {
        heading: 'Our Vision',
        body: 'Build the most trusted modern booking experience for families, couples, business travelers, and creators.',
        note: 'For partnerships or media requests, write to business@aarambhstays.com.',
      },
    ],
  },
  careers: {
    variant: 'careers',
    title: 'Careers',
    subtitle:
      'Join a fast moving team building hospitality products that improve how people discover and book stays.',
    sections: [
      {
        heading: 'Why Work With Us',
        body: 'We combine startup speed with high ownership and clear execution standards.',
        points: [
          'Small teams, meaningful impact',
          'Direct collaboration across product, ops, and support',
          'Opportunity to solve real user pain points',
        ],
      },
      {
        heading: 'Open Functions',
        body: 'We regularly hire across business and technology functions.',
        points: [
          'Frontend and backend engineering',
          'Customer success and support operations',
          'Partnerships, growth, and city operations',
        ],
      },
      {
        heading: 'Hiring Process',
        body: 'Our process is transparent and usually closes in 1-2 weeks.',
        points: [
          'Application screening',
          'Role-specific interview rounds',
          'Culture fit and final discussion',
        ],
      },
      {
        heading: 'How To Apply',
        body: 'Share your resume, portfolio, and preferred role details by email.',
        note: 'Send applications to careers@aarambhstays.com with subject: Role - Your Name',
      },
    ],
  },
  contact: {
    variant: 'contact',
    title: 'Contact Us',
    subtitle:
      'Reach us for guest support, corporate bookings, partnership opportunities, or escalation help.',
    sections: [
      {
        heading: 'Customer Support',
        body: 'Our support team is available 24x7 for booking help, date changes, and check-in assistance.',
        points: ['Call: +91 98765 43210', 'Email: help@aarambhstays.com'],
      },
      {
        heading: 'Corporate And Group Bookings',
        body: 'We provide tailored plans for teams, events, and long-stay business travel.',
        points: ['Volume pricing support', 'Invoice-ready billing', 'Dedicated account manager'],
        note: 'Write to business@aarambhstays.com for custom quotes.',
      },
      {
        heading: 'Property Partnership',
        body: 'Hotel owners and operators can partner with us to reach quality guests and improve occupancy.',
        points: [
          'Property onboarding guidance',
          'Listing optimization and content support',
          'Regular quality review collaboration',
        ],
      },
      {
        heading: 'Escalations',
        body: 'If your issue is unresolved, our grievance team reviews it on priority.',
        note: 'Escalation email: grievance@aarambhstays.com',
      },
    ],
  },
  faq: {
    variant: 'faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Detailed answers to common questions about booking, payments, check-in, and cancellations.',
    sections: [
      {
        heading: 'Booking And Confirmation',
        body: 'Most bookings are confirmed instantly once payment is successful.',
        points: [
          'Confirmation is sent by email immediately',
          'Booking details are accessible from support',
          'Name and dates should match your ID proof',
        ],
      },
      {
        heading: 'Modification And Cancellation',
        body: 'Changes depend on the selected room plan and property policy.',
        points: [
          'Flexible plans allow easier date changes',
          'Cancellation windows vary by hotel',
          'Support can guide available options quickly',
        ],
      },
      {
        heading: 'Payments And Refunds',
        body: 'We support secure online payments and selected pay-at-hotel plans.',
        points: [
          'UPI, cards, and net banking supported',
          'Refund timeline usually 5-7 working days',
          'Refund method follows original payment mode',
        ],
      },
      {
        heading: 'Check-in Requirements',
        body: 'Carry valid government ID for all adult guests and review local property rules in advance.',
        points: ['Early check-in is subject to availability', 'Special requests are shared with the hotel'],
      },
    ],
  },
  privacy: {
    variant: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'We protect your data and use it only for booking, support, and service improvement purposes.',
    sections: [
      {
        heading: 'Data We Collect',
        body: 'We collect only information needed to process bookings and support your stay.',
        points: ['Name, contact details, and booking preferences', 'Payment transaction metadata', 'Support conversation records'],
      },
      {
        heading: 'How Data Is Used',
        body: 'Your data is used to complete reservations, send confirmations, and resolve issues quickly.',
        points: [
          'Booking processing and verification',
          'Guest communication and reminders',
          'Service quality analytics and fraud prevention',
        ],
      },
      {
        heading: 'Sharing And Security',
        body: 'Data is shared only with relevant hotel partners and secure service providers when required.',
        points: [
          'Role-based access controls for internal teams',
          'Encryption and secure transport practices',
          'No sale of personal data to third parties',
        ],
      },
      {
        heading: 'Your Rights',
        body: 'You may request data correction, deletion, or access by contacting our privacy team.',
        note: 'Privacy requests: privacy@aarambhstays.com',
      },
    ],
  },
  terms: {
    variant: 'terms',
    title: 'Terms & Conditions',
    subtitle: 'These terms define platform usage, booking responsibilities, payment rules, and dispute handling.',
    sections: [
      {
        heading: 'User And Booking Responsibility',
        body: 'Guests must provide accurate information and comply with hotel rules during stay.',
        points: [
          'Correct guest names and travel dates are required',
          'Valid ID is mandatory at check-in',
          'Property-specific rules must be followed',
        ],
      },
      {
        heading: 'Pricing And Payment',
        body: 'Displayed prices include applicable components shown at checkout.',
        points: [
          'Final payable amount appears before confirmation',
          'Promotions may include plan-specific conditions',
          'Taxes and charges follow local regulation',
        ],
      },
      {
        heading: 'Changes And Force Majeure',
        body: 'Availability or services may change due to operational or external constraints.',
        points: [
          'Hotels may modify inventory in rare cases',
          'Force majeure may affect check-in timelines',
          'Support helps with alternatives where possible',
        ],
      },
      {
        heading: 'Disputes And Support',
        body: 'We aim to resolve all disputes quickly through support and escalation channels.',
        note: 'For legal and compliance queries: legal@aarambhstays.com',
      },
    ],
  },
  cancellation: {
    variant: 'cancellation',
    title: 'Cancellation Policy',
    subtitle: 'Cancellation and refund rules vary by room type, pricing plan, and property-level policy.',
    sections: [
      {
        heading: 'Flexible And Non-Refundable Plans',
        body: 'Some plans allow free cancellation while discounted plans may be non-refundable.',
        points: [
          'Flexible plans often allow cancellation up to 24-48 hours before check-in',
          'Non-refundable plans are lower priced with stricter rules',
        ],
      },
      {
        heading: 'Partial Refund Conditions',
        body: 'Partial refunds may apply when cancellation happens after the free window closes.',
        points: [
          'Penalty amount depends on hotel policy',
          'Applicable deductions are shared before confirmation',
        ],
      },
      {
        heading: 'No-Show And Early Departure',
        body: 'No-show bookings or early check-out may lead to limited or no refund based on policy.',
        points: [
          'No-show usually treated as consumed booking',
          'Early departure refund depends on room and property terms',
        ],
      },
      {
        heading: 'Refund Timelines',
        body: 'Approved refunds are processed back to your original payment method.',
        note: 'Standard refund processing time: 5-7 working days',
      },
    ],
  },
  guidelines: {
    variant: 'guidelines',
    title: 'Travel Guidelines',
    subtitle: 'Use these practical guidelines to ensure smooth check-in and a comfortable stay experience.',
    sections: [
      {
        heading: 'Documents And Verification',
        body: 'Carry valid government-issued photo ID for all adult guests.',
        points: [
          'Hotel may deny check-in for missing or invalid documents',
          'International guests should carry passport and visa details',
        ],
      },
      {
        heading: 'Arrival And Check-in Planning',
        body: 'Share your arrival time in advance to avoid delays and coordinate requests.',
        points: [
          'Early check-in depends on room availability',
          'Late arrival should be informed to support',
          'Airport or station transfer can be pre-requested',
        ],
      },
      {
        heading: 'In-Stay Conduct',
        body: 'Respect property rules, local laws, and quiet-hour policies for all guests.',
        points: [
          'No smoking or party restrictions may apply by property',
          'Extra guest visits should follow hotel policy',
          'Damage or policy violations may incur charges',
        ],
      },
      {
        heading: 'Health And Safety',
        body: 'Prioritize personal safety and contact support immediately for urgent help.',
        note: 'Emergency support: +91 98765 43210 (24x7)',
      },
    ],
  },
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/hotel/:hotelId" element={<HotelDetailPage />} />
        <Route path="/booking/:hotelId" element={<BookingPage />} />
        <Route path="/manage-bookings" element={<ManageBookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<InfoPage {...infoPageContent.about} />} />
        <Route path="/careers" element={<InfoPage {...infoPageContent.careers} />} />
        <Route path="/contact" element={<InfoPage {...infoPageContent.contact} />} />
        <Route path="/faq" element={<InfoPage {...infoPageContent.faq} />} />
        <Route path="/privacy" element={<InfoPage {...infoPageContent.privacy} />} />
        <Route path="/terms" element={<InfoPage {...infoPageContent.terms} />} />
        <Route path="/cancellation" element={<InfoPage {...infoPageContent.cancellation} />} />
        <Route path="/guidelines" element={<InfoPage {...infoPageContent.guidelines} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default AppRoutes
