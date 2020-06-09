import { renderStyles } from "visual/utils/cssStyle";

export function style(v, vs, vd) {
  const styles = {
    ".brz &&:hover": {
      standart: ["cssStyleDisplayFlex"]
    },
    ".brz &&:hover .brz-business-hour-day": {
      standart: ["cssStyleBgColor"]
    },
    ".brz &&:hover .brz-business-hour-time": {
      standart: ["cssStyleBgColor"]
    }
  };
  return renderStyles({ v, vs, vd, styles });
}
