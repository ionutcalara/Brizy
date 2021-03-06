import { t } from "visual/utils/i18n";
import { toolbarHoverTransition } from "visual/utils/toolbar";

export const title = t("Button");

export function getItems({ v, device }) {
  return [
    {
      id: "settingsTabs",
      type: "tabs",
      devices: "desktop",
      align: "start",
      disabled: v.type === "submit",
      tabs: [
        {
          id: "moreSettingsAdvanced",
          label: t("Advanced"),
          tabIcon: "nc-cog",
          options: [
            toolbarHoverTransition({
              v,
              device,
              state: "normal",
              devices: "desktop",
              position: 100
            })
          ]
        }
      ]
    }
  ];
}
