import { sanityClient } from '@/lib/sanity';
import STATIC_PROJECTS from '@/lib/staticProjects';
import ProjectDetailClient from '@/components/innovation/ProjectDetailClient';

export const revalidate = 60;

export async function generateStaticParams() {
  return STATIC_PROJECTS.map((p) => ({ id: p._id }));
}

async function getProject(id) {
  // 1. Try Sanity
  try {
    const q = `*[_type == "productRoadmap" && _id == $id][0] {
      _id, projectName, fullTitle, status, nihGrant, fundingAmount,
      description, engineeringStory, marketStatus, phase,
      "photos": coalesce(photos[].asset->url, []),
      role, agency, nihAwards, engineeringChallenges, technologyDomains,
      publicationDoi, currentStatus
    }`;
    const p = await sanityClient.fetch(q, { id });
    if (p?.projectName) return p;
  } catch {}

  // 2. Static fallback
  return STATIC_PROJECTS.find((p) => p._id === id) || null;
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.id);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.projectName} — ${project.fullTitle} | Vamsi Reddy`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.id);
  return <ProjectDetailClient project={project} />;
}
