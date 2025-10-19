"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
  const session = await getUserSession();

  formData.append("author", session?.user?.name || "");

  console.log(formData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    method: "POST",

    body: formData,
  });

  console.log("from backend", res);

  const result = await res.json();
  if (result?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs");
    redirect("/dashboard/blogs");
  }
  return result;
};
