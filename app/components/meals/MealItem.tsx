import { MealWithTags } from "@/types/MealWIthTags";
import Image from "next/image";
import Link from "next/link";


type Props = {
  meal: MealWithTags;
};



export const MealItem: React.FC<Props> = ({ meal }) => {
  return (
    <div key={meal.id} className="flex flex-col items-center">
      <Link
        href={{
          pathname: "meals/meal",
          query: {
            id: meal.id,
          },
        }}
        className="flex flex-col items-center bg-orange-50 p-4 rounded-lg border-2 md:w-[85%] gap-3 hover:scale-105 hover:opacity-80 hover:cursor-pointer"
      >
        <div className="text-2xl font-semibold text-ellipsis">{meal.title}</div>
        <Image
          width={400}
          height={300}
          className="rounded-lg border-4 opacity-90"
          alt=""
          src={
            "https://cdn.pixabay.com/photo/2023/06/12/11/34/mushrooms-8058299_960_720.jpg"
          }
        />
        <div className="w-3/4 max-h-24 overflow-clip text-lg text-zinc-700 border-b">
          {meal.description}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 text-ellipsis  w-full">
          {meal.tags.map((item) => <div key={item.id} className="bg-orange-800 px-2 h-8  py-1 rounded-lg text-white font-bold ">
            {item.name}
          </div>)}
        </div>
      </Link>
    </div>
  );
};
