# راهنمای کامل مدیریت، ویرایش و نگهداری پرتفولیوی Elmira Behrouzi

این فایل «دفترچه راهنمای دائمی» پروژه است. هر بار که خواستی سایت را اجرا کنی، محتوایش را عوض کنی، پروژه جدید اضافه کنی، ظاهرش را تغییر بدهی، از اطلاعاتش بکاپ بگیری، خطاها را بررسی کنی یا برای انتشار آماده‌اش کنی، از این راهنما استفاده کن.

> **قانون اصلی:** اگر فقط محتوا عوض می‌شود، از Control Panel استفاده کن و کد را دست نزن. اگر ظاهر، ساختار صفحه، رفتار سایت یا قابلیت جدید عوض می‌شود، کد React/Django را ویرایش کن.

---

## 1) شناسنامه فنی پروژه

این سایت یک پروژه Full-Stack است و از این بخش‌ها تشکیل شده:

- Frontend: React 18 + Vite 6
- Routing: React Router
- HTTP Client: Axios
- Icons: Lucide React
- Backend: Django 5 + Django REST Framework
- Authentication: JWT با SimpleJWT
- Database: PostgreSQL در Docker
- Web Server فرانت‌اند: Nginx
- App Server بک‌اند: Gunicorn
- Containerization: Docker Compose
- سه زبان: English / Deutsch / فارسی
- RTL برای فارسی
- پنل مدیریت اختصاصی React
- Django Admin به‌عنوان پنل مدیریتی دوم

معماری کلی:

```text
Browser
   ↓
Nginx + React
   ↓ /api
Django REST Framework
   ↓
PostgreSQL
```

فایل‌های آپلودی نیز در volume جداگانه Docker نگهداری می‌شوند.

---

# 2) آدرس‌های مهم سایت

وقتی پروژه با Docker روشن باشد:

```text
سایت اصلی:
http://localhost:3000

پنل مدیریت اختصاصی:
http://localhost:3000/control/login

Django Admin:
http://localhost:3000/django-admin/
```

نام کاربری اولیه پنل:

```text
elmira
```

رمز اولیه داخل فایل زیر نگهداری شده:

```text
LOCAL_ADMIN_CREDENTIALS.txt
```

**قبل از انتشار عمومی حتماً رمز را تغییر بده.**

---

# 3) ساختار فولدرهای پروژه

```text
elmira_portfolio_fullstack/
│
├── backend/                 Django + REST API
│   ├── config/              تنظیمات اصلی Django
│   ├── portfolio/           مدل‌ها، APIها، Admin و منطق سایت
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── entrypoint.sh
│
├── frontend/                React
│   ├── src/
│   │   ├── pages/           صفحات عمومی
│   │   ├── pages/admin/     پنل مدیریت اختصاصی
│   │   ├── components/      کامپوننت‌های مشترک
│   │   ├── App.jsx          Routeها
│   │   ├── api.js           اتصال React به Django
│   │   ├── i18n.jsx         زبان‌ها
│   │   └── styles.css       تقریباً تمام ظاهر سایت
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
│
├── .env                     تنظیمات خصوصی محیط
├── .env.example             نمونه تنظیمات
├── docker-compose.yml       اجرای کل پروژه
├── LOCAL_ADMIN_CREDENTIALS.txt
├── README.md
└── SITE_MANUAL_FA.md        همین راهنما
```

---

# 4) روشن کردن سایت

Docker Desktop باید باز و Engine فعال باشد.

در VS Code ترمینال را در ریشه پروژه باز کن:

```powershell
cd C:\Users\Elmira\Downloads\elmira_portfolio_fullstack
```

سپس:

```powershell
docker compose up --build
```

اگر قبلاً Build شده و فقط می‌خواهی روشنش کنی:

```powershell
docker compose up
```

برای اجرای پس‌زمینه‌ای و آزاد شدن ترمینال:

```powershell
docker compose up -d
```

وضعیت سرویس‌ها:

```powershell
docker compose ps
```

باید سرویس‌های `db`، `backend` و `frontend` در وضعیت Up باشند.

---

# 5) خاموش کردن سایت

اگر Docker در همان ترمینال در حال نمایش Log است:

```text
Ctrl + C
```

بعد:

```powershell
docker compose down
```

این دستور دیتابیس و فایل‌های آپلودشده را حذف نمی‌کند.

## دستور خطرناک

```powershell
docker compose down -v
```

این دستور Volumeها را هم پاک می‌کند و می‌تواند دیتابیس و فایل‌های آپلودی را حذف کند.

**بدون بکاپ از `-v` استفاده نکن.**

---

# 6) اگر فقط محتوا را تغییر دادی

اگر از پنل مدیریت یکی از این‌ها را تغییر دادی:

