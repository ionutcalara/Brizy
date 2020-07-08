import { defaultValueKey } from "visual/utils/onChange";
import { t } from "visual/utils/i18n";
import {
  toolbarBorderRadius,
  toolbarPaddingFourFieldsPxSuffix
} from "visual/utils/toolbar";
import { getDynamicContentChoices } from "visual/utils/options";

export const title = t("Mega Menu");

export function getItems({ v, device }) {
  const dvk = key => defaultValueKey({ key, device, state: "normal" });

  const toolbarTagsChoices = [
    { title: t("Div"), value: "div" },
    { title: t("Header"), value: "header" },
    { title: t("Footer"), value: "footer" },
    { title: t("Main"), value: "main" },
    { title: t("Article"), value: "article" },
    { title: t("Section"), value: "section" },
    { title: t("Aside"), value: "aside" },
    { title: t("Nav"), value: "nav" }
  ];
  const richTextDC = getDynamicContentChoices("richText", true);

  return [
    {
      id: dvk("settingsTabs"),
      type: "tabs",
      align: "start",
      tabs: [
        {
          id: dvk("settingsStyling"),
          label: t("Styling"),
          tabIcon: "nc-styling",
          options: [
            toolbarPaddingFourFieldsPxSuffix({
              v,
              device,
              state: "normal"
            }),
            toolbarBorderRadius({
              v,
              device,
              state: "normal",
              onChangeGrouped: [
                "onChangeBorderRadiusGrouped",
                "onChangeBorderRadiusGroupedDependencies"
              ],
              onChangeUngrouped: [
                "onChangeBorderRadiusUngrouped",
                "onChangeBorderRadiusUngroupedDependencies"
              ]
            })
          ]
        },
        {
          id: dvk("moreSettingsAdvanced"),
          label: t("Advanced"),
          icon: "nc-cog",
          devices: "desktop",
          options: [
            {
              id: "showOnDesktop",
              label: t("Show on Desktop"),
              position: 10,
              closeTooltip: true,
              type: "switch-dev",
              devices: "desktop"
            },
            {
              id: "cssID",
              label: t("Block Name"),
              type: "population-dev",
              position: 40,
              devices: "desktop",
              display: "block",
              helper: {
                content: "Add your custom block name, example: my-block"
              },
              config: {
                choices: richTextDC
              },
              options: [
                {
                  id: "anchorName",
                  type: "inputText-dev"
                }
              ]
            },
            {
              id: "cssClass",
              label: t("CSS Class"),
              type: "population-dev",
              position: 40,
              devices: "desktop",
              display: "block",
              helper: {
                content:
                  "Add your custom class without the .dot, example: my-class"
              },
              config: {
                choices: richTextDC
              },
              options: [
                {
                  id: "customClassName",
                  type: "inputText-dev"
                }
              ]
            },
            {
              id: "customAttributes",
              label: t("Custom Attributes"),
              type: "codeMirror-dev",
              position: 45,
              placeholder: "key1:value1\nkey2:value2",
              display: "block",
              devices: "desktop",
              helper: {
                content:
                  "Set your custom attribute for wrapper element. Each attribute in a separate line. Separate attribute key from the value using : character."
              },
              population: richTextDC
            },
            {
              id: "hoverTransition",
              label: t("Hover Transition"),
              devices: "desktop",
              position: 60,
              type: "slider-dev",
              config: {
                min: 0,
                max: 99,
                units: [{ title: "ms", value: "ms" }]
              }
            },
            {
              id: "tagName",
              label: t("Html Tag"),
              type: "select-dev",
              devices: "desktop",
              choices: toolbarTagsChoices
            }
          ]
        }
      ]
    }
  ];
}
