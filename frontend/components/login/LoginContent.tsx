import styled from "@emotion/styled"
import { TextField, Box, FormGroup, FormControlLabel, Checkbox, Button, Divider, Typography } from "@mui/material"
import { useRouter } from "next/router"

function LoginContent(props: DefaultProps) {
  const { className } = props
  const router = useRouter();
  return (
    <div id="logincontent" className={className}>
      <Box mb={2}>
        <TextField id="username" label="Username" variant="outlined" fullWidth />
      </Box>
      <Box mb={1}>
        <TextField id="password" label="Password" variant="outlined" type="password" autoComplete="current-password" fullWidth />
      </Box>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Keep me signed in" />
      <Button sx={{ borderRadius: '30px', padding: '15px' }} variant="contained" fullWidth>Login</Button>
      <Box my={8}>
        <Divider />
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Typography variant="h6" component="h2" align="center" className="clickable" onClick={() => router.push('/forgot-password')}>Forgot Password?</Typography>
      </Box>
    </div>
  )
}
export default styled(LoginContent)`
.clickable {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
}
`