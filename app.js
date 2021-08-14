const character = document.getElementById('character')
const game = document.getElementById('game')
var both = 0
let interval
let blocks
let counter = 0
const currentBlocks = []

function moveLeft () {
  const left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
  if (left > 0) {
    character.style.left = left - 2 + 'px'
  }
}

function moveRight () {
  const left = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
  if (left < 380) {
    character.style.left = left + 2 + 'px'
  }
}

document.addEventListener('keydown', e => {
  if (both === 0) {
    both++
    if (e.key === 'ArrowLeft') {
      interval = setInterval(moveLeft, 1)
    }
    if (e.key === 'ArrowRight') {
      interval = setInterval(moveRight, 1)
    }
  }
})

document.addEventListener('keyup', e => {
  clearInterval(interval)
  both = 0
})

blocks = setInterval(function () {
  var blockLast
  var blockLastTop
  if (counter > 0) {
    blockLast = document.getElementById('block' + (counter - 1))
    blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue('top'))
  }
  if (blockLastTop < 400 || counter === 0) {
    // alert(blockLast)
    // alert(blockLastTop)
    // alert(blockLastTop < 400)
    // alert(counter)
    let block = document.createElement('div')
    let hole = document.createElement('div')
    block.setAttribute('class', 'block')
    hole.setAttribute('class', 'hole')
    block.setAttribute('id', 'block' + counter)
    hole.setAttribute('id', 'hole' + counter)
    block.style.top = blockLastTop + 100 + 'px'
    const random = Math.floor(Math.random() * 360)
    hole.style.left = random + 'px'
    game.append(block)
    block.append(hole)
    currentBlocks.push(counter)
    counter++
    // alert(counter)
  }
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
  var drop = 0
  if (characterTop <= 0) {
    alert('gameovver score: ' + (counter - 7))
    clearInterval(blocks)
   location.reload()
  }
  for (var i = 0; i < currentBlocks.length; i++) {
    const current = currentBlocks[i]
    const currentBlock = document.getElementById('block' + current)
    const currentHole = document.getElementById('hole' + current)
    const currentBlockTop = parseFloat(window.getComputedStyle(currentBlock).getPropertyValue('top'))
    const currentHoleLeft = parseFloat(window.getComputedStyle(currentHole).getPropertyValue('left'))
    currentBlock.style.top = currentBlockTop - 0.5 + 'px'
    if (currentBlockTop < -20) {
      currentBlocks.shift()
      currentBlock.remove()
      currentHole.remove()
    }

    if (currentBlockTop - 20 < characterTop && currentBlockTop > characterTop) {
      drop++
      if (currentHoleLeft <= characterLeft && currentHoleLeft + 20 >= characterLeft) {
        drop = 0
      }
    }
  }
  if (drop === 0) {
    if (characterTop < 480) {
      character.style.top = characterTop + 2 + 'px'
    }
  } else {
    character.style.top = characterTop - 0.5 + 'px'
  }
}, 1)
