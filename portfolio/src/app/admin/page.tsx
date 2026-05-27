"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Save, Plus, Trash2, ArrowLeft, ArrowUp, ArrowDown, Monitor, Smartphone, Play, ChevronDown, Link2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import initialData from "@/data/portfolio.json";
import { LinkPreviewAdmin } from "@/components/LinkPreview";

export default function AdminPage() {
    const [data, setData] = useState(initialData);

    const handleCopyJson = () => {
        const jsonString = JSON.stringify(data, null, 2);

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(jsonString)
                .then(() => toast.success("JSON copied to clipboard! Paste it into src/data/portfolio.json"))
                .catch(() => toast.error("Failed to copy JSON"));
        } else {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = jsonString;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    toast.success("JSON copied to clipboard! Paste it into src/data/portfolio.json");
                } else {
                    toast.error("Failed to copy JSON automatically. Please check console.");
                }
            } catch {
                toast.error("Failed to copy JSON automatically.");
            }
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (section: string, field: string, value: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section: string, index: number, field: string | null, value: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData((prev: any) => {
            const newArray = [...prev[section]];
            const newNestedArray = [...newArray[itemIndex][arrayField]];
            newNestedArray[detailIndex] = value;
            newArray[itemIndex] = { ...newArray[itemIndex], [arrayField]: newNestedArray };
            return { ...prev, [section]: newArray };
        });
    };

    const handleMoveUp = (section: string, index: number) => {
        if (index === 0) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData((prev: any) => {
            const newArray = [...prev[section]];
            const temp = newArray[index - 1];
            newArray[index - 1] = newArray[index];
            newArray[index] = temp;
            return { ...prev, [section]: newArray };
        });
    };

    const handleMoveDown = (section: string, index: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData((prev: any) => {
            if (index === prev[section].length - 1) return prev;
            const newArray = [...prev[section]];
            const temp = newArray[index + 1];
            newArray[index + 1] = newArray[index];
            newArray[index] = temp;
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
                                    ) : key === 'avatar' ? (
                                        <div className="flex gap-4 items-center">
                                            {value && <Image src={value as string} alt="Avatar" width={48} height={48} unoptimized className="w-12 h-12 rounded-full object-cover border border-primary-200" />}
                                            <input
                                                type="text"
                                                value={value as string}
                                                onChange={(e) => handleChange("hero", key, e.target.value)}
                                                className="flex-1 p-3 bg-background border border-primary-200 dark:border-primary-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                                placeholder="Profile Image URL"
                                            />
                                        </div>
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
                                    <div key={index} className="flex items-center group bg-background border border-primary-200 dark:border-primary-800 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                                        <div className="flex flex-col bg-primary-50 dark:bg-primary-900/20 border-r border-primary-200 dark:border-primary-800">
                                            <button
                                                onClick={() => handleMoveUp("skills", index)}
                                                disabled={index === 0}
                                                className={`p-1 text-primary-600 ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors'}`}
                                            >
                                                <ArrowUp size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleMoveDown("skills", index)}
                                                disabled={index === data.skills.length - 1}
                                                className={`p-1 text-primary-600 ${index === data.skills.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors'}`}
                                            >
                                                <ArrowDown size={12} />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleArrayChange("skills", index, null, e.target.value)}
                                            className="w-32 p-2 bg-transparent outline-none text-sm"
                                        />
                                        <button
                                            onClick={() => setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))}
                                            className="bg-red-500/10 text-red-500 p-2 hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <Trash2 size={14} />
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
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    projects: [...prev.projects, { title: "New Project", shortDescription: "", description: "", tech: [""], link: "", image: "", logo: "", media: [], links: [] } as any]
                                }))}
                                className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg"
                            >
                                <Plus size={16} /> Add Project
                            </button>
                        </div>

                        <div className="space-y-8">
                            {data.projects.map((project, index) => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const p = project as any;
                                return (
                                <div key={index} className="p-6 bg-background rounded-xl border border-primary-100 dark:border-primary-900/20 relative group">

                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <button
                                            onClick={() => handleMoveUp("projects", index)}
                                            disabled={index === 0}
                                            className={`p-2 rounded-lg transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                        >
                                            <ArrowUp size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveDown("projects", index)}
                                            disabled={index === data.projects.length - 1}
                                            className={`p-2 rounded-lg transition-colors ${index === data.projects.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                        >
                                            <ArrowDown size={18} />
                                        </button>
                                        <button
                                            onClick={() => setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }))}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid gap-5 w-[90%]">

                                        {/* Logo + Title row */}
                                        <div className="flex items-start gap-4">
                                            {/* Project Logo */}
                                            <div className="flex-shrink-0">
                                                <label className="block text-xs font-medium mb-1 text-foreground/60">Logo</label>
                                                <div className="relative group/logo">
                                                    {p.logo ? (
                                                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary-200 dark:border-primary-800 bg-white dark:bg-primary-900/20 p-1">
                                                            <Image src={p.logo} alt="Logo" width={64} height={64} unoptimized className="w-full h-full object-contain rounded-lg" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700 flex items-center justify-center text-primary-400">
                                                            <Plus size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <label className="block text-xs font-medium mb-1">Title</label>
                                                    <input
                                                        type="text" value={project.title}
                                                        onChange={(e) => handleArrayChange("projects", index, "title", e.target.value)}
                                                        className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium mb-1">Logo URL</label>
                                                    <input
                                                        type="text" value={p.logo || ''}
                                                        onChange={(e) => handleArrayChange("projects", index, "logo", e.target.value)}
                                                        className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                        placeholder="https://example.com/logo.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Short Description */}
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Short Description <span className="text-foreground/40 font-normal">(shown on project card)</span></label>
                                            <input
                                                type="text" value={p.shortDescription || ''}
                                                onChange={(e) => handleArrayChange("projects", index, "shortDescription", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                placeholder="Brief one-liner about the project..."
                                            />
                                        </div>

                                        {/* Full Description */}
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Full Description <span className="text-foreground/40 font-normal">(shown on detail page)</span></label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => handleArrayChange("projects", index, "description", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm h-20"
                                            />
                                        </div>

                                        {/* Primary Link + Image */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Primary Link URL</label>
                                                <input
                                                    type="text" value={project.link}
                                                    onChange={(e) => handleArrayChange("projects", index, "link", e.target.value)}
                                                    className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Cover Image URL</label>
                                                <div className="flex gap-3 items-center">
                                                    {project.image && <Image src={project.image} alt="Preview" width={48} height={36} unoptimized className="w-12 h-9 object-cover rounded border border-primary-200" />}
                                                    <input
                                                        type="text" value={project.image || ''}
                                                        onChange={(e) => handleArrayChange("projects", index, "image", e.target.value)}
                                                        className="flex-1 p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                        placeholder="Cover image URL..."
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Tech Stack (comma separated)</label>
                                            <input
                                                type="text" value={project.tech.join(", ")}
                                                onChange={(e) => {
                                                    const val = e.target.value.split(",").map(s => s.trim());
                                                    const newArray = [...data.projects];
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    newArray[index] = { ...newArray[index], tech: val } as any;
                                                    setData({ ...data, projects: newArray });
                                                }}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                            />
                                        </div>

                                        {/* ═══════ Media Gallery ═══════ */}
                                        <div className="border-t border-primary-100 dark:border-primary-900/20 pt-5">
                                            <div className="flex justify-between items-center mb-3">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 flex items-center gap-1.5">
                                                    <Monitor size={14} />
                                                    Media Gallery
                                                </label>
                                                <div className="relative group/add-media">
                                                    <button className="text-xs flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1.5 rounded-lg">
                                                        <Plus size={13} /> Add Media <ChevronDown size={12} />
                                                    </button>
                                                    <div className="absolute right-0 top-full mt-1 bg-background border border-primary-200 dark:border-primary-800 rounded-lg shadow-xl py-1 z-20 min-w-[180px] hidden group-hover/add-media:block">
                                                        <button
                                                            onClick={() => {
                                                                const newProjects = [...data.projects];
                                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                const proj = newProjects[index] as any;
                                                                proj.media = [...(proj.media || []), { type: "screenshot", url: "", caption: "" }];
                                                                setData({ ...data, projects: newProjects });
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                        >
                                                            <Monitor size={14} className="text-blue-500" /> Screenshot
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const newProjects = [...data.projects];
                                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                const proj = newProjects[index] as any;
                                                                proj.media = [...(proj.media || []), { type: "mobile_screenshot", url: "", caption: "" }];
                                                                setData({ ...data, projects: newProjects });
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                        >
                                                            <Smartphone size={14} className="text-purple-500" /> Mobile Screenshot
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const newProjects = [...data.projects];
                                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                const proj = newProjects[index] as any;
                                                                proj.media = [...(proj.media || []), { type: "video", url: "", caption: "" }];
                                                                setData({ ...data, projects: newProjects });
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                                                        >
                                                            <Play size={14} className="text-red-500" /> Video
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Media Items */}
                                            {(p.media || []).length === 0 ? (
                                                <div className="text-xs text-foreground/30 italic py-3 text-center border border-dashed border-primary-200 dark:border-primary-800 rounded-lg">
                                                    No media added yet. Click &quot;Add Media&quot; to add screenshots, mobile screenshots, or videos.
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                    {(p.media || []).map((media: any, mIdx: number) => {
                                                        const typeConfig: Record<string, { icon: typeof Monitor; color: string; label: string }> = {
                                                            screenshot: { icon: Monitor, color: "bg-blue-500", label: "Screenshot" },
                                                            mobile_screenshot: { icon: Smartphone, color: "bg-purple-500", label: "Mobile Screenshot" },
                                                            video: { icon: Play, color: "bg-red-500", label: "Video" },
                                                        };
                                                        const tc = typeConfig[media.type] || typeConfig.screenshot;
                                                        const TypeIcon = tc.icon;

                                                        return (
                                                            <div key={mIdx} className="flex gap-3 items-start p-3 bg-primary-50/20 dark:bg-primary-900/5 border border-primary-100/50 dark:border-primary-800/30 rounded-lg">
                                                                {/* Thumbnail preview */}
                                                                <div className="flex-shrink-0">
                                                                    {media.url ? (
                                                                        media.type === "mobile_screenshot" ? (
                                                                            <div className="w-10 h-[72px] bg-gray-900 rounded-lg p-0.5 flex items-center justify-center">
                                                                                <Image src={media.url} alt="" width={36} height={64} unoptimized className="w-full h-full object-cover rounded-md" />
                                                                            </div>
                                                                        ) : media.type === "video" ? (
                                                                            <div className="w-16 h-12 bg-black rounded-lg overflow-hidden relative">
                                                                                <video src={media.url} muted className="w-full h-full object-cover" />
                                                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                                                    <Play size={14} className="text-white" />
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <Image src={media.url} alt="" width={64} height={48} unoptimized className="w-16 h-12 object-cover rounded-lg border border-primary-200" />
                                                                        )
                                                                    ) : (
                                                                        <div className={`w-16 h-12 rounded-lg flex items-center justify-center ${tc.color}/10 border border-dashed border-primary-300 dark:border-primary-700`}>
                                                                            <TypeIcon size={16} className="text-foreground/30" />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Fields */}
                                                                <div className="flex-1 space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white ${tc.color}`}>
                                                                            <TypeIcon size={10} />
                                                                            {tc.label}
                                                                        </span>
                                                                    </div>
                                                                    <input
                                                                        type="text"
                                                                        value={media.url}
                                                                        onChange={(e) => {
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            proj.media[mIdx] = { ...proj.media[mIdx], url: e.target.value };
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        className="w-full p-1.5 bg-background border border-primary-200 dark:border-primary-800 rounded text-xs"
                                                                        placeholder={media.type === "video" ? "Video URL..." : "Image URL..."}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={media.caption}
                                                                        onChange={(e) => {
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            proj.media[mIdx] = { ...proj.media[mIdx], caption: e.target.value };
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        className="w-full p-1.5 bg-background border border-primary-200 dark:border-primary-800 rounded text-xs"
                                                                        placeholder="Caption (optional)..."
                                                                    />
                                                                </div>

                                                                {/* Actions */}
                                                                <div className="flex flex-col gap-1 flex-shrink-0">
                                                                    <button
                                                                        onClick={() => {
                                                                            if (mIdx === 0) return;
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            const arr = [...proj.media];
                                                                            [arr[mIdx - 1], arr[mIdx]] = [arr[mIdx], arr[mIdx - 1]];
                                                                            proj.media = arr;
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        disabled={mIdx === 0}
                                                                        className={`p-1 rounded text-xs ${mIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                                                    >
                                                                        <ArrowUp size={12} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            if (mIdx === (p.media || []).length - 1) return;
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            const arr = [...proj.media];
                                                                            [arr[mIdx + 1], arr[mIdx]] = [arr[mIdx], arr[mIdx + 1]];
                                                                            proj.media = arr;
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        disabled={mIdx === (p.media || []).length - 1}
                                                                        className={`p-1 rounded text-xs ${mIdx === (p.media || []).length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                                                    >
                                                                        <ArrowDown size={12} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            proj.media = proj.media.filter((_: unknown, i: number) => i !== mIdx);
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                                    >
                                                                        <Trash2 size={12} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {/* ═══════ Project Links ═══════ */}
                                        <div className="border-t border-primary-100 dark:border-primary-900/20 pt-5">
                                            <div className="flex justify-between items-center mb-3">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-primary-500 flex items-center gap-1.5">
                                                    <Link2 size={14} />
                                                    Project Links
                                                </label>
                                                <button
                                                    onClick={() => {
                                                        const newProjects = [...data.projects];
                                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                        const proj = newProjects[index] as any;
                                                        proj.links = [...(proj.links || []), { url: "", label: "" }];
                                                        setData({ ...data, projects: newProjects });
                                                    }}
                                                    className="text-xs flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1.5 rounded-lg"
                                                >
                                                    <Plus size={13} /> Add Link
                                                </button>
                                            </div>

                                            {(p.links || []).length === 0 ? (
                                                <div className="text-xs text-foreground/30 italic py-3 text-center border border-dashed border-primary-200 dark:border-primary-800 rounded-lg">
                                                    No links added yet. Add links to show previews (e.g. Play Store, GitHub, Website).
                                                </div>
                                            ) : (
                                                <div className="space-y-3">
                                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                    {(p.links || []).map((link: any, lIdx: number) => (
                                                        <div key={lIdx} className="flex gap-3 items-start p-3 bg-primary-50/20 dark:bg-primary-900/5 border border-primary-100/50 dark:border-primary-800/30 rounded-lg">
                                                            <div className="flex-1 space-y-2">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                    <input
                                                                        type="text"
                                                                        value={link.url}
                                                                        onChange={(e) => {
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            proj.links[lIdx] = { ...proj.links[lIdx], url: e.target.value };
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        className="w-full p-1.5 bg-background border border-primary-200 dark:border-primary-800 rounded text-xs"
                                                                        placeholder="https://..."
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={link.label}
                                                                        onChange={(e) => {
                                                                            const newProjects = [...data.projects];
                                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                            const proj = newProjects[index] as any;
                                                                            proj.links[lIdx] = { ...proj.links[lIdx], label: e.target.value };
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                        className="w-full p-1.5 bg-background border border-primary-200 dark:border-primary-800 rounded text-xs"
                                                                        placeholder="Label (e.g. Google Play, GitHub)..."
                                                                    />
                                                                </div>
                                                                {/* Live Preview */}
                                                                {link.url && (
                                                                    <LinkPreviewAdmin url={link.url} label={link.label} />
                                                                )}
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    const newProjects = [...data.projects];
                                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                                    const proj = newProjects[index] as any;
                                                                    proj.links = proj.links.filter((_: unknown, i: number) => i !== lIdx);
                                                                    setData({ ...data, projects: newProjects });
                                                                }}
                                                                className="p-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                                );
                            })}
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
                                <div key={expIdx} className="p-6 bg-background rounded-xl border border-primary-100 dark:border-primary-900/20 relative group">
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <button
                                            onClick={() => handleMoveUp("experience", expIdx)}
                                            disabled={expIdx === 0}
                                            className={`p-2 rounded-lg transition-colors ${expIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                        >
                                            <ArrowUp size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveDown("experience", expIdx)}
                                            disabled={expIdx === data.experience.length - 1}
                                            className={`p-2 rounded-lg transition-colors ${expIdx === data.experience.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                        >
                                            <ArrowDown size={18} />
                                        </button>
                                        <button
                                            onClick={() => setData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== expIdx) }))}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
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

                    {/* Achievements */}
                    <section className="bg-primary-50/30 dark:bg-primary-900/5 p-6 rounded-2xl border border-primary-100/50 dark:border-primary-900/20">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-primary-500">Achievements</h2>
                            <button
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={() => setData((prev: any) => ({
                                    ...prev,
                                    achievements: [...prev.achievements, { title: "New Achievement", image: "" }]
                                }))}
                                className="text-sm flex items-center gap-1 text-primary-500 hover:text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-lg"
                            >
                                <Plus size={16} /> Add Achievement
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {data.achievements?.map((achievement: any, index: number) => (
                                <div key={index} className="p-6 bg-background rounded-xl border border-primary-100 dark:border-primary-900/20 relative group">
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <button
                                            onClick={() => handleMoveUp("achievements", index)}
                                            disabled={index === 0}
                                            className={`p-2 rounded-lg transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                        >
                                            <ArrowUp size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleMoveDown("achievements", index)}
                                            disabled={index === data.achievements.length - 1}
                                            className={`p-2 rounded-lg transition-colors ${index === data.achievements.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}
                                        >
                                            <ArrowDown size={18} />
                                        </button>
                                        <button
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            onClick={() => setData((prev: any) => ({ ...prev, achievements: prev.achievements.filter((_: any, i: number) => i !== index) }))}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid gap-4 w-[90%]">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Title</label>
                                            <input
                                                type="text" value={achievement.title}
                                                onChange={(e) => handleArrayChange("achievements", index, "title", e.target.value)}
                                                className="w-full p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Image URL</label>
                                            <div className="flex gap-4 items-center">
                                                {achievement.image && <Image src={achievement.image} alt="Preview" width={48} height={48} unoptimized className="w-12 h-12 object-cover rounded-full border border-primary-200" />}
                                                <input
                                                    type="text" value={achievement.image || ''}
                                                    onChange={(e) => handleArrayChange("achievements", index, "image", e.target.value)}
                                                    className="flex-1 p-2 bg-background border border-primary-200 dark:border-primary-800 rounded-lg text-sm"
                                                    placeholder="Achievement Image URL..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div >
        </div >
    );
}
