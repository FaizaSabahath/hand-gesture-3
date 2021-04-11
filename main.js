Webcam.set({
    width : 350,
    height : 300,
    img_format : 'png',
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5 version : ",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ewzl7li0y/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded !");
}
prediction_1 = "";
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is "+prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        speak();
        if(results[0].label == "nice"){
            document.getElementById("update_emoji").innerHTML = "&#128077"+"All the best";
        }
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076"+"Amazing!";
        }
        if(results[0].label == "clap"){
            document.getElementById("update_emoji").innerHTML = "&#128079"+"Clap!";
        }
        if(results[0].label == "high5"){
            document.getElementById("update_emoji").innerHTML = "&#128400"+"High 5!";
        }
        if(results[0].label == "rock"){
            document.getElementById("update_emoji").innerHTML = "&#129311"+"Rock!";
        }
    }
}