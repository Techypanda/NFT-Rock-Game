import { Container } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const variants = { // I just want fading effect so I'm removing the x y stuff
  hidden: { opacity: 0 }, // , x: -200, y: 0
  enter: { opacity: 1 }, // x: 0, y: 0
  exit: { opacity: 0 }, // x: 0, y: -100
}

function Layout(props: DefaultProps) {
  const { children } = props;
  const router = useRouter();
  return (
    <div>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: 'linear' }}
        key={router.route}
      >
        <Container>
          {children}
        </Container>
      </motion.main>
    </div>
  )
}
export default Layout;