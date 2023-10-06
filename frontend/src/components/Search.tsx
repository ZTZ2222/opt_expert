import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchProps {
  className?: string;
  inputClassName?: string;
}

interface searchResults {
  id: number;
  name: string;
  base_price: number;
  sale_price: number;
  description: string;
  product_origin: string;
}

const Search: React.FC<SearchProps> = ({ className, inputClassName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<searchResults[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery !== "") {
        setIsLoading(true);

        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/products?search=${searchQuery}`,
          );
          setSearchResults(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div
      className={clsx(
        "relative flex items-center gap-3 rounded-[50px]",
        className,
      )}
    >
      <BsSearch className="ml-[9px]" />
      <input
        type="text"
        placeholder="Поиск товара..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={clsx(
          "w-[95%] bg-transparent outline-0 placeholder:tracking-wide",
          inputClassName,
        )}
      />
      <ul
        className={`absolute top-12 z-50 ${
          searchResults.length > 0 ? "flex" : "hidden"
        } h-auto w-[100%] flex-col gap-5 divide-y-[1px] divide-dashed divide-gray-400 rounded-lg bg-white p-4 text-black shadow-md`}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <li
                key={idx}
                className="h-5 w-3/5 animate-pulse rounded-md bg-gray-400"
              ></li>
            ))
          : searchResults.map((result, index) => (
              <li key={index} className="flex h-10 lowercase">
                <Link
                  href={`http://localhost:3000/products/${result.id}`}
                  className="flex w-full items-center"
                >
                  <span>{result.name}</span>
                  <div className="mx-3 h-1 w-1 rounded-full bg-black" />
                  <span className="capitalize text-gray-600">
                    {result.product_origin}
                  </span>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Search;
