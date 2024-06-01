import Box from "@/components/dashboard/Box";

export default function Dashboard() {
  return (
    <div className="flex-1 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Box title="Exams" />
        <Box title="Leaderboard" />
        <Box title="Subscription" />
        <Box title="Blog" />
      </div>
    </div>
  );
}
