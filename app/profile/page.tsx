"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/Profile";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string; // Add the id property
  };
}

const MyProfile = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession() as { data: CustomSession | null };
  const handleEdit = () => {};
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {};

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const newData = await res.json();

        if (session?.user.id) {
          setData(newData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [session?.user.id]);

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
