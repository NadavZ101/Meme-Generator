'use strict'

let gElCanvas
let gCtx

let gLines = [
    { lineIdx: 0, x: 10, y: 20, width: 0, height: 0 },
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
    const memeLines = meme.lines

    memeLines.forEach((line, idx) => {
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'white'
        gCtx.fillStyle = line.color || 'green'
        gCtx.font = `${line.size}px Impact` || '20px Impact'
        gCtx.textBaseline = 'middle'
        gCtx.textAlign = 'left'

        const linePos = gLines[idx]

        const txtWidth = gCtx.measureText(line.txt).width
        const txtHeight = parseInt(gCtx.font)

        const centerY = linePos.y + txtHeight / 2

        gCtx.fillText(line.txt, linePos.x, centerY)
        gCtx.strokeText(line.txt, linePos.x, centerY)



        gLines[idx].width = txtWidth
        gLines[idx].height = txtHeight

        // Frame
        if (meme.selectedLineIdx === idx) {

            const framePadding = 5
            const frameWidth = txtWidth + 2 * framePadding
            const frameHeight = txtHeight + 2 * framePadding

            gCtx.beginPath()
            gCtx.rect(linePos.x - framePadding, linePos.y - framePadding, frameWidth, frameHeight)
            gCtx.stroke()
            gCtx.closePath()
        }
    })
}

function onMouseClick(ev) {
    const { offsetX, offsetY } = ev
    const clickedLine = gLines.find(line => {
        const { x, y, width, height } = line
        return offsetX >= x && offsetX <= x + width &&
            offsetY >= y && offsetY <= y + height
    })

    if (clickedLine) {
        gCurrLine = clickedLine.lineIdx
        console.log('on mouse click = ', gCurrLine)
        changeToClickedLine(gCurrLine)
        renderMeme()
    }

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
    let lastIdx = gLines.length - 1
    let newLinePos = { lineIdx: gLines[lastIdx].lineIdx + 1, x: gLines[lastIdx].x + 40, y: gLines[lastIdx].y + 40 }

    gLines.push(newLinePos)
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





