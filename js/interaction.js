//Various variables
var total_ques = 2
var score = 0
var videoHalfWay = 0;
var currentTime;
var durationTime;

//Actor Variables
var name = "Sammy McGee";
var email = "hongtran@gmail.com"
var firstPlayDone = false

//Video reference
var video1 = document.getElementById('video1')

//Page Load Function
function pageLoaded(){

    //Pause video
    video1.pause();

    //Connecting to LRS
    var conf = {
        "endppoint": "https://cloud.scorm.com/lrs/O57KUPW99H/sandbox/",
        "auth": "Basic " + toBase64('XUgMo-atjvB1d_NVjJo:k8v2QdNti8_2zvzbfvA')
    }
    ADL.XAPIWrapper.changeConfig(conf);

    //Show prompt
    $('#namePrompt').modal('show')

}

//GET xAPI statement
function getxAPIStatement(actorEmail, actorName, verbId, verbDisplay, objectID, objectName, objectDescription){
    return {
        "actor": {
            "mbox": "mailto:" + actorEmail,
            "name": actorName,
            "objectType": "Agent"
        },
        "verb": {
            "id": verbId,
            "display": {"en-US": verbDisplay}
        },
        "object": {
            "id": objectID,
            "definition": {
                "name": {"en-US": objectName},
                "description": {"en-US": objectDescription}
            },
            "objectType": "Activity"
        }
    }
}

//Video loaded
video1.onloadedmetadata = function(){
    //Figuring out times
    videoHalfWay = Math.round(video1.duration/2)
    durationTime = Math.round(video1.duration);
}

//Video Half Way
video1.ontimeupdate = function(){
    //Update current time
    currentTime = Math.round(video1.currentTime);

    if (currentTime == videoHalfWay){
        var videoHalf = getxAPIStatement(
                            localStorage.getItem('email'),
                            localStorage.getItem('name'),
                            "http://activitystrea.ms/schema/1.0/consume",
                            "consumed",
                            "http://punklearning.com/xapi/video_1",
                            "Video 1",
                            "at least half of the video"
                        )

        ADL.XAPIWrapper.sendStatement(videoHalf);
    }

    if (currentTime == durationTime){
        var videoEnd = getxAPIStatement(
                            localStorage.getItem('email'),
                            localStorage.getItem('name'),
                            "http://activitystrea.ms/schema/1.0/complete",
                            "completed",
                            "http://punklearning.com/xapi/video1",
                            "Video 1",
                            " the video"
                        )

        ADL.XAPIWrapper.sendStatement(videoEnd);
    }
}

//Video play
video1.onplaying = function(){
    var videoPlay = getxAPIStatement(
                        localStorage.getItem('email'),
                        localStorage.getItem('name'),
                        "http://adlnet.gov/expapi/verbs/initialized",
                        "initialized",
                        "http://punklearning.com/xapi/video1",
                        "Video 1",
                        " the video"
                    )
    ADL.XAPIWrapper.sendStatement(videoPlay); 
}

//Video pause
video1.onpause = function(){
    var videoPause = getxAPIStatement(
                        localStorage.getItem('email'),
                        localStorage.getItem('name'),
                        "https://w3id.org/xapi/video/verbs/paused",
                        "paused",
                        "http://punklearning.com/xapi/video1",
                        "Video 1",
                        " the video at " + currentTime + " seconds."
                    )
    ADL.XAPIWrapper.sendStatement(videoPause); 
}


//Change answer ques 1
function handleChangeModule1(n){
    var x = document.getElementsByClassName("dog")[parseInt(n)].value;
    alert(x)
    if (x == "true"){
        score += 1
        localStorage.setItem('score', score)
    }

    var statement = getxAPIStatement(
                        localStorage.getItem('email'),
                        localStorage.getItem('name'),
                        "https://w3id.org/xapi/dod-isd/verbs/accessed",
                        "accessed",
                        "http://punklearning.com/xapi/access_question_1",
                        "question 1",
                        "question 1"
                    )

    ADL.XAPIWrapper.sendStatement(statement);
    
}

//Send statement after question 1
function sendDoneQues1(){
    var statement = getxAPIStatement(
                        localStorage.getItem('email'),
                        localStorage.getItem('name'),
                        "https://w3id.org/xapi/dod-isd/verbs/advanced",
                        "advanced",
                        "http://punklearning.com/xapi/advanced_1",
                        "question 2",
                        "to question 2"
                    )

    ADL.XAPIWrapper.sendStatement(statement);
}

//Send statement after question 2
function sendDoneQues2(){
    var statement = getxAPIStatement(
                        localStorage.getItem('email'),
                        localStorage.getItem('name'),
                        "https://w3id.org/xapi/dod-isd/verbs/advanced",
                        "advanced",
                        "http://punklearning.com/xapi/advanced_2",
                        "from question 2",
                        "from question 2"
                     )

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

    var statement = getxAPIStatement(
                        localStorage.getItem('email'), 
                        localStorage.getItem('name'), 
                        "https://w3id.org/xapi/dod-isd/verbs/accessed", 
                        "accessed", 
                        "http://punklearning.com/xapi/access_question_2", 
                        "question 2", 
                        "question 2"
                    )

    ADL.XAPIWrapper.sendStatement(statement);
    
}

//Show result
function showResult(){
    var result = document.getElementsByClassName("result")[0]
    var final_score = localStorage.getItem('score')
    console.log('final', final_score)
    if (parseInt(final_score)/total_ques*100 >= 50){
        result.innerHTML = parseInt(final_score)/total_ques*100 + "%" + "   You passed!!!"
    } else if (parseInt(final_score)/total_ques*100 < 50) {
        result.innerHTML = parseInt(final_score)/total_ques*100 + "%" + "   You failed :("
    }
    else {
        result.innerHTML = "0%" + "   You failed :("
    }
    localStorage.setItem('score', 0)
}

//Send statement over first button click
function sendOverStatement(){

    var statement = getxAPIStatement(
                        email, 
                        name, 
                        "http://adlnet.gov/expapi/verbs/interacted", 
                        "interacted", 
                        "http://punklearning.com/xapi/simple_button", 
                        "Simple button example", 
                        "Simple button example xAPI button"
                    )

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