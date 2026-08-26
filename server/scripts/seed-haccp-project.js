import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const HACCP_NAME = "Digital HACCP Assistant";
const LEGACY_NAME = "Digitalni HACCP Asistent";

const HACCP_DESCRIPTION =
  "IoT system for automated HACCP refrigeration records: live temperatures, alerts, reports, and digital compliance for food-service businesses in Montenegro.";

async function main() {
  await prisma.project.updateMany({
    where: { name: LEGACY_NAME },
    data: {
      name: HACCP_NAME,
      template: "haccp",
      image: "/haccp.png",
      description: HACCP_DESCRIPTION,
    },
  });

  const project = await prisma.project.upsert({
    where: { name: HACCP_NAME },
    create: {
      name: HACCP_NAME,
      template: "haccp",
      image: "/haccp.png",
      description: HACCP_DESCRIPTION,
    },
    update: {
      template: "haccp",
      image: "/haccp.png",
      description: HACCP_DESCRIPTION,
    },
  });

  console.log("HACCP project upserted:", project.id, project.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
