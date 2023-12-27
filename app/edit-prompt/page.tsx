"use client";
import React, { useState } from "react";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id: string; // Add the id property
  };
}

const EditPost = () => {
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession | null };

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const editPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setPost({
        prompt: "",
        tag: "",
      });
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPost}
    />
  );
};

export default EditPost;
