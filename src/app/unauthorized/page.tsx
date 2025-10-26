import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p className="text-gray-600 mt-2">
        You are not authorized to view this page.
      </p>
    </div>
  );
};

export default UnauthorizedPage;
