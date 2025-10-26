import PublicProjectCardPage from "@/components/modules/Project/PublicProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALl Projects | Ridoy's Portfolio",
}

const ProjectsPage = async() => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
          cache: "no-store",
          next: {
               tags: ["PROJECTS"]
          }
     })
     const {data: projects} = await res.json();
     return (
          <div>
               <h1>Project Page</h1>
               <div className="grid grid-cols-3 gap-6">
                    {projects.map((project) =>(
                         <PublicProjectCardPage key={project?.id} project={project}></PublicProjectCardPage>
                    ))}
               </div>
          </div>
     );
};

export default ProjectsPage;