//create grids that are apparently divs
//these grids will access the container div and add
// grids to that
//using flexbox to create grids
//setting up a hover effect so grid divs change color
// when mouse passes over them leaving a pixelated trail
//through the grid like a pen
// allow a button to ask the number of sides of new grid

// 1. create a function called createBlock
// This function should:
// a)Take in as an input a number that defines
// the number of sides of the sketchpad
// b)It should also create the divs elements/nodes
// c)It should append those nodes to the div container
// d)Use the hover event on the div to change the color
// of the divs
// e)Add button that asks the number of side for new grid

// Key challenges:
// How to create a grid using flexbox
// How to change the color of the div
let currentColor = "rgba(255,0,0,1)"
let rainbow = false
let darken=true
function createBlock(blocksPerSide=10) {
    for (let i = 0; i < blocksPerSide; ++i){
        let container = document.querySelector("div.container")
        let row = document.createElement("div")
        row.classList.add("row")
        
        for (let j = 0; j < blocksPerSide; ++j){
            let singleBlock = document.createElement("div")
            let pixelSize=500/blocksPerSide
            singleBlock.setAttribute("style",
                `background-color: white; height:${pixelSize}px;width:${pixelSize}px; flex: 1 0 0;`)
            singleBlock.addEventListener("mouseover", (event) => {
                if (!rainbow && !darken) {
                    singleBlock.style.backgroundColor=currentColor
                }
                else if(rainbow)
                { singleBlock.style.backgroundColor = generateRandomColor() }
                else if (darken) {
                    let splitColor = currentColor.split(",")
                    let alpha = (splitColor[3].split(")"))[0]
                    console.log(alpha,"before changing alpha")
                    alpha = parseFloat(alpha)
                    if (alpha < 1) {
                      alpha=alpha+0.1
                    } else {
                        alpha=0
                    }
                    console.log(alpha,"after changing alpha")
                    currentColor = `${splitColor[0]},${splitColor[1]},${splitColor[2]},${alpha})`
                    console.log(currentColor)
                    singleBlock.style.backgroundColor=currentColor
                }
            })
            row.appendChild(singleBlock)
        }
        container.appendChild(row)
    }
}

function createSketchpad() {
    let sketchpadSizeButton = document.createElement("button")
    sketchpadSizeButton.textContent = "Set Sketchpad Size"
    let body = document.querySelector("body")
    sketchpadSizeButton.classList.add("sketchpad")
    body.appendChild(sketchpadSizeButton)
    let sketchpasSize;

    function createSketchpadInstance(){
        // let body = document.querySelector("body")
        sketchpasSize = prompt("Please enter the size of the sketchpad you wish for:")
        if (document.querySelector("div.container") != null) {
            body.removeChild(document.querySelector("div.container"))
        }
        let newContainer = document.createElement("div")
        newContainer.classList.add("container")
        body.appendChild(newContainer)

        // create a pallete for choosing colors to write on the sketchpad
        let pallete = document.createElement("div")
        pallete.classList.add("row")
        let colors = ["rgba(13, 233, 57, 1)", "rgba(255, 60, 0, 1)", "rgba(3, 132, 253, 1)", "rgba(247, 255, 22, 1)", "rgba(255, 166, 0, 1)", "rgba(162, 0, 255, 1)"]
        for (let color of colors) {
            
            let colorInPallete = document.createElement("div")
            colorInPallete.setAttribute("style",
                `background-color: ${color}; height:16px;width:16px; flex: 1 0 0; 
                    margin-top:10px; margin-right:10px;`)
            colorInPallete.addEventListener("click", () => {
                currentColor = color
                darken = false
                rainbow=false
            })
            pallete.appendChild(colorInPallete)
        }
        
        let rainbowDiv = document.createElement("div")
        
        rainbowDiv.setAttribute("style",
                `background-color: ${currentColor}; height:16px;width:16px; flex: 1 0 0; 
                    margin-top:10px; margin-right:10px;`)
        rainbowDiv.addEventListener("click", () => {
            rainbow = true
            darken=false
        })
        rainbowDiv.classList.add("rainbow")
        pallete.appendChild(rainbowDiv)

         let darkenDiv = document.createElement("div")
        
        darkenDiv.setAttribute("style",
                `background-color: rgba(255,0,0,0.1); height:16px;width:16px; flex: 1 0 0; 
                    margin-top:10px; margin-right:10px;`)
        darkenDiv.addEventListener("click", () => {
            rainbow = false
            darken=true
        })
        darkenDiv.classList.add("rainbow")
        pallete.appendChild(darkenDiv)

        createBlock(sketchpasSize)
        newContainer.appendChild(pallete)
    }

    sketchpadSizeButton.addEventListener("click", createSketchpadInstance )
    
}

function generateRandomColor() {
    return `rgba(${Math.floor(Math.random() * 255)}
    ,${Math.floor(Math.random() * 255)}
    ,${Math.floor(Math.random() * 255)}
    ,${1})`
}

setInterval(function () {
            let rainbowDiv = document.querySelector(".rainbow")
            rainbowDiv.style.backgroundColor=generateRandomColor()
        },100)
createSketchpad()