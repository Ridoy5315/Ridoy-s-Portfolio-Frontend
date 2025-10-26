import BlogUpdateCard from "@/components/modules/Blog/BlogUpdateCard";
import { getBlogById } from "@/services/blogServices";

const UpdateBlogPage = async({params}: {params: Promise<{blogId: string}>}) => {
     const {blogId} = await params;
          const blog = await getBlogById(blogId);
     return (
          <div>
               {/* <h1>Blog Update page</h1> */}
               <BlogUpdateCard blog={blog}></BlogUpdateCard>
          </div>
     );
};

export default UpdateBlogPage;