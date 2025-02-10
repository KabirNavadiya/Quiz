let questions = [];
let cindex = 0;
let score = 0;
$("#submitAnswer").hide();
$("#restart").hide();


$.ajax({
    type: "GET",
    url: "script/quiz.json",
    dataType: "json",
})
.done(function (data) {
    questions = data;
    // console.log(questions);
    // displayQuestion(cindex);
})



function displayQuestion(indx) {
    $("#quiz").empty();
    $("#submitAnswer").show()
    $("#submitAnswer").text("Next");
    $("#restart").hide()
    let currentQuestion = questions[indx];
    console.log(questions.length,cindex);
    if(cindex >= questions.length){
        alert(`score : ${score}`);
        $("#getQuestion").hide();
        $("#submitAnswer").hide();
        $("#restart").show();
        return ;
    }
    if(cindex === questions.length - 1 ){
        $("#submitAnswer").text("Submit");
    }

    $("#quiz").append(
        $("<h4>").text(`${indx + 1}. ${currentQuestion.question}`),
        $("<ul>").append(
            currentQuestion.options.map(option => {
                // console.log(option);
                return $("<li>").append(
                    $("<input>").attr({ type: "radio", name: "answer", value: option }),
                    $("<span>").text(option)
                );
            })
        ),
    )       
   
}
$(document).ready(function () {
    $("#getQuestion").click(function () {
        displayQuestion(cindex);  
        $("#submitAnswer").show()
   
    });
});

$(document).ready(function () {
    $("#submitAnswer").click(function(){

        // console.log("submit");
        let userInput = $("input[name = answer]:checked").val();
        if (!userInput) {
            alert("Please select an answer before submitting!");
            return;
        }
        // console.log(userInput);
        if(userInput === questions[cindex].answer){
            // console.log("correct answer");
            score++;
        }
        cindex++;
        displayQuestion(cindex); 
    })
});

$(document).ready(function () {
    $("#restart").click(function () { 
        $("#getQuestion").show();
        cindex=0;
        score=0;
        displayQuestion(cindex);
    });
});