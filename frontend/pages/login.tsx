import styled from "@emotion/styled"
import { Box } from "@mui/material";
import LoginForm from "../components/login/LoginForm"

function Login(props: DefaultProps) {
  const { className } = props
  return (
    <div className={className} id="login-form">
      <LoginForm />
    </div>
  )
}

export default styled(Login)`
`;