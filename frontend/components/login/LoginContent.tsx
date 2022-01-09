import styled from "@emotion/styled"
import { TextField, Box, FormControlLabel, Checkbox, Button, Divider, Typography, CircularProgress } from "@mui/material"
import { AxiosError } from "axios";
import { motion, useAnimation, Variants } from "framer-motion";
import { useRouter } from "next/router"
import { useState } from "react";
import { loginUser, saveTokens } from "../../api/api";

const variants: Variants = {
  error: {
    rotate: [-1, 1.3, 0],
    transition: {
      delay: -0.5,
      repeat: 0,
      duration: 0.3
    }
  },
  reset: {
    rotate: 0
  }
};


function LoginContent(props: DefaultProps) {
  const controls = useAnimation();
  const { className } = props
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function loginLogic() {
    if (!username) {
      setError("Username / Email is missing")
      controls.start("error")
    } else if (!password) {
      setError("Password is missing")
      controls.start("error")
    } else {
      try {
        setLoading(true);
        const resp = await loginUser(username, password, rememberMe)
        const access = resp.data.access
        const refresh = resp.data.refresh
        saveTokens(access, refresh)
        alert("TODO: Context Update and refresh loop")
      } catch (e) {
        const err = e as AxiosError
        setError(err.response?.data.error)
        controls.start("error")
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <motion.div variants={variants} animate={controls}>
      <form id="logincontent" className={className}>
        <Box mb={2}>
          <TextField id="username" label="Username Or Email" variant="outlined" fullWidth onChange={(e) => setUsername(e.target.value)} value={username} />
        </Box>
        <Box mb={1}>
          <TextField id="password" label="Password" variant="outlined" type="password" autoComplete="current-password" fullWidth onChange={(e) => setPassword(e.target.value)} value={password} />
        </Box>
        <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />} label="Keep me signed in" />
        <Box mb={error ? 2 : 0}>
          <Typography align="center" variant="body2" className="error">{error}</Typography>
        </Box>
        <Button sx={{ borderRadius: '30px', padding: '15px' }} variant="contained" fullWidth onClick={() => loginLogic()}>Login</Button>
        <Box my={8}>
          <Divider />
        </Box>
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h6" component="h2" align="center" className="clickable" onClick={() => router.push('/forgot-password')}>Forgot Password?</Typography>
        </Box>
        {loading ?
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box> : <></>
        }
      </form>
    </motion.div>
  )
}
export default styled(LoginContent)`
.clickable {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
}
.error {
  color: #CC0000 !important;
}
`