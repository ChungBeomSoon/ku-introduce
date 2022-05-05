function copyToClipboard(val) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    }


$('#copybtn').click(function() {
    copyToClipboard('https://introduce-ku-1a16c.web.app/answer.html');
    alert('주소를 복사하였습니다');
  });