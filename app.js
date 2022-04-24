// // Global selections and variables
// const colorDivs = document.querySelectorAll('.color');
// const generateBtn = document.querySelector('.generate');
// const sliders = document.querySelectorAll('input[type="range"]');
// const currentHexes = document.querySelectorAll('.color h2');
// const popup = document.querySelector('.copy-container');
// const adjustButton = document.querySelectorAll('.adjust');
// const lockButton = document.querySelectorAll('.lock');
// const closeAdjustments = document.querySelectorAll('.close-adjustment');
// const sliderContainers = document.querySelectorAll('.sliders');
// let initialColors;
// // Create a variable for local storage
// let savedPalettes = [];

// // Add our Event Listeners
// generateBtn.addEventListener('click', randomColors);

// sliders.forEach(slider => {
//     slider.addEventListener('input', hslControls);
// });

// colorDivs.forEach((div, index) => {
//     div.addEventListener('change', () => {
//         updateTextUI(index);
//     });
// });

// currentHexes.forEach(hex => {
//     hex.addEventListener('click', () => {
//         copyToClipBoard(hex);
//     });
// });

// popup.addEventListener('transitionend', () => {
//     const popupBox = popup.children[0];
//     popup.classList.remove('active');
//     popupBox.classList.remove('active');
// });

// adjustButton.forEach((button, index) => {
//     button.addEventListener('click', () => {
//         openAdjustmentPanel(index);
//     });
// });

// closeAdjustments.forEach((button, index) => {
//     button.addEventListener('click', () => {
//         closeAdjustmentPanel(index);
//     });
// });

// lockButton.forEach((button, index) => {
//     button.addEventListener('click', (e) => {
//         closeLockButton(e, index);
//     });
// });

// // Functions

// // Color Generator
// function generateHex() {
//     const hexColor = chroma.random();
//     return hexColor;
// }

// function randomColors() {
        
//     initialColors = [];
//     colorDivs.forEach((div, index) => {
//         const hexText = div.children[0];
//         const randomColor = generateHex();
//         // add it to the array
//         if(div.classList.contains("locked")) {
//             initialColors.push(hexText.innerText);
//             return;
//         } else {
//             initialColors.push(chroma(randomColor).hex());
//         }
        
//         // initialColors.push(chroma(randomColor).hex());

//         //add color to background
//         div.style.backgroundColor = randomColor;
//         hexText.innerText = randomColor;
//         // check for contrast
//         checkTextContrast(randomColor, hexText);
//         // Initialize color sliders
//         const color = chroma(randomColor);
//         const sliders = div.querySelectorAll('.sliders input');
//         const hue = sliders[0];
//         const brightness = sliders[1];
//         const saturation = sliders[2];

//         colorizeSliders(color, hue, brightness, saturation);
//     });
//     // Reset Inputs
//     resetInputs();
//     // Check for contrast on the buttons
//     adjustButton.forEach((button, index) => {
//         checkTextContrast(initialColors[index], button);
//         checkTextContrast(initialColors[index], lockButton[index]);
//     });
// }

// function checkTextContrast(color, text) {
//     const luminance = chroma(color).luminance();
//     if(luminance > 0.5) {
//         text.style.color = "black"; 
//     } else {
//         text.style.color = "white";
//     }
// }

// function colorizeSliders(color, hue, brightness, saturation) {
//     // Scale saturation
//     const noSat = color.set('hsl.s', 0);
//     const fullSat = color.set('hsl.s', 1);
//     const scaleSat = chroma.scale([noSat, color, fullSat]);

//     // Scale Brightnes
//     const midBright = color.set('hsl.l', 0.5);
//     const scaleBright = chroma.scale(['black', midBright, 'white']);
//     // 

//     // Update Input colors
//     saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
//     brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)},${scaleBright(0.5)} ,${scaleBright(1)})`;
//     hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
// }

// function hslControls(e) {
//     const index = e.target.getAttribute("data-bright") || e.target.getAttribute("data-hue")  || e.target.getAttribute("data-sat");

//     let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');

//     const hue = sliders[0];
//     const brightness = sliders[1];
//     const saturation = sliders[2];

//     const bgColor = initialColors[index];

