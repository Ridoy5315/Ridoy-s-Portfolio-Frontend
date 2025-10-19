import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({blog}) => {
  return (
    <Link href={`/dashboard/blogs/${blog?.id}`}>
      {blog?.file ? (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={blog.file}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
          No Image
        </div>
      )}
      <div>
        <p>{blog?.title}</p>
        <p>{blog?.description}</p>
        <p>{blog?.content}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
