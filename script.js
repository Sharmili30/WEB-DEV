
const resultElement = document.getElementById("result");
let recognition;


function startConverting(){

    if('webkitSpeechRecognition' in window){
        // if windowds supports sppech reg ,  this uses the browsers speech reg api 
        recognition  = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start(); // Start listening
    }
}


function setupRecognition(recognition){

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = 'en-US';  // Set language to English
    
    recognition.onresult = function(event){

        const {finalTranscript , interTranscript } = processResult(event.results);
    
        resultElement.innerHTML = finalTranscript + interTranscript;
        
    }


}


function processResult(results){


    let finalTranscript = '';
    let interTranscript = '';

    for(let i = 0; i < results.length; i++){

        let transcript = results[i][0].transcript;
        transcript.replace("\n","<br>");

        if(results[i].isFinal){

            finalTranscript += transcript;

        }else{

            interTranscript += transcript;
        }

    }

    return {finalTranscript, interTranscript}

}


function stopConverting(){

    if(recognition){
        recognition.stop();
    }

}