//     let color = chroma(bgColor)
//         .set('hsl.s', saturation.value)
//         .set('hsl.l', brightness.value)
//         .set('hsl.h', hue.value);

//         colorDivs[index].style.backgroundColor = color;

//         // Colorize inputs/sliders
//         colorizeSliders(color, hue, brightness, saturation);
// }

// function updateTextUI(index) {
//     const activeDiv = colorDivs[index];
//     const color = chroma(activeDiv.style.backgroundColor);
//     const textHex = activeDiv.querySelector('h2');
//     const icons = activeDiv.querySelectorAll('.controls button');
//     textHex.innerText = color.hex();
//     // Check contrast
//     checkTextContrast(color, textHex);
//     for(icon of icons) {
//         checkTextContrast(color, icon);
//     }
// }

// function resetInputs() {
//     const sliders = document.querySelectorAll('.sliders input');
//     sliders.forEach(slider => {
//         if (slider.name === 'hue') {
//             const hueColor = initialColors[slider.getAttribute('data-hue')];
//             const hueValue = chroma(hueColor).hsl()[0];
//             slider.value = Math.floor(hueValue);
//         }
//         if (slider.name === 'brightness') {
//             const brightColor = initialColors[slider.getAttribute('data-bright')];
//             const brightValue = chroma(brightColor).hsl()[2];
//             slider.value = Math.floor(brightValue * 100) / 100;
//         }
//         if (slider.name === 'saturation') {
//             const satColor = initialColors[slider.getAttribute('data-sat')];
//             const satValue = chroma(satColor).hsl()[1];
//             slider.value = Math.floor(satValue * 100) / 100;
//         }
//     });
// }

// function copyToClipBoard(hex) {
//     const el = document.createElement('textarea');
//     el.value = hex.innerText;
//     document.body.appendChild(el);
//     el.select();
//     document.execCommand('copy');
//     document.body.removeChild(el);
//     // Popup animation
//     const popupBox = popup.children[0];
//     popup.classList.add("active");
//     popupBox.classList.add("active");
// }

// function openAdjustmentPanel(index) {
//     sliderContainers[index].classList.toggle('active');
// }

// function closeAdjustmentPanel(index) {
//     sliderContainers[index].classList.remove('active');
// }
 
// function closeLockButton(e, index) {
//     colorDivs[index].classList.toggle('locked');
//     if(colorDivs[index].classList.contains('locked')) {
//         e.target.innerHTML = `<i class="fas fa-lock"></i>`;
//     } else {
//         e.target.innerHTML = `<i class="fas fa-lock-open"></i>`;
//     }
// }

// // Implement save to palette and local storage
// const saveBtn = document.querySelector('.save');
// const submitSave = document.querySelector('.submit-save');
// const closeSave = document.querySelector('.close-save');
// const saveContainer = document.querySelector('.save-container');
// const saveInput = document.querySelector('.save-container input');
// const libraryContainer = document.querySelector('.library-container');
// const libraryBtn = document.querySelector('.library');
// const closeLibraryBtn = document.querySelector('.close-library');
// // const deletLibraryBn = document.querySelector('.custom-palette');

// // Event listeners 
// saveBtn.addEventListener('click', openPalette);
// closeSave.addEventListener('click', closePalette);
// submitSave.addEventListener('click', savedPalette);
// libraryBtn.addEventListener('click', openLibrary);
// closeLibraryBtn.addEventListener('click', closeLibrary);

// function openPalette(e) {
//     const popup = saveContainer.children[0];
//     saveContainer.classList.add('active');
//     popup.classList.add('active');
// };

// function closePalette(e) {
//     const popup = saveContainer.children[0];
//     saveContainer.classList.remove('active');
//     popup.classList.add('remove');
// }

// function savedPalette(e) {
//     saveContainer.classList.remove('active');
//     popup.classList.remove('active');
//     const name = saveInput.value;
//     const colors = [];
//     currentHexes.forEach(hex => {
//         colors.push(hex.innerText);
//     });
//     // Generate Object
//     let paletteNr;
//     const paletteObjects = JSON.parse(localStorage.getItem('palettes'));
//     if(paletteObjects) {
//         paletteNr = paletteObjects.length;
//     } else {
//         paletteNr = savedPalletes.length;
//     }

