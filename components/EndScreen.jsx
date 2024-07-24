import React from "react";

export default function EndScreen(totalPoints) {
  console.log(totalPoints);
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Total Points</h2>
      <p className="text-lg">
        You have scored {totalPoints.totalPoints.toFixed(2)} points.
      </p>
    </div>
  );
}
