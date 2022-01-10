import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthStatus } from "../api/hooks"
import LoginForm from "../components/login/LoginForm"

function Register(props: DefaultProps) {
  const { className } = props
  const { authenticated } = useAuthStatus()
  const router = useRouter()
  useEffect(() => {
    if (authenticated) {
      router.push("/")
    }
  }, [authenticated])
  return (
    <div className={className} id="register-form">
      <LoginForm register={true} />
    </div>
  )
}

export default styled(Register)`
`;