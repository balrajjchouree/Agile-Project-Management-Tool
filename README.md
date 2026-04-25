# Agilify - Agile Project Management Tool

**Transform your team's productivity with a modern, intuitive project management platform built for agile teams.**

---

## 🎯 What's Agilify?

Agilify is a **full-stack agile project management platform** designed to help teams collaborate efficiently, track projects seamlessly, and deliver faster. Whether you're managing sprints, user stories, or complex workflows, Agilify provides the tools you need to stay organized and productive.

Built with modern technologies, it demonstrates real-world application development with proper authentication, real-time notifications, and an intuitive dashboard interface.

---

**Demo Link** : https://www.veed.io/view/1aea9a42-f435-4726-a391-93947ac15273?source=editor&panel=share

---

## ✨ Key Features

### 📊 Project Management
- **Structured Hierarchy**: Organize work into Workspaces → Projects → User Stories → Tasks
- **Smart Status Tracking**: Track progress with customizable statuses (todo, in-progress, done)
- **Priority Levels**: Assign priority levels (low, medium, high) to tasks and user stories

### 👥 Team Collaboration
- **Team Management**: Create workspaces and invite team members
- **Task Assignment**: Assign tasks to team members and track ownership
- **Shared Visibility**: All team members get real-time updates on project progress

### 🔔 Smart Notifications
- **Automatic Overdue Alerts**: Get notified when tasks exceed their due dates
- **Real-time Updates**: Instant notifications for task changes and assignments
- **Notification Dashboard**: View and manage all notifications in one place

### 📈 Dashboard Intelligence
- **Quick Overview**: See all your projects, tasks, and teams at a glance
- **Activity Feed**: Track recent changes and team activities
- **Analytics Ready**: Data structure supports easy analytics implementation

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Role-based access control for sensitive endpoints

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | Modern UI library with latest hooks |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS 4** | Utility-first CSS framework for styling |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library for UI |
| **ESLint** | Code quality and consistency |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework for REST API |
| **Sequelize** | ORM for database management |
| **SQLite** | Lightweight relational database |
| **JWT** | Secure authentication |
| **bcryptjs** | Password hashing |
| **CORS** | Cross-origin resource sharing |
| **Nodemon** | Development auto-reload |

---

## 📦 Project Architecture

```
agilify/
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   └── CheckWorkspace.jsx
│   │   ├── components/         # Reusable components
│   │   │   └── dashboard/
│   │   │       ├── Projects.jsx
│   │   │       ├── Teams.jsx
│   │   │       ├── Notifications.jsx
│   │   │       └── ProjectDetails.jsx
│   │   ├── layout/
│   │   │   └── DashboardLayout.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                     # Node.js + Express API
    ├── src/
    │   ├── models/             # Sequelize models
    │   │   ├── user.model.js
    │   │   ├── workspace.model.js
    │   │   ├── project.model.js
    │   │   ├── userStory.model.js
    │   │   ├── task.model.js
    │   │   ├── notification.model.js
    │   │   └── index.js        # Model associations
    │   ├── controllers/        # Business logic
    │   │   ├── auth.controller.js
    │   │   ├── workspace.controller.js
    │   │   ├── project.controller.js
    │   │   ├── userStory.controller.js
    │   │   ├── task.controller.js
    │   │   ├── dashboard.controller.js
    │   │   └── notification.controller.js
    │   ├── routes/            # API endpoints
    │   │   ├── auth.routes.js
    │   │   ├── workspace.routes.js
    │   │   ├── project.route.js
    │   │   ├── userStory.routes.js
    │   │   ├── task.routes.js
    │   │   ├── dashboard.routes.js
    │   │   └── notification.routes.js
    │   ├── middleware/        # Custom middleware
    │   │   └── auth.middleware.js
    │   ├── config/
    │   │   └── database.js
    │   ├── utils/
    │   │   └── cron.js        # Automatic task notifications
    │   ├── app.js
    │   └── server.js
    ├── .env
    ├── package.json
    └── database.sqlite        # SQLite database
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/balrajjchouree/Agile-Project-Management-Tool
cd Agile-Project-Management-Tool
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=4000
JWT_SECRET=YOUR_JWT_SECRET
EOF

# Start development server
npm run dev

# For production
npm start
```

