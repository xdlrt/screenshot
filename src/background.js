import { dateFormat } from './utils';

chrome.browserAction.onClicked.addListener(function (tab) {
  var text = '';

  chrome.storage.sync.get('xscreenshotConfig', (res) => {
    if (res.xscreenshotConfig && res.xscreenshotConfig.text) {
      text = res.xscreenshotConfig.text;
    }
    else {
      text = '右键点击插件，进入”选项“中设置水印文字';
    }
  });

  var canvas = document.createElement('canvas');
  chrome.tabs.captureVisibleTab(null, {
    format: 'png',
    quality: 100
  }, function (img) {
    // callback of captureVisibleTab，img a string start with data://
    var image = new Image();
    image.onload = function () {
      var width = tab.width;
      var height = tab.height;
      canvas.width = width;
      canvas.height = height;
      // execute after the img was loaded
      var ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#87CEFF';
      ctx.fillText(new Date(), width / 2, height - 110);
      ctx.fillText(text, width / 2, height - 70);
      ctx.fillText('本水印由 @自动截图水印 添加', width / 2, height - 30);
      var link = document.createElement('a');
      link.download = '打投' + dateFormat() + '.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    image.src = img;
  });
});
