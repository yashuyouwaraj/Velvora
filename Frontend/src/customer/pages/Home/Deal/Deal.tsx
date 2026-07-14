import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/ProductTypes";
import DealCart from "./DealCart";
import { useAppSelector } from "../../../../State/Store";

const Deal = ({ products }: { products: Product[] }) => {
  const { customer } = useAppSelector((store) => store);
  const deals = customer.homePageData?.deals ?? [];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="py-5 lg:px-20">
      <div className="flex items-center justify-between">
        {deals.slice(0, 6).map((item) => (
          <DealCart key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Deal;
