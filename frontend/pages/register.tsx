import styled from "@emotion/styled"
import LoginForm from "../components/login/LoginForm"

function Register(props: DefaultProps) {
  const { className } = props
  return (
    <div className={className} id="register-form">
      <LoginForm register={true} />
    </div>
  )
}

export default styled(Register)`
`;