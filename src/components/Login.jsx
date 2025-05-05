
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password || !selectedType) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, we'll just simulate a successful login
    onLogin(selectedType);
    navigate(selectedType === "employer" ? "/employer" : "/jobseeker");
    
    toast({
      title: "Success",
      description: "Logged in successfully!",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-8 w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Job Matcher</h2>
          <p className="text-gray-200">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant={selectedType === "employer" ? "default" : "secondary"}
              className="flex-1"
              onClick={() => setSelectedType("employer")}
            >
              Employer
            </Button>
            <Button
              type="button"
              variant={selectedType === "jobseeker" ? "default" : "secondary"}
              className="flex-1"
              onClick={() => setSelectedType("jobseeker")}
            >
              Job Seeker
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
