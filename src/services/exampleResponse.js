export const exampleResponse = {
  description: "Your symptoms are very serious and you may have COVID-19.", 
  label: "Call the emergency number. Avoid all contact.", 
  serious: [{
    common_name: "Cough",
    id: "s_1",
    is_emergency: false,
    name: "Cough"
  },
  {
    common_name: "Shortness of breath",
    id: "s_2",
    is_emergency: true,
    name: "Shortness of breath"
  },
  {
    common_name: "Fever between 37.5°C and 38°C (99.5°F and 100.4°F)",
    id: "s_22",
    is_emergency: false,
    name: "Fever between 37.5°C and 38°C (99.5°F and 100.4°F)"
  }],
  triage_level: "isolation_ambulance"}