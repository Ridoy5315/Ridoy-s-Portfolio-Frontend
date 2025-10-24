"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DeleteModal from "../modal/DeleteModal";

const ProjectDetailsCard = ({ project }) => {
  const router = useRouter();
  if (!project) {
    return (
      <div className="py-20 text-center text-gray-500">Project not found.</div>
    );
  }
  const handleDelete = async (data) => {
    const toastId = toast.loading(`Deleting "${data?.projectName}"...”`);

    try {
      const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${data?.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      toast.success(
        `✅ "${data?.projectName}" has been deleted successfully!`,
        { id: toastId }
      );

      router.push("/dashboard/projects");
    }
    } catch (error) {
      toast.error(`❌ Failed to delete "${data?.projectName}".`, {
        id: toastId,
      });
    }

  };
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
        <a href={project?.data?.githubClientSideLink}>Example Link</a>
      </div>
      <Button>
        <Link href={`/dashboard/projects/${project?.data?.id}/updateProject`}>
          Update Project
        </Link>
      </Button>
      <DeleteModal onConfirm={() => project?.data?.id && handleDelete(project?.data)}>
        <Button>Delete</Button>
      </DeleteModal>
    </main>
  );
};

export default ProjectDetailsCard;
