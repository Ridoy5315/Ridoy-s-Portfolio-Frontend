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

const DetailsBlogPage = async({
  params,
}: {
  params: Promise<{ blogsId: string }>;
}) => {
     const {blogsId} = await params;
     console.log(blogsId)
     const blog = await getBlogById(blogsId);
     return (
          <div>
               <BlogDetailsCard blog={blog?.data}></BlogDetailsCard>
          </div>
     );
};

export default DetailsBlogPage;