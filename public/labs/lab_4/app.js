fetch('http://localhost:3000/labs/lab_4/?', {method: 'POST', body: 'JC Lab 4'})
    .then(results => results.json())
    .then(console.log);