//     const paletteObj = { name, colors, nr:paletteNr };
//     savedPalettes.push(paletteObj);
//     // save to local storage
//     saveToLocal(paletteObj);
//     saveInput.value = '';
   
// }

// function saveToLocal(paletteObj) {
//     let localPalettes;
//     if(localStorage.getItem('palettes') === null) {
//         localPalettes = [];
//     } else {
//         localPalettes = JSON.parse(localStorage.getItem('palettes'));
//     }
//     localPalettes.push(paletteObj);
//     localStorage.setItem('palettes', JSON.stringify(localPalettes));
// }

// function openLibrary() {
//     const popup = libraryContainer.children[0];
//     libraryContainer.classList.add('active');
//     popup.classList.add('active');
// }

// function closeLibrary() {
//     const popup = libraryContainer.children[0];
//     libraryContainer.classList.remove('active');
//     popup.classList.remove('active');
// }

// function getLocal() {
//     if(localStorage.getItem('palettes') === null) {
//         // Local Palettes
//         localPalettes = [];
//     } else {
//         const paletteObjects = JSON.parse(localStorage.getItem('palettes'));

//             savedPalettes = [...paletteObjects];
//             paletteObjects.forEach(paletteObj => {
//                 // Generate the palette for the library
//             const palette = document.createElement('div');
//             palette.classList.add('custom-palette');
//             const title = document.createElement('h4');
//             title.innerText = paletteObj.name;
//             const preview = document.createElement('div');
//             preview.classList.add('small-preview');
//             paletteObj.colors.forEach(smallColor => {
//                 const smallDiv = document.createElement('div');
//                 smallDiv.style.backgroundColor = smallColor;
//                 preview.appendChild(smallDiv);
//         });
//         // Create the select button
//         const paletteBtn = document.createElement('button');
//         paletteBtn.classList.add('pick-palette-btn');
//         paletteBtn.classList.add(paletteObj.nr);
//         paletteBtn.innerText = 'Select';

//         //Create the Delete button
//         // const deleteBtn = document.createElement('button');
//         // deleteBtn.classList.add('delete-palette');
//         // deleteBtn.classList.remove(paletteObj.nr);
//         // deleteBtn.innerText = 'Delete';

//         // Attach event to button
//         paletteBtn.addEventListener('click', e => {
//             closeLibrary();
//             const paletteIndex = e.target.classList[1];
//             initialColors = [];
//             paletteObjects[paletteIndex].colors.forEach((color, index) => {
//                 initialColors.push(color);
//                 colorDivs[index].style.backgroundColor = color;
//                 const text = colorDivs[index].children[0];
//                 checkTextContrast(color, text);
//                 updateTextUI(index);
//             });
//             resetInputs();
//         });

//         // Add event for delete
//         // deletteBtn.addEventListener('click', (e) => {
//         //     const index = e.target.classList[1];
//         //     deletePalette(e, index);
//         // });

//         // Append to Library
//         palette.appendChild(title);
//         palette.appendChild(preview);
//         palette.appendChild(paletteBtn);
//         libraryContainer.children[0].appendChild(palette);  
//         paletteBtn.classList.add('pick-palette-btn');
//         paletteBtn.classList.add(paletteObj.nr);
//         });
//     }
// }




// getLocal();
// randomColors();

// localStorage.clear();


// Selectors
const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector(".generate");
const sliders = document.querySelectorAll("input[type='range']");
const currentHexes = document.querySelectorAll(".color h2");
const adjustButton = document.querySelectorAll(".adjust");
const lockButton = document.querySelectorAll(".lock");
const closedAdjustments = document.querySelectorAll(".close-adjustment");
const sliderContainers = document.querySelectorAll(".sliders");

const popup = document.querySelector(".copy-container");

let initialColors;

//local storage
let savedPalettes = [];

// Event Listeners

sliders.forEach((slider) => {
    slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, index) => {
    div.addEventListener("change", () => {
        // callback function
        updateTextUI(index);
    });
});

currentHexes.forEach((hex) => {
    hex.addEventListener("click", () => {
        copyToClipboard(hex);
    });
});

popup.addEventListener("transitionend", () => {
    const popupBox = popup.children[0];
    popup.classList.remove("active");
    popupBox.classList.remove("active");
});

adjustButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        toggleAdjustmentPanel(index);
    });
});

closedAdjustments.forEach((button, index) => {
    button.addEventListener("click", () => {
        closeAdjustmentPanel(index);
    })
});

generateBtn.addEventListener("click", randomizeColor);

lockButton.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("locked");
        if (button.classList.contains("locked")) {
            button.innerHTML = "<i class='fas fa-lock'></i>";
        } else {
            button.innerHTML = "<i class='fas fa-lock-open'></i>";
        }
    });
});

function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
}

// Functions

function randomizeColor() {
    initialColors = [];
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();
        if(div.children[1].children[1].classList.contains("locked")) {
            initialColors.push(hexText.innerText);
            return;
        } else {
            initialColors.push(chroma(randomColor).hex());
        }

        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        // Contrast Check
        getTextContrast(randomColor, hexText);

        const color = chroma(randomColor);
        const sliders = div.querySelectorAll(".sliders input");
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    });
    resetInputs();
    // button contrasts
    adjustButton.forEach((button, index) => {
        getTextContrast(initialColors[index], button);
        getTextContrast(initialColors[index], lockButton[index]);
    });
}

function getTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    if (luminance > 0.5) {
        text.style.color = "#333";
    } else {
        text.style.color = "#fff";
    }
}

function colorizeSliders(color, hue, brightness, saturation) {
    /* Saturation */
    const noSat = color.set("hsl.s", 0);
    const fullSat = color.set("hsl.s", 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);
    /* brightness */
    const midBright = color.set("hsl.l", 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);

    /* Update Input */
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}), ${scaleSat(1)}`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)},${scaleBright(0.5)}, ${scaleBright(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right,
        rgb(204, 75, 75),
         rgb(204, 204, 75),
          rgb(75, 204, 75),
           rgb(75, 204, 204),
            rgb(75, 75, 204),
             rgb(204, 75, 204),
              rgb(204, 75, 75))`;
}

function hslControls(e) {
    const index = e.target.getAttribute("data-bright") || e.target.getAttribute("data-sat") || e.target.getAttribute("data-hue");

    let sliders = e.target.parentElement.querySelectorAll("input[type='range']");

    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = initialColors[index];
    let color = chroma(bgColor)
        .set("hsl.s", saturation.value)
        .set("hsl.l", brightness.value)
        .set("hsl.h", hue.value);

    colorDivs[index].style.backgroundColor = color;
    // colorize sliders
    colorizeSliders(color, hue, saturation, brightness);
};

function updateTextUI(index) {
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector("h2");
    const icons = activeDiv.querySelectorAll(".controls button");
    textHex.innerText = color.hex();

    // check text contrast
    getTextContrast(color, textHex);
    for (icon of icons) {
        getTextContrast(color, icon);
    }
}

function resetInputs() {
    const sliders = document.querySelectorAll(".sliders input");
    // console.log(sliders);
    sliders.forEach((slider) => {
        if (slider.name === "hue") {
            const hueColor = initialColors[slider.getAttribute("data-hue")];
            const hueValue = chroma(hueColor).hsl()[0];
            slider.value = Math.floor(hueValue);
        } 
        if (slider.name === "brightness") {
            const brightColor = initialColors[slider.getAttribute("data-bright")];
            const brightValue = chroma(brightColor).hsl()[2];
            slider.value = Math.floor(brightValue * 100) / 100;
        }
        if (slider.name === "saturation") {
            const satColor = initialColors[slider.getAttribute("data-sat")];
            const satValue = chroma(satColor).hsl()[1];
            slider.value = Math.floor(satValue * 100) / 100;
        }
    });
}

function copyToClipboard(hex) {
    const el = document.createElement("textarea");
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    // Animation
    const popupBox = popup.children[0];
    popupBox.classList.add("active");
    popup.classList.add("active");
}

function toggleAdjustmentPanel(index) {
    sliderContainers[index].classList.toggle("active");
}

function closeAdjustmentPanel(index) {
    sliderContainers[index].classList.remove("active");
}

// Palette Work

// Variables
const saveBtn = document.querySelector(".save");
const submitSave = document.querySelector(".submit-save");
const closeSave = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-container input");
const libraryContainer = document.querySelector(".library-container");
const libraryBtn = document.querySelector(".library");
const closeLibraryBtn = document.querySelector(".close-library");

