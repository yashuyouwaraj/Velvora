import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/ProductTypes";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../State/Store";

const ShopByCategory = ({ products }: { products: Product[] }) => {
  const { customer } = useAppSelector((store) => store);
  const categories = customer.homePageData?.shopByCategories ?? [];

  return (
    <div className="flex flex-wrap justify-center lg:px-20 gap-7">
      {categories.slice(0, 7).map((item) => (
        <ShopByCategoryCard key={item.categoryId} item={item} />
      ))}
    </div>
  );
};

export default ShopByCategory;
