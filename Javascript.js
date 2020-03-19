(function() {
    const minFråga = [
        {
            fråga: "Vad är det här?",
            Svar: {
                A: "Strålrör"
                B: "Strålkastare"
                C: "Elefant"
            },
            rättSvar: "A"

        },
        {
            fråga: "Vad är det här?",
            Svar: {
                A: "Rökdykare"
                B: "Mask"
                C: "Skyddsbarrier"
            },
            rättSvar: "C"

        },
        {
            fråga: "Hur lång tid har brandmän på sig att ta sig från där dom är på stationen till brandbilarna när larmet går?",
            Svar: {
                A: "20 sekunder"
                B: "2 minuter"
                C: "90 ,sekunder"
            },
            rättSvar: "C"

        },
    ];

    function buildQuiz() {

        const output = [];

        minFråga.forEach((currentQuestion,frågaNummer => {

            const svar = [];

            for (letter in currentQuestion.svar) {
                    svar.push (
                        `<label>
                            <input type="radio" name="fråga${frågaNummer}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.svar[letter]}
                        </label>`
                    );
                }

                output.push (
                    `<div class="slide">
                    <div class="fråga"> ${currentQuestion.fråga} </div>
                    <div class="svar"> ${svar.join("")} </div>
                    </div>`
                );
        });

        Container.innerHTML = output.join("");
    }

    function visaResultat() {
        const svarContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    minFråga.forEach((currentQuestion, frågaNummer) => {

      const svarContainer = svarContainers[frågaNummer];
      const selector = `input[name=fråga${frågaNummer}]:checked`;
      const användaresSvar = (svarContainer.querySelector(selector) || {}).value;


      if (användaresSvar === currentQuestion.rättSvar) {
        numCorrect++;
        svarContainers[frågaNummer].style.color = "lightgreen";
      } else {
        svarContainers[frågaNummer].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${minFråga.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      förraButton.style.display = "none";
    } else {
      förraButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nästatButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nästaButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function visaNästaSlide() {
    showSlide(currentSlide + 1);
  }

  function visaFörraSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("resultat");
  const submitButton = document.getElementById("Rätta");

  buildQuiz();

  const förraButton = document.getElementById("förra");
  const nästaButton = document.getElementById("nästa");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  submitButton.addEventListener("click", visaResultat);
  förraButton.addEventListener("click", visaFörraSlide);
  nästaButton.addEventListener("click", visaNästaSlide);
})();


