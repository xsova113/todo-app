import { Todo } from "@prisma/client";
import { getActiveList } from "../serverAction/getActiveList";
import { getAllList } from "../serverAction/getAllList";
import { deleteAllList } from "../serverAction/deleteAllList";
import { getCompletedList } from "../serverAction/getCompletedList";
import { useEffect } from "react";

interface TodoProps {
  list?: Todo[];
  setList: (value: any) => void;
}

const FilterBox: React.FC<TodoProps> = ({ list, setList }) => {
  const handleDelete = async () => {
    const data = await deleteAllList();
    setList(data);
  };

  async function allList() {
    const list = await getAllList();
    setList(list);
  }


  const activeList = async () => {
    const activeList = await getActiveList();
    setList(activeList);
  }

  async function completedList() {
    const completedList = await getCompletedList();
    setList(completedList);
  }

  return (
    <>
      <div
        className={`w-full text-[13px] transition dark:bg-[#25273C] bg-white shadow-xl rounded-b-md`}
      >
        <div className="flex items-center justify-between h-[45px] font-semibold text-[10px] mx-6  dark:text-[#575974] text-[#a2a1a6]">
          <span className="">{list?.length} items left</span>
          <div className="hidden sm:flex gap-4 pl-6">
            <button className="hover:text-[#4e78cd]" onClick={allList}>
              All
            </button>
            <button className="hover:text-[#4e78cd]" onClick={activeList}>
              Active
            </button>
            <button className="hover:text-[#4e78cd]" onClick={completedList}>
              Completed
            </button>
          </div>
          <button className="hover:text-[#4e78cd]" onClick={handleDelete}>
            Clear completed
          </button>
        </div>
      </div>

      <div
        className={`sm:hidden mt-5 w-full text-[13px] transition dark:bg-[#25273C] bg-white shadow-xl rounded-md`}
      >
        <div className="flex items-center justify-center gap-[40px] h-[45px] font-semibold text-[10px] mx-6 dark:text-[#575974] text-[#a2a1a6]">
          <button className="hover:text-[#4e78cd]">All</button>
          <button className="hover:text-[#4e78cd]">Active</button>
          <button className="hover:text-[#4e78cd]">Completed</button>
        </div>
      </div>
    </>
  );
};

export default FilterBox;
