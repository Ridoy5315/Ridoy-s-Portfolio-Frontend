"use client";

import { updateProject } from "@/actions/project/update";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const updateProjectSchema = z.object({
  projectName: z
    .string()
    .min(5, "Project name must be at least 5 characters")
    .optional(),
  description: z
    .string()
    .min(5, "Brief Description must be at least 5 characters")
    .optional(),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File, "Thumbnail is required")
    .optional(),
  projectLiveLink: z.string().url("Please enter a valid URL").optional(),
  githubClientSideLink: z.string().url("Please enter a valid URL").optional(),
  githubServerSideLink: z.string().url("Please enter a valid URL").optional(),
  mainTechnologyStackUsed: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  challengesFaced: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
  improvementsAndPlans: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
});

const ProjectUpdateCard = ({ project }) => {
  const projectInfo = project?.data;
  const [editThumbnail, setEditThumbnail] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      projectName: projectInfo?.projectName || "",
      description: projectInfo?.description || "",
      projectLiveLink: projectInfo?.projectLiveLink || "",
      githubClientSideLink: projectInfo?.githubClientSideLink || "",
      githubServerSideLink: projectInfo?.githubServerSideLink || "",
      mainTechnologyStackUsed:
        projectInfo.mainTechnologyStackUsed?.length > 0
          ? projectInfo.mainTechnologyStackUsed.map((item: string) => ({
              value: item,
            }))
          : [{ value: "" }],
      challengesFaced:
        projectInfo?.challengesFaced?.length > 0
          ? projectInfo?.challengesFaced.map((item: string) => ({
              value: item,
            }))
          : [{ value: "" }],
      improvementsAndPlans:
        projectInfo?.improvementsAndPlans?.length > 0
          ? projectInfo?.improvementsAndPlans.map((item: string) => ({
              value: item,
            }))
          : [{ value: "" }],
    },
  });

  const onSubmit = async (data: z.infer<typeof updateProjectSchema>) => {
     const toastId = toast.loading(`Updating "${data?.projectName}"...”`);
    console.log(data);
    const projectData = {
      ...data,
      mainTechnologyStackUsed: (data.mainTechnologyStackUsed ?? []).map((item: { value: string }) => item.value),
      challengesFaced: (data.challengesFaced ?? []).map((item: { value: string }) => item.value),
      improvementsAndPlans: (data.improvementsAndPlans ?? []).map((item: { value: string }) => item.value),
    };

    console.log(projectData)

    const formData = new FormData();

    formData.append("projectName", data.projectName ?? "");
    formData.append("description", data.description ?? "");
    formData.append("projectLiveLink", data.projectLiveLink ?? "");
    formData.append("githubClientSideLink", data.githubClientSideLink ?? "");
    formData.append("githubServerSideLink", data.githubServerSideLink ?? "");
    formData.append("mainTechnologyStackUsed", JSON.stringify(projectData.mainTechnologyStackUsed));
    formData.append("challengesFaced", JSON.stringify(projectData.challengesFaced));
    formData.append("improvementsAndPlans", JSON.stringify(projectData.improvementsAndPlans));

    if (data.thumbnail) {
      formData.append("file", data.thumbnail as File);
    }

     const res = await updateProject(projectInfo?.id, formData);
    if (res.success) {
      toast.success(
        `✅ "${res?.data?.projectName}" has been updated successfully!`,
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
      {/* <Button>
        <Link href="/dashboard/projects">Back</Link>
      </Button> */}

      <h1>Update projects</h1>

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

            {!editThumbnail ? (
              <>
                {projectInfo?.thumbnail ? (
                  <div className="relative w-64 h-40 border rounded-lg overflow-hidden">
                    <Image
                      src={projectInfo?.thumbnail}
                      alt={projectInfo?.projectName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No thumbnail uploaded yet
                  </p>
                )}
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setEditThumbnail(true)}
                >
                  Edit Thumbnail
                </Button>
              </>
            ) : (
              <>
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
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-2"
                  onClick={() => setEditThumbnail(false)}
                >
                  Cancel
                </Button>
              </>
            )}
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
            Update Project
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProjectUpdateCard;
