import { useReducedMotion } from 'framer-motion'
import styles from './SplitHeadline.module.css'

interface SplitHeadlineProps {
  text: string
  className?: string
  delay?: number // ms delay before animation starts
}

export function SplitHeadline({ text, className, delay = 300 }: SplitHeadlineProps) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  return (
    <h1 className={`${styles.headline} ${className ?? ''}`}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordWrapper} aria-hidden="false">
          <span
            className={styles.word}
            style={
              shouldReduce
                ? { transform: 'translateY(0)', opacity: 1 }
                : {
                    animationDelay: `${delay + i * 60}ms`,
                  }
            }
          >
            {word}
          </span>
          {/* Non-breaking space between words, visible space between wrappers */}
          {i < words.length - 1 && <span className={styles.space}> </span>}
        </span>
      ))}
    </h1>
  )
}

export default SplitHeadline
