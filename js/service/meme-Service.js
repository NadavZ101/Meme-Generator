'use strict'

// var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat']}]

var gImgs = [
    {
        id: 1,
        url: 'meme-imgs-square/1.jpg',
        keywords: ['politics, funny']
    },
    {
        id: 2,
        url: 'meme-imgs-square/2.jpg',
        keywords: ['politics, funny']
    }
]

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
var imgNum = 18

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
    gMeme.lines[idx].txt = text  //with multi lines use forEach
    // console.log(gMeme.lines[0].txt)
    console.log('gMeme-service = ', gMeme)
    return gMeme
}
// // ------ ONE LINE - WORKS ---------------- //
// function setLineTxt(text) {
//     gMeme.lines[0].txt = text  //with multi lines use forEach
//     // console.log(gMeme.lines[0].txt)
//     console.log('gMeme-service = ', gMeme)
//     return gMeme
// }

function addNewLine(meme) {
    console.log('addNewLine-service ---> meme from DOM = ', meme)
    gMeme = meme
    console.log('addNewLine -> gMeme = ', gMeme)

    gMeme.lines.push({
        txt: '',
        size: '',
        color: ''
    })

    gMeme.selectedLineIdx = gMeme.lines.length - 1
    console.log(gMeme.selectedLineIdx)

    return gMeme
}

function setTxtColor(color) {
    console.log(color)

    gMeme.lines[0].color = color
    console.log('gMeme-service = ', gMeme)

    return gMeme
}

function changeFontSize(size, dir) {
    const fontSize = size.split(' ')

    let newSize = parseInt(fontSize[0])
    if (dir === 'increase') newSize += 1
    if (dir === 'decrease' && newSize > 1) newSize -= 1

    fontSize[0] = newSize + 'px'

    gMeme.lines[0].size = fontSize.join(' ')
    return gMeme
}

// function loadGallery() {
//     gImgs.forEach()
// }


// function _createImgs(imgNum) {
//     const gImgs = []
//     for (let i = 0; i < imgNum; i++) {
//         gImgs.push(
//             _createImg(
//                 id = i + 1,
//                 url = `meme-imgs-square/${i + 1}.jpg`,
//                 keywords = getRandomIntInclusive[0, gKeywords.length]
//             )
//         )
//     }
//     return gImgs
// }

// function _createImg(id, url, keywords) {
//     return {
//         id,
//         url,
//         keywords,
//     }
// }

