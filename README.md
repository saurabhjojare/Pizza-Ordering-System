# Pizza Palace

Pizza Palace is a full stack pizza ordering application built with NestJS, TypeScript, ReactJS, and PostgreSQL. It provides a seamless platform for browsing pizzas, managing carts, placing orders, and managing users through a structured REST API and intuitive web interface.

The application uses JWT based authentication and role based authorization to secure user and administrative operations. The frontend communicates with the backend through RESTful APIs, while both applications follow a modular architecture and are Dockerized for consistent development and deployment.

## How to Run

Clone the repository:

```bash
git clone https://github.com/saurabhjojare/Pizza-Palace.git
cd Pizza-Palace
```

### Backend

```bash
cd backend
docker compose up -d --build
```

Backend runs on port `5001` and PostgreSQL runs internally on port `5432`.

### Frontend

```bash
cd frontend
docker compose up -d --build
```

Frontend runs on port `3000`.
