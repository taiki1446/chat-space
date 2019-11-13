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
                    <div class="main__messages">
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
});