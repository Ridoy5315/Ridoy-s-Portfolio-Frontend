import BlogCard from "@/components/modules/Blog/BlogCard";
import CreateBlogFormModal from "@/components/modules/Blog/CreateBlogFormModal";
import React from "react";

const ManageBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache: "no-store",
    next: {
      tags: ["BLOGS"],
    },
  });
  const { data: blogs } = await res.json();
  console.log(blogs);
  return (
    <div>
      <h2>All Blogs</h2>
      <CreateBlogFormModal></CreateBlogFormModal>
      <div>
        {blogs.map((blog) => (
          <BlogCard key={blog?.id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default ManageBlogsPage;
