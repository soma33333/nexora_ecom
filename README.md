# nexora_ecom

# 🛍️ Nexora Mock E-Com

A **MERN stack (MongoDB, Express.js, React.js, Node.js)** e-commerce web application with user authentication, product management, and a simple mock checkout system.

---

## 🚀 Features
- ✅ User Registration & Login (JWT-based)
- ✅ Protected Checkout (only logged-in users can place orders)
- ✅ Persistent Cart (MongoDB)
- ✅ Mock Payment & Receipt Generation
- ✅ Notifications for user actions
- ✅ Responsive UI built with React Context API

---

## 🗂️ Folder Structure

nexora-ecom/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── server.js
│ ├── seed/
│ └── .env
└── frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── styles/
│ └── App.jsx
├── package.json
└── vite.config.js


---

## 🧠 Tech Stack

**Frontend:** React.js (Vite), Context API, CSS  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT (JSON Web Token)  
**Database:** MongoDB Atlas

---

## ⚙️ Backend Setup

### Requirements
- Node.js v18+
- MongoDB ( Atlas)

### Setup Instructions

```bash
cd backend
cp .env.example .env
npm install
.env example:
ini
Copy code
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecom
JWT_SECRET=your_jwt_secret
Seed Sample Products
bash
Copy code
npm run seed
This command inserts 5 sample products into the MongoDB products collection.

Run Server
Development mode:

bash
Copy code
npm run dev
Production mode:

bash
Copy code
npm start
🧩 API Endpoints
Method	Endpoint	Description
GET	/api/products	Fetch all products
GET	/api/cart	Get current user’s cart
POST	/api/cart	Add/update cart item ({ productId, qty })
DELETE	/api/cart/:id	Remove item from cart
POST	/api/checkout	Checkout for logged-in user
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user and get JWT token

🖥️ Frontend Setup
Steps
bash
Copy code
cd frontend
npm install
npm run dev
Open in browser:
👉 http://localhost:5173

🔐 Authentication Flow
Register via /register — creates user & returns JWT

Login via /login — retrieves user info & token

Logout — clears local storage and resets AuthContext

Protected Checkout — accessible only to logged-in users

Checkout form auto-fills user’s name and email

🧾 Example User Flow
Register → Auto-login

Browse products → Add items to cart

Go to cart → Click Checkout

If logged in → Mock payment receipt shown

If not logged in → Redirects to login page

🔧 Scripts Summary
Command	Description
npm run dev	Run backend in development
npm start	Run backend in production
npm run seed	Populate MongoDB with sample products
npm run client	Run frontend
npm run build	Build frontend for production

⚠️ Notes
Backend runs on port 5000, frontend on 5173 (Vite default)

If deploying, update your API base URLs accordingly

Keep .env private — never commit it to GitHub

📸 Future Enhancements
Product filtering & search

Admin dashboard for managing products

Payment gateway integration (Stripe / Razorpay)

Order history & user profiles

🧑‍💻 Author
Somashekar N
Full Stack Developer | AI & ML Enthusiast
Built as part of Nexora Full Stack Development Internship Assignment