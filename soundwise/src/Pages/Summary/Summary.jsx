import React from "react";

function Summary() {
  return <div>
    <h1>Summary</h1>
    <h3>Transfer complete</h3>

    <button onClick={() => window.open("itmss://music.apple.com/")}>Open Apple Music</button>
  </div>;
}

export default Summary;
