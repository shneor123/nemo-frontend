import { useEffect, useState, useRef } from 'react'

export function useClickOutside(ref) {
  const [clickedOutside, setClickedOutside] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setClickedOutside(true)
      } else {
        setClickedOutside(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref])

  return clickedOutside
}
