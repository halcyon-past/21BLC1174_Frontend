const axios = require('axios');
let data = JSON.stringify({
  "input_query": "check",
  "input_query_type": "",
  "sort_by": "default",
  "status": [],
  "exact_match": false,
  "date_query": false,
  "owners": [],
  "attorneys": [],
  "law_firms": [],
  "mark_description_description": [],
  "classes": [],
  "page": 1,
  "rows": 10,
  "sort_order": "desc",
  "states": [],
  "counties": []
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://vit-tm-task.api.trademarkia.app/api/v3/us',
  headers: { 
    'accept': 'application/json, text/plain, */*', 
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
    'content-type': 'application/json', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
