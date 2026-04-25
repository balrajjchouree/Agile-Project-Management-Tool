import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./routes/ProtectedRoute";
import CheckWorkspace from "./pages/CheckWorkspace";
import CreateWorkspace from "./pages/CreateWorkspace";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/DashboardPage";
import Projects from "./components/dashboard/Projects";
import Teams from "./components/dashboard/Teams";
import Notifications from "./components/dashboard/Notifications";
import ProjectDetails from "./components/dashboard/ProjectDetails";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#4c1d95",
            color: "#fff",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="teams" element={<Teams />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
          </Route>

          <Route
            path="/check-workspace"
            element={
              <ProtectedRoute>
                <CheckWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-workspace"
            element={
              <ProtectedRoute>
                <CreateWorkspace />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
