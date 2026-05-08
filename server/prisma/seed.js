import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.homeService.deleteMany({});
  await prisma.teamMember.deleteMany({});

  await prisma.homeService.createMany({
    data: [
      {
        iconKey: "FaMicrochip",
        title: "Firmware & embedded",
        blurb:
          "Bare-metal to BSP work: drivers, boot flow, and releases you can ship and maintain.",
        sortOrder: 0,
      },
      {
        iconKey: "MdOutlineDeveloperBoard",
        title: "Hardware & PCB",
        blurb:
          "Schematics through bring-up — prototypes you can measure, debug, and iterate fast.",
        sortOrder: 1,
      },
      {
        iconKey: "FaNetworkWired",
        title: "IoT & connectivity",
        blurb:
          "Devices, protocols, and cloud-facing paths integrated with your product constraints.",
        sortOrder: 2,
      },
      {
        iconKey: "HiOutlineRocketLaunch",
        title: "Product engineering",
        blurb:
          "Clear scope, documentation, and support from pilot builds toward production readiness.",
        sortOrder: 3,
      },
    ],
  });

  await prisma.teamMember.createMany({
    data: [
      {
        name: "Placeholder name",
        role: "Firmware & hardware lead",
        photo: "/programming.jpg",
        bio: [
          "Replace this with a short bio: focus areas, years of experience, and what you drive on client projects.",
          "Optional second paragraph — tools, domains (embedded Linux, MCUs, RF), or how you collaborate with product teams.",
        ],
        sortOrder: 0,
      },
      {
        name: "Placeholder name",
        role: "Systems & integration",
        photo: "/programmingg.jpg",
        bio: [
          "Second profile slot — edit copy and swap the image path when you have real headshots.",
          "Keep paragraphs concise; visitors scan before they read in depth.",
        ],
        sortOrder: 1,
      },
    ],
  });

  console.log("Seed: HomeService + TeamMember inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
