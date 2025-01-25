// The  name oF the directory should always be api and nothing else this syntax was introduced in the 13th ver of next js
import { db } from "../../../db/db";
import { recipes } from "../../../db/schema";

export async function GET() {
  const datas = await db.select().from(recipes);

  return Response.json({
    recipes: datas,
  });
}

export async function POST(request) {
  let data = await request.json(); // Holds the data coming from the user in side data var
  try {
    await db.insert(recipes).values(data); //Inserts the data coming from user in the DB

    return Response.json({
      message: "Date inserted Succesfully",
    }); //If data is inserted succesfully
  } catch (error) {
    return Response.json({ message: error.message }); //If data is not inserted successfully
  }

  console.log(data);
}
