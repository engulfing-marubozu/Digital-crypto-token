export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'check_balance' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'free_tokens' : IDL.Func([], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
