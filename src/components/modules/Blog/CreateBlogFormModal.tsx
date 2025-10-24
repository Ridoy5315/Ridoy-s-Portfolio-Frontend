"use client";

import { create } from "@/actions/blog/create";
import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { redirect, useRouter } from "next/navigation";
// import Form from "next/form";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  tags: z.array(
    z.object({
      value: z.string(),
    })
  ),
  isFeatured: z.string().min(2, "Featured selection is required"),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail is required"),
});

const CreateBlogFormModal = () => {
  // const [isFeatured, setIsFeatured] = useState("false");
  // const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: [{ value: "" }],
      isFeatured: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof blogSchema>) => {
    const toastId = toast.loading(`Publishing "${data?.title}"...”`);

    const blogData = {
      ...data,
      tags: data.tags.map((item: { value: string }) => item.value),
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("tags", JSON.stringify(blogData.tags));
    formData.append("isFeatured", blogData.isFeatured);

    if (data.thumbnail) {
      formData.append("file", data.thumbnail as File);
    }
    try {
      const res = await create(formData);
      console.log(res);
      if (res.success) {
        toast.success(
          `✅ "${res?.data?.title}" has been published successfully!`,
          { id: toastId }
        );
        form.reset();
        setOpen(false);

        router.push("/dashboard/blogs");
      }
    } catch (error) {
      toast.error(`❌ Failed to publish "${data?.title}".`, { id: toastId });
    }
  };

  // Tags
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="lg:text-sm text-xs">Create Blog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create A Blog</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              id="edit-profile"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              {/* <h2 className="text-3xl font-bold text-center">Login</h2> */}

              <div className="grid grid-cols-2 gap-5">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter title"
                          {...field}
                        />
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
              </div>
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

              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        onChange={(file) => field.onChange(file)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid  grid-cols-2 gap-6">
                {/* tags */}
                <div>
                  <div className="flex justify-between">
                    <p>Add Tags</p>
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
                              {/* <FormLabel>Project Name</FormLabel> */}
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter tags"
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

              {/* <Button type="submit" className="w-full mt-2">
                Login
              </Button> */}
            </form>
          </Form>
          <DialogFooter className="flex flex-row">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="edit-profile">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateBlogFormModal;
