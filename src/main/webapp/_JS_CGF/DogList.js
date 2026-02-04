"use strict";

function DogList() {
    const container = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "Dog Information Entry";
    container.appendChild(title);

    const dog1 = MakeDog({
        name: "Buddy",
        breed: "Golden Retriever",
        age: 4,
        tag: "BUD-003",
        description: "Loves walks and playing fetch.",
        energyLevel: 7,
        imgSrc: "pics/Golden.jpeg"
    });

    const dog2 = MakeDog({
        name: "Luna",
        breed: "Border Collie",
        age: 2,
        tag: "LUN-005",
        description: "Very Playful. Great with other dogs.",
        energyLevel: 9,
        imgSrc: "pics/Border.jpeg"
    });

    const dog3 = MakeDog({});

    container.appendChild(dog1);
    container.appendChild(dog2);
    container.appendChild(dog3);

    container.querySelectorAll(".dog").forEach(dog => {
        dog.style.marginBottom = "20px";
    });

    return container;
}