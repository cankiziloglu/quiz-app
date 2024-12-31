# Quiz App

This is a full-stack Quiz Application built with Node.js, Express, React, and Tailwind CSS. The app allows users to take quizzes, view their attempts, and manage quizzes and questions.

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **Joi**: Data validation library.
- **Joi-password-complexity**: Password complexity validation for Joi.
- **dotenv**: Loads environment variables from a `.env` file.
- **helmet**: Security middleware for Express.
- **morgan**: HTTP request logger middleware for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **cookie-parser**: Middleware for parsing cookies.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Query**: Data-fetching library for React.
- **TypeScript**: Typed superset of JavaScript.
- **Vite**: Next-generation frontend tooling.

## Features

### Backend
- User authentication and authorization.
- Quiz management (create, edit, delete quizzes).
- Question management (create, edit, delete questions).
- Attempt management (start and submit attempts).
- Data validation using Joi.

### Frontend
- User login and signup.
- Dashboard to view available quizzes.
- Quiz taking interface.
- View past attempts and scores.
- Responsive design with Tailwind CSS.

## How the App Works

### Backend
The backend is built with Node.js and Express. It provides RESTful APIs for managing users, quizzes, questions, and attempts. Data validation is handled using Joi. The backend also includes middleware for security, logging, and error handling.

### Frontend
The frontend is built with React and TypeScript. It uses React Router for navigation and React Query for data fetching. The UI is styled using Tailwind CSS. The frontend communicates with the backend APIs to perform CRUD operations and manage user sessions.

## Routes and Their Usage

### Backend (under `/server`)

- **User Routes**
  - `POST /api/users/signup`: User signup.
  - `POST /api/users/login`: User sign in.
  - `POST /api/users/logout`: User sign out.
  - `GET /api/users/me`: Get user details. - *only available to authenticated users*
  - `PUT /api/users/edit`: Edit user details. - *only available to authenticated users*
  - `GET /api/users`: Get all users. - *only available to an ADMIN*
  - `GET /api/users/:user_id`: Get user by id. - *only available to an ADMIN*
  - `DELETE /api/users/:user_id`: Delete user by id. - *only available to an ADMIN*

- **Quiz Routes**
  - `GET /api/quizzes`: Get all quizzes.
  - `POST /api/quizzes`: Create a new quiz. - *only available to an ADMIN*
  - `GET /api/quizzes/:quiz_id`: Get details of a quiz. - *only available to authenticated users*
  - `PUT /api/quizzes/:quiz_id`: Edit a quiz. - *only available to an ADMIN*
  - `DELETE /api/quizzes/:quiz_id`: Delete a quiz. - *only available to an ADMIN*

- **Question Routes**
  - `GET /api/quizzes/:quiz_id/questions`: Get all questions for a quiz. - *only available to an ADMIN*
  - `POST /api/quizzes/:quiz_id/questions`: Add a new question to a quiz. - *only available to an ADMIN*
  - `GET /api/quizzes/:quiz_id/questions/:question_id`: Get a question of a quiz. - *only available to an ADMIN*
  - `PUT /api/quizzes/:quiz_id/questions/:question_id`: Edit a question of a quiz. - *only available to an ADMIN*
  - `DELETE /api/quizzes/:quiz_id/questions/:question_id`: Delete a question. - *only available to an ADMIN*
  - 

- **Attempt Routes**
  - `POST /api/attempt`: Start a new attempt. - *only available to authenticated users*
  - `POST /api/attempt/:attempt_id`: Submit an attempt. - *only available to authenticated users*
  - `GET /api/attempt/me`: Get all attempts for the logged-in user. - *only available to authenticated users*
  - `GET /api/attempt/me/:attempt_id`: Get an attempt detail for the logged-in user. - *only available to authenticated users*
  - `GET /api/attempt`: Get all attempts of a quiz or user. - *only available to an ADMIN*
  - `GET /api/attempt/:attempt_id`: Get details of an attempt. - *only available to an ADMIN*
  - `DELETE /api/attempt/:attempt_id`: Delete an attempt. - *only available to authenticated users*

### Frontend (under `/client`)

- **Login Page**
  - Route: `/login`
  - Description: User login page.

- **Home Page**
  - Route: `/`
  - Description: Displays available quizzes.

- **Quiz Page**
  - Route: `/quiz/:quiz_id`
  - Description: Interface for taking a quiz.

- **Dashboard Page**
  - Route: `/dashboard`
  - Description: Displays user's past attempts and scores.

- **Admin Page**
  - Route: `/admin`
  - Description: Interface for managing quizzes and questions (accessible only to admins).

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cankiziloglu/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../client
   npm install
   ```

### Running the App

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd ../client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the app.

## License

This project is licensed under the MIT License.
