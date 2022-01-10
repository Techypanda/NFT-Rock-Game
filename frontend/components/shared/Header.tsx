import styled from "@emotion/styled";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useRouter } from "next/router";
import { useAuthStatus } from "../../api/hooks";

function Header(props: DefaultProps) {
  const router = useRouter()
  const { authenticated } = useAuthStatus()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cyber Rock
          </Typography>
          {!authenticated ?
            <Button color="inherit" onClick={() => router.push("/login")}>Login</Button> :
            <></>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default styled(Header)`
`;