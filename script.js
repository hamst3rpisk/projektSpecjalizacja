
function callIndex() {
    const gridButton = document.querySelector("#gridButton");
    const nextPageTransitionDiv = document.querySelector("#nextPage");
    const returnDiv = document.querySelector("#returnDiv");
    gridButton.addEventListener("click", (e) => {
        setTimeout(() => { 
        nextPageTransitionDiv.style.height = "0vh";
        window.location.href = "grid.html";
        },2000);
        nextPageTransitionDiv.style="animation: switchPage 0.4s forwards";
    });
    console.log(document.cookie);    
    if (document.cookie == "returnFlag=true") {
        returnDiv.style="animation: switchPageReverse 0.4s forwards";
        document.cookie="returnFlag=false";
    }


    
    
    
}



function callGrid() {
    document.cookie="returnFlag=false";
    const backTransitionDiv = document.querySelector("#lastPageGrid");
    const nextPageTransitionDivReverse = document.querySelector("#nextPageGrid");
    nextPageTransitionDivReverse.style="animation: switchPageReverse 0.4s forwards";


    const backButton = document.querySelector("#backActionButton");
    backButton.addEventListener("click", (e) => {
        document.cookie="returnFlag=true";
        setTimeout(() => { 
            backTransitionDiv.style.height = "0vh";
            window.location.href = "index.html";
            },2000);
            backTransitionDiv.style="animation: switchPage 0.4s forwards";
    });
    let gridColor = "white";
    let ctrlZMax = 8;
    const canvas = document.querySelector("#mainCanvas");
    const ctx = canvas.getContext("2d", {willReadFrequently: true});
    canvas.width = 600;
    canvas.height = 600;
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = "1";
    ctx.strokeStyle = "gray";
    ctx.strokeStyle="gray";
    const widthSlider = document.querySelector("#canvasWidth");
    const heightSlider = document.querySelector("#canvasHeight");
    const pixelSlider = document.querySelector("#pixelSize");
    const pixelText = document.querySelector("#pixelText");
    const widthText = document.querySelector("#widthText");
    const heightText = document.querySelector("#heightText");
    let pixelSize = pixelSlider.value;

    /* fill canvas init */
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.stroke();

    //Draws the grid lines (doesn't work with Ctrl+Z + doesn't look too good)

    // function drawGridLines(pixelSize) {
    //     ctx.clearRect(0,0,canvas.width,canvas.height);
    //     for (let i=0;i<canvas.width/pixelSize;i++)
    //     {
    //         for(let j=0;j<canvas.height/pixelSize;j++) {
    //             if ((i+j)%2==0) {
    //                 ctx.fillStyle="#9a9da1";
    //                 ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize); 
    //             }
    //             else {
    //                 ctx.fillStyle="white";
    //                 ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
    //             }
    //         }
    //     }
    // }
    //     ctx.stroke();
    
    // drawGridLines(pixelSize);

    

    //Sets used for redundancy and Ctrl+Z
    let drawnPixels = new Set();
    let everyDrawn = [];
    let drawn = [];

    //Draws the pixel and stores the pixel in the drawnPixels set to avoid drawing the same pixel twice
    function drawPixel(x, y) {
        const pixelKey = `${x},${y}`;
        let imageData = ctx.getImageData(x,y,pixelSize,pixelSize);
        let pixelData = imageData.data;
        let color = `rgba(${pixelData[0]},${pixelData[1]},${pixelData[2]})`;
        if (!drawnPixels.has(pixelKey)) {
            ctx.fillRect(x, y, pixelSize, pixelSize);
            drawnPixels.add(pixelKey);
            drawn.push({x,y,reverseColor: color, drawnPixelSize: pixelSize});
        }
    }
    
    
    
    



    ctx.strokeStyle = "gray";
    const currentColor = document.getElementById('currentColor');
    

    ctx.fillStyle = "red";
    ctx.stroke();
    ctx.fillRect(0,0,pixelSize,pixelSize); /* DO NOT DELETE THIS LINE (VERY IMPORTANT) !!!*/


    //Reverts last stroke of the mouse up to ctrlZMax times
    function ctrlZ() {
        console.log(everyDrawn);
        if (everyDrawn.length != 0) {
            for (let {x,y,reverseColor, drawnPixelSize} of everyDrawn[everyDrawn.length-1]) {
                ctx.fillStyle=reverseColor;
                ctx.fillRect(x,y,drawnPixelSize,drawnPixelSize);
            }
        
            ctx.fillStyle=currentColor.value;
            drawn = [];
            everyDrawn.splice(-1); 
        }
        ctx.fillStyle=currentColor.value;
    }
    
    let drawing = false;




    const exportButton = document.querySelector("#exportButton");
    //exports canvas to png file
    function canvasToImg() {
        let link = document.createElement('a');
        link.href= canvas.toDataURL("image/png");
        link.download="canvas.png"
        link.click();
    }
    exportButton.addEventListener("click",(e) => {
        canvasToImg();
    });




    //Ends the stroke of the mouse when the mouse is released
    canvas.addEventListener("mouseup", (e) => {
        drawing = false;
        if (drawn.length != 0) {
        everyDrawn.push(drawn); }
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
        }
        drawnPixels.clear();

    });

    //Draws a pixel when the mouse is pressed down to avoid the delay of the mouse move event (trust me it's necessary)
    canvas.addEventListener("mousedown", (e) => {
        if (e.button === 2) {
            
        }
        else {
            drawing = true;
            const rect = canvas.getBoundingClientRect();
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;

                //Grid snaps the pixels to the size to pixelSize 
                x = Math.floor(x/pixelSize)*pixelSize;
                y = Math.floor(y/pixelSize)*pixelSize;


                    ctx.fillStyle = currentColor.value;
                    drawPixel(x,y);
                    ctx.stroke();
                    
        }
        
    });

    //Keeps drawing pixels when the mouse is pressed down and moving
    canvas.addEventListener("mousemove", (e) => {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;

            //Grid snaps the pixels to the size to pixelSize 
            x = Math.floor(x/pixelSize)*pixelSize;
            y = Math.floor(y/pixelSize)*pixelSize;


                ctx.fillStyle = currentColor.value;
                drawPixel(x,y);
                
                ctx.stroke();

        }
    });

    //Ends the stroke of the mouse when the mouse exits bounds of the canvas
    canvas.addEventListener("mouseout", (e) => {
        drawing = false;
        if (drawn.length != 0) {
        everyDrawn.push(drawn); }
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
            console.log(everyDrawn.length);
        }
        drawnPixels.clear();

        brush.style.display = "none";
    });



    //Detects for Ctrl + Z
    document.addEventListener("keydown",(e) => {
        e.preventDefault();
        if (e.code === "KeyZ" && e.ctrlKey === true) {
            ctrlZ();
            console.log("ctrlz");
        }
    });




    //Sliders for canvas width and height/pixel size
    heightSlider.addEventListener("change", (e) => {

        if (heightSlider.value > window.innerWidth*0.9) {
            heightSlider.value = window.innerWidth*0.9;
        };
        heightSlider.step=pixelSize;
        heightText.textContent = "Canvas Height: " + heightSlider.value;
        canvas.height = heightSlider.value;
        ctx.imageSmoothingEnabled = false;
        ctx.lineWidth = "1";
        ctx.strokeStyle = "gray";
        ctx.fillStyle = currentColor.value;
        
    });
    widthSlider.addEventListener("change", (e) => {
        if (widthSlider.value > window.innerWidth*0.8) {
            widthSlider.value = window.innerWidth*0.8;
        };
        widthSlider.step=pixelSize;
        widthText.textContent = "Canvas Width: "+ widthSlider.value;
        canvas.width = widthSlider.value;
        ctx.imageSmoothingEnabled = false;
        ctx.lineWidth = "1";
        ctx.strokeStyle = "gray";
        ctx.fillStyle = currentColor.value;
        
    });

    //Bursh 

    const brush = document.getElementById('brush');

    pixelSlider.addEventListener("change", (e) => {
        pixelText.textContent = "Pixel Size: " + pixelSlider.value;
        pixelSize = pixelSlider.value;
        
        brush.style.width = `${pixelSize}px`;
        brush.style.height = `${pixelSize}px`;
    });

    canvas.addEventListener('mousemove', (e) =>{
        brush.style.display = "block";
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        //     const rect = canvas.getBoundingClientRect()

        //     const gridX = Math.floor(canvasX / pixelSize) * pixelSize;
        //     const gridY = Math.floor(canvasY / pixelSize) * pixelSize;

        brush.style.left = `${mouseX}px`;
        brush.style.top = `${mouseY}px`;
    });
}
