import moment from 'moment';

var AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;
const dynamodb = new AWS.DynamoDB.DocumentClient({
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
        .then(dynamoBlob => dynamoBlob.Item)
    },
    set: async function (token, data) {
      data.lastChangedAt = moment().toISOString();
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

