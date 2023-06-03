"use client";

import { BsCheck, BsX } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Todo } from "@prisma/client";
import { updateComplete } from "../serverAction/updateComplete";
import { Reorder } from "framer-motion";

interface TodoBoxProps {
  item: Todo;
  setIsCompleted: any;
  handleDelete: (value: number) => void;
  index: number;
}

const TodoBox: React.FC<TodoBoxProps> = ({ item, index, handleDelete }) => {
  const [isComplete, setIsComplete] = useState<boolean>();

  const handleUpdate = async (id: number, complete: boolean) => {
    const updatedList = await updateComplete(id, complete);
    setIsComplete(updatedList.complete);
  };

  useEffect(() => {
    setIsComplete(item.complete);
  }, [item.complete]);

  return (
    <Reorder.Item value={item} as="div" id={item.id.toString()}>
      <div
        className={` w-full text-[13px] transition dark:bg-[#25273C] dark:text-[#CACDE8] dark:border-gray-700 bg-white border-gray-100 ${
          index === 0 && "rounded-t-md"
        } shadow-2xl border-b group`}
      >
        <div className=" flex items-center justify-end">
          <div
            className={`flex mr-5 hover:border-blue-400 transition dark:border-gray-600 border-gray-300 rounded-full border cursor-pointer`}
          >
            <input
              id={item.id ? item.id.toLocaleString() : index.toLocaleString()}
              type="checkbox"
              defaultChecked={item.complete}
              className={`cursor-pointer w-5 h-5 appearance-none rounded-full ${
                isComplete && "bg-gradient-to-br from-sky-400 to-purple-500"
              } transition`}
              onChange={(e) => {
                handleUpdate(item.id, e.target.checked);
                setIsComplete(item.complete);
              }}
            />
            <BsCheck
              size={15}
              className={`m-[3px] ${
                isComplete === true ? "absolute" : "hidden"
              } fill-white transition pointer-events-none`}
            />
          </div>

          <label
            htmlFor={
              item.id ? item.id.toLocaleString() : index.toLocaleString()
            }
            className={`h-[55px] w-[85%] flex justify-between items-center cursor-pointer ${
              isComplete === true && "line-through opacity-40"
            } transition`}
          >
            {item.title}
          </label>
          <button
            className="absolute mr-3 opacity-30"
            onClick={() => handleDelete(item.id)}
          >
            <BsX size={30} className="hidden group-hover:block" />
          </button>
        </div>
      </div>
    </Reorder.Item>
  );
};

export default TodoBox;
