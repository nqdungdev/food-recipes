"use client";

import React, { useState } from "react";
import Item from "./Item";
import useSWR, { Fetcher } from "swr";
import Pagination from "./Pagination";
import useSWRImmutable from "swr/immutable";
import Skeleton from "./Skeleton";

const Products = () => {
  const [number, setNumber] = useState(9);
  const [page, setPage] = useState(1);
  const fetcher: Fetcher<any, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    // `https://api.spoonacular.com/recipes/complexSearch?query=pasta&number=${number}&offset=${
    //   (page - 1) * 9
    // }&apiKey=0d3180c799df4f2aac2372cac1093fda`,
    "",
    fetcher
  );

  console.log({ data, error, isLoading });

  //search functionality
  // const [query, setQuery] = useState("");

  // const handleBtns = (label: string) => {
  //   if (label === "All") {
  //     setCategory(list);
  //   } else {
  //     const filtered = list.filter((item) => item.kind === label);
  //     setCategory(filtered);
  //   }

  //   setActiveTab(label);
  // };
  if (isLoading) return <Skeleton />;
  return (
    <>
      <section className="pt-20 mx-auto w-full min-h-screen bg-primary">
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

        {data && (
          <Pagination
            onPage={() => [page, setPage]}
            total={data.totalResults}
            limit={9}
          />
        )}
      </section>
    </>
  );
};

export default Products;
