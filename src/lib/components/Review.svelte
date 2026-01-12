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