

const sliders = document.querySelectorAll(".sliderCont__container");

if(sliders.length > 0)
{
    const rootClassName = ".sliderCont";
    sliders.forEach((element, key) => {


        let nextButton = element.querySelector(rootClassName+"__button--next");
        let backButton = element.querySelector(rootClassName+"__button--back");
        let workerContainer = element.querySelector(rootClassName+"__worker");

        function buttonSliderClick(e, type)
        {
            let actualPageId = workerContainer.getAttribute("data-id-state");
            let maxId = workerContainer.querySelectorAll("article").length;

            workerContainer.classList.remove("state"+actualPageId);
            if(e.target.getAttribute("data-type-button") > 0)
                actualPageId++;
            else
                actualPageId--;
            element.querySelectorAll(rootClassName+"__button").forEach((buttons)=>{buttons.classList.remove("disabled");});


            if(actualPageId < 1)
                actualPageId = 1;
            else if(actualPageId > maxId)
                actualPageId = maxId;
            if(actualPageId === 1)
                e.target.classList.add("disabled");
            if(actualPageId === maxId)
                e.target.classList.add("disabled");

            workerContainer.classList.add("state"+actualPageId);
            workerContainer.setAttribute("data-id-state", actualPageId);

        }

        nextButton.addEventListener("click", buttonSliderClick.bind(1));
        backButton.addEventListener("click", buttonSliderClick.bind(0));


    });
}


const zoom = document.querySelectorAll(".zoom");

zoom.forEach((element, key) => {

    const magnifier = document.createElement("div");
    const photoSource = element.querySelector("img").getAttribute("src");

    magnifier.classList.add("magnifier");
    magnifier.style.backgroundImage = "url("+photoSource+")";

    element.appendChild(magnifier);
    element.addEventListener("mouseenter", (e)=>{
        console.log(e);
    });
    element.addEventListener("mouseleave", (e)=>{
        console.log(e);
    });

    element.addEventListener("mousemove", (e)=>{
        let mousePosX = e.clientX;
        let mousePosY = e.clientY;
        let photoBounding = element.getBoundingClientRect(),
            x = e.clientX - photoBounding.left,
            y = e.clientY - photoBounding.top,
            photoSize = parseInt(window.getComputedStyle(element).height),
            magSize = parseInt(window.getComputedStyle(magnifier).height);

        x -= magSize/2;
        y -= magSize/2;
        magnifier.style.left = e.clientX-magSize/2+"px";
        magnifier.style.top = e.clientY-magSize/2+"px";
        magnifier.style.backgroundSize = photoSize+"px";
    });

});
