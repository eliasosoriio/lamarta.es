import { motion } from 'framer-motion'

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        filter: "blur(10px)"
    },
    animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: {
        opacity: 0,
        y: -14,
        filter: "blur(8px)",
        transition: {
            duration: 0.28,
            ease: "easeIn"
        }
    }
}

function PageTransition({ children }) {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition
