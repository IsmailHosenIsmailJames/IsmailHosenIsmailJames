"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LinkPreviewProps {
    url: string;
    label: string;
}

function getDomain(url: string): string {
    try {
        return new URL(url).hostname.replace("www.", "");
    } catch {
        return url;
    }
}

function getFaviconUrl(url: string): string {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
        return "";
    }
}

export function LinkPreview({ url, label }: LinkPreviewProps) {
    const domain = getDomain(url);
    const favicon = getFaviconUrl(url);

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-3 bg-primary-50/50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30 rounded-xl hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {favicon && <img
                src={favicon}
                alt={domain}
                width={24}
                height={24}
                className="w-6 h-6 rounded-md flex-shrink-0"
            />}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary-500 transition-colors">
                    {label || domain}
                </p>
                <p className="text-xs text-foreground/40 truncate">{domain}</p>
            </div>
            <ExternalLink
                size={16}
                className="flex-shrink-0 text-foreground/30 group-hover:text-primary-500 transition-colors"
            />
        </motion.a>
    );
}

export function LinkPreviewAdmin({
    url,
    label,
}: {
    url: string;
    label: string;
}) {
    if (!url) return null;
    const domain = getDomain(url);
    const favicon = getFaviconUrl(url);

    return (
        <div className="flex items-center gap-3 px-3 py-2 bg-primary-50/30 dark:bg-primary-900/10 border border-primary-100/50 dark:border-primary-800/30 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {favicon && <img
                src={favicon}
                alt={domain}
                width={20}
                height={20}
                className="w-5 h-5 rounded flex-shrink-0"
            />}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">
                    {label || domain}
                </p>
                <p className="text-[10px] text-foreground/40 truncate">
                    {domain}
                </p>
            </div>
            <ExternalLink size={12} className="flex-shrink-0 text-foreground/30" />
        </div>
    );
}
