"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string;
  };
}

const MyProfile = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession() as { data: CustomSession | null };
  const handleEdit = (post: any) => {
    console.log(post);
    router.push(`/edit-prompt?id=${post._id}`);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/prompt/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const newData = await res.json();
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const newData = await res.json();

        setData(newData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (session) fetchData();
  }, [session]);

  return (
    <Profile
      name="My"
      description="Welcome to your profile page!"
      data={data}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
