import React, { useEffect, useRef, useState } from "react";

const RefTwo = () => {
  const [inputValue, setInputvalue] = useState("");
  const previousInputValue = useRef("");
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>USEREF</h1>

        <h1>{renderCount.current}</h1>

        <div style={{ width: "20%" }}>
          <input
            style={{ backgroundColor: "white" }}
            type="text"
            onChange={(e) => setInputvalue(e.target.value)}
          />
        </div>
        <h2>current value : {inputValue}</h2>
        <h2>previous value : {previousInputValue.current}</h2>
      </div>
    </>
  );
};

export default RefTwo;
