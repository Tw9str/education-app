export default function Box({ title }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing.
      </p>
    </div>
  );
}
