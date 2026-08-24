Pizza Palace is a user friendly pizza ordering web application built with **ReactJS** and **TypeScript**. It provides an intuitive interface for users to browse pizzas, manage their cart, place orders, view order history, and manage their profiles.

The application integrates with the backend through **RESTful APIs** and uses **JWT based authentication** with role based access control. Authorized users can manage pizzas, users, and orders.

The frontend is containerized using **Docker**, providing a consistent and portable environment for development and deployment.

## How to Run

```bash
git clone https://github.com/saurabhjojare/Pizza-Palace.git
cd Pizza-Palace
git checkout frontend
cd frontend
docker compose up -d --build
```

Frontend runs on port `3000`.
