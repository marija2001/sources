import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SMART_HOME_NAME = "Connected Smart-Home Product Platform";

async function main() {
  const updated = await prisma.project.updateMany({
    where: { name: SMART_HOME_NAME },
    data: { image: "/smart_home.png" },
  });

  if (updated.count === 0) {
    console.warn(`No project found with name "${SMART_HOME_NAME}".`);
    return;
  }

  const project = await prisma.project.findFirst({
    where: { name: SMART_HOME_NAME },
    select: { id: true, name: true, image: true },
  });

  console.log("Smart home project image updated:", project);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
