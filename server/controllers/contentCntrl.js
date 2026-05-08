import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const getHomeServices = asyncHandler(async (req, res) => {
  const items = await prisma.homeService.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  res.json(items);
});

export const getTeamMembers = asyncHandler(async (req, res) => {
  const items = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
  res.json(items);
});
