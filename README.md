# FloraFlow 
<span style="display: flex;  justify-content: center; gap: 2rem" >
	<a href="https://github.com/sae1um/floraflow-dashboard-main" target="_blank"><img src="https://see.fontimg.com/api/renderfont4/m2PBm/eyJyIjoiZnMiLCJoIjozNiwidyI6MTAwMCwiZnMiOjM2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UmVwb3NpdG9yeQ/cf-gerrion-bold.png" alt="Repositories text image"></a>
	<a href="https://floraflow.netlify.app/" target="_blank"><img src="https://see.fontimg.com/api/renderfont4/m2PBm/eyJyIjoiZnMiLCJoIjozNiwidyI6MTAwMCwiZnMiOjM2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RGVwbG95bWVudA/cf-gerrion-bold.png"></a>
</span>

## 🚧 Rebuild in Progress 🚧
<span style="display: flex; justify-content: center;">
	<img src="./floraflow logo.png" alt="FloraFlow Logo">
</span>

### Project Overview
FloraFlow is an intelligent dashboard designed to monitor and manage smart greenhouses in real-time. Each greenhouse is equipped with sensors that track temperature, humidity, CO₂, and water levels — all visualized through an intuitive web interface.

Originally developed as part of a computing showcase at UTC Sheffield Olympic Legacy Park, FloraFlow has since evolved into a scalable system featuring real-time data tracking, device linking, and user authentication.

## ✨ Key Features

- **Real-time Monitoring**: Instantly view live environmental data from your connected greenhouses.

- **Secure User Accounts**: Each user can log in, claim, and manage their own greenhouses.

- **Greenhouse Management**: Add, rename, or link new devices seamlessly.

- **Data Visualisation**: Interactive charts and gauges make sensor data easy to understand.

- **Device Claiming System**: Each greenhouse can be securely linked to an owner through a one-time claim process.

- **Scalable Cloud Infrastructure**: Fully refactored to use Neon, Drizzle ORM, and Clerk Authentication for reliability and speed.

---
### Differences between V1 and V2
- Switched from MySQL to PostgreSQL (Neon) with Drizzle ORM
- Added Clerk authentication for secure user login and account management
- Implemented a device claiming system (users can claim a greenhouse using a unique ID)
- Created a 3-step onboarding flow (welcome → connect greenhouse → success)
- General code cleanup and project restructuring for maintainability (No more spaghetti code, Kinda :/)
### Features currently WIP
- New dashboard layout with proper routing structure and better UX
- Individual greenhouse detail pages (/dashboard/greenhouses/:id) for full metrics and charts
- Device online/offline tracking with periodic pings
- Refactoring routing with React Router v6


## 🧠 Technology Stack
### **Frontend**

- **React (Vite):** Modern, fast, and modular frontend.
- **TailwindCSS + ShadCN UI:** Clean, consistent UI with accessible components.
- **Recharts / ChartJS:** Real-time data visualization.
- **Clerk Auth:** Secure and modern authentication.

### **Backend**
- **Express.js:** Lightweight Node.js framework for API endpoints.
- **Drizzle ORM:** Type-safe SQL layer for maintainable database logic.
- **Neon:** Scalable Postgres database for real-time queries.

### **Device Integration**

- **ESP32-CAM / Microcontrollers:** Each greenhouse transmits live sensor readings to the backend via REST API.
- **Local + Cloud Communication:** Devices connect to the cloud API or local network depending on connectivity.

## Deployment

#### **FloraFlow is currently deployed on:**

- **Frontend:** Netlify, but will eventually be on https://floraflow.godswill.dev
- **Backend:** Hosted via Render 
- **Database:** Neon Postgres

## 🛣️ Roadmap

✅ Authentication and onboarding system

✅ Device claiming and linking

⚙️ Real-time data updates from ESP32

🗓️ Scheduling & automation controls

📊 Greenhouse health scoring and alerts

🌤️ AI-based climate prediction and optimization