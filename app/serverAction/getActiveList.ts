"use server";

import prisma from "@/prisma/client";

export const getActiveList = async () => {
  try {
    const activeList = await prisma.todo.findMany({
      where: {
        complete: false,
      },
    });
    return activeList;
  } catch (error) {
    console.log("failed to get active list");
  }
};
