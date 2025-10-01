import React from "react";
import { DotLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <DotLoader cssOverride={override} color="#facc15" size={60} />
    </div>
  );
}

export default Loader;
