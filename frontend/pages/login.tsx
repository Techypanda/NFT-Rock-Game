import styled from "@emotion/styled"
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStatus } from "../api/hooks";
import LoginForm from "../components/login/LoginForm"

function Login(props: DefaultProps) {
  const { className } = props
  const { authenticated } = useAuthStatus()
  const router = useRouter()
  useEffect(() => {
    if (authenticated) {
      router.push("/")
    }
  }, [authenticated])
  return (
    <div className={className} id="login-form">
      <LoginForm />
    </div>
  )
}

export default styled(Login)`
`;