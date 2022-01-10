import styled from "@emotion/styled";
import { Button, Typography, Box } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { useLoot, useMoney } from "../../api/hooks";

const variants: Variants = { // I just want fading effect so I'm removing the x y stuff
  hidden: { y: -200, opacity: 0 }, // , x: -200, y: 0
  enter: { y: 0, opacity: 1 }, // x: 0, y: 0
  exit: { y: -200, opacity: 0 }, // x: 0, y: -100
}

// min inclusive, max exclusive
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Gem(props: LootProps) {
  const { accept } = props
  const [rarity] = useState(getRandomArbitrary(1, 6)) // 1 - 5
  const [moneyRoll] = useState(getRandomArbitrary(1, 6)) // 1 - 6
  return (
    <motion.div variants={variants} animate="enter" initial="hidden" exit="exit">
      <Typography variant="h4" align="center">You Have Found A Gem!</Typography>
      <Typography variant="h5" align="center">Rarity: {rarity.toFixed(3)}</Typography>
      <Typography variant="subtitle2" align="center">Monitary Value (rarity * random value in range 1 - 5): ${(rarity * moneyRoll).toFixed(2)}</Typography>
      <Box display="flex" justifyContent="center">
        <img src="/images/loot.gif" draggable="false" />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" onClick={() => accept(rarity * moneyRoll)}>Ok</Button>
      </Box>
    </motion.div>
  )
}

function Trash(props: LootProps) {
  const { accept } = props
  return (
    <motion.div variants={variants} animate="enter" initial="hidden" exit="exit">
      <Typography variant="h4" align="center">You Have Found Trash...</Typography>
      <Typography variant="h5" align="center">Sorry, It's worthless</Typography>
      <Typography variant="subtitle2" align="center">Better Luck Next Rock :(</Typography>
      <Box display="flex" justifyContent="center">
        <img src="/images/trash.gif" draggable="false" />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" onClick={() => accept(0)}>Ok</Button>
      </Box>
    </motion.div>
  )
}

function Loot(props: DefaultProps) {
  const { setRecieveLoot } = useLoot();
  const { money, setMoney } = useMoney();
  const [trashOrLoot] = useState(Math.random())
  function handleAccept(inMoney: number) {
    setMoney(money + inMoney);
    setRecieveLoot(false);
  }
  return (
    <>
      {trashOrLoot > 0.7 ?
        <Gem accept={handleAccept} /> :
        <Trash accept={handleAccept} />
      }
    </>
  )
}
export default styled(Loot)`
`