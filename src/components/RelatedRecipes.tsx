import React, { memo } from "react";
import Label from "./Label";
import useSWR, { Fetcher } from "swr";
import Item from "./Item";

import Skeleton from "./Skeleton";

type Props = {};

const RelatedRecipes = (props: Props) => {
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://api.spoonacular.com/recipes/random?number=6&apiKey=0d3180c799df4f2aac2372cac1093fda`,

    fetcher
  );

  if (isLoading) return <Skeleton number={6} />;
  return (
    <div className="mb-5">
      <Label>Related Recipes</Label>
      <section className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {data?.recipes.map((recipe: any, index: number) => (
          <Item key={index} recipe={recipe} />
        ))}
      </section>
    </div>
  );
};

export default RelatedRecipes;
