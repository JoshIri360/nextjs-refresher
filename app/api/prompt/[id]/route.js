import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate(
      "createdBy",
      "image username"
    );

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

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ msg: "Prompt not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
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

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findByIdAndDelete(params.id);

    console.log("existingPrompt", existingPrompt);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ msg: "Prompt not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify({ msg: "Prompt deleted" }), {
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
