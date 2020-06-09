import { cssStyleBorder } from "visual/utils/cssStyle/cssStyleBorder";
import { cssStyleColor } from "visual/utils/cssStyle/cssStyleColor";
import { cssStyleBgColor } from "visual/utils/cssStyle/cssStyleBgColor";
import { styleAlignHorizontal } from "visual/utils/style2";
import {
  cssStyleTypography2FontFamily,
  cssStyleTypography2FontSize,
  cssStyleTypography2FontWeight,
  cssStyleTypography2LetterSpacing,
  cssStyleTypography2LineHeight
} from "visual/utils/cssStyle/cssStyleTypography2";
import { cssStylePaddingFourFields } from "visual/utils/cssStyle/cssStylePadding";

export function cssStyleElementBusinessHourBorderItem({ v, device, state }) {
  return cssStyleBorder({ v, device, state, prefix: "item" });
}

export function cssStyleElementBusinessHourItemColor({ v, device, state }) {
  return cssStyleColor({ v, device, state, prefix: "itemColor" });
}

export function cssStyleElementBusinessHourLastItemColor({ v, device, state }) {
  return cssStyleColor({ v, device, state, prefix: "lastItemColor" });
}

export function cssStyleBgIconCoverColor({ v, device, state }) {
  return cssStyleBgColor({ v, device, state, prefix: "iconBg" });
}

export function cssStyleElementBusinessHourTitleAlign({ v, device, state }) {
  const align = styleAlignHorizontal({ v, device, state, prefix: "title" });

  return align === undefined ? "" : `text-align:${align};`;
}

export function cssStyleElementBusinessHourItemsAlign({ v, device, state }) {
  const align = styleAlignHorizontal({ v, device, state, prefix: "items" });

  return align === undefined ? "" : `text-align:${align};`;
}

export function cssStyleElementBusinessHourBorderTitle({ v, device, state }) {
  return cssStyleBorder({ v, device, state, prefix: "title" });
}

// Style Typography Items
export function cssStyleElementBusinessHourTypography2FontFamily({
  v,
  device
}) {
  return cssStyleTypography2FontFamily({ v, device, prefix: "item" });
}

export function cssStyleElementBusinessHourTypography2FontSize({ v, device }) {
  return cssStyleTypography2FontSize({ v, device, prefix: "item" });
}

export function cssStyleElementBusinessHourTypography2LineHeight({
  v,
  device
}) {
  return cssStyleTypography2LineHeight({ v, device, prefix: "item" });
}

export function cssStyleElementBusinessHourTypography2FontWeight({
  v,
  device
}) {
  return cssStyleTypography2FontWeight({ v, device, prefix: "item" });
}

export function cssStyleElementBusinessHourTypography2LetterSpacing({
  v,
  device
}) {
  return cssStyleTypography2LetterSpacing({ v, device, prefix: "item" });
}

// Padding To Items
export function cssStyleElementBusinessHourItemsPaddingFourFields({
  v,
  device,
  state
}) {
  return cssStylePaddingFourFields({ v, device, state, prefix: "item" });
}
