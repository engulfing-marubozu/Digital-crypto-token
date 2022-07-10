import React from "react";
import { useState } from "react";
import {Principal} from '@dfinity/principal';
import {token} from "../../../declarations/token"

function Balance() {
   const [input_value , set_input_value] = useState("");
   const [balance , set_balance ] = useState("");
   const [is_hidden, set_is_hidden] = useState(true);
  async function handleClick() {
    console.log(input_value);
    const principal =Principal.fromText(input_value);
    console.log(principal);
    const res = await token.check_balance(principal);
    set_balance (res.toLocaleString());
    set_is_hidden(false);
    set_input_value("");
 }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={input_value}
          onChange= {(e)=> set_input_value(e.target.value)}
           />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={is_hidden}>This account has a balance of {balance}</p>
    </div>
  );
}

export default Balance;
