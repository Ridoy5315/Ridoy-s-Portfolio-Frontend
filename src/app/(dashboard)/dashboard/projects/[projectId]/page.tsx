import ProjectDetailsCard from "@/components/modules/Project/ProjectDetailsCard";
import { getProjectById } from "@/services/projectService";

const page = async({params}: {params: Promise<{projectId: string}>}) => {
     const {projectId} = await params;
     const project = await getProjectById(projectId);
     return (
          <div>
               <ProjectDetailsCard project={project}></ProjectDetailsCard>
          </div>
     );
};

export default page;