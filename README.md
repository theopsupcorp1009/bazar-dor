# 🛒 Bazar Dor

A Bengali-language daily market price tracker built with **Next.js** and **Tailwind CSS**. It shows today's prices for rice, lentils, oil, vegetables, fish, meat, eggs, and spices, highlights what went up or down since yesterday, and breaks prices down by market. Includes user authentication with Google and GitHub sign-in.

🔗 **Live App:** [bazar-dor-puce.vercel.app](https://bazar-dor-puce.vercel.app)
📦 **Repository:** [theopsupcorp1009/bazar-dor](https://github.com/theopsupcorp1009/bazar-dor)

---

## ✨ Features

- **Daily price overview** with a hero banner showing the current date and a quick link to all products
- **Price movement sections** for items whose price went up ("আজ দাম বেড়েছে") and went down ("আজ দাম কমেছে") compared to yesterday
- **All products listing** with sorting by default order, price low to high, or price high to low
- **Category pages** (`/category/[categoryId]`) with category icons, product counts, and the same sorting options
- **Product detail pages** (`/products/[productId]`) showing:
  - Today's price, unit, and percentage change since yesterday
  - Price summary with lowest, highest, and average prices
  - Market-by-market price ranges
- **Live price ticker** (marquee) of products with prices and change indicators, linking to each product
- **Authentication** via [better-auth](https://www.better-auth.com/):
  - Email and password sign-up / sign-in
  - Google and GitHub OAuth sign-in
- **Protected routes**: `/profile`, `/profile/update`, `/products/*`, and `/category/*` require a signed-in session, with a redirect back to the original page after login
- **User profile** page and **profile update** page (change name and photo)
- Fully Bengali interface with Bengali numerals and unit names
- Responsive layout with a dedicated mobile header
- Custom loading states and 404 page

---

## 🖥️ Tech Stack

| Layer            | Technology                                         |
|------------------|-----------------------------------------------------|
| Framework        | [Next.js](https://nextjs.org/) 16 (App Router)      |
| Language         | JavaScript (React 19 with React Compiler)           |
| Styling          | Tailwind CSS v4, daisyUI                            |
| Authentication   | better-auth + `@better-auth/mongo-adapter`          |
| Database         | MongoDB                                             |
| Icons            | react-icons                                         |
| Notifications    | react-toastify                                      |
| Ticker           | react-marquee-text                                  |
| Data Source      | External REST API (products and categories)         |
| Deployment       | Vercel                                              |

---

## 📂 Project Structure

```
bazar-dor/
├── public/
│   └── assets/                          # Hero image, logo icon, default avatar
├── src/
│   ├── app/
│   │   ├── page.js                      # Home page (banner + price updates)
│   │   ├── layout.js                    # Root layout
│   │   ├── loading.jsx / not-found.jsx
│   │   ├── category/
│   │   │   ├── CategorySection.jsx      # Category product listing
│   │   │   └── [categoryId]/page.jsx    # Category page
│   │   ├── products/
│   │   │   └── [productId]/page.jsx     # Product details page
│   │   ├── sign-in/page.jsx             # Sign-in page
│   │   ├── sign-up/page.jsx             # Sign-up page
│   │   ├── profile/
│   │   │   ├── page.jsx                 # User profile
│   │   │   └── update/page.jsx          # Update profile
│   │   ├── components/
│   │   │   ├── Header.jsx / MobileHeader.jsx / Navlinks.jsx
│   │   │   ├── Banner.jsx / CurrentDate.jsx
│   │   │   ├── PriceUpdate.jsx          # Price up / down / all products
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SortedProducts.jsx       # Sorting controls and grid
│   │   │   ├── Marquee.jsx              # Scrolling price ticker
│   │   │   ├── UserInfo.jsx
│   │   │   └── Footer.jsx
│   │   └── api/auth/[...all]/route.js   # better-auth API route handler
│   ├── lib/
│   │   ├── auth.js                      # better-auth server config
│   │   └── auth-client.js               # better-auth client hooks
│   └── proxy.js                         # Auth-gated route middleware
├── .env                                 # Environment variables (never commit)
├── package.json
├── next.config.mjs
└── jsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (recommended: latest LTS)
- npm (or yarn / pnpm / bun)
- A MongoDB database (for authentication)
- Google and GitHub OAuth app credentials
- A running products and categories REST API

### Installation

```bash
# Clone the repository
git clone https://github.com/theopsupcorp1009/bazar-dor.git
cd bazar-dor

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with:

```env
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
DATA_API_URL=your_products_api_base_url
```

`DATA_API_URL` must expose these endpoints:

| Endpoint                         | Purpose                          |
|----------------------------------|----------------------------------|
| `GET /products`                  | List all products                |
| `GET /products/:id`              | Single product with market data  |
| `GET /products?category=<slug>`  | Products filtered by category    |
| `GET /categories`                | List of categories               |

> Keep `.env` out of version control and never share real secrets publicly.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## 🎛️ How to Use

1. Open the **Home** page to see today's price increases, decreases, and the full product list.
2. Use the **sort dropdown** to order products by price.
3. Pick a **category** from the navigation bar to see only those products.
4. **Sign up** with email and password, or continue with **Google** or **GitHub**.
5. Once signed in, open any **product** to see its price summary and market-by-market prices.
6. Visit your **Profile** to view your account, or **Update Profile** to change your name and photo.

---

## 🌐 Deployment

This app is deployed on **Vercel**. Any push to the connected branch triggers an automatic build and deployment.

To deploy your own copy:

1. Push this repository to your GitHub account.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add all the environment variables listed above in the Vercel project settings.
4. Update `BETTER_AUTH_URL` and the OAuth callback URLs to your production domain.
5. Vercel auto-detects the Next.js framework, so no extra configuration is needed.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- Authentication powered by [better-auth](https://www.better-auth.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/) and [daisyUI](https://daisyui.com/)
- Hosted on [Vercel](https://vercel.com/)

---

## 📝 Project Summary

**Bazar Dor** is a full-stack Bengali market price tracker that helps people see today's essential grocery prices at a glance. Built on the Next.js App Router with React 19 and the React Compiler, it fetches product and category data from an external REST API on the server and presents it through a responsive, fully Bengali interface with a live price ticker, price increase and decrease highlights, sortable product grids, and detailed product pages with lowest, highest, and average prices across markets. Authentication is handled by better-auth with a MongoDB adapter, supporting email and password plus Google and GitHub OAuth, while route-level middleware protects product, category, and profile pages and returns users to where they left off after signing in. The project demonstrates practical experience with server-side data fetching, dynamic routing, localization with Bengali numerals, full authentication flows, and modern utility-first UI design, all deployed on Vercel.
