"use server";

import prisma from "@/prisma/client";

export const updateComplete = async (id: number, complete: boolean) => {
  try {
    const updatedList = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        complete,
      },
    });

    return updatedList;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
