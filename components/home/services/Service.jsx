export default function Service({ children, reverse }) {
  return (
    <article
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center gap-8 mt-6`}
    >
      <div className="basis-1/2">
        <h3 className="text-3xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quidem
          quas accusantium possimus vel. Sequi reiciendis expedita eaque maiores
          eos.
        </p>
      </div>
      <div className="basis-1/3">{children}</div>
    </article>
  );
}
