// This is just a backupfile for other website.
// Please ignore this file.


// Function to initialize video interactions
window.onload = () => {
  // Create an object to store the current time for each video
  const videoCurrentTimes = {};

  // Get all video elements within article cards
  const articleCardVideos = document.querySelectorAll('#card-grid article video');

  // Iterate through each video container
  articleCardVideos.forEach((video) => {
    // Find the closest article card container and its image layer
    const articleCardContainer = video.closest('.fr-article-card-charlie');
    const imageLayer = articleCardContainer.querySelector('.fr-article-card-charlie__image-wrapper');

    // Set video attributes and behavior
    video.muted = true; // Mute the video
    video.volume = 0; // Set volume to 0
    video.setAttribute('disableRemotePlayback', 'true'); // Disable remote playback
    video.setAttribute('disablePictureInPicture', 'true'); // Disable picture-in-picture

    // Add a click event listener to prevent default behavior
    video.addEventListener('click', (event) => {
      event.preventDefault();
      return false;
    });

    // Add mouseenter event listener
    articleCardContainer.addEventListener('mouseenter', () => {
      // If there's a stored current time, set the video to that time
      if (videoCurrentTimes[video.id]) {
        video.currentTime = videoCurrentTimes[video.id];
      }
      video.play(); // Play the video
      imageLayer.style.opacity = 0; // Change image opacity to 0 on hover
    });

    // Add mouseleave event listener
    articleCardContainer.addEventListener('mouseleave', () => {
      videoCurrentTimes[video.id] = video.currentTime; // Store the current time
      video.pause(); // Pause the video
      imageLayer.style.opacity = 1; // Restore image opacity on mouse leave
    });
  });
};
