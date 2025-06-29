import { DestinationProps } from "@/interfaces";
import Image from "next/image";

const DestinationCard = ({
  destination: { city, country, id, image },
  isActive,
  onClick,
}: DestinationProps) => (
  <div
    className={`flex flex-col gap-2 cursor-pointer ${
      isActive ? "outline outline-4 outline-primary bg-primary rounded-lg text-white" : ""
    }`}
    key={id}
    onClick={onClick}
  >
    <div className="w-full">
      <Image src={image} alt={city} className="rounded-lg h-36" priority />
    </div>
    <div className="pl-2">
      <h3>{city}</h3>
      <span className="text-sm">{country}</span>
    </div>
  </div>
);

export default DestinationCard;
