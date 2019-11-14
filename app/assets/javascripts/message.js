$(function(){

  function messageHtml(message){

  let dispMessage = `<div class="main__mainWrap">
                      <div class="main__mainWrap__userName">
                        ${message.user_name}
                      </div>
                      <div class="main__mainWrap__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main__messages" data-messageid=${message.message_id}>
                      <p class="__message">
                        ${message.content}
                      </p>`;

    dispMessage = (message.image_url === null)
      ? dispMessage + `</div>`
      : dispMessage + ` <img src=${message.image_url} width="800" height="800" >
                        </div>`;
    
    return dispMessage;
  };

  function disabled(){
    $(".main__footer__form__send").prop("disabled", false);
  };

  let reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let messagesObj = $(".main__messages");
    let last_message_id = 0;
    let comparison;
    messagesObj.filter(function(){
      comparison = $(this).data("messageid");
      if (comparison > last_message_id){
        last_message_id = comparison;
      };
    });    

    let url = location.href.match(/\/groups\/[\d]{1,}\/messages/);
    url = url[0].replace("/messages", "/api/messages");

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //配列messagesの中身一つ一つを取り出し、HTMLに追加する。
      messages.forEach(function(message){
        $(".main").append(messageHtml(message));
      });
      $(".main").animate({scrollTop: $(".main")[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };

  $(".messageForm").on("submit", function(e){
    e.preventDefault();

    let formData = new FormData(this);

    $.ajax({
      url: $(this).attr("action"),
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
      })
    .done(function(message){
      let dispMessage = messageHtml(message);
      $(".main").append(dispMessage);
      $(".main").animate({scrollTop: $(".main")[0].scrollHeight});
      $(".messageForm")[0].reset();
      disabled();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      disabled();
    });
  });

  let url_updata = location.href.match(/\/groups\/[\d]{1,}\/messages/);
  console.log(url_updata);
  if (url_updata !== null){
    setInterval(reloadMessages, 7000);
  };
});