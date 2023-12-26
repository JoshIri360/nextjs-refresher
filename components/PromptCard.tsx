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
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            <Image
              src={prompt.createdBy.image}
              alt="User Image"
              width={20}
              height={20}
              className="rounded-full object-contain"
            />
          </div>
          <h1 className="font-satoshi font-medium text-lg">
            {prompt.createdBy.username}
          </h1>
        </div>
        <div>
          <p className="font-satoshi text-sm">{prompt.prompt}</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="p-1 py-1.5 rounded-md hover:bg-gray-400 w-min">
          {copied === "" ? (
            <Clipboard
              className="cursor-pointer text-gray-700"
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
              className="cursor-pointer text-gray-700"
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
    </div>
  );
};

export default PromptCard;
