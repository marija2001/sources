import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// ✔ Kreiranje novog projekta
export const createProject = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    company,
    website,
    userEmail,
  } = req.body.data;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        image,
        company,
        website,
        userEmail,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Project created successfully", project });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A project with the same name already exists for this user");
    }
    throw new Error(err.message);
  }
});


export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(projects);
});

// ✔ Dohvatanje projekta po ID-ju
export const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    res.send(project);
  } catch (err) {
    throw new Error(err.message);
  }
});

// ✔ Dohvatanje svih projekata jednog korisnika
export const getProjectsByUser = asyncHandler(async (req, res) => {
  const { userEmail } = req.params;

  try {
    const projects = await prisma.project.findMany({
      where: { userEmail },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.send(projects);
  } catch (err) {
    throw new Error(err.message);
  }
});
