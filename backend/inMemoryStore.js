import moment from 'moment';

export const store = (function () {
  let tokens = {};
  return {
    get: function (token) {
      return tokens[token] || [];
    },
    set: function (token, data) {
      data.lastChangedAt = moment();
      tokens[token] = data;
    },
    hasChanges: function (token, time) {
      let { lastChangedAt } = tokens[token];
      return time.diff(lastChangedAt || time) > 0;
    }
  }
})();