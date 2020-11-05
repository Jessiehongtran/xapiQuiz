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
    }
}

function handleChangeModule2(n){
    var y = document.getElementsByClassName("cat")[parseInt(n)].value;
    alert(y)
    if (x == "true"){
        score += 1
    }
}

function showResult(){
    var result = document.getElementsByClassName("result")[0]
    result.innerHTML = score/total_ques*100 + "%"
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