import { Card as CardLayout, Space } from "antd";
import Image from "next/image";
import React from "react";

const Card = ({ title, description, Icon }) => {
  return (
    <div className="flex items-center bg-white rounded-lg py-3 px-2 gap-3 h-[123px]">
      <Icon width={150} />
      <div className="flex flex-col items-start gap-1">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-400 font-light">{description}</p>
      </div>
    </div>
  );
};

export default Card;
