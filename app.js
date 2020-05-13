

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
    magnifier.style.backgroundSize = "2000%";
    magnifier.classList.add("disabled");
    element.addEventListener("click", (e) =>{
        e.target.classList.toggle('smallScale');
        console.log(e.target.parentNode.classList.toggle("row"));
    });

    element.appendChild(magnifier);
    element.addEventListener("mouseenter", (e)=>{
        magnifier.classList.remove("disabled");
    });
    element.addEventListener("mouseleave", (e)=>{
        magnifier.classList.add("disabled");
    });

    element.addEventListener("mousemove", (e)=>{
        let mousePosX = e.clientX;
        let mousePosY = e.clientY;
        let options = e.target.getBoundingClientRect();

        let magnifierWidth = magnifier.offsetWidth;
        let magnifierHeight = magnifier.offsetHeight;

        let positionTop = e.clientY - options.top;
        let topPercent = ((positionTop) / options.height)*100;

        let positionLeft = e.clientX - options.left;
        let leftPercent = ((positionLeft ) / options.width)*100;

        if(positionTop + parseInt(magnifierHeight)/2 < options.height && positionTop - parseInt(magnifierHeight)/2  > 0)
            magnifier.style.top = positionTop - magnifierWidth/2 + "px";

        if(positionLeft + parseInt(magnifierWidth)/2 < options.width && positionLeft - parseInt(magnifierHeight)/2  > 0)
            magnifier.style.left = positionLeft - magnifierWidth/2 + "px";



        magnifier.style.backgroundPosition = (leftPercent)+"%" + (topPercent)+"% ";
    });

});
