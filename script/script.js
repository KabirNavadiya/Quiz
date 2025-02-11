let questions = [];
let cindex = 0;
let score = 0;
let userAnswers = [];
$("#submitAnswer").hide();
$("#restart").hide();
$("#quiz").hide();
$("#view-answers").hide();
$("#myModal").hide();

$.ajax({
    type: "GET",
    url: "script/quiz.json",
    dataType: "json",
}).done(function (data) {
    questions = data;
    displayAnswers(questions);
})

function displayAnswers(questions){
    // console.log(questions);
    questions.forEach((q,i) => {
        // console.log(q.question);
        let userans = userAnswers[i];
        $("#modal-content").append(
            $("<h4>").text(`${q.question}`),
            $("<ul>").addClass("option-ul").append(
                q.options.map(option => 
                    $("<li>").addClass("option-li").append(
                        $("<label>").addClass("option-label").append(                            
                            $("<span>").text(option).toggleClass("correct-answer",option===q.answer).toggleClass("wrong-answer",option === userans && userans !== q.answer),
                        )
                    )
                )
            )
        )
    });    
}



function displayQuestion(indx) {
    // console.log(questions[0]);
    console.log(indx);

    console.log(questions[indx]);
    $("#quiz").empty();
    $("#quiz").fadeIn();
    $("#submitAnswer").show()
    $("#submitAnswer").text("Next");

    $("#getQuestion").hide();
    let currentQuestion = questions[indx];
    if (cindex === questions.length - 1) {
        $("#submitAnswer").text("Submit");
    }
    if (cindex < questions.length) {
        $("#quiz").append(
            $("<h4>").text(`${indx + 1}. ${currentQuestion.question}`),
            $("<ul>").addClass("option-ul").append(
                currentQuestion.options.map(option => {
                    return $("<li>").addClass("option-li").append(
                        $("<label>").addClass("option-label").append(
                            $("<input>").attr({ type: "radio", name: "answer", value: option }),
                            $("<span>").text(option)
                        )
                    );
                })
            ),
        )
    } else {
        if (score > 4) {
            $("#quiz").hide();
            $("#submitAnswer").hide();
            $(".score-display").append(
                $("<p>").text(`Congratulation ! You Passed The Exam.`),
                $("<p>").text(`You Scored ${score} / ${questions.length}`)
            )
            $("#view-answers").show();
        } else {
            $("#restart").show();
            $("#quiz").hide();
            $("#submitAnswer").hide();
            $(".score-display").append(
                $("<p>").text(`Oops ! You Failed The Exam.`),
                $("<p>").text(`You Scored ${score} / ${questions.length}`),
                $("<p>").text(`Better Luck Next Time ! `)
            )
            $("#view-answers").show();
        }


    }

}
$(document).ready(function () {
    $("#getQuestion").click(function () {
        $(".text-container").hide();
        displayQuestion(cindex);
        $("#submitAnswer").show()

    });
});

$(document).ready(function () {
    $("#submitAnswer").click(function () {
        let userInput = $("input[name = answer]:checked").val();
        userAnswers.push(userInput);
        if (!userInput) {
            alert("Please select an answer before submitting!");
            return;
        }
        if (userInput === questions[cindex].answer) {
            score++;
        }
        cindex++;
        displayQuestion(cindex);


    })
});

$(document).ready(function () {
    $("#restart").click(function () {
        $("#restart").hide();
        $(".score-display").hide();
        cindex = 0;
        score = 0;
        displayQuestion(cindex);
    });
});

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
$(document).ready(function () {
    $("#view-answers").click(function () {
        $("#myModal").show();
    });
});