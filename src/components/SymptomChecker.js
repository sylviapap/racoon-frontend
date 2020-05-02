import React, {Component, Fragment} from 'react';
import {riskFactors} from '../services/riskFactors'
import NavBar from './NavBar'
import Results from './Results'
import {API_ROOT} from '../services/api'

const infermedicaHeaders = {
  "App-Id": process.env.REACT_APP_INFERMEDICA_APP_ID,
  "App-Key": process.env.REACT_APP_INFERMEDICA_APP_KEY,
  "Content-Type": "application/json"
}

class SymptomChecker extends Component {
  // state.symptoms comes from my backend
  state = {
    symptoms: [], 
    fields: {
      age: "",
      sex: ""
    },
    symptom_ids: [],
    riskInput: [],
    response: {}
  }

  componentDidMount() {
    fetch(`${API_ROOT}/symptoms`)
    .then(resp => resp.json())
    .then(json => this.setState({symptoms: json}))
  }

  handleChange = (event) => {
    const newFields = { ...this.state.fields, [event.target.name]: event.target.value };
    this.setState({ fields: newFields });
  };

  handleSelect = (event) => {
    const options = event.target.options;
    const value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({[event.target.name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const symptomArray = this.state.symptom_ids.map(s => Object.assign({}, {"id": s, "choice_id": "present"}));
    const symptomsAbsent = this.state.symptoms.filter(s => !this.state.symptom_ids.includes(s.infermedica_id))
    const symptomsAbsentArray = symptomsAbsent.map(s => Object.assign({}, {"id": s.infermedica_id, "choice_id": "absent"}));
    console.log(symptomsAbsentArray)

    const riskArray = this.state.riskInput.map(rf => Object.assign({}, {"id": rf, "choice_id": "present"}));
    const risksAbsent = riskFactors.filter(rf => !this.state.riskInput.includes(rf.id))
    console.log(risksAbsent)
    const risksAbsentArray = risksAbsent.map(rf => Object.assign({}, {"id": rf.id, "choice_id": "absent"}));
    console.log(risksAbsentArray)

    const symptomEvidence = symptomArray.concat(symptomsAbsentArray)
    const riskEvidence = riskArray.concat(risksAbsentArray)
    const evidence = symptomEvidence.concat(riskEvidence)
    console.log(evidence)
    fetch("https://api.infermedica.com/covid19/triage", {
      method: "POST",
      headers: infermedicaHeaders,
      body: JSON.stringify({
        "sex": this.state.fields.sex,
        "age": parseInt(this.state.fields.age),
        "evidence": evidence
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({response: json})
    })
  }
  
  render() {
    if (this.state.response.serious) {const results = this.state.response.serious.map(a => a.common_name)
    console.log(results)}
    return(
      <Fragment>
      <NavBar />
      <div className="symptom-checker">
        <h1 className="card-title">Symptom Check</h1>
        {!!this.state.response.serious ? 
          <Results response={this.state.response}/>
          : 
          <p>Please fill in your information</p>
        }
        {!!this.state.response.message ?
        <p>Error!! {this.state.response.message}</p>
        :
        null}
        <form onSubmit={this.handleSubmit} >
          <label className="label">Sex:</label>
          <div className="field">
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="male" 
              checked={this.state.fields.sex === "male"}
              onChange={this.handleChange} />
                <label><i className="fa fa-fw fa-mars"/>Male</label>
          </div>
          <div className="field">
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="female" 
              checked={this.state.fields.sex === "female"}
              onChange={this.handleChange} />
                <label><i className="fa fa-fw fa-venus"/>Female</label>
            </div>
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
          <label>Select your symptoms:</label>
            {/* {this.state.symptoms.map(symptom => 
              <label>{symptom.common_name}
                <input 
                  type="checkbox"
                  checked={this.state.evidence.choice_id === "present"} 
                  value={symptom.infermedica_id}
                  key={symptom.id}
                  onChange={this.handleChange}/>
                <span class="checkmark"></span>
              </label>)
            } */}
            <select 
              multiple={true} 
              value={this.state.symptom_ids} 
              name="symptom_ids"
              onChange={this.handleSelect} >
                {this.state.symptoms.map(symptom => 
                  <option 
                    value={symptom.infermedica_id} 
                    key={symptom.id}>
                      {symptom.common_name}
                  </option>)}
            </select>
            <label>Select those that apply:</label>
            <select 
              multiple={true} 
              value={this.state.riskInput} 
              name="riskInput"
              onChange={this.handleSelect} >
                {riskFactors.map(rf => 
                  <option 
                    value={rf["id"]} 
                    key={rf["id"]}>
                      {rf["question"]}
                  </option>)}
            </select>
            <input 
              type="submit" value="Submit" />
        </form>
        <p className="disclaimer">*Results are not meant to replace professional medical advice</p>
      </div>
      </Fragment>
    )
  }
}

export default SymptomChecker