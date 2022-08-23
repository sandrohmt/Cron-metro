const stopWatch = document.querySelector('#stopwatch')
const btnStart = document.querySelector('#start')
const btnStop = document.querySelector('#stop')
const btnRestart = document.querySelector('#restart')
const listTimesHTML = document.querySelector('#listTimes')
const btnAddTime = document.querySelector('#addTime')
const btnCleanTimes = document.querySelector('#cleanTimes')
const btnRemoveTime = document.querySelector('.removeTime')

let listTimes = []
let objectTime
var interval

let seconds = 0
let minutes = 0
let hour = 0

const localStorageTimes = JSON.parse(localStorage.getItem('times'))

let times = localStorage.getItem('times') !== null ? localStorageTimes : []

function twoDigits(digit) {
  if (digit < 10) {
    return `0${digit}`
  } else {
    return digit
  }
}

function updateTimes() {
  listTimesHTML.innerHTML = `<ul id='listTimesHTML'>Meus tempos</ul>`
  times.map((time, index) => {
    objectTime = {
      id: index,
      record: `${twoDigits(time[0])}:${twoDigits(time[1])}:${twoDigits(
        time[2]
      )}`
    }

    listTimesHTML.innerHTML += `<li class='time'> ${objectTime.record} <button onClick="removeTime(${objectTime.id})" class='removeTime'>x</button> </li>`
  })
  updateLocalStorage()
}

function sortTimes() {
  times = listTimes.sort(function (a, b) {
    if (a[0] * 3600 + a[1] * 60 + a[2] > b[0] * 3600 + b[1] * 60 + b[2])
      return 1
    if (a[0] * 3600 + a[1] * 60 + a[2] < b[0] * 3600 + b[1] * 60 + b[2])
      return -1
    return 0
  })
}

function removeTime(id) {
  times.forEach((item, index) => {
    if (index === id) {
      times.splice(index, 1)
    }
  })
  updateTimes()
}

function startStopWatch() {
  interval = setInterval(function () {
    seconds++
    stopWatch.innerHTML = `${twoDigits(hour)}:${twoDigits(minutes)}:${twoDigits(
      seconds
    )}`
    if (seconds === 60) {
      minutes++
      seconds = 0
    }

    if (minutes === 60) {
      hour++
      minutes = 0
    }
  }, 1000)
  btnStart.disabled = true
}

function updateLocalStorage() {
  localStorage.setItem('times', JSON.stringify(times))
}

function stopTime() {
  clearInterval(interval)
  btnStart.disabled = false
}

function restartTime() {
  seconds = 0
  minutes = 0
  hour = 0
  stopWatch.innerHTML = `${twoDigits(hour)}:${twoDigits(minutes)}:${twoDigits(
    seconds
  )}`
  clearInterval(interval)
  btnStart.disabled = false
}

function addTime() {
  times.push([hour, minutes, seconds])
  sortTimes()
  updateTimes()
}

function removeAllTimes() {
  listTimesHTML.innerHTML = `<ul id='listTimesHTML'>Meus tempos</ul>`
  times = []
  updateLocalStorage()
}
stopWatch.innerHTML = `${twoDigits(hour)}:${twoDigits(minutes)}:${twoDigits(
  seconds
)}`

btnStart.addEventListener('click', startStopWatch)
btnStop.addEventListener('click', stopTime)
btnRestart.addEventListener('click', restartTime)
btnAddTime.addEventListener('click', addTime)
btnCleanTimes.addEventListener('click', removeAllTimes)

updateLocalStorage()
updateTimes()

