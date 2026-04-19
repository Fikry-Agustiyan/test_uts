# Dokumentasi API (EchoAPI)

Dokumentasi ini berisi daftar endpoint beserta konfigurasi URL, Method, Header, dan Body untuk pengujian menggunakan EchoAPI.

**Base URL**: `http://localhost:5000/` _(sesuaikan dengan port/konfigurasi Anda)_
**Global Header (untuk POST/PUT)**: `Content-Type: application/json`

---

## 1. Users (`/users`)

| Deskripsi       | Method   | URL                             | Body (JSON)                                                                         |
| --------------- | -------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Get All Users   | `GET`    | `api/users`                     | -                                                                                   |
| Create User     | `POST`   | `api/users`                     | `{ "name": "John Doe", "email": "john@email.com", "password": "password123" }`      |
| Get User Detail | `GET`    | `api/users/:id`                 | -                                                                                   |
| Update User     | `PUT`    | `api/users/:id`                 | `{ "name": "John Doe Edit", "email": "john.edit@email.com" }`                       |
| Change Password | `PUT`    | `api/users/:id/change-password` | `{ "oldPassword": "old123", "newPassword": "new123", "confirmPassword": "new123" }` |
| Delete User     | `DELETE` | `api/users/:id`                 | -                                                                                   |

---

## 2. Tickets (`/tickets`)

| Deskripsi         | Method   | URL               | Body (JSON)                                                          |
| ----------------- | -------- | ----------------- | -------------------------------------------------------------------- |
| Get All Tickets   | `GET`    | `api/tickets`     | -                                                                    |
| Create Ticket     | `POST`   | `api/tickets`     | `{ "title": "Error Login", "description": "Gagal login di page X" }` |
| Get Ticket Detail | `GET`    | `api/tickets/:id` | -                                                                    |
| Update Ticket     | `PUT`    | `api/tickets/:id` | `{ "title": "Error Login Edit", "status": "resolved" }`              |
| Delete Ticket     | `DELETE` | `api/tickets/:id` | -                                                                    |

---

## 3. Comments (`/comments`)

| Deskripsi              | Method   | URL                             | Body (JSON)                                                          |
| ---------------------- | -------- | ------------------------------- | -------------------------------------------------------------------- |
| Get Comments by Ticket | `GET`    | `api/comments/ticket/:ticketId` | -                                                                    |
| Create Comment         | `POST`   | `api/comments`                  | `{ "ticketId": "ID_TICKET", "text": "Pengecekan sedang dilakukan" }` |
| Update Comment         | `PUT`    | `api/comments/:id`              | `{ "text": "Pengecekan sudah selesai" }`                             |
| Delete Comment         | `DELETE` | `api/comments/:id`              | -                                                                    |

---

## 4. History (`/history`)

| Deskripsi             | Method | URL                            | Body (JSON)                                                           |
| --------------------- | ------ | ------------------------------ | --------------------------------------------------------------------- |
| Get History by Ticket | `GET`  | `api/history/ticket/:ticketId` | -                                                                     |
| Create History        | `POST` | `api/history`                  | `{ "ticketId": "ID_TICKET", "action": "Status changed to resolved" }` |

---

## 5. Dashboard (`/dashboard`)

| Deskripsi   | Method | URL                     | Body (JSON) |
| ----------- | ------ | ----------------------- | ----------- |
| Get Summary | `GET`  | `api/dashboard/summary` | -           |

---

### Cara Import/Test Cepat di EchoAPI:

1. Buat **New Request** di EchoAPI.
2. Pilih **Method** sesuai tabel.
3. Masukkan **URL** dan ubah parameter `:id` atau `:ticketId` dengan ID asli dari database.
4. Jika Method POST/PUT, masuk ke tab **Body**, pilih **raw** dan tipe **JSON**.
5. Salin data dari kolom Body di atas dan tekan **Send**.
