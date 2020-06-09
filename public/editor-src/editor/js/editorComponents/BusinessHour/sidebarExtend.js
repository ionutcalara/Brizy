import { toolbarPaddingFourFields } from "visual/utils/toolbar";

export function getItems({ v, device }) {
  return [
    toolbarPaddingFourFields({
      v,
      device,
      prefix: "item",
      state: "normal"
    })
  ];
}
