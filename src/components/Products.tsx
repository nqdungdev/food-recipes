"use client";

import React, { useEffect, useRef } from "react";
import Item from "./Item";
import useSWR, { Fetcher } from "swr";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const searchParams = useSearchParams();
  const ref = useRef(null);
  const { width } = useContainerDimensions(ref);
  const number = useRef<number>(12);
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=${
      number.current
    }&offset=${
      ((Number(searchParams.get("page")) || 1) - 1) * number.current
    }&apiKey=0d3180c799df4f2aac2372cac1093fda`,

    fetcher
  );

  useEffect(() => {
    console.log(width);
    if (width >= 1024 - 96) number.current = 12;
    else if (width < 1024 - 96 && width >= 768 - 96) number.current = 9;
    else if (width < 768 - 96 && width >= 640 - 96) number.current = 8;
    else number.current = 6;
    return () => {};
  }, [width]);

  console.log({ data, error, isLoading });

  if (isLoading) return <Skeleton number={number.current} />;
  return (
    <>
      <section
        ref={ref}
        className="pt-20 mx-auto w-full min-h-screen bg-primary"
      >
        {/* <section className="px-6 flex flex-row justify-between"> */}
        {/* <div className="flex flex-wrap mt-4 lg:mb-4 mb-8">
            {["All", "African", "American", "Chinese"].map((label, index) => (
              <button
                key={index}
                value={label}
                // onClick={() => handleBtns(label)}
                className={`mr-2 text-secondary border-secondary border-2 py-1 px-6 md:w-24 h-10 rounded-lg text-lg ${
                  activeTab === label
                    ? "bg-secondary outline-none text-textColor"
                    : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div> */}
        {/* </section> */}

        <section className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {data?.results?.map((recipe: any, index: number) => (
            <Item key={index} recipe={recipe} />
          ))}
        </section>

        {data && <Pagination total={data.totalResults} limit={9} />}
      </section>
    </>
  );
};

export default Products;
