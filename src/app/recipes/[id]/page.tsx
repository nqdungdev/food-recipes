"use client";
import { useParams } from "next/navigation";
import React from "react";
import useSWR, { Fetcher } from "swr";

type Props = {};

const Recipe = (props: Props) => {
  const { id } = useParams();
  console.log(id);
  const fetcher: Fetcher<any, string> = (...args) =>
    fetch(...args).then((res) => res.json());
  const {
    data: recipe,
    error,
    isLoading,
  } = useSWR(
    // id &&
    //   `https://api.spoonacular.com/recipes/${id}/information?apiKey=0d3180c799df4f2aac2372cac1093fda`,
    "",
    fetcher
  );
  console.log({ recipe, error, isLoading });
  return <></>;
};

export default Recipe;
