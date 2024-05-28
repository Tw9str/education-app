import Box from "@/components/dashboard/Box";

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Box title="Box 1" />
        <Box title="Box 2" />
        <Box title="Box 3" />
        <Box title="Box 4" />
      </div>
    </div>
  );
}