- پروژه
- مهارت
- سابقه
- تحصیلات
- مقاله
- Design Project
- اطلاعات پروفایل
- رزومه

نیازی به Build مجدد نیست.

اطلاعات مستقیم داخل Django/PostgreSQL ذخیره می‌شوند و سایت آن‌ها را از API دریافت می‌کند.

---

# 7) اگر کد را تغییر دادی

## تغییر React / CSS / صفحات سایت

مثلاً فایل‌های زیر:

```text
frontend/src/styles.css
frontend/src/pages/...
frontend/src/components/...
frontend/src/i18n.jsx
```

بعد از تغییر:

```powershell
docker compose up -d --build frontend
```

اگر می‌خواهی Log را ببینی:

```powershell
docker compose logs -f frontend
```

## تغییر Django

اگر فایل‌های Backend را تغییر دادی:

```powershell
docker compose up -d --build backend
```

Log بک‌اند:

```powershell
docker compose logs -f backend
```

## اگر تغییر بزرگ یا نامطمئن بود

```powershell
docker compose down
docker compose up --build
```

---

# 8) پنل مدیریت اختصاصی

آدرس:

```text
http://localhost:3000/control/login
```

منوی پنل:

```text
Overview
Projects
Messages
Lab / Blog
Skills
Experience
Education
Design
Site Profile
Settings
```

---

# 9) Overview

این صفحه وضعیت کلی را نشان می‌دهد:

- تعداد Projects
- تعداد پیام‌های خوانده‌نشده
- تعداد Blog Posts
- تعداد Skills

اگر اعداد نمایش داده نشدند، معمولاً API یا لاگین JWT مشکل دارد.

---

# 10) Projects — مهم‌ترین بخش پرتفولیو

مسیر:

```text
Control Panel → Projects
```

برای پروژه جدید:

```text
Add new
```

## فیلدهای پروژه

### عنوان‌ها

```text
Title · English
Title · فارسی
Title · Deutsch
```

برای هر پروژه بهتر است هر سه را کامل کنی.

### Slug

Slug بخشی از URL پروژه است.

مثال:

```text
freelancer-management-platform
```

URL:

```text
/projects/freelancer-management-platform
```

اگر Slug را خالی بگذاری، Django از عنوان انگلیسی می‌سازد.

**بعد از انتشار و اشتراک لینک، Slug را بی‌دلیل تغییر نده.**

### Category

گزینه‌ها:

```text
Backend
Full Stack
API
Automation
Data
Frontend
Other
```

### Short Description

برای کارت پروژه و معرفی کوتاه.

### Full Description

شرح اصلی پروژه در صفحه Detail.

### Problem

مسئله‌ای که پروژه حل می‌کند.

### Solution

راه‌حل فنی و معماری‌ای که ساختی.

### Challenges

چالش‌ها، تصمیمات فنی و چیزهایی که یاد گرفتی.

این بخش برای پرتفولیوی برنامه‌نویسی خیلی مهم است.

### Tech Stack

در پنل با کاما وارد کن:

```text
Python, Django, PostgreSQL, Docker, React
```

### Features

ویژگی‌ها نیز با کاما:

```text
JWT Authentication, Role Management, REST API, Dashboard
```

### Cover Image

عکس پروژه را Upload کن.

### GitHub URL

لینک Repository.

### Live Demo URL

لینک نسخه آنلاین پروژه.

### Your Role

مثلاً:

```text
Full-Stack Developer
Backend Developer
Solo Developer
```

### Duration

مثلاً:

```text
3 weeks
Jan 2027 – Feb 2027
```

### Project Type

مثلاً:

```text
Personal Project
Client Project
Learning Project
Open Source
```

### Featured on home

اگر فعال باشد پروژه می‌تواند در Home نمایش داده شود.

Home حداکثر 3 پروژه Featured را نمایش می‌دهد؛ اگر Featured نداشته باشی، سه پروژه اول را نشان می‌دهد.

### Published

- روشن = در سایت عمومی نمایش داده می‌شود.
- خاموش = Draft است و فقط در پنل مدیریت قابل مشاهده است.

### Order

عدد کمتر بالاتر نمایش داده می‌شود.

مثال:

```text
0 = اول
1 = دوم
2 = سوم
```

---

# 11) Skills

مسیر:

```text
Control Panel → Skills
```

فیلدها:

```text
Name
Category
Level %
Icon name
Currently learning
Order
```

Categoryها:

```text
programming
backend
frontend
database
tools
design
professional
```

`Currently learning` باعث نمایش Skill در بخش «در حال یادگیری» می‌شود.

Level فعلاً یک مقدار اطلاعاتی است و بهتر است واقع‌بینانه وارد شود.

