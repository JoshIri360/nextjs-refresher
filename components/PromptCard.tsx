"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Clipboard, ClipboardCheck } from "lucide-react";

type PromptCardProps = {
  prompt: any;
  handleTagClick: any;
  handleEdit: any;
  handleDelete: any;
};

const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) => {
  const [copied, setCopied] = useState("");

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-2 flex-col">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <div>
            <Image
              src={prompt.createdBy.image}
              alt="User Image"
              width={20}
              height={20}
              className="rounded-full object-contain"
            />
          </div>
          <h1 className="font-satoshi font-bold text-lg">
            {prompt.createdBy.username}
          </h1>

          <div className="cursor-pointer ml-auto p-0.5 py-1 rounded-md hover:bg-gray-200 w-min">
            {copied === "" ? (
              <Clipboard
                className="text-gray-700"
                size={15}
                onClick={() => {
                  navigator.clipboard.writeText(prompt.prompt);
                  setCopied(prompt.prompt);
                  setTimeout(() => {
                    setCopied("");
                  }, 1000);
                }}
              />
            ) : (
              <ClipboardCheck
                className=" text-gray-700"
                size={15}
                onClick={() => {
                  navigator.clipboard.writeText(prompt.prompt);
                  setCopied(prompt.prompt);
                  setTimeout(() => {
                    setCopied("");
                  }, 1000);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <p className="font-satoshi text-sm">{prompt.prompt}</p>
          <p
            className="font-satoshi text-xs text-blue-400 hover:text-blue-500 mt-2 cursor-pointer"
            onClick={handleTagClick && handleTagClick(prompt.tag)}
          >
            {prompt.tag}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
