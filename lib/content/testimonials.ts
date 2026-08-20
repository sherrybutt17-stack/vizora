export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  practice: string;
  /** Result badge shown on the card. */
  metric?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Vizora transformed our billing process. Our denial rate dropped from 28% to under 8% in just three months, and cash flow improved significantly.",
    name: "Dr. Rebecca Martinez",
    role: "Family Medicine Physician",
    practice: "Austin Family Practice",
    metric: "Denials 28% → 8%",
  },
  {
    quote:
      "The transparency and communication are excellent. Monthly reports give us clear visibility into our revenue cycle, and their team is always responsive.",
    name: "Sarah Chen, MBA",
    role: "Practice Administrator",
    practice: "Northwest Cardiology Group",
    metric: "AR days 62 → 24",
  },
  {
    quote:
      "Since partnering with Vizora, we've recovered over $150K in previously denied claims. Their denial management expertise is outstanding.",
    name: "Dr. James Thompson",
    role: "Orthopedic Surgeon",
    practice: "Pacific Orthopedics",
    metric: "$150K recovered",
  },
  {
    quote:
      "Before Vizora, billing was a constant source of stress. Now it runs smoothly in the background, and we can focus on providing excellent mental health care.",
    name: "Dr. Emily Rodriguez",
    role: "Clinical Director",
    practice: "Wellness Behavioral Health",
    metric: "38% revenue growth",
  },
  {
    quote:
      "The verification system Vizora set up has eliminated our authorization headaches. We haven't had an authorization denial in over six months.",
    name: "Michael Anderson, PT",
    role: "Clinic Owner",
    practice: "Summit Physical Therapy",
    metric: "99% clean claims",
  },
];
