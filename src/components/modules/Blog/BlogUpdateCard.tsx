"use client";

import { updateBlog } from "@/actions/blog/update";
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateBlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  content: z.string().min(20, "Content must be at least 20 characters").optional(),
  tags: z.array(
    z.object({
      value: z.string(),
    })
  ).optional(),
  isFeatured: z.string().min(2, "Featured selection is required").optional(),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail is required").optional(),
});

const BlogUpdateCard = ({ blog }) => {
  const router = useRouter();
  const [editFile, setEditFile] = useState(false);
  const blogInfo = blog?.data;

  const form = useForm({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: blogInfo?.title || "",
      description: blogInfo?.description || "",
      content: blogInfo?.content || "",
      tags:
        blogInfo?.tags?.length > 0
          ? blogInfo?.tags.map((item: string) => ({
              value: item,
            }))
          : [{ value: "" }],
      isFeatured:
        blogInfo?.isFeatured === true
          ? "true"
          : blogInfo?.isFeatured === false
          ? "false"
          : "false",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateBlogSchema>) => {
    const toastId = toast.loading(`Updating "${data?.title}"...”`);
    const blogData = {
      ...data,
      tags: (data.tags ?? []).map((item: { value: string }) => item.value),
    };

    const formData = new FormData();

    formData.append("title", blogData.title ?? "");
    formData.append("description", blogData.description ?? "");
    formData.append("content", blogData.content ?? "");
    formData.append(
      "tags",
      JSON.stringify(blogData.tags)
    );
    formData.append("isFeatured", blogData.isFeatured ?? "");

    if (data.thumbnail) {
      formData.append("file", data.thumbnail as File);
    }

    const res = await updateBlog(blogInfo?.id, formData);
    if (res.success) {
      toast.success(
        `✅ "${res?.data?.title}" has been updated successfully!`,
        { id: toastId }
      );
      form.reset();

      router.push("/dashboard/blogs");
    } else {
      toast.error(`❌ Failed to updating "${data?.title}".`, {
        id: toastId,
      });
    }
  };

  // Tags
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });
  return (
    <div>
      <h1>Update Blog</h1>

      <Form {...form}>
        <form
          id="edit-profile"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          {/* <h2 className="text-3xl font-bold text-center">Login</h2> */}

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-2 justify-between">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!editFile ? (
              <>
                {blogInfo?.file ? (
                  <div className="relative w-64 h-40 border rounded-lg overflow-hidden">
                    <Image
                      src={blogInfo?.file}
                      alt={blogInfo?.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No File uploaded yet</p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setEditFile(true)}
                >
                  Edit Thumbnail
                </Button>
              </>
            ) : (
              <>
                <div className="">
                  {/* File */}
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
                        <FormControl>
                          <SingleImageUploader
                            onChange={(file) => field.onChange(file)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-2"
                  onClick={() => setEditFile(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Tags */}
            <div>
              <div className="flex justify-between">
                <p>Tags</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => append({ value: "" })}
                >
                  <Plus></Plus>
                </Button>
              </div>
              <div>
                {fields.map((item, index) => (
                  <div className="flex gap-3" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`tags.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter project name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      onClick={() => remove(index)}
                      size="icon"
                      type="button"
                      className="cursor-pointer"
                    >
                      {" "}
                      <Trash2></Trash2>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            {/* featured */}

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="featured-yes" />
                        <Label htmlFor="featured-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="featured-no" />
                        <Label htmlFor="featured-no">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-2">
            Update Blog
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogUpdateCard;
