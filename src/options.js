const saveBtn = document.getElementById('save');

chrome.storage.sync.get('xscreenshotConfig', (res) => {
  if (res.xscreenshotConfig) {
    document.getElementById('text').value = res.xscreenshotConfig.text || '';
    const list = res.xscreenshotConfig.list || [];
    const inputs = Array.apply(null, document.querySelectorAll('.list input'));
    for (let i = 0; i < list.length; i++) {
      inputs[i].value = list[i];
    }
  }
});

function save() {
  const text = document.getElementById('text').value;
  const inputs = Array.apply(null, document.querySelectorAll('.list input'));
  const list = inputs.map(item => item.value);
  chrome.storage.sync.set({
    xscreenshotConfig: {
      text,
      list
    }
  }, function () {
    alert('保存成功');
  });
}

saveBtn.addEventListener('click', save, false);
