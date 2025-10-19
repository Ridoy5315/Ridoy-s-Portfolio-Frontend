import BlogDetailsCard from "@/components/modules/Blog/BlogDetailsCard";
import { getBlogById } from "@/services/blogServices";

const BlogDetailsPage = async({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
     const {blogId} = await params;
     const blog = await getBlogById(blogId);
     console.log(blog)
     return (
          <div>
               <BlogDetailsCard blog={blog?.data}></BlogDetailsCard>
          </div>
     );
};

export default BlogDetailsPage;