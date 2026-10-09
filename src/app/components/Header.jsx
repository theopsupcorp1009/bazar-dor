import React, { Suspense } from "react";
import { TiShoppingCart } from "react-icons/ti";
import UserInfo from "./UserInfo";
import Navlinks from "./Navlinks";
import CurrentDate from "./CurrentDate";
import Link from 'next/link';

const Header = () => {

  return (
    <div className="py-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <div className=" bg-[#15803D] w-10 h-10 flex justify-center items-center rounded-[12px]">
                <TiShoppingCart className="text-3xl text-gray-500" />
            </div>
            <div>
                <h2 className="font-bold">বাজার দর</h2>
                <div className="text-[12px]"><CurrentDate/></div>
            </div>
        </Link>

        <UserInfo/>
      </div>
    {/* <Suspense fallback={<loading/>}> */}
      <Navlinks/>
      {/* </Suspense> */}
    </div>
  );
};

export default Header;