---

# 12) Experience

مسیر:

```text
Control Panel → Experience
```

برای هر تجربه:

- Role EN/FA/DE
- Company
- Start
- End
- Description EN/FA/DE
- Highlights / bullets
- Published
- Order

Bullets را با کاما جدا کن.

مثلاً:

```text
Built Django modules, Worked with REST APIs, Collaborated with design team
```

---

# 13) Education

مسیر:

```text
Control Panel → Education
```

برای موارد زیر مناسب است:

- دانشگاه
- دوره تخصصی
- Bootcamp
- Certificate
- دوره آنلاین معتبر

فیلدها:

```text
Title EN/FA/DE
Institution
Year / period
Description EN/FA/DE
Published
Order
```

---

# 14) Design

این قسمت مکمل هویت Developer است.

مسیر:

```text
Control Panel → Design
```

برای پروژه‌های Figma/UI/UX.

فیلدها:

- Title EN/FA/DE
- Slug
- Short EN/FA/DE
- Tools
- Cover image
- Case study URL
- Real project
- Published
- Order

Tools را با کاما وارد کن:

```text
Figma, Wireframing, Prototyping, UX Research
```

---

# 15) Lab / Blog

مسیر:

```text
Control Panel → Lab / Blog
```

این قسمت برای نمایش رشد فنی بسیار مهم است.

مناسب برای:

- آموزش کوتاه
- حل یک خطا
- توضیح معماری پروژه
- تجربه یادگیری یک تکنولوژی
- Tutorial
- Experiment
- یادداشت درباره Clean Code

فیلدها:

```text
Title EN/FA/DE
Slug
Excerpt EN/FA/DE
Body EN/FA/DE
Tags
Cover Image
Published
```

Tags با کاما:

```text
Python, Django, API, Authentication
```

اگر Published را روشن کنی، زمان انتشار خودکار ثبت می‌شود.

---

# 16) Messages — پیام‌های Contact

هر کسی از فرم Contact پیام بفرستد، پیام در دیتابیس ذخیره می‌شود.

مسیر:

```text
Control Panel → Messages
```

وضعیت‌ها:

```text
Unread
Read
Replied
Archived
```

با باز کردن پیام Unread، به Read تبدیل می‌شود.

امکانات فعلی:

- Read
- Reply از طریق برنامه Email سیستم
- Archive
- Delete
- مشاهده Email فرستنده
- مشاهده زمان
- مشاهده IP

## نکته مهم

حتی اگر ارسال اعلان ایمیل تنظیم نشده باشد، پیام همچنان داخل دیتابیس ذخیره می‌شود.

---

# 17) Site Profile

مسیر:

```text
Control Panel → Site Profile
```

این قسمت اطلاعاتی را کنترل می‌کند که در چند جای سایت استفاده می‌شوند:

- Full Name
- Role EN / FA / DE
- Hero EN / FA / DE
- Bio EN / FA / DE
- Email
- Phone
- Location EN / FA / DE
- GitHub
- LinkedIn
- Behance
- Instagram
- Avatar
- Resume EN
- Resume DE
- Resume FA

## عکس پروفایل

در `Avatar image` عکس Upload کن.

## رزومه‌ها

سه PDF جداگانه Upload کن:

```text
Resume EN PDF
Resume DE PDF
Resume FA PDF
```

صفحه Resume هر سه نسخه را نمایش می‌دهد.

---

# 18) تغییر رمز پنل

مسیر:

```text
Control Panel → Settings
```

نیاز دارد:

```text
Current password
New password
Confirm new password
```

بعد از تغییر رمز، بهتر است Sign Out کنی و دوباره وارد شوی.

## رفتار مهم سیستم Admin

در هر Startup دستور ایجاد Admin اجرا می‌شود، اما رمز کاربر موجود را به‌صورت عادی Reset نمی‌کند.

یعنی اگر رمز را از Settings تغییر بدهی، با Restart Docker به رمز قدیمی برنمی‌گردد.

فقط اگر متغیر زیر را عمداً فعال کنی رمز Reset می‌شود:

```env
ADMIN_FORCE_RESET=1
```

---

# 19) زبان‌های سایت

فایل اصلی ترجمه UI:

```text
frontend/src/i18n.jsx
```

سه زبان:

```text
en
fa
de
```

با انتخاب فارسی:

```html
dir="rtl"
```

فعال می‌شود.

زبان انتخاب‌شده در Local Storage با کلید زیر ذخیره می‌شود:

```text
eb_lang
```

## دو نوع متن در سایت وجود دارد

### نوع اول — متن دیتابیس

مثل:

- عنوان پروژه
- Bio
- Role
- توضیح پروژه

