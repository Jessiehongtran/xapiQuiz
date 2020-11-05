//Variables
var name = "Sammy McGee";
var email = "hongtran@gmail.com"
var total_ques = 2
var score = 0

//Page Load Function
function pageLoaded(){
    
}

function handleChangeModule1(n){
    var x = document.getElementsByClassName("dog")[parseInt(n)].value;
    alert(x)
    if (x == "true"){
        score += 1
        localStorage.setItem('score', score)
    }
    
}

function handleChangeModule2(n){
    var y = document.getElementsByClassName("cat")[parseInt(n)].value;
    alert(y)
    if (y == "true"){
        var newScore = parseInt(localStorage.getItem('score')) + 1
        localStorage.setItem('score', newScore)
    }
    
}

function showResult(){
    var result = document.getElementsByClassName("result")[0]
    var final_score = localStorage.getItem('score')
    console.log('final', final_score)
    if (parseInt(final_score)/total_ques*100 >= 50){
        result.innerHTML = parseInt(final_score)/total_ques*100 + "%" + "   You passed!!!"
    } else {
        result.innerHTML = parseInt(final_score)/total_ques*100 + "%" + "   You failed :("
    }
    localStorage.setItem('score', 0)
}

//Send statement
function sendOverStatement(){

    var statement = {
        "actor": {
            "mbox": "mailto:" + email,
            "name": name,
            "objectType": "Agent"
        },
        "verb": {
            "id": "http://adlnet.gov/expapi/verbs/interacted",
            "display": {"en-US": "interacted"}
        },
        "object": {
            "id": "http://punklearning.com/xapi/simple_button",
            "definition": {
                "name": {"en-US": "Simple button example"},
                "description": {"en-US": "Simple button example xAPI button"}
            },
            "objectType": "Activity"
        }
    }

    alert('Statement has been sent over')

    ADL.XAPIWrapper.sendStatement(statement);


}

//On Blur Events
function saveName(){
    name = document.getElementById('nameEntered').value;
}

function saveEmail(){
    email = document.getElementById('userEmail').value;
}