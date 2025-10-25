import { motion } from 'framer-motion';

export default function AnimatedCheck({ size = 64, color = '#16a34a' }) {
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} />
      <motion.path d="M7 12.5l3 3 7-7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" variants={pathVariants} initial="hidden" animate="visible" />
    </svg>
  );
}
