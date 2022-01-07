import styled from "@emotion/styled"
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material"

function RegisterContent(props: DefaultProps) {
  const { className } = props // autoComplete="new-password"
  return (
    <div id="registercontent" className={className}>
      <Box mb={2}>
        <TextField id="username" label="Username" variant="outlined" fullWidth />
      </Box>
      <Box mb={2}>
        <TextField id="password" label="Password" variant="outlined" type="password" autoComplete="new-password" fullWidth />
      </Box>
      <Box mb={2}>
        <TextField id="repeat-password" label="Enter Password Again" variant="outlined" type="password" autoComplete="new-password" fullWidth />
      </Box>
      <Box mb={2}>
        <TextField id="email" label="Email Address (Optional)" variant="outlined" type="email" fullWidth />
      </Box>
      <Typography variant="body2">While it is unlikely data would get breached, it's always a possibility and this is a 'for fun' application, please acknowledge that you are ok with this possibility (Just use dummy data...)</Typography>
      <FormControlLabel control={<Checkbox defaultChecked />} label="I understand" />
      <Button sx={{ borderRadius: '30px', padding: '15px' }} variant="contained" fullWidth>Register</Button>
    </div>
  )
}
export default styled(RegisterContent)`
.clickable {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
}
`