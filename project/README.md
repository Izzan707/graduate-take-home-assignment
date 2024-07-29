Full-Stack Web Application

## Description
This repository contains a solution to a coding challenge that involves designing both a frontend web application and a backend API. The project is divided into two main parts:

- Frontend Application (UI only): A web application built with React.js that includes user registration, login, logout, and a profile page where users can update and save their "About Me" section as either a draft or submit it.
- Backend API: A Node.js server connected to a MySQL database to handle user registration and login. The backend allows users to register, login, and logout.
Features

## Frontend Application
User Registration: A registration form to create a new user.
Login & Logout: A login form to authenticate users and a logout button to end the session.
User Profile: A profile page where users can update their information and manage their "About Me" section.
Draft & Submit: Users can save their "About Me" section as a draft or submit it.

## Backend API
User Registration: API endpoint to register a new user with hashed passwords.
User Login: API endpoint to authenticate users and return a JWT token.
User Logout: Simple logout mechanism to invalidate the session.

## Table of Contents

- [Builds](#builds)
- [Useful Links](#useful-links)

#### Install

`cd` to project's dir and run `npm install`

### Builds

Build are handled by Next.js CLI &mdash; [Info](https://nextjs.org/docs/api-reference/cli)

#### Run FrontEnd

```
npm run dev
```

#### Run BackEnd in Local Server

```
node app.js
```

## Useful Links

- [JustBoil.me](https://justboil.me/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js Docs](https://nextjs.org/docs/getting-started)
- [React.js Docs](https://reactjs.org/docs/getting-started.html)
- [Redux Docs](https://redux.js.org/introduction/getting-started) & [React-Redux Docs](https://react-redux.js.org/introduction/getting-started)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [TypeScript ESLint Docs](https://typescript-eslint.io/docs/)

## Contributing
Contributions are welcome! Please create an issue or submit a pull request for any feature requests, bugs, or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
