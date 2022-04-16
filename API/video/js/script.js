const media = document.querySelector('video'),
      controls = document.querySelector('.controls'),
      play = document.querySelector('.play'),
      stop = document.querySelector('.stop'),
      rwd = document.querySelector('.rwd'),
      fwd = document.querySelector('.fwd'),
      timerWrapper = document.querySelector('.timer'),
      timer = document.querySelector('.timer span'),
      timerBar = document.querySelector('.timer div')



media.removeAttribute('controls')
controls.style.visibility = 'visible'
play.addEventListener('click', playPauseMedia)
stop.addEventListener('click', stopMedia)
media.addEventListener('ended', stopMedia)
rwd.addEventListener('click', mediaBackward)
fwd.addEventListener('click', mediaForward)
media.addEventListener('timeupdate', setTime)



function playPauseMedia() {
    rwd.classList.remove('active')
    fwd.classList.remove('active')
    clearInterval(intervalRwd)
    clearInterval(intervalFwd)
    if (media.paused) {
        play.setAttribute('data-icon', 'u')
        media.play()
    } else {
        play.setAttribute('data-icon', 'P')
        media.pause()
    }
}

function stopMedia() {
    rwd.classList.remove('active')
    fwd.classList.remove('active')
    clearInterval(intervalRwd)
    clearInterval(intervalFwd)
    media.pause()
    media.currentTime = 0
    play.setAttribute('data-icon', 'P')
}


let intervalFwd,
    intervalRwd
function mediaBackward() {
    clearInterval(intervalFwd)
    fwd.classList.remove('active')
    
    if(rwd.classList.contains('active')) {
        rwd.classList.remove('active')
        clearInterval(intervalRwd)
        media.play()
    } else {
        rwd.classList.add('active')
        media.pause()
        intervalRwd = setInterval(windBackward, 200)
    }
}
      

function mediaForward() {
    clearInterval(intervalRwd)
    rwd.classList.remove('active')
    
    if(fwd.classList.contains('active')) {
        fwd.classList.remove('active')
        clearInterval(intervalFwd)
        media.play()
    } else {
        fwd.classList.add('active')
        media.pause()
        intervalFwd = setInterval(windForward, 200)
    }
}
      

function windBackward() {
    if (media.currentTime <= 3) {
//        rwd.classList.remove('active');
//        clearInterval(intervalRwd)
        stopMedia()
    } else {
        media.currentTime -= 3
    }
}
      
function windForward() {
    if (media.currentTime >= media.duration - 3){
//        fwd.classList.remove('active')
//        clearInterval(intervalFwd)
        stopMedia()
    } else {
        media.currentTime += 3
    }
}


function setTime() {
    let minutes = Math.floor(media.currentTime / 60),
        seconds = Math.floor(media.currentTime - minutes * 60),
        minuteValue,
        secondValue
    
    if (minutes < 10) {
        minuteValue = '0' + minutes
    } else {
        minuteValue = minutes
    }
    
    if (seconds < 10) {
        secondValue = '0' + seconds
    } else {
        secondValue = seconds
    }
    
    let mediaTime = minuteValue + ':' + secondValue,
        barLength = timerWrapper.clientWidth * (media.currentTime/media.duration)
    timerBar.style.width = barLength + 'px'
    
}