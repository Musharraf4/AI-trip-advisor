import { ChildProps } from "@/interfaces";
import { FC } from "react";

export const Modal: FC<ChildProps> = ({ children }) => (
  <>
    <div
      className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ${"opacity-50"}`}
    />
    <div
      className={`flex justify-center items-center w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-opacity duration-300 ${"opacity-100"}`}
    >
      {children}
    </div>
  </>
);
