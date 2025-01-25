import SearchForm from "./Components/SearchForm";
import Card from "./Components/Card";

const fetchRecipie = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/recipes", {
      // next: {
      //   revalidate: 40 // 40 sec ma ekchoti matra fetch garne
      // }
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch recipies");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Home() {
  const { recipes } = await fetchRecipie();
  // console.log(recipes);

  return (
    <>
      <SearchForm />
      <div className="text-3xl font-bold mt-8 mx-auto text-center">
        Explore Books Available:
      </div>
      <div className="flex flex-wrap justify-center gap-4 m-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
