import React from "react";
import Skeleton from "react-loading-skeleton";

function Favskelaton({cards}) {
  return (

    Array.from({ length: cards }, (_, index) => (
        <div key={index} className="gap-2 h-[230px] w-full flex   p-2    flex-row">
          <div className="rounded-l-xl    h-full w-[60%] 1">
            <Skeleton borderRadius={"1rem"} height={"100%"} />
          </div>
    
          <div className="  gap-3 flex w-[40%] h-full flex-col  ">
           
              <span className=" h-full w-full">
                <Skeleton borderRadius={".5rem"} height={"100%"} />
              </span>
 
    
            <div className=" h-full w-full">
              <Skeleton borderRadius={".5rem"} height={"100%"} />
            </div>
          </div>
        </div>
      )) 

    
  );
}

export default Favskelaton;
