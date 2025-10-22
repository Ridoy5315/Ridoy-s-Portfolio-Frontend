import BlogDetailsCard from "@/components/modules/Blog/BlogDetailsCard";
import { getBlogById } from "@/services/blogServices";

export const generateStaticParams = async() => {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
     const {data: blogs} = await res.json();

     return blogs.slice(0, 2).map(blog => ({
          blogId: String(blog?.id)
     }))
}

export const generateMetadata = async ({params}: {params: Promise<{ blogId: string }>;}) => {
     const {blogId} = await params;
     const blog = await getBlogById(blogId);

     return {
          title: blog?.data?.title,
     }
}

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