'use strict'

let gElCanvas
let gCtx

let gLinesPos = [
    { lineIdx: 1, x: 10, y: 20 },
]

let gCurrLine = 0


function onInit() {
    setCanvas()
    renderGallery()
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const memeImg = getImg()


    const elImg = new Image
    elImg.src = memeImg

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTxt(meme)
    }

}

function drawTxt(meme) {
    console.log(meme)
    const memeLines = meme.lines
    console.log(memeLines)

    memeLines.forEach((line, idx) => {
        gCtx.lineWidth = 1
        gCtx.strokeStyle = line.color || 'green'
        gCtx.fillStyle = 'lightgrey'
        gCtx.font = `${line.size}px Impact` || '20px Impact'
        gCtx.textBaseline = 'middle'
        gCtx.textAlign = 'left'

        const linePos = gLinesPos[idx]

        gCtx.fillText(line.txt, linePos.x, linePos.y)
        gCtx.strokeText(line.txt, linePos.x, linePos.y)
    })
}

function onMemeTxt(text) {
    console.log('memeTxt currLine = ', gCurrLine)
    setLineTxt(text, gCurrLine)
    renderMeme()
}

function onTxtColor(color) {
    setTxtColor(color, gCurrLine)
    renderMeme()
}

function onChangeFontSize(dir) {
    console.log(dir)
    changeFontSize(dir, gCurrLine)
    renderMeme()
}

function onAddLine() {
    updateGLinesPos()
    gCurrLine = addNewLine()
    renderMeme()
}

function updateGLinesPos() {
    let lastIdx = gLinesPos.length - 1
    let newLinePos = { lineIdx: gLinesPos[lastIdx].lineIdx + 1, x: gLinesPos[lastIdx].x + 20, y: gLinesPos[lastIdx].y + 20 }

    gLinesPos.push(newLinePos)
}

function onSwitchLine() {
    gCurrLine = switchLine()
    renderMeme()
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

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
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





