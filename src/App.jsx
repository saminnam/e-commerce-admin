import React from "react";
import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import PublicRoute from "./utils/PublicRoute";
// import ProtectedRoute from "./utils/ProtectedRoute";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import AddUser from "./pages/AddUser";
import AddBlog from "./pages/blogs/AddBlog";
import ManageBlogs from "./pages/blogs/ManageBlogs";

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        /> */}
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            // <ProtectedRoute>
            <DashboardLayout>
              <AddUser />
            </DashboardLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/user-list"
          element={
            // <ProtectedRoute>
            <DashboardLayout>
              <ManageUsers />
            </DashboardLayout>
            // </ProtectedRoute>
          }
        />

        <Route
          path="/add-blog"
          element={
            // <ProtectedRoute>
            <DashboardLayout>
              <AddBlog />
            </DashboardLayout>
            // </ProtectedRoute>
          }
        />

        <Route
          path="/blog-list"
          element={
            // <ProtectedRoute>
            <DashboardLayout>
              <ManageBlogs />
            </DashboardLayout>
            // </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
