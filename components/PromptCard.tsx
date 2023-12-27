"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Clipboard, ClipboardCheck, Pencil, Trash2 } from "lucide-react";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

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
  const session = useSession() as { data: CustomSession | null };
  const path = usePathname();
  const router = useRouter();

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

          <div className="ml-auto flex flex-center">
            {prompt.createdBy._id === session.data?.user?.id &&
            path === "/profile" ? (
              <>
                <div className="cursor-pointer rounded-md hover:bg-blue-200">
                  <Pencil
                    className="text-blue-500 p-0.5 py-1"
                    size={23}
                    onClick={() => {
                      console.log(prompt);
                      handleEdit(prompt);
                    }}
                  />
                </div>
                <div className="cursor-pointer rounded-md hover:bg-red-200">
                  <Trash2
                    className="text-red-500 p-0.5 py-1"
                    size={23}
                    onClick={() => {
                      handleDelete(prompt._id);
                    }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="cursor-pointer rounded-md hover:bg-gray-200">
              {copied === "" ? (
                <Clipboard
                  className="text-gray-700 p-0.5 py-1"
                  size={23}
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
                  className=" text-gray-700 p-0.5 py-1"
                  size={23}
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
