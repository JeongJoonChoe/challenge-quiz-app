//single global state object
var PAGE = {
	questionList: [
		{question:'What is the main ingredient in Tteok-bokki?',
		answerChoices:['beef','fish cake','rice cake','seaweed'], 
		correctAnswer:'c'},
		{question:"On Valentine's day in South Korea, single people are known to eat which korean dish?",
		answerChoices:['soju','black bean noodle','Fried dumplings','short-rib stew'],
		correctAnswer:'b'},
		{question:"As a celebration of the New Year, Korean people traditionally eat which soup?",
		answerChoices:['rice cake soup','spicy beef and vegetable soup','spicy chicken soup','soybean sprout soup'],
		correctAnswer:'a'},
		{question:"Korean people traditionally eat which soup on their birthday?:",
		answerChoices:['potato soup','seaweed soup','kimchi soup','soybean paste soup'],
		correctAnswer:'b'},
		{question:"Which korean bbq dish is this?",
		answerChoices:['pork belly','brisket','beef tongue','boneless short rib'],
		image:'http://scontent.cdninstagram.com/t51.2885-15/s480x480/e15/11326600_493692074115369_1119236344_n.jpg?ig_cache_key=NDI1NjU2NDQ2NDI2MTgyNTc5.2',
		correctAnswer:'d'},
		],
	questionCount:0,
	correct:0,
	incorrect:0
}
var frontTemplate = ('<div class="header-button-container">'+
				'<h1>The Korean Food Quiz</h1>'+
				'<div class="button-container">'+
					'<button class="start-button" id="start-button">Start</button>'+
				'</div>'+
			'</div>')

var resultTemplate = (
			'<div class="outcome-container">'+
			'<h2> Incorrect <br>The correct answer was [<span class="js-result">b</span>]</h2>'+
			'<button class="start-button" id="next-page">Next</button>'+
		'</div>')


var endPageTemplate = (
	'<div class="header-button-container">'+
		'<h1><em>Congratulations!</em> <br>You got <span class="js-correct">3</span> out of 5 correct answers</h1>'+ 
		'<div> Would you like to try again?'+
			'<button id="yes">yes</button>'+
			'<button id="no">no</button>'+
		'<footer>Written and coded by Jeong Joon "Peter" Choe</footer>'+
	'</div>')

var questionTemplate = (
	'<div class="page-counter"><p>Question <span class="js-question-count">1</span> out of 5</p></div>'+
			'<div class="question-container">'+
				'<h2 class="question-header">Which Korean dish is this?</h2>'+
				'<div class="answer-image-container">'+
				'</div>'+
			'</div>'+
			'<div class="results"><p>Current score: <span class="js-correct-count">1</span> correct <span class="js-incorrect-count">0</span> incorrect</p></div>'+
	'</div>')
var questionListTemplate = ('<div class="answer-image-container">'+
	'<ul class="answer-choices">'+
		'<li class="answer-choice"><button class="answer-button" id="a"></button><label for="#a">a.<span class="answer-a"> kimchi</span></label></li>'+
		'<li class="answer-choice"><button class="answer-button" id="b"></button><label for="#b">b.<span class="answer-b"> bibimbap</span></label></li>'+
		'<li class="answer-choice"><button class="answer-button" id="c"></button><label for="#c">c.<span class="answer-c"> naengmyun</span></label></li>'+
		'<li class="answer-choice"><button class="answer-button" id="d"></button><label for="#d">d.<span class="answer-d"> galbi</span></label></li>'+
	'</ul>'+
	'<img src="" alt="" class="img-style">'+
	'</div>')
//state management
function incrementByOne(state, item) {
	state[item]++;
}
function resetState(state) {
	state.questionCount = 0;
	state.correct = 0;
	state.incorrect = 0;
}
function getQuestionCount(state){
	return state.questionCount;
}
function getCorrectAnswer(state, questionIndex) {
	return state.questionList[questionIndex].correctAnswer;
}
function getResult(state,questionIndex,choiceId) {
	if (getCorrectAnswer(state, questionIndex) === choiceId) {
		incrementByOne(PAGE,'correct');
	}	else {
		incrementByOne(PAGE,'incorrect');
	}
	return getCorrectAnswer(state, questionIndex) === choiceId;
}
//DOM manipulation
function generateQuestions(state,questionIndex) {
	var questions = $(questionListTemplate);
	questions.find('.answer-a').text(state.questionList[questionIndex].answerChoices[0]);
	questions.find('.answer-b').text(state.questionList[questionIndex].answerChoices[1]);
	questions.find('.answer-c').text(state.questionList[questionIndex].answerChoices[2]);
	questions.find('.answer-d').text(state.questionList[questionIndex].answerChoices[3]);
	if (Object.keys(state.questionList[questionIndex]).indexOf('image')>-1) {
		questions.find('img').attr('src',state.questionList[questionIndex].image)
	}
	return questions.html();
}
function renderQuestionPage( state, questionIndex) {
	var questionPage = $(questionTemplate);
	questionPage.find('.js-question-count').text(state.questionCount+1);
	questionPage.find('.question-header').text(state.questionList[questionIndex].question);
	questionPage.find('.answer-image-container').html(generateQuestions(state,questionIndex));
	questionPage.find('.js-correct-count').text(state.correct);
	questionPage.find('.js-incorrect-count').text(state.incorrect);
	$('.page').html(questionPage);
}
function renderFrontPage() {

	$('.page').html(frontTemplate);
}

function renderResultPage(state,score,correctAnswer) {
	var result = $(resultTemplate);
	if (score) {
		result.find('h2').text('Correct! Good Job');
	}	else {
		result.find('.js-result').text(correctAnswer);
	}
	$('.page').html(result);
}

function renderLastPage(state) {
	var last = $(endPageTemplate);
	last.find('.js-correct').text(state.correct);
	$('.page').html(last);

}

//Event Listeners
function handleStartButton() {
	$('.page').on('click','#start-button',function(event) {
		renderQuestionPage(PAGE,PAGE.questionCount);
	})
}
function handleAnswerQuestion(){
	$('.page').on('click','.answer-button',function(event) {
		var userAnswer = $(this).attr('id');
		var result = getResult(PAGE,PAGE.questionCount,userAnswer);
		renderResultPage(PAGE,result,getCorrectAnswer(PAGE,PAGE.questionCount));
	});
}
function handleNextButton() {
	$('.page').on('click','#next-page',function(event){
		incrementByOne(PAGE,'questionCount');
		if (PAGE.questionCount < 5){
			renderQuestionPage(PAGE, PAGE.questionCount);
		}	else {
			renderLastPage(PAGE);
		}
	})
}
function handleYes() {
	$('.page').on('click','#yes', function(event) {
		resetState(PAGE);
		renderFrontPage();
	})
}
function handleNo(){
	$('.page').on('click','#no', function(event) {
		resetState(PAGE);
		window.close();
	})
}

$(function() {
	handleStartButton();
	handleAnswerQuestion();
	handleNextButton();
	handleNo();
	handleYes();
})