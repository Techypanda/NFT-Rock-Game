import requestHandler from "./requestHandler";

export async function registerUser(username: string, password: string, confirmpassword: string, email?: string) {
  return requestHandler("register", {
    username, password, confirmpassword, email
  })
}