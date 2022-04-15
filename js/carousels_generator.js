var typeToLink = {
    "marketplace": "Marketplace Link",
    "programming": "GitHub Link",
    "mods": "CurseForge Link",
    "maps": "Planet Minecraft Link"
}

function populateProjectInfo(projects, type) {
    if (type != "marketplace" && type != "programming" && type != "mods" && type != "maps") return;

    var row = document.getElementById("main_row");

    for (let project of projects) {

        let columnDiv = document.createElement("div");
        columnDiv.classList.add("col");


        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "shadow-sm");

        let cardCarouselControlsDiv = document.createElement("div");
        cardCarouselControlsDiv.id = project.id + "_carousel";
        cardCarouselControlsDiv.classList.add("carousel", "slide", "carousel-fade");
        cardCarouselControlsDiv.setAttribute("data-bs-ride", "carousel");
        cardCarouselControlsDiv.setAttribute("data-bs-interval", "false")

        let carouselInnerDiv = document.createElement("div");
        carouselInnerDiv.classList.add("carousel-inner");


        for (let imageSrc of project.images) {
            let carouselItemDiv = document.createElement("div");
            carouselItemDiv.classList.add("carousel-item");
            if (imageSrc.source.includes("keyart")) {
                carouselItemDiv.classList.add("active");
            }

            let image = document.createElement("img");
            image.classList.add("d-block", "w-100", "img-fluid");
            image.src = `pictures/${type}/${project.id}/${imageSrc.source}`;

            let captionDiv = document.createElement("div");
            captionDiv.classList.add("carousel-caption", "d-none", "d-md-block");

            let description = document.createElement("p");
            description.textContent = imageSrc.subtitle;

            if (!imageSrc.source.includes("keyart") && imageSrc["subtitle"] !== undefined) {
                captionDiv.appendChild(description);
            }
            carouselItemDiv.appendChild(captionDiv);
            carouselItemDiv.appendChild(image);
            carouselInnerDiv.appendChild(carouselItemDiv);
        }

        cardCarouselControlsDiv.appendChild(carouselInnerDiv);

        if (project.images.length > 1) {
            for (let direction of ["prev", "next"]) {
                let carouselButton = document.createElement("button");
                carouselButton.type = "button";
                carouselButton.setAttribute("data-bs-target", `#${project.id}_carousel`);
                carouselButton.setAttribute("data-bs-slide", direction);
                carouselButton.classList.add(`carousel-control-${direction}`);
    
                let carouselButtonIcon = document.createElement("span");
                carouselButtonIcon.classList.add(`carousel-control-${direction}-icon`);
                carouselButtonIcon.setAttribute("aria-hidden", "true");
    
                let carouselButtonText = document.createElement("span");
                carouselButtonText.classList.add(`visually-hidden`);
                carouselButtonText.textContent = direction == "prev" ? "Previous" : "Next";
    
                carouselButton.appendChild(carouselButtonIcon);
                carouselButton.appendChild(carouselButtonText);
    
                cardCarouselControlsDiv.appendChild(carouselButton);
            }
        }


        let cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");

        let cardTitle = document.createElement("h4");
        cardTitle.textContent = project.name;
        cardTitle.classList.add("card-title", "fw-bold");

        let cardText = document.createElement("p");
        cardText.textContent = project.description;
        cardText.classList.add("card-text", "align-text-bottom", "lh-base");


        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);

        if (project.link !== undefined) {
            let link = document.createElement("a");
            link.textContent = typeToLink[type];
            link.href = project.link;
            cardBodyDiv.appendChild(link);
        }

        if (type == "mods") {
            let cardRow = document.createElement("div");
            cardRow.classList.add("row", "g-0");

            let carouselColumn = document.createElement("div");
            carouselColumn.classList.add("col-md-4");
            carouselColumn.appendChild(cardCarouselControlsDiv);
            cardRow.appendChild(carouselColumn)

            let cardBodyColumn = document.createElement("div");
            cardBodyColumn.classList.add("col-md-8");
            cardBodyColumn.appendChild(cardBodyDiv);
            cardRow.appendChild(cardBodyColumn);

            cardDiv.appendChild(cardRow);
            columnDiv.appendChild(cardDiv);
        }
        else {
            cardDiv.appendChild(cardCarouselControlsDiv);
            cardDiv.appendChild(cardBodyDiv);

            columnDiv.appendChild(cardDiv);
        }


        row.appendChild(columnDiv);
    }
}