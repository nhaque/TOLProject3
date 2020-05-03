let csvfile = [], counter = 1, l, arrayofcorrect, question_ids = [], arrayofincorrect, exclude = [];
let choiceA, choiceB, choiceC, choiceD;

$(document).ready(function() {
d3.csv("/TOL_PJ3/js/data.csv", function(data){
		csvfile=data
		//console.log(csvfile);
});
});

// function randChoice(){
// 	if(exclude.length >= 3 && exclude.some(r=> arrayofcorrect[counter-1].includes(r))==false)
// 	{
// 		console.log("success");
// 		var randCh = arrayofcorrect[counter-1][Math.floor(Math.random() * arrayofcorrect[counter-1].length)];
//     if(exclude.includes(randCh)){
//       return randChoice();
//     }else{
// 			exclude.push(randCh);
//       return randCh;
//     }
// 		exclude = [];
// 	}
// 	else {
// 		if(exclude.length >= 3)
// 		{
// 			exclude = [];
// 		}
// 		console.log(exclude.some(r=> arrayofcorrect[counter-1].includes(r)));
// 		console.log(exclude);
// 		var randCh = arrayofcorrect[counter-1].concat(arrayofincorrect[counter-1])[Math.floor(Math.random() * arrayofcorrect[counter-1].concat(arrayofincorrect[counter-1]).length)];
//     if(exclude.includes(randCh)){
//       return randChoice();
//     }else{
// 			exclude.push(randCh);
//       return randCh;
//     }
// 	}
// }

arrayofcorrect = ["A", "B"]
arrayofincorrect = ["aa", "bb", "cc", "dd"]


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


function to_q1(){
	var tempflag = [], i;
	l = csvfile.length;
	for( i=0; i<l; i++) {
	    if( tempflag[csvfile[i].Question_id]) continue;
	    tempflag[csvfile[i].Question_id] = true;
	    question_ids.push(csvfile[i].Question_id);
	}
	//console.log(question_ids);
	arrayofcorrect = [...Array(question_ids.length)].map( () => Array(0))
	arrayofincorrect = [...Array(question_ids.length)].map( () => Array(0))
	for( i=0; i<l; i++) {
	    if(csvfile[i].option=="correct")
			{
				//console.log(csvfile[i].Answer_text);
				arrayofcorrect[csvfile[i].Question_id-Math.min(...question_ids)].push(csvfile[i].Answer_text);
			}
			if(csvfile[i].option=="incorrect")
			{
				//console.log(csvfile[i].Question_id, csvfile[i].Answer_text);
				arrayofincorrect[csvfile[i].Question_id-Math.min(...question_ids)].push(csvfile[i].Answer_text);
			}
	}
	console.log(arrayofcorrect);
	console.log(arrayofincorrect);
	var welcome = document.getElementById('welcome');
	welcome.style.display = 'none';

	var first_quiz = document.getElementById('first_quiz');
	first_quiz.style.display = 'block';

	document.body.scrollTop = 0;
 	document.documentElement.scrollTop = 0;
	document.getElementById('question').innerHTML = csvfile[counter]['Question_text'];
	choiceA = shuffle(arrayofcorrect);
	choiceB = shuffle(arrayofincorrect);
	choiceC = shuffle(arrayofincorrect);
	choiceD = shuffle(arrayofincorrect);
	document.getElementById('optionA').innerHTML = choiceA;
	document.getElementById('optionB').innerHTML = choiceB;
	document.getElementById('optionC').innerHTML = choiceC;
	document.getElementById('optionD').innerHTML = choiceD;
}

function next_question(){
	counter = counter + 1;
	document.getElementById('optionA').checked=false;
	document.getElementById('optionB').checked=false;
	document.getElementById('optionC').checked=false;
	document.getElementById('optionD').checked=false;
	if(counter <= question_ids.length)
	{
		document.getElementById('submit').style.display='block';
		document.getElementById('next').style.display='none';
		document.getElementById('retry_1').style.display='none';
		document.getElementById("first_incorrect_fb").style.display='none';
		document.getElementById('question_number').innerHTML = "Question ".concat(counter);
		var result;
		for( var i = 0, len = csvfile.length; i < len; i++ ) {
		    if( csvfile[i]['Question_id'] == counter ) {
		        document.getElementById('question').innerHTML = csvfile[i]['Question_text'];
		        break;
		    }
		}
		choiceA = randChoice();
		choiceB = randChoice();
		choiceC = randChoice();
		choiceD = randChoice();
		document.getElementById('quiz_A').innerHTML = choiceA;
		document.getElementById('quiz_B').innerHTML = choiceB;
		document.getElementById('quiz_C').innerHTML = choiceC;
		document.getElementById('quiz_D').innerHTML = choiceD;
		console.log(counter);
	}
	else {
		var completed = document.getElementById('completed');
		completed.style.display = 'block';

		var first_quiz = document.getElementById('first_quiz');
		first_quiz.style.display = 'none';
	}
}

