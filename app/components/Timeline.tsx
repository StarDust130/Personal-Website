import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { data } from "@/lib/data";

export function TimelineUI() {
  return (
    <div className="w-full  ">
      <Timeline data={data} />
    </div>
  );
}
