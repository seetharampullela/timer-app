import {Component} from 'react'

import './index.css'

const initialState = {isPlayed: false, min: 25, sec: 0}

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => clearInterval(this.timerId)

  tick = () => {
    const {sec, min} = this.state
    const isTimerFinish = sec === min * 60

    if (isTimerFinish) {
      this.clearTimer()
      this.setState({isPlayed: false})
    } else {
      this.setState(prevState => ({
        sec: prevState.sec + 1,
      }))
    }
  }

  startTimer = () => {
    const {isPlayed, min, sec} = this.state
    const isTimerFinish = sec === min * 60

    if (isTimerFinish) {
      this.setState({sec: 0})
    }
    if (isPlayed) {
      this.clearTimer()
    } else {
      this.timerId = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({
      isPlayed: !prevState.isPlayed,
    }))
  }

  resetTimer = () => {
    this.clearTimer()
    this.setState(initialState)
  }

  positive = () => {
    const {isPlayed} = this.state
    if (!isPlayed) {
      this.setState(prevState => ({
        min: prevState.min + 1,
      }))
    }
  }

  negative = () => {
    const {isPlayed, min} = this.state
    if (!isPlayed && min > 1) {
      this.setState(prevState => ({
        min: prevState.min - 1,
      }))
    }
  }

  getTimeInSeconds = () => {
    const {min, sec} = this.state
    const totalRemSec = min * 60 - sec
    const minutes = Math.floor(totalRemSec / 60)
    const seconds = Math.floor(totalRemSec % 60)
    const minString = minutes > 9 ? minutes : `0${minutes}`
    const secString = seconds > 9 ? seconds : `0${seconds}`
    return `${minString}:${secString}`
  }

  render() {
    const {min, isPlayed} = this.state

    const imgUrl = !isPlayed
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    return (
      <div className="bg-container">
        <h1> Digital Timer </h1>
        <div className="container-2">
          <div className="timer-container">
            <div className="timer-background">
              <h1 className="timer">{this.getTimeInSeconds()}</h1>
              <p>{!isPlayed ? 'Paused' : 'Running'}</p>
            </div>
          </div>

          <div className="start-stop-reset">
            <div className="start-reset">
              <button
                type="button"
                onClick={this.startTimer}
                className="start-pause"
              >
                <img
                  src={imgUrl}
                  alt={!isPlayed ? 'play icon' : 'pause icon'}
                  className="start-pause-reset"
                />
                <p>{!isPlayed ? 'Start' : 'Pause'}</p>
              </button>

              <button
                type="button"
                onClick={this.resetTimer}
                className="start-pause"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="start-pause-reset"
                />
                <p>Reset</p>
              </button>
            </div>
            <div>
              <p>Set Timer limit </p>
              <div className="reset-container">
                <button
                  type="button"
                  onClick={this.negative}
                  className="start-pause math"
                >
                  -
                </button>
                <div className="value-bg">
                  <p className="value">{min}</p>
                </div>
                <button
                  type="button"
                  onClick={this.positive}
                  className="start-pause math"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