این‌ها از پنل EN/FA/DE مدیریت می‌شوند.

### نوع دوم — متن ثابت رابط کاربری

مثل:

```text
Home
Projects
View my work
The problem
The solution
```

این‌ها داخل:

```text
frontend/src/i18n.jsx
```

هستند.

اگر یک عبارت منو یا دکمه را بخواهی عوض کنی، معمولاً باید همین فایل را ویرایش کنی.

## Fallback زبان

اگر مثلاً متن آلمانی یک پروژه خالی باشد، سیستم در بسیاری از بخش‌ها متن انگلیسی را نمایش می‌دهد.

پس برای انتشار اولیه می‌توانی ابتدا EN را کامل کنی و بعد FA/DE را تکمیل کنی.

---

# 20) صفحات عمومی و فایل مربوط به هر صفحه

| صفحه | فایل React |
|---|---|
| Home | `frontend/src/pages/Home.jsx` |
| Projects | `frontend/src/pages/Projects.jsx` |
| Project Detail | `frontend/src/pages/ProjectDetail.jsx` |
| About | `frontend/src/pages/About.jsx` |
| Skills | `frontend/src/pages/Skills.jsx` |
| Experience | `frontend/src/pages/Experience.jsx` |
| Design | `frontend/src/pages/Design.jsx` |
| Lab / Blog | `frontend/src/pages/Lab.jsx` |
| Blog Detail | `frontend/src/pages/BlogDetail.jsx` |
| Contact | `frontend/src/pages/Contact.jsx` |
| Resume | `frontend/src/pages/Resume.jsx` |

Routeهای کل سایت:

```text
frontend/src/App.jsx
```

Header / Footer / Identity Rail:

```text
frontend/src/components/Layout.jsx
```

---

# 21) تغییر ظاهر سایت

فایل اصلی:

```text
frontend/src/styles.css
```

تقریباً تمام موارد زیر آنجاست:

- رنگ‌ها
- Background
- Border
- Button
- Card
- Grid
- Typography
- Admin Panel
- Responsive
- Mobile Menu
- فرم‌ها
- Project cards
- Timeline
- Hero

بعد از تغییر CSS:

```powershell
docker compose up -d --build frontend
```

---

# 22) تغییر رنگ‌بندی کلی

برای تغییر تم، ابتدا بالای `styles.css` را بررسی کن و متغیرهای CSS / رنگ‌های اصلی را تغییر بده.

اگر رنگی را مستقیم داخل Ruleها دیدی، با Search در VS Code پیدا کن:

```text
Ctrl + Shift + F
```

مثلاً Hex رنگ فعلی را Search و Replace کن.

قبل از Replace All حتماً بررسی کن که رنگ در چه بخش‌هایی استفاده شده.

---

# 23) تغییر فونت

اگر بخواهی فونت جدید اضافه کنی:

1. فونت Web-safe یا Webfont انتخاب کن.
2. Import یا `@font-face` را در CSS اضافه کن.
3. `font-family` مربوط به `body` را عوض کن.
4. برای فارسی در صورت نیاز فونت جدا تعریف کن.
5. Frontend را Build کن.

از قرار دادن فونت‌های فاقد مجوز انتشار داخل Repository عمومی خودداری کن.

---

# 24) تغییر Header / Menu / Footer

فایل:

```text
frontend/src/components/Layout.jsx
```

آرایه Menu داخل `Header` است.

اگر بخواهی یک منو حذف یا اضافه شود، این قسمت را تغییر بده.

Footer و ستون هویتی سمت صفحه نیز در همین فایل هستند.

بعد:

```powershell
docker compose up -d --build frontend
```

---

# 25) اضافه کردن صفحه جدید React

مثلاً بخواهی صفحه `Open Source` اضافه کنی.

### مرحله 1

فایل بساز:

```text
frontend/src/pages/OpenSource.jsx
```

### مرحله 2

داخل `App.jsx` Import کن.

### مرحله 3

Route اضافه کن:

```jsx
<Route path="/open-source" element={<OpenSource/>}/>
```

### مرحله 4

اگر باید در Menu باشد، `Layout.jsx` را ویرایش کن.

### مرحله 5

Frontend را Build کن:

```powershell
docker compose up -d --build frontend
```

---

# 26) اگر بخواهی نوع محتوای جدید به Django اضافه کنی

مثلاً `Testimonials`.

Backend معمولاً این مراحل را دارد:

1. Model در:

```text
backend/portfolio/models.py
```

2. Serializer در:

```text
backend/portfolio/serializers.py
```

3. ViewSet در:

```text
backend/portfolio/views.py
```

4. Route/API در:

```text
backend/portfolio/urls.py
```

5. Admin registration در:

```text
backend/portfolio/admin.py
```

