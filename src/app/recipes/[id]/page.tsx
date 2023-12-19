"use client";
import Badge from "@/components/Badge";
import Instructions from "@/components/Instructions";
import Label from "@/components/Label";
import RelatedRecipes from "@/components/RelatedRecipes";
import Skeleton from "@/components/Skeleton";
import WidgetIngredients from "@/components/WidgetIngredients";
import WidgetNutritional from "@/components/WidgetNutritional";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaClock, FaDollarSign, FaHeart, FaPercent } from "react-icons/fa";
import useSWR, { Fetcher } from "swr";

type Props = {};

const Recipe = (props: Props) => {
  const { id } = useParams();
  const fetcher: Fetcher<any, string> = (...args) =>
    fetch(...args).then((res) => res.json());
  const {
    data: recipe,
    error,
    isLoading,
  } = useSWR(
    id &&
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=0d3180c799df4f2aac2372cac1093fda`,

    fetcher
  );

  console.log({ recipe, error, isLoading });

  const getNutrients = (label: string) => {
    const result = recipe?.nutrition?.nutrients.reduce(
      (text: string, element: any) => {
        if (element.name === label)
          return (text = `${element.amount}${element.unit} ${element.name}`);
        return text;
      },
      [""]
    );
    return result;
  };

  return (
    <article>
      <h1 className="mb-4 text-4xl font-light text-textColor">
        {recipe?.title}
      </h1>

      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-2">&nbsp;</div>
        <div className="col-span-8 relative min-h-[300px] md:min-h-[400px]">
          {recipe ? (
            <Image
              src={recipe.image}
              fill
              sizes="80vw"
              priority
              alt={recipe.title}
              title={recipe.title}
            />
          ) : (
            <Skeleton number={1} />
          )}
        </div>
        <div className="col-span-2"></div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm my-5">
        <div className="flex flex-col items-center gap-1">
          <Badge className="bg-orange-500 text-white">
            <FaDollarSign />
          </Badge>
          <p>${recipe?.pricePerServing} per serving</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Badge className="bg-pink-500 text-white">
            <FaHeart />
          </Badge>
          <p>Health Score: {recipe?.healthScore}%</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Badge className="bg-violet-500 text-white">
            <FaClock />
          </Badge>
          <p>Ready in {recipe?.readyInMinutes} minutes</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Badge className="bg-green-500 text-white">
            <FaPercent />
          </Badge>
          <p>Spoonacular Score: {Math.round(recipe?.spoonacularScore)}%</p>
        </div>
      </div>

      <div>
        <strong>{recipe?.title}</strong> might be a good recipe to expand your
        main course recipe box. One serving contains{" "}
        <strong>{getNutrients("Calories")}</strong>,{" "}
        <strong>{getNutrients("Protein")}</strong>, and{" "}
        <strong>{getNutrients("Fat")}</strong>.
        <i>This recipe serves {recipe?.servings}</i>. From preparation to the
        plate, this recipe takes approximately{" "}
        <strong>{recipe?.readyInMinutes} minutes</strong>. Overall, this recipe
        earns an{" "}
        <strong>
          excellent spoonacular score of {Math.round(recipe?.spoonacularScore)}%
        </strong>
        , which is tremendous.
      </div>

      {recipe && <WidgetIngredients recipe={recipe} />}

      {recipe && (
        <Instructions
          analyzedInstructions={recipe.analyzedInstructions}
          sourceUrl={recipe.sourceUrl}
          sourceName={recipe.sourceName}
        />
      )}

      {recipe && (
        <WidgetNutritional
          healthScore={recipe.healthScore}
          nutrition={recipe.nutrition}
        />
      )}

      <RelatedRecipes />
    </article>
  );
};

export default Recipe;
