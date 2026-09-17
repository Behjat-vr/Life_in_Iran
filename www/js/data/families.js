// =============================================
// 👨‍👩‍👧‍👦 Family Data — Parents & Cities
// =============================================

export const FAMILIES = {
  fathers: [
    {
      id: 'bazari',
      name: 'حاج‌آقا رضایی',
      emoji: '🧔',
      job: 'بازاری ثروتمند',
      traits: ['سنتی', 'مذهبی', 'ثروتمند', 'سختگیر'],
      description: 'بازاری قدیمی بازار تهران. سالها تجارت فرش و ادویه. خونه بزرگ در شمال شهر.',
      statBonuses: { wealth: 30, happiness: -5, intelligence: 0, social: 5, fame: 10 },
      healthMod: 0,
    },
    {
      id: 'engineer',
      name: 'مهندس احمدی',
      emoji: '👨‍💼',
      job: 'کارمند دولتی',
      traits: ['طبقه متوسط', 'منظم', 'مسئول', 'محتاط'],
      description: 'مهندس عمران در وزارت راه. آپارتمان ۸۰ متری. حقوق ثابت ولی محدود.',
      statBonuses: { wealth: 10, happiness: 5, intelligence: 10, social: 5, fame: 0 },
      healthMod: 3,
    },
    {
      id: 'professor',
      name: 'دکتر نوری',
      emoji: '👨‍🏫',
      job: 'استاد دانشگاه',
      traits: ['روشنفکر', 'کتابخوان', 'فرهیخته', 'آرام'],
      description: 'استاد فلسفه دانشگاه تهران. کتابخانه بزرگ در خانه. درآمد متوسط ولی فرهنگ بالا.',
      statBonuses: { wealth: 0, happiness: 5, intelligence: 25, social: 0, fame: 5 },
      healthMod: 2,
    },
    {
      id: 'worker',
      name: 'عمو کریم',
      emoji: '👷',
      job: 'کارگر ساده',
      traits: ['زحمتکش', 'مهربان', 'ساده', 'فداکار'],
      description: 'کارگر ساختمان که هر روز صبح زود میره سر کار. خونه کوچیک ولی پر از محبت.',
      statBonuses: { wealth: -15, happiness: 10, intelligence: -5, social: 10, fame: 0 },
      healthMod: -3,
    }
  ],

  mothers: [
    {
      id: 'homemaker',
      name: 'فاطمه‌خانم',
      emoji: '🧕',
      job: 'خانه‌دار سنتی',
      traits: ['مهربان', 'آشپز عالی', 'حمایتگر', 'فداکار'],
      description: 'مادری که تمام عمرش رو وقف خانواده کرده. بهترین آش رشته دنیا رو درست میکنه.',
      statBonuses: { happiness: 15, health: 10, social: 5, intelligence: 0, wealth: 0 },
      healthMod: 3,
    },
    {
      id: 'doctor',
      name: 'دکتر مریم',
      emoji: '👩‍⚕️',
      job: 'پزشک',
      traits: ['مستقل', 'باهوش', 'پرمشغله', 'الگو'],
      description: 'متخصص اطفال که کلینیک خودش رو داره. زن موفق ولی وقت کمی برای خونه.',
      statBonuses: { intelligence: 15, wealth: 10, health: 10, happiness: -5, social: -5 },
      healthMod: 5,
    },
    {
      id: 'teacher',
      name: 'زهرا معلم',
      emoji: '👩‍🏫',
      job: 'معلم مدرسه',
      traits: ['صبور', 'دلسوز', 'باسواد', 'منضبط'],
      description: 'معلم ادبیات فارسی. عاشق شعر حافظ. بچه‌ها رو با قصه بزرگ میکنه.',
      statBonuses: { intelligence: 15, happiness: 5, social: 5, wealth: 0, health: 0 },
      healthMod: 2,
    },
    {
      id: 'artist',
      name: 'نسرین هنرمند',
      emoji: '👩‍🎨',
      job: 'هنرمند و نقاش',
      traits: ['خیال‌پرداز', 'خلاق', 'آزاد', 'احساساتی'],
      description: 'نقاش و مجسمه‌ساز. گالری کوچکی داره. دنیای رنگارنگ ولی بی‌ثبات.',
      statBonuses: { happiness: 10, intelligence: 5, fame: 5, wealth: -10, social: 0 },
      healthMod: 0,
    }
  ],

  cities: [
    {
      id: 'tehran',
      name: 'تهران',
      emoji: '🏙️',
      description: 'پایتخت شلوغ و پر از فرصت. زندگی گرون ولی امکانات بی‌نظیر.',
      statBonuses: { wealth: 5, social: 5, intelligence: 5, happiness: -5, health: -5 },
    },
    {
      id: 'isfahan',
      name: 'اصفهان',
      emoji: '🕌',
      description: 'نصف جهان! شهر فرهنگ و هنر و تاریخ. زندگی متعادل و آرام.',
      statBonuses: { happiness: 10, social: 5, intelligence: 5, wealth: 0, health: 5 },
    },
    {
      id: 'village',
      name: 'روستا',
      emoji: '🌾',
      description: 'هوای پاک و مردم صمیمی. فرصت‌ها کمه ولی زندگی ساده و سالمه.',
      statBonuses: { health: 15, happiness: 10, social: 10, wealth: -15, intelligence: -10 },
    }
  ]
};

export default FAMILIES;
