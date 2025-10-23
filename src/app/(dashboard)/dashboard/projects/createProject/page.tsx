"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SingleImageUploader from "@/components/SingleImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { create } from "@/actions/project/create";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  projectName: z.string().min(5, "Project name must be at least 5 characters"),
  description: z
    .string()
    .min(5, "Brief Description must be at least 5 characters"),
  thumbnail: z
        .any()
        .refine((file) => file instanceof File, "Thumbnail is required"),
  projectLiveLink: z.string().url("Please enter a valid URL"),
  githubClientSideLink: z.string().url("Please enter a valid URL"),
  githubServerSideLink: z.string().url("Please enter a valid URL"),
  mainTechnologyStackUsed: z.array(
    z.object({
      value: z.string(),
    })
  ),
  challengesFaced: z.array(
    z.object({
      value: z.string(),
    })
  ),
  improvementsAndPlans: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

const CreateProjectPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      description: "",
      projectLiveLink: "",
      githubClientSideLink: "",
      githubServerSideLink: "",
      mainTechnologyStackUsed: [{ value: "" }],
      challengesFaced: [{ value: "" }],
      improvementsAndPlans: [{ value: "" }],
    },
  });

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    const toastId = toast.loading(`Publishing "${data?.projectName}"...”`);

    const projectData = {
      ...data,
      mainTechnologyStackUsed: data.mainTechnologyStackUsed.map((item: {value: string}) => item.value),
      challengesFaced: data.challengesFaced.map((item: {value: string}) => item.value),
      improvementsAndPlans: data.improvementsAndPlans.map((item: {value: string}) => item.value),
    }

    const formData = new FormData();

    formData.append("projectName", data.projectName);
    formData.append("description", data.description);
    formData.append("projectLiveLink", data.projectLiveLink);
    formData.append("githubClientSideLink", data.githubClientSideLink);
    formData.append("githubServerSideLink", data.githubServerSideLink);
    formData.append("mainTechnologyStackUsed", JSON.stringify(projectData.mainTechnologyStackUsed));
    formData.append("challengesFaced", JSON.stringify(projectData.challengesFaced));
    formData.append("improvementsAndPlans", JSON.stringify(projectData.improvementsAndPlans));

    if (data.thumbnail) {
      formData.append("file", data.thumbnail as File);
    }

    const res = await create(formData);
    console.log(res);
    if (res.success) {
      toast.success(
        `✅ "${res?.data?.projectName}" has been published successfully!`,
        { id: toastId }
      );
      form.reset();

      router.push("/dashboard/projects");
    } else {
      toast.error(`❌ Failed to publish "${data?.projectName}".`, { id: toastId });
    }
    
  };

  // Main Technology Stack Used
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mainTechnologyStackUsed",
  });

  // Challenges Faced While Developing the Project
  const {
    fields: challengesFacedFields,
    append: challengesFacedAppend,
    remove: challengesFacedRemove,
  } = useFieldArray({
    control: form.control,
    name: "challengesFaced",
  });

  // Potential Improvements & Future Plans
  const {
    fields: improvementsAndPlansFields,
    append: improvementsAndPlansAppend,
    remove: improvementsAndPlansRemove,
  } = useFieldArray({
    control: form.control,
    name: "improvementsAndPlans",
  });

  return (
    <div>
      <Button>
        <Link href="/dashboard/projects">Back</Link>
      </Button>

      <h1>Create new projects</h1>

      <Form {...form}>
        <form
          id="edit-profile"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          {/* <h2 className="text-3xl font-bold text-center">Login</h2> */}

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2 justify-between">
              {/* Project Name */}
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
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

              {/* Brief Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter brief description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
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
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Project Live Link */}
            <FormField
              control={form.control}
              name="projectLiveLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Live Link</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Project Live Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* GitHub Repository Client Side Link */}
            <FormField
              control={form.control}
              name="githubClientSideLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository Client Side Link</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter GitHub Repository Client Side Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* GitHub Repository Server Side Link */}
            <FormField
              control={form.control}
              name="githubServerSideLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository Server Side Link</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter GitHub Repository Server Side Link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Main Technology Stack Used */}
            <div>
              <div className="flex justify-between">
                <p>Add Main Technology Stack Used</p>
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
                      name={`mainTechnologyStackUsed.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {/* <FormLabel>Project Name</FormLabel> */}
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

            {/* Challenges Faced While Developing the Project */}
            <div>
              <div className="flex justify-between">
                <p>Challenges Faced While Developing the Project</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => challengesFacedAppend({ value: "" })}
                >
                  <Plus></Plus>
                </Button>
              </div>
              <div>
                {challengesFacedFields.map((item, index) => (
                  <div className="flex gap-3" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`challengesFaced.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {/* <FormLabel>Project Name</FormLabel> */}
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
                      onClick={() => challengesFacedRemove(index)}
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

            {/* Potential Improvements & Future Plans */}
            <div>
              <div className="flex justify-between">
                <p>Challenges Faced While Developing the Project</p>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => improvementsAndPlansAppend({ value: "" })}
                >
                  <Plus></Plus>
                </Button>
              </div>
              <div>
                {improvementsAndPlansFields.map((item, index) => (
                  <div className="flex gap-3" key={item.id}>
                    <FormField
                      control={form.control}
                      name={`improvementsAndPlans.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {/* <FormLabel>Project Name</FormLabel> */}
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
                      onClick={() => improvementsAndPlansRemove(index)}
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
          </div>

          <Button type="submit" className="w-full mt-2">
            Add Project
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectPage;
