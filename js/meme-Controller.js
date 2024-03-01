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
        gCtx.lineWidth = 0.5
        gCtx.strokeStyle = line.color || 'white'
        gCtx.fillStyle = 'lightgrey'
        gCtx.font = `${line.size}px Impact` || '20px Impact'
        gCtx.textBaseline = 'middle'
        gCtx.textAlign = 'left'

        const linePos = gLinesPos[idx]

        gCtx.fillText(line.txt, linePos.x, linePos.y)
        gCtx.strokeText(line.txt, linePos.x, linePos.y)

        // Frame
        if (meme.selectedLineIdx === idx) {
            const txtWidth = gCtx.measureText(line.txt).width;
            const txtHeight = parseInt(gCtx.font)

            const frameWidth = txtWidth + 15;
            const frameHeight = txtHeight + 15;

            gCtx.beginPath()
            gCtx.rect(linePos.x - 10, linePos.y - 15, frameWidth, frameHeight);
            gCtx.stroke()
            gCtx.closePath()
        }

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
    let newLinePos = { lineIdx: gLinesPos[lastIdx].lineIdx + 1, x: gLinesPos[lastIdx].x + 40, y: gLinesPos[lastIdx].y + 40 }

    gLinesPos.push(newLinePos)
}

function onSwitchLine() {
    gCurrLine = switchLine()
    renderMeme()
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