6. Migration:

```powershell
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

7. اگر Control Panel اختصاصی لازم است، Manager در Frontend اضافه کن.

---

# 27) APIهای اصلی پروژه

Base URL:

```text
/api/
```

Endpointهای مهم:

```text
/api/profile/
/api/projects/
/api/skills/
/api/experience/
/api/education/
/api/design/
/api/blog/
/api/messages/
/api/contact/
/api/dashboard/stats/
/api/upload/
/api/auth/change-password/
```

JWT:

```text
/api/auth/token/
/api/auth/token/refresh/
/api/auth/token/verify/
```

---

# 28) سیستم Login و JWT

وقتی وارد Control Panel می‌شوی:

Django دو Token می‌دهد:

```text
Access Token
Refresh Token
```

React آن‌ها را در Local Storage نگهداری می‌کند:

```text
eb_access
eb_refresh
```

Access Token فعلاً 30 دقیقه عمر دارد.
Refresh Token فعلاً 7 روز عمر دارد.

اگر Access منقضی شود، Frontend تلاش می‌کند با Refresh Token توکن جدید بگیرد.

Sign Out این Tokenها را پاک می‌کند.

---

# 29) تنظیم ایمیل برای پیام‌های Contact

وضعیت فعلی:

پیام در دیتابیس ذخیره می‌شود ولی Backend فعلاً از Console Email Backend استفاده می‌کند؛ یعنی اعلان واقعی به Gmail ارسال نمی‌شود تا SMTP تنظیم شود.

فایل:

```text
.env
```

برای Gmail ساختار معمول:

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=1
EMAIL_HOST_USER=YOUR_GMAIL
EMAIL_HOST_PASSWORD=YOUR_APP_PASSWORD
DEFAULT_FROM_EMAIL=YOUR_GMAIL
PORTFOLIO_OWNER_EMAIL=YOUR_GMAIL
```

**از رمز معمول Gmail استفاده نکن؛ App Password استفاده کن.**

بعد از تغییر `.env`:

```powershell
docker compose up -d --force-recreate backend
```

و یک پیام تست از Contact بفرست.

---

# 30) Upload عکس و PDF

Upload API این فرمت‌ها را قبول می‌کند:

```text
.png
.jpg
.jpeg
.webp
.gif
.pdf
```

حداکثر حجم هر فایل:

```text
10 MB
```

فایل‌ها در Volume رسانه Docker نگهداری می‌شوند.

`docker compose down` آن‌ها را نگه می‌دارد.

`docker compose down -v` آن‌ها را حذف می‌کند.

---

# 31) دیتابیس

در حالت Docker دیتابیس PostgreSQL است.

اطلاعات اصلی فعلی:

```text
Database: portfolio
User: portfolio
Service name: db
```

بهتر است Password دیتابیس قبل از Production تغییر کند.

---

# 32) گرفتن Backup از PostgreSQL

در ریشه پروژه:

```powershell
docker compose exec -T db pg_dump -U portfolio -d portfolio > portfolio_backup.sql
```

فایل:

```text
portfolio_backup.sql
```

را در جای امن نگه دار.

## Restore

قبل از Restore بهتر است از دیتابیس فعلی هم Backup بگیری.

سپس:

```powershell
Get-Content .\portfolio_backup.sql | docker compose exec -T db psql -U portfolio -d portfolio
```

اگر Restore روی دیتابیس غیرخالی Conflict داد، بهتر است ابتدا دیتابیس تازه ساخته شود یا Restore با برنامه مشخص انجام شود.

---

# 33) Backup از فایل‌های Upload

برای پروژه جدی، فقط دیتابیس کافی نیست؛ فایل‌های عکس و PDF هم باید Backup شوند.

یک روش ساده:

```powershell
docker compose exec backend tar -czf /tmp/portfolio_media_backup.tar.gz -C /app media
```

بعد ID کانتینر Backend را بگیر:

```powershell
docker compose ps -q backend
```

و فایل را با `docker cp` روی ویندوز کپی کن.

اگر سایت را روی سرور منتشر کردی، برای Media یک روش Backup زمان‌بندی‌شده در نظر بگیر.

---

# 34) مشاهده Logها

همه سرویس‌ها:

```powershell
docker compose logs -f
```

Backend:

```powershell
docker compose logs -f backend
```

Frontend:

```powershell
docker compose logs -f frontend
```

Database:

```powershell
docker compose logs -f db
```

آخرین 100 خط:

```powershell
docker compose logs --tail=100 backend
```

---

# 35) دستورات عیب‌یابی سریع

وضعیت Docker:

```powershell
docker info
```

وضعیت سرویس‌های پروژه:

```powershell
docker compose ps
```

