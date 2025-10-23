export const getProjectById = async (projectId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${projectId}`);
  return await res.json();

};