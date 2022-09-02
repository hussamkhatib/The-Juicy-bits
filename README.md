# The Juicy bits.

![products-page](https://user-images.githubusercontent.com/52914487/187914464-80b1883e-6472-4755-8c21-fed468518bc2.png)

This is an e-commerce application that features a studio with Next.js frontend.

It uses the [Next.js toolkit for Sanity.io](https://github.com/sanity-io/next-sanity).

## Running Locally

To run locally,add your project ID to `.env` from [manage.sanity.io](https://manage.sanity.io).

If you have already set up deployments on Vercel, you can also do `vercel env pull` to copy environment variables to your development environment.

NOTE: If your Vercel project is set up to use the Next.js framework preset, you'll have to go to the project settings under https://vercel.com and under Build & Develpment change the _development command_ to: `npm run dev`

To start the development server:

```bash
yarn dev
```

This will run the frontend at http://localhost:3000

```bash
yarn studio
```

This will run Sanity Studio at http://localhost:3000/studio

## Tech stack

- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vercel](https://vercel.com/)
- [Sanity.io](https://www.sanity.io/)
- [Firebase](https://firebase.google.com/)
- [Tailwind](https://tailwindcss.com/)
