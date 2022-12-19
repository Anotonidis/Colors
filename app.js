const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event) => {
   event.preventDefault()
   if (event.code.toLowerCase() === 'space') {
      setRandomColors()
   }
})

document.addEventListener('click', event => {
   const type = event.target.dataset.type

   if (type === 'lock') {
      const node = event.target.tagName.toLowerCase() === 'i'
         ? event.target
         : event.target.children[0]

      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
   } else if (type === 'copy') {
      copyColor(event.target.textContent)
   }
})


function generateRandomColor() {
   const code = '0123456789ABCDEF'
   let color = ''
   for (let i = 0; i < 6; i++) {
      color += code[Math.floor(Math.random() * code.length)]
   }

   return '#' + color
}

function copyColor(text) {
   return navigator.clipboard.writeText(text)
}

function setRandomColors(isInitial) {
   const colorsArr = isInitial ? getHashColor() : []

   columns.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock')
      const text = col.querySelector('h2')
      const button = col.querySelector('button')
      

      if (isLocked) {
         colorsArr.push(text.textContent)
         return
      }

      const color = isInitial ? colorsArr[index] ? colorsArr[index] : chroma.random() : chroma.random() 

      if (!isInitial) {
         colorsArr.push(color)
      }
      

      text.textContent = color
      col.style.background = color

      setTextColor(text, color)
      setTextColor(button, color)
   })

   updateHash(colorsArr)
}

function setTextColor (text, color) {
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateHash (colors=[]) {
   document.location.hash = colors.map(col => {
      return col.toString().substring(1)
   }).join('-')
}

function getHashColor() {
   if (document.location.hash.length > 1) {
      return document.location.hash.substring(1).split('-').map(color => '#' + color)
   }
   return []
}

setRandomColors(true)