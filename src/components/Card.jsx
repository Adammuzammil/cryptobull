import React from "react";

const Card = ({ title, url }) => {
  return (
    <div className="bg-white max-w-[400px]  rounded-lg shadow-md overflow-hidden  my-2 ml-4">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <a
          href={url}
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default Card;
