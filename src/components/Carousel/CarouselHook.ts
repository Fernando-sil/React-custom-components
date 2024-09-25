import { useState } from "react";

export function useIndex() {
  const [index, setIndex] = useState(0);

  function IncreaseIndex(count: number) {
    if (index === count - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }
  function DecreaseIndex(count: number) {
    if (index === 0) {
      setIndex(count);
    }
    setIndex((prev) => prev - 1);
  }
  function SetIndex(index: number) {
    setIndex(index);
  }

  return { index, IncreaseIndex, DecreaseIndex, SetIndex };
}
