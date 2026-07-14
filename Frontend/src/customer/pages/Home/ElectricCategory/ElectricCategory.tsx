import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/ProductTypes";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { useAppSelector } from "../../../../State/Store";

const ElectricCategory = ({ products }: { products: Product[] }) => {
  const { customer } = useAppSelector((store) => store);
  const electricCategories = customer.homePageData?.electricCategories ?? [];

  return (
    <div className="flex flex-wrap justify-center gap-6 py-5 lg:px-20 border-b">
      {electricCategories.slice(0, 7).map((item) => (
        <ElectricCategoryCard key={item.categoryId} item={item} />
      ))}
    </div>
  );
};

export default ElectricCategory;
