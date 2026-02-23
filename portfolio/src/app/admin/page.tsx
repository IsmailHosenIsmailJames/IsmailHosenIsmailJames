"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import initialData from "@/data/portfolio.json";

export default function AdminPage() {
    const [data, setData] = useState(initialData);

    const handleCopyJson = () => {
        const jsonString = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(jsonString)
            .then(() => toast.success("JSON copied to clipboard! Paste it into src/data/portfolio.json"))
            .catch(() => toast.error("Failed to copy JSON"));
    };

    const handleChange = (section: string, field: string, value: any) => {
        setData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section: string, index: number, field: string | null, value: string) => {
        setData((prev: any) => {
            const newArray = [...prev[section]];
            if (field) {
                newArray[index] = { ...newArray[index], [field]: value };
            } else {
                newArray[index] = value;
            }
            return { ...prev, [section]: newArray };
        });
    };

    const handleNestedArrayChange = (section: string, itemIndex: number, arrayField: string, detailIndex: number, value: string) => {
        setData((prev: any) => {
            const newArray = [...prev[section]];
            const newNestedArray = [...newArray[itemIndex][arrayField]];
            newNestedArray[detailIndex] = value;
            newArray[itemIndex] = { ...newArray[itemIndex], [arrayField]: newNestedArray };
            return { ...prev, [section]: newArray };
        });
    };

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-primary-100 dark:border-primary-900/30">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold">Portfolio Admin</h1>
                    </div>
                    <button
                        onClick={handleCopyJson}
                        className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all hover:-translate-y-1"
                    >
                        <Save size={20} />
                        Copy Updated JSON
                    </button>
                </div>

                <div className="space-y-12">

                    {/* Hero Section */}
                    <section className="bg-primary-50/30 dark:bg-primary-900/5 p-6 rounded-2xl border border-primary-100/50 dark:border-primary-900/20">
                        <h2 className="text-xl font-bold mb-6 text-primary-500">Hero Section</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(data.hero).map(([key, value]) => (
                                <div className={key === 'description' ? "md:col-span-2" : ""} key={key}>
                                    <label className="block text-sm font-medium mb-2 capitalize">{key}</label>
                                    {key === 'description' ? (
                                        <textarea
                                            value={value as string}
                                            onChange={(e) => handleChange("hero", key, e.target.value)}
                                            className="w-full p-3 bg-background border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all h-32"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={value as string}
                                            onChange={(e) => handleChange("hero", key, e.target.value)}
                                            className="w-full p-3 bg-background border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="bg-primary-50/30 dark:bg-primary-900/5 p-6 rounded-2xl border border-primary-100/50 dark:border-primary-900/20">
                        <h2 className="text-xl font-bold mb-6 text-primary-500">Contact</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(data.contact).map(([key, value]) => (
                                <div key={key}>
                                    <label className="block text-sm font-medium mb-2 capitalize">{key}</label>
                                    <input
                                        type="text"
                                        value={value as string}
                                        onChange={(e) => handleChange("contact", key, e.target.value)}
                                        className="w-full p-3 bg-background border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="bg-primary-50/30 dark:bg-primary-900/5 p-6 rounded-2xl border border-primary-100/50 dark:border-primary-900/20">
                        <h2 className="text-xl font-bold mb-6 text-primary-500">About</h2>
                        <div>
                            <label className="block text-sm font-medium mb-2">Summary</label>
                            <textarea
                                value={data.about.summary}
                                onChange={(e) => handleChange("about", "summary", e.target.value)}
                                className="w-full p-3 bg-background border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all h-40"
                            />
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium">Skills</label>
                                <button
                                    onClick={() => setData(prev => ({ ...prev, skills: [...prev.skills, "New Skill"] }))}
                                    className="text-xs flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium"
                                >
                                    <Plus size={14} /> Add Skill
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {data.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center relative group">
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleArrayChange("skills", index, null, e.target.value)}
                                            className="w-32 p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
                                        />
                                        <button
                                            onClick={() => setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Projects */}
                    <section className="bg-primary-50/30 dark:bg-primary-900/5 p-6 rounded-2xl border border-primary-100/50 dark:border-primary-900/20">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary-500">Projects</h2>
                            <button
                                onClick={() => setData(prev => ({
                                    ...prev,
                                    projects: [...prev.projects, { title: "New Project", description: "", tech: [""], link: "" }]
                                }))}
                                className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg"
                            >
                                <Plus size={16} /> Add Project
                            </button>
                        </div>

                        <div className="space-y-8">
                            {data.projects.map((project, index) => (
                                <div key={index} className="p-6 bg-background rounded-xl border border-primary-100 dark:border-primary-900/20 relative">
                                    <button
                                        onClick={() => setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }))}
                                        className="absolute top-4 right-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="grid gap-4 w-[90%]">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Title</label>
                                            <input
                                                type="text" value={project.title}
                                                onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Description</label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm h-20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Link URL</label>
                                            <input
                                                type="text" value={project.link}
                                                onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Tech Stack (comma separated)</label>
                                            <input
                                                type="text" value={project.tech.join(", ")}
                                                onChange={(e) => {
                                                    const val = e.target.value.split(",").map(s => s.trim());
                                                    const newArray = [...data.projects];
                                                    newArray[index] = { ...newArray[index], tech: val };
                                                    setData({ ...data, projects: newArray });
                                                }}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience is similar, skipped full detail input for brevity, keeping simple textareas or arrays if necessary but we will provide basic editable fields */}
                    <section className="bg-primary-50/30 dark:bg-primary-900/5 p-6 rounded-2xl border border-primary-100/50 dark:border-primary-900/20">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary-500">Experience</h2>
                            <button
                                onClick={() => setData(prev => ({
                                    ...prev,
                                    experience: [...prev.experience, { role: "New Role", company: "Company", duration: "Date - Date", details: [""] }]
                                }))}
                                className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg"
                            >
                                <Plus size={16} /> Add Experience
                            </button>
                        </div>

                        <div className="space-y-6">
                            {data.experience.map((exp, expIdx) => (
                                <div key={expIdx} className="p-6 bg-background rounded-xl border border-primary-100 dark:border-primary-900/20 relative">
                                    <button
                                        onClick={() => setData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== expIdx) }))}
                                        className="absolute top-4 right-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="grid gap-4 w-[90%]">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Role</label>
                                                <input
                                                    type="text" value={exp.role}
                                                    onChange={(e) => handleArrayChange("experience", expIdx, "role", e.target.value)}
                                                    className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Duration</label>
                                                <input
                                                    type="text" value={exp.duration}
                                                    onChange={(e) => handleArrayChange("experience", expIdx, "duration", e.target.value)}
                                                    className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Company</label>
                                            <input
                                                type="text" value={exp.company}
                                                onChange={(e) => handleArrayChange("experience", expIdx, "company", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <label className="block text-xs font-medium">Details</label>
                                                <button
                                                    onClick={() => {
                                                        const newArray = [...data.experience];
                                                        newArray[expIdx].details.push("");
                                                        setData({ ...data, experience: newArray });
                                                    }}
                                                    className="text-xs text-primary-500 font-medium"
                                                >
                                                    + Add Bullet point
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {exp.details.map((detail, dIdx) => (
                                                    <div key={dIdx} className="flex items-center gap-2">
                                                        <textarea
                                                            value={detail}
                                                            onChange={(e) => handleNestedArrayChange("experience", expIdx, "details", dIdx, e.target.value)}
                                                            className="flex-1 p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm h-16"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const newArray = [...data.experience];
                                                                newArray[expIdx].details = newArray[expIdx].details.filter((_, i) => i !== dIdx);
                                                                setData({ ...data, experience: newArray });
                                                            }}
                                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
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
