import { createContext, useState } from "react";

export const FuncaoContext = createContext();

export function FuncaoProvider({ children }) {
  const [funcao, setFuncao] = useState(() => null);
  return (
    <FuncaoContext.Provider value={{ funcao, setFuncao }}>
      {children}
    </FuncaoContext.Provider>
  );
}
