# 🛒 E-commerce App - Nova

## Përshkrimi i projektit

Ky është një projekt i-commerce modern i ndërtuar me **Next.js**, **Sanity CMS** për menaxhimin e produkteve, **Clerk** për autentifikimin e përdoruesve dhe **Stripe** për pagesat online.  
Përdoruesit mund të shfletojnë produktet, të krijojnë llogari, të shtojnë artikuj në shportë dhe të kryejnë porosi në mënyrë të thjeshtë dhe të sigurt.

---

## Demo Live

https://github.com/user-attachments/assets/f2c5828b-34a1-4643-b951-ce6aa8aa0712

---

## Teknologjitë e përdorura

- **Next.js 14** — Framework React për rendering server-side dhe klient
- **Sanity CMS** — Menaxhimi i produkteve dhe përmbajtjes
- **Clerk** — Autentifikimi dhe menaxhimi i përdoruesve
- **Stripe** — Platforma për pagesa online
- **Tailwind CSS** — Stilimi dhe dizajni i komponentëve
- **Context API** — Menaxhimi i gjendjes së shportës

---

## Funksionalitetet kryesore

- Regjistrim, login dhe menaxhim i përdoruesve me Clerk
- Shfaqja e kategorive dhe produkteve nga Sanity CMS
- Shtim dhe heqje artikujsh në shportë me Context API
- Checkout i sigurt me Stripe
- Faqja për shikimin e porosive të përdoruesit
- Përdorim i hooks dhe server components të Next.js për performancë të lartë

---

## Udhëzime për instalim dhe zhvillim lokal

1. Klono repo-në:
   ```bash
   git clone https://github.com/blendaabazi/E-commerce.git
   cd client

2. Instaloni varësitë
npm install

3. Krijo skedarin .env.local dhe shto variablat e nevojshme (shembull më poshtë):

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SANITY_PROJECT_ID=hegywgxb
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=sk_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

4. Nisi serverin lokal:
npm run dev

5. Hap http://localhost:3000 në shfletues.

Antaret e grupit

-Altina Abazi
-Blenda Abazi
-Vlerone Mehmeti

