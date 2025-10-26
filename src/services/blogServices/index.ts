export const getBlogById = async (blogId?: string) => {
  console.log(blogId);
  if (blogId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`
    );
    console.log(res);
    return await res.json();
  }
};
