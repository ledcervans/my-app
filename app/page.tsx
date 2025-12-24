import ResponsiveBirthdayCard from "../components/ResponsiveBirthdayCard"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <ResponsiveBirthdayCard />
    </div>
  )
}
