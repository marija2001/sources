export const HACCP_TEMPLATE = "haccp";

export function isHaccpProject(project) {
  if (!project) return false;
  if (project.template === HACCP_TEMPLATE) return true;
  const name = (project.name ?? "").toLowerCase();
  return name.includes("haccp");
}
