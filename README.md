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
   - mkdir image-uploader
   - cd image-uploader
   - git clone https://github.com/uangn/Image-Uploader .
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

MONGO_URI=your_mongo_db_connection_string <br>
JWT_SECRET=your_jwt_secret <br> 5. Start the backend server:<br>
cd backend<br>
tsc -w<br>
npm start<br>

6. Start the frontend development server:<br>
   cd frontend<br>
   npm start<br>

## Usage

1. Register a new user or log in with an existing account.
2. Upload images using the upload functionality provided in the UI.
3. Browse user pages and view their uploaded images.
4. React to images by liking or disliking them using the reaction buttons.
5. Comment on images to interact and share your thoughts with other users.

## API Endpoints

### Authenticated Routes

1. **Homepage**

   - `GET /:username` - Get the homepage for a specific user.

2. **File Upload**

   - `GET /file-upload` - Get the file upload page.
   - `POST /file-upload` - Upload a new file.

3. **File Delete**

   - `DELETE /file-delete` - Delete a file.

4. **Image Detail**

   - `GET /:username/:imageId` - Get the details of a specific image.

5. **File Edit**

   - `GET /:username/:imageId/file-edit` - Get the file edit page.
   - `PUT /file-edit` - Edit a file.

6. **Find User**

   - `GET /find-user` - Find a user.

7. **Comments**

   - `GET /comment/:imageId` - Get comments for a specific image.
   - `POST /comment/:userId/:imageId/` - Post a comment on a specific image.

8. **Reactions**

   - `GET /reaction/:imageId/` - Get reactions for a specific image.
   - `POST /reaction/:imageId/` - Post a reaction to a specific image.

9. **Delete Account**
   - `GET /delete-account` - Get the delete account page.
   - `POST /delete-account` - Delete account

### App Routes

1. **Homepage**

   - `GET /:username` - Get the homepage for a specific user.

2. **File Upload**

   - `GET /file-upload` - Get the file upload page.
   - `POST /file-upload` - Upload a new file.

3. **File Delete**

   - `DELETE /file-delete` - Delete a file.

4. **Image Detail**

   - `GET /:username/:imageId` - Get the details of a specific image.

5. **File Edit**

   - `GET /:username/:imageId/file-edit` - Get the file edit page.
   - `PUT /file-edit` - Edit a file.

6. **Find User**

   - `GET /find-user` - Find a user.

7. **Comments**

   - `GET /comment/:imageId` - Get comments for a specific image.
   - `POST /comment/:userId/:imageId/` - Post a comment on a specific image.

8. **Reactions**

   - `GET /reaction/:imageId/` - Get reactions for a specific image.
   - `POST /reaction/:imageId/` - Post a reaction to a specific image.

9. **Delete Account**
   - `GET /delete-account` - Get the delete account page.
   - `POST /delete-account` - Delete a user account.

## FOLDER STRUCTURE

<br>
backend/   <br>             
├── dest<br>
├── src/<br>
| ├── controllers/<br>
| ├── models/<br>
| ├── routes/<br>
| ├── middlewares/<br>
| └── app.ts<br>
├── .env<br>
├── package.json<br>
└── tsconfig.json<br>
<br>
frontend/<br>
├── src/<br>
│ ├── components/<br>
│ ├── pages/<br>
│ ├── routes/<br>
│ ├── hooks/<br>
│ ├── stores/<br>
│ ├── App.tsx<br>
│ ├── index.tsx<br>
├── public/<br>
├── package.json<br>
└── tsconfig.json<br>
<br>
