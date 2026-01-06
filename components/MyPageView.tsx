import React from 'react';
import { Settings, LogOut, Award, Bell, Monitor } from 'lucide-react';
import { Certification } from '../types';

const MyPageView: React.FC = () => {
  const certifications: Certification[] = [
    { title: "AI Literacy Fundamental", date: "2024.01.12", id: "AX-2024-001" },
    { title: "Generative AI Professional", date: "2024.03.05", id: "AX-2024-042" }
  ];

  return (
    // 1. flex flex-col items-center를 추가하여 내부의 모든 요소를 세로축 중앙 정렬함
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in-up flex flex-col items-center">
      
      {/* 2. 기존 grid를 제거하거나, 단일 카드용으로 너비를 제한(max-w-sm)함 */}
      <div className="w-full max-w-sm">
        <div className="glass-effect p-8 rounded-[2rem] text-center border border-white/10 relative overflow-hidden shadow-2xl">
          {/* 상단 배경 그라데이션 */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-600/30 to-blue-600/30"></div>
          
          <div className="relative z-10">
            {/* 프로필 이미지 (mx-auto로 이미 중앙 정렬 상태) */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto mb-4 border-4 border-black flex items-center justify-center text-3xl font-black text-white">
              OD
            </div>
            
            <h2 className="text-2xl font-black text-white">ODOC</h2>
            <p className="text-purple-400 font-bold text-sm mb-6">Marketing Team</p>
            
            {/* 역량 레벨 박스 (중앙 배치를 위해 mx-auto 및 적절한 너비 설정) */}
            <div className="flex justify-center">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 min-w-[140px]">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Competency Level</p>
                <p className="font-bold text-lg text-white">Master</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default MyPageView;



// import React from 'react';
// import { Settings, LogOut, Award, Bell, Monitor } from 'lucide-react';
// import { Certification } from '../types';

// const MyPageView: React.FC = () => {
//   const certifications: Certification[] = [
//     { title: "AI Literacy Fundamental", date: "2024.01.12", id: "AX-2024-001" },
//     { title: "Generative AI Professional", date: "2024.03.05", id: "AX-2024-042" }
//   ];

//   return (
//     <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in-up">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-1">
//           <div className="glass-effect p-8 rounded-[2rem] text-center border border-white/10 relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-purple-600/30 to-blue-600/30"></div>
//             <div className="relative z-10">
//               <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mx-auto mb-4 border-4 border-black flex items-center justify-center text-3xl font-black">
//                 OD
//               </div>
//               <h2 className="text-2xl font-black">ODOC</h2>
//               <p className="text-purple-400 font-bold text-sm mb-6">Marketing Team</p>
              
//               <div className="grid grid-cols-2 gap-4 mb-8">
//                 <div className="bg-white/5 p-3 rounded-xl">
//                   <p className="text-[10px] text-gray-500 font-bold uppercase">Competency Level</p>
//                   <p className="font-bold">Master</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default MyPageView;
