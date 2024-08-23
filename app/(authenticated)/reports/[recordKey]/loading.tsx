"use client";

import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <TailSpin color="#A41E35" />
    </div>
  );
};

export default Loading;
