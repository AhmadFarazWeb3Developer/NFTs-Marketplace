import React from "react";

const CollectionCard = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs uppercase dark:text-gray-500 font-unbounded font-light">
          <tr>
            <th scope="col" className="px-2 py-3 w-[120px]">
              COLLECTION
            </th>
            <th scope="col" className="px-2 py-3 w-[150px]">
              NAME
            </th>

            <th scope="col" className="px-2 py-3 ">
              #ID
            </th>
            <th scope="col" className="px-2 py-3">
              AVG PRICE
            </th>
            <th scope="col" className="px-2 py-3">
              ITEMS
            </th>
            <th scope="col" className="px-2 py-3">
              OWNERS
            </th>
            <th scope="col" className="px-2 py-3">
              REMAINING
            </th>
            <th scope="col" className="px-2 py-3">
              FOR SALE
            </th>
          </tr>
        </thead>
        <tbody className="font-unbounded font-light">
          {/* First collection */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-6 py-4">
              <div className="w-14 h-14">
                <img
                  src="richLizard.jpeg"
                  alt="Rich Lizard"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              Rich Lizard
            </td>
            <td className="px-2 py-4">#01</td>
            <td className="px-2 py-4">25.09 ETH</td>
            <td className="px-2 py-4">654</td>
            <td className="px-2 py-4">428</td>
            <td className="px-2 py-4">12</td>
            <td className="px-2 py-4">Active</td>
          </tr>

          {/* Second collection */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-6 py-4">
              <div className="w-14 h-14">
                <img
                  src="alphaHorse.jpg"
                  alt="Alpha Horse"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              Alpha Horse
            </td>
            <td className="px-2 py-4">#26</td>
            <td className="px-2 py-4">18.40 ETH</td>
            <td className="px-2 py-4">900</td>
            <td className="px-2 py-4">567</td>
            <td className="px-2 py-4">234</td>
            <td className="px-2 py-4">Active</td>
          </tr>

          {/* Third collection */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-6 py-4">
              <div className="w-14 h-14">
                <img
                  src="lucidRealisam.jpg"
                  alt="Lucid Realism"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              Lucid Realism
            </td>
            <td className="px-2 py-4">#94</td>
            <td className="px-2 py-4">12.75 ETH</td>
            <td className="px-2 py-4">1,200</td>
            <td className="px-2 py-4">890</td>
            <td className="px-2 py-4">310</td>
            <td className="px-2 py-4">Active</td>
          </tr>

          {/* Fourth collection */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-6 py-4">
              <div className="w-14 h-14">
                <img
                  src="leonardoPhoenix.jpg"
                  alt="Leonardo Phoenix"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              Leonardo Phoenix
            </td>
            <td className="px-2 py-4">#77</td>
            <td className="px-2 py-4">30.22 ETH</td>
            <td className="px-2 py-4">800</td>
            <td className="px-2 py-4">650</td>
            <td className="px-2 py-4">178</td>
            <td className="px-2 py-4">Active</td>
          </tr>

          {/* Fifth collection */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-6 py-4">
              <div className="w-14 h-14">
                <img
                  src="scifiHumanoid.jpg"
                  alt="Sci-Fi Humanoid"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              Sci-Fi Humanoid
            </td>
            <td className="px-2 py-4">#150</td>
            <td className="px-2 py-4">9.85 ETH</td>
            <td className="px-2 py-4">2,500</td>
            <td className="px-2 py-4">1,340</td>
            <td className="px-2 py-4">420</td>
            <td className="px-2 py-4">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CollectionCard;
