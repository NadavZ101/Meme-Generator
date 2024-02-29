'use strict'

let gElCanvas
let gCtx

let gTextPos = [
    { lineIdx: 1, x: 50, y: 20 },
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
    hideGallery()
    showEditor()
    const meme = getMeme(selectedImg)

    const elImg = new Image
    elImg.src = setImg(meme)
    renderMeme(elImg)
}

function onMemeTxt(text) {
    const memeLineIdx = onGetElMemeLineIdx()

    const meme = setLineTxt(text, memeLineIdx)

    renderCanvasTxt(meme, memeLineIdx)
}

function onTxtColor(color) {
    const memeLineIdx = onGetElMemeLineIdx()
    const meme = setTxtColor(color, memeLineIdx)

    gCtx.strokeStyle = meme.lines[memeLineIdx].color
    renderCanvasTxt(meme, memeLineIdx)
}

function onChangeFontSize(dir) {
    const memeLineIdx = onGetElMemeLineIdx()

    let fontSize = gCtx.font
    console.log(fontSize)
    const meme = changeFontSize(fontSize, dir, memeLineIdx)
    console.log(meme)

    console.log(gCtx)

    gCtx.font = meme.lines[memeLineIdx].size
    renderCanvasTxt(meme, memeLineIdx)

}

function onAddLine() {
    updateGTextPos()
    const elMemeId = +document.querySelector('img').id
    let meme = getMeme(elMemeId)

    meme = addNewLine(meme)
}

function onSwitchLine() {
    const elMemeId = +document.querySelector('img').id
    let meme = getMeme(elMemeId)
    switchLine(meme)
    console.log('meme after switching line = ', meme)
}

function drawFrame(memeTxt) {
    const memeLineIdx = onGetElMemeLineIdx()

    const txtWidth = gCtx.measureText(memeTxt).width;
    const txtHeight = parseInt(gCtx.font)

    const frameWidth = txtWidth + 10;
    const frameHeight = txtHeight + 10;

    gCtx.beginPath()
    gCtx.rect(gTextPos[memeLineIdx].x + 20, gTextPos[memeLineIdx].y + 20, frameWidth, frameHeight);
    gCtx.stroke()
    gCtx.closePath()
}

function updateGTextPos() {
    let lastIdx = gTextPos.length - 1
    let newLinePos = { lineIdx: gTextPos[lastIdx].lineIdx + 1, x: gTextPos[lastIdx].x + 20, y: gTextPos[lastIdx].y + 20 }

    gTextPos.push(newLinePos)
    console.log(gTextPos)
}

function renderCanvasTxt(meme, memeLineIdx) {

    gCtx.beginPath()
    gCtx.fillText(meme.lines[memeLineIdx].txt, gTextPos[memeLineIdx].x, gTextPos[memeLineIdx].y)
    gCtx.strokeText(meme.lines[memeLineIdx].txt, gTextPos[memeLineIdx].x, gTextPos[memeLineIdx].y)
    gCtx.closePath()
}

function onGetElMeme() {
    const elMemeId = +document.querySelector('img').id
    let elMeme = getMeme(elMemeId)
    return elMeme
}

function onGetElMemeLineIdx() {
    const elMemeId = +document.querySelector('img').id
    let elMeme = getMeme(elMemeId)

    const memeLineIdx = elMeme.selectedLineIdx
    return memeLineIdx
}

function clearInput() {

    const elMemeTxt = document.querySelector('.txt-input')
    elMemeTxt.value = ''
}

function downloadMeme(elLink) {
    const meme = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = meme
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    console.log(gCtx)

    //update the model to the default
    // gCtx.lineWidth = 1
    gCtx.strokeStyle = '#black'
    gCtx.fillStyle = 'white'
    gCtx.font = '16px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);

    // gCtx.imageSmoothingEnabled = false;
    // gCtx.webkitImageSmoothingEnabled = false;
    // gCtx.mozImageSmoothingEnabled = false;
    // console.log(gCtx)

}

function hideGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
}

function showEditor() {
    const elMemeEditor = document.querySelector('.meme-container')
    elMemeEditor.style.display = 'flex'
    elMemeEditor.style.flexWarp = 'wrap'
    elMemeEditor.style.justifyContent = 'center'
    elMemeEditor.style.alignItems = 'center'
}

function toggleHidden(ev) {
    const elMemeEditor = document.querySelector('.meme-container')
    const elGallery = document.querySelector('.gallery')
    const elAbout = document.querySelector('.about')

    if (ev.classList.value === 'gallery-btn btn') {
        elGallery.style.display = 'block'

        elMemeEditor.style.display = 'none'
        elAbout.style.display = 'none'

    }

    if (ev.classList.value === 'editor-btn btn') {
        hideGallery()
        showEditor()
        elAbout.style.display = 'none'

    }

    if (ev.classList.value === 'about-btn btn') {
        hideGallery()
        elMemeEditor.style.display = 'none'
        elAbout.style.display = 'block'
    }
}





