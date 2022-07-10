import React, { useState, useSyncExternalStore } from "react";
import {token} from "../../../declarations/token"
import {Principal} from '@dfinity/principal';

function Transfer() {
   const [id, set_id] = useState("");
   const [amount, set_amount] = useState("");
   const [status, set_status]= useState("");
   const [isdisabled, set_is_disabled]= useState(false);
  async function handleClick() {
    set_is_disabled(true);
    console.log(id, amount);
    const principal =Principal.fromText(id);
    console.log(typeof(amount));
    const res =await token.transfer(principal, Number(amount));
    console.log(res);
    set_status(res);
    set_is_disabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={id}
                onChange= {(e)=> set_id(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange= {(e)=> set_amount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isdisabled}>
            Transfer   
          </button>
        </p>
        {status}
      </div>
    </div>
  );
}

export default Transfer;