Build مجدد Frontend:

```powershell
docker compose build frontend --no-cache
```

Build مجدد Backend:

```powershell
docker compose build backend --no-cache
```

Build کامل:

```powershell
docker compose build --no-cache
```

Restart:

```powershell
docker compose restart
```

Restart فقط backend:

```powershell
docker compose restart backend
```

---

# 36) اگر Frontend Build Error داد

معمولاً دنبال این بخش بگرد:

```text
error during build
```

و اولین File/Line واقعی را پیدا کن.

مثلاً قبلاً مشکل JSX در فایل با پسوند `.js` رخ داده بود. فایل فعلی صحیح:

```text
frontend/src/i18n.jsx
```

اگر JSX داخل یک فایل است، پسوند مناسب `.jsx` یا `.tsx` لازم است.

برای خروجی کامل Build:

```powershell
docker compose --progress plain build frontend --no-cache
```

---

# 37) اگر Backend Error داد

Log:

```powershell
docker compose logs -f backend
```

بررسی Django:

```powershell
docker compose exec backend python manage.py check
```

Migrationها:

```powershell
docker compose exec backend python manage.py showmigrations
```

اجرای Migration:

```powershell
docker compose exec backend python manage.py migrate
```

---

# 38) Django Shell

برای بررسی مستقیم دیتابیس:

```powershell
docker compose exec backend python manage.py shell
```

مثال:

```python
from portfolio.models import Project
Project.objects.count()
```

خروج:

```python
exit()
```

---

# 39) PostgreSQL Shell

```powershell
docker compose exec db psql -U portfolio -d portfolio
```

خروج:

```text
\q
```

---

# 40) Seed اولیه چه کاری می‌کند؟

در Startup بک‌اند این دستورات خودکار اجرا می‌شوند:

```text
migrate
create_initial_admin
seed_portfolio
collectstatic
Gunicorn
```

`seed_portfolio` فقط اگر Profile یا Skill اولیه وجود نداشته باشد آن‌ها را می‌سازد.

اطلاعاتی که خودت از پنل تغییر داده‌ای را هر بار Startup overwrite نمی‌کند.

---

# 41) تغییر اطلاعات اولیه در کد

Seed:

```text
backend/portfolio/management/commands/seed_portfolio.py
```

Admin اولیه:

```text
backend/portfolio/management/commands/create_initial_admin.py
```

با این حال برای تغییر اطلاعات روزمره بهتر است از Control Panel استفاده کنی، نه Seed.

---

# 42) فایل `.env`

این فایل بسیار مهم و خصوصی است.

شامل مواردی مثل:

- Django Secret Key
- Admin bootstrap username/password
- Database URL
- Email SMTP credentials
- Allowed Hosts
- CORS
- Debug

**هرگز `.env` را در GitHub عمومی Upload نکن.**

`.env.example` برای نمایش ساختار بدون Secret است.

---

# 43) Git و GitHub — روش پیشنهادی نگهداری پروژه

بعد از هر تغییر مهم Commit بزن.

وضعیت:

```powershell
git status
```

اضافه کردن فایل‌ها:

```powershell
git add .
```

Commit:

```powershell
git commit -m "Update portfolio projects"
```

Push:

```powershell
git push
```

## هرگز این‌ها را Commit نکن

```text
.env
LOCAL_ADMIN_CREDENTIALS.txt
Database backup files containing private data
Real SMTP passwords
```

قبل از اولین Push حتماً `.gitignore` را بررسی کن.

---

# 44) روش امن برای هر تغییر بزرگ

قبل از تغییر بزرگ:

1. از دیتابیس Backup بگیر.
2. Git Commit بزن.
3. تغییر را انجام بده.
4. Build کن.
5. تمام صفحات را تست کن.
6. Control Panel را تست کن.
7. Contact Form را تست کن.
8. Responsive موبایل را تست کن.
9. بعد Commit جدید بزن.

اگر چیزی خراب شد، Git بهت اجازه برگشت می‌دهد.

---

# 45) چک‌لیست بعد از اضافه کردن هر پروژه جدید

- [ ] عنوان انگلیسی کامل
- [ ] عنوان فارسی
- [ ] عنوان آلمانی
- [ ] Slug مناسب
- [ ] Short Description
- [ ] Full Description
- [ ] Problem
- [ ] Solution
- [ ] Challenges
- [ ] Tech Stack
- [ ] Features
- [ ] Screenshot/Cover
- [ ] GitHub URL
- [ ] Live Demo در صورت وجود
- [ ] Role
- [ ] Project Type
- [ ] Duration
- [ ] Published روشن
- [ ] Featured در صورت مهم بودن
- [ ] Order مناسب
- [ ] Repository README کامل

---

