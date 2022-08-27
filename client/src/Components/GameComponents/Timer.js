import { useState, useEffect } from 'react'
/*
 * This component is used to count down and receives in props
 * time: in seconds as a prop.
 * timerCallback: is a function that is called when the timer reaches 0.
 */
function Timer(props) {
  const { time, timerCallback } = props

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const countOneSecond = () => {
      if (seconds < time) {
        setTimeout(() => {
          setSeconds(seconds + 1)
        }, 1000)
      } else {
        timerCallback()
      }
    }
    countOneSecond()
  }, [seconds, time, timerCallback])
  return <>{time - seconds}</>
}
export default Timer
