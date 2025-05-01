# 🚇 Metro Ticketing System  
**A modern solution for automated metro management | MERN Stack**  

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## 📖 Overview  
A full-stack web application designed to digitize metro operations, featuring ticket management, route planning, and user complaint resolution. Built to streamline public transportation services in urban areas.

## ✨ Key Features  
- 🔐 **User Authentication**  
  - Secure registration/login with encrypted credentials
  - Session management
- 🎫 **Smart Ticketing**  
  - Purchase digital tickets with validity periods  
  - View ticket history  
  - QR-based validation system *(planned upgrade)*  
- 🗺️ **Route Management**  
  - Fixed pricing per route  
  - Interactive metro map display  
- 📢 **Complaint Portal**  
  - Submit service-related complaints  
  - Track complaint resolution status  
- 📊 **Admin Dashboard**  
  - Manage routes/pricing  
  - Analyze user traffic  

## 🛠️ Tech Stack  
**Frontend:** React, Bootstrap  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Tools:** Postman, Git, VS Code  

## ⚙️ Installation  
1. **Clone Repository**  
```bash
git clone https://github.com/juni2003/Metro-Ticketing-System-Project.git
```
2. **Install Dependencies**

```bash
cd client && npm install
cd ../server && npm install
```
3. **Configure Environment**
- Create .env files with these variables:
- **Server**
```bash
MONGO_URI = your_mongodb_connection_string 
JWT_SECRET = your_jwt_secret
PORT = 5000
# Replace `your_mongodb_connection_string` and `your_jwt_secret` with actual values  

```
- **Client**
```bash
REACT_APP_API_URL = http://localhost:5000
```
4. **Run Application**

```bash
# Start backend
cd server && npm start

# Start frontend
cd ../client && npm start
```
## 📄 Database Schema  
**Key Collections:**  

| **Users**          | **Tickets**         | **Routes**          |  
|---------------------|---------------------|---------------------|  
| - username         | - user_id           | - route_id          |  
| - email            | - route_id          | - stations          |  
| - password (hash)  | - purchase_time     | - price             |  
| - ticket_history   | - valid_until       | - active_status     |  

## 🌟 Future Enhancements  
- 💳 Integrated payment gateway  
- 📱 Progressive Web App (PWA) support  
- 🚌 Real-time metro tracking  
- 📈 AI-driven demand prediction  
## 🤝 Contribute  
1. **Fork the repository**  
2. **Create a feature branch**  
```bash
git checkout -b feature/your-idea
```
3. **Commit changes**  
```bash
git commit -m "Add your feature"
```
4. **Push and open a Pull Request**  
## 🌟 Support the Project
If this project helps you, consider giving it a star! ⭐
