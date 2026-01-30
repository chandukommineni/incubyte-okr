import { createContext, type ReactElement, useState } from "react";
import type { KeyResult } from "../types/okr-types.ts";

type KeyResultContextDefault = {
  keyResultsList: KeyResult[];
  handleKeyResultAddition: (keyResult: KeyResult) => boolean;
};

export const KeyResultsContext = createContext<KeyResultContextDefault>({
  keyResultsList: [],
  handleKeyResultAddition: () => false,
});
const validateKeyResult = (keyResult: KeyResult): boolean => {
  const validKeyResultProgressRegex = /^[0-9]+%$/;

  return !(
    !keyResult.description ||
    !keyResult.progress ||
    !validKeyResultProgressRegex.test(keyResult.progress)
  );
};

const KeyResultProvider = ({ children }: { children: ReactElement }) => {
  const [keyResultsList, setKeyResultsList] = useState<KeyResult[]>([]);

  const handleKeyResultAddition = (keyResult: KeyResult): boolean => {
    if (validateKeyResult(keyResult)) {
      setKeyResultsList((prev: KeyResult[]) => [...prev, keyResult]);
      return true;
    }
    return false;
  };
  return (
    <KeyResultsContext.Provider
      value={{ keyResultsList, handleKeyResultAddition }}
    >
      {children}
    </KeyResultsContext.Provider>
  );
};
export default KeyResultProvider;
