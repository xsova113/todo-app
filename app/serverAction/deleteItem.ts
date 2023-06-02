"use server";

import prisma from "@/prisma/client";

export const deleteItem = async (id: number) => {
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });

    return await prisma.todo.findMany();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
