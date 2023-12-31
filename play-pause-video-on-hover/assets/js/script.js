// Create an object to store the current time for each video
const videoCurrentTimes = {};

// Get all video elements
const videos = document.querySelectorAll(".video");

// Define a function to handle video interactions
function handleVideoInteraction(video, imageLayer) {
	return () => {
		if (videoCurrentTimes[video.id]) {
			video.currentTime = videoCurrentTimes[video.id];
		}
		video.play();
		imageLayer.style.opacity = 0; // Change image opacity to 0 on interaction
	};
}

// Define a function to handle the end of video interactions
function handleVideoInteractionEnd(video, imageLayer) {
	return () => {
		videoCurrentTimes[video.id] = video.currentTime;
		video.pause();
		imageLayer.style.opacity = 1; // Restore image opacity on interaction end
	};
}

// Add event listeners to each video container
videos.forEach((video) => {
	const container = video.closest(".video-container");
	const imageLayer = container.querySelector(".image-layer");

	video.muted = true;
	video.volume = 0;
	video.setAttribute("disableRemotePlayback", "true");
	video.setAttribute("disablePictureInPicture", "true");

	container.addEventListener(
		"mouseenter",
		handleVideoInteraction(video, imageLayer)
	);
	container.addEventListener(
		"mouseleave",
		handleVideoInteractionEnd(video, imageLayer)
	);

	// Add touch event listeners for touch devices
	container.addEventListener(
		"touchstart",
		handleVideoInteraction(video, imageLayer)
	);
	container.addEventListener(
		"touchend",
		handleVideoInteractionEnd(video, imageLayer)
	);
});
