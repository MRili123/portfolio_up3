import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { skillsData } from '../data/skills';
import { Code2, Box, Wrench, Brain } from 'lucide-react';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t.skills.languages,
      icon: Code2,
      skills: skillsData.languages,
      color: 'from-blue-600 to-blue-400'
    },
    {
      title: t.skills.frameworks,
      icon: Box,
      skills: skillsData.frameworks,
      color: 'from-teal-600 to-teal-400'
    },
    {
      title: t.skills.tools,
      icon: Wrench,
      skills: skillsData.tools,
      color: 'from-green-600 to-green-400'
    },
    {
      title: t.skills.aiml,
      icon: Brain,
      skills: skillsData.aiml,
      color: 'from-purple-600 to-purple-400'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            {t.skills.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} mb-4`}>
                  <Icon className="text-white" size={28} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {category.title}
                </h3>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skillIdx}
                      variants={item}
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
