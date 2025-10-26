import ProjectDetailsCard from '@/components/modules/Project/ProjectDetailsCard';
import { getProjectById } from '@/services/projectService';
import React from 'react';

const DetailsProjectPage = async({params}: {params: Promise<{projectsId: string}>}) => {
     const {projectsId} = await params;
     const project = await getProjectById(projectsId)
     return (
          <div>
               <ProjectDetailsCard project={project}></ProjectDetailsCard>
          </div>
     );
};

export default DetailsProjectPage;