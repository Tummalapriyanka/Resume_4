
export const skillCategories = {
  programming: ["Python", "Java", "HTML", "CSS", "JavaScript", "PHP"],
  databases: ["SQL", "MySQL", "NoSQL", "Relational Database"],
  cloud: ["Microsoft Azure", "AWS", "Google Cloud"],
  tools: ["VScode", "Git", "Github", "Figma"],
  dataScience: ["NumPy", "Pandas", "Regression", "Classification"],
  visualization: ["Matplotlib", "Seaborn", "Power BI", "Tableau"],
  testing: ["Unit Testing", "Integration Testing", "QA", "Testing"]
};

export const extractSkillsFromText = (text) => {
  const foundSkills = new Set();
  const words = text.toLowerCase().split(/[\s,\.;:\(\)\[\]\{\}]+/);
  
  const allSkills = Object.values(skillCategories).flat();
  
  allSkills.forEach(skill => {
    if (words.includes(skill.toLowerCase())) {
      foundSkills.add(skill);
    }
  });

  return Array.from(foundSkills);
};
