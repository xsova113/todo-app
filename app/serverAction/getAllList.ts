"use server";

import prisma from "@/prisma/client";

export const getAllList = async () => {
  try {
    return await prisma.todo.findMany();
  } catch (error) {
    throw new Error("No todo list found");
  }
};
