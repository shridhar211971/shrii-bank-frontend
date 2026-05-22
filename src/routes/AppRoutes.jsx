import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Home from "../pages/dashboard/Home";

import Transactions from "../pages/transactions/Transactions";

import Transfer from "../pages/transfer/Transfer";

import Profile from "../pages/profile/Profile";

import AuditorDashboard from "../pages/auditor/AuditorDashboard";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {

  return (

    <Routes>

      {/* PUBLIC ROUTES */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* PRIVATE ROUTES */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />

      <Route
        path="/transfer"
        element={
          <PrivateRoute>
            <Transfer />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/auditor"
        element={
          <PrivateRoute allowedRoles={["ADMIN", "AUDITOR"]}>
            <AuditorDashboard />
          </PrivateRoute>
        }
      />

      {/* DEFAULT */}

      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>
  );
};

export default AppRoutes;