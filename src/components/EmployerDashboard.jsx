
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Plus, Briefcase, Users } from "lucide-react";

function EmployerDashboard() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      requirements: ["React", "TypeScript", "5+ years experience"],
      applicants: 12
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      requirements: ["Node.js", "React", "MongoDB"],
      applicants: 8
    }
  ]);

  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    requirements: ""
  });

  const handleAddJob = (e) => {
    e.preventDefault();
    
    if (!newJob.title || !newJob.requirements) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const requirements = newJob.requirements.split(",").map(req => req.trim());
    
    setJobs([...jobs, {
      id: jobs.length + 1,
      title: newJob.title,
      requirements,
      applicants: 0
    }]);

    setNewJob({ title: "", requirements: "" });
    setShowNewJobForm(false);

    toast({
      title: "Success",
      description: "Job posting added successfully!"
    });
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Employer Dashboard</h1>
            <Button onClick={() => setShowNewJobForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Post New Job
            </Button>
          </div>

          {showNewJobForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">New Job Posting</h2>
              <form onSubmit={handleAddJob} className="space-y-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Requirements (comma-separated)"
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300"
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                />
                <div className="flex gap-4">
                  <Button type="submit">Add Job</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowNewJobForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <div className="flex items-center text-gray-300 mt-1">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                  <Button variant="secondary">View Applicants</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EmployerDashboard;
