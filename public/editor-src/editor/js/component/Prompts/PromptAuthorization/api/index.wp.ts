import Config from "visual/global/Config";
import { makeUrl, parseJSON } from "visual/component/Prompts/common/utils";
import { request2 } from "visual/utils/api/editor";
import { SignIn, SignUp } from "./types";

export const signIn = (data: SignIn): Promise<Response> => {
  const { api } = Config.get("wp");
  const version = Config.get("editorVersion");
  const url = makeUrl(api.url, {
    version,
    action: api.cloudSignIn
  });

  return request2(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(parseJSON)
    .then(res => res);
};

export const signUp = (data: SignUp): Promise<Response> => {
  const { api } = Config.get("wp");
  const version = Config.get("editorVersion");
  const url = makeUrl(api.url, {
    version,
    action: api.cloudSignUp
  });

  return request2(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(data)
  })
    .then(parseJSON)
    .then(res => res);
};

export const recoveryEmail = (email: string): Promise<Response> => {
  const { api } = Config.get("wp");
  const version = Config.get("editorVersion");
  const url = makeUrl(api.url, {
    version,
    action: api.cloudResetPassword
  });

  return request2(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ email })
  })
    .then(parseJSON)
    .then(res => res);
};

export const logout = (): Promise<Response> => {
  const { api } = Config.get("wp");
  const version = Config.get("editorVersion");
  const url = makeUrl(api.url, {
    version,
    action: api.cloudSignOut
  });

  return request2(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(parseJSON)
    .then(res => res);
};

export const sync = (): Promise<Response> => {
  const { api } = Config.get("wp");
  const version = Config.get("editorVersion");
  const url = makeUrl(api.url, {
    version,
    action: api.cloudSync
  });

  return new Promise((res, rej) => {
    request2(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(parseJSON)
      .then(r => {
        const { status, data } = r;

        if (!status || status >= 400) {
          throw r;
        } else {
          const { synchronized } = data;

          if (synchronized === 0) {
            res(r);
          } else {
            sync()
              .then(res)
              .catch(rej);
          }
        }
      })
      .catch(rej);
  });
};

export const checkCompatibility = (): Promise<Response> => {
  const { api } = Config.get("wp");
  const version = Config.get("editorVersion");
  const url = makeUrl(api.url, {
    version,
    action: api.cloudSyncAllowed
  });

  return request2(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(parseJSON)
    .then(res => res);
};
