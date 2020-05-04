import React, {Component, Fragment} from 'react';
import {riskFactors} from '../services/riskFactors'
import {symptomsNonEmergency} from '../services/symptomsNonEmergency'
import {emergencySymptoms} from '../services/emergencySymptoms'
import NavBar from './NavBar'
import Results from './Results'
import {API_ROOT} from '../services/api'
import { nonSeriousRisks } from '../services/nonSeriousRisks';
import { emergencyRisks } from '../services/emergencyRisks';

const infermedicaHeaders = {
  "App-Id": process.env.REACT_APP_INFERMEDICA_APP_ID,
  "App-Key": process.env.REACT_APP_INFERMEDICA_APP_KEY,
  "Content-Type": "application/json"
}

class SymptomChecker extends Component {
  // state.symptoms comes from my backend
  state = {
    fields: {
      age: "",
      sex: "",
      fever: "",
      feverType: ""
    },
    symptom_ids: [],
    risk_ids: [],
    response: {},
    choices: {
      s_2: false,    
      s_10: false,
      s_12: false,
      s_13: false,
      s_14: false,
      p_12: false,
      p_13: false,
      p_14: false
    },
    warning: false
  }

  // componentDidMount() {
  //   fetch(`${API_ROOT}/symptoms`)
  //   .then(resp => resp.json())
  //   .then(json => this.setState({symptoms: json}))
  // }

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
    // const symptomsAbsent = this.state.symptoms.filter(s => !this.state.symptom_ids.includes(s.infermedica_id))
    // const symptomsAbsentArray = symptomsAbsent.map(s => Object.assign({}, {"id": s.infermedica_id, "choice_id": "absent"}));
    // console.log(symptomsAbsentArray)

    const riskArray = this.state.risk_ids.map(rf => Object.assign({}, {"id": rf, "choice_id": "present"}));
    // const risksAbsent = riskFactors.filter(rf => !this.state.risk_ids.includes(rf.id))
    // console.log(risksAbsent)
    // const risksAbsentArray = risksAbsent.map(rf => Object.assign({}, {"id": rf.id, "choice_id": "absent"}));
    // console.log(risksAbsentArray)

    // const symptomEvidence = symptomArray.concat(symptomsAbsentArray)
    // const riskEvidence = riskArray.concat(risksAbsentArray)
    // const evidence = symptomEvidence.concat(riskEvidence)
    const evidence = []
    
    if (this.state.fields.fever) {
      evidence.push({"id": "s_0", "choice_id": "present"})
      const type = this.state.fields.feverType
      evidence.push({"id": `${type}`, "choice_id": "present"})
    }
    console.log(symptomArray)
    console.log(riskArray)


    console.log(evidence)

    // fetch("https://api.infermedica.com/covid19/triage", {
    //   method: "POST",
    //   headers: infermedicaHeaders,
    //   body: JSON.stringify({
    //     "sex": this.state.fields.sex,
    //     "age": parseInt(this.state.fields.age),
    //     "evidence": evidence
    //   })
    // })
    // .then(response => response.json())
    // .then(json => {
    //   console.log(json)
    //   this.setState({response: json})
    // })
  }
  
  handleCheckboxChange = (event) => {
    const newChoices = { ...this.state.choices, [event.target.name]: event.target.checked };
    this.setState({ choices: newChoices });
  }

  // handleMultipleCheck = (event) => {
  //   console.log(event.target.checked)
  //   const value = [];
  //   const newSymptom = {[event.target.name]: event.target.value };
  //   value.push(newSymptom)
  //   this.setState({ symptoms: value });
  // }

  render() {

    return(
      <Fragment>
      <NavBar />
      <div className="symptom-checker">
        <h1 className="card-title">Symptom Check</h1>
        {!!this.state.response.message ?
        <p>Error! Please fill out all fields {console.log(this.state.response.message)}</p>
        :
        null}
        {!!this.state.response.serious || this.state.response.description ? 
          <Results response={this.state.response}/>
          : 
          null
        }
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

          <label>
          Do you have a fever?</label>
          <input
            name="fever"
            value="true"
            type="radio"
            checked={this.state.fields.fever === "true"}
            onChange={this.handleChange} /><label>Yes</label>
          <input
            name="fever"
            value="false"
            type="radio"
            checked={this.state.fields.fever === "false"}
            onChange={this.handleChange} /><label>No</label>

          {this.state.fields.fever === "true" ? 
          <div className="field">
            <label>How high is your fever?</label> 
            <select 
              multiple={false} 
              value={this.state.fields.feverType} 
              name="feverType"
              onChange={this.handleChange} >
                <option>Please select one</option>
                <option value="s_22">Fever between 37.5°C and 38°C (99.5°F and 100.4°F)</option>
                <option value="s_23">Fever between 38°C and 40°C (100.4°F and 104°F)</option>
                <option value="s_4">Fever over 40°C (104°F)</option>
                <option value="s_5">Fever not measured</option>
              </select>
          </div>
          : 
          null}

          
          {this.state.fields.feverType === "s_4" || this.state.s_2 || this.state.s_10 || this.state.s_12 || this.state.s_13 || this.state.s_14 ? <div className="emergency-symptoms-warning">You have selected an emergency symptom! It is likely you need emergency medical attention before completing the symptom checker.</div>
          : null}
          

          {/* {symptoms.map(s => <div className="field"><label>{s.common_name}<input name="id" value={s.id} type="checkbox" checked={this.state.symptoms.find(symptom => symptom.id === s.id)} onChange={this.handleMultipleCheck} /></label></div>)} */}
          <div>
          <label>Select serious symptoms (can select multiple):</label>
            <select 
              multiple={true} 
              value={this.state.symptom_ids} 
              name="symptom_ids"
              onChange={this.handleSelect} >
                {emergencySymptoms.map(symptom => 
                  <option 
                    value={symptom.id} 
                    key={emergencySymptoms.indexOf(symptom)}>
                      {symptom.common_name}
                  </option>)}
            </select></div>

          <label>Select other symptoms (can select multiple):</label>
            <select 
              multiple={true} 
              value={this.state.symptom_ids} 
              name="symptom_ids"
              onChange={this.handleSelect} >
                {symptomsNonEmergency.map(symptom => 
                  <option 
                    value={symptom.id} 
                    key={symptomsNonEmergency.indexOf(symptom)}>
                      {symptom.common_name}
                  </option>)}
            </select>

            <label>Select if any of the following serious risk factors apply:</label>

            <div className="field">
              <label>I live with or have provided care to, without the use of a protective mask or gloves, a person suspected of having COVID-19</label>
                <input
                  name="p_12"
                  type="checkbox"
                  checked={this.state.p_12}
                  onChange={this.handleCheckboxChange} />

              <label>I have shared the same closed environment (e.g., classroom, workspace, gym) with or traveled in close proximity (1 m or 3 feet) to a person suspected of having COVID-19</label>
                <input
                  name="p_13"
                  type="checkbox"
                  checked={this.state.p_13}
                  onChange={this.handleCheckboxChange} />

              <label>I had face-to-face contact within 1 meter (3 feet) for longer than 15 minutes with a person suspected of having COVID-19</label>
                <input
                  name="p_14"
                  type="checkbox"
                  checked={this.state.p_14}
                  onChange={this.handleCheckboxChange} />
            </div>
            

            
            <label>Select other potentially relevant risk factors:</label>

            <select 
              multiple={true} 
              value={this.state.risk_ids} 
              name="risk_ids"
              onChange={this.handleSelect} >
                {nonSeriousRisks.map(rf => 
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