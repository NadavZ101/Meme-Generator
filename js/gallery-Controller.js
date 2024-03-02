'use strict'

function renderGallery() {

    const imgs = loadGallery()
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

