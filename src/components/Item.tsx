import Image from "next/image";
import "../styles/button.css";
import Link from "next/link";

type Props = {
  recipe: any;
};

const Item = ({ recipe }: Props) => {
  return (
    <>
      <article className="flex flex-row text-white w-full bg-primary">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-auto max-w-[300px]">
          <Image
            src={recipe.image}
            width={300}
            height={500}
            alt={recipe.title}
            title={recipe.title}
          />

          <div className="px-3 py-2">
            <h1 className="text-xl font-bold mb-3">{recipe.title}</h1>
            <div className="flex flex-wrap justify-between mb-2">
              <Link href={`/recipes/${recipe.id}`} className="animated-btn">
                Details
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Item;
