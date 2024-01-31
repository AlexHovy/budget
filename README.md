# budget

## Key Features

- **User Management**: Register and manage user accounts using Firebase.
- **Category Management**: Organize transactions into categories for better tracking.
- **Transaction Management**: Record and track income and expenses.
- **Data Persistence**: Uses MongoDB for storing and retrieving data.
- **Secure Authentication**: Ensures user data security and integrity using Firebase

## Technologies Used

- **Node.js and Express**: For building the server-side application.
- **MongoDB**: As the database for storing user data, categories, and transactions.
- **Docker**: To containerize the application for easy deployment.
- **RabbitMQ**: Implemented for efficient message queuing, ensuring reliable communication and task processing.

## Getting Started

To get started with this project, clone the repository and follow the setup instructions in the `server` directory. You'll need to have Node.js, Docker, and RabbitMQ installed on your system.

## Configs
- Copy `client/example.env` and rename copied version to `.env`
- Copy `server/example.env` and rename copied version to `.env`
- Copy `server/example.firebase-service-account.json` and rename copied version to `firebase-service-account.json`
- Remeber to replace config values

## Postman
- You will find a Postman export at `postman`
- Remember to change the `Variables` in the parent folder
