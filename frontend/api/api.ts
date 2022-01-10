import requestHandler from "./requestHandler";

export async function registerUser(username: string, password: string, confirmpassword: string, email?: string) {
  return requestHandler("register", {
    username, password, confirmpassword, email
  })
}

export async function loginUser(username: string, password: string, rememberme: boolean) {
  return requestHandler("login", {
    identity: username, password, rememberme
  })
}

export function saveTokens(accessToken: string, refreshToken: string) {
  sessionStorage.setItem("access", accessToken)
  sessionStorage.setItem("refresh", refreshToken)
}

export function getTokens(): TokenPair {
  const accessToken = sessionStorage.getItem("access")
  const refreshToken = sessionStorage.getItem("refresh")
  if (!accessToken || !refreshToken) {
    throw Error("Access Token or Refresh Token is missing")
  }
  return {
    accessToken, refreshToken
  }
}

export async function doRefresh() {
  const tokens = getTokens()
  const resp = await requestHandler("refresh", {}, tokens.refreshToken)
  const access = resp.data.access
  const refresh = resp.data.refresh
  saveTokens(access, refresh)
}