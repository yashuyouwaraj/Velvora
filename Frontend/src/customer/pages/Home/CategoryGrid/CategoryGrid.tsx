import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/ProductTypes";

const CategoryGrid = ({ products }: { products: Product[] }) => {
  const navigate = useNavigate();
  const gridClasses = ["col-span-3 row-span-12", "col-span-2 row-span-6", "col-span-4 row-span-6", "col-span-3 row-span-12", "col-span-4 row-span-6", "col-span-2 row-span-6"];
  return <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
    {products.slice(0, 6).map((item, index) => <button key={item.id} onClick={() => navigate(`/product-details/${item.category?.categoryId || "catalog"}/${encodeURIComponent(item.title)}/${item.id}`)} className={`${gridClasses[index]} relative overflow-hidden rounded-md group`}>
      <img className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" src={item.images[0]} alt={item.title} />
      <span className="absolute inset-x-0 bottom-0 bg-black/55 text-white p-3 text-left font-semibold">{item.title}</span>
    </button>)}
  </div>;
};

export default CategoryGrid;
