chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const res = { 
    success: false
  };
  const voteBtns = Array.apply(null, document.getElementsByClassName('player_vote'));
  const voteBtn = voteBtns.find(item => {
    if (item.dataset.name === request.name) {
      return true;
    }
  });
  if (voteBtn) {
    voteBtn.click();
    setTimeout(() => {
      const likeBtn = document.getElementsByClassName('z_btn_vote');
      if (likeBtn[0] && likeBtn[0].className.indexOf('z_disabled') < 0) {
        likeBtn[0].click();
      }
      setTimeout(() => {
        const phoneBtn = document.getElementsByClassName('phone_step');
        // 不出现手机验证码时，此次操作成功
        if (phoneBtn[0] && phoneBtn[0].className.indexOf('none') >= 0) {
          res.success = true;
        }
        sendResponse(res);
      }, 500);  
    }, 500);
  }
  /*
    https://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    This function becomes invalid when the event listener returns, unless you return true from the event listener to indicate you wish to send a response asynchronously (this will keep the message channel open to the other end until sendResponse is called).
  */
  return true;
});
