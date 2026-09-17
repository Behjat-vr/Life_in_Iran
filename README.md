# 🎮 زندگی در ایران — راهنمای توسعه

## ساختار پروژه
```
زندگی در ایران/
├── index.html          ← فایل اصلی وب
├── css/                ← استایل‌ها
├── js/                 ← جاوااسکریپت
│   ├── engine/         ← موتور بازی
│   ├── data/           ← داده‌های داستان و خانواده
│   └── ui/             ← مدیریت رابط کاربری
├── www/                ← خروجی برای Android (خودکار)
├── android/            ← پروژه Android Studio
├── package.json
└── capacitor.config.json
```

## اجرای وب (لوکال)
```bash
npx serve . -l 3000
```
مرورگر را باز کن روی: `http://localhost:3000`

## آپدیت Android بعد از تغییر فایل‌ها
```bash
npm run deploy
```
این دستور:
1. فایل‌های جدید را به `www/` کپی می‌کند
2. `cap sync android` می‌زند تا Android پروژه آپدیت بشه

## باز کردن Android Studio
```bash
npm run android
```

## ساخت APK در Android Studio
1. Android Studio را باز کن
2. اول بذار Gradle sync تموم بشه
3. اگه SDK نداری: `Tools → SDK Manager → Android 14 (API 34)` دانلود کن
4. `Build → Build Bundle(s) / APK(s) → Build APK(s)`
5. APK در مسیر زیر ساخته می‌شه:
   `android/app/build/outputs/apk/debug/app-debug.apk`

## فلوی کاری
```
ویرایش کد  →  npm run deploy  →  Android Studio  →  Build APK
```

## نکات مهم
- **RTL**: بازی کاملاً RTL (راست به چپ) است
- **فارسی**: تمام داستان‌ها به فارسی هستند
- **آفلاین**: بازی بدون اینترنت هم کار می‌کند
- **LocalStorage**: پیشرفت بازی در localStorage ذخیره می‌شه
