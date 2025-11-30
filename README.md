# CodeBin

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://mongodb.com/)

A modern, full-stack code snippet sharing platform built with React and Node.js. Share, store, and manage your code snippets with syntax highlighting, user authentication, and automatic expiration.

🌐 **Live Demo**: [TheCodeBin](https://thecodebin.vercel.app)

## 🚀 Features

- **User Authentication**: Secure signup/signin with JWT tokens
- **Code Snippet Management**: Create, view, edit, and delete code snippets
- **Multi-language Support**: Syntax highlighting for Python, JavaScript, Java, C++, and more
- **Automatic Expiration**: Set snippets to expire after 10m, 30m, 1h, 1d, 1w, or never
- **Short URLs**: Easy-to-share short IDs for each snippet
- **Responsive Design**: Modern UI built with React and TailwindCSS
- **Real-time Feedback**: Toast notifications for user actions

## 📸 Screenshots

<!-- Add screenshots of your application here -->
*Screenshots will be added here once the application is deployed*

## 📁 Project Structure

```
codebin/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── db/             # Database models and connection
│   │   ├── middleware/     # Custom middleware
│   │   ├── routes/         # API routes
│   │   ├── validations/    # Zod validation schemas
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand state management
│   │   ├── lib/            # Utilities and configurations
│   │   └── ui/             # UI component library
│   ├── public/             # Static assets
│   └── package.json
├── package.json            # Root package.json
└── README.md               # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and development server
- **TailwindCSS** - Styling framework
- **CodeMirror** - Code editor with syntax highlighting
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Zod** - Input validation
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## ⚡ Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/kartik-py12/codebin.git
   cd codebin
   npm install
   cd backend && npm install
   cd ../frontend && npm install && cd ..
   ```

2. **Set up environment**
   ```bash
   cd backend
   cp .env.example .env  # Create this if needed
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && npx nodemon src/server.js
   
   # Terminal 2 - Frontend  
   cd frontend && npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kartik-py12/codebin.git
   cd codebin
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## ⚙️ Environment Setup

1. **Create environment file for backend**
   ```bash
   cd backend
   touch .env
   ```

2. **Add the following environment variables to `backend/.env`:**
   ```env
   MONGO_URI=mongodb://localhost:27017/codebin
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/codebin
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npx nodemon src/server.js
   ```
   Backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend server**
   ```bash
   cd backend
   node src/server.js
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account.
```json
{
  "username": "string (3-64 chars)",
  "email": "string (valid email)",
  "password": "string (6-64 chars, must contain uppercase, number, special char)"
}
```

#### POST `/api/auth/signin`
Sign in with existing credentials.
```json
{
  "username": "string",
  "password": "string"
}
```

#### POST `/api/auth/logout`
Sign out the current user (requires authentication).

#### GET `/api/auth/me`
Get current user information (requires authentication).

### Snippet Endpoints

#### POST `/api/snippet/create/:shortId`
Create a new code snippet (requires authentication).
```json
{
  "title": "string (max 100 chars)",
  "content": "string (required)",
  "language": "string (default: plaintext)",
  "expiryTime": "10m|30m|1h|1d|1w|never (optional)"
}
```

#### GET `/api/snippet/:shortId`
Get a specific snippet by its short ID.

#### GET `/api/snippet/all`
Get all snippets for the authenticated user (requires authentication).

#### PUT `/api/snippet/:shortId`
Update an existing snippet (requires authentication). At least one field must be provided.
```json
{
  "title": "string (max 100 chars, optional)",
  "content": "string (optional)",
  "language": "string (optional)",
  "expiryTime": "10m|30m|1h|1d|1w|never (optional)"
}
```

#### DELETE `/api/snippet/:shortId`
Delete a snippet (requires authentication).

## 🎯 Usage

1. **Sign Up/Sign In**: Create an account or sign in with existing credentials
2. **Create Snippet**: Click "New Snippet" to create a code snippet
3. **Choose Language**: Select the programming language for syntax highlighting
4. **Set Expiration**: Choose when the snippet should expire
5. **Share**: Use the generated short URL to share your snippet
6. **Manage**: View, edit, or delete your snippets from your profile

## 🔧 Troubleshooting

### Common Issues

1. **Backend fails to start**
   - Ensure MongoDB is running
   - Check that the .env file is properly configured
   - Verify all dependencies are installed

2. **Frontend can't connect to backend**
   - Ensure backend is running on port 3000
   - Check CORS configuration in backend/src/server.js
   - Verify frontend is running on port 5173

3. **Build fails**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version (requires v18+)

4. **Database connection issues**
   - Verify MongoDB connection string in .env
   - Check MongoDB service is running
   - For MongoDB Atlas, verify network access and credentials

### Development Tips

- Use `npx nodemon src/server.js` for backend hot-reload during development
- Frontend automatically reloads when files change
- Check browser console for client-side errors
- Check terminal output for server-side errors

## 📱 Supported Languages

- JavaScript
- Python
- Java
- C++
- Plain Text
- And more...

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Known Issues

- Server may take a few seconds to wake up on first load (hosting limitation)
- CORS is configured for localhost:5173 in development

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing [Issues](https://github.com/kartik-py12/codebin/issues)
2. Create a new issue if your problem isn't already reported
3. Include detailed information about your environment and the steps to reproduce

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by Pastebin and similar code sharing platforms
- Thanks to all contributors and the open-source community

---

**Happy Coding!** 🎉
