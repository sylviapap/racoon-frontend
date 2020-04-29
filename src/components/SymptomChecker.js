import React, {Component} from 'react';
import {symptoms} from '../services/symptoms'

const headers = {
  "App-Id": "582e2307",
  "App-Key": "c98b58a9bf15795b1dacdfebe5375701",
  "Content-Type": "application/json"
}

class SymptomChecker extends Component {
  state = {
    fields: {
      age: ""
    },
    radio: {
      sex: ""
    },
    symptom_ids: []
  }

  handleChange = (event) => {
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
  };

  handleRadioChange = (event) => {
    this.setState({radio: {sex: event.target.value}})
  }

  handleSelect = (event) => {
    const options = event.target.options;
    const value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({symptom_ids: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const evidence = this.state.symptom_ids.map(s => Object.assign({}, {"id": s, "choice_id": "present"}));
    console.log(evidence)
    fetch("https://api.infermedica.com/covid19/diagnosis", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        "sex": this.state.radio.sex,
        "age": parseInt(this.state.fields.age),
        "evidence": evidence
      })
    })
    .then(response => response.json())
    .then(json => console.log(json))
  }
  
  render() {
    console.log(this.state.symptom_ids)
    return(
      <div className="symptom-checker">
        <h5 className="card-title">Please select your sex and age.</h5>
        <form onSubmit={this.handleSubmit} >
          <label className="label">Sex:</label>
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="male" 
              checked={this.state.radio.sex === "male"}
              onChange={this.handleRadioChange} />
                <label><i className="fa fa-fw fa-mars"/>Male</label>
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="female" 
              checked={this.state.radio.sex === "female"}
              onChange={this.handleRadioChange} />
                <label><i className="fa fa-fw fa-venus"/>Female</label>
          <label className="label">Age:</label>
            <input 
              type="number"
              min="1"
              step="1"
              className="form-control" 
              id="input-age"
              name="age"
              value={this.state.fields.age} 
              onChange={this.handleChange} />
          <label>Select your symptoms: (Hold Ctrl or Cmd to select multiple)</label>
            <select 
              multiple={true} 
              value={this.state.symptom_ids} 
              onChange={this.handleSelect} >
                {symptoms.map(symptom => 
                  <option 
                    value={symptom["id"]} 
                    key={symptom["id"]}>
                      {symptom["common_name"]}
                  </option>)}
            </select>
            <input 
              type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SymptomChecker