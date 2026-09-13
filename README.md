<<<<<<< HEAD
# FinanceGuard 🛡️

A production-grade, full-stack personal finance and real-time fraud detection platform. This project demonstrates a microservices-style architecture featuring a React frontend, a Java Spring Boot backend, and a Python Machine Learning engine for anomaly detection.

## 🏗️ Architecture & Tech Stack

FinanceGuard is split into four distinct layers, all containerised using Docker:

1.  **Frontend (UI Layer)**
    *   **Tech:** React, TypeScript, Vite, Tailwind CSS, Recharts.
    *   **Role:** Provides a responsive dashboard for users to view balances, submit transactions, view spending charts, and resolve fraud alerts.
    *   **Key Features:** JWT-based route protection, Recharts for category breakdowns, Lucide-react for iconography.

2.  **Backend (API Layer)**
    *   **Tech:** Java 21, Spring Boot 3, Spring Security, Spring Data JPA, JJWT.
    *   **Role:** Acts as the central orchestrator. Handles user authentication, database interactions, and proxies transaction data to the ML engine for real-time scoring.
    *   **Key Features:** Stateless JWT authentication, custom security filter chains, RESTful controllers, CORS configuration.

3.  **ML Engine (AI Layer)**
    *   **Tech:** Python 3.11, FastAPI, scikit-learn, Pandas, Numpy.
    *   **Role:** Exposes a high-performance prediction API.
    *   **Key Features:** Utilises a Random Forest Classifier trained on synthetic transaction data to evaluate fraud probability based on transaction amount, category, time of day, and deviation from the user's average spending. Achieves ~94% accuracy on synthetic test data.

4.  **Database (Data Layer)**
    *   **Tech:** PostgreSQL 15.
    *   **Role:** Relational storage for `Users`, `Transactions`, and `FraudAlerts`.

---

## 🚀 How to Run Locally (Using Docker)

The easiest way to run the entire stack is using Docker Compose.

