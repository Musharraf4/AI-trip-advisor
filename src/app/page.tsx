import { SELECT_PLAN_ROUTE } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import milesAILogo from "../public/miles-ai2.svg";
import starterImg from "../public/starter.png";

const Home = () => (
  <div className="w-full relative bg-slate-300 h-screen">
    <Image src={starterImg} alt="start-image" className="brightness-50 h-full w-full" priority />
    <div className="p-16 absolute inset-0">
      <Image
        src={milesAILogo}
        height={200}
        width={200}
        alt="milesAI logo"
        className="cursor-pointer"
        priority
      />
    </div>

    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-[430px] text-center">
        <h1 className="text-white">Want us to plan your trip?</h1>
        <div className="mt-2">
          <p className="text-white">
            Get started with our AI assistant to get you travel itinerary
          </p>
        </div>
        <div className="mt-10">
          <Link href={SELECT_PLAN_ROUTE} prefetch className="primary-btn md-btn">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
