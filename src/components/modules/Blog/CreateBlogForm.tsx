"use client";

import SingleImageUploader from "@/components/SingleImageUploader";
import Form from "next/form";
import { useState } from "react";

const CreateBlogForm = () => {
  const [isFeatured, setIsFeatured] = useState("false");
  const [image, setImage] = useState<File | null>(null);

  const handleAction = async(data: FormData) => {
    const blogInfo = Object.fromEntries(data.entries());
    console.log(blogInfo)
  }


  return (
    <Form action={handleAction}>
      <div className="grid grid-cols-2 gap-8">
        {/* title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="content">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* content */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
            Thumbnail URL
          </label>
          <SingleImageUploader onChange={setImage}></SingleImageUploader>
          {/* <input
            type="url"
            id="thumbnail"
            name="thumbnail"
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          /> */}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Next.js, React, Web Development"
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Featured */}
        <div>
          <p className="block text-sm font-medium mb-1">Featured</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isFeatured"
                value="true"
                checked={isFeatured === "true"}
                onChange={(e) => setIsFeatured(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isFeatured"
                value="false"
                checked={isFeatured === "false"}
                onChange={(e) => setIsFeatured(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              No
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </Form>
  );
};

export default CreateBlogForm;