//show feedback for the quiz
function check_optionAnswer() {
	var flag = "correct", feedback = "<p>";
	//defining the right answer here
	var choice_A = document.getElementById('optionA').checked;
	var choice_B = document.getElementById('optionB').checked;
	var choice_C = document.getElementById('optionC').checked;
	var choice_D = document.getElementById('optionD').checked;
	if((choice_A==true && arrayofcorrect[counter-1].includes(choiceA)==false))
	{
			flag = "incorrect";
			feedback=feedback.concat("This statement is incorrect.");
			feedback=feedback.concat(choiceA);
			feedback=feedback.concat("<br>");
	}
	if((choice_B==true && arrayofcorrect[counter-1].includes(choiceB)==false))
	{
			flag = "incorrect";
			feedback=feedback.concat("This statement is incorrect.");
			feedback=feedback.concat(choiceB);
			feedback=feedback.concat("<br>");
	}
	if((choice_C==true && arrayofcorrect[counter-1].includes(choiceC)==false))
	{
			flag = "incorrect";
			feedback=feedback.concat("This statement is incorrect.");
			feedback=feedback.concat(choiceC);
			feedback=feedback.concat("<br>");
	}
	if((choice_D==true && arrayofcorrect[counter-1].includes(choiceD)==false))
	{
			flag = "incorrect";
			feedback=feedback.concat("This statement is incorrect.");
			feedback=feedback.concat(choiceD);
			feedback=feedback.concat("<br>");
	}
	if(choice_A==false && arrayofcorrect[counter-1].includes(choiceA)==true)
	{
			flag = "incorrect";
			feedback=feedback.concat("You didn't select this correct statement.");
			feedback=feedback.concat(choiceA);
			feedback=feedback.concat("<br>");
	}
	if(choice_B==false && arrayofcorrect[counter-1].includes(choiceB)==true)
	{
			flag = "incorrect";
			feedback=feedback.concat("You didn't select this correct statement.");
			feedback=feedback.concat(choiceB);
			feedback=feedback.concat("<br>");
	}
	if(choice_C==false && arrayofcorrect[counter-1].includes(choiceC)==true)
	{
			flag = "incorrect";
			feedback=feedback.concat("You didn't select this correct statement.");
			feedback=feedback.concat(choiceC);
			feedback=feedback.concat("<br>");
	}
	if(choice_D==false && arrayofcorrect[counter-1].includes(choiceD)==true)
	{
			flag = "incorrect";
			feedback=feedback.concat("You didn't select this correct statement.");
			feedback=feedback.concat(choiceD);
			feedback=feedback.concat("<br>");
	}
	if (flag == "correct"){
		if((choice_A==true && arrayofcorrect[counter-1].includes(choiceA)==true))
		{
				feedback=feedback.concat(choiceA);
		}
		if((choice_B==true && arrayofcorrect[counter-1].includes(choiceB)==true))
		{
				feedback=feedback.concat(choiceB);
		}
		if((choice_C==true && arrayofcorrect[counter-1].includes(choiceC)==true))
		{
				feedback=feedback.concat(choiceC);
		}
		if((choice_D==true && arrayofcorrect[counter-1].includes(choiceD)==true))
		{
				feedback=feedback.concat(choiceD);
		}
		document.getElementById("first_correct_fb").style.display='block';
		document.getElementById('correctfeedback').innerHTML = "These statements are correct."+feedback+"</p>";
	} else {
		document.getElementById("first_incorrect_fb").style.display='block';
		document.getElementById('incorrectfeedback').innerHTML = feedback+"Try Again"+"</p>";
	}
}

//change submit button to next
function quiz_submit() {
	document.getElementById('submit').style.display='none';
	document.getElementById('next').style.display='block';
	document.getElementById('retry_1').style.display='block';
}

function retry() {
	document.getElementById('optionA').checked=false;
	document.getElementById('optionB').checked=false;
	document.getElementById('optionC').checked=false;
	document.getElementById('optionD').checked=false;
	choiceA = randChoice();
	choiceB = randChoice();
	choiceC = randChoice();
	choiceD = randChoice();
	document.getElementById('quiz_A').innerHTML = choiceA;
	document.getElementById('quiz_B').innerHTML = choiceB;
	document.getElementById('quiz_C').innerHTML = choiceC;
	document.getElementById('quiz_D').innerHTML = choiceD;
	document.getElementById('submit').style.display='block';
	document.getElementById('next').style.display='none';
	document.getElementById('retry_1').style.display='none';
	document.getElementById("first_correct_fb").style.display='none';
	document.getElementById("first_incorrect_fb").style.display='none';
}
