'use strict'

function renderGallery() {

    const imgs = getImgs()
    console.log(imgs)
    const strImgsHTMLs = imgs.map(img => {
        return `<img id=${img.id} src="${img.url}" keywords="${img.keywords}"        onclick="onImgSelect(${img.id}, this)"></img>`
    })


    const elGallery = document.querySelector('.memes-gallery')
    elGallery.innerHTML = strImgsHTMLs
}


// var gImgs = [
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



// function renderGallery() {
//     const strImgsHTML = `
//     <img src="meme-imgs-square/${1}.jpg" keywords="politics" onclick="onImgSelect(this)">
//     <img id="2" src="meme-imgs-square/${2}.jpg" keywords="animals" onclick="onImgSelect(this)">
//     `
//     const elGallery = document.querySelector('.memes-gallery')
//     elGallery.innerHTML = strImgsHTML
// }