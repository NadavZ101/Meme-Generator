'use strict'

let gElCanvas
let gCtx
let gTextStartPoss = { x: 70, y: 50 } // maybe use reduce to move to the next pos


function onInit() {
    setCanvas()
    renderGallery()

}

function renderMeme(memeImg) {
    console.log(memeImg)
    memeImg.onload = () =>
        gCtx.drawImage(memeImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onImgSelect(selectedImg) {
    const meme = getMeme(selectedImg)

    const elImg = new Image
    elImg.src = setImg(meme)

    renderMeme(elImg)
}


function onMemeTxt(text) {
    const meme = setLineTxt(text)

    //  ---------- Move it to separeted function ---------------- //


    renderCanvasTxt(meme)
}

function onTxtColor(color) {
    const meme = setTxtColor(color)
    console.log(meme)
    gCtx.strokeStyle = meme.lines[0].color
    renderCanvasTxt(meme)
}

function onIncreaseFont() {
    let fontSize = gCtx.font

    const meme = enlargeFontSize(fontSize)
    gCtx.font = meme.lines[0].size
    renderCanvasTxt(meme)
}

function renderCanvasTxt(meme) {
    gCtx.fillText(meme.lines[0].txt, gTextStartPoss.x, gTextStartPoss.y)
    gCtx.strokeText(meme.lines[0].txt, gTextStartPoss.x, gTextStartPoss.y)
}

function downloadMeme(elLink) {
    const meme = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = meme
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gCtx.lineWidth = 2
    gCtx.strokeStyle = '#e66465'
    gCtx.fillStyle = 'lightsteelblue'
    gCtx.font = '16px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    console.log(gCtx)

}

// function toggleHidden(ev) {
//     console.log(ev.classList.value)
//     const elMemeEditor = document.querySelector('.meme-flex-container')
//     const elGallery = document.querySelector('.gallery')
//     const elAbout = document.querySelector('.about')


//     if (ev.classList.value === 'gallery-btn btn') {
//         elMemeEditor.classList.remove('meme-flex-container')
//         elGallery.classList.add('gallery')
//         // elAbout.style.display = 'none'

//     }

//     if (ev.classList.value === 'editor-btn btn') {
//         elMemeEditor.classList.add('meme-flex-container')
//         elGallery.classList.remove('gallery')
//         renderMeme()
//         // elAbout.style.display = 'none'
//     }

//     if (ev.classList.value === 'about-btn btn') {
//         elAbout.style.display = 'flex'
//         elMemeEditor.style.display = 'none'
//         elGallery.style.display = 'none'
//     }

// }





