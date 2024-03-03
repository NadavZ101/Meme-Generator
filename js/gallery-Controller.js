'use strict'

var gIsFiltered = false
var gFilteredImgs = []

// function renderSearchList() {
//     const keywords = getKeywords()
//     const strMemeListHTMLs = keywords.map(keyword => {
//         return ` <option value=${keyword}></option>`
//     })
//     const elMemeTypes = document.querySelector('.dropdown')
//     elMemeTypes.innerHTML = strMemeListHTMLs.join('')
// }

function renderGallery() {
    if (gFilteredImgs.length === 0) {
        var imgs = loadGallery()
    } else {
        imgs = gFilteredImgs
    }

    const strImgsHTMLs = imgs.map(img => {
        return `<img id=${img.id} src="${img.url}" keywords="${img.keywords}"        onclick="onImgSelect(${img.id}, this)"></img>`
    })

    const elGallery = document.querySelector('.memes-gallery')
    elGallery.innerHTML = strImgsHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    hideGallery()
    showEditor()
}

function onSearchMeme(keyword) {
    console.log(keyword)
    gFilteredImgs = setFilterBy(keyword)
    renderGallery()
}

