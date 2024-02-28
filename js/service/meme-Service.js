'use strict'

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
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: null,
            color: ''
        }
    ]
}

var gKeywords = ['politics', 'funny', 'sarcastic', 'crazy', 'animals']

var imgNum = 18

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function getMemeImg(imgId) {
    console.log(imgId)
    return gImgs.find(img => img.id === imgId).url
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text  //with multi lines use forEach
    console.log(gMeme.lines[0].txt)
    return (getMeme())
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

