"use client"

import type React from "react"
import { useState } from "react"
import styles from "./BirthdayCard.module.css"

const BirthdayCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleEnvelopeClick = () => {
    setIsOpen(true)
  }

  return (
    <div className={`${styles.envelope} ${isOpen ? styles.open : styles.new}`} onClick={handleEnvelopeClick}>
      <div className={styles.front}>
        <div className={styles.mail}>
          <p></p>
          <p>Click me</p>
        </div>
      </div>
      <div className={styles.back}>
        <div className={styles.letter}>
          <div className={styles.content}>
            <p>Panget👇</p>
            <p>    Ate Ban</p>
          </div>
          <div className={styles.box}>
            <div className={styles.cake}>
              <div className={styles.candle}>
                <div className={styles.fire}></div>
              </div>
            </div>
          </div>
          <p className={styles.hbdText}>Hatdog</p>
        </div>
        <div className={`${styles.flip} ${styles.leftFlip}`}></div>
        <div className={`${styles.flip} ${styles.rightFlip}`}></div>
        <div className={`${styles.flip} ${styles.bottomFlip}`}></div>
        <div className={`${styles.flip} ${styles.topFlip}`}></div>
      </div>
    </div>
  )
}

export default BirthdayCard
