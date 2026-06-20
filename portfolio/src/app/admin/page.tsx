"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import defaultData from "@/data/portfolio.json";
import type { PortfolioData } from "@/types/portfolio";

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData | null>(null);

      useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(defaultData as PortfolioData);
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleCopyJson = async () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      toast.success("JSON copied to clipboard!");
    } catch (err) {
      // Fallback
      try {
        const textArea = document.createElement("textarea");
        textArea.value = JSON.stringify(data, null, 2);
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("JSON copied to clipboard!");
      } catch (fallbackErr) {
        toast.error("Failed to copy to clipboard.");
        console.error(err, fallbackErr);
      }
    }
  };

  // Helper type for dynamic assignment
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateSection = (section: keyof PortfolioData, field: string, value: any) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  const updateSocial = (field: string, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        hero: {
          ...prev.hero,
          social: {
            ...prev.hero.social,
            [field]: value,
          },
        },
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateArrayItem = (section: 'projects' | 'experience' | 'achievements', index: number, field: string, value: any) => {
    setData((prev) => {
      if (!prev) return prev;
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return {
        ...prev,
        [section]: newArray,
      };
    });
  };

  const removeArrayItem = (section: 'projects' | 'experience' | 'achievements', index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [section]: newArray,
      };
    });
  };

  const addProject = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        projects: [
          ...prev.projects,
          { id: Date.now().toString(), title: "New Project", description: "", imageUrl: "", tags: [] },
        ],
      };
    });
  };

  const addExperience = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experience: [
          ...prev.experience,
          { id: Date.now().toString(), role: "New Role", company: "", duration: "", description: "" },
        ],
      };
    });
  };

  const addAchievement = () => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        achievements: [
          ...prev.achievements,
          { id: Date.now().toString(), title: "New Achievement", date: "", description: "" },
        ],
      };
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-emerald-500 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>
        <button
          onClick={handleCopyJson}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Save size={20} />
          Copy Updated JSON
        </button>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-emerald-500">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={data.hero.name}
                onChange={(e) => updateSection("hero", "name", e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Role</label>
              <input
                type="text"
                value={data.hero.role}
                onChange={(e) => updateSection("hero", "role", e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tagline</label>
              <textarea
                value={data.hero.tagline}
                onChange={(e) => updateSection("hero", "tagline", e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">GitHub URL</label>
              <input
                type="text"
                value={data.hero.social?.github || ""}
                onChange={(e) => updateSocial("github", e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">LinkedIn URL</label>
              <input
                type="text"
                value={data.hero.social?.linkedin || ""}
                onChange={(e) => updateSocial("linkedin", e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-emerald-500">About Me</h2>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              value={data.about.description}
              onChange={(e) => updateSection("about", "description", e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-emerald-500 outline-none h-32"
            />
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-500">Projects</h2>
            <button
              onClick={addProject}
              className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl relative group">
                <button
                  onClick={() => removeArrayItem('projects', index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%]">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateArrayItem("projects", index, "title", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Image URL</label>
                    <input
                      type="text"
                      value={project.imageUrl}
                      onChange={(e) => updateArrayItem("projects", index, "imageUrl", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1 text-gray-500">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateArrayItem("projects", index, "description", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500 h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={project.tags.join(", ")}
                      onChange={(e) => updateArrayItem("projects", index, "tags", e.target.value.split(","))}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                       <label className="block text-xs font-medium mb-1 text-gray-500">GitHub URL</label>
                       <input
                        type="text"
                        value={project.githubUrl || ""}
                        onChange={(e) => updateArrayItem("projects", index, "githubUrl", e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="flex-1">
                       <label className="block text-xs font-medium mb-1 text-gray-500">Live URL</label>
                       <input
                        type="text"
                        value={project.liveUrl || ""}
                        onChange={(e) => updateArrayItem("projects", index, "liveUrl", e.target.value)}
                        className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-500">Experience</h2>
            <button
              onClick={addExperience}
              className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl relative group">
                <button
                  onClick={() => removeArrayItem('experience', index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%]">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Role</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateArrayItem("experience", index, "role", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateArrayItem("experience", index, "company", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateArrayItem("experience", index, "duration", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1 text-gray-500">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateArrayItem("experience", index, "description", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500 h-20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-500">Achievements</h2>
            <button
              onClick={addAchievement}
              className="flex items-center gap-1 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} /> Add Achievement
            </button>
          </div>
          <div className="space-y-6">
             {data.achievements.map((achievement, index) => (
              <div key={achievement.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl relative group">
                <button
                  onClick={() => removeArrayItem('achievements', index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%]">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Title</label>
                    <input
                      type="text"
                      value={achievement.title}
                      onChange={(e) => updateArrayItem("achievements", index, "title", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-500">Date</label>
                    <input
                      type="text"
                      value={achievement.date}
                      onChange={(e) => updateArrayItem("achievements", index, "date", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-1 text-gray-500">Description</label>
                    <textarea
                      value={achievement.description}
                      onChange={(e) => updateArrayItem("achievements", index, "description", e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm outline-none focus:border-emerald-500 h-20"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
