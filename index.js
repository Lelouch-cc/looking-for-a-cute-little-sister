const path = require('path');
const fs = require('fs');
const adb = require('./adb');
const face = require('./face');

function awaitMoment(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

(async function main() {
  const device = (await adb.devices())[0];

  adb.use(device);
  adb.verbose(true);

  await adb.swipe(200, 1000, 200, 100, 200);

  awaitMoment();

  const fileName = `${(`${Math.random()}`).substr(2, 7)}.png`;
  await adb.screenshot(fileName, path.resolve(__dirname, 'images'));
  const file = path.resolve(path.resolve(__dirname, 'images', fileName));

  const { shouldFollow, score } = await face(file, 75);

  console.log('是否关注：', shouldFollow);
  console.log('得分：', score);

  if (shouldFollow) {
    await adb.touch(1000, 1100);
    await adb.touch(1000, 1300);
    console.log(new Date());
    await awaitMoment(5000);
    console.log(new Date());
  }

  fs.unlinkSync(file);

  await main();
}());
