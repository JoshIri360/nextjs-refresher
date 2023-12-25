import Link from "next/link";
import React from "react";

type FormProps = {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: React.Dispatch<
    React.SetStateAction<{
      prompt: string;
      tag: string;
    }>
  >;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc text-left max-w-">
        {type} and share prompts with the world. Let your imagination run wild!
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-7 mt-10 w-full max-w-2xl glassmorphism"
      >
        <label htmlFor="prompt" className="text-left">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name="prompt"
            id="prompt"
            className="form_textarea"
            value={post.prompt}
            onChange={(e) =>
              setPost((prevState) => ({
                ...prevState,
                prompt: e.target.value,
              }))
            }
            placeholder="Write your prompt here..."
            required
          ></textarea>
        </label>
        <label htmlFor="tag" className="text-left">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          </span>
          <span className="font-normal">
            {" "}
            - (#webdevelopment, #javascript).
          </span>
          <input
            type="text"
            name="tag"
            id="tag"
            className="form_input"
            value={post.tag}
            onChange={(e) =>
              setPost((prevState) => ({
                ...prevState,
                tag: e.target.value,
              }))
            }
            placeholder="#tag"
            required
          />
        </label>

        <div className="mx-3 mb-5 gap-4 flex-end w-min">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>

          <button
            type="submit"
            className="w-full px-5 py-1.5 bg-primary-orange rounded-full text-white"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
