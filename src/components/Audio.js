import React, { Component, Fragment } from 'react'
import NavBar from './NavBar'
import { ReactMic } from 'react-mic';

class Audio extends Component {

  state = {
    record: false,
    blob: [],
    href: ""
  }
 
  startRecording = () => {
    this.setState({ record: true });
  }
 
  stopRecording = () => {
    this.setState({ record: false });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop = (recordedBlob) => {
    this.setState({blob: recordedBlob, href: URL.createObjectURL(recordedBlob.blob)})
    console.log('recordedBlob', recordedBlob);
  }

  saveRecording = () => {
    console.log("saved?")
  }

  render() {

    return (
      <Fragment >
      <NavBar />
      <header className="welcome"><h1 className="welcome">Record a Cough</h1></header>
      <div className="medical-info audio-page">
        <span className="info">This component is a work in progress. You may press start for a visualization of audio and then stop, then download your recording as a .wav file. Soon you will be able to submit the recording to be saved to our database for a doctor to review, and/or use machine learning audio recognition to identify if your cough matches the sound of coughs from confirmed COVID-19 patients.</span>
      <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#c9d5fb" />

        <div className="audio-buttons-container">

          <button onClick={this.startRecording} type="button">
            <i className="fa fa-microphone"/>Start
          </button>
          <button onClick={this.stopRecording} type="button">
            <i className="fa fa-microphone"/>Stop
          </button>
          
          <a className="download-btn record" href={this.state.href} download='test.wav' onClick={this.saveRecording}><i className="fa fa-save"/>Download</a>

        </div>
      </div>
      </Fragment>
    )
  }
}

export default Audio