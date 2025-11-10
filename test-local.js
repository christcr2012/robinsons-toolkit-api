const handler = require('./api/execute.js');

// Mock request and response
const req = {
  method: 'POST',
  headers: {
    'x-api-key': 'test-key'
  },
  body: {
    tool: 'vercel_list_projects',
    args: {}
  }
};

const res = {
  headers: {},
  statusCode: 200,
  setHeader: function(key, value) {
    this.headers[key] = value;
  },
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log('Response Status:', this.statusCode);
    console.log('Response Body:', JSON.stringify(data, null, 2));
    return this;
  },
  end: function() {
    console.log('Response ended');
    return this;
  }
};

// Set environment variable for testing
process.env.API_SECRET_KEY = 'test-key';
process.env.VERCEL_TOKEN = 'dummy-token-for-syntax-test';

console.log('Testing handler...');
handler(req, res).catch(err => {
  console.error('Handler error:', err.message);
  console.error('Stack:', err.stack);
});
