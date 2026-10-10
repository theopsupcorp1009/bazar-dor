import { TiShoppingCart } from "react-icons/ti";
import UserInfo from "./UserInfo";
import Navlinks from "./Navlinks";
import CurrentDate from "./CurrentDate";
import Link from "next/link";

const Header = async () => {
  const res = await fetch(`${process.env.DATA_API_URL}/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const navItems = await res.json();

  return (
    <div className="py-4 bg-white">
      <div className="container mx-auto px-5 md:px-0 lg:px-0 flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center hover:scale-105 transition-transform duration-200"
        >
          <div className=" bg-[#15803D] w-10 h-10 flex justify-center items-center rounded-[12px]">
            <TiShoppingCart className="text-3xl text-gray-500" />
          </div>
          <div>
            <h2 className="font-bold">বাজার দর</h2>
            <div className="text-[12px]">
              <CurrentDate />
            </div>
          </div>
        </Link>

        <UserInfo navItems={navItems} />
      </div>
      <div className="hidden sm:block md:block lg:block">
        <Navlinks />
      </div>
    </div>
  );
};

export default Header;
