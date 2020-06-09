import { renderStyles } from "visual/utils/cssStyle";

export function styleContent(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleSizeWidth"]
    },
    ".brz &&:hover .brz-business-hour-wrapper ul": {
      standart: ["cssStyleBorder", "cssStyleBorderRadius", "cssStyleBoxShadow"]
    },
    ".brz &&:hover .brz-business-hour-wrapper .brz-business-hour-item": {
      standart: ["cssStyleElementBusinessHourBorderItem"]
    },
    ".brz &&:hover .brz-business-hour-title": {
      standart: [
        "cssStyleColor",
        "cssStyleBgColor",
        "cssStylePaddingFourFields",
        "cssStyleElementBusinessHourTitleAlign",
        "cssStyleElementBusinessHourBorderTitle",
        "cssStyleTypography2FontFamily",
        "cssStyleTypography2FontSize",
        "cssStyleTypography2LineHeight",
        "cssStyleTypography2FontWeight",
        "cssStyleTypography2LetterSpacing"
      ]
    },
    ".brz &&:hover .brz-business-hour-wrapper .brz-business-hour-day": {
      standart: [
        "cssStyleElementBusinessHourItemColor",
        "cssStyleElementBusinessHourItemsPaddingFourFields",
        "cssStyleElementBusinessHourTypography2FontFamily",
        "cssStyleElementBusinessHourTypography2FontSize",
        "cssStyleElementBusinessHourTypography2LineHeight",
        "cssStyleElementBusinessHourTypography2FontWeight",
        "cssStyleElementBusinessHourTypography2LetterSpacing",
        "cssStyleElementBusinessHourItemsAlign"
      ]
    },
    ".brz &&:hover .brz-business-hour-wrapper .brz-business-hour-time": {
      standart: [
        "cssStyleElementBusinessHourItemColor",
        "cssStyleElementBusinessHourItemsPaddingFourFields",
        "cssStyleElementBusinessHourTypography2FontFamily",
        "cssStyleElementBusinessHourTypography2FontSize",
        "cssStyleElementBusinessHourTypography2LineHeight",
        "cssStyleElementBusinessHourTypography2FontWeight",
        "cssStyleElementBusinessHourTypography2LetterSpacing",
        "cssStyleElementBusinessHourItemsAlign"
      ]
    },
    ".brz &&:hover .brz-business-hour-wrapper > ul li:last-child .brz-business-hour-day": {
      standart: ["cssStyleElementBusinessHourLastItemColor"]
    },
    ".brz &&:hover .brz-business-hour-wrapper > ul li:last-child .brz-business-hour-time": {
      standart: ["cssStyleElementBusinessHourLastItemColor"]
    }
  };
  return renderStyles({ v, vs, vd, styles });
}
