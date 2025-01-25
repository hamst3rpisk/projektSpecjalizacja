
    document.addEventListener('DOMContentLoaded', function() {
        const ctx = document.querySelector("#mainCanvas").getContext("2d", {willReadFrequently: true});
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
        /**
         * Creates a color picker button element with the given id and color,
         * adds it to the color picker container, and adds an event listener
         * that changes the current color when the button is clicked.
         * @param {string} id - The id of the button element to create.
         * @param {string} color - The background color of the button element to create.
         */
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
            defaultColor.push({ id: button.id, color: color});
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
        currentColor.addEventListener('click', function() {
            ctx.fillStyle = currentColor.value;
        });

        //import pallete popup 
        const popUp = document.querySelector(".popUpImport");
        document.getElementById('importPallete').addEventListener('click', function() {
            popUp.style.display = "block";
            popUp.classList.add("show");
        })
        document.getElementById('importBtn').addEventListener('click', function(){
            const cssText = document.querySelector("#importLink").value;
            const colorFromLink = cssText.substr(19).split("-");
            colorFromLink.forEach((color) => {
                    buttonIdNumber++;
                    createButton("button" + buttonIdNumber, "#" + color);
                });
                popUp.style.display = "none";
                popUp.classList.remove("show");
        })
        document.getElementById('closePopup').addEventListener('click', function() {
            popUp.style.display = "none";
            popUp.classList.remove("show");
        })
        //NOT WORKING   
        window.addEventListener('click', function (event) {
            if (event.target === popUp) {
                popUp.style.display = "none";
                popUp.classList.remove("show");
            }
        });
    });

    

    