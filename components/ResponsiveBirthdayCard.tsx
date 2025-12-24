"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import BirthdayCard from "./BirthdayCard"
import styles from "./ResponsiveBirthdayCard.module.css"

const ResponsiveBirthdayCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const containerHeight = containerRef.current.offsetHeight
        const cardWidth = 550 // Original card width
        const cardHeight = 366.66667 // Original card height

        const scaleX = containerWidth / cardWidth
        const scaleY = containerHeight / cardHeight
        const newScale = Math.min(scaleX, scaleY, 1) // Limit max scale to 1

        setScale(newScale)
      }
    }

    updateScale()
    window.addEventListener("resize", updateScale)

    return () => {
      window.removeEventListener("resize", updateScale)
    }
  }, [])

  return (
    <div className={styles.responsiveContainer} ref={containerRef}>
      <div className={styles.scaleContainer} style={{ transform: `scale(${scale})` }}>
        <BirthdayCard />
      </div>
    </div>
  )
}

export default ResponsiveBirthdayCard
