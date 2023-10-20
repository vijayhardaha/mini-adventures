(function ($) {
	const ddp = {
		// Initialize the DDP (Dynamic Playlist Player) object
		init: () => {
			ddp.player = null; // Initialize the video player
			ddp.currentIndex = null; // Initialize the current playlist index
			ddp.initPlaylist(); // Initialize the playlist
			ddp.popupEvents(); // Set up popup event handlers
		},

		// Initialize the playlist by collecting video information
		initPlaylist: () => {
			ddp.playlist = [];

			// Iterate through video elements and add them to the playlist
			$(".videos .video .video-play").each(function () {
				const _this = $(this);
				ddp.playlist.push({
					id: _this.data("id"),
					src: _this.data("src"),
					title: _this.data("title"),
				});
			});
		},

		// Set up popup event handlers for opening and closing the video popup
		popupEvents: () => {
			$(document)
				.on("click", ".videos .video .video-play", function (e) {
					e.preventDefault();
					const _this = $(this);
					const id = _this.data("id");

					// Open the video popup and add a class to the body
					$(".popup-wrap").addClass("open");
					$("body").addClass("hasPopup");

					ddp.playerEvents(); // Set up player-specific event handlers
					ddp.setSrc(ddp.getIndex(id)); // Set the source for the video player
				})

				.on("click", ".popup-close", function (e) {
					e.preventDefault();

					ddp.player.stop();
					ddp.player.destroy();

					// Close the video popup and remove the class from the body
					$(".popup-wrap").removeClass("open");
					$("body").removeClass("hasPopup");
				});
		},

		// Get the index of a video in the playlist based on its ID
		getIndex: (id) => {
			return ddp.playlist.findIndex((p) => p.id === id);
		},

		// Build the video source object for the player
		buildSrc: (index) => {
			return [
				{
					src: ddp.playlist[index].src,
					provider: "vimeo",
				},
			];
		},

		// Set the video source for the player based on the playlist index
		setSrc: (index) => {
			ddp.currentIndex = index;
			ddp.player.source = {
				type: "video",
				sources: ddp.buildSrc(index),
			};
		},

		// Set up player-specific event handlers
		playerEvents: () => {
			const players = Plyr.setup(".player"); // Initialize Plyr video players
			ddp.player = players[0]; // Store the player object

			// When the player is ready, start playing the video
			ddp.player.on("ready", (event) => {
				ddp.player.play();
			});

			// When the video ends, play the next video in the playlist
			ddp.player.on("ended", (event) => {
				ddp.playNextSong();
			});
		},

		// Play the next video in the playlist
		playNextSong: () => {
			let nextIndex = ddp.currentIndex + 1;
			nextIndex = nextIndex < ddp.playlist.length ? nextIndex : 0;
			ddp.setSrc(nextIndex); // Set the source for the next video
		},
	};

	ddp.init(); // Initialize the DDP object when the document is ready
})(jQuery);
