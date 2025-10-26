import PublicBlogCardPage from "@/components/modules/Blog/PublicBlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ALl Blogs | Ridoy's Portfolio",
}

const BlogsPage = async () => {
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
      <div className="grid grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <PublicBlogCardPage key={blog?.id} blog={blog}></PublicBlogCardPage>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
