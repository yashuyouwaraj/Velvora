import { useNavigate } from "react-router-dom";
import { HomeCategory } from "../../../../types/HomeCategoryTypes";

const CategoryGrid = ({ categories }: { categories: HomeCategory[] }) => {
  const navigate = useNavigate();
  const gridClasses = ["col-span-3 row-span-12", "col-span-2 row-span-6", "col-span-4 row-span-6", "col-span-3 row-span-12", "col-span-4 row-span-6", "col-span-2 row-span-6"];

  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      {categories.slice(0, 6).map((item, index) => (
        <button
          key={item.id ?? item.categoryId}
          onClick={() => navigate(`/products/${item.categoryId}`)}
          className={`${gridClasses[index]} relative overflow-hidden rounded-md group`}
        >
          <img
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
            src={item.image}
            alt={item.name || item.categoryId}
          />
          <span className="absolute inset-x-0 bottom-0 bg-black/55 text-white p-3 text-left font-semibold">
            {item.name || item.categoryId}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
