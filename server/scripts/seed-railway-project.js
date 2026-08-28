import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PROJECT_NAME = "Smart Railway Monitoring Platform";

async function main() {
  const updated = await prisma.project.updateMany({
    where: { name: PROJECT_NAME },
    data: { image: "/rely.png" },
  });

  if (updated.count === 0) {
    console.warn(`No project found with name "${PROJECT_NAME}".`);
    return;
  }

  const project = await prisma.project.findFirst({
    where: { name: PROJECT_NAME },
    select: { id: true, name: true, image: true },
  });

  console.log("Railway monitoring project image updated:", project);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
