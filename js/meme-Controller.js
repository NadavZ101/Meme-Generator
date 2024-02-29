'use strict'

let gElCanvas
let gCtx
// let gTextPos = { x: 50, y: 20 } // maybe use reduce to move to the next pos
let gTextPos = [
    { x: 50, y: 20 },
]


function onInit() {
    setCanvas()
    renderGallery()

}

function renderMeme(memeImg) {
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
    const elMemeId = +document.querySelector('img').id
    let elMeme = getMeme(elMemeId)
    // console.log('onMemeTxt -> meme from DOM = ', elMeme)
    const memeIdx = elMeme.selectedLineIdx

    const meme = setLineTxt(text, memeIdx)
    // Add IDX
    console.log(meme)

    renderCanvasTxt(meme, memeIdx)
}

function onTxtColor(color) {
    const meme = setTxtColor(color)
    // Add IDX
    gCtx.strokeStyle = meme.lines[0].color
    renderCanvasTxt(meme)
}

function onChangeFontSize(dir) {
    // Add Idx
    let fontSize = gCtx.font

    const meme = changeFontSize(fontSize, dir)
    gCtx.font = meme.lines[0].size
    renderCanvasTxt(meme)
}

function onAddLine() {
    updateGTextPos()
    const elMemeId = +document.querySelector('img').id

    let meme = getMeme(elMemeId)
    console.log('onAddLine -> meme from DOM = ', meme)

    meme = addNewLine(meme)
    console.log('onAddLine -> meme from service = ', meme)
    // console.log(gTextPos)
    // onMemeTxt(text)
    // console.log(gTextPos)

}

function updateGTextPos() {
    let lastIdx = gTextPos.length - 1
    let newLinePos = { x: gTextPos[lastIdx].x + 15, y: gTextPos[lastIdx].y + 15 }

    gTextPos.push(newLinePos)
}

function renderCanvasTxt(meme, memeIdx) {
    //render gTextPos with a forEach Loop
    gCtx.fillText(meme.lines[memeIdx].txt, gTextPos[gTextPos.length - 1].x, gTextPos[gTextPos.length - 1].y)
    gCtx.strokeText(meme.lines[memeIdx].txt, gTextPos[gTextPos.length - 1].x, gTextPos[gTextPos.length - 1].y)
}

// function renderCanvasTxt(meme) {
//     gCtx.fillText(meme.lines[0].txt, gTextPos.x, gTextPos.y)
//     gCtx.strokeText(meme.lines[0].txt, gTextPos.x, gTextPos.y)
// }

function downloadMeme(elLink) {
    const meme = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = meme
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    //update the model to the default
    gCtx.lineWidth = 1
    gCtx.strokeStyle = '#black'
    gCtx.fillStyle = 'white'
    gCtx.font = '16px Impact'
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





