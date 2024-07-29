"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/exams`
        );
        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const deleteExam = async (id) => {
    if (confirm("Are you sure you want to delete this exam?")) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExams(exams.filter((exam) => exam._id !== id));
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Manage Exams</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id} className="border-b">
              <td className="p-4">{exam.title}</td>
              <td className="p-4">{exam.category}</td>
              <td className="p-4">{exam.user}</td>
              <td className="p-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => deleteExam(exam._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageExams;
