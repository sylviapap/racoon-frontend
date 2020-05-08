import React, { Component, Fragment } from 'react'
import NavBar from './NavBar'

const options = {mimeType: 'audio/webm'};

class Audio extends Component {

  state = {
    audioRecorder: null,
    stopped: true,
    recordedChunks: [],
    href: "",
    download: ""
  }

  stop = () => {
    this.setState({
      stopped: true,
      href: URL.createObjectURL(new Blob(this.state.recordedChunks)),
      download: 'acetest.wav'
    })
  }

  handleStart = () => {
    this.setState({stopped: false})
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
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        this.state.recordedChunks.push(e.data);
      }
    });

    mediaRecorder.start();
    if (this.state.stopped) {
      mediaRecorder.stop();
    }
  }

  render() {

    return (
      <Fragment >
      <NavBar />
      <header className="welcome"><h1 className="welcome">Record a Cough</h1></header>
      <div className="medical-info audio">
        <input type="file" accept="audio/*" capture id="recorder" onChange={this.handleAudio}/>
        <audio id="player" controls></audio>

        <div id="controls">
          <button id="start" onClick={this.handleStart}><i className="fa fa-microphone"/>Start</button>

          <button id="stop" onClick={this.stop}><i className="fa fa-microphone"/>Stop</button>

          <button onClick={this.saveRecording}><i className="fa fa-save"/></button>

          <a href={this.state.href} download={this.state.download} id="download">Download</a>
        </div>
      </div>
      </Fragment>
    )
  }
}

export default Audio