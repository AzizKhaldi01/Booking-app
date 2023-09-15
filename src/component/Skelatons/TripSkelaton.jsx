import React from "react";
import Skeleton from "react-loading-skeleton";

function TripSkelaton( ) {
  return (

     
        <div   className="gap-6 lg:h-[80vh]  md:h-[70vh] h-[90vh]  w-full flex p-2 flex-col md:flex-row">
          <div className="   h-[80%] md:h-full  w-full   md:w-[60%] ">
            <Skeleton borderRadius={"1rem"} height={"100%"} />
          </div>
    
          <div className="  gap-3 flex w-full  md:w-[40%] h-full flex-col  ">
           
              <span className=" h-[30%]  md:h-[20%] w-full">
                <Skeleton borderRadius={".5rem"} height={"100%"} />
              </span>
 
    
            <div className=" h-[50%]  md:h-[40%] w-full">
              <Skeleton borderRadius={".5rem"} height={"100%"} />
            </div>
          </div>
        </div>
      

    
  );
}

export default TripSkelaton;
