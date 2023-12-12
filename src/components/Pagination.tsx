import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
type Props = {
  onPage: () => [number, Dispatch<SetStateAction<number>>];
  total: number;
  limit: number;
};

const Pagination = ({ onPage, total, limit }: Props) => {
  const [page, setPage] = onPage();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const isFromUrl = useRef<boolean>(true);
  // const [isFromUrl, setIsFromUrl] = useState(true);

  // const prevPage = page;

  // useEffect(() => {
  //   console.log(1);
  //   if (isFromUrl.current) {
  //     isFromUrl.current = false;
  //     page && push(`?page=${page}`);
  //     return;
  //   }

  //   isFromUrl.current = true;

  //   return () => {};
  // }, [page, push]);

  // useEffect(() => {
  //   console.log(searchParams.get("page"));
  //   if (isFromUrl.current) {
  //     searchParams.get("page") && setPage(Number(searchParams.get("page")));
  //     isFromUrl.current = false;
  //     return;
  //   }
  //   isFromUrl.current = true;

  //   return () => {};
  // }, [searchParams, setPage]);

  return (
    <nav className="flex w-full justify-center my-10">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => {
              page > 1 && setPage(page - 1);
              // push(`?page=${page - 1}`);
            }}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${
              page <= 1 &&
              "bg-gray-800/60 hover:bg-gray-800/60 text-gray-400/60 hover:text-gray-400/60"
            }`}
            disabled={page <= 1 ? true : false}
          >
            Previous
          </button>
        </li>

        {[...Array(Math.ceil(total / limit))].map((_, index) =>
          index + 1 === 1 ||
          index + 1 === page - 1 ||
          index + 1 === page ||
          index + 1 === page + 1 ||
          index + 1 === page + 2 ||
          index + 1 === Math.ceil(total / limit / 2) ||
          index + 1 === Math.ceil(total / limit) ? (
            <li key={index}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight border  ${
                  page === index + 1
                    ? "hover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-white"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => {
                  setPage(index + 1);
                  // push(`?page=${index + 1}`);
                }}
              >
                {index + 1}
              </button>
            </li>
          ) : (
            ""
          )
        )}

        <li>
          <button
            onClick={() => {
              page < Math.ceil(total / limit) && setPage((page) => page + 1);
              // push(`?page=${page + 1}`);
              // replace(`?${params.toString()}`);
            }}
            className={`flex items-center justify-center px-3 h-8 me-0 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white ${
              page >= Math.ceil(total / limit) &&
              "bg-gray-800/60 hover:bg-gray-800/60 text-gray-400/60 hover:text-gray-400/60"
            }`}
            disabled={page >= Math.ceil(total / limit) ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
