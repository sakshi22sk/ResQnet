# ResQNet – Emergency Response & Resource Coordination Platform
Developed ResQNet, a full-stack emergency response platform for real-time incident reporting, volunteer coordination, and resource management using React, Node.js, and MongoD

ResQNet is a full-stack emergency response platform designed to improve disaster and incident management through real-time reporting, volunteer coordination, and resource tracking. The platform enables citizens, responders, and volunteers to collaborate efficiently during emergencies.

🌐 Live Demo: https://resqnet-frontend.netlify.app/Landing

---

## 📌 Features

### 🚨 Real-Time Incident Reporting
- Report emergencies instantly.
- Submit incident details including location and description.
- Track incident status and updates.

### 🤝 Volunteer Coordination
- Register and manage volunteers.
- Assign volunteers to incidents based on availability.
- Monitor volunteer participation and response activities.

### 📦 Resource Management
- Track emergency resources and supplies.
- Allocate resources to active incidents.
- Monitor resource availability in real time.

### 📍 Location-Based Response
- Incident location tracking.
- Improved coordination between responders and volunteers.
- Faster emergency response planning.

### 📊 Dashboard & Monitoring
- Centralized view of incidents and resources.
- Real-time updates and activity tracking.
- Improved decision-making during emergencies.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Deployment
- Netlify (Frontend)
- MongoDB Atlas (Database)

---

## 📂 Project Structure

```bash
ResQNet/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
└── README.md

⚙️ Installation
Clone Repository
git clone https://github.com/your-username/resqnet.git
cd resqnet
Frontend Setup
cd frontend
npm install
npm start
Backend Setup
cd backend
npm install
npm start
🔑 Environment Variables

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🚀 Future Enhancements
Real-time notifications using WebSockets
AI-based emergency prioritization
SMS and Email alerts
Interactive GIS-based mapping
Mobile application support
Multi-language accessibility
🎯 Use Cases
Disaster Management
Medical Emergencies
Community Safety Programs
Volunteer-Based Relief Operations
Resource Allocation During Crises

👩‍💻 Contributors
Sakshi Kumari

📄 License
This project is developed for educational and research purposes. Feel free to use and modify it for learning and non-commercial applications.
