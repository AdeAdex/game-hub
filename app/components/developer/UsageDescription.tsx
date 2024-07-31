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
    "country": "Nigeria",
    "states": [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara"
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
      "Washington",
      "Arizona"
    ]
  }
]
\`\`\`
`;

export default usageDescription;
