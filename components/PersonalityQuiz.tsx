"use client"

import React, { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"

export default function PersonalityQuiz() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const questions = [
    {
      question: "How do you feel after a social gathering?",
      options: [
        { text: "Drained and in need of alone time.", type: "introvert" },
        { text: "Energized and excited.", type: "extrovert" },
        { text: "It depends on the gathering and people.", type: "ambivert" },
      ],
    },
    {
      question: "How do you prefer to spend a weekend?",
      options: [
        { text: "Relaxing at home, reading, or enjoying a solo activity.", type: "introvert" },
        { text: "Going out with friends or attending an event.", type: "extrovert" },
        { text: "A mix of both, depending on my mood.", type: "ambivert" },
      ],
    },
    {
      question: "How do you handle group discussions or team activities?",
      options: [
        { text: "I prefer to listen more and share only when necessary.", type: "introvert" },
        { text: "I enjoy contributing actively and leading discussions.", type: "extrovert" },
        { text: "I balance between listening and sharing as needed.", type: "ambivert" },
      ],
    },
    {
      question: "How do you feel in crowded or noisy places?",
      options: [
        { text: "Overwhelmed and eager to leave.", type: "introvert" },
        { text: "Excited and thrive in the energy.", type: "extrovert" },
        { text: "I'm fine for a while but need breaks.", type: "ambivert" },
      ],
    },
    {
      question: "When faced with a challenge, how do you prefer to solve it?",
      options: [
        { text: "Analyze the situation alone before acting.", type: "introvert" },
        { text: "Brainstorm ideas with others for immediate solutions.", type: "extrovert" },
        { text: "Use both reflection and group collaboration.", type: "ambivert" },
      ],
    },
    {
      question: "How do you handle networking or meeting new people?",
      options: [
        { text: "I find it challenging and stick to familiar faces.", type: "introvert" },
        { text: "I enjoy meeting new people and initiating conversations.", type: "extrovert" },
        { text: "I don't mind it, but I prefer meaningful connections.", type: "ambivert" },
      ],
    },
    {
      question: "What energizes you after a long day?",
      options: [
        { text: "Spending quiet time alone.", type: "introvert" },
        { text: "Socializing with friends or family.", type: "extrovert" },
        { text: "Doing something enjoyable, whether alone or with others.", type: "ambivert" },
      ],
    },
    {
      question: "What role do you take in group projects?",
      options: [
        { text: "I prefer to work behind the scenes and contribute independently.", type: "introvert" },
        { text: "I naturally take the lead and enjoy collaborating.", type: "extrovert" },
        { text: "I adapt my role depending on the group dynamic.", type: "ambivert" },
      ],
    },
    {
      question: "How do you usually process your thoughts?",
      options: [
        { text: "Internally—through reflection or journaling.", type: "introvert" },
        { text: "Externally—by talking it out with others.", type: "extrovert" },
        { text: "A combination of both.", type: "ambivert" },
      ],
    },
    {
      question: "How do you approach making plans with friends?",
      options: [
        { text: "I prefer spontaneous, small-scale plans or staying in.", type: "introvert" },
        { text: "I actively organize big social gatherings or events.", type: "extrovert" },
        { text: "I'm comfortable with either, depending on my mood.", type: "ambivert" },
      ],
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ introvert: 0, extrovert: 0, ambivert: 0 })
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (type: string) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult()
    }
  }

  const calculateResult = async () => {
    const highestScore = Math.max(...Object.values(scores))
    const resultType = Object.keys(scores).find((key) => scores[key] === highestScore)
    setResult(resultType || null)

    if (isClient && resultType) {
      try {
        await addDoc(collection(db, "quizResults"), {
          result: resultType,
          timestamp: new Date(),
        })
        console.log("Result saved successfully")
      } catch (error) {
        console.error("Error saving result: ", error)
      }
    }
  }

  if (!isClient) {
    return <div>Loading...</div>
  }

  if (currentQuestion >= questions.length) {
    return <div>Error: No more questions available.</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 space-y-4">
        {!result ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Masakit pero Ganito Talaga</h1>
            <p className="text-gray-600 text-lg md:text-xl mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm md:text-base"
                >
                  {option.text}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Result:</h1>
            <p className="text-xl md:text-2xl mb-4">
              You are an <span className="font-bold text-blue-500">{result.toUpperCase()}</span>!
            </p>
            <p className="text-gray-600 text-base md:text-lg">
              {result === "introvert" && "You recharge by being alone and enjoy thoughtful, quiet environments.(Same)"}
              {result === "extrovert" && "You gain energy from social interactions and thrive in group settings."}
              {result === "ambivert" &&
                "You balance traits of both introversion and extroversion, adapting to situations."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

