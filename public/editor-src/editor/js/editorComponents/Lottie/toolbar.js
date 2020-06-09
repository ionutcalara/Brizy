import { t } from "visual/utils/i18n";

export function getItems() {
  return [
    {
      id: "toolbarCurrentShortcode",
      type: "popover-dev",
      config: {
        icon: "nc-lottie",
        title: t("Lottie")
      },
      devices: "desktop",
      position: 70,
      options: [
        {
          id: "animationLink",
          label: t("Animation link"),
          type: "inputText-dev",
          devices: "desktop",
          placeholder: "animation link",
          helper: {
            content: t("Enter the link to Lottie Animation.")
          }
        },
        {
          id: "autoplay",
          label: t("Auto play"),
          type: "switch-dev"
        },
        {
          id: "direction",
          label: t("Reverse"),
          type: "switch-dev",
          config: {
            on: "-1",
            off: "1"
          }
        },
        {
          id: "loop",
          label: t("Loop"),
          type: "switch-dev"
        },
        {
          id: "speed",
          type: "slider-dev",
          label: t("Speed"),
          devices: "desktop",
          config: {
            min: 1,
            max: 10
          }
        }
      ]
    },
    {
      id: "toolbarSettings",
      type: "popover-dev",
      config: {
        icon: "nc-cog"
      },
      title: t("Settings"),
      position: 110,
      options: [
        {
          id: "width",
          label: t("Width"),
          type: "slider-dev",
          config: {
            min: 1,
            max: 1000,
            units: [{ value: "px", title: "px" }]
          }
        },
        {
          id: "height",
          label: t("Height"),
          type: "slider-dev",
          config: {
            min: 1,
            max: 1000,
            units: [{ value: "px", title: "px" }]
          }
        },
        {
          id: "advancedSettings",
          type: "advancedSettings",
          devices: "desktop",
          label: t("More Settings"),
          icon: "nc-cog"
        }
      ]
    }
  ];
}
