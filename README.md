  **Health Management System**
  
A full-stack Health Management System built using the **MERN stack** that allows users to book health camps, upload prescriptions for restricted medicines, and purchase medicines only after admin approval.

 **Features**

 **User Features**
- User authentication (Login / Register)
- View available health camps
- Book a camp slot using a popup form
  - Name
  - Age
  - Address
  - Contact Number
- Upload prescription for restricted medicines
- View prescription status (Pending / Approved / Rejected)
- Buy medicines only after prescription approval
- Clear uploaded prescription if needed
- View order status

 **Admin Features**
- Secure admin login
- View all camp bookings with:
  - User details
  - Camp name, date, time, and location
- View Prescription Requests
  - Pending requests
  - Approved requests
- Accept or reject prescriptions
- View orders only for approved prescriptions
- Logout option (top-right corner)


 **Tech Stack**

**Frontend**
- React.js
- Axios
- Bootstrap / CSS
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (for prescription upload)


