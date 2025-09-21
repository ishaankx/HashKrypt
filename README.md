# HashKrypt

[Live Demo](https://hash-krypt.vercel.app) · [Repository](https://github.com/ishaankx/HashKrypt)

---

## 🚀 Overview

**HashKrypt** is a zero-knowledge file encryption and sharing platform.  
It allows users to **encrypt any file** (video, audio, image, text, etc.) with AES-256, share encrypted files securely, and decrypt them — all while giving the user **full control over their keys**.  

The **server never has access** to your unencrypted files or private keys.  

---

## 🔐 Key Features

- **Zero-knowledge key model**: The server stores only encrypted key blobs and public keys. Private keys and personal vault keys are generated client-side and never leave the user’s control.
- **Personal Key & Key Vault**: On first signup, a **personal key** is generated. This personal key unlocks the key vault, where both personal encryption keys and shared keys are stored.
- **File Encryption (AES-256)**: Encrypt files locally in the browser/client before uploading.
- **File Sharing**:
  - **Share via HashKrypt**: with another registered user. Data Encryption Key (DEK) is wrapped with the recipient’s public key.
  - **Share manually**: download encrypted file + key locally and send by any medium. Recipient can decrypt manually.
- **Decrypt Files**:
  - Decrypt your own files using your vault keys.
  - Decrypt files shared with you after unlocking your vault.
  - Manual decryption supported if file + key are received locally.
- **Wide File Type Support**: Works for video, audio, images (PNG, JPEG, etc.), text, and more.
- **Secure Auth & Hosting**: Backend hosted on **Railway (PostgreSQL)**, frontend deployed via **Vercel**.

---

## 🛠 Tech Stack

| Layer              | Technology |
|--------------------|------------|
| **Frontend**       | Next.js, TypeScript, Tailwind CSS, WebCrypto/libsodium |
| **Backend**        | NestJS, TypeScript, Prisma, PostgreSQL |
| **Auth / Security**| Argon2 for password hashing, asymmetric key pairs (X25519 / Ed25519), encrypted key blobs |
| **Hosting / Infra**| Railway (Postgres + backend), Vercel (frontend) |
| **Supporting**     | Redis (cache/sessions/rate-limiting), BullMQ (background/email jobs) |

---

## ⚙️ How It Works

1. **Signup / Key Setup**  
   - User signs up with email + password.  
   - Client generates a personal key + asymmetric keypair.  
   - Private key is encrypted client-side (with KDF from personal key) and uploaded as an encrypted blob.  
   - Server stores only **encrypted blob + public key**.

2. **Encrypt & Upload File**  
   - File encrypted locally with AES-256.  
   - Encrypted file uploaded to storage (via secure upload endpoint).  
   - Metadata (IV, tag, size, mimetype) tracked by server.

3. **Share File**  
   - To share: DEK wrapped with recipient’s public key client-side.  
   - Server stores this wrapped DEK as a **share record**.  
   - Recipient sees file in their “Decrypt” section.

4. **Decrypt File**  
   - Recipient unlocks vault with their personal key.  
   - Unwraps DEK with private key.  
   - Decrypts the file locally in browser.  
   - Manual mode: upload encrypted file + enter provided key.

---

## 📥 Getting Started

### Prerequisites

- Node.js (v16 or later recommended)  
- npm  
- Git  

### Local Setup

```bash
# Clone the repo
git clone https://github.com/ishaankx/HashKrypt.git
cd HashKrypt

# Install dependencies for client
cd client
npm install

# Install dependencies for server
cd ../server
npm install

# Create .env file in server with:
# DATABASE_URL=postgres://user:password@host:port/db
# PORT=4000
# JWT_SECRET=your-secret-key
# REDIS_URL=...

# Terminal 1 - Run backend
cd server
npm run dev

# Terminal 2 - Run frontend
cd client
npm run dev

/
├── client/             # Next.js frontend
│    ├── pages/         # frontend pages
│    ├── components/    # UI components
│    ├── crypto/        # encryption/decryption logic
│    └── styles/        # Tailwind CSS styles
└── server/             # NestJS backend
     ├── modules/       # feature modules
     ├── controllers/   # API controllers
     ├── services/      # business logic
     ├── prisma/        # Prisma schema + migrations
     └── utils/         # helper utilities

## 📐 System Architecture

```text
+-------------------+         +-------------------+
|                   |         |                   |
|      Client       |         |      Server       |
|  (Next.js, Crypto)|         |   (NestJS + DB)   |
|                   |         |                   |
+---------+---------+         +---------+---------+
          |                             |
          | 1. Signup/Login             |
          |---------------------------->|
          | (Email + Password)          |
          |                             |
          | 2. Generate Personal Key    |
          | + Asymmetric Keypair        |
          |                             |
          | 3. Encrypt Private Key blob |
          | (with Personal Key via KDF) |
          |---------------------------->|
          |                             | Stores only:
          |                             | - EncryptedPrivateKeyBlob
          |                             | - PublicKey
          |                             |
          | 4. Encrypt File (AES-256)   |
          | Locally                     |
          |                             |
          | 5. Upload Encrypted Blob    |
          |---------------------------->|
          |                             | Metadata → PostgreSQL
          |                             |
          | 6. Share DEK → Wrap with    |
          | Recipient's Public Key      |
          |---------------------------->|
          |                             | Stores Wrapped DEK
          |                             |
          | 7. Recipient Unlocks Vault  |
          | (using Personal Key)        |
          |                             |
          | 8. Retrieve Wrapped DEK     |
          |<----------------------------|
          | 9. Unwrap DEK with Private  |
          | Key → Decrypt File Locally  |
          |                             |
