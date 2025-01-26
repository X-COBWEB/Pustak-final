import { recipes } from "../../../../db/schema";
import { db } from "../../../..//db/db";
import { eq } from "drizzle-orm";
import { json } from "drizzle-orm/mysql-core";

export async function GET(request, datafromurl) {
  // console.log("The data that came from url:\n");
  // const Meow = datafromurl.params;
  // console.log("Meow" + M eow);
  // console.log(Number(datafromurl.params.id));
  const id = await Number((await datafromurl.params).id);

  try {
    let recipe = await db.select().from(recipes).where(eq(recipes.id, id));
    if (recipe.length == 0) {
      return Response.json(
        {
          message: "no recipe with the id found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        messsage: "Data Fetched Succesfully",
        recipe,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error_message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, datafromurl) {
  const id = datafromurl.params.id;
  try {
    await db.delete(recipes).where(eq(recipes.id, id));
    return Response.json(
      {
        message: "Data Deleted SUccesfullly",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ Messsage: error.message }, { status: 500 });
  }
}
export async function POST(request, datafromurl) {
  const _id = await Number((await datafromurl.params).id);
  console.log(_id);
  try {
    await db
      .update(recipes)
      .set({ availability: false }) // Toggle the boolean value
      .where(eq(recipes.id, _id)); // Ensure _id is defined
    return Response.json(
      {
        message: "Data modified SUccesfullly",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ Messsage: error.message }, { status: 500 });
  }
}
