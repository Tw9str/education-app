"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EditIcon, DeleteIcon } from "../Icons";
import OverlayAlert from "@/components/widgets/OverlayAlert";

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  const token = useSelector((state) => state.auth.token);

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

  const confirmDelete = (id) => {
    setShowOverlay(true);
    setExamToDelete(id);
  };

  const handleConfirm = async () => {
    if (examToDelete) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/exams/delete/${examToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setExams(exams.filter((exam) => exam._id !== examToDelete));
    }
    setShowOverlay(false);
    setExamToDelete(null);
  };

  const handleCancel = () => {
    setShowOverlay(false);
    setExamToDelete(null);
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
            <th className="p-4 text-left">Created At</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.length > 0 &&
            exams.map((exam) => (
              <tr key={exam._id} className="border-b">
                <td className="p-4">{exam.title}</td>
                <td className="p-4">{exam.category.title}</td>
                <td className="p-4">{exam.user.username}</td>
                <td className="p-4">
                  {new Date(exam.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => editExam(exam._id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => confirmDelete(exam._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showOverlay && (
        <OverlayAlert
          title="Confirm Deletion"
          description="Are you sure you want to delete this exam?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ManageExams;
