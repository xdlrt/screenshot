import { dateFormat, runTaskQueue } from './utils';

chrome.browserAction.onClicked.addListener((tab) => {
  // 获取配置
  chrome.storage.sync.get('xscreenshotConfig', res => {
    let waterText = '';
    if (!res.xscreenshotConfig) {
      res.xscreenshotConfig = {
        list: ['刘人语']
      };
    };
    const { text, list = [] } = res.xscreenshotConfig;
    if (text) {
      waterText = text;
    }
    else {
      waterText = '右键点击插件，进入”选项“中设置水印文字';
    }
    const taskQueue = list.map(item => {
      if (!item) {
        return (next) => { next() }
      };
      return (next) => {
        const options = {
          tab,
          filenamePrefix: item,
          waterText
        }
        setTimeout(() => {
          task(options, next);
        }, 1500);
      };
    });
    runTaskQueue(taskQueue);
  });
});

function task(options, next) {
  const { tab, filenamePrefix } = options;
  chrome.tabs.sendMessage(tab.id, { name: filenamePrefix }, (res) => {
    if (res.success) {
      setTimeout(() => {
        takeScreenShot(options);
      }, 500);
      next();
    }
  });
}

function takeScreenShot(options) {
  const { tab, filenamePrefix, waterText } = options;
  const canvas = document.createElement('canvas');
  chrome.tabs.captureVisibleTab(null, {
    format: 'png',
    quality: 100
  }, (img) => {
    // callback of captureVisibleTab，img a string start with data://
    const image = new Image();
    image.onload = () => {
      const width = tab.width;
      const height = tab.height;
      canvas.width = width;
      canvas.height = height;
      // execute after the img was loaded
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#87CEFF';
      ctx.fillText(new Date(), width / 2, height - 110);
      ctx.fillText(waterText, width / 2, height - 70);
      ctx.fillText('本水印由 @自动截图水印-刘人语定制版 添加', width / 2, height - 30);
      const link = document.createElement('a');
      link.download = filenamePrefix + dateFormat() + '.jpg';
      link.href = canvas.toDataURL();
      link.click();
    };
    image.src = img;
  });
}