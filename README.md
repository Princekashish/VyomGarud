# VyomGarud – UAV Systems Website + Blog Platform

**VyomGarud** This project is a full-stack monolithic platform combining a high-performance Next.js frontend with a Strapi headless CMS backend

---

## ✨ Features (Planned & In Progress)

#### Full Blog Management (Strapi Admin)

- [x] Create / Edit / Delete blog posts using Strapi admin panel **Secure API fetching**
- [x] Upload images
- [x] Rich text content with image and **multi text supports**

#### Public Facing Blog (Next.js)

- [x] Grid-based blog previews
- [x] Animated category sections
- [x] Animation on scroll (Framer Motion)
- [x] SEO-friendly URLs 

```bash
/blog
/blog/sensors
/blog/sensors/real-time-sensor-fusion

```

---

## 🛠️ Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Strapi CMS (Backend)

---

## 🚀 Local Development Setup

### Prerequisites

Before setting up VyomGarud locally, make sure you have the following installed:

- **Node.js** (v20 or later) - [Download here](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm` or [follow the official guide](https://pnpm.io/installation)
- **Git** - [Download here](https://git-scm.com/)


### 0. File structure 
```bash
app/
 ├── blog/
 │    ├── page.tsx
 │    ├── [categories]/
 │    │        └── page.tsx
 │    └── [categories]/[slug]/
 │             └── page.tsx
components/

```

### 1. Clone the Repository

```bash
git clone https://github.com/Princekashish/VyomGarud
cd VyomGarud
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy the `.env.example` file to `.env` and fill in the values:

```bash
cp .env.example .env
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see VyomGarud running locally! 🎉

### 5. Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server


<div align="center">
  <sub>Built with ❤️ by <a href="https://pricekashish.tech">Prince kashish</a></sub>
</div>