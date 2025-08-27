# Vienna Recipe App

Vienna is a full-stack mobile recipe application designed for food enthusiasts to discover, share, and manage recipes. It includes social features, personalization options, and a shopping list utility. The application is built with a React Native frontend and a Node.js/Express backend.

## Key Features

- **User Authentication**: Secure user registration and login.
- **Recipe Management**: Create, view, edit, and delete personal recipes.
- **Discover & Search**:
    - Search for recipes by name.
    - Find recipes based on the ingredients you have.
    - Filter recipes by category.
- **Social Networking**:
    - Follow/unfollow other users.
    - Like and review recipes.
    - View other users' profiles and their created/liked recipes.
- **Personalization**:
    - Set personal dietary restrictions and allergens.
    - Get recipe recommendations based on your preferences.
- **Shopping List**: Automatically generate a shopping list from recipe ingredients.
- **Notifications**: Get notified about new followers, likes, and reviews.

## Tech Stack

- **Frontend**:
    - React Native
    - Expo
    - Tailwind CSS
- **Backend**:
    - Node.js
    - Express.js
- **Database**: (Assumed) MongoDB / PostgreSQL or other relational/NoSQL database.

## Project Structure

The project is organized into two main parts: the frontend application and the backend API.

```
Vienna-app-final/
├── api/                # Backend Node.js/Express application
│   ├── controllers/    # Request handlers
│   ├── models/         # Database schemas/models
│   └── routes/         # API endpoint definitions
├── assets/             # Static assets (images, icons)
├── components/         # Reusable React Native components
├── navigation/         # Stack and Tab navigators for screen transitions
├── screens/            # Main application screens
└── ...                 # Root configuration for the React Native app
```

## Getting Started

### Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- A running database instance (e.g., MongoDB, PostgreSQL)

### Backend Setup

1.  **Navigate to the API directory:**
    ```bash
    cd api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `api` directory and add the necessary environment variables.
    ```env
    PORT=3000
    DATABASE_URL=your_database_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Start the backend server:**
    ```bash
    npm start
    ```

### Frontend Setup

1.  **Navigate to the project root directory.**

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the API endpoint:**
    Open `config.js` and update the `API_BASE_URL` to point to your running backend server (e.g., `http://localhost:3000`).

4.  **Start the frontend application:**
    ```bash
    npx expo start
    ```
    This will open the Metro bundler. You can then run the app on an Android emulator, iOS simulator, or on your physical device using the Expo Go app.

## License

This project is licensed under the MIT License.
