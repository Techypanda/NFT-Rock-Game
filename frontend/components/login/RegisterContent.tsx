import styled from "@emotion/styled"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material"
import { AxiosError } from "axios"
import { motion, useAnimation, Variants } from "framer-motion"
import { useRouter } from "next/router"
import { useState } from "react"
import { registerUser } from "../../api/api"


const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);
const randomDuration = () => Math.random() * 0.07 + 0.23;

const variants: Variants = {
  start: (i: number) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      delay: getRandomDelay(),
      repeat: 0,
      duration: randomDuration()
    }
  }),
  reset: {
    rotate: 0
  }
};


function RegisterContent(props: DefaultProps) {
  const controls = useAnimation()
  const router = useRouter();
  const { className } = props // autoComplete="new-password"
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  async function handleFormSubmission() {
    if (!username) {
      setError("Username is required")
      controls.start("start")
    } else if (!password) {
      setError("Password is required")
      controls.start("start")
    } else if (!confirmPassword) {
      setError("Please confirm password")
      controls.start("start")
    } else if (password != confirmPassword) {
      setError("Those passwords do not match")
      controls.start("start")
    } else {
      try {
        const resp = await registerUser(username, password, confirmPassword, email ? email : undefined)
        alert("Successfully Registered") // TODO: make this a mui dialog
        router.push("/login")
      } catch (e) {
        const err = e as AxiosError
        setError(err.response?.data.error)
        controls.start("start")
      }
    }
  }
  return (
    <motion.div variants={variants} animate={controls} custom={1}>
      <form id="registercontent" className={className}>
        <Box mb={2}>
          <TextField id="username" label="Username" variant="outlined" fullWidth onChange={(e) => setUsername(e.target.value)} value={username} />
        </Box>
        <Box mb={2}>
          <TextField id="password" label="Password" variant="outlined" type="password" autoComplete="new-password" fullWidth onChange={(e) => setPassword(e.target.value)} value={password} />
        </Box>
        <Box mb={2}>
          <TextField id="repeat-password" label="Enter Password Again" variant="outlined" type="password" autoComplete="new-password" fullWidth onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        </Box>
        <Box mb={2}>
          <TextField id="email" label="Email Address (Optional)" variant="outlined" type="email" fullWidth onChange={(e) => setEmail(e.target.value)} value={email} />
        </Box>
        <Typography variant="body2">While it is unlikely data would get breached, it's always a possibility and this is a 'for fun' application, please acknowledge that you are ok with this possibility (Just use dummy data...)</Typography>
        <FormControlLabel control={<Checkbox defaultChecked />} label="I understand" />
        <Box mb={error ? 2 : 0}>
          <Typography align="center" variant="body2" className="error">{error}</Typography>
        </Box>
        <Button sx={{ borderRadius: '30px', padding: '15px' }} variant="contained" fullWidth onClick={() => handleFormSubmission()}>Register</Button>
      </form>
    </motion.div>
  )
}
export default styled(RegisterContent)`
.clickable {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
}
.error {
  color: #CC0000 !important;
}
`