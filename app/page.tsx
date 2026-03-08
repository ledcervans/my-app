import dynamic from "next/dynamic"

const PersonalityQuiz = dynamic(() => import("../components/PersonalityQuiz"), { ssr: false })

export default function Home() {
  return (
    <div className="App">
      <PersonalityQuiz />
    </div>
  )
}
