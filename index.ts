import * as readline from 'readline';

class Quiz {
    private questions: string[];
    private choices: string[][];
    private answers: number[];
    private userResponses: number[];
    private score: number;

    constructor(questions: string[], choices: string[][], answers: number[]) {
        this.questions = questions;
        this.choices = choices;
        this.answers = answers;
        this.userResponses = [];
        this.score = 0;
    }

    startQuiz() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('line', (input: string) => {
            const answerIndex = parseInt(input.trim(), 10) - 1; // Convert user input to zero-based index

            if (isNaN(answerIndex) || answerIndex < 0 || answerIndex >= this.choices[this.userResponses.length].length) {
                console.log('Invalid input. Please enter a valid option.');
            } else {
                this.userResponses.push(answerIndex);
                if (answerIndex === this.answers[this.userResponses.length - 1]) {
                    this.score++;
                }
            }

            if (this.userResponses.length < this.questions.length) {
                this.displayQuestion(rl);
            } else {
                rl.close();
                this.showResult();
            }
        });

        this.displayQuestion(rl);
    }

    displayQuestion(rl: readline.Interface) {
        const currentQuestionIndex = this.userResponses.length;
        console.log(`Question ${currentQuestionIndex + 1}: ${this.questions[currentQuestionIndex]}`);
        for (let j = 0; j < this.choices[currentQuestionIndex].length; j++) {
            console.log(`${j + 1}. ${this.choices[currentQuestionIndex][j]}`);
        }
        rl.prompt();
    }

    showResult() {
        console.log(`Quiz finished! You scored ${this.score} out of ${this.questions.length} questions.`);
        for (let i = 0; i < this.questions.length; i++) {
            console.log(`Question ${i + 1}: ${this.questions[i]}`);
            console.log(`Your answer: ${this.choices[i][this.userResponses[i]]}`);
            console.log(`Correct answer: ${this.choices[i][this.answers[i]]}`);
            console.log('------------------');
        }
    }
}

// Example usage:
const questions = [
    "What is the capital of France?",
    "Who wrote 'Hamlet'?",
    "Which planet is known as the Red Planet?"
];

const choices = [
    ["Paris", "London", "Berlin"],
    ["William Shakespeare", "Charles Dickens", "Jane Austen"],
    ["Mars", "Venus", "Jupiter"]
];

const answers = [0, 0, 0]; // Indices of correct answers for each question

const quiz = new Quiz(questions, choices, answers);
quiz.startQuiz();
