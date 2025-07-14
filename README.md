💸 Expense Tracker App
A simple and efficient Expense Tracker web application that helps users manage and monitor their expenses within a specific time frame (e.g., monthly).

🛠️ Technologies Used
Frontend: React (bootstrapped with create-react-app)

Backend: Node.js + Express

Database: MySQL

Authentication: JWT-based user authentication

📦 Docker & Kubernetes
Dockerized the client and server applications using individual Dockerfiles

Built and pushed Docker images to Docker Hub

Used Kubernetes for container orchestration:

Created deployment and service config files for client, server, and MySQL

Defined PersistentVolume and PersistentVolumeClaim to retain data even if pods are restarted or destroyed

▶️ How to Run Locally (Using Minikube & Port Forwarding)
Start Minikube Cluster

bash
Copy
Edit
minikube start
Apply K8s Config Files
(Assuming you're inside the k8s/ directory)

bash
Copy
Edit
kubectl apply -f .
Port Forwarding to Access App Locally
Open two terminals and run:

Frontend (React app):

bash
Copy
Edit
kubectl port-forward services/expense-client-service 3000:80
Backend (Server API):

bash
Copy
Edit
kubectl port-forward services/expense-server-service 5000:5000
Access the Application
Visit: http://localhost:3000
