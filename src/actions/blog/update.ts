"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const updateBlog = async (id: string, data: FormData) => {

  const file = data.get("file") as File | null;

  const blogInfo = Object.fromEntries(
    Array.from(data.entries()).filter(([key]) => key !== "file")
  );

  const formData = new FormData();

  formData.append("title", blogInfo.title as string);
  formData.append("description", blogInfo.description as string);
  formData.append("content", blogInfo.content as string);
  formData.append(
    "tags",
    blogInfo.tags as string
  );
  formData.append("isFeatured", blogInfo.isFeatured );

  if (file) {
    formData.append("file", file);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
    method: "PATCH",

    body: formData,
  });

  const result = await res.json();
  console.log("result", result);
  if (result?.data?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
  }

  return result;
};
