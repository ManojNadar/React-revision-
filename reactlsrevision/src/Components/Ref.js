import React, { useRef, useState } from "react";

const Ref = () => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const handleBtn = () => {
    inputRef.current.style.border = "2px solid red";
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>useRef</h1>

        <div style={{ width: "20%" }}>
          <input
            style={{ backgroundColor: "white" }}
            type="text"
            placeholder="Enter Something"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            ref={inputRef}
          />
        </div>
        <button style={{ width: "20%", height: "35px" }} onClick={handleBtn}>
          CLICK TO FOCUS
        </button>

        <p>{inputValue}</p>
      </div>
    </>
  );
};

export default Ref;
