
import React from "react";

export const jobPositions = [
  {
    title: "Software Development Engineer",
    company: "Amazon",
    requiredSkills: ["Java", "Python", "SQL", "Git", "Data Structures"],
    description: "Join Amazon's world-class engineering team",
    examPattern: {
      rounds: [
        {
          name: "Online Assessment",
          description: "2 coding questions (Data Structures & Algorithms)",
          duration: "90 minutes"
        },
        {
          name: "Technical Interview 1",
          description: "System Design & Problem Solving",
          duration: "60 minutes"
        },
        {
          name: "Technical Interview 2",
          description: "Data Structures, Algorithms & Coding",
          duration: "60 minutes"
        },
        {
          name: "Bar Raiser Interview",
          description: "Leadership Principles & Technical Deep Dive",
          duration: "45 minutes"
        }
      ],
      totalRounds: 4,
      averageTimeToComplete: "4-5 weeks",
      shortlistCriteria: "85% resume match required"
    }
  },
  {
    title: "Frontend Software Engineer",
    company: "Google",
    requiredSkills: ["JavaScript", "React", "HTML", "CSS", "System Design"],
    description: "Build next-generation web applications",
    examPattern: {
      rounds: [
        {
          name: "Online Coding Challenge",
          description: "JavaScript & Problem Solving",
          duration: "60 minutes"
        },
        {
          name: "Technical Phone Screen",
          description: "Data Structures & Algorithms",
          duration: "45 minutes"
        },
        {
          name: "Onsite - Coding",
          description: "4-5 coding interviews",
          duration: "45 minutes each"
        },
        {
          name: "Onsite - System Design",
          description: "Frontend System Design Discussion",
          duration: "60 minutes"
        }
      ],
      totalRounds: 4,
      averageTimeToComplete: "6-8 weeks",
      shortlistCriteria: "80% resume match required"
    }
  },
  {
    title: "Data Scientist",
    company: "Microsoft",
    requiredSkills: ["Python", "SQL", "NumPy", "Pandas", "Machine Learning"],
    description: "Drive data-driven decisions at Microsoft",
    examPattern: {
      rounds: [
        {
          name: "Technical Assessment",
          description: "Python, SQL & Statistics",
          duration: "120 minutes"
        },
        {
          name: "Machine Learning Round",
          description: "ML Concepts & Implementation",
          duration: "60 minutes"
        },
        {
          name: "Case Study",
          description: "Real-world Problem Solving",
          duration: "90 minutes"
        },
        {
          name: "Team Fit",
          description: "Behavioral & Culture Fit",
          duration: "45 minutes"
        }
      ],
      totalRounds: 4,
      averageTimeToComplete: "3-4 weeks",
      shortlistCriteria: "75% resume match required"
    }
  },
  {
    title: "Full Stack Developer",
    company: "Meta",
    requiredSkills: ["React", "Node.js", "Python", "SQL", "System Design"],
    description: "Build scalable solutions at Meta",
    examPattern: {
      rounds: [
        {
          name: "Initial Screen",
          description: "Coding & Problem Solving",
          duration: "60 minutes"
        },
        {
          name: "Technical Deep Dive",
          description: "Architecture & System Design",
          duration: "45 minutes"
        },
        {
          name: "Full Stack Challenge",
          description: "End-to-end Implementation",
          duration: "120 minutes"
        },
        {
          name: "Manager Round",
          description: "Project Discussion & Team Fit",
          duration: "45 minutes"
        }
      ],
      totalRounds: 4,
      averageTimeToComplete: "4-6 weeks",
      shortlistCriteria: "80% resume match required"
    }
  }
];

export const calculateMatchPercentage = (candidateSkills, requiredSkills) => {
  const matchedSkills = requiredSkills.filter(skill => 
    candidateSkills.includes(skill)
  );
  return Math.round((matchedSkills.length / requiredSkills.length) * 100);
};

export const getMatchedJobs = (extractedSkills) => {
  return jobPositions
    .map(job => ({
      ...job,
      match: calculateMatchPercentage(extractedSkills, job.requiredSkills)
    }))
    .sort((a, b) => b.match - a.match);
};
