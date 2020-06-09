import { defaultValueValue } from "visual/utils/onChange";

export function styleElementLottieWidth({ v, device, state }) {
  const dvv = key => defaultValueValue({ v, key, device, state });

  return dvv("width");
}

export function styleElementLottieHeight({ v, device, state }) {
  const dvv = key => defaultValueValue({ v, key, device, state });

  return dvv("height");
}
