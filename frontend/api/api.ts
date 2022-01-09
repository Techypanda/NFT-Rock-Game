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