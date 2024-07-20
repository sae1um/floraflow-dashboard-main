# FloraFlow - By UTC (Godswill)
<p align="center">
	<img src="https://github.com/sae1um/floraflow-dashboard-main/blob/main/Group%201.png" alt="FloraFlow Logo">
</p>

### Project Overview
This project is part of a work experience program at UTC Sheffield Olympic Legacy Park. The goal was to create a dashboard to monitor mini-greenhouses equipped with various sensors. These greenhouses, built by my teacher, are placed around the school and at his home. The dashboard allows anyone to access real-time data from these greenhouses and, in the future, will enable control over the environmental conditions within them. This project, along with others, will be featured in a project showcase room for visitors. Check out more info [here](http://bit.ly/UTCOLPCompShowcase)
<p align="center">
	<a href="https://github.com/sae1um/floraflow-dashboard-main"><img src="https://see.fontimg.com/api/renderfont4/m2PBm/eyJyIjoiZnMiLCJoIjozNiwidyI6MTAwMCwiZnMiOjM2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UmVwb3NpdG9yeQ/cf-gerrion-bold.png" alt="Repositories text image"></a>
	<a><img src="https://see.fontimg.com/api/renderfont4/woBmx/eyJyIjoiZnMiLCJoIjo2LCJ3IjoxMDAwLCJmcyI6NiwiZmdjIjoiI0ZGRkZGRiIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/c3BhY2U/cf-gerrion-semibold.png" alt="Deployment text image"></a>
	<a href="https://floraflow.netlify.app/"><img src="https://see.fontimg.com/api/renderfont4/m2PBm/eyJyIjoiZnMiLCJoIjozNiwidyI6MTAwMCwiZnMiOjM2LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RGVwbG95bWVudA/cf-gerrion-bold.png"></a>
</p>

## Contents
-   [Technologies Used](#technologies-used)
-   [Project Setup](#project-setup)
- [Current State](#current-state)
-   [Deployment](#deployment)
-   [Future Plans](#future-plans)
-   [Closing](#closing)
### Technologies Used
## Frontend
- **React**: I already had a little experience using React. which made it easier to develop the dashboard.
	- Used to create a component based dashboard
- **Axios**: This was my first time using Axios, but it is well-regarded for making client side http requests, and wanted to learn how to use it.
- **ChartJS**: Previously used ChartJS for another project, found it straightforward for creating interactive charts.
- **MUI Gauges**: A library of components, I used the gauge components to display information from the greenhouses

## Backend
- **Node.js**: Node.js is a robust platform for building server-side applications, and it uses JavaScript, which I am already familiar with.
- **Express**: Minimal and flexible framework that provides a robust set of features for web and mobile applications.

## Database
- **MySQL**: Powerful and widely-used database management system that fits will with the project requirements. The alpha version of the dashboard used SQL with PHPMyAdmin, when I took over the project I switched to MySQL

## Project Setup
### Backend Packages: 
- Express
- Mysql2
- DotEnv
- Cors
**To install:**
`npm i express mysql2 dotenv cors`
 ### Frontend Packages: 
- ReactJs
- React-Router-Dom
- Axios
- Mui (X-charts, Material, Icons and all other dependencies can be found in package.json)
- React-Icons
- ChartJs
- ClassNames 
- TailwindCSS
**To install:**
	- Initialising the react application
      `npx create-react-app@latest ./`
     - Installing TailwindCSS
      `npm i -D tailwindcss`
      `npx tailwindcss init`
      - Other Packages
	  `npm i axios chart.js mui react-router-dom react-icons classnames`
	  ![Technologies Used Diagram](https://github.com/sae1um/floraflow-dashboard-main/blob/main/Group%2092.png)
## Current State
This is what the main dashboard of the site looks like currently (20.07.2024)
![Dashboard](https://github.com/sae1um/floraflow-dashboard-main/blob/main/image.png)
## Deployment
Initially, the plan was to deploy the server, site, and database on a Raspberry Pi 3, to remove the need of having to connect to an external cloud provider or needing and internet connection. However, due to its limited processing power, and the schools network firewall working a bit too well (and annoyingly), the setup is currently running from a laptop. In the future, the project will be deployed to the free cloud platforms.
## Future Plans
I will be actively working on the project till all its features are complete as of right now (20.07.2024) only the main dashboard page is around 85% complete and the other pages still need to be worked on.
- **Control Features**: Still need to implement features to control the environmental conditions within the greenhouses.
- **Cloud Deployment**: Properly deploying the server, frontend, and database to cloud platforms. Currently thinking of using AWS RDS for the database, Netlify(Deployed) for the frontend, and Railway for the backend
## Closing
Participating in this project allowed me to enhance my web development skills and apply them to a real-world scenario. This dashboard will be featured in a project showcase room for visitors, demonstrating the practical applications of technology in monitoring and controlling environmental conditions.
