# WebChat Application

## Overview
WebChat is a real-time chat application that allows users to communicate instantly in a shared chat room. This project demonstrates the implementation of a full-stack web application using modern web technologies.

## Technologies Used
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: Socket.IO
- Load Testing: Artillery.js

## Project Structure
The project is divided into three main parts:

1. `webchat-frontend/`: Contains the React-based frontend application.
2. `webchat-backend/`: Houses the Node.js/Express backend server.
3. `webchat-loadtest/`: Includes load testing scripts using k6.

## Main Components

### Frontend
- `App.js`: The main React component that manages routing and overall app structure.
- `ChatRoom.js`: Handles the chat room interface and real-time message updates.
- `Login.js`: Manages user authentication.
- `Message.js`: Renders individual chat messages.
- `UserList.js`: Displays the list of active users in the chat room.

### Backend
- `index.js`: The entry point for the backend server, sets up Express and Socket.IO.
- `db.js`: Manages the MongoDB connection.
- `models/Message.js`: Defines the schema for chat messages.
- `routes/messages.js`: Handles API routes for message operations.

## Building and Running the Application

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Backend Setup
1. Navigate to the `webchat-backend` directory.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add your MongoDB URI: `MONGO_URI=your_mongodb_uri_here`
4. Start the server with `npm start`.

### Frontend Setup
1. Navigate to the `webchat-frontend` directory.
2. Run `npm install` to install dependencies.
3. Start the React app with `npm start`.

### Running the Application
1. Ensure the backend server is running.
2. Start the frontend application.
3. Open a web browser and navigate to `http://localhost:3000`.

## Load Testing
To run load tests:
1. Ensure you have Node.js installed.
2. Install Artillery globally: `npm install -g artillery`
3. Navigate to the `webchat-loadtest` directory.
4. Run the test script with `artillery run chat-load-test.yml`.