Backend will run on `http://localhost:4000`

#### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:4000/api
EOF

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Frontend will run on `http://localhost:5173`

---

## 📋 API Documentation

### Authentication Endpoints

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response: { id, name, email, token }
```

**Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response: { id, name, email, token }
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <token>

Response: { id, name, email }
```

**Get All Users**
```http
GET /api/auth/users
Authorization: Bearer <token>

Response: [{ id, name, email }, ...]
```

### Workspace Endpoints

**Create Workspace**
```http
POST /api/workspaces/create-workspace
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Engineering Team",
  "logo": "https://example.com/logo.png"
}
```

**Get All Workspaces**
```http
GET /api/workspaces/all-workspace
Authorization: Bearer <token>

Response: [{ id, name, slug, logo, ownerId }, ...]
```

### Project Endpoints

**Create Project**
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mobile App",
  "description": "iOS and Android app",
  "workspaceId": "uuid",
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "projectLead": "john@example.com",
  "teamMembers": [{ name: "John", email: "john@example.com" }],
  "priority": "high"
}
```

**Get Projects**
```http
GET /api/projects/:workspaceId
Authorization: Bearer <token>

Response: [{ id, name, description, status, priority, ... }, ...]
```

### Task Endpoints

**Create Task**
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Fix login bug",
  "description": "Users unable to login with email",
  "userStoryId": "uuid",
  "priority": "high",
  "assignedTo": "user-uuid",
  "dueDate": "2024-01-15",
  "createdBy": "user-uuid"
}
```

**Update Task**
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "done",
  "priority": "medium"
}
```

**Delete Task**
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

### Dashboard Endpoints

**Get Dashboard**
```http
GET /api/dashboard
Authorization: Bearer <token>

Response: {
  totalProjects: 5,
  activeProjects: 3,
  totalTasks: 24,
  completedTasks: 8,
  overdueTasks: 2
}
```

### Notifications Endpoints

**Get Notifications**
```http
GET /api/notifications
Authorization: Bearer <token>

