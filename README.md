# NestJS Library Application

This repository is a practice project for building a simple library application using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications. This project demonstrates the use of various technologies and practices, such as GraphQL, Mongoose, MongoDB, JWT authentication, Jest testing, and continuous integration with GitHub Actions.

## Features

- **GraphQL API**: Implementing a query language for APIs and runtime for executing queries with your data.
- **Mongoose ODM**: Utilizing Mongoose to interact with MongoDB, a NoSQL document database.
- **MongoDB Database**: Using MongoDB to store and retrieve library data efficiently.
- **Authentication**: Securing the application using JSON Web Tokens (JWT).
- **Testing**: Writing tests with Jest to ensure the application functions correctly.
- **CI/CD**: Automating the integration and deployment process with GitHub Actions.

## Technologies Used

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/)
- [GitHub Actions](https://github.com/features/actions)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

`git clone https://github.com/phuoc94/Practice-NestJS-GraphQL.git`
`cd Practice-NestJS-GraphQL`

2. Install the dependencies:

`npm install`

3. Set up your environment variables:
Copy the `.env.example` file to `.env` and fill in your details.

`cp .env.example .env`

4. Run the application:

`npm run start`

The application should now be running on `http://localhost:4000`.

### Using the Application

To interact with the GraphQL API, navigate to `http://localhost:4000/graphql` in your web browser to access the GraphQL Playground.

## Authentication

To use routes that require authentication, you must first sign up and then log in to receive a JWT token. Include this token in the Authorization header as a Bearer token for subsequent requests.

## Testing

To run the tests, use the following command:

`npm run test`

This will execute the test suite written with Jest.

## Continuous Integration

The `.github/workflows` directory contains GitHub Action configurations for Continuous Integration. On every pull request to the main branch, GitHub Actions will run the test suite and ensure that your build passes.

## Contact

If you have any questions or suggestions, please open an issue in this repository.
