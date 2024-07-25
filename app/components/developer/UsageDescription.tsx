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

    fetch("https://country-dial-code-api.vercel.app/api/countries", {
      headers: {
        "Authorization": \`Bearer \${apiKey}\`,
      },
    })
      .then(response => response.json())
      .then(data => setCountryDetails(data))
      .catch(error => console.error("Error fetching countries:", error));
  }, [apiKey]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    const countryInfo = countryDetails.find(c => c.country === country);
    setStates(countryInfo ? countryInfo.states : []);
    const dialingCode = countries.find(c => c.country === country)?.code || "";
    setDialCode(dialingCode);
  };

  return (
    <form>
      <label htmlFor="country">Country:</label>
      <select id="country" onChange={handleCountryChange}>
        {countryDetails.map((c) => (
          <option key={c.country} value={c.country}>
            {c.country}
          </option>
        ))}
      </select>

      <label htmlFor="state">State:</label>
      <select id="state">
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <label htmlFor="dial-code">Dialing Code:</label>
      <input type="text" id="dial-code" value={dialCode} readOnly />
    </form>
  );
};

export default MyForm;
\`\`\`

Keep this file updated with any changes to the API or usage examples.

`;

export default usageDescription;
