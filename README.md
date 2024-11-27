Project Overview
The goal of this project is to demonstrate how to build a modern and scalable authentication system with a user-friendly interface. The backend uses Express.js and MongoDB for server-side operations and data storage. The frontend is developed with React for building interactive and responsive web pages.

Features
Registration and Login:
User-friendly forms for registration and login.
Validation and error handling for input fields.
Dashboard:
Displays personalized content for logged-in users.
Profile Management:
Users can view and update their profile information.
Logout Confirmation:
Users see a confirmation message when logging out.
Responsive Navbar:
Dynamic links for navigation between pages.
Technologies Used
Frontend
React: For creating dynamic, component-based UIs.
React Router: For navigation and routing.
CSS Modules: For scoped and modular styles.
Axios: For API communication.
Backend
Node.js: JavaScript runtime for building scalable applications.
Express.js: Minimal framework for API development.
MongoDB: NoSQL database for efficient data storage.


Features in Detail
Login Page
Users can log in with their email and password.
Validates inputs and shows error messages for incorrect data.
On successful login, users are redirected to the dashboard.
Registration Page
New users can create accounts with an email and password.
Ensures password strength and validates email format.
Displays success messages upon registration.
Dashboard
Displays personalized content for authenticated users.
Includes links to navigate to the profile and logout.
Profile Page
Shows the user’s email, name, and other details.
Allows users to update their profile information.
Logout Confirmation
Shows a confirmation message upon successful logout.
Redirects to the login page.
Navbar
Contains dynamic links:
Home: Redirects to the main page.
Profile: Takes the user to their profile page.
Logout: Logs out the user and shows a confirmation.
API Endpoints
Authentication
POST /api/user/login: Authenticates users .
POST /api/user/register: Registers a new user.
User Management
GET /api/user/profile: Fetches user profile data .
PUT /api/user/profile: Updates user profile details .
Login Page
Registration Page
Dashboard
Profile Page


License
This project is licensed under the MIT License.
