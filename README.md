# Bharat Sanskriti: Celebrating India's Cultural Heritage

<div align="center">

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A dynamic fullstack platform dedicated to preserving, showcasing, and celebrating India's rich cultural heritage, traditions, and festivals**

[Documentation](#) • [Contributing](#contributing) • [Report Issue](#)

</div>

---

## 🎯 About

Bharat Sanskriti is a comprehensive digital platform designed to bridge the gap between India's ancient cultural wealth and modern technology. Through an intuitive interface and intelligent features, it enables users to explore, learn, and appreciate the diverse traditions, festivals, and heritage sites across all Indian states and union territories.

---

## ✨ Key Features

### 🤖 **AI-Powered Cultural Assistant (Chatur)**
- Interactive chatbot powered by BotPress
- Real-time answers about Indian culture, history, and traditions
- Context-aware responses for seamless learning
- 24/7 availability for cultural inquiries

### 🚨 **Heritage Risk Radar**
- Monitors real-time threats to cultural heritage sites
- Tracks environmental and urban development risks
- Visual mapping of endangered heritage locations
- Proactive preservation alerts

### 🗺️ **State-Wise Cultural Exploration**
- Comprehensive coverage of all Indian states and union territories
- Organized data on:
  - Historical heritage sites and monuments
  - Living traditions and customs
  - Festival celebrations and significance
  - Regional art forms and crafts

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|:---:|:---|:---|
| **Frontend** | React.js, Tailwind CSS, Framer Motion | Responsive UI with smooth animations |
| **Backend** | Node.js, Express.js | RESTful APIs and business logic |
| **Database** | MongoDB Atlas | Scalable cloud database |
| **AI Integration** | BotPress | Conversational AI chatbot |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm
- MongoDB Atlas account
- BotPress API credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArpanCharola/bharatSanskriti.git
   cd bharatSanskriti
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   
   Update the `.env` file in the backend directory with your credentials:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   BOTPRESS_API_KEY=your_botpress_api_key
   ```

4. **Start the Backend Server**
   ```bash
   npx nodemon server.js
   ```
   The backend will run on `http://localhost:5000`

5. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

---

## 📁 Project Structure

```
bharatSanskriti/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Images and static files
│   │   └── App.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
├── backend/                  # Node.js + Express API server
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Entry point
│   ├── .env.example         # Environment variables template
│   └── package.json
├── screenshots/             # Screenshots for README
├── README.md                # Main documentation
└── .gitignore
```

---


## 👥 Author

- **Arpan Charola** - [GitHub](https://github.com/ArpanCharola)

---

<div align="center">

**Made with ❤️ to preserve India's cultural legacy**

⭐ If you find this project helpful, please consider giving it a star!

</div>
