import React from "react";
import Skeleton from "react-loading-skeleton";

function AccommSkelaton({cards , bookingC }) {
  return (

    Array.from({ length: cards }, (_, index) => (
        <div key={index} className= {` gap-2    ${ bookingC ? 'h-[30vh]' : ' h-[300px] ' }   flex  flex-col md:flex-row   w-full px-3`} >
          <div className={ `  rounded-xl  h-[200px] md:h-[80%]   ${bookingC ? ' w-full  md:w-[30%] '  : ' md:w-[65%]  w-full ' }  `} >
            <Skeleton borderRadius={"1rem"} height={"100%"} />
          </div>
    
          <div className="px-1 mt-2  w-full md:w-[60%] flex flex-row justify-between">
          
            <div className="  md:h-[60%] h-[20%] w-[90%] flex flex-col  gap-2 md:gap-3">
              <span className= " md:w-[50%] w-[20%]">
                <Skeleton />
              </span>
              <span className="w-[90%]  mt-1 md:mt-5 md:h-10 h-14">
                <Skeleton className=" h-full" />
              </span>
              <span className="w-[70%] md:h-7 h-14">
                <Skeleton className=" h-full" />
              </span>
            </div>
     
          </div>
        </div>
      )) 

    
  );
}

export default AccommSkelaton;
