import { t } from "visual/utils/i18n";
import { toolbarPaddingFourFieldsPxSuffix } from "visual/utils/toolbar";

export const title = t("Table");

export function getItems({ v, device }) {
  return [
    {
      id: "settingsTabs",
      type: "tabs-dev",
      config: {
        align: "start"
      },
      devices: "desktop",
      tabs: [
        {
          id: "settingsStyling",
          label: t("Styling"),
          tabIcon: "nc-styling",
          devices: "desktop",
          options: [
            toolbarPaddingFourFieldsPxSuffix({
              v,
              device,
              state: "normal",
              onChangeGrouped: ["onChangePaddingGrouped"],
              onChangeUngrouped: ["onChangePaddingUngrouped"]
            })
          ]
        }
      ]
    }
  ];
}
