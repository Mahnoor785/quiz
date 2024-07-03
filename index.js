// Define a class for the Quiz
var Quiz = /** @class */ (function () {
    function Quiz(questions, choices, answers) {
        this.questions = questions;
        this.choices = choices;
        this.answers = answers;
        this.userResponses = [];
        this.score = 0;
    }
    // Method to display questions and get responses
    Quiz.prototype.startQuiz = function () {
        for (var i = 0; i < this.questions.length; i++) {
            console.log("Question ".concat(i + 1, ": ").concat(this.questions[i]));
            for (var j = 0; j < this.choices[i].length; j++) {
                console.log("".concat(j + 1, ". ").concat(this.choices[i][j]));
            }
            var response = prompt("Enter your answer for Question ".concat(i + 1, " (1-").concat(this.choices[i].length, "): "));
            var answerIndex = parseInt(response || '0', 10) - 1; // Convert user input to zero-based index
            if (answerIndex >= 0 && answerIndex < this.choices[i].length) {
                this.userResponses.push(answerIndex);
                if (answerIndex === this.answers[i]) {
                    this.score++;
                }
            }
            else {
                console.log('Invalid input. Skipping question.');
            }
        }
        this.showResult();
    };
    // Method to display quiz result
    Quiz.prototype.showResult = function () {
        console.log("Quiz finished! You scored ".concat(this.score, " out of ").concat(this.questions.length, " questions."));
        for (var i = 0; i < this.questions.length; i++) {
            console.log("Question ".concat(i + 1, ": ").concat(this.questions[i]));
            console.log("Your answer: ".concat(this.choices[i][this.userResponses[i]]));
            console.log("Correct answer: ".concat(this.choices[i][this.answers[i]]));
            console.log('------------------');
        }
    };
    return Quiz;
}());
// Example usage:
var questions = [
    "What is the capital of France?",
    "Who wrote 'Hamlet'?",
    "Which planet is known as the Red Planet?"
];
var choices = [
    ["Paris", "London", "Berlin"],
    ["William Shakespeare", "Charles Dickens", "Jane Austen"],
    ["Mars", "Venus", "Jupiter"]
];
var answers = [0, 0, 0]; // Indices of correct answers for each question
var quiz = new Quiz(questions, choices, answers);
quiz.startQuiz();
