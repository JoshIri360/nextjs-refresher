"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

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
          />
        ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/prompt");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      if (res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        setData(data);
      } else {
        console.log("Not receiving JSON");
      }
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

      <PromptCardList data handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
