
import React from "react";
import { motion } from "framer-motion";
import { X, Clock, CheckCircle, Users } from "lucide-react";

function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{job.title}</h2>
            <p className="text-gray-400">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Match Details</h3>
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-green-400">{job.match}%</div>
              <div className="text-gray-400">Resume Match</div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Shortlist Criteria: {job.examPattern.shortlistCriteria}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-blue-500 bg-opacity-20 text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 mr-2 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Interview Process ({job.examPattern.totalRounds} Rounds)
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Average Time to Complete: {job.examPattern.averageTimeToComplete}
            </p>
            <div className="space-y-4">
              {job.examPattern.rounds.map((round, index) => (
                <div
                  key={index}
                  className="glass-card p-4 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">
                        Round {index + 1}: {round.name}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        {round.description}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {round.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default JobDetailsModal;