# 46) چک‌لیست قبل از انتشار عمومی سایت

## امنیت

- [ ] رمز Admin تغییر کرده
- [ ] `DJANGO_SECRET_KEY` جدید و قوی شده
- [ ] `DJANGO_DEBUG=0`
- [ ] `.env` عمومی نیست
- [ ] Credentials در GitHub نیست
- [ ] SMTP با App Password تنظیم شده
- [ ] HTTPS فعال است

## Domain

در `.env` دامنه واقعی را تنظیم کن:

```env
DJANGO_ALLOWED_HOSTS=example.com,www.example.com
CORS_ALLOWED_ORIGINS=https://example.com,https://www.example.com
CSRF_TRUSTED_ORIGINS=https://example.com,https://www.example.com
```

## محتوا

- [ ] GitHub کامل
- [ ] LinkedIn کامل
- [ ] Email صحیح
- [ ] Resume EN
- [ ] Resume DE
- [ ] Resume FA
- [ ] عکس پروفایل
- [ ] حداقل چند Project قوی
- [ ] Experience واقعی
- [ ] Skills واقعی
- [ ] دو Design Project واقعی در صورت تمایل

## تست

- [ ] Home
- [ ] Projects
- [ ] Project Detail
- [ ] About
- [ ] Skills
- [ ] Experience
- [ ] Design
- [ ] Blog
- [ ] Contact
- [ ] Resume
- [ ] EN
- [ ] DE
- [ ] FA + RTL
- [ ] Mobile
- [ ] Control Panel
- [ ] Login / Logout
- [ ] Upload
- [ ] Contact Messages

---

# 47) انتشار روی سرور — معماری پیشنهادی

برای نسخه واقعی، ساختار پیشنهادی:

```text
Domain
  ↓ HTTPS
Reverse Proxy / Server
  ↓
Docker Compose
  ├─ frontend (Nginx + React)
  ├─ backend (Django + Gunicorn)
  └─ PostgreSQL
```

برای Production:

- Database را با Password قوی اجرا کن.
- Volumeهای PostgreSQL و Media را Backup کن.
- HTTPS داشته باش.
- Secretها فقط در Environment Variables باشند.
- Port دیتابیس را مستقیم به اینترنت باز نکن.
- Django Admin و Control Panel را با رمز قوی محافظت کن.

وقتی Hosting/VPS/Domain مشخص شد، Deployment را براساس همان سرویس انجام بده؛ تنظیمات دقیق هر Provider متفاوت است.

---

# 48) تفاوت Control Panel و Django Admin

## Control Panel اختصاصی

برای استفاده روزمره طراحی شده:

- Projects
- Blog
- Skills
- Experience
- Education
- Design
- Messages
- Profile
- Settings

ظاهر حرفه‌ای و ساده‌تر دارد.

## Django Admin

برای کنترل سطح پایین‌تر دیتابیس مفید است.

آدرس:

```text
/django-admin/
```

اگر چیزی در Control Panel قابل مدیریت نبود، Django Admin ممکن است کمک کند.

برای کارهای روزمره اولویت با Control Panel است.

---

# 49) نکات فعلی نسخه V1 که باید یادت باشد

1. بعضی متن‌های ثابت صفحات هنوز مستقیم داخل JSX انگلیسی نوشته شده‌اند و از i18n نمی‌آیند. برای سه‌زبانه کامل 100٪ باید آن‌ها را هم به `i18n.jsx` منتقل کرد.
2. دکمه Download Resume روی Home فعلاً مستقیماً Resume انگلیسی را بررسی می‌کند. صفحه Resume هر سه فایل را دارد.
3. Resume Preview در نسخه فعلی بخش‌هایی ثابت دارد و یک PDF viewer واقعی نیست؛ لینک دانلود PDFها واقعی است.
4. Contact Map یک Visual است و نقشه زنده واقعی نیست.
5. Uploadها روی Media Volume محلی Docker ذخیره می‌شوند. برای Production حرفه‌ای می‌توان بعداً Object Storage/CDN اضافه کرد.
6. Blog Body در نسخه فعلی Text ساده است؛ اگر Markdown/Rich Text بخواهی باید Editor اضافه شود.
7. سیستم فعلی یک Admin User اصلی دارد، ولی Django قابلیت Userهای بیشتر را دارد.

این‌ها Bug حیاتی نیستند؛ نقاط توسعه نسخه‌های آینده هستند.

---

# 50) نقشه توسعه آینده پیشنهادی

هر زمان خواستی می‌توانی مرحله‌به‌مرحله این‌ها را اضافه کنی:

### V1.1
- تکمیل 100٪ ترجمه سه‌زبانه
- Resume button متناسب با زبان فعال
- Social icons کامل
- SEO metadata
- favicon / OpenGraph

