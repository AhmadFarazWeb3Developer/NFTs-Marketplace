// // import React from "react";
// // import { Routes, Route, Link, useNavigate } from "react-router-dom";
// // import Explore from "../pages/Explore";
// // import { LiaUserCircleSolid } from "react-icons/lia";
// // import { useAccount } from "wagmi";

// // const Navbar = () => {
// //   const navigateTo = useNavigate("");
// //   const { isConnected } = useAccount();

// //   return (
// //     <>
// //       <div className="navbar flex justify-between items-center text-white flex-row py-4 px-10 bg-dark-black font-unbounded tracking-wide">
// //         <div className="logo font-bold">
// //           <h2 className="font-medium text-xs font-unbounded">Dream NFTs</h2>
// //         </div>
// //         <ul className="flex justify-center gap-10 items-center text-xs text-stroke-3 text-paragraph">
// //           <Link to="/create-collection">
// //             <li className="cursor-pointer">CREATE COLLECTION</li>
// //           </Link>
// //           <Link to="/explore">
// //             <li className="cursor-pointer">EXPLORE</li>
// //           </Link>
// //         </ul>

// //         <div className="flex flex-row items-center gap-3">
// //           <w3m-button />
// //           {isConnected && (
// //             <LiaUserCircleSolid
// //               size={32}
// //               className="text-action-btn-green cursor-pointer"
// //               onClick={() => navigateTo("/dashboard")}
// //             />
// //           )}
// //         </div>
// //       </div>

// //       <Routes>
// //         <Route path="/create-collection" />
// //         <Route path="/explore" element={<Explore />} />
// //       </Routes>
// //     </>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import { LiaUserCircleSolid } from "react-icons/lia";
// import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

// const Navbar = () => {
//   const navigateTo = useNavigate();
//   const { open } = useAppKit(); // Hook to open the AppKit modal
//   const { address, isConnected } = useAppKitAccount(); // Wallet info

//   return (
//     <div className="navbar flex justify-between items-center text-white flex-row py-4 px-10 bg-dark-black font-unbounded tracking-wide">
//       <div className="logo font-bold">
//         <h2 className="font-medium text-xs font-unbounded">Dream NFTs</h2>
//       </div>

//       <ul className="flex justify-center gap-10 items-center text-xs text-stroke-3 text-paragraph">
//         <Link to="/create-collection">
//           <li className="cursor-pointer">CREATE COLLECTION</li>
//         </Link>
//         <Link to="/explore">
//           <li className="cursor-pointer">EXPLORE</li>
//         </Link>
//       </ul>

//       <div className="flex flex-row items-center gap-3">
//         {!isConnected ? (
//           <button
//             onClick={() => open()} // Open wallet modal
//             className="px-4 py-2 bg-action-btn-green text-black rounded"
//           >
//             Connect Wallet
//           </button>
//         ) : (
//           <>
//             <span className="text-sm text-paragraph">
//               {address.slice(0, 6)}...{address.slice(-4)}
//             </span>
//             <LiaUserCircleSolid
//               size={32}
//               className="text-action-btn-green cursor-pointer"
//               onClick={() => navigateTo("/dashboard")}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { LiaUserCircleSolid } from "react-icons/lia";
import { useAppKitAccount } from "@reown/appkit/react";

const Navbar = () => {
  const navigateTo = useNavigate();
  const { address, isConnected } = useAppKitAccount(); // Wallet info

  return (
    <div className="navbar flex justify-between items-center text-white flex-row py-4 px-10 bg-dark-black font-unbounded tracking-wide">
      <div className="logo font-bold">
        <h2 className="font-medium text-xs font-unbounded">Dream NFTs</h2>
      </div>

      <ul className="flex justify-center gap-10 items-center text-xs text-stroke-3 text-paragraph">
        <Link to="/create-collection">
          <li className="cursor-pointer">CREATE COLLECTION</li>
        </Link>
        <Link to="/explore">
          <li className="cursor-pointer">EXPLORE</li>
        </Link>
      </ul>

      <div className="flex flex-row items-center gap-3">
        {/* Official Reown Connect Button */}
        <appkit-button />

        {isConnected && (
          <LiaUserCircleSolid
            size={32}
            className="text-action-btn-green cursor-pointer"
            onClick={() => navigateTo("/dashboard")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
