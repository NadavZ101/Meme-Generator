'use strict'

// var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]
var imgNum = 18
var gImgs = []
//     {
//         id: 1,
//         url: 'meme-imgs-square/1.jpg',
//         keywords: ['politics, funny']
//     },
//     {
//         id: 2,
//         url: 'meme-imgs-square/2.jpg',
//         keywords: ['politics, funny']
//     }
// ]
_createImgs(imgNum)

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: '',
            color: ''
        }
    ]
}

var gKeywords = ['politics', 'funny', 'sarcastic', 'crazy', 'animals']

function getMeme(imgId) {
    gMeme.selectedImgId = gImgs.find(img => img.id === imgId).id
    return gMeme
}

function getImgs() {
    return gImgs
}

function setImg(meme) {
    return gImgs.find(img => img.id === meme.selectedImgId).url
}

function setLineTxt(text, idx) {
    gMeme.lines[idx].txt = text
    // console.log('gMeme-service = ', gMeme)
    return gMeme
}


function addNewLine(meme) {
    // console.log('addNewLine-service ---> meme from DOM = ', meme)
    gMeme = meme
    // console.log('addNewLine -> gMeme = ', gMeme)

    gMeme.lines.push({
        txt: '',
        size: '',
        color: ''
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1
    console.log(gMeme.selectedLineIdx)

    return gMeme
}

function setTxtColor(color, idx) {

    gMeme.lines[idx].color = color
    console.log('gMeme-service = ', gMeme)

    return gMeme
}

function changeFontSize(size, dir, idx) {
    console.log('idx = ', idx)
    const fontSize = size.split(' ')

    let newSize = parseInt(fontSize[0])
    if (dir === 'increase') newSize += 1
    if (dir === 'decrease' && newSize > 1) newSize -= 1

    fontSize[0] = newSize + 'px'

    gMeme.lines[idx].size = fontSize.join(' ')
    console.log(gMeme.lines[idx].size)
    return gMeme
}

function switchLine(meme) {
    gMeme = meme

    if (
        gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
    else {
        gMeme.selectedLineIdx += 1
    }
    return gMeme
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

