# Campus Service Ticketing System — Backend REST API

## Tech Stack

Node.js · Express.js · MongoDB + Mongoose

---

## Cara Menjalankan

### 1. Install dependensi

```bash
npm install
```

### 2. Konfigurasi environment

Buat file `.env` di root proyek:

### 3. Jalankan server

```bash
# Development (dengan nodemon)
npm run dev

# Production
npm start
```

### 4. Jalankan seeder (opsional, idempotent)

```bash
node seeder.js
```

Seeder akan membuat akun berikut jika belum ada:

| Role  | Email              | Password   |
| ----- | ------------------ | ---------- |
| admin | admin@campus.ac.id | Admin1234! |
| staff | staff@campus.ac.id | Staff1234! |
| user  | budi@campus.ac.id  | User1234!  |
| user  | ani@campus.ac.id   | User1234!  |

---

## Endpoint List

### Auth

| Method | Path           | Akses  | Deskripsi             |
| ------ | -------------- | ------ | --------------------- |
| POST   | /auth/register | Public | Registrasi akun baru  |
| POST   | /auth/login    | Public | Login, mendapat token |

### Tickets

| Method | Path         | Akses            | Deskripsi                                              |
| ------ | ------------ | ---------------- | ------------------------------------------------------ |
| POST   | /tickets     | user/staff/admin | Buat tiket baru (priority dihitung otomatis)           |
| GET    | /tickets     | user/staff/admin | Daftar tiket (user: milik sendiri; staff/admin: semua) |
| GET    | /tickets/:id | user/staff/admin | Detail tiket                                           |
| PATCH  | /tickets/:id | user/staff/admin | Update tiket (field berbeda per role)                  |
| DELETE | /tickets/:id | user/admin       | Hapus tiket                                            |

**Query params GET /tickets:** `page`, `limit`, `status`, `category`, `priority`

**Field PATCH per role:**

- `user` → `title`, `description`, `location` (hanya jika status `open` atau `waiting_user`)
- `staff`/`admin` → semua field + `status`, `priority`, `assignedTo`

### Comments

| Method | Path                                   | Akses               | Deskripsi            |
| ------ | -------------------------------------- | ------------------- | -------------------- |
| POST   | /tickets/:ticketId/comments            | user/staff/admin    | Tambah komentar      |
| GET    | /tickets/:ticketId/comments            | user/staff/admin    | Lihat semua komentar |
| DELETE | /tickets/:ticketId/comments/:commentId | pemilik/staff/admin | Hapus komentar       |

### History

| Method | Path                       | Akses            | Deskripsi           |
| ------ | -------------------------- | ---------------- | ------------------- |
| GET    | /tickets/:ticketId/history | user/staff/admin | Log perubahan tiket |

### Meta

| Method | Path        | Akses            | Deskripsi                    |
| ------ | ----------- | ---------------- | ---------------------------- |
| GET    | /meta/enums | user/staff/admin | Daftar nilai enum yang valid |

### Dashboard

| Method | Path             | Akses       | Deskripsi                                    |
| ------ | ---------------- | ----------- | -------------------------------------------- |
| GET    | /dashboard/stats | staff/admin | Agregasi tiket per status/kategori/prioritas |

---

## Auto-Priority Logic

| Category | Priority |
| -------- | -------- |
| network  | high     |
| hardware | medium   |
| software | medium   |
| facility | low      |

---

## Struktur Proyek

```
src/
  api/
    components/
      auth/         # auth-controller, service, repository, route
      tickets/      # tickets-controller, service, repository, route
      comments/     # comments-controller, service, repository, route
      history/      # history-controller, route
      meta/         # meta-controller, route
      dashboard/    # dashboard-controller, repository, route
    middlewares/
      authentication.js
      role-checker.js
      index.js
    routes.js
  core/             # config, errors, logger, server
  models/           # users, tickets, comments, history schemas + index
  utils/            # password helper
  index.js
seeder.js
README.md
```
