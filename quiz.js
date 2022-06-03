let question1 = new Question("Who is the current prime minister of India?",
["Indira Gandhi", "Narendra Modi", "Rahul Gandhi", "Manmohan Singh"],
"Narendra Modi");

let questions = [
        question1,
        new Question('JavaScript Supports _____',['Functions', 'XHTML', 'CSS', 'HTML'],'Functions'),
        new Question('Who is the current best Indian batsman?',['Virat Kohli', 'Rohit Sharma', 'K L Rahul', 'Shreyas Iyer'],'Virat Kohli'),
        new Question('Which language has maximum followers?',['JavaScript', 'Java', 'Python', 'C++'],'Python'),
        new Question('Which is the national animal of India?',['Tiger', 'Lion', 'Elephant', 'Cat'],'Tiger'),
        new Question('What does pencil consist of?',['Magnesium', 'Calcium', 'Iron', 'Graphite'],'Graphite'),
        new Question('Which team has won the most IPL titles?',['RCB', 'CSK', 'MI', 'SRH'],'MI'),
        new Question('What does JSON stand for -',['Java Simple Object Notation', 'JavaScript Object Notation', 'Java Semi Object Notation', 'None of the above'],'JavaScript Object Notation'),
        new Question('Who is the CEO of SpaceX?',['Elon Musk', 'Jeff Bezos', 'Anil Ambani', 'Ratan Tata'],'Elon Musk'),
        new Question('Which car manufacturing company originates from Italy',['Ford', 'Hyundai', 'Ferrari', 'Aston Martin'],'Ferrari')
];

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.index];
}

Quiz.prototype.checkForCorrectAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.index++;
}

Quiz.prototype.isEnded = function(){
    return this.index === this.questions.length;
}

function Question(questionText, choices, answer){
    this.text = questionText;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice; 
}

function loadQuestions(){
    if(quiz.isEnded()){
        showFinalScores();
    }else{
        let element = document.getElementById('question');
        element.innerHTML = quiz.getQuestionByIndex().text;

        let answers = quiz.getQuestionByIndex().choices;

        for(let i=0; i<answers.length; i++){
            let eachChoiceElement = document.getElementById("choice"+i);
            eachChoiceElement.innerHTML = answers[i];

            let eachButtonElement = document.getElementById("btn"+i);
            eachButtonElement.onclick = function(){
                quiz.checkForCorrectAnswer(answers[i]);
                loadQuestions();
            }
        }
        showProgress();
    }
}

let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores(){
    let completeHTML = 
    `<h1> Result </h1>
     <h2 id='score'> Your score : ${quiz.score} </h2>
     <h3>And your score percentage is - ${quiz.score/questions.length*100}% </h3>
    `;
    let quizCanvas = document.getElementById('quiz');
    quizCanvas.innerHTML = completeHTML;
}

function showProgress(){
    let questNumber = (quiz.index + 1);
    let element = document.getElementById('progress');
    element.innerHTML = 'Question ' + questNumber + ' of ' + quiz.questions.length;

}
