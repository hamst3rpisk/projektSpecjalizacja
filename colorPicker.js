document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.querySelector("#mainCanvas").getContext("2d");
    const currentColor = document.getElementById('currentColor');
    const buttonContainer = document.querySelector('.colorPickerDiv');
    
    let defaultColor = [
        { id: "button1", color: "#ff0000" },
        { id: "button2", color: "#00ff00" },
        { id: "button3", color: "#0000ff" },
        { id: "button4", color: "#ffff00" },
        { id: "button5", color: "#00ffff" },
        { id: "button6", color: "#ff00ff" }
    ];

    let buttonIdNumber = defaultColor.length;
    function createButton(id, color){
        const button = document.createElement("input");

        button.id = id;
        button.type = "button";
        button.classList.add('buttonColor');
        button.style.backgroundColor = color;

        button.addEventListener('click', function() {
            const selectedColor = defaultColor.find(colorSelected => colorSelected.id === button.id);
            currentColor.value = selectedColor.color;
            ctx.fillStyle = currentColor.value;
        });

        buttonContainer.appendChild(button);
        defaultColor.push({ id: button.id, color: currentColor.value});
    }

    defaultColor.forEach(colorObj => {
        createButton(colorObj.id, colorObj.color);
    });

    currentColor.addEventListener(`change`, function(){
        buttonIdNumber++;
        if(!defaultColor.find(colorObj => colorObj.color === currentColor.value)){
            createButton("button" + buttonIdNumber, currentColor.value);
        }
        ctx.fillStyle = currentColor.value; 
    });
});