var AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
let dynamodb = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  region: 'us-east-2',
});

export default function () {
  dynamodb.describeTable({ TableName: 'sticky-notes' }, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  })
}

