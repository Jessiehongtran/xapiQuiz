//Variables
var name = "Sammy McGee";
var email = "hongtran@gmail.com"
var total_ques = 2
var score = 0

//Page Load Function
function pageLoaded(){
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
}


//Change answer ques 1
function handleChangeModule1(n){
    var x = document.getElementsByClassName("dog")[parseInt(n)].value;
    alert(x)
    if (x == "true"){
        score += 1
        localStorage.setItem('score', score)
    }

    var statement = {
        "actor": {
            "mbox": "mailto:" + localStorage.getItem('email'),
            "name": localStorage.getItem('name'),
            "objectType": "Agent"
        },
        "verb": {
            "id": "https://w3id.org/xapi/dod-isd/verbs/accessed",
            "display": {"en-US": "accessed"}
        },
        "object": {
            "id": "http://punklearning.com/xapi/access_question_1",
            "definition": {
                "name": {"en-US": "Accessed question 1"},
                "description": {"en-US": "Accessed question 1"}
            },
            "objectType": "Activity"
        }
    }

    ADL.XAPIWrapper.sendStatement(statement);
    
}

//Send statement after question 1
function sendDoneQues1(){
    var statement = {
        "actor": {
            "mbox": "mailto:" + localStorage.getItem('email'),
            "name": localStorage.getItem('name'),
            "objectType": "Agent"
        },
        "verb": {
            "id": "https://w3id.org/xapi/dod-isd/verbs/advanced",
            "display": {"en-US": "advanced"}
        },
        "object": {
            "id": "http://punklearning.com/xapi/advanced_1",
            "definition": {
                "name": {"en-US": "Move on from question 1"},
                "description": {"en-US": "Move on from question 1"}
            },
            "objectType": "Activity"
        }
    }

    ADL.XAPIWrapper.sendStatement(statement);
}

//Send statement after question 2
function sendDoneQues2(){
    var statement = {
        "actor": {
            "mbox": "mailto:" + localStorage.getItem('email'),
            "name": localStorage.getItem('name'),
            "objectType": "Agent"
        },
        "verb": {
            "id": "https://w3id.org/xapi/dod-isd/verbs/advanced",
            "display": {"en-US": "advanced"}
        },
        "object": {
            "id": "http://punklearning.com/xapi/advanced_2",
            "definition": {
                "name": {"en-US": "Move on from question 2"},
                "description": {"en-US": "Move on from question 2"}
            },
            "objectType": "Activity"
        }
    }

    ADL.XAPIWrapper.sendStatement(statement);
}

//Change answer ques 2
function handleChangeModule2(n){
    var y = document.getElementsByClassName("cat")[parseInt(n)].value;
    alert(y)
    if (y == "true"){
        var newScore = parseInt(localStorage.getItem('score')) + 1
        localStorage.setItem('score', newScore)
    }

    var statement = {
        "actor": {
            "mbox": "mailto:" + localStorage.getItem('email'),
            "name": localStorage.getItem('name'),
            "objectType": "Agent"
        },
        "verb": {
            "id": "https://w3id.org/xapi/dod-isd/verbs/accessed",
            "display": {"en-US": "accessed"}
        },
        "object": {
            "id": "http://punklearning.com/xapi/access_question_2",
            "definition": {
                "name": {"en-US": "Accessed question 2"},
                "description": {"en-US": "Accessed question 2"}
            },
            "objectType": "Activity"
        }
    }

    ADL.XAPIWrapper.sendStatement(statement);
    
}

//Show result
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

//Send statement over first button click
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
    localStorage.setItem('name', name)
}

function saveEmail(){
    email = document.getElementById('userEmail').value;
    localStorage.setItem('email', email)
}