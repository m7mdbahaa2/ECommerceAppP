import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="flex justify-center">
      <div className="lds-dual-ring"></div>{" "}
    </div>
  );
}
