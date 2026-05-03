import { Contact } from "@/types/portfolio";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer({ contact }: { contact: Contact }) {
  return (
    <footer className="bg-emerald-950 text-emerald-50 py-12 border-t border-emerald-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Let&apos;s Connect</h3>
            <p className="text-emerald-200/80 mb-6 max-w-md">
              I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            <div className="flex gap-4">
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-emerald-900/50 hover:bg-emerald-800 rounded-full transition-colors text-emerald-300 hover:text-white" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-emerald-900/50 hover:bg-emerald-800 rounded-full transition-colors text-emerald-300 hover:text-white" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-4">
              {contact.email && (
                <li className="flex items-center gap-3 text-emerald-200/80">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a>
                </li>
              )}
              {contact.phone && (
                <li className="flex items-center gap-3 text-emerald-200/80">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a>
                </li>
              )}
              {contact.location && (
                <li className="flex items-start gap-3 text-emerald-200/80">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{contact.location}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900/50 text-center text-emerald-400/60 text-sm">
          <p>© {new Date().getFullYear()} Personal Portfolio. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
