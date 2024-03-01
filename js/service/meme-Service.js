'use strict'

let imgNum = 18
let gImgs = []
_createImgs(imgNum)

let gSelectedImgIdx = 0

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter A Text',
            size: 20,
            color: 'green'
        }
    ]
}

var gKeywords = ['politics', 'funny', 'sarcastic', 'crazy', 'animals']

function getMeme() {
    return gMeme
}

function getImg() {
    return gImgs[gSelectedImgIdx].url
}

function setLineTxt(text, idx) {
    gMeme.lines[idx].txt = text
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gSelectedImgIdx = gImgs.findIndex(img => img.id === imgId)
}

function setTxtColor(color, idx) {
    gMeme.lines[idx].color = color
}

function changeFontSize(dir, idx) {
    if (dir === 'increase') {
        gMeme.lines[idx].size += 1
    }
    if (dir === 'decrease' && gMeme.lines[0].size > 0) {
        gMeme.lines[idx].size -= 1
    }
    if (gMeme.lines[idx].size === 0) return
}

function addNewLine() {

    gMeme.lines.push({
        txt: '',
        size: 20,
        color: ''
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1
    return gMeme.selectedLineIdx
}

function switchLine() {
    if (gMeme.selectedLineIdx !== gMeme.lines.length - 1) {
        gMeme.selectedLineIdx += 1

    }
    else {
        gMeme.selectedLineIdx = 0
    }
    return gMeme.selectedLineIdx
}

function changeToClickedLine(clickedLine) {
    console.log('changeToClickedLine = ', clickedLine)

    gMeme.selectedLineIdx = clickedLine
    console.log('clickedLine ---> ', gMeme)
}

function loadGallery() {
    _createImgs(imgNum)
    return gImgs
}

function _createImgs(imgNum) {
    gImgs = []
    for (let i = 0; i < imgNum; i++) {
        gImgs.push(
            _createImg(
                i + 1,
                `meme-imgs-square/${i + 1}.jpg`,
                ['politics', 'funny', 'sarcastic', 'crazy', 'animals']
            )
        )
    }
    return gImgs
}

function _createImg(id, url, keywords) {
    return {
        id,
        url,
        keywords,
    }
}

