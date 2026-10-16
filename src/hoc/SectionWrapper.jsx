import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName, customStyles = "") =>
  function HOC() {
    return (
      <motion.section
        id={idName || undefined}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        className={`${customStyles || styles.padding} max-w-7xl mx-auto relative z-0 scroll-mt-24`}
      >
        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
