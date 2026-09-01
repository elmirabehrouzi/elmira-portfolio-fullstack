# Elmira Behrouzi — Full‑Stack Portfolio

A three-language, expandable developer portfolio built with **React + Vite** on the frontend and **Django + Django REST Framework** on the backend. It includes a custom private control panel, JWT login, project/blog/design/skill/experience management, a contact inbox, PostgreSQL support, and Docker.

## What is included

- Public pages: Home, Projects, Project Detail, About, Skills, Experience, Design, Lab/Blog, Contact, Resume.
- Languages: English, German, Persian with RTL support for Persian.
- Django REST API with JWT authentication.
- Private React control panel at `/control/login`.
- CRUD management for programming projects, skills, work experience, education, design projects and blog posts.
- Site-profile editor for contact information, bio, social links, avatar URL and three resume URLs.
- Contact form messages are stored in Django and displayed in the custom Inbox.
- Optional email notification when a contact message arrives (configure SMTP in `.env`).
- Django Admin is also available on the backend at `/django-admin/`.
- Docker Compose with PostgreSQL for a production-like local environment.

## Quick start — Docker (recommended)

1. Install Docker Desktop.
2. Open a terminal in this folder.
3. Run:

```bash
docker compose up --build
```

4. Website: `http://localhost:3000`
5. Control panel: `http://localhost:3000/control/login`

The backend automatically runs migrations, creates the initial admin user and seeds Elmira's profile plus known skills.

### Initial admin

See `LOCAL_ADMIN_CREDENTIALS.txt`. Change the password before a public deployment.

## Local development without Docker

### Backend

Use Python 3.11+ (3.12 recommended).

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

For local SQLite, either remove `DATABASE_URL` from the root `.env` temporarily or set:

```env
DATABASE_URL=sqlite:///backend/db.sqlite3
```

Then:

```bash
python manage.py migrate
python manage.py create_initial_admin
python manage.py seed_portfolio
python manage.py runserver 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Contact messages

Every form submission is stored in the `ContactMessage` model. In the custom panel you can read, archive, delete and reply via your mail client. If SMTP variables are configured, Django also emails an alert to `PORTFOLIO_OWNER_EMAIL`.

For Gmail, use an **App Password** rather than your normal account password and configure the SMTP environment variables. Do not put email passwords in GitHub.

## Adding projects

Open **Control Panel → Projects → Add new**. Each project supports:

- English / Persian / German title and copy
- category
- tech stack
- features
- GitHub URL
- live demo URL
- cover image URL
- problem / solution / technical challenges
- featured / published states
- ordering

This lets the portfolio grow without editing React code every time you build something new.

## Production checklist

Before publishing:

1. Change `DJANGO_SECRET_KEY`.
2. Change the initial admin password.
3. Set `DJANGO_DEBUG=0`.
4. Set your actual domain in `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS`.
5. Use PostgreSQL.
6. Configure HTTPS.
7. Configure SMTP if you want email alerts.
8. Add GitHub / LinkedIn / resume URLs in the control panel.
9. Back up the PostgreSQL database.

## Architecture

```text
Browser
  ↓
React / Vite
  ↓ REST + JWT
Django REST Framework
  ↓
PostgreSQL
  ├─ Projects
  ├─ Skills
  ├─ Experience / Education
  ├─ Design projects
  ├─ Blog posts
  └─ Contact inbox
```

## Security notes

The included credentials are only an initial local/deployment bootstrap. `.env` is gitignored. For a public repository, never commit `.env` or `LOCAL_ADMIN_CREDENTIALS.txt`.
