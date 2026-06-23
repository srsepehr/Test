import type { Locale } from "./format";

/** Bilingual string. */
export type L = Record<Locale, string>;

export interface Course {
  id: string;
  title: L;
  topic: L;
  level: L;
  lessons: number;
  hours: number;
  gradient: string;
}

export interface TopicChip {
  id: string;
  label: L;
}

export interface NewsItem {
  id: string;
  source: string;
  headline: L;
  category: L;
  minutesAgo: number;
}

export interface Bio {
  id: string;
  name: L;
  role: L;
  hook: L;
  gradient: string;
}

export interface CompanyMilestone {
  id: string;
  name: string;
  year: number;
  milestone: L;
}

export interface Testimonial {
  id: string;
  quote: L;
  author: L;
  role: L;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: L;
}

export interface Plan {
  id: string;
  name: L;
  tagline: L;
  priceMonthly: number;
  priceAnnual: number; // per-month when billed annually
  features: L[];
  recommended?: boolean;
}

export const topicChips: TopicChip[] = [
  { id: "all", label: { fa: "همه", en: "All" } },
  { id: "tech", label: { fa: "فناوری", en: "Technology" } },
  { id: "business", label: { fa: "کسب‌وکار", en: "Business" } },
  { id: "science", label: { fa: "علم", en: "Science" } },
  { id: "design", label: { fa: "طراحی", en: "Design" } },
  { id: "ai", label: { fa: "هوش مصنوعی", en: "AI" } },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: { fa: "مبانی یادگیری ماشین", en: "Foundations of Machine Learning" },
    topic: { fa: "هوش مصنوعی", en: "AI" },
    level: { fa: "مقدماتی", en: "Beginner" },
    lessons: 24,
    hours: 9,
    gradient: "linear-gradient(135deg,#101014,#26262e)",
  },
  {
    id: "c2",
    title: { fa: "طراحی محصول مدرن", en: "Modern Product Design" },
    topic: { fa: "طراحی", en: "Design" },
    level: { fa: "متوسط", en: "Intermediate" },
    lessons: 18,
    hours: 6,
    gradient: "linear-gradient(135deg,#14111a,#2b2536)",
  },
  {
    id: "c3",
    title: { fa: "استارتاپ از صفر تا یک", en: "Startups: Zero to One" },
    topic: { fa: "کسب‌وکار", en: "Business" },
    level: { fa: "متوسط", en: "Intermediate" },
    lessons: 32,
    hours: 12,
    gradient: "linear-gradient(135deg,#0f1316,#23303a)",
  },
  {
    id: "c4",
    title: { fa: "فیزیک کوانتومی برای همه", en: "Quantum Physics for Everyone" },
    topic: { fa: "علم", en: "Science" },
    level: { fa: "مقدماتی", en: "Beginner" },
    lessons: 20,
    hours: 8,
    gradient: "linear-gradient(135deg,#0e1418,#1f2c33)",
  },
  {
    id: "c5",
    title: { fa: "معماری نرم‌افزار در مقیاس", en: "Software Architecture at Scale" },
    topic: { fa: "فناوری", en: "Technology" },
    level: { fa: "پیشرفته", en: "Advanced" },
    lessons: 28,
    hours: 11,
    gradient: "linear-gradient(135deg,#121216,#2a2a32)",
  },
  {
    id: "c6",
    title: { fa: "رهبری و تیم‌سازی", en: "Leadership & Team Building" },
    topic: { fa: "کسب‌وکار", en: "Business" },
    level: { fa: "متوسط", en: "Intermediate" },
    lessons: 16,
    hours: 5,
    gradient: "linear-gradient(135deg,#15131a,#2d2838)",
  },
];

export const newsSources = ["BBC", "Reuters", "Bloomberg", "TechCrunch", "The Verge", "Nature"];

