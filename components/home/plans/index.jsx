import React from "react";
import Plan from "./Plan";

export default function Plans() {
  return (
    <section className="max-w-7xl mx-auto mt-20 pt-4 px-4 sm:px-6 md:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-lg font-semibold p-2 w-fit mx-auto text-green-500">
          Preturi
        </h2>
        <p className="font-bold text-5xl mt-2">
          Planuri de prețuri pentru toată lumea
        </p>
      </div>
      <p className="text-center text-xl text-neutral-600 max-w-2xl mx-auto mt-4">
        Partenerul tău pentru succes academic Noi transformăm învățarea usuara
        în realitate.
      </p>
      <div className="flex gap-4 flex-wrap mt-10">
        <Plan />
        <Plan popular={true} />
        <Plan />
      </div>
    </section>
  );
}
