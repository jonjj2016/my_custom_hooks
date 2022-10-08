import { useState, useEffect } from 'react'
const persistLocalStorage = (key, value) => {
  const savedValue = JSON.parse(localStorage.getItem(key))
  if (savedValue) return savedValue
  if (value instanceof Function) return value()
  return value
}

export const useLocalStorage = (key, initValues = '') => {
  const [state, setState] = useState(() => persistLocalStorage(key, initValues))
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])
  return [state, setState]
}

export const useLogger = (value) => {
  useEffect(() => {
    if (value) {
      console.log(value)
    }
  }, [value])
}

export const useStepForm = (steps = []) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }
  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }

  const goTo = (index) => {
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    steps,
    step: steps[currentStepIndex],
    goTo,
    next,
    pagination: {
      next: currentStepIndex < steps.length - 1,
      prev: currentStepIndex > 0,
    },
    back,
  }
}
