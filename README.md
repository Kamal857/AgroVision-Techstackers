# AgroVision 🌾
### Developed by **Tech-Stackers** 🚀

**AgroVision** is a comprehensive agricultural platform designed to empower farmers with cutting-edge AI technology, smart management tools, and real-time data. Built for the modern farmer, it bridges the gap between traditional agriculture and digital innovation.

---

## 🛠️ Tech Stack
We leveraged a robust **Full-Stack (MERN)** architecture combined with advanced AI integrations to build this solution:

### **User Interface (Frontend)**
*   **React + Vite**: Delivers a lightning-fast, reactive, and smooth user experience.
*   **Tailwind CSS**: Ensures a modern, pixel-perfect, and fully responsive design across all devices.
*   **Framer Motion**: Adds fluid animations and micro-interactions for a premium feel.
*   **Lucide React**: Provides clean, consistent, and semantic iconography.

### **Server & Logic (Backend)**
*   **Node.js & Express.js**: Powering a scalable and efficient RESTful API.
*   **JWT (JSON Web Tokens)**: Implements secure, stateless user authentication.
*   **Bcrypt**: Ensures industry-standard password encryption.

### **Database**
*   **MongoDB & Mongoose**: A flexible NoSQL database structure for managing complex relationships between users, tasks, and market data.

### **🤖 AI & Cloud Power**
*   **Generative AI (OpenAI/Gemini)**: The brain behind our **AI Crop Doctor** and **Smart Agronomist**. It analyzes plant images for disease diagnosis and provides expert farming advice in natural language.
*   **OpenWeatherMap API**: Fetches real-time, hyperlocal weather forecasts crucial for farming decisions.

---

## ✨ Key Features

### 1. AI Crop Doctor 📸
Our flagship feature. Farmers can simply upload a photo of a potential crop disease (like a leaf spot). Our AI analyzes the visual patterns, diagnoses the specific disease with high confidence, and prescribes immediate **treatment** and **prevention** advice.

### 2. Smart Agronomist Chat 💬
A 24/7 intelligent assistant tailored for agriculture. Whether it's soil pH questions, seasonal planting advice, or fertilizer queries, the Smart Agronomist provides instant, accurate answers.

### 3. Live Market Intelligence 📊
Empowers farmers to negotiate better. We track and display real-time market prices for various crops, helping farmers decide **when** and **where** to sell for maximum profit.

### 4. Precision Weather Forecasting ☁️
Detailed 5-day weather forecasts including temperature, humidity, and rain probability, helping farmers plan irrigation and harvesting schedules effectively.

### 5. Farm Management (My Jobs) ✅
A productivity tool that helps farmers track daily tasks. It features progress bars and gamification to keep farm operations organized and efficient.

### 6. Localization 🇳🇵
Built with accessibility in mind, supporting both **English** and **Nepali** to reach farmers in their native language.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   MongoDB Atlas Account
*   Google/OpenAI API Keys

### Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Kamal857/AgroVision-Techstackers.git
    cd AgroVision-Techstackers
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    # Create a .env file and add your MONGODB_URI and API_KEYS
    npm start
    ```

3.  **Frontend Setup**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```

---

### 🏆 Hackathon Submission by Team Tech-Stackers
*   **Innovation**: Combining Computer Vision with LLMs for practical agriculture.
*   **Impact**: Directly addressing crop loss and market asymmetry.
*   **Execution**: A fully functional, deployed MERN stack application.
