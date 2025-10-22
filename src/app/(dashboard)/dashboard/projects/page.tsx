import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ManageProjectsPage = () => {
  return (
    <div>
      <h1>All Projects</h1>
      <Button>
        <Link href="/dashboard/projects/createProjects">Create Project</Link>
      </Button>
    </div>
  );
};

export default ManageProjectsPage;
