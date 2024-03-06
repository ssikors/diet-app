import { Tag } from "@prisma/client";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  tags: Tag[];
  selectedTags: number[];
  setSelectedTags: any;
};

export const TagFilter: React.FC<Props> = ({
  tags,
  selectedTags,
  setSelectedTags,
}) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const changeSelection = (id: number) => {
    const newSelectedTags = selectedTags;
    var index = newSelectedTags.indexOf(id);
    if (index > -1) {
      newSelectedTags.splice(index, 1);
    } else {
      newSelectedTags.push(id);
    }
    setSelectedTags(newSelectedTags);
    setHidden(true);
  };

  return (
    <div className="relative inline-block text-left ml-4">
      <div>
        <button
          onClick={() => {
            setHidden(!hidden);
          }}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="filter-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Filters
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {hidden ? (
        ""
      ) : (
        <div
          className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          aria-orientation="vertical"
          aria-labelledby="filter-button"
        >
          <div className="py-1">
            {tags.map((item) => (
              <a
                key={item.id}
                onClick={() => {
                  changeSelection(item.id);
                }}
                className={`hover:cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-neutral-300`}
              >
                <div className="flex flex-row items-center justify-between">
                  {item.name}
                  <div>
                    {selectedTags.includes(item.id) ? (
                      <FaCheckCircle className="text-green-600 scale-125" />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
