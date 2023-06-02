"use server";

import prisma from "@/prisma/client";

export const deleteAllList = async () => {
  try {
    await prisma.todo.deleteMany({});
    const updatedList = await prisma.todo.findMany({});
    return updatedList;
  } catch (error) {
    throw new Error("Failed to delete");
  }
};
