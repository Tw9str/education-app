import React from "react";
import Logo from "../header/Logo";
import Socials from "@/components/widgets/Socials";

export default function Footer() {
  return (
    <footer className="bg-green-900 mt-16">
      <div className="text-white max-w-7xl mx-auto pt-16 px-4 sm:px-6 md:px-8 pb-16 divide-y divide-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <Logo color="#FFFFFF" />
            <p className="mt-4">
              Optimizează-ți pregătirea cu grile de informatică structurate
              logic și orientate spre rezultate, create de experți pentru a-ți
              asigura locul la facultate.
            </p>
          </div>
          <Socials />
        </div>
        <div className="mt-16 pt-10">
          <p className="capitalize">
            &copy; {new Date().getFullYear()} GrileInfo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
