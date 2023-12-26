"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Skeleton } from "@/components/ui/skeleton";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: any;
  handleTagClick: any;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {Array.isArray(data) &&
        data.map((prompt: any) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            handleTagClick={handleTagClick}
            handleEdit={undefined}
            handleDelete={undefined}
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch("/api/prompt");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const newData = await res.json();
      setData(newData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Enter the prompt you would like to search for"
          value={searchText}
          onChange={handleSearchText}
          required
          className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-2 focus:border-black focus:outline-none focus:ring-0;"
        />
      </form>

      {isLoading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>{" "}
          <PromptCardList data={data} handleTagClick={() => {}} />
        </>
      )}
    </section>
  );
};

export default Feed;
