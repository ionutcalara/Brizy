import { t } from "visual/utils/i18n";
import { hexToRgba } from "visual/utils/color";
import { HOVER, NORMAL } from "visual/utils/stateMode";
import { defaultValueValue } from "visual/utils/onChange";
import { getOptionColorHexByPalette } from "visual/utils/options";

export default isLast => {
  return {
    getItems: getItems(isLast)
  };
};

const getItems = isLast => ({ v, device }) => {
  const dvv = key => defaultValueValue({ v, key, device });

  const { hex: bgColorHex } = getOptionColorHexByPalette(
    dvv("bgColorHex"),
    dvv("bgColorPalette")
  );

  return [
    isLast
      ? {
          id: "toolbarColor",
          type: "popover-dev",
          disabled: true,
          config: {
            size: "auto",
            title: t("Colors"),
            icon: {
              style: {
                backgroundColor:
                  dvv("bgColorOpacity") > 0 &&
                  hexToRgba(bgColorHex, dvv("bgColorOpacity"))
              }
            }
          },
          roles: ["admin"],
          devices: "desktop",
          position: 90,
          options: [
            {
              id: "tabsColor",
              type: "tabs-dev",
              tabs: [
                {
                  id: "tabBg",
                  label: t("Bg"),
                  options: [
                    {
                      id: "bgColor",
                      type: "colorPicker-dev",
                      states: [NORMAL, HOVER]
                    }
                  ]
                }
              ]
            }
          ]
        }
      : {
          id: "toolbarColorLast",
          type: "popover-dev",
          disabled: true,
          config: {
            size: "auto",
            title: t("Colors"),
            icon: {
              style: {
                backgroundColor:
                  dvv("bgColorOpacity") > 0 &&
                  hexToRgba(bgColorHex, dvv("bgColorOpacity"))
              }
            }
          },
          roles: ["admin"],
          devices: "desktop",
          position: 90,
          options: [
            {
              id: "tabsColor",
              type: "tabs-dev",
              tabs: [
                {
                  id: "tabBg",
                  label: t("Bg"),
                  options: [
                    {
                      id: "bgColor",
                      type: "colorPicker-dev",
                      states: [NORMAL, HOVER]
                    }
                  ]
                }
              ]
            }
          ]
        }
  ];
};
