import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  console.log("Here");
  try {
    await connectToDB();

    console.log(params);

    const prompt = await Prompt.find({
      prompt: { $regex: params.id, $options: "i" },
    }).populate("createdBy", "image username");

    if (!prompt) {
      return new Response(JSON.stringify({ msg: "Prompt not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ msg: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
