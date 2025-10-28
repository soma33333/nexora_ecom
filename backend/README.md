# Nexora Mock E-Com - Backend

## Requirements
- Node 18+ (or compatible)
- MongoDB cluster (MongoDB Atlas) or local MongoDB
- `npm install`

## Setup
1. Copy `.env.example` to `.env` and set `MONGO_URI` and `PORT` if needed.
2. Install:
npm install

3. Seed products:


npm run seed

This will populate the `products` collection with 5 sample items.

4. Start server (development):


npm run dev

or production:


npm start


## API Endpoints
- `GET /api/products` - returns array of products
- `GET /api/cart` - returns `{ items: [...], total }`
- `POST /api/cart` - body `{ productId, qty }` - adds/updates cart item
- `DELETE /api/cart/:id` - remove cart item by cart item id (or by product id)
- `POST /api/checkout` - body `{ name, email, cartItems? }` - returns mock receipt and clears cart

## Notes
- Cart is stored in `cartitems` collection with schema referencing `Product`. To add per-user carts, add `userId` to `CartItem` and adapt queries.
- For production, tighten CORS origins and secure `.env`.