### V1.2
- Markdown Blog Editor
- Gallery چندعکسی برای Project
- Project screenshots
- GitHub API integration
- Project status
- Better search/filter

### V1.3
- Analytics
- Contact spam protection / rate limiting
- Email templates
- Admin notifications
- Draft preview

### V2
- Automated deployment
- CI/CD GitHub Actions
- Cloud Storage برای Media
- Production PostgreSQL backup automation
- Automated tests
- Error monitoring

---

# 51) Cheat Sheet — دستورات مهمی که بیشتر از همه نیاز داری

## روشن کردن

```powershell
docker compose up -d
```

## اولین Build یا Build بعد از تغییرات بزرگ

```powershell
docker compose up -d --build
```

## وضعیت

```powershell
docker compose ps
```

## لاگ

```powershell
docker compose logs -f
```

## خاموش کردن

```powershell
docker compose down
```

## Build فقط React

```powershell
docker compose up -d --build frontend
```

## Build فقط Django

```powershell
docker compose up -d --build backend
```

## Django check

```powershell
docker compose exec backend python manage.py check
```

## Migration

```powershell
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

## Backup DB

```powershell
docker compose exec -T db pg_dump -U portfolio -d portfolio > portfolio_backup.sql
```

---

# 52) وقتی به ChatGPT می‌گویی سایت را اصلاح کند، چه چیزی بفرستی؟

برای اینکه اصلاح سریع و دقیق انجام شود، یکی از این‌ها را بده:

### تغییر ظاهری

بگو:

```text
در پروژه Elmira Portfolio در فایل/صفحه X این تغییر را می‌خواهم...
```

و اگر Screenshot داری بفرست.

### Error

این‌ها را بفرست:

```powershell
docker compose ps
docker compose logs --tail=150 frontend
docker compose logs --tail=150 backend
```

و Screenshot خطا.

### قابلیت جدید

مشخص کن:

```text
چه کسی استفاده می‌کند؟
چه اطلاعاتی ذخیره می‌شود؟
در کدام صفحه نمایش داده شود؟
در پنل Admin چه چیزهایی قابل ویرایش باشد؟
سه‌زبانه باشد یا نه؟
```

### تغییر پروژه موجود

اگر ZIP کامل آخرین نسخه را داری، همان ZIP را بفرست؛ این مطمئن‌ترین روش است چون نسخه‌ای که روی سیستم توست ممکن است از نسخه قدیمی متفاوت شده باشد.

---

# 53) قانون نسخه‌بندی شخصی پیشنهادی

هر بار تغییر بزرگ دادی یک Version داشته باش:

```text
v1.0  اولین نسخه کامل
v1.1  تکمیل محتوا و ترجمه
v1.2  SEO + Blog Improvements
v1.3  Project Gallery
v2.0  Deployment/Architecture upgrade
```

در Git می‌توانی Tag هم بزنی:

```powershell
git tag v1.0
git push origin v1.0
```

این کار باعث می‌شود همیشه بدانی کدام نسخه پایدار بوده.

---

# 54) قانون طلایی نگهداری سایت

سه چیز را همیشه جدا بدان:

### Content
از Control Panel تغییر بده.

### Design / Frontend behavior
در React/CSS تغییر بده.

### Data / API / Logic
در Django تغییر بده.

و قبل از هر تغییر بزرگ:

```text
Backup + Git Commit
```

بعد از هر تغییر:

```text
Build + Test + Commit
```

با رعایت همین چرخه، این Portfolio می‌تواند سال‌ها همراهت رشد کند بدون اینکه مجبور شوی هر بار از صفر یک سایت جدید بسازی.

---

## رفع خطای Upload failed در عکس پروفایل / رزومه / کاور پروژه

در این نسخه، Nginx برای آپلود تا 12MB تنظیم شده و خود Django حداکثر فایل 10MB را قبول می‌کند.
اگر فایل بزرگ‌تر از 10MB باشد، پنل پیام واضح نمایش می‌دهد.

فرمت‌های مجاز سمت بک‌اند:

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.gif`
- `.pdf`

بعد از هر تغییر در `frontend/nginx.conf` باید فرانت‌اند دوباره Build شود:

```powershell
docker compose up -d --build frontend
```

اگر Upload هنوز خطا داد، لاگ‌ها را بررسی کن:

```powershell
docker compose logs --tail=100 frontend
docker compose logs --tail=100 backend
```

نکته: برای آپلود فایل از پنل اختصاصی `/control/profile` استفاده کن. در Django Admin فیلد `avatar_url` یک URL است و برای مدیریت روزمره سایت، پنل اختصاصی گزینه مناسب‌تری است.
