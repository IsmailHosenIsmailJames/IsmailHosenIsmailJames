"use client";

import { useState } from "react";
import portfolioDataRaw from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData>(portfolioDataRaw as PortfolioData);

  const handleNestedChange = (section: keyof PortfolioData, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as unknown as Record<string, unknown>),
        [field]: value,
      },
    }));
  };

  const handleSkillsChange = (value: string) => {
    setData((prev) => ({ ...prev, skills: value.split(",").map(s => s.trim()) }));
  };

  const handleArrayChange = (section: 'experience' | 'projects' | 'achievements', index: number, field: string, value: string) => {
    setData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...prev[section]] as any[];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const addArrayItem = (section: 'experience' | 'projects' | 'achievements') => {
    setData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...prev[section]] as any[];
      let newItem = {};
      if (section === 'experience') {
        newItem = { role: "", company: "", duration: "", details: [] };
      } else if (section === 'projects') {
        newItem = { title: "", link: "", image: "", description: "", tech: [] };
      } else if (section === 'achievements') {
        newItem = { title: "", image: "" };
      }
      return { ...prev, [section]: [...newArray, newItem] };
    });
  };

  const removeArrayItem = (section: 'experience' | 'projects' | 'achievements', index: number) => {
    setData((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...prev[section]] as any[];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const handleArrayDetailsChange = (section: 'experience', index: number, value: string) => {
     setData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], details: value.split("\n").map(s => s.trim()).filter(Boolean) };
      return { ...prev, [section]: newArray };
    });
  }

  const handleTechChange = (section: 'projects', index: number, value: string) => {
     setData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], tech: value.split(",").map(s => s.trim()).filter(Boolean) };
      return { ...prev, [section]: newArray };
    });
  }

  const handleCopy = async () => {
    const jsonString = JSON.stringify(data, null, 2);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(jsonString);
        toast.success("JSON copied to clipboard!");
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = jsonString;
        textArea.style.position = "fixed";  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          if (successful) {
            toast.success("JSON copied to clipboard!");
          } else {
            toast.error("Failed to copy using fallback.");
          }
        } catch {
          toast.error("Failed to copy JSON.");
        }
        document.body.removeChild(textArea);
      }
    } catch {
      toast.error("Failed to copy JSON.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-emerald-600 mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Portfolio
            </Link>
            <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">Admin Panel</h1>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium transition-colors shadow-sm"
          >
            <Save className="w-4 h-4 mr-2" /> Copy Updated JSON
          </button>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Hero Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Name</label>
                <input
                  type="text"
                  value={data.hero.name}
                  onChange={(e) => handleNestedChange("hero", "name", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Title</label>
                <input
                  type="text"
                  value={data.hero.title}
                  onChange={(e) => handleNestedChange("hero", "title", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Avatar URL</label>
                <input
                  type="text"
                  value={data.hero.avatar}
                  onChange={(e) => handleNestedChange("hero", "avatar", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Description</label>
                <textarea
                  value={data.hero.description}
                  onChange={(e) => handleNestedChange("hero", "description", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
                />
              </div>
            </div>
          </section>

          {/* About & Skills */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">About & Skills</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Summary</label>
                <textarea
                  value={data.about.summary}
                  onChange={(e) => handleNestedChange("about", "summary", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 h-32"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Skills (comma separated)</label>
                <input
                  type="text"
                  value={data.skills.join(", ")}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={data.contact.email}
                  onChange={(e) => handleNestedChange("contact", "email", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Phone</label>
                <input
                  type="text"
                  value={data.contact.phone}
                  onChange={(e) => handleNestedChange("contact", "phone", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Location</label>
                <input
                  type="text"
                  value={data.contact.location}
                  onChange={(e) => handleNestedChange("contact", "location", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">LinkedIn URL</label>
                <input
                  type="text"
                  value={data.contact.linkedin}
                  onChange={(e) => handleNestedChange("contact", "linkedin", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">GitHub URL</label>
                <input
                  type="text"
                  value={data.contact.github}
                  onChange={(e) => handleNestedChange("contact", "github", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">Experience</h2>
              <button onClick={() => addArrayItem("experience")} className="inline-flex items-center text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-1 rounded">
                <Plus className="w-3 h-3 mr-1" /> Add
              </button>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative p-4 border border-border rounded-lg bg-background/50">
                  <button onClick={() => removeArrayItem("experience", index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 bg-background rounded-full shadow-sm" aria-label="Remove item">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleArrayChange("experience", index, "role", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleArrayChange("experience", index, "duration", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Details (one per line)</label>
                      <textarea
                        value={exp.details.join("\n")}
                        onChange={(e) => handleArrayDetailsChange("experience", index, e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 h-24"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

           {/* Projects Section */}
           <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">Projects</h2>
              <button onClick={() => addArrayItem("projects")} className="inline-flex items-center text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-1 rounded">
                <Plus className="w-3 h-3 mr-1" /> Add
              </button>
            </div>
            <div className="space-y-6">
              {data.projects.map((proj, index) => (
                <div key={index} className="relative p-4 border border-border rounded-lg bg-background/50">
                  <button onClick={() => removeArrayItem("projects", index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 bg-background rounded-full shadow-sm" aria-label="Remove item">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Link</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Image URL</label>
                      <input
                        type="text"
                        value={proj.image}
                        onChange={(e) => handleArrayChange("projects", index, "image", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 h-20"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Tech (comma separated)</label>
                      <input
                        type="text"
                        value={proj.tech.join(", ")}
                        onChange={(e) => handleTechChange("projects", index, e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Section */}
          <section className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <button onClick={() => addArrayItem("achievements")} className="inline-flex items-center text-xs text-emerald-600 hover:text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2 py-1 rounded">
                <Plus className="w-3 h-3 mr-1" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.achievements.map((achieve, index) => (
                <div key={index} className="relative p-4 border border-border rounded-lg bg-background/50">
                  <button onClick={() => removeArrayItem("achievements", index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 bg-background rounded-full shadow-sm" aria-label="Remove item">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div>
                      <label className="block text-xs font-medium mb-1 text-muted-foreground">Title</label>
                      <input
                        type="text"
                        value={achieve.title}
                        onChange={(e) => handleArrayChange("achievements", index, "title", e.target.value)}
                        className="w-full px-2 py-1 bg-background border border-input rounded focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