Response: [{ id, message, type, isRead, taskId, ... }, ...]
```

**Mark as Read**
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

---

## 🔄 How It Works

### User Flow

1. **Registration & Login**: Users create an account with email and password
2. **Workspace Creation**: Users create a workspace for their team
3. **Project Setup**: Create projects within the workspace
4. **Story & Task Management**: Break down projects into user stories and tasks
5. **Team Collaboration**: Assign tasks to team members
6. **Progress Tracking**: Update task status and track progress
7. **Notifications**: Automatic alerts for overdue tasks

### Database Schema

**User Model**
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed String)
- `timestamps` (createdAt, updatedAt)

**Workspace Model**
- `id` (UUID)
- `name` (String)
- `slug` (String, Unique)
- `logo` (String)
- `ownerId` (FK to User)

**Project Model**
- `id` (UUID)
- `name` (String)
- `description` (Text)
- `status` (active/archived)
- `priority` (low/medium/high)
- `startDate`, `endDate` (Date)
- `projectLead` (String)
- `teamMembers` (JSON Array)
- `workspaceId` (FK to Workspace)

**User Story Model**
- `id` (UUID)
- `title` (String)
- `description` (Text)
- `status` (todo/in-progress/done)
- `priority` (low/medium/high)
- `projectId` (FK to Project)

**Task Model**
- `id` (UUID)
- `title` (String)
- `description` (Text)
- `status` (todo/in-progress/done)
- `priority` (low/medium/high)
- `assignedTo` (FK to User)
- `dueDate` (Date)
- `userStoryId` (FK to User Story)
- `createdBy` (FK to User)

**Notification Model**
- `id` (UUID)
- `message` (String)
- `type` (overdue/reminder)
- `isRead` (Boolean)
- `taskId` (FK to Task)
- `userId` (FK to User)

### Cron Job System

Agilify includes an automated cron job that runs every minute to:
- Check for overdue tasks (due date < current date and status ≠ done)
- Create notification records for overdue tasks
- Prevent duplicate notifications for the same task

---

## 🎨 UI/UX Highlights

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Styling**: Tailwind CSS with gradient accents and smooth animations
- **Toast Notifications**: Real-time feedback with react-hot-toast
- **Icon Integration**: React Icons for consistent, professional UI
- **Protected Routes**: Secure dashboard access with authentication
- **Clean Navigation**: Intuitive sidebar with quick access to features

---

## 🔐 Security Features

✅ **JWT Authentication**: Secure token-based user authentication
✅ **Password Hashing**: bcryptjs with salt rounds for password security
✅ **Protected API Routes**: All sensitive endpoints require authentication middleware
✅ **CORS Configuration**: Properly configured cross-origin requests
✅ **Input Validation**: Email validation on user model
✅ **Environment Variables**: Sensitive data stored in .env files (never committed)

---

## 📊 Performance Considerations

- **SQLite Database**: Lightweight, perfect for rapid development and testing
- **Sequelize ORM**: Efficient query building and relationship management
- **Vite Build Tool**: Extremely fast development and production builds
- **Code Splitting**: React Router enables automatic code splitting
- **Lazy Loading**: Components load on demand for better performance

---

## 🚀 Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Advanced filtering and search functionality
- [ ] Project templates for faster setup
- [ ] Team roles and permissions system
- [ ] Sprint planning and backlog management
- [ ] Time tracking and burndown charts
- [ ] File attachments and comments on tasks
- [ ] Export to PDF/CSV reports
- [ ] Gantt chart visualization
- [ ] Dark mode support
- [ ] Mobile app (React Native)
- [ ] Docker containerization

---

## 📚 Development Tips

### Adding a New Feature

1. **Create Model** (if needed): `src/models/feature.model.js`
2. **Create Controller**: `src/controllers/feature.controller.js`
3. **Create Routes**: `src/routes/feature.routes.js`
4. **Add to App**: Import in `src/app.js`
5. **Create Component**: Frontend component in appropriate folder
6. **Connect to API**: Use Axios for API calls

### Code Quality

```bash
# Frontend: Run ESLint
cd frontend
npm run lint

# Fix ESLint errors
npx eslint . --fix
```

### Database Management

```bash
# Sequelize will auto-sync on server start with alter: true
# To reset database, delete database.sqlite and restart server
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
   ```bash
   git clone https://github.com/balrajjchouree/Agile-Project-Management-Tool
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code structure
   - Write clean, readable code
   - Add comments for complex logic

4. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe what you've changed
   - Explain why this change is needed
   - Reference any related issues

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check port 4000 is available
# Delete database.sqlite and try again
# Verify .env file has correct JWT_SECRET
rm database.sqlite
npm run dev
```

### Frontend can't connect to API
```bash
# Verify backend is running on port 4000
# Check VITE_API_URL in .env matches backend URL
# Clear browser cache and try again
```

### Database issues
```bash
# Sequelize auto-syncs tables, so migration is automatic
# To reset: Delete database.sqlite and restart server
```

---

## 📦 Dependencies Overview

### Why Each Dependency?

**Frontend**
- `react` & `react-dom`: Core UI framework
- `vite`: Modern, fast build tool (10x faster than webpack)
- `tailwindcss`: Utility-first CSS for rapid UI development
- `react-router-dom`: Client-side routing with nested routes
- `axios`: Promise-based HTTP client for API calls
- `react-hot-toast`: Beautiful toast notifications
- `react-icons`: Consistent icon set from multiple libraries

**Backend**
- `express`: Minimal web framework for REST APIs
- `sequelize`: Powerful ORM for database operations
- `sqlite3`: Zero-configuration database
- `jsonwebtoken`: JWT generation and verification
- `bcryptjs`: Industry-standard password hashing
- `cors`: Enable cross-origin requests safely
- `dotenv`: Manage environment variables

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Balraj Choure**

---

## 📞 Support & Feedback

Have questions or suggestions? Open an issue or reach out!

- **GitHub Issues**: [Report Issues](https://github.com/yourusername/agilify/issues)
- **Email**: balrajchoure@example.com
- **LinkedIn**: [Balraj Choure](https://linkedin.com/in/balrajchoure)

---
