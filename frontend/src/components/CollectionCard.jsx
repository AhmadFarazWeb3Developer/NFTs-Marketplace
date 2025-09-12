import React from "react";

const CollectionCard = () => {
  return (
    <>
      <div className="card flex flex-row">
        <div>
          <img src="" alt="Collection image" />
        </div>
        <ul className="flex flex-row justify-between w-full">
          <li>Rich lizard</li>
          <li>#10</li>
          <li>25.09 ETH</li>
          <li>654</li>
          <li>428</li>
        </ul>
      </div>
    </>
  );
};
export default CollectionCard;