### Prerequisites
*   [Docker Desktop](https://docs.docker.com/desktop/) installed and running.

### Quick Start
1.  Clone this repository.
2.  Navigate to the root directory where the `docker-compose.yml` is located.
3.  Run the following command:
    ```bash
    docker compose up --build
    ```
4.  Wait for all containers to start. You can then access the services:
    *   **Frontend:** `http://localhost:3000`
    *   **Backend API:** `http://localhost:8080`
    *   **ML Engine API:** `http://localhost:8000/docs`

**Test Account:** 
Once running, you can register a new user or use the API to create an account, then log in via the frontend.

---

## ☁️ How to Deploy Online (Render.com)

To host this project online for a portfolio, we recommend using [Render](https://render.com/) because of its excellent free tier and Docker support.

### Step 1: Deploy PostgreSQL Database
1.  In Render, click **New +** -> **PostgreSQL**.
2.  Name it (e.g., `financeguard-db`), select the Free tier, and create it.
3.  Scroll down to "Connections" and copy the **Internal Database URL**.

### Step 2: Deploy ML Engine (Web Service)
1.  Click **New +** -> **Web Service**.
2.  Connect this GitHub repository.
3.  Set the **Root Directory** to `ml-engine`.
4.  Set the **Environment** to `Docker`.
5.  Select the Free tier and create. 
6.  Once live, copy the public URL (e.g., `https://financeguard-ml.onrender.com`).

### Step 3: Deploy Java Backend (Web Service)
1.  Click **New +** -> **Web Service**.
2.  Connect this GitHub repository.
3.  Set the **Root Directory** to `backend`.
4.  Set the **Environment** to `Docker`.
5.  Under **Advanced**, add the following Environment Variables:
    *   `SPRING_DATASOURCE_URL` = *(Paste the Internal Database URL from Step 1)*
    *   `JWT_SECRET` = *(Generate a long random string, e.g., `financeguard-super-secret-key-2026-production`)*
    *   `ML_ENGINE_URL` = *(Paste the ML Engine URL from Step 2)*
6.  Create the service and copy its public URL once live.

### Step 4: Deploy React Frontend (Static Site)
1.  Click **New +** -> **Static Site**.
2.  Connect this GitHub repository.
3.  Set the **Root Directory** to `frontend`.
4.  Set the **Build Command** to `npm install && npm run build`.
5.  Set the **Publish Directory** to `dist`.
6.  Under **Advanced**, add this Environment Variable:
    *   `VITE_API_URL` = *(Paste the Java Backend URL from Step 3)*
7.  Create the site.

Your application is now live on the internet!

---

## 🧪 Testing

The project includes test suites for all major components:
*   **Backend:** Run `mvn test` in the `backend/` directory (JUnit 5).
*   **Frontend:** Run `npm test` in the `frontend/` directory (Jest).
*   **ML Engine:** Run `pytest tests/ -v` in the `ml-engine/` directory (Pytest).

Automated testing is configured via GitHub Actions (`.github/workflows/ci.yml`), which triggers tests across all three environments on every push to the `main` branch.
=======
# financeguard
inanceGuard 🛡️
A production-grade, full-stack personal finance and real-time fraud detection platform. This project demonstrates a microservices-style architecture featuring a React frontend, a Java Spring Boot backend, and a Python Machine Learning engine for anomaly detection.

🏗️ Architecture & Tech Stack
FinanceGuard is split into four distinct layers, all containerised using Docker:

Frontend (UI Layer)

Tech: React, TypeScript, Vite, Tailwind CSS, Recharts.
Role: Provides a responsive dashboard for users to view balances, submit transactions, view spending charts, and resolve fraud alerts.
Key Features: JWT-based route protection, Recharts for category breakdowns, Lucide-react for iconography.
Backend (API Layer)

Tech: Java 21, Spring Boot 3, Spring Security, Spring Data JPA, JJWT.
Role: Acts as the central orchestrator. Handles user authentication, database interactions, and proxies transaction data to the ML engine for real-time scoring.
Key Features: Stateless JWT authentication, custom security filter chains, RESTful controllers, CORS configuration.
ML Engine (AI Layer)

Tech: Python 3.11, FastAPI, scikit-learn, Pandas, Numpy.
Role: Exposes a high-performance prediction API.
Key Features: Utilises a Random Forest Classifier trained on synthetic transaction data to evaluate fraud probability based on transaction amount, category, time of day, and deviation from the user's average spending. Achieves ~94% accuracy on synthetic test data.
Database (Data Layer)

Tech: PostgreSQL 15.
Role: Relational storage for Users, Transactions, and FraudAlerts.
🚀 How to Run Locally (Using Docker)
The easiest way to run the entire stack is using Docker Compose.

Prerequisites
Docker Desktop installed and running.
Quick Start
Clone this repository.
Navigate to the root directory where the docker-compose.yml is located.
Run the following command:
bash

docker compose up --build
Wait for all containers to start. You can then access the services:
Frontend: http://localhost:3000
Backend API: http://localhost:8080
ML Engine API: http://localhost:8000/docs
Test Account: Once running, you can register a new user or use the API to create an account, then log in via the frontend.

☁️ How to Deploy Online (Render.com)
To host this project online for a portfolio, we recommend using Render because of its excellent free tier and Docker support.

Step 1: Deploy PostgreSQL Database
In Render, click New + -> PostgreSQL.
Name it (e.g., financeguard-db), select the Free tier, and create it.
Scroll down to "Connections" and copy the Internal Database URL.
Step 2: Deploy ML Engine (Web Service)
Click New + -> Web Service.
Connect this GitHub repository.
Set the Root Directory to ml-engine.
Set the Environment to Docker.
Select the Free tier and create.
Once live, copy the public URL (e.g., https://financeguard-ml.onrender.com).
Step 3: Deploy Java Backend (Web Service)
Click New + -> Web Service.
Connect this GitHub repository.
Set the Root Directory to backend.
Set the Environment to Docker.
Under Advanced, add the following Environment Variables:
SPRING_DATASOURCE_URL = (Paste the Internal Database URL from Step 1)
JWT_SECRET = (Generate a long random string, e.g., financeguard-super-secret-key-2026-production)
ML_ENGINE_URL = (Paste the ML Engine URL from Step 2)
Create the service and copy its public URL once live.
Step 4: Deploy React Frontend (Static Site)
Click New + -> Static Site.
Connect this GitHub repository.
Set the Root Directory to frontend.
Set the Build Command to npm install && npm run build.
Set the Publish Directory to dist.
Under Advanced, add this Environment Variable:
VITE_API_URL = (Paste the Java Backend URL from Step 3)
Create the site.
Your application is now live on the internet!

🧪 Testing
The project includes test suites for all major components:

Backend: Run mvn test in the backend/ directory (JUnit 5).
Frontend: Run npm test in the frontend/ directory (Jest).
ML Engine: Run pytest tests/ -v in the ml-engine/ directory (Pytest).
Automated testing is configured via GitHub Actions (.github/workflows/ci.yml), which triggers tests across all three environments on every push to the main branch.
>>>>>>> eab8acf00762c95f2be6e8f8830368c014222a42
