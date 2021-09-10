const interface = document.querySelector('.interface'),
    musicImg = interface.querySelector('.cover img'),
    title = interface.querySelector('.title'),
    songInfo = interface.querySelector('.song-info'),
    musicName = interface.querySelector('.title .name'),
    musicArtist = interface.querySelector('.title .artist'),
    musicAudio = interface.querySelector('#main-audio'),
    playPauseBtn = interface.querySelector('.play_pause'),
    nextBtn = interface.querySelector('#next'),
    prevBtn = interface.querySelector('#prev'),
    progressBar = interface.querySelector('.track'),
    progressArea = interface.querySelector('.progress-area'),
    repeatBtn = interface.querySelector('.repeat-btn'),
    repeatIcon = interface.querySelector('.fa-redo-alt'),
    shuffleBtn = interface.querySelector('.shuffle-btn'),
    shuffleIcon = interface.querySelector('.fa-random'),
    list = interface.querySelector('.list'),
    volume = interface.querySelector('input[type=range]'),
    audio = interface.querySelector('audio')

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1)

window.addEventListener('load', () => {
    loadMusic(musicIndex)
    playingNow()
})

// Load music function
function loadMusic(indexNum) {
    musicName.innerText = allMusic[indexNum - 1].name
    musicArtist.innerText = allMusic[indexNum - 1].artist
    musicImg.src = `img/${allMusic[indexNum - 1].img}.jpg`
    musicAudio.src = `music/${allMusic[indexNum - 1].src}.m4a`
}

// Play music on click cover
musicImg.addEventListener('click', () => {
    const isMusicPaused = interface.classList.contains('paused')

    isMusicPaused ? pauseMusic() : playMusic()
    playingNow()
})

// Play music function
function playMusic() {
    interface.classList.add('paused')
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'
    musicAudio.play()
    musicImg.style.transform = 'scale(1)'
}

// Pause music function
function pauseMusic() {
    interface.classList.remove('paused')
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'
    musicAudio.pause()
    musicImg.style.transform = 'scale(0.8)'
}

// Next music function
function nextMusic() {
    musicIndex++
    if (musicIndex > allMusic.length) {
        musicIndex = 1
    }
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}

// Prev music function
function prevMusic() {
    musicIndex--
    if (musicIndex < 1) {
        musicIndex = allMusic.length
    }
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}

// Play or pause button event
playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = interface.classList.contains('paused')

    isMusicPaused ? pauseMusic() : playMusic()
    playingNow()
})

// Next music button event
nextBtn.addEventListener('click', () => {
    if (shuffleBtn.classList.contains('active')) {
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1)
        do {
            randIndex = Math.floor((Math.random() * allMusic.length) + 1)
        } while (musicIndex == randIndex)
        musicIndex = randIndex
        loadMusic(musicIndex)
        playMusic()
    } else {
        nextMusic()
    }
})

// Prev music button event
prevBtn.addEventListener('click', () => {
    prevMusic()
})

// Update progress bar width according to music current time
musicAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = interface.querySelector('.current-time'),
        musicDuration = interface.querySelector('.max-duration')

    musicAudio.addEventListener('loadeddata', () => {

        // Update music total duration
        let audioDuration = musicAudio.duration
        let totalMin = Math.floor(audioDuration / 60)
        let totalSec = Math.floor(audioDuration % 60)
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`

    })

    // Update music current time
    let currentMin = Math.floor(currentTime / 60)
    let currentSec = Math.floor(currentTime % 60)
    if (currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

//  Update playing music current time according to progress bar width
progressArea.addEventListener('click', (e) => {
    let progressWidthVal = progressArea.clientWidth
    let clicked = e.offsetX
    let songDuration = musicAudio.duration

    musicAudio.currentTime = (clicked / progressWidthVal) * songDuration
    playMusic()
})

// Volume input
volume.addEventListener('input', () => {
    const inpVal = volume.value
    audio.volume = inpVal / 100
})

// Repeat, shuffle abd loop button
repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active')
    repeatIcon.classList.toggle('active')
})

shuffleBtn.addEventListener('click', () => {
    shuffleBtn.classList.toggle('active')
    shuffleIcon.classList.toggle('active')
})

// After the music ended
musicAudio.addEventListener('ended', () => {
    if (repeatBtn.classList.contains('active')) {
        playMusic()
        musicAudio.currentTime = 0
        loadMusic(indexNum)
    } else {
        nextMusic()
    }

    if (shuffleBtn.classList.contains('active')) {
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1)
        do {
            randIndex = Math.floor((Math.random() * allMusic.length) + 1)
        } while (musicIndex == randIndex)
        musicIndex = randIndex
        loadMusic(musicIndex)
        playMusic()
        playingNow()
    } else {
        nextMusic()
    }
})

// Array length
for (let i = 0; i < allMusic.length; i++) {
    let listItem = `<li class="list-item" li-index="${i + 1}">
                        <img src="img/${allMusic[i].img}.jpg" alt="" />
                        <div class="list-text">
                            <p>${allMusic[i].name}</p>
                            <span class="playing"></span>
                            <span>${allMusic[i].artist}</span>
                        </div>
                        <audio id="${allMusic[i].src}" src="music/${allMusic[i].src}.m4a"></audio>
                    </li>`
    list.insertAdjacentHTML('beforeend', listItem)
}

// Play particular music on click
const allListItem = list.querySelectorAll('.list-item')
function playingNow() {
    for (let j = 0; j < allListItem.length; j++) {
        let audioTag = allListItem[j].querySelector('.playing')

        if (allListItem[j].classList.contains('playing')) {
            allListItem[j].classList.remove('playing')
            audioTag.innerHTML = ''
        }

        if (allListItem[j].getAttribute('li-index') == musicIndex) {
            allListItem[j].classList.add('playing')
            audioTag.innerHTML = '<i class="fas fa-play"></i>'
        }
        allListItem[j].setAttribute('onclick', 'clicked(this)')
    }

}
// Play music on li click
function clicked(element) {
    let getListIndex = element.getAttribute('li-index')
    musicIndex = getListIndex
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}

// // Menu button
// ellipsIcon.addEventListener('click', () => {
//     interface.classList.add('filter')
//     menuList.style.display = 'block'
// })  

// const cancelBtn = document.querySelector('.cancel')
// const menuList = document.querySelector('.menu-list')
// const speedUp = document.querySelectorAll('.speed')

// cancelBtn.addEventListener('click', () => {
//     interface.classList.remove('filter')
//     menuList.style.display = 'none'
// }) 
// lyricsIcon.addEventListener('click', () => {
//     // lyrics.classList.toggle('active')
//     musicImg.classList.toggle('lyrics-img')
    
//     if (musicImg.classList.contains('lyrics-img')) {
//         songInfo.style.display = 'flex'
//         musicName.style.fontSize = '15px'
//         musicArtist.style.fontSize = '15px'
//         lyrics.innerHTML = `<p>${allMusic[i].lyric}</p>`
//     } else {
//         songInfo.style.display = 'block'
//         musicName.style.fontSize = '25px'
//         musicArtist.style.fontSize = '25px'
//     }
// })
