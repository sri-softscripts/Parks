<script lang="ts">
  import { onMount } from 'svelte';
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
      backgroundImage: "/images/quiz-bg-2.png",
      correctAnswer: "d",
      options: [
        { key: "a", text: "Frequency" },
        { key: "b", text: "Propagation" },
        { key: "c", text: "Acoustic zones" },
        { key: "d", text: "Decibels", isCorrect: true }
      ]
    },
    {
      id: 2,
      text: "If a sound goes from 20 decibels to 40 decibels, how many times greater would be the perceived change in loudness to people?",
      backgroundImage: "/images/quiz-bg-3.png",
      correctAnswer: "b",
      options: [
        { key: "a", text: "2x louder" },
        { key: "b", text: "4x louder", isCorrect: true },
        { key: "c", text: "8x louder" },
        { key: "d", text: "12x louder" }
      ]
    },
    {
      id: 3,
      text: "The impacts of road noise can extend of one mile into a forest.",
      backgroundImage: "/images/quiz-bg-4.png",
      correctAnswer: "a",
      options: [
        { key: "a", text: "True", isCorrect: true },
        { key: "b", text: "False" }
      ]
    },
    {
      id: 4,
      text: "A soundscape is defined as:",
      backgroundImage: "/images/quiz-bg-5.png",
      correctAnswer: "a",
      options: [
        { key: "a", text: "The human, or animal, perception of all combined acoustic resources.", isCorrect: true },
        { key: "b", text: "Physical sound sources including natural sounds (wind, water, wildlife, vegetation, etc.) and cultural and historic sounds (battle reenactments, tribal ceremonies, etc.)" },
        { key: "c", text: "The period of time between noise events, during which no human-caused sounds are audible." },
        { key: "d", text: "How sound travels" }
      ]
    },
    {
      id: 5,
      text: "A spectrogram is a visual representation of acoustic measurements. Which of the following is not an axis of a spectrogram?",
      backgroundImage: "/images/quiz-bg-2.png",
      correctAnswer: "a",
      options: [
        { key: "a", text: "Movement", isCorrect: true },
        { key: "b", text: "Time" },
        { key: "c", text: "Frequency" },
        { key: "d", text: "Intensity" }
      ]
    },
    {
      id: 6,
      text: "Masking is defined as:",
      backgroundImage: "/images/quiz-bg-4.png",
      correctAnswer: "b",
      options: [
        { key: "a", text: "The composition of the natural sound conditions in a park that exist in the absence of any human-made noise." },
        { key: "b", text: "The process by which the ability to hear a sound is reduced by the presence of another sound", isCorrect: true },
        { key: "c", text: "Any non-natural, human-caused sound." },
        { key: "d", text: "A graphical representation of acoustic measurements" }
      ]
    },
    {
      id: 7,
      text: "Which of the following animal behaviors are affected by human-caused noise?",
      backgroundImage: "/images/quiz-bg-3.png",
      correctAnswer: "e",
      options: [
        { key: "a", text: "Mating" },
        { key: "b", text: "Habitat patterns" },
        { key: "c", text: "Hunting/ability to find prey" },
        { key: "d", text: "Predator avoidance" },
        { key: "e", text: "All of the above", isCorrect: true }
      ]
    },
    {
      id: 8,
      text: "Research shows that human-caused noise affects ground-squirrels by:",
      backgroundImage: "/images/quiz-bg-4.png",
      correctAnswer: "b",
      options: [
        { key: "a", text: "Waking them up from their hibernation" },
        { key: "b", text: "Spend less time foraging for food", isCorrect: true },
        { key: "c", text: "Reducing the number of young a female can produce over her lifetime" },
        { key: "d", text: "All of the above" }
      ]
    },
    {
      id: 9,
      text: "True or false: Bats spend more time foraging near roads because insects have a harder time detecting them.",
      backgroundImage: "/images/quiz-bg-5.png",
      correctAnswer: "b",
      options: [
        { key: "a", text: "True" },
        { key: "b", text: "False", isCorrect: true }
      ]
    },
    {
      id: 10,
      text: "Airplane and traffic noise have which of the following physiological effects on people?",
      backgroundImage: "/images/quiz-bg-2.png",
      correctAnswer: "d",
      options: [
        { key: "a", text: "Increased stress hormones" },
        { key: "b", text: "High blood pressure" },
        { key: "c", text: "Increased heart rate" },
        { key: "d", text: "All of the above", isCorrect: true },
        { key: "e", text: "None of the above" }
      ]
    },
    {
      id: 11,
      text: "True or false: Human-caused noise may impact visitors perceptions of the aesthetic quality of a landscape.",
      backgroundImage: "/images/quiz-bg-3.png",
      correctAnswer: "a",
      options: [
        { key: "a", text: "True", isCorrect: true },
        { key: "b", text: "False" }
      ]
    },
    {
      id: 12,
      text: "Fill in the blank: ____ % of Americans say that one of the most important reasons for preserving the national parks is to provide opportunities to experience natural peace and the sounds of nature.",
      backgroundImage: "/images/quiz-bg-4.png",
      correctAnswer: "b",
      options: [
        { key: "a", text: "53%" },
        { key: "b", text: "95%", isCorrect: true },
        { key: "c", text: "74%" },
        { key: "d", text: "15%" }
      ]
    },
    {
      id: 13,
      text: "Fill in the blank. Human-caused noise reduces a person or animals _______. This can impact animals' ability to communicate with others of their own species, find prey, and detect predators.",
      backgroundImage: "/images/quiz-bg-5.png",
      correctAnswer: "a",
      options: [
        { key: "a", text: "Listening area", isCorrect: true },
        { key: "b", text: "Para-acoustical depth" },
        { key: "c", text: "Propinquity of perceptions" },
        { key: "d", text: "All of the above" }
      ]
    },
    {
      id: 14,
      text: "Education and interpretation can be used to:",
      backgroundImage: "/images/quiz-bg-2.png",
      correctAnswer: "a",
      options: [
        { key: "a", text: "Influence visitor behaviors to reduce human-caused noise.", isCorrect: true },
        { key: "b", text: "Increase the acceptability of human-caused noise." },
        { key: "c", text: "Enhance the appreciation of soundscape resources." },
        { key: "d", text: "All of the above" }
      ]
    },
    {
      id: 15,
      text: "Which one of the following is not a tip for managing soundscapes",
      backgroundImage: "/images/quiz-bg-3.png",
      correctAnswer: "d",
      options: [
        { key: "a", text: "Use quiet technology" },
        { key: "b", text: "Work with maintenance crews" },
        { key: "c", text: "Use zoning" },
        { key: "d", text: "Apply transitional functions", isCorrect: true }
      ]
    },
    {
      id: 16,
      text: "\"A science-based decision making process where managers set desired conditions, create indicators and standards of quality, and use science-based approaches to measure change and efficacy of management actions/\" is the definition of:",
      backgroundImage: "/images/quiz-bg-4.png",
      correctAnswer: "b",
      options: [
        { key: "a", text: "Synergy cycling" },
        { key: "b", text: "Management-by-objectives", isCorrect: true },
        { key: "c", text: "Frequency of use frameworks" },
        { key: "d", text: "Inductive processing" }
      ]
    }
  ];
  
  // Computed values
  $: currentQuestion = questions[currentQuestionIndex];
  $: currentBackground = quizStarted
    ? (currentQuestion?.backgroundImage || "/images/quiz-bg-1.png")
    : "/images/quiz-bg-1.png";
  $: isCurrentQuestionAnswered = answeredQuestions.has(currentQuestionIndex);
  $: progressPercentage = quizStarted && !quizCompleted
    ? ((answeredQuestions.size) / questions.length) * 100
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
  
  const handleAnswerSelect = (optionKey: string): void => {
    if (isCurrentQuestionAnswered || quizCompleted) return;
    
    selectedAnswer = optionKey;
    
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
    }
  };
  
  const finishQuiz = (): void => {
    if (!isCurrentQuestionAnswered) return;
    quizCompleted = true;
  };
  
  const retakeQuiz = (): void => {
    startQuiz();
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
    return selectedAnswer === optionKey && optionKey !== currentQuestion.correctAnswer;
  };
  
  // Get classes for option styling
  const getOptionClasses = (optionKey: string): string => {
    const classes = [];
    
    if (isCurrentQuestionAnswered) {
      // Add answered class to disable clicking
      classes.push('answered');
      
      // Add correct class for correct answer (always shown when answered)
      if (optionKey === currentQuestion.correctAnswer) {
        classes.push('correct');
      }
      
      // Add incorrect class for selected incorrect answer
      if (selectedAnswer === optionKey && optionKey !== currentQuestion.correctAnswer) {
        classes.push('incorrect');
      }
    }
    
    return classes.join(' ');
  };
  
  onMount(() => {
    console.log('Review component mounted with', questions.length, 'questions');
  });
