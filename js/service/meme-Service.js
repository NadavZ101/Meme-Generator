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

function getMeme() {
    return gMeme
}

function getMemeImg(imgId) {
    return gImgs.find(img => img.id === imgId).url
}

function setLineTxt(text) {
    gMeme.lines[0].txt = text  //with multi lines use forEach
    console.log(gMeme.lines[0].txt)
    return (getMeme())
}

