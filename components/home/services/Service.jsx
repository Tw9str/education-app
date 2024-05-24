export default function Service({ children, reverse }) {
  return (
    <article
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center justify-between mt-6`}
    >
      <div className="basis-1/2">
        <h3 className="text-2xl font-bold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p className="mt-4 leading-6 text-lg text-neutral-600 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem
          quas accusantium possimus vel. Sequi reiciendis expedita eaque maiores
          eos.
        </p>
      </div>
      <div className="basis-1/3">{children}</div>
    </article>
  );
}
