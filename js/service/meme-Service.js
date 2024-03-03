'use strict'

var imgNum = 18
var gImgs = []
_createImgs(imgNum)

var gSelectedImgIdx = 0

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Enter A Text',
            size: 20,
            color: 'white',
            isDrag: false,
        }
    ]
}

var gKeywords = ['politics', 'funny', 'sarcastic', 'crazy', 'animal', 'cute', 'kids', 'movies']

function getMeme() {
    return gMeme
}

function getImg() {
    return gImgs[gSelectedImgIdx].url
}

function getKeywords() {
    return gKeywords
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

function deleteLine(selectedLine) {
    gMeme.lines.splice(selectedLine, 1)

    gMeme.selectedLineIdx = gMeme.lines.length - 1

    return gMeme.selectedLineIdx
}

function changeToClickedLine(clickedLine) {
    gMeme.selectedLineIdx = clickedLine
}

function setFilterBy(elKeyword) {
    return gImgs.filter(img => img.keywords.includes(elKeyword))
}

function loadGallery() {
    // _createImgs(imgNum)
    return gImgs
}

function getResetMemeLines() {
    while (gMeme.lines.length > 0) {
        gMeme.lines.splice(gMeme.lines.length - 1, 1)
    }

    gMeme.lines[0] = {
        txt: 'Enter A Text',
        size: 20,
        color: 'white'
    }
    gMeme.selectedLineIdx = 0
}

function setLineDrag(drag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = drag
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]


        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
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

gImgs = [
    { id: 1, url: 'meme-imgs-square/1.jpg', keywords: ['politics', 'funny'] },
    { id: 2, url: 'meme-imgs-square/2.jpg', keywords: ['animal', 'cute'] },
    { id: 3, url: 'meme-imgs-square/3.jpg', keywords: ['animal', 'cute', 'kids'] },
    { id: 4, url: 'meme-imgs-square/4.jpg', keywords: ['animal', 'cute'] },
    { id: 5, url: 'meme-imgs-square/5.jpg', keywords: ['funny', 'cute', 'kids'] },
    { id: 6, url: 'meme-imgs-square/6.jpg', keywords: ['funny', 'sarcastic'] },
    { id: 7, url: 'meme-imgs-square/7.jpg', keywords: ['funny', 'cute', 'kids'] },
    { id: 8, url: 'meme-imgs-square/8.jpg', keywords: ['funny', 'crazy'] },
    { id: 9, url: 'meme-imgs-square/9.jpg', keywords: ['funny', 'kids'] },
    { id: 10, url: 'meme-imgs-square/10.jpg', keywords: ['politics'] },
    { id: 11, url: 'meme-imgs-square/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'meme-imgs-square/12.jpg', keywords: ['funny', 'sarcastic'] },
    { id: 13, url: 'meme-imgs-square/13.jpg', keywords: ['funny', 'sarcastic'] },
    { id: 14, url: 'meme-imgs-square/14.jpg', keywords: ['funny', 'sarcastic', 'movies'] },
    { id: 15, url: 'meme-imgs-square/15.jpg', keywords: ['funny', 'sarcastic', 'movies'] },
    { id: 16, url: 'meme-imgs-square/16.jpg', keywords: ['funny', 'movies'] },
    { id: 17, url: 'meme-imgs-square/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'meme-imgs-square/18.jpg', keywords: ['funny', 'movies'] },
]


