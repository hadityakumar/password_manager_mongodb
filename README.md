# PassOP

[PassOP](https://hadityakumar.github.io/Password_Manager_Local/) is a secure and efficient password manager built using the React Vite framework. It saves passwords in a MongoDB database and uses Node.js with Express for the backend.

## Features

- **React with Vite** for the frontend.
- **Node.js and Express** for the backend.
- **MongoDB** for storing passwords securely.
- **User Authentication** for secure access to stored passwords.
- **Password Encryption** to ensure data security.

## Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## Project Structure

.
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── app.js
│ └── config.js
├── frontend
│ ├── public
│ ├── src
│ ├── index.html
│ └── vite.config.js
└── README.md


## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd Password_Manager_Local
    ```

2. Install frontend dependencies:
    ```sh
    cd frontend
    yarn install
    ```

3. Install backend dependencies:
    ```sh
    cd backend
    yarn install
    ```

4. Set up the environment variables:
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. Run the frontend:
    ```sh
    cd frontend
    yarn dev
    ```

6. Run the backend:
    ```sh
    cd backend
    node app.js
    ```

## Usage

1. Open the application in your browser.
2. Sign up or log in to your account.
3. Add, view, edit, or delete your passwords securely.

## Deployment

This project is deployed and can be accessed [here](https://hadityakumar.github.io/Password_Manager_Local/).

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any changes.

## Contact

For any inquiries, please reach out to [hadityakumar](https://www.linkedin.com/in/hadityakumar/).

---
