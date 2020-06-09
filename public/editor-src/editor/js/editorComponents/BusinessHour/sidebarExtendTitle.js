import { toolbarPaddingFourFields } from "visual/utils/toolbar";
import { t } from "visual/utils/i18n";

export const title = t("BusinessHour Title");

export function getItems({ v, device }) {
  return [
    toolbarPaddingFourFields({
      v,
      device,
      state: "normal"
    })
  ];
}
