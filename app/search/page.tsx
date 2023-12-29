"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "@/components/PromptCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
            key={prompt._id}
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = async (searchText: String) => {
    router.push(`/search?query=${searchText}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(`/api/prompt/search/${search}`);
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
        <button
          className="ml-2 h-9 glassmorphism p-1 cursor-pointer border rounded-md border-gray-200"
          onClick={(e) => {
            e.preventDefault();
            handleSearch(searchText);
          }}
        >
          <Search className="w-15 h-15 text-gray-500" />
        </button>
      </form>

      {isLoading ? (
        <div className="mt-16 prompt_layout">
          <div className="flex items-center space-x-4 prompt_card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4 prompt_card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4 prompt_card">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <PromptCardList data={data} handleTagClick={() => {}} />
        </>
      )}
    </section>
  );
};

export default Feed;
