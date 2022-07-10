  import Principal  "mo:base/Principal";
import HashMap  "mo:base/HashMap";
import Debug  "mo:base/Debug";
import Iter  "mo:base/Iter";
actor Token {
   let owner  : Principal = Principal.fromText("nglx5-5oprp-6nzh3-qkdnw-r37or-q23vh-bykr6-eqqtl-pcodm-jnwls-jae");
   let total_supply : Nat = 2000000;
  let symbol :Text = "MNIT";
   private stable  var balanceEntries : [(Principal, Nat)] = [];   // private and stable as we dont want data to be lost before every deploy. Tuples inside array
    private  var balances = HashMap.HashMap<Principal, Nat> (1, Principal.equal , Principal.hash);   // creating a hashmap and initialising it to a initial length of 1. This variable is made private as the balances variable only changes while transferring the tokens and transferring is only happening through the functions(made by the developer) in  the code. **sounds like OOPS :)
  
 //balances.put(owner, total_supply);
    public query func check_balance (who : Principal): async Nat{
       Debug.print("hello");
      let balance : Nat = switch (balances.get(who)){
          case null 0;
          case (?result) result;
       };
       return balance;
    };

      public shared(msg) func free_tokens(): async Text{
                 Debug.print(debug_show(msg.caller)); 
                 if(balances.get(msg.caller) == null)
               {
                  let res = await transfer(msg.caller, 1000) ;
                  return res;}
                 else
                 return "Already Claimed";
           };

      public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
             let from_balance = await check_balance(msg.caller);
             if(from_balance >= amount)
               {      let from_remaining_balance= from_balance - amount;
                      balances.put(msg.caller,from_remaining_balance );
                      let to_balance = await check_balance(to);
                      balances.put(to, to_balance+amount);
                      return "Success";
               }
               else{
                 return "Insufficient balance";
               }
      }  ; 

      system func preupgrade(){
              balanceEntries := Iter.toArray(balances.entries());
      } ; 

       system func postupgrade(){
              balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
              if (balances.size() < 1 )
                { balances.put(owner, total_supply);}
      } ; 

}

