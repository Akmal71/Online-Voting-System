let mediaRecorder;
    let chunks = [];
    const liveVideo = document.getElementById('liveVideo');
    const recordButton = document.getElementById('record');
    const stopButton = document.getElementById('stop');
    const recordedVideo = document.getElementById('newvid');

    console.log(liveVideo);
    console.log(recordButton);
    console.log(stopButton);
    console.log(recordedVideo);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                liveVideo.srcObject = stream;
                liveVideo.play();
                mediaRecorder = new MediaRecorder(stream);

                recordButton.onclick = () => {
                    mediaRecorder.start();
                    console.log("recorder started");
                    recordButton.disabled = true;
                    stopButton.disabled = false;
                };

                stopButton.onclick = () => {
                    mediaRecorder.stop();
                    console.log("recorder stopped");
                    recordButton.disabled = false;
                    stopButton.disabled = true;
                };

                mediaRecorder.ondataavailable = (e) => {
                    console.log("pushing video data")
                    chunks.push(e.data);
                };

                mediaRecorder.onstop = (e) => {
                    const blob = new Blob(chunks, { type: 'video/mp4' });
                    chunks = [];
                    const videoUrl = window.URL.createObjectURL(blob);
                    recordedVideo.src = videoUrl;
                    console.log("video url", recordedVideo.src);
                };
            })
            .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
    } else {
        console.log("getUserMedia not supported on your browser!");
    }