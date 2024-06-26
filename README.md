# Worko
 
Introduction
Worko Backend is a RESTful API service for managing users, developed using Node.js and Express. It includes features like user authentication, user management, and input validation. The backend uses MongoDB for data storage and Jest for testing.
Features
•	User authentication and authorization using JWT
•	CRUD operations for user management
•	Data validation using Joi
•	Comprehensive test coverage with Jest
Getting Started
Prerequisites
Before you begin, ensure you have the following installed on your system:
•	Node.js (version 14 or later)
•	npm (Node package manager, typically installed with Node.js)
•	MongoDB (local or a cloud-based instance)
Installation
1.	Download the project folder(Worko)
         
           cd BACKEND
Dependencies
Dependencies are the core libraries required for the application to run in production. They include frameworks, libraries for authentication, validation, and more.
Production Dependencies
1.	express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
              npm install express
2.	dotenv: npm install dotenv
3.	npm install mongoose
4.	npm install bcrypt
5.	npm install jsonwebtoken
6.	npm install cookie-parser
7.	npm install joi
8.	npm install validator

Development Dependencies
Development dependencies are used during development and testing but are not necessary for the application to run in production.
1.	jest: A JavaScript testing framework to write tests with an API.
npm install --save-dev jest
2.	npm install --save-dev supertest
3.	npm install --save-dev nodemon
4.	npm install --save-dev babel-jest
5.	npm install --save-dev @babel/core
6.	npm install --save-dev @babel/preset-env
7.	npm install --save-dev babel-loader
8.	npm install --save-dev webpack
9.	npm install --save-dev webpack-cli

Full Installation Command
To install all dependencies at once, you can use the following commands:
Production Dependencies
npm install express dotenv mongoose bcrypt jsonwebtoken cookie-parser joi validator
Development Dependencies:
npm install --save-dev jest supertest nodemon babel-jest @babel/core @babel/preset-env babel-loader webpack webpack-cli




Set Up Environment Variables
Create a config.env file in the config directory and add the following variables. Adjust the values as needed.
PORT=5000
MONGODB_URI=mongodb://localhost:27017/worko
JWT_SECRET=your_jwt_secret
Running the Application
To start the server in development mode with automatic restarts, use:
npm run dev
The application will be accessible at http://localhost:5000
Running Tests
To run the tests and generate a coverage report, use:
    npm test
To generate only the coverage report:
npm run test:coverage
Coverage reports will be generated in the coverage directory.[you need to create Coverage directory under worko folder]
Environment Variables
The application uses a config.env file to manage environment-specific configurations. Ensure the following variables are defined:
•	PORT: The port number the server will listen on (default: 3000).
•	MONGODB_URI: The URI for the MongoDB instance.
•	JWT_SECRET: Secret key for JWT authentication.


API Documentation [Please use Thunder Client]
Authentication :
A  JWT Token will be generated after  login and creation of new user and then we can  perform all the operations.
1.POST /login
Authenticates a user and returns a JWT token.
http://localhost:5000/worko/login
Request Body:
{
  "email": "user@example.com",
  "password": "password"
}
2.Logout user(POST)
  URL: http://localhost:5000/worko/user/logout
   

3. Create User (POST /user)
URL: http://localhost:5000/worko/user
Method: POST
{
  "email": "john.doe@example.com",
   “password”: 12345678”,
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "zipCode": "10001"
}

User Management
1. List Users (GET /user)
     URL: http://localhost:5000/worko/user
2. Get User by ID (GET /user/ )
 URL: http://localhost:5000/worko/user/60c72b2f9b1e8c2f1e8b8b4c (Replace the ID with a  valid user ID)
 Method: GET
3. Update User (PUT /user/)
URL: http://localhost:5000/worko/user/60c72b2f9b1e8c2f1e8b8b4c (Replace the ID with a valid user ID)
Method: PUT
   {
  "email": "john.new@example.com",
  "name": "John New UPDATED",
 “password”: “12345670”,
  "age": 31,
  "city": "Los Angeles",
  "zipCode": "90001"
}
4. Partial Update User (PATCH /user/)
URL: http://localhost:5000/worko/user/60c72b2f9b1e8c2f1e8b8b4c (Replace the ID with a valid user ID)
Method: PATCH
{
  "age": 32
}
5. Delete User (DELETE /user/
)
URL: http://localhost:5000/worko/user/60c72b2f9b1e8c2f1e8b8b4c (Replace the ID with a valid user ID)
Method: DELETE

