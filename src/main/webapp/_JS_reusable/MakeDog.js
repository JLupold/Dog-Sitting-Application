"use strict";

function MakeDog({
    name = "Unknown",
    breed = "Unknown",
    age = 0,
    tag = "",
    description = "No description",
    energyLevel = 5,
    imgSrc = "pics/bulldog.jpeg"
} = {}) {
    
    const container = document.createElement("div");
    container.classList.add("dog");

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = name;
    img.style.width = "200px";
    img.style.height = "auto";

    //Name
    const nameEl = document.createElement("h2");
    nameEl.textContent = name;

    //Breed
    const breedEl = document.createElement("p");
    breedEl.innerHTML = `<strong>Breed:</strong> ${breed}`;

    //Age
    const ageEl = document.createElement("p");
    ageEl.innerHTML = `<strong>Age:</strong> ${age} years`;
    const ageInput = document.createElement("input");
    ageInput.type = "number";
    ageInput.value = age;
    ageInput.min = 0;
    ageInput.addEventListener("input", () => {
        ageEl.innerHTML = `<strong>Age:</strong> ${ageInput.value} years`;
    });

    //Tag
    const tagEl = document.createElement("p");
    tagEl.innerHTML = `<strong>Tag:</strong> ${tag}`;
    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.value = tag;
    tagInput.addEventListener("input", () => {
        tagEl.innerHTML = `<strong>Tag:</strong> ${tagInput.value}`;
    });

    //Description
    const descEl = document.createElement("p");
    descEl.textContent = description;

    //Energy Level
    const energyEl = document.createElement("p");
    energyEl.innerHTML = `<strong>Energy Level:</strong> ${energyLevel}`;
    const energySlider = document.createElement("input");
    energySlider.type = "range";
    energySlider.min = 0;
    energySlider.max = 10;
    energySlider.value = energyLevel;
    energySlider.addEventListener("input", () => {
        energyEl.innerHTML = `<strong>Energy Level:</strong> ${energySlider.value}`;
    });

    container.appendChild(img);
    container.appendChild(nameEl);
    container.appendChild(breedEl);
    container.appendChild(ageEl);
    container.appendChild(ageInput);
    container.appendChild(tagEl);
    container.appendChild(tagInput);
    container.appendChild(descEl);
    container.appendChild(energyEl);
    container.appendChild(energySlider);

    return container;
}