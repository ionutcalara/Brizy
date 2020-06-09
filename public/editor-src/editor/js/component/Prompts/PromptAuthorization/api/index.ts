import Config from "visual/global/Config";
import { request2 } from "visual/utils/api/editor";
import { SignIn, SignUp } from "./types";

export const signIn = (data: SignIn): Promise<Response> => {
  const { site } = Config.get("urls");

  return request2(`${site}/login`, {
    method: "POST",
    body: new URLSearchParams(data)
  });
};

export const signUp = (data: SignUp): Promise<Response> => {
  const { site } = Config.get("urls");
  const { email, password, confirmPassword } = data;

  return request2(`${site}/signUp`, {
    method: "POST",
    body: new URLSearchParams({
      email,
      /* eslint-disable @typescript-eslint/camelcase */
      new_password: password,
      confirm_password: confirmPassword
      /* eslint-enable @typescript-eslint/camelcase */
    })
  });
};

export const recoveryEmail = (email: string): Promise<Response> => {
  const { site } = Config.get("urls");

  return request2(`${site}/recover-password`, {
    method: "POST",
    body: new URLSearchParams(email)
  });
};

export const logout = (): Promise<Response> => {
  const { site } = Config.get("urls");

  return request2(`${site}/logout`, {
    method: "POST"
  });
};

export const sync = (): Promise<Response> => {
  const { site } = Config.get("urls");

  return request2(`${site}/sync`, {
    method: "POST"
  });
};

export const checkCompatibility = (): Promise<{
  status: number;
  data?: { isSyncAllowed: boolean };
}> => {
  return Promise.resolve({
    status: 200
  });
};
