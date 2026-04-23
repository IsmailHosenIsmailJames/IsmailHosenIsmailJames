"use client";

import { useState } from "react";
import initialData from "@/data/portfolio.json";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Copy, Plus, Trash2 } from "lucide-react";

interface Hero {
  name: string;
  title: string;
  avatar: string;
  description: string;
}

interface Contact {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

interface About {
  summary: string;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

interface Achievement {
  title: string;
  image: string;
}

interface PortfolioData {
  hero: Hero;
  contact: Contact;
  about: About;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
}

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData>(initialData);

  const handleCopy = async () => {
    const jsonString = JSON.stringify(data, null, 2);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(jsonString);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = jsonString;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (error) {
          console.error(error);
          toast.error("Failed to copy using fallback.");
          textArea.remove();
          return;
        }
        textArea.remove();
      }
      toast.success("JSON copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy JSON.");
    }
  };

  const handleHeroChange = (field: keyof Hero, value: string) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  const handleContactChange = (field: keyof Contact, value: string) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleAboutChange = (field: keyof About, value: string) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = () => {
    setData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index: number) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setData((prev) => {
      const newExp = [...prev.experience];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const updateExperienceDetail = (expIndex: number, detailIndex: number, value: string) => {
    setData((prev) => {
      const newExp = [...prev.experience];
      const newDetails = [...newExp[expIndex].details];
      newDetails[detailIndex] = value;
      newExp[expIndex] = { ...newExp[expIndex], details: newDetails };
      return { ...prev, experience: newExp };
    });
  };

  const addExperienceDetail = (expIndex: number) => {
    setData((prev) => {
      const newExp = [...prev.experience];
      newExp[expIndex].details = [...newExp[expIndex].details, ""];
      return { ...prev, experience: newExp };
    });
  };

  const removeExperienceDetail = (expIndex: number, detailIndex: number) => {
    setData((prev) => {
      const newExp = [...prev.experience];
      newExp[expIndex].details = newExp[expIndex].details.filter((_, i) => i !== detailIndex);
      return { ...prev, experience: newExp };
    });
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", duration: "", details: [] }],
    }));
  };

  const removeExperience = (index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newProj[index] = { ...newProj[index], [field]: value } as any;
      return { ...prev, projects: newProj };
    });
  };

  const updateProjectTech = (projIndex: number, techIndex: number, value: string) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      const newTech = [...newProj[projIndex].tech];
      newTech[techIndex] = value;
      newProj[projIndex] = { ...newProj[projIndex], tech: newTech };
      return { ...prev, projects: newProj };
    });
  };

  const addProjectTech = (projIndex: number) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      newProj[projIndex].tech = [...newProj[projIndex].tech, ""];
      return { ...prev, projects: newProj };
    });
  };

  const removeProjectTech = (projIndex: number, techIndex: number) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      newProj[projIndex].tech = newProj[projIndex].tech.filter((_, i) => i !== techIndex);
      return { ...prev, projects: newProj };
    });
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", tech: [], link: "", image: "" }],
    }));
  };

  const removeProject = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    setData((prev) => {
      const newAch = [...prev.achievements];
      newAch[index] = { ...newAch[index], [field]: value };
      return { ...prev, achievements: newAch };
    });
  };

  const addAchievement = () => {
    setData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { title: "", image: "" }],
    }));
  };

  const removeAchievement = (index: number) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-500">Portfolio Admin</h1>
            <p className="text-muted-foreground mt-2">Edit your local portfolio data and copy the JSON string.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors"
          >
            <Copy size={20} />
            Copy Updated JSON
          </motion.button>
        </header>

        <div className="space-y-10">
          {/* Hero Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">Hero Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(data.hero).map((key) => (
                <div key={key} className={key === "description" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1 capitalize">{key}</label>
                  {key === "description" ? (
                    <textarea
                      value={data.hero[key as keyof Hero]}
                      onChange={(e) => handleHeroChange(key as keyof Hero, e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all h-24"
                    />
                  ) : (
                    <input
                      type="text"
                      value={data.hero[key as keyof Hero]}
                      onChange={(e) => handleHeroChange(key as keyof Hero, e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(data.contact).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-muted-foreground mb-1 capitalize">{key}</label>
                  <input
                    type="text"
                    value={data.contact[key as keyof Contact]}
                    onChange={(e) => handleContactChange(key as keyof Contact, e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b border-border pb-2">About</h2>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Summary</label>
              <textarea
                value={data.about.summary}
                onChange={(e) => handleAboutChange("summary", e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all h-32"
              />
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h2 className="text-xl font-semibold">Skills</h2>
              <button onClick={addSkill} className="text-emerald-500 hover:text-emerald-600 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-background border border-input rounded-full pl-4 pr-1 py-1 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    className="bg-transparent outline-none w-24 sm:w-32 text-sm"
                  />
                  <button onClick={() => removeSkill(index)} className="text-muted-foreground hover:text-red-500 p-1 rounded-full transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h2 className="text-xl font-semibold">Experience</h2>
              <button onClick={addExperience} className="text-emerald-500 hover:text-emerald-600 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-background relative">
                  <button onClick={() => removeExperience(index)} className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(index, "role", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(index, "duration", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs text-muted-foreground">Details / Responsibilities</label>
                      <button onClick={() => addExperienceDetail(index)} className="text-emerald-500 hover:text-emerald-600 text-xs flex items-center gap-1">
                        <Plus size={12} /> Add Detail
                      </button>
                    </div>
                    <div className="space-y-2">
                      {exp.details.map((detail, dIndex) => (
                        <div key={dIndex} className="flex items-start gap-2">
                          <textarea
                            value={detail}
                            onChange={(e) => updateExperienceDetail(index, dIndex, e.target.value)}
                            className="flex-1 px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm h-16"
                          />
                          <button onClick={() => removeExperienceDetail(index, dIndex)} className="text-muted-foreground hover:text-red-500 mt-2">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h2 className="text-xl font-semibold">Projects</h2>
              <button onClick={addProject} className="text-emerald-500 hover:text-emerald-600 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add Project
              </button>
            </div>
            <div className="space-y-6">
              {data.projects.map((proj, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-background relative">
                  <button onClick={() => removeProject(index)} className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Link</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => updateProject(index, "link", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Image URL</label>
                      <input
                        type="text"
                        value={proj.image}
                        onChange={(e) => updateProject(index, "image", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-muted-foreground mb-1">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm h-20"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs text-muted-foreground">Technologies Used</label>
                      <button onClick={() => addProjectTech(index)} className="text-emerald-500 hover:text-emerald-600 text-xs flex items-center gap-1">
                        <Plus size={12} /> Add Tech
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t, tIndex) => (
                        <div key={tIndex} className="flex items-center gap-1 bg-card border border-input rounded-full pl-3 pr-1 py-1">
                          <input
                            type="text"
                            value={t}
                            onChange={(e) => updateProjectTech(index, tIndex, e.target.value)}
                            className="bg-transparent outline-none w-20 text-xs"
                          />
                          <button onClick={() => removeProjectTech(index, tIndex)} className="text-muted-foreground hover:text-red-500 p-0.5 rounded-full">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <button onClick={addAchievement} className="text-emerald-500 hover:text-emerald-600 flex items-center gap-1 text-sm font-medium">
                <Plus size={16} /> Add Achievement
              </button>
            </div>
            <div className="space-y-4">
              {data.achievements.map((ach, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-background relative">
                  <button onClick={() => removeAchievement(index)} className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <div className="flex-1 grid grid-cols-1 gap-4 pr-8">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Title</label>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => updateAchievement(index, "title", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-1">Image URL</label>
                      <input
                        type="text"
                        value={ach.image}
                        onChange={(e) => updateAchievement(index, "image", e.target.value)}
                        className="w-full px-3 py-1.5 rounded bg-card border border-input focus:border-emerald-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Bottom Copy Button for convenience */}
        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-colors text-lg"
          >
            <Copy size={24} />
            Copy Updated JSON
          </motion.button>
        </div>

      </div>
    </div>
  );
}
