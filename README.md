# Evolutiongifts

This is an e-commerce apllication that features a studio with Next.js frontend.

It uses the [Next.js toolkit for Sanity.io](https://github.com/sanity-io/next-sanity).

**Features:**
* Live previews, including website preview for products
* Cart
* auth
[ ] Search,filter
[ ] Promocode  
[ ] Checkoout
## Getting started

The quickest way to get up and running is to go to https://www.sanity.io/create?template=sanity-io%2Fsanity-template-nextjs-ecommerce and create a new project by following the instructions there.

## Enabling live preview

You can append `?preview` to the landing pages, product pages,categories pages and the products overview to enable preview mode when you are logged into your Sanity project. For example:

`https://<your-project>.vercel.app/products/roji?preview`

You can find the code for the in-studio preview over in `/studio/src/components/product`.

## Running Locally

To run locally,add your project ID to `.env`  from [manage.sanity.io](https://manage.sanity.io).

If you have already set up deployments on Vercel, you can also do `vercel env pull` to copy environment variables to your development environment.

NOTE: If your Vercel project is set up to use the Next.js framework preset, you'll have to go to the project settings under https://vercel.com and under Build & Develpment change the _development command_ to: `npm run dev`

To start the development server:
```bash
npm start
```
This will run the frontend at http://localhost:3000 and the Sanity Studio at http://localhost:3000/studio

To start the frondtend only
```bash
next dev
```
This will run the frontend at http://localhost:3000 
- redux toolkit

## Tech stack
- Next.js
- Vercel
- Sanity
- firebase
- tailwind