import { Language } from './types';

export type TranslationKey =
  | 'appTitle'
  | 'tagline'
  | 'searchPlaceholder'
  | 'heroGreeting'
  | 'heroTitle'
  | 'heroDescription'
  | 'noResults'
  | 'login'
  | 'profile'
  | 'logout'
  | 'themeLight'
  | 'themeDark'
  | 'themeSystem'
  | 'languageFa'
  | 'languageEn'
  | 'download'
  | 'downloading'
  | 'downloadNotAvailable'
  | 'close'
  | 'addVideo'
  | 'myVideos'
  | 'titleLabel'
  | 'descriptionLabel'
  | 'categoryLabel'
  | 'sourceType'
  | 'youtubeLink'
  | 'fileUpload'
  | 'youtubePlaceholder'
  | 'submit'
  | 'videoTypeLabel'
  | 'hookLabel'
  | 'creatorLabel'
  | 'notesPlaceholder'
  | 'saveNote'
  | 'notesHeading'
  | 'myNotesHeading'
  | 'loginRequired'
  | 'enterPhone'
  | 'sendCode'
  | 'enterCode'
  | 'confirm'
  | 'logoutMessage'
  | 'downloadReady'
  | 'downloadFailed'
  | 'playVideo'
  | 'speakerVideos'
  | 'language'
  | 'theme'
  | 'downloadProgress';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  fa: {
    appTitle: 'کتابخانه ویدیو و پادکست Knoverse',
    tagline: 'پخش آنلاین، مدیریت ساده و یادداشت‌برداری شخصی',
    searchPlaceholder: 'جستجوی عنوان یا توضیحات...',
    heroGreeting: 'سلام! آماده تماشا هستید؟',
    heroTitle: 'کلکسیونی از ویدیو و پادکست‌های جذاب',
    heroDescription:
      'در اینجا می‌توانید جدیدترین ویدیوها و پادکست‌ها را ببینید و هر زمان که خواستید ویدیوی جدیدی اضافه کنید. با جستجو یا مرور دسته‌بندی‌ها، محتوای مورد علاقه خود را پیدا کنید.',
    noResults: 'موردی یافت نشد.',
    login: 'ورود / ثبت‌نام',
    profile: 'پروفایل من',
    logout: 'خروج از حساب',
    themeLight: 'حالت روشن',
    themeDark: 'حالت تیره',
    themeSystem: 'پیروی از سیستم',
    languageFa: 'فارسی',
    languageEn: 'انگلیسی',
    download: 'دانلود ویدیو',
    downloading: 'در حال دانلود',
    downloadNotAvailable: 'دانلود برای این ویدیو در دسترس نیست',
    close: 'بستن',
    addVideo: 'افزودن ویدیو',
    myVideos: 'ویدیوهای من',
    titleLabel: 'عنوان ویدیو',
    descriptionLabel: 'توضیحات کوتاه',
    categoryLabel: 'دسته‌بندی',
    sourceType: 'نوع منبع',
    youtubeLink: 'لینک یوتیوب',
    fileUpload: 'آپلود فایل ویدیو',
    youtubePlaceholder: 'مثال: https://www.youtube.com/watch?v=...',
    submit: 'ثبت ویدیو',
    videoTypeLabel: 'نوع ویدیو',
    hookLabel: 'هوک/چکیده کوتاه',
    creatorLabel: 'سخنران یا سازنده',
    notesPlaceholder: 'یادداشت خود را اینجا بنویسید...',
    saveNote: 'ذخیره یادداشت',
    notesHeading: 'یادداشت‌ها',
    myNotesHeading: 'یادداشت‌های من',
    loginRequired: 'برای دسترسی به پروفایل ابتدا وارد حساب خود شوید.',
    enterPhone: 'شماره موبایل خود را وارد کنید',
    sendCode: 'ارسال کد',
    enterCode: 'کد دریافت‌شده را وارد کنید',
    confirm: 'تایید و ورود',
    logoutMessage: 'خروج انجام شد',
    downloadReady: 'دانلود کامل شد',
    downloadFailed: 'دانلود با مشکل مواجه شد',
    playVideo: 'پخش ویدیو',
    speakerVideos: 'ویدیوهای این سخنران',
    language: 'زبان',
    theme: 'تم',
    downloadProgress: 'درصد دانلود'
  },
  en: {
    appTitle: 'Knoverse Video & Podcast Library',
    tagline: 'Play online, manage easily, and keep personal notes',
    searchPlaceholder: 'Search titles or descriptions...',
    heroGreeting: 'Ready to watch?',
    heroTitle: 'A curated set of videos and podcasts',
    heroDescription:
      'Browse fresh videos and podcasts, and add your own anytime. Search or explore categories to find what you love.',
    noResults: 'No results found.',
    login: 'Log in / Sign up',
    profile: 'My profile',
    logout: 'Log out',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'Follow system',
    languageFa: 'Persian',
    languageEn: 'English',
    download: 'Download video',
    downloading: 'Downloading',
    downloadNotAvailable: 'Download is not available for this video',
    close: 'Close',
    addVideo: 'Add video',
    myVideos: 'My videos',
    titleLabel: 'Video title',
    descriptionLabel: 'Short description',
    categoryLabel: 'Category',
    sourceType: 'Source type',
    youtubeLink: 'YouTube link',
    fileUpload: 'Upload file',
    youtubePlaceholder: 'Example: https://www.youtube.com/watch?v=...',
    submit: 'Submit video',
    videoTypeLabel: 'Video type',
    hookLabel: 'Hook / short pitch',
    creatorLabel: 'Speaker or creator',
    notesPlaceholder: 'Write your note here...',
    saveNote: 'Save note',
    notesHeading: 'Notes',
    myNotesHeading: 'My notes',
    loginRequired: 'Log in first to access your profile.',
    enterPhone: 'Enter your mobile number',
    sendCode: 'Send code',
    enterCode: 'Enter the code you received',
    confirm: 'Confirm and log in',
    logoutMessage: 'Signed out',
    downloadReady: 'Download completed',
    downloadFailed: 'Download failed',
    playVideo: 'Play video',
    speakerVideos: "Speaker's videos",
    language: 'Language',
    theme: 'Theme',
    downloadProgress: 'Download progress'
  }
};

export const getDirection = (lang: Language) => (lang === 'fa' ? 'rtl' : 'ltr');
