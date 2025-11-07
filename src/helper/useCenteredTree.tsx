import { useCallback, useState } from "react";

interface Translate {
  x: number;
  y: number;
}

export const useCenteredTree = (
  defaultTranslate: Translate = { x: 0, y: 0 }
): [Translate, (containerElem: HTMLDivElement | null) => void] => {
  const [translate, setTranslate] = useState<Translate>(defaultTranslate);

  const containerRef = useCallback((containerElem: HTMLDivElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 5 });
    }
  }, []);

  return [translate, containerRef];
};
