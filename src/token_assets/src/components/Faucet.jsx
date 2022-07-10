import React, { useState } from "react";
import {token} from "../../../declarations/token"

function Faucet() {
const [res, setres] = useState("Claim");
const [is_disabled, set_is_disabled] = useState(false)
  async function handleClick(event) {
   const x=  await token.free_tokens();
    setres(x);
    set_is_disabled(true);
  }

  return (
    <div className="blue window">
      <label>Get your free 1000 MNIT coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout"
         onClick={handleClick}
         disabled={is_disabled}>
         {res}
        </button>
      </p>
    
    </div>
  );
}

export default Faucet;
