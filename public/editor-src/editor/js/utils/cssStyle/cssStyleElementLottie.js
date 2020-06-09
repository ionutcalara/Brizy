import {
  styleElementLottieHeight,
  styleElementLottieWidth
} from "visual/utils/style2";

export function cssStyleElementLottieWidth({ v, device, state }) {
  return `width: ${styleElementLottieWidth({ v, device, state })}px;`;
}
export function cssStyleElementLottieHeight({ v, device, state }) {
  return `height: ${styleElementLottieHeight({ v, device, state })}px;`;
}
