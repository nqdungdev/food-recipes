import Image from "next/image";
import { useState } from "react";
import Label from "./Label";

type Props = {
  recipe: any;
};

const WidgetIngredients = ({ recipe }: Props) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [measure, setMeasure] = useState<"metric" | "us">("metric");
  const [serving, setServing] = useState<number>(recipe.servings || 1);

  const roundNumber = (number: number) => {
    const decimalPlaces = number.toString().split(".")[1]?.length;
    if (decimalPlaces > 3) return number.toFixed(3);
    return number;
  };

  return (
    <div>
      <Label>Ingredients</Label>
      <div className="text-xs text-[#666] font-normal flex justify-between h-6 mb-10">
        <div className="relative w-[130px] h-full bg-[#b6b6b6] text-white flex">
          <input
            id="grid"
            className="hidden"
            name="view"
            type="radio"
            defaultChecked
            onChange={() => setView("grid")}
          />
          <label
            htmlFor="grid"
            className={`relative w-1/2 h-full flex justify-center items-center m-0 text-white text-center z-20 cursor-pointer   
              `}
          >
            grid
          </label>
          <input
            id="list"
            className="hidden"
            name="view"
            type="radio"
            onChange={() => setView("list")}
          />
          <label
            htmlFor="list"
            className={`relative w-1/2 h-full flex justify-center items-center m-0 text-white text-center z-20 cursor-pointer `}
          >
            list
          </label>
          <span
            className={`absolute top-0 ${
              view === "grid" ? "left-0" : "left-1/2"
            } transition-all w-1/2 h-full z-10 bg-[#279fca]`}
          />
        </div>

        <div className="w-[140px] h-full flex items-center">
          <span>Servings:</span>
          <input
            className="mx-1 h-full w-10 focus:outline-none"
            type="number"
            size={2}
            defaultValue={serving}
            onChange={(event) => setServing(Number(event?.target.value))}
          />
        </div>

        <div className="relative w-[130px] h-full bg-[#b6b6b6] text-white flex">
          <input
            id="metric"
            className="hidden"
            name="measure"
            type="radio"
            defaultChecked
            onChange={() => setMeasure("metric")}
          />
          <label
            htmlFor="metric"
            className="relative w-1/2 h-full flex justify-center items-center m-0 text-white text-center z-20 cursor-pointer"
          >
            metric
          </label>
          <input
            id="us"
            className="hidden"
            name="measure"
            type="radio"
            onChange={() => setMeasure("us")}
          />
          <label
            htmlFor="us"
            className="relative w-1/2 h-full flex justify-center items-center m-0 text-white text-center z-20 cursor-pointer"
          >
            US
          </label>
          <span
            className={`absolute top-0 ${
              measure === "metric" ? "left-0" : "left-1/2"
            } transition-all w-1/2 h-full z-10 bg-[#279fca]`}
          />
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-12">
          <div className="hidden md:block md:col-span-2"></div>
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {recipe?.extendedIngredients.map(
                (ingredient: any, index: number) =>
                  ingredient.id !== -1 && (
                    <div key={index} className="col-span-1">
                      <div className="flex flex-col items-center gap-2 h-full">
                        <div className="text-sm">
                          {roundNumber(
                            (ingredient.measures[measure].amount /
                              recipe.servings) *
                              serving
                          )}{" "}
                          {ingredient.measures[measure].unitShort}
                        </div>
                        <div className="relative w-20 h-20 block">
                          <Image
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                            fill
                            sizes="20vw"
                            style={{ objectFit: "contain" }}
                            alt={ingredient.name}
                            title={ingredient.name}
                          />
                        </div>
                        <div className="text-center text-xs">
                          {ingredient.name}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="hidden md:block md:col-span-2"></div>
        </div>
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-2"></div>
          <div className="col-span-8">
            {recipe?.extendedIngredients.map(
              (ingredient: any, index: number) =>
                ingredient.id !== -1 && (
                  <div
                    key={index}
                    className="w-full border-b border-solid border-[#036] text-lg leading-[80px] py-1 grid grid-cols-12 gap-2 items-center"
                  >
                    <div className="relative col-span-3 h-20 w-20">
                      <Image
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                        fill
                        sizes="20vw"
                        style={{ objectFit: "contain" }}
                        alt={ingredient.name}
                        title={ingredient.name}
                      />
                    </div>
                    <div className="col-span-3">
                      {roundNumber(
                        (ingredient.measures[measure].amount /
                          recipe.servings) *
                          serving
                      )}{" "}
                      {ingredient.measures[measure].unitShort}
                    </div>

                    <div className="col-span-6">{ingredient.name}</div>
                  </div>
                )
            )}
          </div>
          <div className="col-span-2"></div>
        </div>
      )}
    </div>
  );
};

export default WidgetIngredients;
