import ProjectCard from "@/components/modules/Project/ProjectCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ManageProjectsPage = async() => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
    cache: "no-store",
    next: {
      tags: ["PROJECTS"]
    }
  })
  const { data: projects } = await res.json();
  console.log(projects)
  return (
    <div>
      <h1>All Projects</h1>
      <Button>
        <Link href="/dashboard/projects/createProjects">Create Project</Link>
      </Button>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project?.id} project={project}></ProjectCard>
        ))}
      </div>
    </div>
  );
};

export default ManageProjectsPage;
