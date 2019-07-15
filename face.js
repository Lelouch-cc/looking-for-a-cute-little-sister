const axios = require('axios');
const querystring = require('querystring');
const { base64Sync } = require('base64-img');
const { apiKey, apiSecret } = require('./config');

module.exports = function (file, scoreLevel = 75) {
  const base64 = base64Sync(file);
  const data = {
    api_key: apiKey,
    api_secret: apiSecret,
    image_base64: base64,
    return_attributes: 'gender,age,beauty'
  };

  return new Promise((resolve) => {
    axios({
      url: '/facepp/v3/detect',
      method: 'post',
      baseURL: 'https://api-cn.faceplusplus.com',
      transformRequest: [function (transData) {
        // 对 data 进行任意转换处理
        return querystring.stringify(transData);
      }],
      data
    }).then((response) => {
      const b = response.data;

      if (!b) {
        resolve({
          shouldFollow: false
        });
        return;
      }

      const faces = b.faces || [];

      let shouldFollow = false;
      let score = 0;

      for (let i = 0; i < faces.length; i++) {
        const attrs = faces[i].attributes;
        score = attrs.beauty.male_score;
        if (attrs.gender.value === 'Female' && attrs.beauty.female_score >= scoreLevel) {
          shouldFollow = true;
          break;
        }
      }
      resolve({
        shouldFollow,
        score
      });
    }).catch((err) => {
      console.log('出错了', err);
      resolve({
        shouldFollow: false
      });
    });
  });
};
