import React from "react";
import { MaterialSymbolsCheck } from "./Icons";
import Button from "./Button";

export default function Plan({ popular }) {
  return (
    <article
      className={`bg-white flex flex-col items-start justify-start gap-4 basis-full sm:basis-[calc((100%/2)-1rem/2)] lg:basis-[calc((100%/3)-2rem/3)] shadow-lg px-6 py-8 border-2 ${
        popular ? "border-green-500" : "border-neutral-100"
      } rounded-xl cursor-pointer hover:scale-105 duration-300`}
    >
      <div className="flex justify-between items-center w-full">
        <h3
          className={`font-semibold text-lg text-center ${
            popular ? "text-green-500" : "text-neutral-950"
          }`}
        >
          Package #1
        </h3>
        {popular && (
          <p className="rounded-xl p-1 text-sm bg-green-100 text-green-500 w-fit">
            Most popular
          </p>
        )}
      </div>
      <p className="text-sm text-neutral-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
        reprehenderit?
      </p>
      <p>
        <span className="font-bold text-4xl">Lei58</span>
        <span className="font-semibold text-sm text-neutral-600">/month</span>
      </p>
      <ul className="text-neutral-600">
        <li className="flex items-start gap-2 mt-4 text-sm">
          <MaterialSymbolsCheck />
          Beneficiază de o sesiune exclusivă de 30-45 de minute cu unul dintre
          experții noștri.
        </li>
        <li className="flex items-start gap-2 mt-4 text-sm">
          <MaterialSymbolsCheck />
          Beneficiază de o sesiune exclusivă de 30-45 de minute cu unul dintre
          experții noștri.
        </li>
        <li className="flex items-start gap-2 mt-4 text-sm">
          <MaterialSymbolsCheck />
          Beneficiază de o sesiune exclusivă de 30-45 de minute cu unul dintre
          experții noștri.
        </li>
        <li className="flex items-start gap-2 mt-4 text-sm">
          <MaterialSymbolsCheck />
          Beneficiază de o sesiune exclusivă de 30-45 de minute cu unul dintre
          experții noștri.
        </li>
      </ul>
      <Button />
    </article>
  );
}
