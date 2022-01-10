import styled from "@emotion/styled";
import { Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { motion, useAnimation, Variants } from "framer-motion";
import { useState } from "react";
import { useLoot } from "../../api/hooks";

const variants: Variants = {
  shake: {
    rotate: [-1, 1.3, 0],
    transition: {
      delay: -0.5,
      repeat: 0,
      duration: 0.3
    }
  }
};

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box>
      <LinearProgress variant="determinate" {...props} color="success" />
      <Typography variant="body2" color="text.secondary" align="center">{`${Math.round(
        props.value,
      )}%`}</Typography>
    </Box>
  );
}

function Rock(props: DefaultProps) {
  const controls = useAnimation()
  const [healthRemaining, setHealthRemaining] = useState(100);
  const { setRecieveLoot } = useLoot()
  function clickRock() {
    controls.start("shake")
    if (healthRemaining - 1 <= 0) {
      setRecieveLoot(true);
      setHealthRemaining(100);
    } else {
      setHealthRemaining(healthRemaining - 1)
    }
  }
  function computeProgress() {
    return ((healthRemaining - 100) * -1)
  }
  return (
    <Box p={5}>
      <Box display="flex" justifyContent="center">
        <Box width={250} height={250}>
          <motion.div variants={variants} animate={controls}>
            <img src="/images/rock.png" onClick={() => clickRock()} draggable="false" />
          </motion.div>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Box width={250}>
          <LinearProgressWithLabel value={computeProgress()} />
        </Box>
      </Box>
    </Box>
  )
}
export default styled(Rock)`
`