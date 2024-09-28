// 'use client';
// import { useState } from 'react';
// import { Data } from './types/data';
// // import { NavigationTree } from './components/NavigationTree/NavigationTree';
// // import { RangeFilter } from './components/RangeFilter/RangeFilter';
// // import { ApplicationList } from './components/ApplicationList/ApplicationList';
// // import { buildTree } from './utils/buildTree';
// import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// import FundSelector from './components/FundSelector/FundSelector';
// import FundDetails from './components/FundDetails/FundDetails';

// const App = ({ data }: { data: Data[] }) => {
//   // const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [selectedFund, setSelectedFund] = useState<string | null>(null);

//   const handleFundSelection = (fund: string) => {
//     setSelectedFund(fund);
//   };

//   if (data.length === 0) {
//     return (
//       <div
//         className="flex items-center justify-center h-screen"
//         role="status"
//         aria-live="polite"
//       >
//         <LoadingSpinner />
//         <span className="ml-2">Loading data...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       {/* <button
//         className="md:hidden text-white flex items-center w-10 h-10"
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//         role="menu-open"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-8 w-8"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h16m-7 6h7"
//           />
//         </svg>
//       </button> */}
//       <h1 className="text-white font-thin text-2xl my-6">
//         <span className="font-semibold">AJ Bell funds</span> - Investment
//         Strategy Selector
//       </h1>
//       <div className="flex p-6 rounded-lg bg-[#00000038]">
//         <div className="hidden md:flex flex-col min-w-fit p-8 rounded mr-4 bg-[#00000038]"></div>
//         {/* <div> <ApplicationList applications={filteredData} /> </div>*/}

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div>
//             <FundSelector onSelectFund={handleFundSelection} />
//           </div>
//           <div>
//             {selectedFund && <FundDetails selectedFund={selectedFund} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// app/page.tsx (with a Client Component handling fund selection)
'use client'; // This only applies to FundSelector, not FundDetails

import { useState } from 'react';
import FundSelector from './components/FundSelector/FundSelector';
import FundDetails from './components/FundDetails/FundDetails';

export default function Home() {
  const [selectedFund, setSelectedFund] = useState<string | null>(null);

  const handleFundSelection = (fund: string) => {
    setSelectedFund(fund);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Investment Strategy Selector</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <FundSelector onSelectFund={handleFundSelection} />
        </div>
        <div>{selectedFund && <FundDetails selectedFund={selectedFund} />}</div>
      </div>
    </div>
  );
}
