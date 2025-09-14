const NftCard = () => {
  return (
    <div className="nft-card relative overflow-x-auto shadow-md rounded-sm border border-white/5">
      <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase dark:text-gray-500 font-unbounded font-light">
          <tr>
            <th scope="col" className="px-2 py-3 w-[120px]">
              NFT
            </th>
            <th scope="col" className="px-2 py-3 w-[150px]">
              NAME
            </th>
            <th scope="col" className="px-2 py-3">
              #ID
            </th>
            <th scope="col" className="px-2 py-3">
              PRICE
            </th>
            <th scope="col" className="px-2 py-3">
              OWNER
            </th>
            <th scope="col" className="px-2 py-3">
              COLLECTION NAME
            </th>
            <th scope="col" className="px-2 py-3">
              STATUS
            </th>
          </tr>
        </thead>
        <tbody className="font-unbounded font-light">
          {/* Rich Lizard */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-2 py-3">
              <div className="w-14 h-14">
                <img
                  src="richLizard.jpeg"
                  alt="Rich Lizard"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-3 whitespace-nowrap">Rich Lizard</td>
            <td className="px-2 py-3">#001</td>
            <td className="px-2 py-3">12.5 ETH</td>
            <td className="px-2 py-3">0x91dF...B7A2</td>
            <td className="px-2 py-3">Reptile Royale</td>
            <td className="px-2 py-3">For Sale</td>
          </tr>

          {/* Alpha Horse */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-2 py-3">
              <div className="w-14 h-14">
                <img
                  src="alphaHorse.jpg"
                  alt="Alpha Horse"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-3 whitespace-nowrap">Alpha Horse</td>
            <td className="px-2 py-3">#102</td>
            <td className="px-2 py-3">8.9 ETH</td>
            <td className="px-2 py-3">0xAb12...F9D3</td>
            <td className="px-2 py-3">Stallion Series</td>
            <td className="px-2 py-3">For Sale</td>
          </tr>

          {/* Leonardo Phoenix */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-2 py-3">
              <div className="w-14 h-14">
                <img
                  src="leonardoPhoenix.jpg"
                  alt="Leonardo Phoenix"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-3 whitespace-nowrap">Leonardo Phoenix</td>
            <td className="px-2 py-3">#210</td>
            <td className="px-2 py-3">15.2 ETH</td>
            <td className="px-2 py-3">0x77Cc...14Ef</td>
            <td className="px-2 py-3">Mythical Beasts</td>
            <td className="px-2 py-3">Sold</td>
          </tr>

          {/* Lucid Realism */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-2 py-3">
              <div className="w-14 h-14">
                <img
                  src="lucidRealisam.jpg"
                  alt="Lucid Realism"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-3 whitespace-nowrap">Lucid Realism</td>
            <td className="px-2 py-3">#355</td>
            <td className="px-2 py-3">5.4 ETH</td>
            <td className="px-2 py-3">0x4C8E...9AA1</td>
            <td className="px-2 py-3">Dreamscapes</td>
            <td className="px-2 py-3">For Sale</td>
          </tr>

          {/* Rich Lama */}
          <tr className="collection-card border-b border-gray-700 text-white hover:border-none">
            <td className="px-2 py-3">
              <div className="w-14 h-14">
                <img
                  src="richLama.jpg"
                  alt="Rich Lama"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </td>
            <td className="px-2 py-3 whitespace-nowrap">Rich Lama</td>
            <td className="px-2 py-3">#412</td>
            <td className="px-2 py-3">9.8 ETH</td>
            <td className="px-2 py-3">0x8B55...22Cd</td>
            <td className="px-2 py-3">Mountain Spirits</td>
            <td className="px-2 py-3">For Sale</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NftCard;
