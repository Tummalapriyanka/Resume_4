
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import Login from "@/components/Login";
import EmployerDashboard from "@/components/EmployerDashboard";
import JobSeekerDashboard from "@/components/JobSeekerDashboard";

function App() {
  const [userType, setUserType] = useState(null);

  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen gradient-bg"
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <Login 
                onLogin={(type) => setUserType(type)} 
              />
            } 
          />
          <Route 
            path="/employer" 
            element={
              userType === 'employer' ? 
                <EmployerDashboard /> : 
                <Navigate to="/" />
            } 
          />
          <Route 
            path="/jobseeker" 
            element={
              userType === 'jobseeker' ? 
                <JobSeekerDashboard /> : 
                <Navigate to="/" />
            } 
          />
        </Routes>
        <Toaster />
      </motion.div>
    </Router>
  );
}

export default App;
