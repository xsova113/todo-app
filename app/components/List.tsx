"use client";

import ThemeSwitcher from "./ThemeSwitcher";
import { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import TodoBox from "./TodoBox";
import FilterBox from "./FilterBox";
import { Todo } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAllList } from "../serverAction/getAllList";
import { addNew } from "../serverAction/addNew";
import { deleteItem } from "../serverAction/deleteItem";
import { Reorder } from "framer-motion";

const List = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [list, setList] = useState<Todo[]>();
  const { register, handleSubmit, reset } = useForm<Todo>({
    defaultValues: {
      title: "",
      complete: false,
    },
  });

  async function getList() {
    const list = await getAllList();
    setList(list);
  }

  useEffect(() => {
    getList();
  }, []);

  async function handleDelete(id: number) {
    const updatedList = await deleteItem(id);
    setList(updatedList);
  }

  const addItem: SubmitHandler<Todo> = async (data) => {
    const newList = await addNew(data);
    setList(newList);
    reset();
  };

  return (
    <div
      className={`z-50 min-h-screen flex-col sm:w-[40%] w-[90%] pt-14 dark:text-white text-[#34364C]
      `}
    >
      <div className="flex w-full justify-between mb-5">
        <h1 className="text-white text-3xl tracking-[18px] font-semibold">
          TODO
        </h1>
        <ThemeSwitcher />
      </div>

      <div
        className={`w-full text-[13px] sm:shadow-xl shadow-md transition dark:bg-[#25273C] bg-white rounded-md mt-3`}
      >
        <div className="flex items-center justify-end">
          <div
            className={`flex mr-5 transition dark:border-gray-600 border-gray-300
            ${
              isCompleted && "bg-gradient-to-br from-sky-400 to-purple-500"
            } hover:border rounded-full border cursor-pointer`}
            onClick={() => setIsCompleted((prev) => !prev)}
          >
            <BsCheck
              size={15}
              className={`m-[3px] fill-white ${
                isCompleted && "opacity-100"
              } opacity-0`}
            />
          </div>

          <form
            onSubmit={handleSubmit(addItem)}
            className="flex justify-between w-[85%]"
          >
            <input
              type="text"
              className={`flex outline-none w-[85%] h-[55px] rounded-md transition dark:bg-[#25273C] dark:text-[#CACDE8] bg-white`}
              {...register("title")}
            />
            <button
              type="submit"
              className="text-white p-3 rounded-sm bg-green-500 hidden"
            >
              submit
            </button>
          </form>
        </div>
      </div>

      <Reorder.Group
        axis="y"
        as="div"
        values={list ? list : []}
        onReorder={setList}
        className="mt-7"
      >
        {list?.map((item, index) => (
          <TodoBox
            key={item.id}
            index={index}
            item={item}
            setIsCompleted={setIsCompleted}
            handleDelete={handleDelete}
          />
        ))}
      </Reorder.Group>

      <FilterBox list={list} setList={setList} />

      <span className="flex justify-center my-10 text-xs text-[#CACDE8]">
        Drag and drop to reorder list
      </span>
    </div>
  );
};

export default List;
