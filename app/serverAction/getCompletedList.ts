"use server";

import prisma from "@/prisma/client";

export const getCompletedList = async () => {
  try {
    const completedList = await prisma.todo.findMany({
      where: {
        complete: true,
      },
    });

    return completedList;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
