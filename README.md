# Pizza Palace - Pizza Ordering System

## Overview

Pizza Palace is a comprehensive pizza ordering application designed to streamline the ordering process for pizza stores. This full-stack application allows users to browse the menu, customize their orders, and manage their cart. Admins can manage inventory, view orders, and update customer information.

## Features

- **Cart Management**: Add/remove pizzas, select size, add toppings, adjust quantities.
- **Customer Management**: Add, view, update, and delete customer information.
- **Order History**: View and track order history.
- **Business Rules**: Enforces validation rules for order customization and inventory.

## Technologies Used

- **Frontend**: ReactJS with TypeScript
- **Backend**: NestJS
- **Database**: PostgreSQL
- **API**: RESTful APIs

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/saurabhjojare/pizza-palace.git
    cd pizza-palace
    ```

2. **Setup Frontend**

    ```bash
    cd pizza-frontend
    npm install
    npm start
    ```

3. **Setup Backend**

    ```bash
    cd pizza-backend
    npm install
    npm run start
    ```

4. **Configure Database**

    - Create a PostgreSQL database and update the database connection settings in `src/config/database.config.ts`.

### Running the Application

1. **Start the Backend Server**

    ```bash
    cd pizza-backend
    npm run start
    ```

2. **Start the Frontend Application**

    ```bash
    cd pizza-frontend
    npm start
    ```

3. **Access the Application**

    - Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.

## API Endpoints

- **GET /api/v1/pizzas**: Retrieve the list of pizzas.
- **POST /api/v1/orders**: Create a new order.
- **PUT /api/v1/orders/{id}**: Update an existing order.
- **DELETE /api/v1/orders/{id}**: Cancel an order.
- **GET /api/v1/order-line**: Retrieve the list of order lines.
- **POST /api/v1/customers**: Create a new customer.
- **GET /api/v1/customers/{id}**: Retrieve a customer by ID.
- **PUT /api/v1/customers/{id}**: Update customer information.
- **DELETE /api/v1/customers/{id}**: Delete a customer.
- **GET /api/v1/orders**: Retrieve a list of orders.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to saurabh.jojare@gmail.com.
