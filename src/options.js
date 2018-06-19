const saveBtn = document.getElementById('save');

chrome.storage.sync.get('xscreenshotConfig', (res) => {
  if (res.xscreenshotConfig) {
    document.getElementById('text').value = res.xscreenshotConfig.text || '';
    document.getElementById('delay').value = res.xscreenshotConfig.delay || '';
    const list = res.xscreenshotConfig.list || [];
    const inputs = Array.apply(null, document.querySelectorAll('.list input'));
    for (let i = 0; i < list.length; i++) {
      inputs[i].value = list[i];
    }
  }
});

function save() {
  const text = document.getElementById('text').value;
  const delay = document.getElementById('delay').value;
  const inputs = Array.apply(null, document.querySelectorAll('.list input'));
  const list = inputs.map(item => item.value);
  list[0] = '刘人语';
  chrome.storage.sync.set({
    xscreenshotConfig: {
      text,
      list,
      delay
    }
  }, function () {
    alert('保存成功');
  });
}

saveBtn.addEventListener('click', save, false);