export const news: NewsItem[] = [
  {
    id: "n1",
    source: "Bloomberg",
    headline: {
      fa: "موج تازهٔ سرمایه‌گذاری در هوش مصنوعی، بازارها را متحول می‌کند",
      en: "A fresh wave of AI investment is reshaping markets",
    },
    category: { fa: "اقتصاد", en: "Economy" },
    minutesAgo: 12,
  },
  {
    id: "n2",
    source: "Nature",
    headline: {
      fa: "کشف تازه در زیست‌شناسی سلولی، درمان‌ها را نزدیک‌تر می‌کند",
      en: "New cell-biology discovery brings therapies closer",
    },
    category: { fa: "علم", en: "Science" },
    minutesAgo: 47,
  },
  {
    id: "n3",
    source: "The Verge",
    headline: {
      fa: "نسل بعدی تراشه‌ها، مرز کارایی را جابه‌جا می‌کند",
      en: "Next-gen chips push the performance frontier",
    },
    category: { fa: "فناوری", en: "Technology" },
    minutesAgo: 95,
  },
  {
    id: "n4",
    source: "Reuters",
    headline: {
      fa: "توافق جهانی تازه دربارهٔ انرژی پاک امضا شد",
      en: "New global agreement on clean energy signed",
    },
    category: { fa: "جهان", en: "World" },
    minutesAgo: 180,
  },
];

export const bios: Bio[] = [
  {
    id: "b1",
    name: { fa: "آدا لاولیس", en: "Ada Lovelace" },
    role: { fa: "نخستین برنامه‌نویس", en: "First Programmer" },
    hook: {
      fa: "او ماشینی را دید که هنوز ساخته نشده بود.",
      en: "She saw a machine that didn't yet exist.",
    },
    gradient: "linear-gradient(160deg,#1a1620,#322a3e)",
  },
  {
    id: "b2",
    name: { fa: "آلن تورینگ", en: "Alan Turing" },
    role: { fa: "پدر علوم رایانه", en: "Father of Computing" },
    hook: {
      fa: "یک پرسش ساده، آغاز عصر دیجیتال شد.",
      en: "One simple question began the digital age.",
    },
    gradient: "linear-gradient(160deg,#141a1e,#283a42)",
  },
  {
    id: "b3",
    name: { fa: "ماری کوری", en: "Marie Curie" },
    role: { fa: "پیشگام علم", en: "Pioneer of Science" },
    hook: {
      fa: "دو بار نوبل؛ یک‌بار برای جسارت.",
      en: "Two Nobels; one for sheer courage.",
    },
    gradient: "linear-gradient(160deg,#1a1414,#3a2828)",
  },
  {
    id: "b4",
    name: { fa: "گریس هاپر", en: "Grace Hopper" },
    role: { fa: "مادر زبان‌های برنامه‌نویسی", en: "Mother of Programming Languages" },
    hook: {
      fa: "او به رایانه یاد داد به زبان انسان حرف بزند.",
      en: "She taught computers to speak human.",
    },
    gradient: "linear-gradient(160deg,#16181a,#2c3236)",
  },
];

export const companies: CompanyMilestone[] = [
  { id: "m1", name: "Garage", year: 1998, milestone: { fa: "از یک گاراژ کوچک آغاز شد", en: "Started in a small garage" } },
  { id: "m2", name: "First product", year: 2003, milestone: { fa: "نخستین محصول روانهٔ بازار شد", en: "Shipped the first product" } },
  { id: "m3", name: "Global", year: 2009, milestone: { fa: "به ده‌ها کشور گسترش یافت", en: "Expanded to dozens of countries" } },
  { id: "m4", name: "IPO", year: 2015, milestone: { fa: "وارد بازار بورس شد", en: "Went public" } },
  { id: "m5", name: "Platform", year: 2021, milestone: { fa: "به یک پلتفرم جهانی بدل شد", en: "Became a global platform" } },
  { id: "m6", name: "Today", year: 2025, milestone: { fa: "امروز، الهام‌بخش نسل بعد", en: "Today, inspiring the next generation" } },
];

