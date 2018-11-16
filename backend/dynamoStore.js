var AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
let dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: 'us-east-2',
});

export const store = (function () {
  return {
    get: async function (token, since) {
      const params = {
        Key: {
          'token': `${token}`
        },
        TableName: 'sticky-notes'
      };
      return dynamodb.get(params).promise()
    },
    set: async function (token, data) {
      const params = {
        TableName: 'sticky-notes',
        Item: {
          token: `${token}`,
          data,
        },
      };
      return dynamodb.put(params).promise()
    }
  }
})();
