import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  console.log(project)
  return (
    <Link href={`/dashboard/projects/${project?.id}`}>
      {project?.thumbnail ? (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.projectName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
          No Image
        </div>
      )}
      <div>
        <p>{project?.projectName}</p>
        <p>{project?.description}</p>
        {/* <p>{project?.content}</p> */}
      </div>
      
    </Link>
  );
};

export default ProjectCard;
