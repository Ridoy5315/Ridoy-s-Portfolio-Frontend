import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";

const ProjectDetailsCard = ({ project }) => {
     console.log(project)
  if (!project) {
    return (
      <div className="py-20 text-center text-gray-500">Project not found.</div>
    );
  }
  return (
    <main className="max-w-4xl mx-auto py-30 px-4">
      <h1 className="text-5xl font-bold mb-6">{project?.data?.projectName}</h1>

      {project?.data?.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={project?.data?.thumbnail}
            alt={project?.data?.projectName}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none">
        <p>{project?.data?.description}</p>
      </article>
      <div className=" font-bold text-lg flex items-center gap-1">
        <FaLink></FaLink>
        <a href={project?.data?.githubClientSideLink}>
          Example Link
        </a>
      </div>
      <Button>
        <Link href={`/dashboard/projects/${project?.data?.id}/updateProject`}>Update Project</Link>
      </Button>
    </main>
  );
};

export default ProjectDetailsCard;
