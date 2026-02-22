"use client"

import { useState } from "react"
import portfolioData from "@/data/portfolio.json"
import { Copy, Check, Plus, Trash2 } from "lucide-react"

export default function AdminPage() {
  const [data, setData] = useState(portfolioData)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 pb-20">
      <div className="flex justify-between items-center sticky top-20 bg-white dark:bg-gray-950 z-40 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Admin</h1>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? "Copied!" : "Copy JSON"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="space-y-4 border p-4 rounded-xl border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-emerald-600">Hero Section</h2>
        <div className="grid gap-4">
          <Input label="Name" value={data.hero.name} onChange={(v) => setData({ ...data, hero: { ...data.hero, name: v } })} />
          <Input label="Title" value={data.hero.title} onChange={(v) => setData({ ...data, hero: { ...data.hero, title: v } })} />
          <TextArea label="Description" value={data.hero.description} onChange={(v) => setData({ ...data, hero: { ...data.hero, description: v } })} />
          <h3 className="font-medium mt-2">Social Links</h3>
          <Input label="LinkedIn" value={data.hero.socialLinks.linkedin} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, linkedin: v } } })} />
          <Input label="GitHub" value={data.hero.socialLinks.github} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, github: v } } })} />
          <Input label="Facebook" value={data.hero.socialLinks.facebook} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, facebook: v } } })} />
          <Input label="Email (mailto:)" value={data.hero.socialLinks.email} onChange={(v) => setData({ ...data, hero: { ...data.hero, socialLinks: { ...data.hero.socialLinks, email: v } } })} />
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-4 border p-4 rounded-xl border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-emerald-600">About Section</h2>
        <div className="grid gap-4">
          <Input label="Title" value={data.about.title} onChange={(v) => setData({ ...data, about: { ...data.about, title: v } })} />
          <TextArea label="Description" value={data.about.description} onChange={(v) => setData({ ...data, about: { ...data.about, description: v } })} />
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-4 border p-4 rounded-xl border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-emerald-600">Projects</h2>
          <button
            onClick={() => setData({
              ...data,
              projects: [...data.projects, { id: Date.now().toString(), title: "New Project", description: "", techStack: [], link: "#", stats: "" }]
            })}
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
        <div className="space-y-6">
          {data.projects.map((project, index) => (
            <div key={project.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative group border border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setData({ ...data, projects: data.projects.filter((_, i) => i !== index) })}
                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="grid gap-4 pr-8">
                <Input label="Title" value={project.title} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[index] = { ...newProjects[index], title: v };
                  setData({ ...data, projects: newProjects });
                }} />
                <TextArea label="Description" value={project.description} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[index] = { ...newProjects[index], description: v };
                  setData({ ...data, projects: newProjects });
                }} />
                <Input label="Stats" value={project.stats} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[index] = { ...newProjects[index], stats: v };
                  setData({ ...data, projects: newProjects });
                }} />
                <Input label="Link" value={project.link} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[index] = { ...newProjects[index], link: v };
                  setData({ ...data, projects: newProjects });
                }} />
                <Input label="Tech Stack (comma separated)" value={project.techStack.join(", ")} onChange={(v) => {
                  const newProjects = [...data.projects];
                  newProjects[index] = { ...newProjects[index], techStack: v.split(",").map(s => s.trim()) };
                  setData({ ...data, projects: newProjects });
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-4 border p-4 rounded-xl border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-emerald-600">Experience</h2>
            <button
                onClick={() => setData({
                ...data,
                experience: [...data.experience, { id: Date.now().toString(), company: "New Company", role: "", duration: "", description: "" }]
                })}
                className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
                <Plus className="w-4 h-4" /> Add Experience
            </button>
        </div>
        <div className="space-y-6">
            {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative group border border-gray-100 dark:border-gray-800">
                <button
                onClick={() => setData({ ...data, experience: data.experience.filter((_, i) => i !== index) })}
                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid gap-4 pr-8">
                <Input label="Company" value={exp.company} onChange={(v) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...newExp[index], company: v };
                    setData({ ...data, experience: newExp });
                }} />
                <Input label="Role" value={exp.role} onChange={(v) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...newExp[index], role: v };
                    setData({ ...data, experience: newExp });
                }} />
                <Input label="Duration" value={exp.duration} onChange={(v) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...newExp[index], duration: v };
                    setData({ ...data, experience: newExp });
                }} />
                <TextArea label="Description" value={exp.description} onChange={(v) => {
                    const newExp = [...data.experience];
                    newExp[index] = { ...newExp[index], description: v };
                    setData({ ...data, experience: newExp });
                }} />
                </div>
            </div>
            ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-4 border p-4 rounded-xl border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-emerald-600">Achievements</h2>
            <button
                onClick={() => setData({
                ...data,
                achievements: [...data.achievements, { id: Date.now().toString(), title: "New Achievement", description: "" }]
                })}
                className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
                <Plus className="w-4 h-4" /> Add Achievement
            </button>
        </div>
        <div className="space-y-6">
            {data.achievements.map((item, index) => (
            <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative group border border-gray-100 dark:border-gray-800">
                <button
                onClick={() => setData({ ...data, achievements: data.achievements.filter((_, i) => i !== index) })}
                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid gap-4 pr-8">
                <Input label="Title" value={item.title} onChange={(v) => {
                    const newItems = [...data.achievements];
                    newItems[index] = { ...newItems[index], title: v };
                    setData({ ...data, achievements: newItems });
                }} />
                <TextArea label="Description" value={item.description} onChange={(v) => {
                    const newItems = [...data.achievements];
                    newItems[index] = { ...newItems[index], description: v };
                    setData({ ...data, achievements: newItems });
                }} />
                </div>
            </div>
            ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-4 border p-4 rounded-xl border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-emerald-600">Contact Section</h2>
        <div className="grid gap-4">
          <Input label="Email" value={data.contact.email} onChange={(v) => setData({ ...data, contact: { ...data.contact, email: v } })} />
          <Input label="Location" value={data.contact.location} onChange={(v) => setData({ ...data, contact: { ...data.contact, location: v } })} />
        </div>
      </section>
    </div>
  )
}

function Input({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow"
      />
    </div>
  )
}

function TextArea({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none resize-y transition-shadow"
      />
    </div>
  )
}
