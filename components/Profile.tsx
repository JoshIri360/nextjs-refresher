import Image from "next/image";
import React from "react";

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
            <div key={prompt.id} className="prompt_card">
              <h1>{prompt.createdBy.username}</h1>
              <p>{prompt.prompt}</p>
              <p>{prompt.tags}</p>
              <Image
                src={prompt.createdBy.image}
                alt="User Image"
                width={30}
                height={30}
              />
              <h1>{prompt.createdBy.id}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
