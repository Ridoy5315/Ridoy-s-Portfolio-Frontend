
import ProjectUpdateCard from "@/components/modules/Project/ProjectUpdateCard";
import { getProjectById } from "@/services/projectService";


const UpdateProjectPage = async({params}: {params: Promise<{projectId: string}>}) => {
     const {projectId} = await params;
     const project = await getProjectById(projectId);
  
  return (
    <div>
     <ProjectUpdateCard project={project}></ProjectUpdateCard>
    </div>
  );
};

export default UpdateProjectPage;
