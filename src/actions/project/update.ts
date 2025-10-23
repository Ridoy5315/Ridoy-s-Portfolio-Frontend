"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const updateProject = async (id: string, data: FormData) => {

  const file = data.get("file") as File | null;

  const projectInfo = Object.fromEntries(
    Array.from(data.entries()).filter(([key]) => key !== "file")
  );

  const formData = new FormData();

  formData.append("projectName", projectInfo.projectName as string);
  formData.append("description", projectInfo.description as string);
  formData.append("projectLiveLink", projectInfo.projectLiveLink as string);
  formData.append(
    "githubClientSideLink",
    projectInfo.githubClientSideLink as string
  );
  formData.append(
    "githubServerSideLink",
    projectInfo.githubServerSideLink as string
  );

  formData.append(
    "mainTechnologyStackUsed",
    projectInfo.mainTechnologyStackUsed as string
  );
  formData.append("challengesFaced", projectInfo.challengesFaced as string);
  formData.append(
    "improvementsAndPlans",
    projectInfo.improvementsAndPlans as string
  );

  if (file) {
    formData.append("file", file);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`, {
    method: "PATCH",

    body: formData,
  });

  const result = await res.json();
  console.log("result", result);
  if (result?.data?.id) {
    revalidateTag("PROJECTS");
    revalidatePath("/project");
  }

  return result;
};
