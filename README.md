# School Management System (SMS)

A comprehensive, full-stack School Management System designed for educational institutions. This system provides a robust backend API, a modern management portal for staff/admins, and a public-facing website for the school.

## 🚀 Project Overview

This project is a monorepo containing three main components:
1.  **Backend API**: A Node.js/Express server using Prisma ORM to manage school data.
2.  **Management Portal**: A React/Vite/TypeScript application for administrative tasks.
3.  **Public Website**: A static/dynamic website for the school's public presence.

### Key Features
-   **Student & Teacher Management**: Detailed profiles, academic history, and employment records.
-   **Attendance Tracking**: Daily attendance logs for students.
-   **Academic Management**: Grades, exams, homework assignments, and class schedules.
-   **Financials**: Fee collection, receipt generation, and staff salary management.
-   **Communication**: Notices, calendar events, and contact messages.
-   **Administrative Tools**: Leave requests, student promotions, and gallery management.

## 🛠️ Tech Stack

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **ORM**: Prisma
-   **Database**: PostgreSQL

### Management Portal
-   **Framework**: React 19
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Custom CSS (PRD-based)
-   **Icons**: Lucide React
-   **Animations**: Framer Motion

### Public Website
-   **Structure**: HTML5
-   **Styling**: CSS3 / Bootstrap
-   **Scripts**: JavaScript / jQuery

## 📂 Project Structure

```text
/
├── backend/                # Express API & Prisma schema
├── management-portal/      # React Admin Portal
├── school-website/         # Public School Website
├── demo/                   # Demo version of the website
├── deploy.sh               # Raspberry Pi deployment script
└── package.json            # Root workspace configuration
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   npm or yarn
-   PostgreSQL database

### Steps

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd sms-school
    ```

2.  **Install dependencies**:
    From the root directory:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=3001
    DATABASE_URL="postgresql://user:password@localhost:5432/school_db"
    ```

4.  **Database Setup**:
    ```bash
    cd backend
    npx prisma generate
    npx prisma db push
    ```

5.  **Run in Development**:
    From the root directory:
    ```bash
    npm run dev
    ```
    -   API: [http://localhost:3001/api](http://localhost:3001/api)
    -   Portal: [http://localhost:3001/portal](http://localhost:3001/portal)
    -   Website: [http://localhost:3001](http://localhost:3001)

## 🚢 Deployment

The project includes a `deploy.sh` script optimized for Raspberry Pi or Linux servers using PM2.

1.  Ensure PM2 is installed: `npm install -g pm2`
2.  Run the deployment script:
    ```bash
    chmod +x deploy.sh
    ./deploy.sh
    ```

### Manual Build
```bash
npm run build
npm start
```

## 📄 License

This project is private and intended for specific institutional use.
