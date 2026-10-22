const https = require('https');

const data = JSON.stringify({
  original_table: 'users',
  record_data: {id: '123'}
});

const options = {
  hostname: 'ujzupmmvfrhpwziudydr.supabase.co',
  port: 443,
  path: '/rest/v1/trash',
  method: 'POST',
  headers: {
    'apikey': 'sb_publishable_zqGOuDGYCAin5goXvlM5-Q_pliMNwlj',
    'Authorization': 'Bearer sb_publishable_zqGOuDGYCAin5goXvlM5-Q_pliMNwlj',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
};

const req = https.request(options, (res) => {
  let resData = '';
  res.on('data', (d) => {
    resData += d;
  });
  res.on('end', () => {
    console.log("Insert result:", resData);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
