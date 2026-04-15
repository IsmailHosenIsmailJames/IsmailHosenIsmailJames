"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PortfolioData } from "../../types/portfolio";
import defaultData from "../../data/portfolio.json";

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    // In a real app we might fetch this, but for static site we just load the imported JSON initially.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(defaultData as PortfolioData);
  }, []);

  if (!data) return <div className="p-8 text-center text-emerald-500">Loading...</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (section: keyof PortfolioData, field: string, value: any) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(prev[section] as any),
          [field]: value,
        },
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleArrayChange = (section: keyof PortfolioData, index: number, field: string, value: any) => {
    setData((prev) => {
      if (!prev) return prev;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[section] as any[])];
      if (typeof newArray[index] === 'object') {
        newArray[index] = { ...newArray[index], [field]: value };
      } else {
         newArray[index] = value;
      }
      return { ...prev, [section]: newArray };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeepArrayChange = (section: keyof PortfolioData, index: number, field: string, subIndex: number, value: any) => {
     setData((prev) => {
      if (!prev) return prev;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[section] as any[])];
      const newItem = { ...newArray[index] };
      newItem[field] = [...newItem[field]];
      newItem[field][subIndex] = value;
      newArray[index] = newItem;

      return { ...prev, [section]: newArray };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addArrayItem = (section: keyof PortfolioData, emptyItem: any) => {
    setData((prev) => {
      if (!prev) return prev;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { ...prev, [section]: [...(prev[section] as any[]), emptyItem] };
    });
  };

  const removeArrayItem = (section: keyof PortfolioData, index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[section] as any[])];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addDeepArrayItem = (section: keyof PortfolioData, index: number, field: string, emptyItem: any) => {
    setData((prev) => {
      if (!prev) return prev;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[section] as any[])];
      const newItem = { ...newArray[index] };
      newItem[field] = [...(newItem[field] || []), emptyItem];
      newArray[index] = newItem;
      return { ...prev, [section]: newArray };
    });
  }

  const removeDeepArrayItem = (section: keyof PortfolioData, index: number, field: string, subIndex: number) => {
    setData((prev) => {
      if (!prev) return prev;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newArray = [...(prev[section] as any[])];
      const newItem = { ...newArray[index] };
      newItem[field] = [...newItem[field]];
      newItem[field].splice(subIndex, 1);
      newArray[index] = newItem;
      return { ...prev, [section]: newArray };
    });
  }

  const handleCopyJSON = async () => {
    const jsonString = JSON.stringify(data, null, 2);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(jsonString);
        toast.success("JSON copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = jsonString;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success("JSON copied to clipboard!");
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
          toast.error("Failed to copy JSON.");
        }
        textArea.remove();
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy JSON.");
    }
  };

  const inputClass = "w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4";
  const labelClass = "block text-sm font-bold mb-1 text-zinc-700 dark:text-zinc-300";
  const sectionClass = "mb-8 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg shadow";

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-zinc-100/90 dark:bg-zinc-950/90 backdrop-blur-md p-4 z-10 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">Portfolio Admin</h1>
          <button
            onClick={handleCopyJSON}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition shadow-md"
          >
            Copy Updated JSON
          </button>
        </div>

        {/* Hero Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">Hero Section</h2>
          <label className={labelClass}>Name</label>
          <input className={inputClass} value={data.hero.name} onChange={(e) => handleChange("hero", "name", e.target.value)} />
          <label className={labelClass}>Title</label>
          <input className={inputClass} value={data.hero.title} onChange={(e) => handleChange("hero", "title", e.target.value)} />
          <label className={labelClass}>Avatar URL</label>
          <input className={inputClass} value={data.hero.avatar} onChange={(e) => handleChange("hero", "avatar", e.target.value)} />
          <label className={labelClass}>Description</label>
          <textarea className={inputClass} rows={3} value={data.hero.description} onChange={(e) => handleChange("hero", "description", e.target.value)} />
        </div>

        {/* Contact Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">Contact Info</h2>
          <label className={labelClass}>Email</label>
          <input className={inputClass} value={data.contact.email} onChange={(e) => handleChange("contact", "email", e.target.value)} />
          <label className={labelClass}>Phone</label>
          <input className={inputClass} value={data.contact.phone} onChange={(e) => handleChange("contact", "phone", e.target.value)} />
          <label className={labelClass}>Location</label>
          <input className={inputClass} value={data.contact.location} onChange={(e) => handleChange("contact", "location", e.target.value)} />
          <label className={labelClass}>LinkedIn URL</label>
          <input className={inputClass} value={data.contact.linkedin} onChange={(e) => handleChange("contact", "linkedin", e.target.value)} />
          <label className={labelClass}>GitHub URL</label>
          <input className={inputClass} value={data.contact.github} onChange={(e) => handleChange("contact", "github", e.target.value)} />
        </div>

        {/* About Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">About Section</h2>
          <label className={labelClass}>Summary</label>
          <textarea className={inputClass} rows={5} value={data.about.summary} onChange={(e) => handleChange("about", "summary", e.target.value)} />
        </div>

        {/* Skills Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">Skills</h2>
          {data.skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input className={`${inputClass} mb-0`} value={skill} onChange={(e) => handleArrayChange("skills", index, "", e.target.value)} />
              <button onClick={() => removeArrayItem("skills", index)} className="px-3 py-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button onClick={() => addArrayItem("skills", "")} className="mt-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded text-sm font-semibold">Add Skill</button>
        </div>

        {/* Experience Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6 p-4 border border-zinc-200 dark:border-zinc-700 rounded relative bg-white dark:bg-zinc-900">
              <button onClick={() => removeArrayItem("experience", index)} className="absolute top-2 right-2 text-red-500 text-sm font-bold">Delete</button>
              <label className={labelClass}>Role</label>
              <input className={inputClass} value={exp.role} onChange={(e) => handleArrayChange("experience", index, "role", e.target.value)} />
              <label className={labelClass}>Company</label>
              <input className={inputClass} value={exp.company} onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)} />
              <label className={labelClass}>Duration</label>
              <input className={inputClass} value={exp.duration} onChange={(e) => handleArrayChange("experience", index, "duration", e.target.value)} />

              <label className={labelClass}>Details (Bullets)</label>
              {exp.details.map((detail, dIndex) => (
                <div key={dIndex} className="flex gap-2 mb-2">
                   <textarea className={`${inputClass} mb-0`} rows={2} value={detail} onChange={(e) => handleDeepArrayChange("experience", index, "details", dIndex, e.target.value)} />
                   <button onClick={() => removeDeepArrayItem("experience", index, "details", dIndex)} className="px-3 py-2 bg-red-500 text-white rounded shrink-0">X</button>
                </div>
              ))}
              <button onClick={() => addDeepArrayItem("experience", index, "details", "")} className="mt-2 px-4 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-xs font-semibold">Add Detail</button>
            </div>
          ))}
          <button onClick={() => addArrayItem("experience", {role: "", company: "", duration: "", details: []})} className="mt-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-sm font-semibold">Add Experience</button>
        </div>

        {/* Projects Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">Projects</h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-6 p-4 border border-zinc-200 dark:border-zinc-700 rounded relative bg-white dark:bg-zinc-900">
              <button onClick={() => removeArrayItem("projects", index)} className="absolute top-2 right-2 text-red-500 text-sm font-bold">Delete</button>
              <label className={labelClass}>Title</label>
              <input className={inputClass} value={proj.title} onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)} />
              <label className={labelClass}>Description</label>
              <textarea className={inputClass} rows={3} value={proj.description} onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)} />
              <label className={labelClass}>Link URL</label>
              <input className={inputClass} value={proj.link} onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)} />
              <label className={labelClass}>Image URL</label>
              <input className={inputClass} value={proj.image} onChange={(e) => handleArrayChange("projects", index, "image", e.target.value)} />

              <label className={labelClass}>Tech Stack</label>
              {proj.tech.map((techItem, tIndex) => (
                <div key={tIndex} className="flex gap-2 mb-2">
                   <input className={`${inputClass} mb-0`} value={techItem} onChange={(e) => handleDeepArrayChange("projects", index, "tech", tIndex, e.target.value)} />
                   <button onClick={() => removeDeepArrayItem("projects", index, "tech", tIndex)} className="px-3 py-2 bg-red-500 text-white rounded shrink-0">X</button>
                </div>
              ))}
              <button onClick={() => addDeepArrayItem("projects", index, "tech", "")} className="mt-2 px-4 py-1 bg-zinc-200 dark:bg-zinc-700 rounded text-xs font-semibold">Add Tech</button>
            </div>
          ))}
          <button onClick={() => addArrayItem("projects", {title: "", description: "", link: "", image: "", tech: []})} className="mt-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-sm font-semibold">Add Project</button>
        </div>

        {/* Achievements Section */}
        <div className={sectionClass}>
          <h2 className="text-xl font-bold mb-4 text-emerald-500">Achievements</h2>
          {data.achievements.map((ach, index) => (
             <div key={index} className="mb-6 p-4 border border-zinc-200 dark:border-zinc-700 rounded relative bg-white dark:bg-zinc-900">
               <button onClick={() => removeArrayItem("achievements", index)} className="absolute top-2 right-2 text-red-500 text-sm font-bold">Delete</button>
               <label className={labelClass}>Title</label>
               <input className={inputClass} value={ach.title} onChange={(e) => handleArrayChange("achievements", index, "title", e.target.value)} />
               <label className={labelClass}>Image URL</label>
               <input className={inputClass} value={ach.image} onChange={(e) => handleArrayChange("achievements", index, "image", e.target.value)} />
             </div>
          ))}
          <button onClick={() => addArrayItem("achievements", {title: "", image: ""})} className="mt-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-sm font-semibold">Add Achievement</button>
        </div>
      </div>
    </div>
  );
}
