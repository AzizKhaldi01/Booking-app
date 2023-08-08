import React from "react";
import Skeleton from "react-loading-skeleton";

function Carteskelaton({cards}) {
  return (

    Array.from({ length: cards }, (_, index) => (
        <div key={index} className="gap-2 h-[300px] w-full">
          <div className="rounded-xl h-[70%] w-full">
            <Skeleton borderRadius={"1rem"} height={"100%"} />
          </div>
    
          <div className="px-1 mt-2 flex flex-row justify-between">
            <div className="h-[20%] w-[60%] flex flex-col gap-1">
              <span className="w-[80%]">
                <Skeleton />
              </span>
              <span className="w-[40%]">
                <Skeleton />
              </span>
              <span className="w-[20%]">
                <Skeleton />
              </span>
            </div>
    
            <div className="w-[20%]">
              <Skeleton />
            </div>
          </div>
        </div>
      )) 

    
  );
}

export default Carteskelaton;
