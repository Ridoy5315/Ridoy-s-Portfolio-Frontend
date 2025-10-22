import BlogCard from "@/components/modules/Blog/BlogCard";
import CreateBlogFormModal from "@/components/modules/Blog/CreateBlogFormModal";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ALl Blogs | Ridoy's Portfolio",
}

const ManageBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache: "no-store",
    next: {
      tags: ["BLOGS"],
    },
  });
  const { data: blogs } = await res.json();
  return (
    <div>
      <h2>All Blogs</h2>
      <CreateBlogFormModal></CreateBlogFormModal>
      <div className="grid grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog?.id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default ManageBlogsPage;
