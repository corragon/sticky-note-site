import _ from 'lodash';

export function generateToken(length) {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let randChar = () => chars[~~(Math.random()*chars.length)];
    return _.times(length, randChar).join('');
  }
