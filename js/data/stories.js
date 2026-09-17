// =============================================
// 📖 Story Data — All Life Events
// =============================================
// بدون یادآوری سن در متن داستان
// با جملات انتقالی برای پیوستگی
// =============================================

export const STORY_DATA = {

  // ========================
  // 🍼 BIRTH & INFANCY
  // ========================
  birth: [
    {
      id: 'birth_generic',
      age: 0,
      title: 'تولد',
      narrative: 'یه صدای گریه فضا رو پر می‌کنه...\n\nاولین نفسی که می‌کشی، سرد و تازه‌ست. نور کور کننده‌ای همه جا رو سفید کرده. صداهایی می‌شنوی — نگران، پر از هیجان. بعد یه گرمایی که همه چیز رو آروم می‌کنه.\n\n{motherName} با چشمای خیس بهت نگاه می‌کنه. {fatherName} با لبخند کنارش ایستاده. این لحظه، اول همه چیزه.',
      choices: [
        { text: '😊 با تمام وجود احساس می‌کنی — این دنیاست', tokenCost: 7, isGood: true, effects: { happiness: 5, social: 3 }, nextId: 'infant_01' },
        { text: '😭 گریه می‌کنی — این دنیا سرده', tokenCost: 3, isGood: false, effects: { health: 3, happiness: -2 }, nextId: 'infant_01' }
      ]
    },
    {
      id: 'infant_01',
      age: 1,
      title: 'اولین سال',
      narrative: 'ماه‌ها گذشته. یاد گرفتی بخندی، یاد گرفتی گریه کنی، یاد گرفتی بخوابی وقت نمی‌خوای.\n\nامروز خونه پر از آدمه. یه کیک جلوته با یه شمع. همه نگاهت می‌کنن. {motherName} داره فیلم می‌گیره.',
      choices: [
        { text: '🎂 دستت رو می‌زنی توی کیک و می‌خندی', tokenCost: 6, isGood: true, effects: { happiness: 5, social: 3 }, nextId: 'infant_02' },
        { text: '😰 از شلوغی می‌ترسی و گریه می‌کنی', tokenCost: 2, isGood: false, effects: { happiness: -3 }, nextId: 'infant_02' }
      ]
    },
    {
      id: 'infant_02',
      age: 2,
      title: 'اولین کلمه',
      narrative: 'چند ماه دیگه گذشته. زبونت داره باز میشه — صداهای ناقص، ولی پر از اراده.\n\n{motherName} می‌گه "بگو ما-مان" و {fatherName} می‌گه "نه، بگو با-با!"\n\nهر دوشون منتظرن...',
      choices: [
        { text: '"ما...مان!" — اولین کلمه‌ات', tokenCost: 5, isGood: true, effects: { social: 3, happiness: 3 }, nextId: 'infant_03' },
        { text: '"با...با!" — اولین کلمه‌ات', tokenCost: 5, isGood: true, effects: { social: 3, happiness: 3 }, nextId: 'infant_03' },
        { text: '🤷 یه صدای نامفهوم — هر دو خوشحال می‌شن', tokenCost: 3, isGood: false, effects: { happiness: 5 }, nextId: 'infant_03' }
      ]
    },
    {
      id: 'infant_03',
      age: 3,
      title: 'اولین دوست',
      narrative: 'بزرگ‌تر شدی. حالا می‌دوی، می‌افتی، بلند می‌شی.\n\nتوی پارک محل، یه بچه هم‌قد خودت داره با سطل و بیلچه بازی می‌کنه. بهت نگاه می‌کنه و لبخند می‌زنه.',
      choices: [
        { text: '🤝 می‌ری جلو و باهاش آشنا می‌شی', tokenCost: 8, isGood: true, effects: { social: 8, happiness: 5 }, nextId: 'childhood_01' },
        { text: '😶 خجالت می‌کشی و پشت مامان قایم می‌شی', tokenCost: 3, isGood: false, effects: { social: -3 }, nextId: 'childhood_01' },
        { text: '😠 بیلچه‌اش رو ازش می‌گیری!', tokenCost: 2, isGood: false, effects: { social: -5, fame: 1 }, nextId: 'childhood_01' }
      ]
    }
  ],

  // ========================
  // 🧒 CHILDHOOD
  // ========================
  childhood: [
    {
      id: 'childhood_01',
      age: 4,
      title: 'شب‌های قصه',
      narrative: 'هر شب همینه — {motherName} کنار تختت می‌شینه و قصه تعریف می‌کنه.\n\nامشب قصه سیندرلا. چشمات برق می‌زنه. صدای {motherName} آروم و گرمه.\n\n"تو هم وقتی بزرگ شدی می‌تونی هر کاری بکنی..." — این جمله توی ذهنت می‌مونه.',
      choices: [
        { text: '🌟 "می‌خوام یه روز همه منو بشناسن!"', tokenCost: 7, isGood: true, effects: { intelligence: 5, fame: 2, happiness: 3 }, nextId: 'childhood_02' },
        { text: '💰 "می‌خوام پولدار بشم!"', tokenCost: 5, isGood: true, effects: { wealth: 3, fame: 2 }, nextId: 'childhood_02' },
        { text: '😴 قبل از تموم شدن قصه خوابت می‌بره', tokenCost: 2, isGood: false, effects: { health: 3, happiness: 2 }, nextId: 'childhood_02' }
      ]
    },
    {
      id: 'childhood_02',
      age: 5,
      title: 'مهد کودک',
      narrative: 'یه روز صبح {motherName} لباس تمیزت رو تنت می‌کنه. "امروز می‌ری مهد کودک عزیزم."\n\nجلوی یه ساختمون رنگارنگ وایمیستین. از داخل صدای بچه‌ها میاد. قلبت تند می‌زنه.',
      choices: [
        { text: '🎒 با ذوق دست {motherName} رو ول می‌کنی و می‌دوی تو!', tokenCost: 8, isGood: true, effects: { social: 7, happiness: 5, intelligence: 3 }, nextId: 'childhood_03' },
        { text: '😢 نق‌نق می‌کنی — نمی‌خوای بری', tokenCost: 3, isGood: false, effects: { social: -3, happiness: -4 }, nextId: 'childhood_03' }
      ]
    },
    {
      id: 'childhood_03',
      age: 5,
      title: 'روز اول',
      narrative: 'توی مهد کودکی. یه خانم با روسری گل‌گلی بهت لبخند می‌زنه.\n\nیه گوشه لگوئه، یه گوشه مداد رنگیه. یه بچه هم داره گریه می‌کنه.',
      choices: [
        { text: '🧱 می‌ری سمت بچه‌هایی که لگو بازی می‌کنن', tokenCost: 6, isGood: true, effects: { social: 5, intelligence: 3, happiness: 3 }, nextId: 'childhood_04' },
        { text: '🎨 می‌شینی و شروع می‌کنی به نقاشی', tokenCost: 7, isGood: true, effects: { intelligence: 5, happiness: 5 }, nextId: 'childhood_04' },
        { text: '👶 می‌ری پیش بچه‌ای که گریه می‌کنه', tokenCost: 9, isGood: true, effects: { social: 8, happiness: 3, fame: 2 }, nextId: 'childhood_04' },
        { text: '😶 یه گوشه می‌شینی و به همه نگاه می‌کنی', tokenCost: 2, isGood: false, effects: { intelligence: 2, social: -3 }, nextId: 'childhood_04' }
      ]
    },
    {
      id: 'childhood_04',
      age: 6,
      title: 'شب قبل از مدرسه',
      narrative: 'تابستون تموم شد. {fatherName} یه کیف مدرسه برات خریده — بوی چرم و نو.\n\nشب توی رختخواب دراز کشیدی. {motherName} دفتر و مداد رو آماده کرده. فردا اولین روز مدرسه‌ته.\n\nبه سقف خیره می‌شی...',
      choices: [
        { text: '🤩 هیجان‌زده‌ای — اصلاً نمی‌تونی بخوابی!', tokenCost: 7, isGood: true, effects: { happiness: 5, intelligence: 3 }, nextId: 'school_01' },
        { text: '😰 نگرانی — "اگه بچه‌ها باهام دوست نشن چی؟"', tokenCost: 4, isGood: false, effects: { happiness: -3, intelligence: 2 }, nextId: 'school_01' },
        { text: '😤 اصلاً دوست نداری بری — می‌خوای بازی کنی', tokenCost: 2, isGood: false, effects: { happiness: -2, intelligence: -3 }, nextId: 'school_01' }
      ]
    }
  ],

  // ========================
  // 🏫 SCHOOL
  // ========================
  school: [
    {
      id: 'school_01',
      age: 7,
      title: 'کلاس اول',
      narrative: 'صبح زود با صدای زنگ بیدار می‌شی. لباس مدرسه‌ات رو می‌پوشی.\n\nکلاس اول ابتدایی. معلمت خانم محمدی یه زن مهربونه با عینک ته‌استکانی. روی تخته می‌نویسه: "بسم‌الله"\n\nکنار دستت یه بچه نشسته که مدام ور می‌ره.',
      choices: [
        { text: '📖 با دقت به حرفای معلم گوش می‌دی', tokenCost: 8, isGood: true, effects: { intelligence: 8, happiness: 2 }, nextId: 'school_02' },
        { text: '🗣️ با بچه کنار دستیت دوست می‌شی', tokenCost: 6, isGood: true, effects: { social: 8, intelligence: -2 }, nextId: 'school_02' },
        { text: '😴 از پنجره بیرون رو نگاه می‌کنی', tokenCost: 2, isGood: false, effects: { intelligence: -3, happiness: -2 }, nextId: 'school_02' }
      ]
    },
    {
      id: 'school_02',
      age: 9,
      title: 'قلدر مدرسه',
      narrative: 'چند سال از اون روز اول گذشته. مدرسه رو بلدی، رفیق داری، معلما رو می‌شناسی.\n\nولی یه چیز تغییر نکرده — توی حیاط، یه بچه بزرگ‌تر داره یکی از بچه‌های کلاست رو اذیت می‌کنه. ساندویچش رو گرفته. بچه داره گریه می‌کنه.\n\nبقیه نگاه می‌کنن. کسی کاری نمی‌کنه.',
      choices: [
        { text: '🦸 جلو می‌ری و از بچه دفاع می‌کنی', tokenCost: 10, isGood: true, effects: { social: 10, fame: 5, health: -5, happiness: 5 }, nextId: 'school_03' },
        { text: '👨‍🏫 می‌ری ناظم رو خبر می‌کنی', tokenCost: 6, isGood: true, effects: { social: 3, intelligence: 3 }, nextId: 'school_03' },
        { text: '😶 رد می‌شی — به تو مربوط نیست', tokenCost: 2, isGood: false, effects: { social: -5, happiness: -5 }, nextId: 'school_03' },
        { text: '😈 به قلدر می‌پیوندی', tokenCost: 1, isGood: false, effects: { social: -8, fame: 3, happiness: -3 }, nextId: 'school_03' }
      ]
    },
    {
      id: 'school_03',
      age: 11,
      title: 'امتحانات',
      narrative: 'سال‌ها رد شدن. درس‌ها سخت‌تر شدن، رفیقات بیشتر شدن، دنیا بزرگ‌تر به نظر می‌رسه.\n\nامشب امتحان ریاضی داری. {motherName} می‌گه برو سر درست بشین.\n\nولی رفیقت پیام داده: "بیا فوتبال، آخر هفته‌ست!"',
      choices: [
        { text: '📚 می‌شینی و درس می‌خونی', tokenCost: 9, isGood: true, effects: { intelligence: 10, happiness: -3 }, nextId: 'school_04' },
        { text: '⚽ می‌ری فوتبال — فردا یه جوری حلش می‌کنم', tokenCost: 3, isGood: false, effects: { happiness: 5, health: 3, intelligence: -8, social: 3 }, nextId: 'school_04' },
        { text: '🤝 از رفیقت می‌خوای بیاد باهم درس بخونید', tokenCost: 7, isGood: true, effects: { intelligence: 7, social: 5, happiness: 2 }, nextId: 'school_04' }
      ]
    },
    {
      id: 'school_04',
      age: 13,
      title: 'تغییر',
      narrative: 'یه چیزی عوض شده — توی بدن، توی ذهن، توی احساس.\n\nبعضی وقتا بی‌دلیل عصبانی می‌شی. بعضی وقتا غمگین. دنیا دیگه مثل قبل ساده نیست.\n\n{fatherName} یه روز می‌گه: "بیا باهم حرف بزنیم."',
      choices: [
        { text: '💬 می‌شینی و باهاش حرف می‌زنی', tokenCost: 8, isGood: true, effects: { intelligence: 5, social: 5, happiness: 5 }, nextId: 'school_05' },
        { text: '📖 خودت از کتاب و اینترنت یاد می‌گیری', tokenCost: 6, isGood: true, effects: { intelligence: 8, social: -2 }, nextId: 'school_05' },
        { text: '😤 "ولم کن، حوصله ندارم!" — در اتاق رو می‌بندی', tokenCost: 2, isGood: false, effects: { happiness: -5, social: -5 }, nextId: 'school_05' }
      ]
    },
    {
      id: 'school_05',
      age: 15,
      title: 'انتخاب رشته',
      narrative: 'دبیرستان. همه چیز جدی‌تر شده.\n\nباید رشته انتخاب کنی. {fatherName} می‌گه تجربی. {motherName} می‌گه هر چی خودت دوست داری. رفیقت می‌گه انسانی راحت‌تره.\n\nاین انتخاب، مسیر رو تغییر می‌ده.',
      choices: [
        { text: '🔬 تجربی — دکتر یا مهندس', tokenCost: 8, isGood: true, effects: { intelligence: 10, happiness: -2 }, nextId: 'school_06' },
        { text: '🔢 ریاضی — عاشق حل مسئله‌ام', tokenCost: 8, isGood: true, effects: { intelligence: 12, happiness: -3 }, nextId: 'school_06' },
        { text: '📚 انسانی — ادبیات و تاریخ', tokenCost: 6, isGood: true, effects: { intelligence: 5, happiness: 5, social: 3 }, nextId: 'school_06' },
        { text: '🤷 فرقی نمی‌کنه — هر چی بگن', tokenCost: 2, isGood: false, effects: { intelligence: -3, happiness: -5 }, nextId: 'school_06' }
      ]
    },
    {
      id: 'school_06',
      age: 17,
      title: 'کنکور',
      narrative: 'یه سال از اون انتخاب گذشته. درس، کلاس، آزمون، درس، کلاس، آزمون...\n\nامروز روز کنکوره. {motherName} برات اسپند دود می‌کنه. {fatherName} می‌گه: "هر چی شد، بهت افتخار می‌کنیم."\n\nقلمت رو بر می‌داری و می‌ری داخل...',
      choices: [
        { text: '🏆 با اعتماد می‌شینی — زحمت کشیدی', tokenCost: 10, isGood: true, effects: { intelligence: 8, happiness: 5, fame: 3 }, nextId: 'university_01' },
        { text: '😰 استرس داری ولی تمام تلاشت رو می‌کنی', tokenCost: 6, isGood: true, effects: { intelligence: 5, happiness: -2, health: -3 }, nextId: 'university_01' },
        { text: '😤 نمی‌ری — "کنکور مزخرفه!"', tokenCost: 2, isGood: false, effects: { intelligence: -10, happiness: -5 }, nextId: 'youth_nocollege_01', deathAgeMod: -3 }
      ]
    }
  ],

  // ========================
  // 🎓 UNIVERSITY
  // ========================
  university: [
    {
      id: 'university_01',
      age: 18,
      title: 'نتایج',
      narrative: 'چند هفته بعد از کنکور، نتایج اومده.\n\nبا دستای لرزون سایت رو باز می‌کنی. رتبه‌ات خوبه — نه عالی، ولی می‌شه یه رشته خوب زد.',
      choices: [
        { text: '🏥 پزشکی — دانشگاه شهرستان', tokenCost: 9, isGood: true, effects: { intelligence: 10, wealth: 5, happiness: -3 }, nextId: 'university_02' },
        { text: '💻 مهندسی کامپیوتر — دانشگاه تهران', tokenCost: 8, isGood: true, effects: { intelligence: 8, wealth: 5, social: 3 }, nextId: 'university_02' },
        { text: '📖 حقوق — دانشگاه آزاد', tokenCost: 6, isGood: true, effects: { intelligence: 5, social: 5, fame: 2 }, nextId: 'university_02' },
        { text: '🎨 هنر — هر چی دوست دارم!', tokenCost: 5, isGood: true, effects: { happiness: 10, fame: 3, wealth: -5 }, nextId: 'university_02' }
      ]
    },
    {
      id: 'university_02',
      age: 19,
      title: 'عشق اول',
      narrative: 'یه ترم از دانشگاه گذشته. خوابگاه، کلاس، کافه‌تریا، دوستای جدید.\n\nیه روز توی کتابخونه، کنارت یه نفر می‌شینه. هر بار نگاهت بهش می‌افته، سریع برمی‌گردونی.\n\nقلبت یه جور عجیبی می‌زنه...',
      choices: [
        { text: '💌 جرأت می‌کنی و حرف می‌زنی', tokenCost: 9, isGood: true, effects: { social: 8, happiness: 10, intelligence: -3 }, nextId: 'university_03' },
        { text: '📚 تمرکزت رو می‌ذاری روی درس', tokenCost: 7, isGood: true, effects: { intelligence: 8, happiness: -3 }, nextId: 'university_03' },
        { text: '😔 خجالت می‌کشی — هیچ‌وقت حرف نمی‌زنی', tokenCost: 3, isGood: false, effects: { happiness: -5, social: -3 }, nextId: 'university_03' }
      ]
    },
    {
      id: 'university_03',
      age: 21,
      title: 'فارغ‌التحصیلی',
      narrative: 'چهار سال گذشت — امتحانا، پروژه‌ها، خاطره‌ها.\n\nامروز جشن فارغ‌التحصیلیه. {fatherName} و {motherName} نشستن توی سالن و نگاهت می‌کنن.\n\nیه شب با رفیقات نشستید و داری فکر می‌کنی — بعدش چی؟',
      choices: [
        { text: '✈️ مهاجرت — یه زندگی جدید!', tokenCost: 10, isGood: true, effects: { intelligence: 5, wealth: 5, social: -10, happiness: -5 }, nextId: 'career_abroad_01', deathAgeMod: 5 },
        { text: '🏠 ایران می‌مونی و دنبال کار می‌گردی', tokenCost: 6, isGood: true, effects: { social: 5, happiness: 3 }, nextId: 'career_01' },
        { text: '📚 ادامه تحصیل — فوق‌لیسانس', tokenCost: 8, isGood: true, effects: { intelligence: 12, wealth: -5, fame: 3 }, nextId: 'career_01' },
        { text: '🤷 هنوز نمی‌دونم...', tokenCost: 2, isGood: false, effects: { happiness: -8, intelligence: -3 }, nextId: 'career_01' }
      ]
    }
  ],

  // ========================
  // 💼 NO COLLEGE PATH
  // ========================
  nocollege: [
    {
      id: 'youth_nocollege_01',
      age: 18,
      title: 'بدون دانشگاه',
      narrative: 'رفیقات رفتن دانشگاه. {fatherName} ناراحته ولی چیزی نمی‌گه. {motherName} نگرونه.\n\nتو تصمیم خودت رو گرفتی. حالا باید یه راه پیدا کنی.',
      choices: [
        { text: '🔧 کارآموزی — یه حرفه یاد می‌گیری', tokenCost: 7, isGood: true, effects: { wealth: 5, intelligence: 5, happiness: 3 }, nextId: 'career_01' },
        { text: '💼 با سرمایه کم، کسب‌وکار کوچیک می‌زنی', tokenCost: 9, isGood: true, effects: { wealth: 8, fame: 5, happiness: 5 }, nextId: 'career_01' },
        { text: '🎮 خونه می‌شینی — یکی پیدا میشه', tokenCost: 1, isGood: false, effects: { happiness: -10, social: -8, wealth: -5, health: -3 }, nextId: 'career_01', deathAgeMod: -5 }
      ]
    }
  ],

  // ========================
  // 💼 CAREER
  // ========================
  career: [
    {
      id: 'career_01',
      age: 23,
      title: 'اول کار',
      narrative: 'چند ماهه دنبال کار می‌گردی. رزومه می‌فرستی، مصاحبه می‌ری، منتظر می‌مونی.\n\nبالاخره دو تا پیشنهاد روی میزته:',
      choices: [
        { text: '🏢 شرکت بزرگ — حقوق خوب، ساعت زیاد', tokenCost: 8, isGood: true, effects: { wealth: 15, happiness: -5, health: -3, intelligence: 5 }, nextId: 'career_02' },
        { text: '🏪 کار با {fatherName} — خانوادگی', tokenCost: 6, isGood: true, effects: { social: 8, happiness: 5, wealth: 5 }, nextId: 'career_02' },
        { text: '🚀 استارتاپ خودت — ریسک بالا!', tokenCost: 9, isGood: true, effects: { fame: 8, intelligence: 5, wealth: -5, happiness: 3 }, nextId: 'career_02' },
        { text: '😩 هنوز دنبال کار می‌گردی... بازار خرابه', tokenCost: 2, isGood: false, effects: { happiness: -10, wealth: -5 }, nextId: 'career_02', deathAgeMod: -2 }
      ]
    },
    {
      id: 'career_02',
      age: 25,
      title: 'ازدواج',
      narrative: 'دو سال از شروع کارت گذشته. {motherName} مدام می‌گه: "پس کی می‌خوای زن/شوهر بگیری؟"\n\nراستش رو بخوای... داری به جدی فکر می‌کنی.',
      choices: [
        { text: '💍 با کسی که دوستش داری ازدواج می‌کنی', tokenCost: 9, isGood: true, effects: { happiness: 12, social: 10, wealth: -8 }, nextId: 'career_03' },
        { text: '👨‍👩‍👦 ازدواج سنتی — فامیل یکی رو معرفی کرده', tokenCost: 5, isGood: true, effects: { social: 8, happiness: 3, wealth: -3 }, nextId: 'career_03' },
        { text: '✋ هنوز زوده — اول باید سر و سامون بگیرم', tokenCost: 6, isGood: true, effects: { wealth: 5, intelligence: 3, social: -5 }, nextId: 'career_03' },
        { text: '💔 اصلاً نمی‌خوام ازدواج کنم', tokenCost: 3, isGood: false, effects: { happiness: 3, social: -10 }, nextId: 'career_03' }
      ]
    },
    {
      id: 'career_03',
      age: 28,
      title: 'بحران',
      narrative: 'زندگی جریان داشته — کار، خونه، روزمرگی.\n\nولی این روزا یه چیزی عوض شده. قیمت‌ها سر به فلک کشیده. اجاره خونه دو برابر شده. یه شب می‌شینی و حساب می‌کنی...\n\nاعداد جور در نمیان.',
      choices: [
        { text: '💪 سخت‌تر کار می‌کنی — شب‌ها هم', tokenCost: 8, isGood: true, effects: { wealth: 12, health: -8, happiness: -5 }, nextId: 'career_04', deathAgeMod: -3 },
        { text: '📚 یه مهارت جدید یاد می‌گیری — برنامه‌نویسی', tokenCost: 9, isGood: true, effects: { intelligence: 10, wealth: 5, happiness: 3 }, nextId: 'career_04' },
        { text: '🤲 از خانواده کمک می‌خوای', tokenCost: 4, isGood: false, effects: { wealth: 5, social: -3, happiness: -5 }, nextId: 'career_04' },
        { text: '🎰 راه‌حل سریع — سرمایه‌گذاری پرریسک', tokenCost: 2, isGood: false, effects: { wealth: -15, happiness: -8, health: -5 }, nextId: 'career_04', deathAgeMod: -5 }
      ]
    },
    {
      id: 'career_04',
      age: 30,
      title: 'فرزند',
      narrative: 'یه خبر بزرگ رسیده — قراره پدر یا مادر بشی.\n\nهمه چیز داره تغییر می‌کنه. مسئولیت‌ها بیشترن. ولی وقتی اون چشمای کوچولو برای اولین بار بهت نگاه می‌کنه...\n\nیه دنیا تغییر می‌کنی.',
      choices: [
        { text: '🥰 تمام وقتت رو به بچه می‌دی', tokenCost: 10, isGood: true, effects: { happiness: 15, social: 8, wealth: -5, health: -3 }, nextId: 'midlife_01' },
        { text: '⚖️ سعی می‌کنی بین کار و خانواده تعادل برقرار کنی', tokenCost: 7, isGood: true, effects: { happiness: 5, wealth: 5, social: 5, health: -3 }, nextId: 'midlife_01' },
        { text: '💼 کار اول — بچه با مادربزرگ بزرگ می‌شه', tokenCost: 3, isGood: false, effects: { wealth: 10, social: -8, happiness: -5 }, nextId: 'midlife_01' }
      ]
    }
  ],

  // ========================
  // ✈️ ABROAD
  // ========================
  abroad: [
    {
      id: 'career_abroad_01',
      age: 23,
      title: 'غربت',
      narrative: 'هواپیما که نشست، دلت فرو ریخت.\n\nهمه چیز عجیبه — زبون، بو، آدما. شب اول توی خوابگاه، به سقف نگاه می‌کنی و به {motherName} فکر می‌کنی.\n\nولی اومدی. باید بجنگی.',
      choices: [
        { text: '💪 سخت تلاش می‌کنی — کار + درس + زبون', tokenCost: 10, isGood: true, effects: { intelligence: 12, wealth: 8, happiness: -8, health: -5 }, nextId: 'midlife_01' },
        { text: '🤝 با ایرانی‌های اونجا دوست می‌شی', tokenCost: 7, isGood: true, effects: { social: 10, happiness: 5, wealth: 3 }, nextId: 'midlife_01' },
        { text: '😢 طاقت نمیاری و برمی‌گردی', tokenCost: 3, isGood: false, effects: { happiness: -10, wealth: -10, social: 5 }, nextId: 'career_01' }
      ]
    }
  ],

  // ========================
  // 🏠 MIDLIFE
  // ========================
  midlife: [
    {
      id: 'midlife_01',
      age: 35,
      title: 'میانسالی',
      narrative: 'یه صبح جلوی آینه وایمیستی.\n\nچند تا موی سفید... چند تا چروک که قبلاً نبودن. بچه‌ات داره بزرگ می‌شه. {fatherName} و {motherName} پیرتر شدن.\n\nیه سوال توی ذهنته که جوابش سختِ: "آیا خوشحالم؟"',
      choices: [
        { text: '🧘 شروع می‌کنی به ورزش و مراقبت از خودت', tokenCost: 8, isGood: true, effects: { health: 15, happiness: 8 }, nextId: 'midlife_02', deathAgeMod: 5 },
        { text: '🎯 یه هدف بزرگ جدید می‌ذاری', tokenCost: 9, isGood: true, effects: { fame: 8, wealth: 5, intelligence: 5, happiness: 5 }, nextId: 'midlife_02' },
        { text: '🍺 با تفریح سعی می‌کنی فراموش کنی', tokenCost: 3, isGood: false, effects: { happiness: -5, health: -10, wealth: -5 }, nextId: 'midlife_02', deathAgeMod: -7 },
        { text: '🤷 زندگی همینه — ادامه می‌دی', tokenCost: 2, isGood: false, effects: { happiness: -8, health: -3 }, nextId: 'midlife_02', deathAgeMod: -3 }
      ]
    },
    {
      id: 'midlife_02',
      age: 40,
      title: 'چهل‌سالگی',
      narrative: 'چهل ساله شدی.\n\nبچه‌ات داره می‌ره مدرسه. خونه‌ات پر از خاطره‌ست. یه شب {fatherName} زنگ می‌زنه:\n\n"بیا خونه. کارت دارم."',
      choices: [
        { text: '🏃 فوری می‌ری — نکنه اتفاقی افتاده', tokenCost: 7, isGood: true, effects: { social: 8, happiness: 3 }, nextId: 'midlife_03' },
        { text: '📞 "بابا الان سرم شلوغه، فردا میام"', tokenCost: 3, isGood: false, effects: { social: -5, happiness: -3 }, nextId: 'midlife_03' }
      ]
    },
    {
      id: 'midlife_03',
      age: 42,
      title: 'دوراهی',
      narrative: '{fatherName} می‌گه که پیر شده و به کمک نیاز داره.\n\nهمون وقت یه پیشنهاد کاری فوق‌العاده رسیده — ولی باید بری یه شهر دیگه. از اون طرف، رفیق قدیمیت یه شراکت پیشنهاد داده.\n\nهمه چیز با هم رسیده.',
      choices: [
        { text: '✈️ پیشنهاد کاری رو قبول می‌کنی', tokenCost: 9, isGood: true, effects: { wealth: 15, fame: 8, social: -10, happiness: -5 }, nextId: 'elderly_01', deathChance: 0.05, deathCause: 'استرس شدید' },
        { text: '🤝 شراکت با رفیقت', tokenCost: 7, isGood: true, effects: { wealth: 10, fame: 5, social: 3 }, nextId: 'elderly_01', deathChance: 0.03, deathCause: 'ورشکستگی و افسردگی' },
        { text: '🏠 می‌مونی پیش خانواده', tokenCost: 6, isGood: true, effects: { happiness: 10, social: 10, wealth: -3 }, nextId: 'elderly_01' },
        { text: '🎲 همه رو قبول می‌کنی!', tokenCost: 3, isGood: false, effects: { wealth: 5, health: -15, happiness: -10 }, nextId: 'elderly_01', deathChance: 0.15, deathCause: 'فشار بیش از حد', deathAgeMod: -8 }
      ]
    }
  ],

  // ========================
  // 👴 ELDERLY
  // ========================
  elderly: [
    {
      id: 'elderly_01',
      age: 55,
      title: 'بازنشستگی',
      narrative: 'موهات سفید شده. بچه‌ات بزرگ شده و داره ازدواج می‌کنه.\n\n{motherName} دیگه نیست — یه روز رفت و نیومد. تنهایی که جاش مونده رو هیچ چیز پر نمی‌کنه.\n\nولی زندگی هنوز جریان داره. حالا وقت بازنشستگیه.',
      choices: [
        { text: '📚 خاطراتت رو می‌نویسی', tokenCost: 8, isGood: true, effects: { fame: 10, happiness: 10, intelligence: 5 }, nextId: 'elderly_02' },
        { text: '🌍 سفر — می‌ری دنیا رو ببینی', tokenCost: 9, isGood: true, effects: { happiness: 15, health: -3, wealth: -5 }, nextId: 'elderly_02', deathAgeMod: 3 },
        { text: '👶 نوه‌هات رو بزرگ می‌کنی', tokenCost: 7, isGood: true, effects: { happiness: 12, social: 10 }, nextId: 'elderly_02' },
        { text: '😔 تنهایی... کسی سر نمی‌زنه', tokenCost: 2, isGood: false, effects: { happiness: -15, health: -10, social: -8 }, nextId: 'elderly_02', deathAgeMod: -10 }
      ]
    },
    {
      id: 'elderly_02',
      age: 65,
      title: 'آخرین فصل',
      narrative: 'بدنت دیگه مثل قبل نیست. دکتر می‌گه مراقب باش.\n\nنوه‌ات می‌گه: "بابابزرگ/مامان‌بزرگ، وقتی بزرگ شدم می‌خوام مثل تو بشم!"\n\nلبخند می‌زنی. یه سوال ساده، جواب سختی داره: آیا زندگی خوبی داشتی؟',
      choices: [
        { text: '🙏 با آرامش به گذشته نگاه می‌کنی — ممنونم', tokenCost: 8, isGood: true, effects: { happiness: 15, health: 5 }, nextId: 'ending_peaceful' },
        { text: '💪 هنوز کارای نکرده دارم!', tokenCost: 9, isGood: true, effects: { happiness: 10, fame: 5 }, nextId: 'ending_active' },
        { text: '😢 ای کاش می‌تونستم برگردم...', tokenCost: 3, isGood: false, effects: { happiness: -15 }, nextId: 'ending_regret' }
      ]
    }
  ],

  // ========================
  // 🔚 ENDINGS
  // ========================
  endings: [
    {
      id: 'ending_peaceful',
      age: null,
      title: 'پایان آرام',
      narrative: 'یه صبح پاییزی توی باغچه نشستی.\n\nچای داغت رو هورت می‌کشی. نوه‌ات داره بازی می‌کنه. برگ‌های زرد می‌ریزن.\n\nلبخند می‌زنی.\n\nزندگی خوبی بود — با تمام فراز و نشیب‌هاش.\n\nچشمات آروم بسته می‌شه...',
      choices: [
        { text: '🔄 دوباره — یه سرنوشت دیگه رو امتحان کن', tokenCost: 0, isGood: true, effects: {}, nextId: '__DEATH__' }
      ]
    },
    {
      id: 'ending_active',
      age: null,
      title: 'پایان جنگنده',
      narrative: 'تا آخرین لحظه جنگیدی.\n\nهمیشه یه پروژه جدید، یه هدف جدید.\n\nیه روز — وسط کار روی آخرین پروژه‌ات — قلبت ایستاد.\n\nلبخند روی لبت بود...',
      choices: [
        { text: '🔄 دوباره — شاید این بار فرق داشته باشه', tokenCost: 0, isGood: true, effects: {}, nextId: '__DEATH__' }
      ]
    },
    {
      id: 'ending_regret',
      age: null,
      title: 'پایان حسرت',
      narrative: 'یه شب بارونی توی خونه تنهایی.\n\nآلبوم عکس قدیمی رو ورق می‌زنی. عکس {fatherName} و {motherName}، عکس جوونی‌ات.\n\n"ای کاش..." — این دو کلمه، تمام زندگیت رو خلاصه می‌کنه.\n\nشاید اگه دوباره شروع کنی...',
      choices: [
        { text: '🔄 دوباره — این بار فرق داره', tokenCost: 0, isGood: true, effects: {}, nextId: '__DEATH__' }
      ]
    }
  ]
};

export default STORY_DATA;
