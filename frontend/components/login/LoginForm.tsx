import styled from "@emotion/styled"
import { Box, Grid, Paper, Typography } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import LoginContent from "./LoginContent";
import RegisterContent from "./RegisterContent";

const variants: Variants = {
  hidden: { color: 'rgba(0, 0, 0, 0.87)' }, // , x: -200, y: 0
  enter: { color: '#CC0000' }, // x: 0, y: 0
  exit: { color: 'rgba(0, 0, 0, 0.87)' }, // x: 0, y: -100
}

function LoginForm(props: LoginFormProps) {
  const { className, register } = props;
  const router = useRouter();
  return (
    <div className={className}>
      <Box maxWidth={540} margin="auto" mt={4}>
        <Paper>
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item>
                {!register ?
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ type: 'linear' }}
                  >
                    <Typography className={`clickable active`} variant="h5" component="h1" onClick={() => router.push("/login")}>Sign In</Typography>
                  </motion.div>
                  :
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                  >
                    <Typography className={`clickable inactive`} variant="h5" component="h1" onClick={() => router.push("/login")}>Sign In</Typography>
                  </motion.div>
                }
              </Grid>
              <Grid item>
                {!register ?
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                  >
                    <Typography className={`clickable inactive`} variant="h5" component="h1" onClick={() => router.push("/register")}>Sign Up</Typography>
                  </motion.div>
                  :
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ type: 'linear' }}
                  >
                    <Typography className={`clickable active`} variant="h5" component="h1" onClick={() => router.push("/register")}>Sign Up</Typography>
                  </motion.div>
                }
              </Grid>
            </Grid>
            <Box mt={4}>
              {register ? <RegisterContent /> : <LoginContent />}
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default styled(LoginForm)`
.clickable {
  cursor: pointer;
  font-weight: 500;
}
.active {
  border-bottom: 2px solid #CC0000
}
`