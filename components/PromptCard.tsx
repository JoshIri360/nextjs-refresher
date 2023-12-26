"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

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
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={prompt.createdBy.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex-grow">
          <h1 className="font-satoshi font-medium text-lg">
            {prompt.createdBy.username}
          </h1>
          <p className="font-satoshi text-sm">{prompt.prompt}</p>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
