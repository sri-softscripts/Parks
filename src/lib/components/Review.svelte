<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$lib/components/Footer.svelte";

  type Option = {
    key: string;
    text: string;
    isCorrect?: boolean;
    explanation?: string;
  };
  type Question = {
    id: number;
    text: string;
    backgroundImage: string;
    options: Option[];
    correctAnswer: string;
    buttonColor: string;
  };
  // Quiz state
  let quizStarted = false;
  let currentQuestionIndex = 0;
  let selectedAnswer: string | null = null;
  let answeredQuestions = new Set<number>();
  let quizCompleted = false;
  let score = 0;

  // Questions data
 const questions: Question[] = [
   {
     id: 1,
     text: "The relative strength of soundwaves which we perceive as loudness or volume is the definition of:",
     buttonColor:"light-yellow",
     backgroundImage: "/images/quiz-bg-2.png",
     correctAnswer: "d",
     options: [
       { key: "a", text: "Frequency", explanation:"Frequency is the number of times per second that a sound pressure wave repeats itself!" },
       { key: "b", text: "Propagation", explanation:"Propagation is how a soundwave travels outward from the source through a medium, like air or water." },
       { key: "c", text: "Acoustic zones", explanation:"Acoustic zones are areas with similar vegetation, terrain, animals, and weather. They likely have similar acoustic characteristics, including sound sources and sound characteristics."},
       { key: "d", text: "Decibels",explanation:"", isCorrect: true }
     ]
   },
   {
     id: 2,
     text: "If a sound goes from 20 decibels to 40 decibels, how many times greater would be the perceived change in loudness to people?",
     buttonColor:"light-yellow",
     backgroundImage: "/images/quiz-bg-2.png",
     correctAnswer: "b",
     options: [
       { key: "a", text: "2x louder", explanation:"" },
       { key: "b", text: "4x louder",explanation:"Decibels are a on a logarithmic scale. An increase of 10 dB represents a ten-fold increase in sound level, which causes perceived loudness to double", isCorrect: true },
       { key: "c", text: "8x louder", explanation:"" },
       { key: "d", text: "12x louder", explanation:"" }
     ]
   },
   {
     id: 3,
     text: "The impacts of road noise can extend of one mile into a forest.",
     buttonColor:"light-yellow",
     backgroundImage: "/images/quiz-bg-2.png",
     correctAnswer: "a",
     options: [
       { key: "a", text: "True", explanation:"", isCorrect: true },
       { key: "b", text: "False", explanation:"" }
     ]
   },
   {
     id: 4,
     text: "A soundscape is defined as:",
     buttonColor:"light-yellow",
     backgroundImage: "/images/quiz-bg-2.png",
     correctAnswer: "a",
     options: [
       { key: "a", text: "The human, or animal, perception of all combined acoustic resources.",explanation:"", isCorrect: true },
       { key: "b", text: "Physical sound sources including natural sounds (wind, water, wildlife, vegetation, etc.) and cultural and historic sounds (battle reenactments, tribal ceremonies, etc.)", explanation:"This is definition of accoustic resources." },
       { key: "c", text: "The period of time between noise events, during which no human-caused sounds are audible.",explanation:"", },
       { key: "d", text: "How sound travels", explanation:"This is the definition of propagation." }
     ]
   },
   {
     id: 5,
     text: "A spectrogram is a visual representation of acoustic measurements. Which of the following is not an axis of a spectrogram?",
     buttonColor:"green",
     backgroundImage: "/images/quiz-bg-3.png",
     correctAnswer: "a",
     options: [
       { key: "a", text: "Movement",explanation:"", isCorrect: true },
       { key: "b", text: "Time",explanation:"" },
       { key: "c", text: "Frequency",explanation:"", },
       { key: "d", text: "Intensity",explanation:"" }
     ]
   },
   {
     id: 6,
     text: "Masking is defined as:",
     buttonColor:"green",
     backgroundImage: "/images/quiz-bg-3.png",
     correctAnswer: "b",
     options: [
       { key: "a", text: "The composition of the natural sound conditions in a park that exist in the absence of any human-made noise.", explanation:"This is the defination of natural ambient." },
       { key: "b", text: "The process by which the ability to hear a sound is reduced by the presence of another sound", explanation:"Just as smog limits visibility, masking limits the ability to hear a sound.", isCorrect: true },
       { key: "c", text: "Any non-natural, human-caused sound.", explanation:"This is just noise." },
       { key: "d", text: "A graphical representation of acoustic measurements", explanation:"This is explanation for a spectrogram." }
     ]
   },
   {
     id: 7,
     text: "Which of the following animal behaviors are affected by human-caused noise?",
     buttonColor:"green",
     backgroundImage: "/images/quiz-bg-3.png",
     correctAnswer: "e",
     options: [
       { key: "a", text: "Mating", explanation:"" },
       { key: "b", text: "Habitat patterns", explanation:"" },
       { key: "c", text: "Hunting/ability to find prey", explanation:"" },
       { key: "d", text: "Predator avoidance" , explanation:"" },
       { key: "e", text: "All of the above",explanation:"", isCorrect: true }
     ]
   },
   {
     id: 8,
     text: "Research shows that human-caused noise affects ground-squirrels by:",
     buttonColor:"green",
     backgroundImage: "/images/quiz-bg-3.png",
     correctAnswer: "b",
     options: [
       { key: "a", text: "Waking them up from their hibernation" },
       { key: "b", text: "Spend less time foraging for food", explanation:"In noisy areas, ground squirrels spend more time watching out for predators. This reduces the amount of time foraging", isCorrect: true },
       { key: "c", text: "Reducing the number of young a female can produce over her lifetime",explanation:"" },
       { key: "d", text: "All of the above",explanation:"" }
     ]
   },
   {
     id: 9,
     text: "Bats spend more time foraging near roads because insects have a harder time detecting them.",
     buttonColor:"blue",
     backgroundImage: "/images/quiz-bg-4.png",
     correctAnswer: "b",
     options: [
       { key: "a", text: "True", explanation:"Bats spend less time foraging in areas with road noise" },
       { key: "b", text: "False",explanation:"", isCorrect: true }
     ]
   },
   {
     id: 10,
     text: "Airplane and traffic noise have which of the following physiological effects on people?",
     buttonColor:"blue",
     backgroundImage: "/images/quiz-bg-4.png",
     correctAnswer: "d",
     options: [
       { key: "a", text: "Increased stress hormones", explanation:"" },
       { key: "b", text: "High blood pressure", explanation:"" },
       { key: "c", text: "Increased heart rate", explanation:"" },
       { key: "d", text: "All of the above", isCorrect: true, explanation:"" },
       { key: "e", text: "None of the above", explanation:"" }
     ]
   },
   {
     id: 11,
     text: "Human-caused noise may impact visitors perceptions of the aesthetic quality of a landscape.",
     buttonColor:"blue",
     backgroundImage: "/images/quiz-bg-4.png",
     correctAnswer: "a",
     options: [
       { key: "a", text: "True", explanation:"One Study shows that human-caused noise may impact visitors perceptions of the aesthetic quality of a landscape.", isCorrect: true },
       { key: "b", text: "False", explanation:"" }
     ]
   },
   {
     id: 12,
     text: "____ % of Americans say that one of the most important reasons for preserving the national parks is to provide opportunities to experience natural peace and the sounds of nature.",
     buttonColor:"blue",
     backgroundImage: "/images/quiz-bg-4.png",
     correctAnswer: "b",
     options: [
       { key: "a", text: "53%", explanation:"" },
       { key: "b", text: "95%", explanation:"A Whooping 95% of Americans!", isCorrect: true },
       { key: "c", text: "74%", explanation:"" },
       { key: "d", text: "15%", explanation:"" }
     ]
   },
   {
     id: 13,
     text: "Fill in the blank. Human-caused noise reduces a person or animals _______. This can impact animals' ability to communicate with others of their own species, find prey, and detect predators.",
     buttonColor:"yellow",
     backgroundImage: "/images/quiz-bg-5.png",
     correctAnswer: "a",
     options: [
       { key: "a", text: "Listening area", explanation:"Listening area is the region that an organism can gain information about its environment from the soundscape" , isCorrect: true },
       { key: "b", text: "Para-acoustical depth", explanation:"" },
       { key: "c", text: "Propinquity of perceptions", explanation:"" },
       { key: "d", text: "All of the above", explanation:"" }
     ]
   },
   {
     id: 14,
     text: "Education and interpretation can be used to:",
     buttonColor:"yellow",
     backgroundImage: "/images/quiz-bg-5.png",
     correctAnswer: "d",
     options: [
       { key: "a", text: "Influence visitor behaviors to reduce human-caused noise.", explanation:"", isCorrect: true },
       { key: "b", text: "Increase the acceptability of human-caused noise.", explanation:"" },
       { key: "c", text: "Enhance the appreciation of soundscape resources.", explanation:"" },
       { key: "d", text: "All of the above", explanation:"", }
     ]
   },
   {
     id: 15,
     text: "Which one of the following is not a tip for managing soundscapes",
     buttonColor:"yellow",
     backgroundImage: "/images/quiz-bg-5.png",
     correctAnswer: "d",
     options: [
       { key: "a", text: "Use quiet technology" , explanation:""},
       { key: "b", text: "Work with maintenance crews", explanation:"" },
       { key: "c", text: "Use zoning", explanation:"" },
       { key: "d", text: "Apply transitional functions", explanation:"", isCorrect: true }
     ]
   },
   {
     id: 16,
     text: "\"A science-based decision making process where managers set desired conditions, create indicators and standards of quality, and use science-based approaches to measure change and efficacy of management actions/\" is the definition of:",
     buttonColor:"yellow",
     backgroundImage: "/images/quiz-bg-5.png",
     correctAnswer: "b",
     options: [
       { key: "a", text: "Synergy cycling" , explanation:""},
       { key: "b", text: "Management-by-objectives", explanation:"", isCorrect: true },
       { key: "c", text: "Frequency of use frameworks", explanation:"" },
       { key: "d", text: "Inductive processing", explanation:"" }
     ]
   }
 ];

  // Computed values
  $: currentQuestion = questions[currentQuestionIndex];
  $: currentBackground = quizCompleted
    ? "/images/quiz-bg-6.png"
    : quizStarted
      ? currentQuestion?.backgroundImage || "/images/quiz-bg-1.png"
      : "/images/quiz-bg-1.png";
  $: isCurrentQuestionAnswered = answeredQuestions.has(currentQuestionIndex);
  $: progressPercentage =
    quizStarted && !quizCompleted
      ? (answeredQuestions.size / questions.length) * 100
      : 0;

  // Event handlers
  const startQuiz = (): void => {
    quizStarted = true;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    answeredQuestions = new Set();
    quizCompleted = false;
    score = 0;
  };

  let showExplanationForOption: string | null = null;
  let userAnswers: Record<number, string> = {};

  const handleAnswerSelect = (optionKey: string): void => {
    if (isCurrentQuestionAnswered || quizCompleted) return;

    selectedAnswer = optionKey;
    // Store user's answer
    userAnswers[currentQuestion.id] = optionKey;
    // Show explanation for the selected option
    showExplanationForOption = optionKey;

    // Add current question to answered questions
    const updatedSet = new Set(answeredQuestions);
    updatedSet.add(currentQuestionIndex);
    answeredQuestions = updatedSet;

    // Check if answer is correct
    if (optionKey === currentQuestion.correctAnswer) {
      score++;
    }
  };

  const nextQuestion = (): void => {
    if (!isCurrentQuestionAnswered) return;

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      selectedAnswer = null;
      showExplanationForOption = null; // Reset explanation
    }
  };

  const finishQuiz = (): void => {
    if (!isCurrentQuestionAnswered) return;
    quizCompleted = true;
  };

  const retakeQuiz = (): void => {
    quizStarted = false;
    currentQuestionIndex = 0;
    selectedAnswer = null;
    answeredQuestions = new Set();
    quizCompleted = false;
    score = 0;
    showExplanationForOption = null;
    userAnswers = {}; // Reset user answers
  };

  // Check if option should show O icon (correct)
  const shouldShowOCircle = (optionKey: string): boolean => {
    if (!isCurrentQuestionAnswered) return false;

    // Show O for correct answer (always when question is answered)
    return optionKey === currentQuestion.correctAnswer;
  };

  // Check if option should show X icon (incorrect selected)
  const shouldShowXCross = (optionKey: string): boolean => {
    if (!isCurrentQuestionAnswered) return false;

    // Show X for selected incorrect answer
    return (
      selectedAnswer === optionKey &&
      optionKey !== currentQuestion.correctAnswer
    );
  };

  // Get classes for option styling
  const getOptionClasses = (optionKey: string): string => {
    const classes = [];

    if (isCurrentQuestionAnswered) {
      // Add answered class to disable clicking
      classes.push("answered");

      // Add correct class for correct answer (always shown when answered)
      if (optionKey === currentQuestion.correctAnswer) {
        classes.push("correct");
      }

      // Add incorrect class for selected incorrect answer
      if (
        selectedAnswer === optionKey &&
        optionKey !== currentQuestion.correctAnswer
      ) {
        classes.push("incorrect");
      }
    }

    return classes.join(" ");
  };

  onMount(() => {
    console.log("Review component mounted with", questions.length, "questions");
  });
</script>

<section id="review" class="review-section">
  <div class="page-inner">
    <div class="page-content">
      <!-- Background -->
      <div class="background-container">
        <div
          class="background-image"
          style="background-image: url('{currentBackground}');"
        ></div>
      </div>

      <!-- Welcome Screen -->
      {#if !quizStarted}
        <div class="welcome-screen">
          <div class="welcome-content">
            <h1 class="welcome-title">SOUNDBOARD QUIZ</h1>
            <button class="start-button" on:click={startQuiz}
              >Start Quiz<span class="arrow">»</span>
            </button>
          </div>
        </div>

        <div class="footer-div-out">
<Footer nextPage="/learn-more"  hikerColor="#000" textColor="#000" arrowDisplay="none"/>
</div>
      {:else if quizCompleted}
        <!-- Completion Screen - Properly centered -->
        <div class="completion-screen-wrapper">
          <div class="completion-screen">
            <div class="completion-content">
              <div class="completion-header">
                <h3 class="completion-title">CONGRATULATIONS!</h3>
                <p class="completion-subtitle">
                  You have completed the quiz. Review your results.
                </p>
              </div>

              <!-- Question Grid -->
              <div class="question-grid">
                {#each questions as question, index}
                  <div class="question-number">
                    <span>{index + 1}</span>
                    {#if userAnswers[question.id] === question.correctAnswer}
                      <!-- Correct answer -->
                      <div class="question-indicator correct" title="Correct">
                        <img
                          loading="lazy"
                          height="16"
                          width="16"
                          alt=""
                          src="/icons/icon-benefit.svg"
                        />
                      </div>
                    {:else if userAnswers[question.id]}
                      <!-- Incorrect answer -->
                      <div
                        class="question-indicator incorrect"
                        title="Incorrect"
                      >
                        <img
                          loading="lazy"
                          height="14"
                          width="14"
                          alt=""
                          src="/icons/icon-negative.svg"
                        />
                      </div>
                    {:else}
                      <!-- Not answered (shouldn't happen, but just in case) -->
                      <div
                        class="question-indicator not-answered"
                        title="Not answered"
                      >
                        {index + 1}
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>

              <footer class="completion-footer">
                <!-- <button class="retake-button" on:click={retakeQuiz}>Retake Quiz<span class="arrow-right">»</span></button> -->

                <button class="start-button" on:click={retakeQuiz}
                  >Retake Quiz<span class="arrow">»</span></button
                >
              </footer>
            </div>
          </div>
        </div>

        <div class="footer-div-out">
          <Footer nextPage="/learn-more" hikerColor="#fff" textColor="#fff" />
        </div>
      {:else}
        <div class="full-quiz-progress-con">
          <!-- Quiz Screen -->
          <div class="quiz-container">
            <div class="question-text-container">
              <p class="question-text">{currentQuestion.text}</p>
            </div>

            <div class="options-container">
              {#each currentQuestion.options as option}
                <div
                  class="option-item {getOptionClasses(option.key)}"
                  on:click={() =>
                    !isCurrentQuestionAnswered &&
                    handleAnswerSelect(option.key)}
                >
                  <div class="option-content">
                    <span class="option-text">
                      {#if isCurrentQuestionAnswered && showExplanationForOption === option.key}
                        <!-- Show explanation for the clicked option -->
                        {option.explanation || option.text}
                      {:else if isCurrentQuestionAnswered && option.key === currentQuestion.correctAnswer}
                        <!-- Show explanation for correct answer (if user got it wrong) -->
                        {option.explanation || option.text}
                      {:else}
                        <!-- Normal text -->
                        {option.text}
                      {/if}
                    </span>

                    <div class="option-judge">
                      {#if isCurrentQuestionAnswered}
                        {#if shouldShowOCircle(option.key)}
                          <span class="feedback-icon correct-icon">
                            <img
                              loading="lazy"
                              height="23"
                              width="20"
                              alt=""
                              src="/icons/icon-benefit.svg"
                            />
                          </span>
                        {:else if shouldShowXCross(option.key)}
                          <span class="feedback-icon incorrect-icon">
                            <img
                              loading="lazy"
                              height="22"
                              width="20"
                              alt=""
                              src="/icons/icon-negative.svg"
                            />
                          </span>
                        {/if}
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            </div>

            <!-- Navigation buttons -->
            <div class="navigation-container">
              {#if currentQuestionIndex < questions.length - 1}
                <button
                  class="nav-button next-button {currentQuestion.buttonColor} {isCurrentQuestionAnswered
                    ? 'enabled'
                    : 'disabled'}"
                  on:click={nextQuestion}
                  disabled={!isCurrentQuestionAnswered}
                >
                  Next Question
                </button>
              {:else}
                <button
                  class="nav-button finish-button {isCurrentQuestionAnswered
                    ? 'enabled'
                    : 'disabled'}"
                  on:click={finishQuiz}
                  disabled={!isCurrentQuestionAnswered}
                >
                  Finish
                </button>
              {/if}
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-container">
            <!-- <div class="progress-text">
              {answeredQuestions.size} of {questions.length}
            </div> -->

            <div class="progress-text">
  {currentQuestionIndex + 1} of {questions.length}
</div>

            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width: {progressPercentage}%;"
              ></div>
            </div>
          </div>
        </div>


          <div class="footer-div-out">
          <Footer nextPage="/learn-more" hikerColor="#fff" textColor="#fff"  arrowDisplay="none"/>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .footer-div-out {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 100000;
  }

  section .welcome-title {
    color: #000;
    font-family: 'Open Sans',sans-serif;
    /* font-weight: 300; */
    /* font-family: sans-serif; */
    
    /* font-weight: 600; */
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); */
    margin-bottom: 25px;
    font-size: 40px;
    line-height: 46px;
    letter-spacing: 7px;
    line-height: 1;
  }

  .option-item:has(.feedback-icon) {
    background: rgba(255, 255, 255, 0.5);
  }

  .full-quiz-progress-con {
    position: relative;
    display: flex;
    flex-direction: column;

    width: 100%;
    justify-content: center;
    align-items: center;
  }

  #review,
  .review-section {
    position: relative;
    height: calc(100vh - 76px);
    width: 100vw;
  }
  .page-inner,
  .page-content {
    height: 100%;
    width: 100%;
  }

  /* Background */
  .background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  /* Welcome Screen */
  .welcome-screen {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    text-align: center;
    color: white;
    width: 100%;
    max-width: 600px;
  }
  .welcome-content {
    display: block;
  }
  /* .welcome-title {
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  } */
  /* .start-button {
    cursor: pointer;
    border: none;
    background: #2970C0;
    color: white;
    padding: 8px 30px;
    border-radius: 25px;
    display: inline-flex;
    align-items: center;


        font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1;
  } */

  .start-button {
    background-color: #2970c0;
    color: #ffffff;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    border: 2px solid transparent;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 1;
    display: inline-block;
    padding: 8px 25px;
    border-radius: 50px;
  }

  span.arrow {
    font-size: 30px;
    bottom: -3px;
    position: relative;
    margin-left: 6px;
    line-height: 0;
    color: #ffffff;
  }
  .arrow-right {
    margin-left: 5px;
    line-height: 0;

    /* line-height: 34px;
    font-size:34px;
        display: inline-flex;
    align-items: center;
    justify-content: center; */
    /* display: flex;
    justify-content: center;
    align-items: center; */
  }

  /* .arrow-right path {
  fill: none;
  stroke: white;
  stroke-width: 2; 


} */

  /* Completion Screen - Properly centered */
  .completion-screen-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .completion-screen {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.9)
    );
    color: white;
    padding: 40px;
    width: 80%;
    max-width: 600px;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
    text-align: center;
    backdrop-filter: blur(5px);
  }

  .completion-content {
    display: block;
  }
  .completion-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .completion-title {
    color: #fff;
    font-family: 'Coda',sans-serif;
    font-size: 30px;
    line-height: 35px;
    margin-bottom: 15px;
    text-align: left;
    width: 71%;
  }
  .completion-subtitle {
    color: #ddd;
    margin-bottom: 30px;
    font-weight: bold;
    margin-top: 0;
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
  }
  .score-container {
    margin: 30px 0;
    padding: 25px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 10px;
  }
  .score-title {
    font-size: 1.6rem;
    color: #fff;
    margin-bottom: 10px;
  }
  .score-percentage {
    font-size: 3rem;
    font-weight: bold;
    color: #4caf50;
    margin: 10px 0;
  }
  .completion-footer {
    margin-top: 30px;
  }
  .retake-button {
    cursor: pointer;
    border: 2px solid #4caf50;
    background: #4caf50;
    color: white;
    padding: 15px 40px;
    font-size: 1.1rem;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
  }

  /* Quiz Screen */
  .quiz-container {
    /* position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    z-index: 10000;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.4)
    );
    color: white;
    /* padding: 40px; */
    padding: 60px 70px 30px 75px;
    /* padding: 60px 90px 30px 100px; */
    width: 80%;
    max-width: 630px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    text-align: center;
    backdrop-filter: blur(2px);
  }

  .question-text-container {
    color: white;
    padding: 0 0 20px 0;
    margin-bottom: 20px;
    text-align: center;
  }

  .question-text {
    font-size: 16px;
    line-height: 1.5;
    color: white;
    margin: 0;
    font-weight: bold;
  }

  /* Options Container */
  .options-container {
    margin-bottom: 20px;
  }

  .option-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);

    cursor: pointer;
    color: white;
    position: relative;

    /* height:75px; */
    height: 80px;
    /* margin: 15px 0; */
    align-items: center;
    display: grid;
  }

  .option-item:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.4);
  }

  /* .option-item:last-child {
    border-bottom: none;
  } */

  /* Option Content */
  .option-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
  }

  .option-text {
    cursor: pointer;
    font-size: 14px;
    color: white;
    flex: 1;
    text-align: center;
    font-weight: bold;
    /* width:calc(100% + 35px); */
    /* padding-left: 30px; */
    line-height: 1.5;
    /* border-left:24px solid transparent; */
    padding-left: 5px;
    padding-right: 35px;
  }

  /* Feedback Icons */
  .feedback-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    /* height:73px; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .correct-icon {
    color: #fff;
    background: #509917;

    font-weight: bold;
    /* height: 50px; */
  }

  .incorrect-icon {
    color: #fff;
    background: #f44336;
    font-weight: bold;
    /* height: 50px; */
  }

  /* Correct Answer Styling - Green left bar + always shown when answered */
  .option-item.correct {
    position: relative;
  }

  .option-item.correct::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: linear-gradient(to bottom, #4caf50, #2e7d32);
    border-radius: 0 3px 3px 0;
  }

  /* Incorrect Selected Answer Styling - Red left bar */
  .option-item.incorrect {
    position: relative;
  }

  .option-item.incorrect::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: linear-gradient(to bottom, #f44336, #c62828);
    border-radius: 0 3px 3px 0;
  }

  /* Disabled state for answered questions */
  .option-item.answered {
    cursor: default;
  }

  .option-item.answered .option-text {
    cursor: default;
  }

  /* Navigation */
  .navigation-container {
    text-align: center;
    margin-bottom: 15px;
  }

  .nav-button {
    font-family: 'Open Sans','Lucida Sans', 'Lucida Sans Regular';
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    /* font-weight: bold; */
    font-size: 10px;
    line-height: 1;
    text-transform: uppercase;
    margin-top: 10px;
  }

  .next-button.enabled {
    /* background: #ffe385; */
    color: #000;
  }
  .navigation-container .light-yellow {
    background: #ffe385;
  }

  .navigation-container .blue {
    background: #2970c0;
  }

  .navigation-container .green {
    background: #509917;
  }

  .navigation-container .yellow {
    background: #edbb3e;
  }
  .next-button.disabled {
    color: #fff;
    cursor: not-allowed;
  }

  .finish-button.disabled {
    background: #edbb3e;
    color: #fff;
    cursor: not-allowed;
  }

  .finish-button.enabled {
    background: #edbb3e;
    color: #000;
  }

  /* Progress */
  .progress-container {
    margin-top: 10px;
    position: relative;
    z-index: 400;
    width: 80%;
    max-width: 600px;
  }

  .progress-text {
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
    font-size: 1rem;
  }

  .progress-bar {
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
    transition: width 0.3s ease;
  }

  .option-judge {
    width: 35px;
  }

  /* Question Grid Styles */
  .question-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    row-gap: 30px;
    margin: 30px 0;
    padding: 20px;

    border-radius: 10px;
  }

  .question-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    position: relative;
    padding-bottom: 20px;
  }

  .question-number::before {
    content: "";
    height: 70%;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
  }

  .question-number:first-child::before {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  .question-number:last-child::before {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .question-number:nth-child(8n + 1)::before {
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  /* Right curve: 8, 16, 24, ... */
  .question-number:nth-child(8n)::before {
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .question-number span {
    font-weight: bold;
  }

  .question-indicator {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .question-indicator.correct {
    background-color: #4caf50;
    color: white;
    border: 2px solid #2e7d32;
  }

  .question-indicator.incorrect {
    background-color: #f44336;
    color: white;
    border: 2px solid #c62828;
  }

  .question-indicator.not-answered {
    background-color: #666;
    color: #ddd;
    border: 2px solid #888;
  }

  /* Optional: Add tooltip with question details */
  .question-indicator {
    position: relative;
  }

  /* Responsive grid for smaller screens */
  @media (max-width: 768px) {
    .question-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 480px) {
    .question-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
