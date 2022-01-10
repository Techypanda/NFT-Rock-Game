import { Box, Typography } from "@mui/material";
import { motion, useAnimation, Variants } from "framer-motion";
import { useState } from "react";
import { useLoot, useMoney } from "../api/hooks";
import Loot from "../components/landing/Loot";
import Rock from "../components/landing/Rock";

export default function Home() {
  const { money, moneyPerSecond } = useMoney();
  const { recieveLoot } = useLoot();
  return (
    <>
      <Box my={2}>
        <Typography>${money.toFixed(2)}</Typography>
        <Typography>${moneyPerSecond.toFixed(5)} per second</Typography>
      </Box>
      {recieveLoot ? <Loot /> : <Rock />}
    </>
  )
}
