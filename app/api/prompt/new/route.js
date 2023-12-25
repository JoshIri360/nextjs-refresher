import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, tag, prompt } = await req.json();

  try {
    await connectToDB();

    const newPrompt = await Prompt.create({
      prompt,
      tag,
      createdBy: userId,
    });

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
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
