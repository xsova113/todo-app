"use server";

import prisma from "@/prisma/client";
import { Todo } from "@prisma/client";

export const addNew = async (data: Todo) => {
  try {
    await prisma.todo.create({
      data: {
        title: data.title,
        complete: false,
      },
    });
    const updatedList = await prisma.todo.findMany({});
    return updatedList;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
