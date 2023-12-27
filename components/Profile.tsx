import Image from "next/image";
import React from "react";
import PromptCard from "./PromptCard";

interface ProfileProps {
  name: string;
  description: string;
  data: any;
  handleEdit: any;
  handleDelete: any;
}

const Profile = ({
  name,
  description,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <div className="w-full">
      <h1 className="font-satoshi font-bold text-4xl">{name} Profile</h1>
      <h2 className="font-satoshi font-bold text-2xl">{description}</h2>
      <div className="mt-16 prompt_layout">
        {Array.isArray(data) &&
          data.map((prompt: any) => (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              handleTagClick={undefined}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Profile;
