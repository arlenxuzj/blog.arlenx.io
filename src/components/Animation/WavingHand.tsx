/* Copy and modify from
https://github.com/MaximeHeckel/blog.maximeheckel.com/blob/main/pages/index.tsx
*/
import { motion } from 'framer-motion';

const WavingHand = () => {
  return (
    <motion.span
      style={{
        marginBottom: '-20px',
        marginRight: '-45px',
        paddingBottom: '20px',
        paddingRight: '45px',
        display: 'inline-block'
      }}
      animate={{ rotate: 20 }}
      transition={{
        repeat: 15,
        repeatType: 'mirror',
        duration: 0.2,
        delay: 0.5,
        ease: 'easeInOut',
        type: 'tween'
      }}
    >
      <i className='twa twa-waving-hand'></i>
    </motion.span>
  );
};

export default WavingHand;
