# Quiz App

This is a full-stack Quiz Application built with Node.js, Express, React, and Tailwind CSS. The app allows users to take quizzes, view their attempts, and manage quizzes and questions.

## Tech Stack

### Backend

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **Prisma**:
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
- Attempt management (start and submit, view and delete attempts).
- Data validation using Joi.
- Database queries and transactions using Prisma ORM.

### Frontend

- User login, logout and signup.
- Quiz taking interface, one question at a time.
- View & edit account info & password.
- View past quiz attempts and scores.
- Responsive design with Tailwind CSS.
- State management using React Context API.
- Admin dashboard to manage quizzes, questions, answers, attempts and users.

## How the App Works

### Backend

The backend is built with Node.js and Express. It provides RESTful APIs for managing users, quizzes, questions, and attempts. Data validation is handled using Joi. Database queries and transactions are handled with Prisma Orm using a Postgres database. The backend includes middleware for authentication, authorization, security, logging, and error handling. User passwords are hashed using bcrypt and session tokens are created using jwt and passed as cookies to the frontend. 

When a user requests to take a quiz, a new attempt is created in the database. Questions are fetched from the db and shuffled and sliced according to the quiz length for the selected quiz and attached to the attempt sent to the frontend. When the user completes the quiz the attempt is updated with user answers and the score is calculated and sent back to the frontend. 

### Frontend

The frontend is built with React and TypeScript. It uses React Router for navigation and React Query for data fetching. The UI is styled using Tailwind CSS. The frontend communicates with the backend APIs to perform CRUD operations and manage user sessions. When a user starts an attempt to a quiz, the questions are stored in local storage, so if the user terminates that session and comes back later to solve the same quiz, questions are served from local storage. Authentication, quiz and attempt data are managed using state (context API). 

When the user finishes and submits a quiz the result is fetched from the backend and shown to the user. User can also view past attempts and their scores and details in their account page. 

Admins can manage (view, create, edit, delete) users, quizzes, questions and attempts on their dashboard.


## API Routes and Their Usage

### Backend (under `/server`)

- **User Routes**

  - `POST /api/users/signup`: User signup.
  - `POST /api/users/login`: User sign in.
  - `POST /api/users/logout`: User sign out.
  - `GET /api/users/me`: Get user details. - _only available to authenticated users_
  - `PUT /api/users/me`: Edit user details. - _only available to authenticated users_
  - `GET /api/users`: Get all users. - _only available to an ADMIN_
  - `GET /api/users/:user_id`: Get user by id. - _only available to an ADMIN_
  - `PUT /api/users/edit`: Change user's role. - _only available to an ADMIN_
  - `DELETE /api/users/:user_id`: Delete user by id. - _only available to an ADMIN_

- **Quiz Routes**

  - `GET /api/quizzes`: Get all quizzes.
  - `POST /api/quizzes`: Create a new quiz. - _only available to an ADMIN_
  - `GET /api/quizzes/:quiz_id`: Get details of a quiz. - _only available to authenticated users_
  - `PUT /api/quizzes/:quiz_id`: Edit a quiz. - _only available to an ADMIN_
  - `DELETE /api/quizzes/:quiz_id`: Delete a quiz. - _only available to an ADMIN_

- **Question Routes**

  - `GET /api/quizzes/:quiz_id/questions`: Get all questions for a quiz. - _only available to an ADMIN_
  - `POST /api/quizzes/:quiz_id/questions`: Add a new question to a quiz. - _only available to an ADMIN_
  - `GET /api/quizzes/:quiz_id/questions/:question_id`: Get a question of a quiz. - _only available to an ADMIN_
  - `PUT /api/quizzes/:quiz_id/questions/:question_id`: Edit a question of a quiz. - _only available to an ADMIN_
  - `DELETE /api/quizzes/:quiz_id/questions/:question_id`: Delete a question. - _only available to an ADMIN_
  -

- **Attempt Routes**
  - `POST /api/attempt`: Start a new attempt. - _only available to authenticated users_
  - `POST /api/attempt/:attempt_id`: Submit an attempt. - _only available to authenticated users_
  - `GET /api/attempt/me`: Get all attempts for the logged-in user. - _only available to authenticated users_
  - `GET /api/attempt/me/:attempt_id`: Get an attempt detail for the logged-in user. - _only available to authenticated users_
  - `GET /api/attempt`: Get all attempts of a quiz or user. - _only available to an ADMIN_
  - `GET /api/attempt/:attempt_id`: Get details of an attempt. - _only available to an ADMIN_
  - `DELETE /api/attempt/:attempt_id`: Delete an attempt. - _only available to authenticated users_

### Frontend (under `/client`)

- **Home Page**

  - Route: `/`
  - Description: Displays available quizzes.

- **Login Page**

  - Route: `/login`
  - Description: User login page.

- **Sign-up Page**

  - Route: `/signup`
  - Description: User sign up page.

- **Quiz Page**

  - Route: `/quiz/:quiz_id`
  - Description: Interface for taking a quiz. Needs authentication to view.

- **Account Page**

  - Route: `/me`
  - Description: Displays user's past attempts and scores. Also enables user to change info and password. Needs authentication to view.

- **Admin Dahboard Page**
  - Route: `/dashboard`
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
