import React from "react";

export const TourSkeleton = () => (
  <div className="animate-pulse p-4">
    <div className="flex gap-3 items-center">
      <div className="h-6 w-36 bg-slate-300 rounded col-span-2 mb-8"></div>
      <div className="h-4 w-56 bg-slate-300 rounded col-span-2 mb-8"></div>
    </div>
    <div>
      <div className="mb-3">
        <div className="h-6 w-48 bg-slate-300 rounded col-span-2 mb-8"></div>
        <div className=" flex space-x-4">
          <div className="rounded bg-slate-300 h-24 w-24"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 w-20 bg-slate-300 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className=" flex space-x-4">
          <div className="rounded bg-slate-300 h-24 w-24"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 w-20 bg-slate-300 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className=" flex space-x-4">
          <div className="rounded bg-slate-300 h-24 w-24"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 w-20 bg-slate-300 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6 w-48 bg-slate-300 rounded col-span-2 my-8"></div>
      <div className="h-6 w-48 bg-slate-300 rounded col-span-2 my-8"></div>
    </div>
  </div>
);
