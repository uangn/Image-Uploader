# Image Uploader with Reactions and Comments

## Introduction

This application is a full-stack web application built with the MERN stack (MongoDB, Express.js, React, and Node.js) and TypeScript. It allows users to upload images, react to posts, and comment on them. The authentication system is based on JSON Web Tokens (JWT).

## Features

- User authentication with JWT.
- Image upload functionality.
- Users can react to images.
- Users can comment on images.
- Responsive and interactive UI built with React and TypeScript.
- Backend API built with Express.js and TypeScript.

## Technologies Used

### Frontend

- React
- TypeScript
- JWT for client-side authentication

### Backend

- Node.js
- Express.js
- TypeScript
- Mongoose (MongoDB ODM)
- JWT for server-side authentication

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:
   mkdir image-uploader
   cd image-uploader
   git clone https://github.com/uangn/Image-Uploader .
2. Install dependencies for the backend:
   Copy code
   cd backend
   npm install
3. Install dependencies for the frontend:
   Copy code
   cd ../frontend
   npm install
4. Set up environment variables:

Create a .env file in the backend directory with the following contents:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret 5. Start the backend server:
cd backend
tsc -w
npm start

6. Start the frontend development server:
   cd frontend
   npm start

## Usage

1. Register a new user or log in with an existing account.
2. Upload images using the upload functionality provided in the UI.
3. Browse user pages and view their uploaded images.
4. React to images by liking or disliking them using the reaction buttons.
5. Comment on images to interact and share your thoughts with other users.

## API Endpoints