/*
 * Check for browser support
 */
var supportMsg = document.getElementById('msg');

if (! 'speechSynthesis' in window) {
	supportMsg.innerHTML = 'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
	supportMsg.classList.add('not-supported');
}

const button = $('#speak');

var chuckNorrisFact = document.getElementById('fact');

// Get the voice select element.
var voiceSelect = document.getElementById('voice');

// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');


// Fetch the list of voices and populate the voice options.
function loadVoices() {
  	// Fetch the available voices.
	var voices = speechSynthesis.getVoices();
  
  	// Loop through each of the voices.
	voices.forEach(function(voice, i) {
    	// Create a new option element.
		var option = document.createElement('option');
    
    	// Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;
		  
    	// Add the option to the voice selector.
		voiceSelect.appendChild(option);
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};

button.click(function() {
	$.get('https://api.chucknorris.io/jokes/random', function(data) {
		console.log("Response Data: ", data);
		var msg = new SpeechSynthesisUtterance(data.value);
		
	  	// Set the attributes.
		msg.volume = parseFloat(volumeInput.value);
		msg.rate = parseFloat(rateInput.value);
		msg.pitch = parseFloat(pitchInput.value);
	  
	  	// If a voice has been selected, find the voice and set the
	  	// utterance instance's voice attribute.
		if (voiceSelect.value) {
			msg.voice = speechSynthesis.getVoices().filter(function(voice) {
			return voice.name == voiceSelect.value; })[0];
		}
	
		chuckNorrisFact.innerHTML = data.value;
		//chuckNorrisFact.classList.add('chuck-facts');

  		// Queue this utterance.
		window.speechSynthesis.speak(msg);
	});
});