</script>

<section id="review" class="review-section">
  <div class="page-inner">
    <div class="page-content">
      <!-- Background -->
      <div class="background-container">
        <div class="background-image" style="background-image: url('{currentBackground}');"></div>
      </div>
      
      <!-- Welcome Screen -->
      {#if !quizStarted}
        <div class="welcome-screen">
          <div class="welcome-content">
            <h1 class="welcome-title">Soundboard Quiz</h1>
            <button class="start-button" on:click={startQuiz}>Start Quiz<span class="arrow-right">»</span></button>
          </div>
        </div>
      
      {:else if quizCompleted}
        <!-- Completion Screen - Properly centered -->
        <div class="completion-screen-wrapper">
          <div class="completion-screen">
            <div class="completion-content">
              <header class="completion-header">
                <h3 class="completion-title">CONGRATULATIONS!</h3>
                <p class="completion-subtitle">You have completed the quiz. Review your results.</p>
              </header>
              <div class="score-container">
                <h4 class="score-title">Your Score: {score} / {questions.length}</h4>
                <p class="score-percentage">{Math.round((score / questions.length) * 100)}%</p>
              </div>
              <footer class="completion-footer">
                <button class="retake-button" on:click={retakeQuiz}>Retake Quiz<span class="arrow-right">»</span></button>
              </footer>
            </div>
          </div>
        </div>
      
      {:else}
        <!-- Quiz Screen -->
        <div class="quiz-container">
          <div class="question-text-container">
            <p class="question-text">{currentQuestion.text}</p>
          </div>
        
          <div class="options-container">
            {#each currentQuestion.options as option}
              <div
                class="option-item {getOptionClasses(option.key)}"
                on:click={() => !isCurrentQuestionAnswered && handleAnswerSelect(option.key)}
              >
                <!-- Option content -->
                <div class="option-content">
                  <span class="option-text">{option.text}</span>
                  <div class="option-judge">


                  <!-- O/X Icons (only shown when question is answered) -->
                  {#if isCurrentQuestionAnswered}
                    {#if shouldShowOCircle(option.key)}
                      <span class="feedback-icon correct-icon">O</span>
                    {:else if shouldShowXCross(option.key)}
                      <span class="feedback-icon incorrect-icon">✕</span>
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
                class="nav-button next-button {isCurrentQuestionAnswered ? 'enabled' : 'disabled'}"
                on:click={nextQuestion}
                disabled={!isCurrentQuestionAnswered}
              >
                Next Question
              </button>
            {:else}
              <button
                class="nav-button finish-button {isCurrentQuestionAnswered ? 'enabled' : 'disabled'}"
                on:click={finishQuiz}
                disabled={!isCurrentQuestionAnswered}
              >
                Finish
              </button>
            {/if}
          </div>
        
          <!-- Progress Bar -->
          <div class="progress-container">
            <div class="progress-text">
              {answeredQuestions.size}/{questions.length}
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: {progressPercentage}%;"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Footer -->
    <footer class="page-footer page-footer--dark">
      <div class="container">
        <div class="hiker">
          <a href="http://hikercompany.com/" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.883 19.988">
              <defs>
                <style>
                  .cls-1 {
                    fill: #fff;
                  }
                </style>
              </defs>
              <g
                id="Group_35"
                data-name="Group 35"
                transform="translate(0 -0.001)"
              >
                <path
                  id="Path_54"
                  data-name="Path 54"
                  class="cls-1"
                  d="M19.089,11.132c-.035,0-.088.018-.123.018h0a.746.746,0,0,1-.741-.706,1.829,1.829,0,0,1-.018-.547c.018-.176.035-.353.071-.529.035-.282.071-.582.106-.864V8.362c-.053-.282-.653-.335-1.006-.353-.053,0-.123-.018-.159-.018l-.335,1.817A2.607,2.607,0,0,1,15,11.891c-.088.018-.176.018-.265.035a1.35,1.35,0,0,1-1.288-.759c0,.018,0,.018-.018.035a1.566,1.566,0,0,1-1.217,1.217.859.859,0,0,1-.212.018,1.661,1.661,0,0,1-1.394-.9,3.715,3.715,0,0,1-.476-1.041.2.2,0,0,1,.159-.229c.123-.018,1.27-.247,1.588-.759a.477.477,0,0,0,.071-.406c-.035-.176-.141-.229-.388-.176a2.546,2.546,0,0,0-1.5,1.2l-.529,2.629a.227.227,0,0,1-.176.176.231.231,0,0,1-.247-.176.99.99,0,0,1,.035-.176,1.529,1.529,0,0,1-.847.547c-.053,0-.088.018-.141.018a.75.75,0,0,1-.759-.706,2.151,2.151,0,0,1,.035-.812L7.851,9.58c.018-.088.035-.194.053-.282a.247.247,0,0,1,.212-.159.192.192,0,0,1,.194.176c.018.071-.088.582-.476,2.435a1.618,1.618,0,0,0-.035.635.361.361,0,0,0,.335.353H8.2a1.118,1.118,0,0,0,.635-.459,3.072,3.072,0,0,0,.512-.988c.018-.035.018-.071.035-.106a.515.515,0,0,0,.035-.159v-.018c.37-1.852.935-4.569,1.006-4.852a.233.233,0,0,1,.159-.176.207.207,0,0,1,.247.176c0,.053-.123.67-.512,2.576-.053.212-.088.388-.106.512a2.6,2.6,0,0,1,1.253-.706.724.724,0,0,1,.194-.018.617.617,0,0,1,.688.547c.194,1.059-1.235,1.482-1.764,1.623a.627.627,0,0,0,.071.159c.018.018.018.053.035.071.388.847.864,1.217,1.411,1.129.67-.123.847-.759,1.023-1.394.035-.106.053-.212.088-.318,0-.018,0-.035.018-.035a2.87,2.87,0,0,1,.97-2.152,1.516,1.516,0,0,1,.617-.247c.053,0,.088-.018.141-.018a.74.74,0,0,1,.776.582c.159.9-.882,1.764-1.623,1.905a1.442,1.442,0,0,1-.476.018,1.254,1.254,0,0,0,.335.9,1,1,0,0,0,.9.229,1.953,1.953,0,0,0,1.358-1.182,1.841,1.841,0,0,0,.141-.441c.018-.053.018-.088.035-.141V9.738c.018-.053.018-.123.035-.194.088-.406.247-1.164.282-1.57A.665.665,0,0,1,16.2,7.5a.744.744,0,0,1,.053-.388.457.457,0,0,1,.3-.247.6.6,0,0,1,.635.547A.724.724,0,0,1,17.2,7.6c.106.018.229.018.335.035.053,0,.106.018.159.018.353.053.935.123,1.023.653a.753.753,0,0,1,0,.282c-.035.229-.053.459-.088.706-.035.229-.053.476-.088.706a1.56,1.56,0,0,0,0,.406c.035.141.123.406.37.353.406-.071.706-.547.882-1.023A9.826,9.826,0,0,0,9.95,0,9.984,9.984,0,0,0,0,10a10.415,10.415,0,0,0,.335,2.576A16.2,16.2,0,0,1,2.241,11.22c.353-1.694.547-2.646.653-3.158.123-.635.141-.653.141-.688a.23.23,0,0,1,.176-.159.218.218,0,0,1,.247.159,3.925,3.925,0,0,1-.141.759c0,.035-.018.053-.018.071l-.582,2.787c.159-.088.3-.194.441-.282a4.492,4.492,0,0,1,1.694-.847,1.15,1.15,0,0,1,.988.212l.582-3.052c.018-.053.018-.088.035-.141.018-.035.035-.088.053-.123a1.206,1.206,0,0,1,.882-.688c.035,0,.088-.018.141-.018.176,0,.229.088.229.159a.205.205,0,0,1-.035.176.238.238,0,0,1-.159.088H7.445a.791.791,0,0,0-.635.617L6.563,8.468c-.3,1.623-.617,3.281-.935,4.922a.207.207,0,0,1-.176.159.19.19,0,0,1-.229-.159c-.018-.053.123-.759.459-2.54.018-.141.053-.229.053-.282a.244.244,0,0,1-.053-.071.792.792,0,0,0-.741-.212,3.2,3.2,0,0,0-1.164.512c-.088.053-.194.123-.335.212-.282.176-.635.406-.847.529l-.388,1.905a3.3,3.3,0,0,1-.759,1.747,9.941,9.941,0,0,0,18.436-4.64A1.35,1.35,0,0,1,19.089,11.132ZM8.062,8.186a.3.3,0,0,1,.176-.106.261.261,0,0,1,.3.212.29.29,0,0,1-.212.318H8.292a.253.253,0,0,1-.265-.229A.161.161,0,0,1,8.062,8.186Z"
                ></path>
                <path
                  id="Path_55"
                  data-name="Path 55"
                  class="cls-1"
                  d="M4.358,67.1a14.739,14.739,0,0,0-1.464,1.059c-.071.053-.123.106-.194.159A9.4,9.4,0,0,0,3.476,70.1a3.306,3.306,0,0,0,.582-1.482Z"
                  transform="translate(-2.224 -55.262)"
                ></path>
                <path
                  id="Path_56"
                  data-name="Path 56"
                  class="cls-1"
                  d="M79.323,47.322a.519.519,0,0,0-.053-.459.416.416,0,0,0-.441-.123c-.688.141-1.041,1.059-1.129,1.641a1.365,1.365,0,0,0,.37-.018A1.719,1.719,0,0,0,79.323,47.322Z"
                  transform="translate(-63.992 -38.483)"
                ></path>
                <path
                  id="Path_57"
                  data-name="Path 57"
                  class="cls-1"
                  d="M94.464,40.9h0c-.035,0-.035.071-.018.123a.234.234,0,0,0,.159.123v-.035C94.587,41.041,94.516,40.9,94.464,40.9Z"
                  transform="translate(-77.774 -33.684)"
                ></path>
              </g>
            </svg>
            Powered by Hiker
          </a>
        </div>
      </div>
    </footer>
  </div>
</section>

<style>
  :global(#review),
  :global(.review-section) {
    position: relative;
    height: 200vh;
    width: 100vw;
  }
  :global(.page-inner),
  :global(.page-content) {
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
    top: 50%;
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
  .welcome-title {
    font-size: 2.5rem;
    margin-bottom: 30px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  }
  .start-button {
    cursor: pointer;
    border: 2px solid white;
    background: transparent;
    color: white;
    padding: 15px 40px;
    font-size: 1.2rem;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
  }
  .arrow-right {
    margin-left: 10px;
  }
  
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
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
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
    display: block;
  }
  .completion-title {
    color: #4CAF50;
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
  .completion-subtitle {
    color: #ddd;
    margin-bottom: 30px;
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
    color: #4CAF50;
    margin: 10px 0;
  }
  .completion-footer {
    margin-top: 30px;
  }
  .retake-button {
    cursor: pointer;
    border: 2px solid #4CAF50;
    background: #4CAF50;
    color: white;
    padding: 15px 40px;
    font-size: 1.1rem;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
  }
  
  /* Quiz Screen */
  .quiz-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
    color: white;
    padding: 40px;
    width: 80%;
    max-width: 600px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
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

  height:75px;
  /* margin: 15px 0; */
  align-items: center;
      display: grid;
}


   .option-item:first-child{
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
    /* padding-left: 30px; */
    line-height: 1.5;
    border-left:24px solid transparent;
   
  }
  
  /* Feedback Icons */
  .feedback-icon {
    position:absolute;
    top:0;
    left:0;
    width: 32px;
    height:73px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .correct-icon {
    color: #fff;
     background:  #4CAF50;
        
    font-weight: bold;
    /* height: 50px; */


}
  
  .incorrect-icon {
    color:#fff ;
    background: #f44336;
    font-weight: bold;
    /* height: 50px; */
  }
  
  /* Correct Answer Styling - Green left bar + always shown when answered */
  .option-item.correct {
    position: relative;
  }
  
  .option-item.correct::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: linear-gradient(to bottom, #4CAF50, #2E7D32);
    border-radius: 0 3px 3px 0;
  }
  
  /* Incorrect Selected Answer Styling - Red left bar */
  .option-item.incorrect {
    position: relative;
  }
  
  .option-item.incorrect::before {
    content: '';
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
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
  }
  
  .next-button.enabled {
    background: #FFD700;
    color: #333;
  }
  
  .next-button.disabled,
  .finish-button.disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
  
  .finish-button.enabled {
    background: #4CAF50;
    color: white;
  }
  
  /* Progress */
  .progress-container {
    margin-top: 10px;
  }
  
  .progress-text {
    text-align: center;
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
    background-color: rgba(255, 255, 255, 0.4);
    transition: width 0.3s ease;
  }

  /* .option-judge {
    padding:0 ;
  } */
</style>