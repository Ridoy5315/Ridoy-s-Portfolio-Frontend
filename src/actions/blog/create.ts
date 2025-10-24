"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const create = async (data: FormData) => {
  const session = await getUserSession();

  const file = data.get("file") as File | null;

  const blogInfo = Object.fromEntries(
    Array.from(data.entries()).filter(([key]) => key !== "file")
  );

  const formData = new FormData();

  formData.append("author", session?.user?.name || "");

  formData.append("title", blogInfo.title as string);
    formData.append("description", blogInfo.description as string);
    formData.append("content", blogInfo.content as string);
    formData.append("tags", blogInfo.tags as string);
    formData.append("isFeatured", blogInfo.isFeatured as string);

    if (file) {
    formData.append("file", file);
  }

  console.log(formData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    method: "POST",

    body: formData,
  });

  console.log("from backend", res);

  const result = await res.json();
  if (result?.data?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
  }
  return result;
};
