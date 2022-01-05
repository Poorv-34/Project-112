Webcam.set({
    width:350,
    height:350,
    image_format : 'png',
    png_quality:90

});

camera = document.getElementById("camera");
Webcam.attach('#camera');


function call_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

    console.log('ml5 version:', ml5.version);

    classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OFIn9anD6/model.json',modelLoaded);

    function modelLoaded() {
        console.log('Model loaded');
    }

    function check(){
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResult);
    }

    function gotResult(error, results) {
        if (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("result_gesture_name").innerHTML = results[0].label;
            gesture = results [0].label;
            toSpeak = "";
            if(gesture == "wave")
            {
                toSpeak = "I am waving my hand";
                document.getElementById("update_gesture").innerHTML = "&#128075;";
            }
            if(gesture == "up")
            {
                toSpeak = "My finger is pointing up";
                document.getElementById("update_gesture").innerHTML = "&#128070;";
            }
            if(gesture == "down")
            {
                toSpeak = "I am pointing down";
                document.getElementById("update_gesture").innerHTML = "&#128071;";
            }

            speak();
        }
    }

    function speak(){
        var synth = window.speechSynthesis;
       speak_data = toSpeak;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }