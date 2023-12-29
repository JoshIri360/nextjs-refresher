import Feed from "@components/Feed";

const page = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is a place to discover and share AI prompts.
      </p>
      <Feed />
    </section>
  );
};

export default page;
