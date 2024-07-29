import ManageCategories from "@/components/dashboard/manage/ManageCategories";
import ManageExams from "@/components/dashboard/manage/ManageExams";
import ManageUsers from "@/components/dashboard/manage/ManageUsers";

export default function Manage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid gap-4">
        <ManageCategories />
        <ManageExams />
        <ManageUsers />
      </div>
    </div>
  );
}
