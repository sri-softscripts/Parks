/*
	DrSnuggles: Trying to re-create my 2D canvas FFMPG style visualizer
*/

import { spec3D } from './spectrogram.js'

// Function to get URL parameter
function getURLParameter(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

onload = () => {
	window.spec3D = spec3D
	
	// Get sound from URL parameter, default to the original sound
	const soundFromURL = getURLParameter('sound');
	const audioSrc = soundFromURL || 'snd/WulleWulle.mp3';
	
	// Create canvas without visible audio controls
	document.body.innerHTML = `<canvas id="myCanvas"></canvas>`;
	
	// Create hidden audio element
	const myAudio = new Audio(audioSrc);
	myAudio.autoplay = true;
	myAudio.loop = true;
	myAudio.controls = false; // No controls
	myAudio.style.display = 'none'; // Hide it
	
	const myCanvas = document.getElementById('myCanvas');
	
	// Make audio globally accessible
	window.myAudio = myAudio;
	
	// Add event listener properly
	myAudio.addEventListener('play', () => {
		console.log('Audio playing, starting visualization...');
		spec3D.start(myAudio, myCanvas);
		// Notify parent about playback state
		window.parent.postMessage({ type: 'playbackState', isPlaying: true }, '*');
	});
	
	myAudio.addEventListener('pause', () => {
		// Notify parent about playback state
		window.parent.postMessage({ type: 'playbackState', isPlaying: false }, '*');
	});
	
	// Listen for play/pause commands from parent
	window.addEventListener('message', (event) => {
		if (event.data && event.data.type === 'audioControl') {
			if (event.data.action === 'play') {
				myAudio.play();
				window.parent.postMessage({ 
					type: 'audioControlResponse', 
					isPlaying: true 
				}, '*');
			} else if (event.data.action === 'pause') {
				myAudio.pause();
				window.parent.postMessage({ 
					type: 'audioControlResponse', 
					isPlaying: false 
				}, '*');
			}
		}
	});
	
	// Also try to start immediately if audio is already playing
	if (!myAudio.paused) {
		console.log('Audio already playing, starting visualization...');
		spec3D.start(myAudio, myCanvas);
	}
	
	// Handle audio loading errors
	myAudio.addEventListener('error', (e) => {
		console.error('Audio loading error:', e);
		console.error('Failed to load:', audioSrc);
		
		// Try fallback sound
		if (audioSrc !== 'snd/WulleWulle.mp3') {
			console.log('Trying fallback sound...');
			myAudio.src = 'snd/WulleWulle.mp3';
			myAudio.play();
		}
	});
	
	// Start playing
	myAudio.play().catch(error => {
		console.log('Autoplay prevented, waiting for user interaction:', error);
		
		// If autoplay is blocked, start on user interaction
		document.addEventListener('click', () => {
			myAudio.play();
		}, { once: true });
	});
}
