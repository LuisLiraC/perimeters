// Calculadora
const $calcLatButton = document.querySelector('#calcLatButton')
const $calcLngButton = document.querySelector('#calcLngButton')

$calcLatButton.addEventListener('click', () => {
  let latDegrees = parseInt(document.getElementById('degreesLat').value)
  let latMinutes = parseInt(document.getElementById('minutesLat').value)
  let latSeconds = parseInt(document.getElementById('secondsLat').value)
  let direction
  let options = document.getElementsByName('calcLat')
  options.forEach(option => {
    option.checked ? direction = parseInt(option.value) : ''
  })
  document.getElementById('latDecimals').value = calcDecimals(latDegrees, latMinutes, latSeconds, direction)
})

$calcLngButton.addEventListener('click', () => {
  let lngDegrees = parseInt(document.getElementById('degreesLng').value)
  let lngMinutes = parseInt(document.getElementById('minutesLng').value)
  let lngSeconds = parseInt(document.getElementById('secondsLng').value)
  let direction
  let options = document.getElementsByName('calcLng')
  options.forEach(option => {
    option.checked ? direction = parseInt(option.value) : ''
  })
  document.getElementById('lngDecimals').value = calcDecimals(lngDegrees, lngMinutes, lngSeconds, direction)
})


function calcDecimals(degrees, minutes, seconds, direction) {
  result = (degrees + (minutes / 60) + (seconds / 3600)) * direction
  return result
}