export const stats: Stat[] = [
  { id: "s1", value: 1200000, label: { fa: "ساعت ترجمه‌شده", en: "Hours translated" } },
  { id: "s2", value: 40, suffix: "+", label: { fa: "زبان مبدأ", en: "Source languages" } },
  { id: "s3", value: 250000, label: { fa: "یادگیرندهٔ فعال", en: "Active learners" } },
  { id: "s4", value: 98, suffix: "%", label: { fa: "رضایت کاربران", en: "Satisfaction" } },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: {
      fa: "انگار ناگهان درِ کتابخانهٔ جهان به رویم باز شد.",
      en: "It's as if the door to the world's library suddenly opened.",
    },
    author: { fa: "سارا م.", en: "Sara M." },
    role: { fa: "دانشجوی دکترا", en: "PhD Student" },
  },
  {
    id: "t2",
    quote: {
      fa: "هر ویدیویی که می‌خواهم، حالا به فارسیِ روان می‌فهمم.",
      en: "Any video I want, I now understand in fluent Persian.",
    },
    author: { fa: "امیر ک.", en: "Amir K." },
    role: { fa: "مهندس نرم‌افزار", en: "Software Engineer" },
  },
  {
    id: "t3",
    quote: {
      fa: "ترجمه‌ها آن‌قدر طبیعی‌اند که زبان را فراموش می‌کنم.",
      en: "The translations are so natural I forget the language barrier.",
    },
    author: { fa: "نگار ر.", en: "Negar R." },
    role: { fa: "پژوهشگر", en: "Researcher" },
  },
  {
    id: "t4",
    quote: {
      fa: "برای تیم ما، یادگیری از منابع جهانی دیگر سخت نیست.",
      en: "For our team, learning from global sources is no longer hard.",
    },
    author: { fa: "بهروز ت.", en: "Behrouz T." },
    role: { fa: "مدیر محصول", en: "Product Lead" },
  },
  {
    id: "t5",
    quote: {
      fa: "سریع، دقیق و زیبا. دقیقاً همان چیزی که می‌خواستم.",
      en: "Fast, accurate, and beautiful. Exactly what I wanted.",
    },
    author: { fa: "لیلا ن.", en: "Leila N." },
    role: { fa: "طراح", en: "Designer" },
  },
];

export const plans: Plan[] = [
  {
    id: "p_free",
    name: { fa: "رایگان", en: "Free" },
    tagline: { fa: "برای شروع", en: "To get started" },
    priceMonthly: 0,
    priceAnnual: 0,
    features: [
      { fa: "۵ ترجمه در ماه", en: "5 translations / month" },
      { fa: "کیفیت تا ۷۲۰p", en: "Up to 720p" },
      { fa: "کتابخانهٔ شخصی پایه", en: "Basic library" },
    ],
  },
  {
    id: "p_pro",
    name: { fa: "حرفه‌ای", en: "Pro" },
    tagline: { fa: "برای یادگیرندهٔ جدی", en: "For serious learners" },
    priceMonthly: 199000,
    priceAnnual: 159000,
    recommended: true,
    features: [
      { fa: "ترجمهٔ نامحدود", en: "Unlimited translations" },
      { fa: "کیفیت تا ۴K", en: "Up to 4K" },
      { fa: "یادداشت‌های هوشمند", en: "Smart notes" },
      { fa: "بدون تبلیغ", en: "No ads" },
    ],
  },
  {
    id: "p_team",
    name: { fa: "تیمی", en: "Team" },
    tagline: { fa: "برای گروه‌ها", en: "For groups" },
    priceMonthly: 499000,
    priceAnnual: 399000,
    features: [
      { fa: "هر چیزی در پلن حرفه‌ای", en: "Everything in Pro" },
      { fa: "تا ۵ کاربر", en: "Up to 5 seats" },
      { fa: "کتابخانهٔ مشترک", en: "Shared library" },
      { fa: "پشتیبانی اولویت‌دار", en: "Priority support" },
    ],
  },
];
