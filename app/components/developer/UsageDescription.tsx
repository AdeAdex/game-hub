//  /app/components/developer/UsageDescription.tsx

const usageDescription = `
### How to Use the Country and Dialing Code APIs

#### Fetch Country Dialing Codes

To fetch country dialing codes, use the following endpoint:

\`\`\`javascript
fetch("https://country-dial-code-api.vercel.app/api/dial_code", {
  headers: {
    "Authorization": \`Bearer YOUR_API_KEY\`,
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error fetching dialing codes:", error));
\`\`\`

#### Example Response:

\`\`\`json
[
  {
    "id": 1,
    "country": "China",
    "code": "+86"
  },
  {
    "id": 2,
    "country": "India",
    "code": "+91"
  },
  // ... more countries
]
\`\`\`

#### Fetch Country Details

To fetch country details including states, use the following endpoint:

\`\`\`javascript
fetch("https://country-dial-code-api.vercel.app/api/countries", {
  headers: {
    "Authorization": \`Bearer YOUR_API_KEY\`,
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error fetching countries:", error));
\`\`\`

#### Example Response:

\`\`\`json
[
  {
    "id": 1,
    "country": "China",
    "states": [
      "Beijing",
      "Shanghai",
      "Guangdong",
      "Zhejiang",
      "Fujian",
      "Hubei",
      "Hunan",
      "Sichuan",
      "Jiangsu",
      "Shaanxi",
      "Yunnan",
      "Anhui",
      "Jiangxi",
      "Shandong"
    ]
  },
  {
    "id": 2,
    "country": "India",
    "states": [
      "Uttar Pradesh",
      "Maharashtra",
      "Bihar",
      "West Bengal",
      "Karnataka",
      "Tamil Nadu",
      "Rajasthan",
      "Madhya Pradesh",
      "Gujarat",
      "Andhra Pradesh",
      "Kerala",
      "Telangana",
      "Odisha",
      "Assam"
    ]
  },
  {
    "id": 3,
    "country": "United States",
    "states": [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Illinois",
      "Pennsylvania",
      "Ohio",
      "Georgia",
      "North Carolina",
      "Michigan",
      "New Jersey",
      "Virginia",
      "Arizona",
      "Tennessee"
    ]
  },
  // ... more countries
]
\`\`\`

### Example Usage in a Form

Below is an example of how to use the fetched data in a form with select options for country, state, and dialing code.

\`\`\`javascript
import React, { useState, useEffect } from "react";

const MyForm = ({ apiKey }) => {
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [dialCode, setDialCode] = useState("");

  useEffect(() => {
    fetch("https://country-dial-code-api.vercel.app/api/dial_code", {
      headers: {
        "Authorization": \`Bearer \${apiKey}\`,
      },
    })
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error("Error fetching dialing codes:", error));
  }, [apiKey]);

  useEffect(() => {
    fetch("https://country-dial-code-api.vercel.app/api/countries", {
      headers: {
        "Authorization": \`Bearer \${apiKey}\`,
      },
    })
      .then(response => response.json())
      .then(data => setCountryDetails(data))
      .catch(error => console.error("Error fetching countries:", error));
  }, [apiKey]);

  useEffect(() => {
    if (selectedCountry) {
      const country = countryDetails.find(c => c.country === selectedCountry);
      setStates(country ? country.states : []);
      const countryCode = countries.find(c => c.country === selectedCountry);
      setDialCode(countryCode ? countryCode.code : "");
    }
  }, [selectedCountry, countryDetails, countries]);

  return (
    <form className="mt-6">
      <div>
        <label htmlFor="country-select" className="block text-sm font-medium">
          Select a Country
        </label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
          className="mt-2 p-2 border rounded-lg"
        >
          <option value="">Select a Country</option>
          {countryDetails.map(country => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="state-select" className="block text-sm font-medium">
          Select a State
        </label>
        <select
          id="state-select"
          className="mt-2 p-2 border rounded-lg"
          disabled={!states.length}
        >
          <option value="">Select a State</option>
          {states.map(state => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="phone-number" className="block text-sm font-medium">
          Phone Number
        </label>
        <div className="flex mt-2">
          <span className="p-2 border rounded-l-lg">{dialCode}</span>
          <input
            type="text"
            id="phone-number"
            className="p-2 border rounded-r-lg flex-1"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </form>
  );
};
\`\`\`
`;

export default usageDescription;
