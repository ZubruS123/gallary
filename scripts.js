const videos = [
    { title: 'GYATT', src: 'videos/video1.mp4', type: 'video/mp4', poster: 'photos/poster_video1.jpg' },
    { title: 'Clock Tower', src: 'videos/video2.mp4', type: 'video/mp4', poster: 'photos/poster_video2.jpg' },
    { title: 'GYATT 2', src: 'videos/video3.mp4', type: 'video/mp4', poster: 'photos/poster_video3.jpg' },
    { title: 'OliX Edit 1', src: 'videos/video4.mp4', type: 'video/mp4', poster: 'photos/poster_video4.jpg' },
    { title: 'OliX Edit 2', src: 'videos/video5.mp4', type: 'video/mp4', poster: 'photos/poster_video5.jpg' },
    // Add more video data as needed
];

function displayVideos() {
    const videoList = document.querySelector('.video-list');

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.setAttribute('data-title', video.title); // Set data-title attribute

        const videoThumbnail = document.createElement('img');
        videoThumbnail.src = video.poster; 
        videoThumbnail.alt = video.title;

        const videoTitle = document.createElement('p');
        videoTitle.textContent = video.title;
        videoTitle.style.marginTop = '10px';
        videoTitle.style.textAlign = 'center'; // Center-align the title

        videoItem.appendChild(videoThumbnail);
        videoItem.appendChild(videoTitle);
        videoList.appendChild(videoItem);

        videoItem.addEventListener('click', () => {
            openVideoModal(video.src, video.poster);
        });
    });
}

// ... (rest of the code remains unchanged)



function openVideoModal(videoSrc) {
    const videoModal = document.querySelector('.video-modal');
    const videoPlayer = document.getElementById('video-player');
    const closeBtn = document.querySelector('.close-btn');

    videoPlayer.src = videoSrc;
    videoModal.style.display = 'flex';

    closeBtn.addEventListener('click', () => {
        closeVideoModal();
    });

    videoPlayer.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    });

    videoPlayer.addEventListener('dblclick', () => {
        toggleFullScreen(videoPlayer);
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    videoPlayer.play(); // Play the video programmatically
}



function closeVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    const videoPlayer = document.getElementById('video-player');

    videoModal.style.display = 'none';
    videoPlayer.pause();
}

function toggleFullScreen(element) {
    if (!document.fullscreenElement) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayVideos();

    const searchInput = document.getElementById('searchInput');
    const videoItems = document.querySelectorAll('.video-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        videoItems.forEach(item => {
            const title = item.getAttribute('data-title').toLowerCase();

            if (title.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
