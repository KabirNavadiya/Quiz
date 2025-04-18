let questions = [];
let cindex = 0;
let score = 0;
let userAnswers = [];
$("#submitAnswer").hide();
$("#quiz").hide();
$("#view-answers").hide();
$("#myModal").hide();

$.ajax({
    type: "GET",
    url: "script/quiz.json",
    dataType: "json",
}).done(function (data) {
    questions = data;
})

function displayAnswers(questions){
    $("#Score").text(`Score : ${score} / ${questions.length}`);
    questions.forEach((q,i) => {
        let userans = userAnswers[i];
        let questionEl= $("<h4>").text(`${q.question}`);
        let ulEl = $("<ul>").addClass("option-ul");

        q.options.map(option =>{
            let optionSpan =$("<span>").text(option);

            if(option === q.answer){
                optionSpan.toggleClass("correct-answer");
            }
            if(option ===userans && option !==q.answer){
                optionSpan.toggleClass("wrong-answer");
            }
            let labelEl = $("<label>").addClass("option-label").append(optionSpan);
            let liEl = $("<li>").addClass("option-li").append(labelEl);

            ulEl.append(liEl);
        })
        $("#modal-content").append(questionEl,ulEl);
    });    
}

function displayQuestion(indx) {
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
        displayAnswers(questions);
    });
});