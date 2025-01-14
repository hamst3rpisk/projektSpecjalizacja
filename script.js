function callIndex() {

}


function callGrid() {
    let gridColor = "white";
    let ctrlZMax = 8;
    const canvas = document.querySelector("#mainCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 600;
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth = "1";
    ctx.strokeStyle="gray";
    const widthSlider = document.querySelector("#canvasWidth");
    const heightSlider = document.querySelector("#canvasHeight");
    const pixelSlider = document.querySelector("#pixelSize");
    const pixelText = document.querySelector("#pixelText");
    const widthText = document.querySelector("#widthText");
    const heightText = document.querySelector("#heightText");
    let pixelSize = pixelSlider.value;
    function drawGridLines() {
        ctx.beginPath();
        ctx.fillStyle="gray";
        for (let i=0;i<canvas.width/pixelSize;i++)
        {
            for(let j=0;j<canvas.height/pixelSize;j++) {
                if (!(j%2)) {
                    ctx.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
                    console.log("darw");
                }
            }
        }
        ctx.stroke();
        ctx.closePath();
    }
    drawGridLines();
    /* fill canvas init */
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    ctx.strokeStyle = "gray";
    const colorPicker = document.querySelector("#colorInput");
    

    /* For the grid scaling sliders */
    
   
    // for (let i=0;i<128;i++) {
    //     for (let j=0;j<128;j++) {
    //         ctx.rect(i*5,j*5,5,5);
    //     }
    // }
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,pixelSize,pixelSize); /* DO NOT DELETE THIS LINE (VERY IMPORTANT) !!!*/
    let color = colorPicker.value;
    colorPicker.addEventListener("change", (e) => {
        console.log(colorPicker.value);
        ctx.fillStyle = colorPicker.value;
        console.log(ctx.fillStyle);
    });

    ctx.stroke();
    let everyDrawn = [];
    let drawn = [];
    function ctrlZ() {
        ctx.fillStyle=gridColor;
        if (everyDrawn.length != 0) {
            for (let {x,y} of everyDrawn[everyDrawn.length-1]) {
                ctx.fillRect(x,y,pixelSize,pixelSize);
            }
        
            ctx.fillStyle=colorPicker.value;
            drawn = [];
            everyDrawn.splice(-1);
        }
        ctx.fillStyle=colorPicker.value;
    }
    
    let drawing = false;
    canvas.addEventListener("mouseup", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
            console.log(everyDrawn.length);
        }

    });
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        
        
    });
    canvas.addEventListener("mousemove", (e) => {
        if (drawing) {
            const rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            x = Math.floor(x/pixelSize)*pixelSize;
            y = Math.floor(y/pixelSize)*pixelSize;
            ctx.fillRect(x,y,pixelSize,pixelSize);
            ctx.stroke();
            drawn.push({x,y});
            

        }
    });
    canvas.addEventListener("mouseout", (e) => {
        drawing = false;
        everyDrawn.push(drawn);
        drawn = [];
        if(everyDrawn.length > ctrlZMax) {
            everyDrawn.shift();
            console.log(everyDrawn.length);
        }
    });


    document.addEventListener("keydown",(e) => {
        e.preventDefault();
        if (e.code === "KeyZ" && e.ctrlKey === true) {
            ctrlZ();
            console.log("ctrlz");
        }
    });
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
        ctx.fillStyle = colorPicker.value;
        
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
        ctx.fillStyle = colorPicker.value;
        
    });
    pixelSlider.addEventListener("change", (e) => {
        pixelText.textContent = "Pixel Size: " + pixelSlider.value;
        pixelSize = pixelSlider.value;
        
    });

}