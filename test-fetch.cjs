const https = require('https');

const options = {
  hostname: 'ujzupmmvfrhpwziudydr.supabase.co',
  port: 443,
  path: '/rest/v1/trash?select=*',
  method: 'GET',
  headers: {
    'apikey': 'sb_publishable_zqGOuDGYCAin5goXvlM5-Q_pliMNwlj',
    'Authorization': 'Bearer sb_publishable_zqGOuDGYCAin5goXvlM5-Q_pliMNwlj'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (d) => {
    data += d;
  });
  res.on('end', () => {
    console.log("Trash table data:", data);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
