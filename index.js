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
