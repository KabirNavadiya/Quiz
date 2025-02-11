let questions = [];
let cindex = 0;
let score = 0;
$("#submitAnswer").hide();
$("#restart").hide();
$("#quiz").hide();

$.ajax({
    type: "GET",
    url: "script/quiz.json",
    dataType: "json",
}).done(function (data) {
    questions = data;
})

function displayQuestion(indx) {
    $("#quiz").empty();
    $("#quiz").fadeIn();
    $("#submitAnswer").show()
    $("#submitAnswer").text("Next");

    $("#getQuestion").hide();
    let currentQuestion = questions[indx];
    if (cindex >= questions.length) {
        alert(`score : ${score}`);
        $("#restart").show();
        $("#quiz").hide();
        $("#submitAnswer").hide();
        return;
    }
    if (cindex === questions.length - 1) {
        $("#submitAnswer").text("Submit");
    }

    $("#quiz").append(
        $("<h4>").text(`${indx + 1}. ${currentQuestion.question}`),
        $("<ul>").append(
            currentQuestion.options.map(option => {
                return $("<li>").append(
                    $("<label>").addClass("option-label").append(
                        $("<input>").attr({ type: "radio", name: "answer", value: option }).addClass("form-input"),
                        $("<span>").text(option)
                    )
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
    $("#submitAnswer").click(function () {
        let userInput = $("input[name = answer]:checked").val();
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
        cindex = 0;
        score = 0;
        displayQuestion(cindex);
    });
});