// Event Listeners
saveBtn.addEventListener("click", openPalette);
closeSave.addEventListener("click", closePalette);
submitSave.addEventListener("click", savePalette);
libraryBtn.addEventListener("click", openLibrary);
closeLibraryBtn.addEventListener("click", closeLibrary);

// Functions

function openPalette(e) {
    const popup = saveContainer.children[0];
    saveContainer.classList.add("active");
}

function closePalette(e) {
    const popup = saveContainer.children[0];
    saveContainer.classList.remove("active");
}

function savePalette(e) {
    saveContainer.classList.remove("active");
    popup.classList.remove("active");
    const name = saveInput.value;
    const colors = [];
    currentHexes.forEach((hex) => {
        colors.push(hex.innerText);
    });
    // Local Storage
    let paletteNr;
    paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    if (paletteObjects) {
        paletteNr = paletteObjects.length;
    } else {
        paletteNr = savedPalette.length;
    }
    const paletteObj = { name, colors, nr: paletteNr };
    savedPalettes.push(paletteObj);

    savetoLocal(paletteObj);
    saveInput.value = "";
    // Generate for library
    createPalettes(paletteObj, savedPalettes, "create");
}

function savetoLocal(obj) {
    let localPalettes;
    if (localStorage.getItem("palettes") === null) {
        localPalettes = [];
    } else {
        localPalettes = JSON.parse(localStorage.getItem("palettes"));
    }
    localPalettes.push(obj);
    localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

function openLibrary() {
    const popup = libraryContainer.children[0];
    libraryContainer.classList.add("active");
    popup.classList.add("active");
}

function closeLibrary() {
    const popup = libraryContainer.children[0];
    libraryContainer.classList.remove("active");
    popup.classList.remove("active");
}


function createPalettes(objOne, objTwo, todo) {
    const palette = document.createElement("div");
    const title = document.createElement("h4");
    const preview = document.createElement("div");
    palette.classList.add("cutom-palette");
    title.innerText = objOne.name;
    preview.classList.add("small-preview");
    objOne.colors.forEach((color) => {
        const smallDiv = document.createElement("div");
        smallDiv.style.background = color;
        preview.appendChild(smallDiv);
    });
    const paletteBtn = document.createElement("button");
    const paletteDeleteBtn = document.createElement("button");
    paletteBtn.classList.add("pick-palette-btn");
    paletteBtn.classList.add(objOne.nr);
    paletteBtn.innerText = "select";

    paletteDeleteBtn.classList.add("delete-palette");
    paletteDeleteBtn.classList.add(objOne.nr);
    paletteDeleteBtn.innerHTML = "<i class='fas fa-trash'></i>";

    // attach event to button
    paletteBtn.addEventListener("click", (e) => {
        closeLibrary();
        let i = -1;
        let paletteIndex;
        objTwo.forEach((x) => {
            i++;
            if (e.target.classList[1] == x.nr) {
                paletteIndex = i;
            }
        });

        initialColors = [];
        objTwo[paletteIndex].colors.forEach((color, index) => {
            initialColors.push(color);
            colorDivs[index].style.background = color;
            const text = colorDivs[index].children[0];
            getTextContrast(color, text);
            updateTextUI(index);
        });
        if (todo === "retrieve") {
            resetInputs();
        }
    });

    paletteDeleteBtn.addEventListener("click", (e) => {
        const index = e.target.classList[1];
        deletePalette(e, index);
    });

    // Append to Library
    palette.appendChild(title);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
    palette.appendChild(paletteDeleteBtn);
    libraryContainer.children[0].appendChild(palette);
}

function getLocal() {
    if (localStorage.getItem("palettes") === null) {
        localPalettes = [];
    } else {
        const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
        paletteObjects.forEach((paletteObj) => {
            createPalettes(paletteObj, paletteObjects, "retrieve");
        });
    }
}

function deletePalette(e, index) {
    const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    let i = 0;
    paletteObjects.forEach((x) => {
        if (x.name === e.target.parentElement.children[0].innerText) {
            paletteObjects.splice(i, 1);
            console.log(`removed ${i}: @${x.name}`);
        }
    });
    updatedPalettes = JSON.stringify(paletteObjects);
    localStorage.setItem("palettes", updatedPalettes);
    e.target.parentElement.remove();
}

getLocal();
randomizeColor();





// //selectors
// const colorDivs = document.querySelectorAll(".color");
// const generateBtn = document.querySelector(".generate");
// const sliders = document.querySelectorAll("input[type='range']");
// const currentHexes = document.querySelectorAll(".color h2");
// const adjustButton = document.querySelectorAll(".adjust");
// const lockButton = document.querySelectorAll(".lock");
// const closeAdjustments = document.querySelectorAll(".close-adjustment");
// const sliderContainers = document.querySelectorAll(".sliders");

// const popup = document.querySelector(".copy-container");

// let initialColors;

// //local storage
// let savedPalettes = [];

// //Event listeners

// sliders.forEach((slider) => {
//   slider.addEventListener("input", hslControls);
// });

// colorDivs.forEach((div, index) => {
//   div.addEventListener("change", () => {
//     /* callback function */
//     updateTextUI(index);
//   });
// });

// currentHexes.forEach((hex) => {
//   hex.addEventListener("click", () => {
//     copyToClipboard(hex);
//   });
// });

// popup.addEventListener("transitionend", () => {
//   const popupBox = popup.children[0];
//   popup.classList.remove("active");
//   popupBox.classList.remove("active");
// });

// adjustButton.forEach((button, index) => {
//   button.addEventListener("click", () => {
//     toggleAdjustmentPanel(index);
//   });
// });

// closeAdjustments.forEach((button, index) => {
//   button.addEventListener("click", () => {
//     closeAdjustmentPanel(index);
//   });
// });

// generateBtn.addEventListener("click", randomizeColor);

// lockButton.forEach((button) => {
//   button.addEventListener("click", () => {
//     button.classList.toggle("locked");
//     if (button.classList.contains("locked")) {
//       button.innerHTML = "<i class='fas fa-lock'></i>";
//     } else {
//       button.innerHTML = "<i class='fas fa-lock-open'></i>";
//     }
//   });
// });
// //functions

// function generateHex() {
//   /*
//     const letters = "#012356789ABCDEF";
//     let hash = "#";
//     for (let i = 0; i < 6; i++) {
//       hash += letters[Math.floor(Math.random() * 16)];
//     }
//     return hash;
//   */
//   const hexColor = chroma.random();
//   return hexColor;
// }

// function randomizeColor() {
//   initialColors = [];
//   colorDivs.forEach((div, index) => {
//     const hexText = div.children[0];
//     const randomColor = generateHex();
//     if (div.children[1].children[1].classList.contains("locked")) {
//       initialColors.push(hexText.innerText);
//       return;
//     } else {
//       initialColors.push(chroma(randomColor).hex());
//     }

//     div.style.backgroundColor = randomColor;
//     hexText.innerText = randomColor;

//     /*contrast check*/
//     getTextContrast(randomColor, hexText);

//     const color = chroma(randomColor);
//     const sliders = div.querySelectorAll(".sliders input");
//     const hue = sliders[0];
//     const brightness = sliders[1];
//     const saturation = sliders[2];

//     colorizeSliders(color, hue, brightness, saturation);
//   });
//   resetInputs();
//   //button contrasts
//   adjustButton.forEach((button, index) => {
//     getTextContrast(initialColors[index], button);
//     getTextContrast(initialColors[index], lockButton[index]);
//   });
// }

// function getTextContrast(color, text) {
//   const luminance = chroma(color).luminance();
//   if (luminance > 0.5) {
//     text.style.color = "#333";
//   } else {
//     text.style.color = "#fff";
//   }
// }

// function colorizeSliders(color, hue, brightness, saturation) {
//   /* saturation */
//   const noSat = color.set("hsl.s", 0);
//   const fullSat = color.set("hsl.s", 1);
//   const scaleSat = chroma.scale([noSat, color, fullSat]);
//   /* brightness */
//   const midBright = color.set("hsl.l", 0.5);
//   const scaleBright = chroma.scale(["black", midBright, "white"]);
//   /* brightness */

//   /*update input*/
//   saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(
//     0
//   )}, ${scaleSat(1)})`;
//   brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(
//     0
//   )},${scaleBright(0.5)},  ${scaleBright(1)})`;
//   hue.style.backgroundImage = `linear-gradient(to right,
//      rgb(204,75,75),
//       rgb(204,204,75),
//        rgb(75,204,75),
//         rgb(75,204,204),
//          rgb(75,75,204),
//           rgb(204,75,204),
//            rgb(204,75,75))`;
// }

// function hslControls(e) {
//   const index =
//     e.target.getAttribute("data-bright") ||
//     e.target.getAttribute("data-sat") ||
//     e.target.getAttribute("data-hue");

//   let sliders = e.target.parentElement.querySelectorAll("input[type='range']");

//   const hue = sliders[0];
//   const brightness = sliders[1];
//   const saturation = sliders[2];

//   const bgColor = initialColors[index];
//   let color = chroma(bgColor)
//     .set("hsl.s", saturation.value)
//     .set("hsl.l", brightness.value)
//     .set("hsl.h", hue.value);

//   colorDivs[index].style.backgroundColor = color;
//   //colorize sliders
//   colorizeSliders(color, hue, saturation, brightness);
// }

// function updateTextUI(index) {
//   const activeDiv = colorDivs[index];
//   const color = chroma(activeDiv.style.backgroundColor);
//   const textHex = activeDiv.querySelector("h2");
//   const icons = activeDiv.querySelectorAll(".controls button");
//   textHex.innerText = color.hex();

//   //check text contrast
//   getTextContrast(color, textHex);
//   for (icon of icons) {
//     getTextContrast(color, icon);
//   }
// }

// function resetInputs() {
//   const sliders = document.querySelectorAll(".sliders input");
//   sliders.forEach((slider) => {
//     if (slider.name === "hue") {
//       const hueColor = initialColors[slider.getAttribute("data-hue")];
//       const hueValue = chroma(hueColor).hsl()[0];
//       slider.value = Math.floor(hueValue);
//     }
//     if (slider.name === "brightness") {
//       const brightColor = initialColors[slider.getAttribute("data-bright")];
//       const brightValue = chroma(brightColor).hsl()[2];
//       slider.value = Math.floor(brightValue * 100) / 100;
//     }
//     if (slider.name === "saturation") {
//       const satColor = initialColors[slider.getAttribute("data-sat")];
//       const satValue = chroma(satColor).hsl()[1];
//       slider.value = Math.floor(satValue * 100) / 100;
//     }
//   });
// }

// function copyToClipboard(hex) {
//   const el = document.createElement("textarea");
//   el.value = hex.innerText;
//   document.body.appendChild(el);
//   el.select();
//   document.execCommand("copy");
//   document.body.removeChild(el);
//   /* animation */
//   const popupBox = popup.children[0];
//   popupBox.classList.add("active");
//   popup.classList.add("active");
// }

// function toggleAdjustmentPanel(index) {
//   sliderContainers[index].classList.toggle("active");
// }
// function closeAdjustmentPanel(index) {
//   sliderContainers[index].classList.remove("active");
// }

// /* palette work */

// //variables
// const saveBtn = document.querySelector(".save");
// const submitSave = document.querySelector(".submit-save");
// const closeSave = document.querySelector(".close-save");
// const saveContainer = document.querySelector(".save-container");
// const saveInput = document.querySelector(".save-container input");
// const libraryContainer = document.querySelector(".library-container");
// const libraryBtn = document.querySelector(".library");
// const closeLibraryBtn = document.querySelector(".close-library");
// //Event listeners
// saveBtn.addEventListener("click", openPalette);
// closeSave.addEventListener("click", closePalette);
// submitSave.addEventListener("click", savePalette);
// libraryBtn.addEventListener("click", openLibrary);
// closeLibraryBtn.addEventListener("click", closeLibrary);

// //Functions

// function openPalette(e) {
//   const popup = saveContainer.children[0];
//   saveContainer.classList.add("active");
// }
// function closePalette(e) {
//   const popup = saveContainer.children[0];
//   saveContainer.classList.remove("active");
// }

// function savePalette(e) {
//   saveContainer.classList.remove("active");
//   popup.classList.remove("active");
//   const name = saveInput.value;
//   const colors = [];
//   currentHexes.forEach((hex) => {
//     colors.push(hex.innerText);
//   });
//   /*local storage */
//   let paletteNr;
//   paletteObjects = JSON.parse(localStorage.getItem("palettes"));
//   if (paletteObjects) {
//     paletteNr = paletteObjects.length;
//   } else {
//     paletteNr = savedPalettes.length;
//   }
//   const paletteObj = { name, colors, nr: paletteNr };
//   savedPalettes.push(paletteObj);

//   savetoLocal(paletteObj);
//   saveInput.value = "";
//   /*generate for library */
//   createPalettes(paletteObj, savedPalettes, "create");
// }

// function savetoLocal(obj) {
//   let localPalettes;
//   if (localStorage.getItem("palettes") === null) {
//     localPalettes = [];
//   } else {
//     localPalettes = JSON.parse(localStorage.getItem("palettes"));
//   }
//   localPalettes.push(obj);
//   localStorage.setItem("palettes", JSON.stringify(localPalettes));
// }

// function openLibrary() {
//   const popup = libraryContainer.children[0];
//   libraryContainer.classList.add("active");
//   popup.classList.add("active");
// }
// function closeLibrary() {
//   const popup = libraryContainer.children[0];
//   libraryContainer.classList.remove("active");
//   popup.classList.remove("active");
// }

// function createPalettes(objOne, objTwo, todo) {
//   const palette = document.createElement("div");
//   const title = document.createElement("h4");
//   const preview = document.createElement("div");
//   palette.classList.add("custom-palette");
//   title.innerText = objOne.name;
//   preview.classList.add("small-preview");
//   objOne.colors.forEach((color) => {
//     const smallDiv = document.createElement("div");
//     smallDiv.style.background = color;
//     preview.appendChild(smallDiv);
//   });
//   const paletteBtn = document.createElement("button");
//   const paletteDeleteBtn = document.createElement("button");
//   paletteBtn.classList.add("pick-palette-btn");
//   paletteBtn.classList.add(objOne.nr);
//   paletteBtn.innerText = "select";

//   paletteDeleteBtn.classList.add("delete-palette");
//   paletteDeleteBtn.classList.add(objOne.nr);
//   paletteDeleteBtn.innerHTML = "<i class='fas fa-trash'></i>";

//   //attatch event to button
//   paletteBtn.addEventListener("click", (e) => {
//     closeLibrary();
//     let i = -1;
//     let paletteIndex;
//     objTwo.forEach((x) => {
//       i++;
//       if (e.target.classList[1] == x.nr) {
//         paletteIndex = i;
//       }
//     });

//     initialColors = [];
//     objTwo[paletteIndex].colors.forEach((color, index) => {
//       initialColors.push(color);
//       colorDivs[index].style.background = color;
//       const text = colorDivs[index].children[0];
//       getTextContrast(color, text);
//       updateTextUI(index);
//     });

//     if (todo === "retrieve") {
//       resetInputs();
//     }
//   });

//   paletteDeleteBtn.addEventListener("click", (e) => {
//     const index = e.target.classList[1];
//     deletePalette(e, index);
//   });

//   //append to library
//   palette.appendChild(title);
//   palette.appendChild(preview);
//   palette.appendChild(paletteBtn);
//   palette.appendChild(paletteDeleteBtn);
//   libraryContainer.children[0].appendChild(palette);
// }

// function getLocal() {
//   if (localStorage.getItem("palettes") === null) {
//     localPalettes = [];
//   } else {
//     const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
//     paletteObjects.forEach((paletteObj) => {
//       createPalettes(paletteObj, paletteObjects, "retrieve");
//     });
//   }
// }

// function deletePalette(e, index) {
//   const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
//   let i = 0;
//   paletteObjects.forEach((x) => {
//     if (x.name === e.target.parentElement.children[0].innerText) {
//       paletteObjects.splice(i, 1);
//       console.log(`removed ${i}: @${x.name}`);
//     }
//   });
//   updatedPalettes = JSON.stringify(paletteObjects);
//   localStorage.setItem("palettes", updatedPalettes);
//   e.target.parentElement.remove();
// }

// /* END palette work */
// getLocal();
// randomizeColor();