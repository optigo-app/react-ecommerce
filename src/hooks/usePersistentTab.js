import { atom } from "recoil";

export const tabAtom = atom({
  key: "jewelleryTabState",
  default: 0,
  effects: [
    ({ setSelf, onSet }) => {
      const stored = localStorage.getItem("jewelleryTab");
      if (stored !== null) setSelf(Number(stored));

      onSet((newValue) => {
        localStorage.setItem("jewelleryTab", newValue);
      });
    },
  ],
});
