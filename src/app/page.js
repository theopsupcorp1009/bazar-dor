import Banner from "./components/Banner";
import PriceUpdate from "./components/PriceUpdate";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Banner/>
      {/* <Suspense fallback={<loading/>}> */}
        <PriceUpdate/>
      {/* </Suspense> */}
    </>
  );
}
