var saveBtn = document.getElementById('save');

chrome.storage.sync.get('xscreenshotConfig', (res) => {
  if (res.xscreenshotConfig) {
    document.getElementById('text').value = res.xscreenshotConfig.text || '';
  }
});

function save() {
  var text = document.getElementById('text').value;
  chrome.storage.sync.set({
    xscreenshotConfig: {
      text
    }
  }, function () {
    alert('设置截图水印文字成功');
  });
}

saveBtn.addEventListener('click', save, false);
