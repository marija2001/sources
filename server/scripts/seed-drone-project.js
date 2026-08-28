import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DRONE_NAME = "Drone-Mounted Radar Sensing Prototype";

async function main() {
  const updated = await prisma.project.updateMany({
    where: { name: DRONE_NAME },
    data: { image: "/dron.png" },
  });

  if (updated.count === 0) {
    console.warn(`No project found with name "${DRONE_NAME}".`);
    return;
  }

  const project = await prisma.project.findFirst({
    where: { name: DRONE_NAME },
    select: { id: true, name: true, image: true },
  });

  console.log("Drone project image updated:", project);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
