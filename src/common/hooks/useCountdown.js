import {useEffect, useState} from "react"

const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime()

    const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(countDownDate - new Date().getTime())
        }, 1000)

        return () => clearInterval(interval)
    }, [countDownDate])

    return (countDown >= 0 || isNaN(countDown)) ? getReturnValues(countDown) : getReturnNegativeValues(countDown)
}



const getReturnNegativeValues = (countDown) => {
    const hours = Math.abs(Math.floor(countDown / (1000 * 60 * 60)) + 1)
    const minutes = Math.abs(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)) + 1)
    const seconds = Math.abs(Math.floor((countDown % (1000 * 60)) / 1000))

    return [
        true,
        isNaN(hours) ? "0" : hours,
        isNaN(minutes) ? "00" : ('0' + minutes).slice(-2),
        isNaN(seconds) ? "00" : ('0' + seconds).slice(-2)];
}

const getReturnValues = (countDown) => {
    const hours = Math.floor(countDown / (1000 * 60 * 60));
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

    return [
        false,
        isNaN(hours) ? "0" : hours,
        isNaN(minutes) ? "00" : ('0' + minutes).slice(-2),
        isNaN(seconds) ? "00" : ('0' + seconds).slice(-2)];
}

export { useCountdown }