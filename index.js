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
let currentColor="red"
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
                singleBlock.style.backgroundColor=currentColor
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
        let colors = ["green", "red", "blue", "orange", "yellow", "purple"]
        for (let color of colors) {
            
            let colorInPallete = document.createElement("div")
            colorInPallete.setAttribute("style",
                `background-color: ${color}; height:16px;width:16px; flex: 1 0 0; 
                    margin-top:10px; margin-right:10px;`)
            colorInPallete.addEventListener("click", () => {
                currentColor=color
            })
            pallete.appendChild(colorInPallete)
        }
        
        createBlock(sketchpasSize)
        newContainer.appendChild(pallete)
    }

    sketchpadSizeButton.addEventListener("click", createSketchpadInstance )
    
}

createSketchpad()