
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Database, BarChart as ChartBar, Code, Cloud, Wrench as Tool, TestTube, ChevronRight } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { skillCategories } from "@/utils/skillsExtractor";
import { extractSkillsFromText } from "@/utils/skillsExtractor";
import { getMatchedJobs } from "@/utils/jobMatching";
import JobDetailsModal from "@/components/JobDetailsModal";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function JobSeekerDashboard() {
  const { toast } = useToast();
  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      let extractedText = '';
      
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedText += textContent.items.map(item => item.str).join(' ');
        }
      } else if (file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast({
          title: "Notice",
          description: "DOC/DOCX parsing is limited. For best results, please upload a PDF.",
        });
        
        const text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(file);
        });
        extractedText = text;
      }

      const extractedSkills = extractSkillsFromText(extractedText);
      setSkills(extractedSkills);
      setResume(file);

      const jobMatches = getMatchedJobs(extractedSkills);
      setMatchedJobs(jobMatches);

      toast({
        title: "Success",
        description: `Resume analyzed successfully! Found ${extractedSkills.length} skills.`,
      });
    } catch (error) {
      console.error('Error processing resume:', error);
      toast({
        title: "Error",
        description: "Failed to process resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderSkillCategory = (category, categorySkills) => (
    <div key={category} className="glass-card p-4 rounded-lg">
      <div className="flex items-center mb-3">
        {category === "programming" && <Code className="w-5 h-5 mr-2 text-blue-400" />}
        {category === "databases" && <Database className="w-5 h-5 mr-2 text-green-400" />}
        {category === "cloud" && <Cloud className="w-5 h-5 mr-2 text-purple-400" />}
        {category === "tools" && <Tool className="w-5 h-5 mr-2 text-orange-400" />}
        {category === "dataScience" && <ChartBar className="w-5 h-5 mr-2 text-pink-400" />}
        {category === "visualization" && <FileText className="w-5 h-5 mr-2 text-yellow-400" />}
        {category === "testing" && <TestTube className="w-5 h-5 mr-2 text-red-400" />}
        <h3 className="text-lg font-semibold text-white capitalize">
          {category.replace(/([A-Z])/g, ' $1').trim()}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {categorySkills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-white text-sm ${
              skills.includes(skill) 
                ? "bg-green-500 bg-opacity-40" 
                : "bg-white bg-opacity-20"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Job Seeker Dashboard</h1>
          
          <div className="space-y-6">
            <div className="relative">
              <input
                type="file"
                onChange={handleResumeUpload}
                className="hidden"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                disabled={isProcessing}
              />
              <label
                htmlFor="resume-upload"
                className={`flex items-center justify-center p-8 border-2 border-dashed border-white border-opacity-50 rounded-lg cursor-pointer hover:border-opacity-75 transition-all ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="text-center text-white">
                  <Upload className={`w-12 h-12 mx-auto mb-2 ${isProcessing ? 'animate-bounce' : ''}`} />
                  <p className="text-lg font-medium">
                    {isProcessing ? 'Processing...' : 'Upload your resume'}
                  </p>
                  <p className="text-sm opacity-75">PDF, DOC, or DOCX</p>
                </div>
              </label>
            </div>

            {resume && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white mb-4">Extracted Skills</h2>
                  {Object.entries(skillCategories).map(([category, categorySkills]) => 
                    renderSkillCategory(category, categorySkills)
                  )}
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Matched Jobs</h2>
                  <div className="space-y-4">
                    {matchedJobs.map((job, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer"
                        onClick={() => setSelectedJob(job)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-white font-medium">{job.title}</h3>
                            <p className="text-gray-300">{job.company}</p>
                            <p className="text-gray-400 text-sm mt-1">{job.description}</p>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right mr-4">
                              <div className="text-2xl font-bold text-white">{job.match}%</div>
                              <div className="text-sm text-gray-300">Match</div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.requiredSkills.map((skill, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-sm ${
                                skills.includes(skill)
                                  ? "bg-green-500 bg-opacity-40 text-white"
                                  : "bg-white bg-opacity-20 text-white"
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default JobSeekerDashboard;
