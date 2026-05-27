import data from "@/data/portfolio.json";
import { ProjectDetailClient } from "./ProjectDetailClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ProjectType = (typeof data.projects)[number] & { logo?: string; shortDescription?: string; media?: any[]; links?: any[] };

function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function generateStaticParams() {
    return data.projects.map((project) => ({
        slug: slugify(project.title),
    }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    // Since this is sync-compatible for static export, we need to work around it
    // Next.js 16 with static export handles this
    return params.then(({ slug }) => {
        const project = data.projects.find((p) => slugify(p.title) === slug) as ProjectType | undefined;
        return {
            title: project ? `${project.title} — Ismail Hossain` : "Project — Ismail Hossain",
            description: project?.shortDescription || project?.description || "",
        };
    });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = data.projects.find((p) => slugify(p.title) === slug) as ProjectType | undefined;

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <a href="/" className="text-primary-500 hover:underline">Go back home</a>
                </div>
            </div>
        );
    }

    return <ProjectDetailClient project={project} />;
}
