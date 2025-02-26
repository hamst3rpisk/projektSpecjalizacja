function callIndex() {
    const gridButton = document.querySelector("#gridButton");
    const nextPageTransitionDivs = document.querySelectorAll(".nextPage"); 
    const returnDiv = document.querySelector("#returnDiv");
    gridButton.addEventListener("click", (e) => {
        nextPageTransitionDivs.forEach((div, index) => {
            setTimeout(() => {
                div.style.animation = `switchPage 0.5s linear forwards`;
                setTimeout(() => { 
                    div.style.height = "0vh";
                    if (index === nextPageTransitionDivs.length - 1) { 
                        window.location.href = "grid.html"; 
                    }
                }, 2000);
                
            }, index * 100); 
        });
        setTimeout(() => { 
            let div = document.getElementById("fallingDiv");
            div.style.visibility = 'visible';
            div.style.animation = 'fadeIn 2s';
        },50);
    });
    
    console.log(document.cookie);    
    if (document.cookie == "returnFlag=true") {
        returnDiv.style=`animation: switchPageReverse 0.4s forwards`;
        document.cookie="returnFlag=false";
    }
     
    setInterval(() => {
        if(Math.floor(Math.random() * 21) === 1){
            document.documentElement.style.setProperty('--animation-opacity', '0.4');
        }
        else if(Math.floor(Math.random() * 21) === 2){
            document.documentElement.style.setProperty('--animation-opacity', '0.6');
        }
        else{
            document.documentElement.style.setProperty('--animation-opacity', '0.8');
        }
    },300);
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
            backTransitionDiv.style.zIndex = 20;
            
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
    const brush = document.getElementById('brush');

    /* fill canvas init */
    function clearCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.stroke();
    }
    clearCanvas();
    //Draws the grid lines (doesn't work with Ctrl+Z + doesn't look too good)

    function drawGridLines(pixelSize) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (let i=0;i<canvas.width/pixelSize;i++){
            for(let j=0;j<canvas.height/pixelSize;j++) {
                if ((i+j)%2==0) {
                    ctx.fillStyle= "rgba(182, 188, 194,0.7)"
                    ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize); 
                }
                else {
                    ctx.fillStyle="white";
                    ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
                }
            }
        }
    }
    function hideGridLines(pixelSize){
        for (let i=0;i<canvas.width/pixelSize;i++){
            for(let j=0;j<canvas.height/pixelSize;j++) {
                ctx.fillStyle="white";
                ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
            }
        }
    }
    
    

    

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



    //Naming doesnt work beaceause of the crtlZ function(detection of keypresses is causing a bug)
    const exportButton = document.querySelector("#exportButton");
    let canvasName = document.querySelector("#canvasName");

    //exports canvas to png file
    function canvasToImg() {
        let link = document.createElement('a');
        link.href= canvas.toDataURL("image/png");
        if (canvasName.value === "") {
            canvasName.value = "Maciek-pedal";
        }
        
        link.download = canvasName.value + ".png";
        link.click();
    }
    exportButton.addEventListener("click", () => {
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
        if (document.activeElement.tagName === "INPUT" && document.activeElement.type === "text") {
            return;
        }
        e.preventDefault();
        if (e.code === "KeyZ" && e.ctrlKey === true) {
            ctrlZ();
            console.log("ctrlz");
        }
    });




    //Sliders for canvas width and height/pixel size\

    //Initializes the slider values
    heightSlider.value = canvas.height;
    widthSlider.value = canvas.width;
    pixelSlider.value = pixelSize;
    pixelText.textContent = "Brush Size: " + pixelSize;
    heightText.textContent = "Canvas Height: " + canvas.height;
    widthText.textContent = "Canvas Width: "+ canvas.width;

    //Updates the slider values live
    heightSlider.addEventListener("input", (e) => {
        heightText.textContent = "Canvas Height: " + heightSlider.value;
    });
    widthSlider.addEventListener("input", (e) => {
        widthText.textContent = "Canvas Width: "+ widthSlider.value;
    });
    pixelSlider.addEventListener("input", (e) => {
        pixelText.textContent = "Brush Size: " + pixelSlider.value;
    })

    //Updates the canvas size
    heightSlider.addEventListener("change", (e) => {
        if (heightSlider.value > window.innerWidth*0.9) {
            heightSlider.value = window.innerWidth*0.9;
        };
        heightSlider.step=pixelSize;
        canvas.height = heightSlider.value;
        ctx.imageSmoothingEnabled = false;
        ctx.lineWidth = "1";
        ctx.strokeStyle = "gray";
        ctx.fillStyle = currentColor.value;
        clearCanvas();
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
        clearCanvas();
    });

    //Updates the pixel size
    pixelSlider.addEventListener("change", (e) => {
        pixelText.textContent = "Brush Size: " + pixelSlider.value;
        pixelSize = pixelSlider.value;
        
        brush.style.width = `${pixelSize}px`;
        brush.style.height = `${pixelSize}px`;
    });

    //Shows the grid
    let showGridToggle = document.querySelector("#showGrid");
    let showGrid = showGridToggle.checked;
    showGridToggle.addEventListener("change", (e) => {
        showGrid = showGridToggle.checked;
        if(showGrid){
            ctx.stroke();
            drawGridLines(pixelSize);
        }else{
            ctx.stroke();
            hideGridLines(pixelSize);
        }
    })

    //Toogle snap to grid function
    let snapToGridToogle = document.querySelector("#snapToGrid");
    let snapToGrid = snapToGridToogle.checked;
    snapToGridToogle.addEventListener("change", (e) => {
        snapToGrid = snapToGridToogle.checked;
    });

    //Grid snaps the pixels to the size to pixelSize and if toogled off it will snap to the mouse
    canvas.addEventListener('mousemove', (e) => {
        brush.style.display = "block";

        if (snapToGrid) {
            brush.style.transform = "";

            const rect = canvas.getBoundingClientRect();
            const canvasX = e.clientX - rect.left;    
            const canvasY = e.clientY - rect.top;
            const gridX = Math.floor(canvasX / pixelSize) * pixelSize;
            const gridY = Math.floor(canvasY / pixelSize) * pixelSize;
    
            brush.style.left = `${gridX + rect.left}px`;
            brush.style.top = `${gridY + rect.top}px`;
        } else {
            brush.style.transform = "translate(-50%, -50%)";

            brush.style.left = `${e.clientX}px`;
            brush.style.top = `${e.clientY}px`;
        }
    });

    //Clears the canvas
    document.getElementById("clearButton").addEventListener("click", (e) => {
        clearCanvas();
   });
}
