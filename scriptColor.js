//Color picking by slider
let colorRange = document.getElementById("colorNumber");
let color = document.getElementById("colorPicked")
let p = document.getElementById("number");
var r = 0, g = 0, b = 0;


colorRange.oninput = function(){
    let value = colorRange.value;

     if (value < 256){
        r = 255;
        g = value;
    }
    else if(value < 511){
        r = 255 - (value - 255);
        g = 255;
    }
    else if(value < 766){
        r = 0;
        g = 255;
        b = value - 510;
    }
    else if(value < 1021){
        r = 0;
        g = 255 - (value - 765);
        b = 255;
    }
    else if(value < 1276){
        r = value - 1020;
        g = 0;
        b = 255;
    }
    else{
        r = 255;
        g = 0;
        b = 255 - (value - 1275);
    }
    console.log(value - 510);
    color.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    p.textContent = `(${r}, ${g}, ${b})`;
};

//Color picking from the ractangle
let pointerDiv = document.getElementById("pointerColor");
var mousePosition;
var offset = [0,0];
var isDown = false;

pointerDiv.addEventListener('mousedown', function(e){
    isDown = true;
    offset = [
        pointerDiv.offsetLeft - e.clientX,
        pointerDiv.offsetTop - e.clientY
    ]
}, true);

pointerDiv.addEventListener('mouseup', function() {
    isDown = false;
}, true);

pointerDiv.addEventListener('mousemove', function(event){
    event.preventDefault();
    if(isDown){
        mousePosition = {
            x : event.clientX,
            y : event.clientY
        };
        pointerDiv.style.left = (mousePosition.x + offset[0]) + 'px';
        pointerDiv.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
    
}, true);

