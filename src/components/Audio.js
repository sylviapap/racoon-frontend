import React, { Component, Fragment } from 'react'
import NavBar from './NavBar'

const audioRecorder = null

class Audio extends Component {

  state = {
    recording: false
  }

  handleRecord = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(this.handleSuccess);
  }

  handleAudio = (event) => {
    const player = document.getElementById('player');
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    player.src = url;
  }

  handleSuccess = (stream) => {
    const player = document.getElementById('player');
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(1024, 1, 1);
    const options = {mimeType: 'audio/webm'};
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);
    const downloadLink = document.getElementById('download');
    let shouldStop = false;
    let stopped = false;

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'acetest.wav';
    });

    mediaRecorder.start();

    source.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = function(e) {
      // Do something with the data, e.g. convert it to WAV
      console.log(e.inputBuffer);
    };

    audioRecorder.exportWAV();
    mediaRecorder.setupDownload = function(blob, filename){
      var url = (window.URL || window.webkitURL).createObjectURL(blob);
      var link = document.getElementById("save");
      link.href = url;
      link.download = filename || 'output.wav';
    }

    if (window.URL) {
      player.srcObject = stream;
    } else {
      player.src = stream;
    }
  };

  toggleRecording = (e) => {
    if (this.state.recording) {
      // stop recording
      audioRecorder.stop();
      this.setState({recording: false})
    } 
    else {
      // start recording
      if (!audioRecorder)
          return;
      this.setState({recording: true})
      audioRecorder.clear();
      audioRecorder.record();
    }
  }

  saveRecording = () => {

  }

  // doneEncoding = (blob) => {
  //   mediaRecorder.setupDownload(blob, "myRecording" + ((recIndex < 10) ? "0" : "") + recIndex + ".wav" );
  //   recIndex++;
  // }

  

  render() {
    return (
      <Fragment >
      <NavBar />
      <header className="welcome"><h1 className="welcome">Record a Cough</h1></header>
      <div className="medical-info audio">
        <input type="file" accept="audio/*" capture id="recorder" onChange={this.handleAudio}/>
        <audio id="player" controls></audio>

        <div id="controls">
          <i className="fa fa-microphone" onClick={this.toggleRecording} />
          <i className="fa fa-save" onClick={this.saveRecording}/>
        </div>
      </div>
      </Fragment>
    )
  }
}

export default Audio