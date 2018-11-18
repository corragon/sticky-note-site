import moment from 'moment';

export const store = (function () {
  const tokens = {};
  return {
    get: function (token, since) {
      if (since && !this.hasChanges(token, since)) {
        return Promise.resolve({});
      } else {
        return Promise.resolve(tokens[token] || []);
      }
    },
    set: function (token, data) {
      data.lastChangedAt = moment();
      tokens[token] = data;
      console.log(`Set on token ${token}`, data)
    },
    hasChanges: function (token, time) {
      const { lastChangedAt } = tokens[token];
      if (typeof time === 'string' || time instanceof String) {
        time = moment(time);
      }
      return time.diff(lastChangedAt || time) < 0;
    }
  }
})();