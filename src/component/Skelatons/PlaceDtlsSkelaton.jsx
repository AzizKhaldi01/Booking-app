import React from "react";
import Skeleton from "react-loading-skeleton";
function PlaceDtlsSkelaton() {
  return (
    <div className="md:pb-0 pb-20    px-0 lg:px-12 w-full h-full    gap-5 md:gap-12   mt-0 md:mt-40  justify-between flex   flex-col-reverse md:flex-row">
      <div className=" w-full md:w-[40%] p-2 flex flex-col   ">
        <div className=" flex w-full  flex-col gap-2  md:gap-5">
          <span className=" md:flex hidden flex-col  w-full h-full">
            {" "}
            <Skeleton height={"100%"} width={"70%"} />{" "}
          </span>
          <span className=" md:flex hidden flex-col  w-full h-full ">
            {" "}
            <Skeleton height={"70%"} width={"50%"} />{" "}
          </span>
        </div>
        <span className="">
          <Skeleton className=" my-2  md:my-7  md:flex  h-7 md:h-[2%] md:w-full w-[80%]  "   />
        </span>

        <Skeleton height={"90%"} width={"30%"} className=" " />
        <span className=" h-24 flex-col     w-full md:flex hidden">
          <Skeleton
            height={"85%"}
            borderRadius={"3rem"}
            width={"80%"}
            className=" my-10 "
          />
        </span>
        <span className=" h-7  my-10">
          <Skeleton height={"1%"} />
        </span>

        <span className="  gap-1 flex flex-col   w-full  h-full">
          <Skeleton height={"60%"} width={"100%"} />
          <Skeleton height={"60%"} width={"100%"} />
          <Skeleton height={"60%"} width={"100%"} />

          <Skeleton height={"60%"} width={"30%"} />
        </span>
      </div>
      <span className=" md:flex hidden ">
        <Skeleton
          height={"90%"}
          borderRadius={"2rem"}
          width={"80%"}
          className=" my-10 "
        />
      </span>
      
      <span className="  md:flex hidden">
      <Skeleton className=" my-7" height={"2%"} />
        </span>

<div className=" h-[30vh] ">
<Skeleton className="  " height={"100%"} />

</div>
      <div className="  w-full hidden  md:flex   gap-6 flex-col    md:w-[60%] relative  h-full  cursor-pointer ">
        <span className=" h-[72vh] w-full">
          <Skeleton borderRadius={"4rem"} height={"100%"} />
        </span>

        <div className=" flex-row  flex gap-4 h-[200px]">
          <span className=" w-full h-full  ">
            {" "}
            <Skeleton borderRadius={"4rem"} height={"100%"} />
          </span>
          <span className=" w-full h-full  ">
            {" "}
            <Skeleton borderRadius={"4rem"} height={"100%"} />
          </span>
        </div>
        <div className=" h-[72vh] w-full">
          <Skeleton borderRadius={"4rem"} height={"100%"} />
        </div>
      </div>
    </div>
  );
}

export default PlaceDtlsSkelaton;
