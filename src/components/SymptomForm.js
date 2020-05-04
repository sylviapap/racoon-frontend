import React, { Component } from 'react'
import {riskFactors} from '../services/riskFactors'
import {symptoms} from '../services/symptoms'
import {symptomsNonEmergency} from '../services/symptomsNonEmergency'
import {emergencySymptoms} from '../services/emergencySymptoms'
import { nonSeriousRisks } from '../services/nonSeriousRisks';
import { emergencyRisks } from '../services/emergencyRisks';

export default class SymptomForm extends Component {
  state = {
    fields: {
      age: "",
      sex: "",
      fever: "",
      feverType: ""
    },
    symptom_ids: [],
    seriousSymptom_ids: [],
    risk_ids: [],
    seriousRisk_ids: []
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

  // evidence example:
  //     "evidence": [
//     {"id": "p_16", "choice_id": "absent"},
//     {"id": "p_17", "choice_id": "present"},
//     {"id": "p_18", "choice_id": "absent"},
//     {"id": "p_19", "choice_id": "absent"},
//     {"id": "p_20", "choice_id": "absent"},
//     {"id": "p_21", "choice_id": "absent"},
//     {"id": "p_22", "choice_id": "absent"},
//     {"id": "s_0", "choice_id": "absent"}, fever
//     {"id": "s_1", "choice_id": "absent"}, cough
//     {"id": "s_2", "choice_id": "absent"}, breath
//     {"id": "s_15", "choice_id": "present"},
//     {"id": "s_16", "choice_id": "present"},
//     {"id": "s_17", "choice_id": "absent"},
//     {"id": "s_18", "choice_id": "absent"},
//     {"id": "s_19", "choice_id": "absent"},
//     {"id": "s_20", "choice_id": "absent"},
//     {"id": "s_21", "choice_id": "absent"},
//     {"id": "p_12", "choice_id": "present"} living or caring - serious
// ]

// the worst function ever written 

  handleSubmit = (event) => {
    event.preventDefault();
    const presentNormalSymptoms = this.state.symptom_ids.map(s => Object.assign({}, {"id": s, "choice_id": "present"}));
    const presentSerious = this.state.seriousSymptom_ids.map(s => Object.assign({}, {"id": s, "choice_id": "present"}));
    const symptomsPresent = presentNormalSymptoms.concat(presentSerious)
    console.log(symptomsPresent)
    // so far so good. this is array of objects of {id, choice_id: present}

    const symptomsAbsentNormal = symptomsNonEmergency.filter(s => !this.state.symptom_ids.includes(s.id))
    const symptomsAbsentSerious = emergencySymptoms.filter(s => !this.state.seriousSymptom_ids.includes(s.id))    
    const symptomsAbsentNormalArray = symptomsAbsentNormal.map(s => Object.assign({}, {"id": s.id, "choice_id": "absent"}));
    const symptomsAbsentSeriousArray = symptomsAbsentSerious.map(s => Object.assign({}, {"id": s.id, "choice_id": "absent"}));
    const symptomsAbsent = symptomsAbsentNormalArray.concat(symptomsAbsentSeriousArray)
    console.log(symptomsAbsent)
    // array of obj {id, choice_id: absent}

    const normalRisks = this.state.risk_ids.map(rf => Object.assign({}, {"id": rf, "choice_id": "present"}));
    const seriousRisks = this.state.seriousRisk_ids.map(rf => Object.assign({}, {"id": rf, "choice_id": "present"}));
    const risksPresent = normalRisks.concat(seriousRisks)
    console.log(risksPresent)
    // AoO {p_id, present}

    const normalRisksAbsent = nonSeriousRisks.filter(rf => !this.state.risk_ids.includes(rf.id))
    const normalRisksAbsentArray = normalRisksAbsent.map(rf => Object.assign({}, {"id": rf.id, "choice_id": "absent"}));
    const seriousRisksAbsent = emergencyRisks.filter(rf => !this.state.seriousRisk_ids.includes(rf.id))
    const seriousRisksAbsentArray = seriousRisksAbsent.map(rf => Object.assign({}, {"id": rf.id, "choice_id": "absent"}));
    const risksAbsent = normalRisksAbsentArray.concat(seriousRisksAbsentArray)
    console.log(risksAbsent)
    // AoO {p_id, absent}

    const symptomEvidence = symptomsPresent.concat(symptomsAbsent)
    const riskEvidence = risksPresent.concat(risksAbsent)
    const symptomsAndRisks = symptomEvidence.concat(riskEvidence)
    
    let feverArray = []
    if (this.state.fields.fever === "true") {
      feverArray.push({"id": "s_0", "choice_id": "present"})
      const type = this.state.fields.feverType
      feverArray.push({"id": `${type}`, "choice_id": "present"})
    }
    else {
      feverArray.push({"id": "s_0", "choice_id": "absent"})
    }

    const evidence = symptomsAndRisks.concat(feverArray)
    console.log(evidence)

    this.props.handleSubmit(event, this.state.fields.sex, this.state.fields.age, evidence)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label className="label">Sex:</label>
          <div className="sex-choice">
            <input 
              type="radio" 
              name="sex" 
              className="input-sex" 
              value="male" 
              checked={this.state.fields.sex === "male"}
              onChange={this.handleChange} />
                <label><i className="fa fa-fw fa-mars"/>Male</label>
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

<div className="fever-choice">
          <label className="symptom-item">
          Do you have a fever?</label>
          <input
            className="symptom-item"
            name="fever"
            value="true"
            type="radio"
            checked={this.state.fields.fever === "true"}
            onChange={this.handleChange} /><label className="symptom-item">Yes</label>
          <input
            className="symptom-item"
            name="fever"
            value="false"
            type="radio"
            checked={this.state.fields.fever === "false"}
            onChange={this.handleChange} /><label className="symptom-item">No</label>
          </div>

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

          {this.state.fields.feverType === "s_4" || this.state.seriousSymptom_ids.length ? <div className="emergency-symptoms-warning">You have selected an emergency symptom! It is likely you need emergency medical attention before completing the symptom checker.</div>
          : null}
          
          <div>
          <label>Have you experienced any of the following serious symptoms? (select all that apply)</label>
            <select 
              multiple={true} 
              value={this.state.seriousSymptom_ids} 
              name="seriousSymptom_ids"
              onChange={this.handleSelect} >
                {emergencySymptoms.map(symptom => 
                  <option 
                    value={symptom.id} 
                    key={emergencySymptoms.indexOf(symptom)}>
                      {symptom.common_name}
                  </option>)}
            </select></div>

          <label>Have you experienced any of the following other symptoms? (select all that apply)</label>
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

          <div>
            <label>Do any of the following apply to you? (select all that apply)</label>
            <select 
              multiple={true} 
              value={this.state.seriousRisk_ids} 
              name="seriousRisk_ids"
              onChange={this.handleSelect} >
                {emergencyRisks.map(rf => 
                  <option 
                    value={rf["id"]} key={rf["id"]}>
                      {rf["question"]}
                  </option>)}
            </select>
          </div>

          <label>Submit additional risk factors:</label>
            <select 
              multiple={true} 
              value={this.state.risk_ids} 
              name="risk_ids"
              onChange={this.handleSelect} >
                {nonSeriousRisks.map(rf => 
                  <option 
                    value={rf["id"]} key={rf["id"]}>
                      {rf["question"]}
                  </option>)}
            </select>
            <input 
              type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
