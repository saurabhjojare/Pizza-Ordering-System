Pizza Palace is a feature rich pizza ordering backend built with **NestJS** and **TypeScript**. It provides a structured REST API for managing authentication, users, pizzas, and orders, with **PostgreSQL** for reliable data persistence.

The application implements **JWT based authentication** and **role based authorization** to secure user and administrative operations. The backend follows a modular architecture, making the system organized, maintainable, and easy to extend.

The project is fully **Dockerized**, allowing the complete backend environment to be built and run consistently across different systems.

## How to run

```bash
git clone https://github.com/saurabhjojare/Pizza-Palace.git
cd Pizza-Palace
git checkout backend
cd backend
docker compose up -d --build
```

Backend runs on port `5001` and PostgreSQL runs internally on port `5432`.
