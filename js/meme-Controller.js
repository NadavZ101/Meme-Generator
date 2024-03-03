'use strict'

var gElCanvas
var gCtx

var gLines = [
    { lineIdx: 0, x: 10, y: 20, width: 0, height: 0 },
]
var gLastLineIdx = 0

var gCurrLine = 0
var gIsDeleted = false
var gStartPos

const gCanvasCenter = 100

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    setCanvas()
    renderGallery()
    addListeners()
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
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color || 'white'
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

            gCtx.strokeStyle = 'white'

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
    console.log('onMouseClick = ', clickedLine)

    if (clickedLine) {
        gCurrLine = clickedLine.lineIdx
        changeToClickedLine(gCurrLine)
        renderMeme()
    }
}

function onMemeTxt(text) {
    setLineTxt(text, gCurrLine)
    renderMeme()
}

function onTxtColor(color) {
    setTxtColor(color, gCurrLine)
    renderMeme()
}

function onChangeFontSize(dir) {
    changeFontSize(dir, gCurrLine)
    renderMeme()
}

function onAlignLeft() {
    gLines[gCurrLine].x = 0
    renderMeme()
}

function onAlignCenter() {
    gLines[gCurrLine].x = gCanvasCenter
    renderMeme()
}

function onAlignRight() {
    gLines[gCurrLine].x = gCanvasCenter * 2
    renderMeme()
}

function onAddLine() {
    gCurrLine = addNewLine()
    updateGLinesPos()
    renderMeme()
}

function updateGLinesPos() {
    if (!gIsDeleted) {
        gLastLineIdx = gLines.length - 1
        let newLinePos = { lineIdx: gLines[gLastLineIdx].lineIdx + 1, x: gLines[gLastLineIdx].x + 40, y: gLines[gLastLineIdx].y + 40 }

        gLines.push(newLinePos)
    } else {
        gLines.splice(gCurrLine, 1)
        console.log(gLines)
        gIsDeleted = false
    }
}

function onSwitchLine() {
    gCurrLine = switchLine()
    renderMeme()
}

function onDeleteLine() {
    gIsDeleted = true
    gCurrLine = deleteLine(gCurrLine)
    updateGLinesPos()

    if (gCurrLine < 0) {
        gLastLineIdx = 0
        gCurrLine = 0
        gLines = [
            { lineIdx: 0, x: 10, y: 20, width: 0, height: 0 },
        ]
    }
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

function toggleHiddenSections(ev) {
    const elMemeEditor = document.querySelector('.meme-container')
    const elGallery = document.querySelector('.gallery')
    const elAbout = document.querySelector('.about')

    if (ev.classList.value === 'gallery-btn nv-btns btn') {
        elGallery.style.display = 'grid'
        elMemeEditor.style.display = 'none'
        elAbout.style.display = 'none'
        clearLines()
    }

    if (ev.classList.value === 'editor-btn nv-btns btn') {
        hideGallery()
        showEditor()
        elAbout.style.display = 'none'

    }

    if (ev.classList.value === 'about-btn nv-btns btn') {
        hideGallery()
        elMemeEditor.style.display = 'none'
        elAbout.style.display = 'flex'
        elAbout.style.justifyContent = 'center'
    }
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function clearLines() {
    getResetMemeLines()
    gCurrLine = 0
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => resizeCanvas())
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function isLineClick(pos) {
    const isClickedLine = gLines.find(line => {
        const { x, y, width, height } = line
        return pos.x >= x && pos.x <= x + width &&
            pos.y >= y && pos.y <= y + height
    })

    if (isClickedLine !== undefined) return true
    else return false

}

function onDown(ev) {
    gStartPos = getEvPos(ev)

    const isClick = isLineClick(gStartPos)

    if (!isClick) return
    console.log(isClick)

    console.log('made it here')
    setLineDrag(true)

    gElCanvas.style.cursor = 'grabbing'
}

function onMove(ev) {
    const meme = getMeme()
    const { isDrag } = meme.lines[meme.selectedLineIdx]
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos

    renderMeme()
}

function moveLine(dx, dy) {
    gLines[gCurrLine].x += dx
    gLines[gCurrLine].y += dy
}

function onUp() {
    setLineDrag(false)
    gElCanvas.style.cursor = 'auto'
}

function clearSearch() {
    const elSearchInput = document.querySelector('.search-meme').value = ''
    const elListSearch = document.querySelector('.memes-list').selectedIndex = -1
    gFilteredImgs = []
    renderGallery()
}


// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     console.log(elContainer.clientWidth)
//     gElCanvas.width = elContainer.clientWidth
// }















