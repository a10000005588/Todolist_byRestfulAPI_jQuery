var inputBar = (function(){
    var $inputWrap;

    function init(){
      _catchDOM();
      _bindEvent();
    }

    function _catchDOM(){
      $inputWrap = $('#inputTaskWrap');
    }

    function _bindEvent(){
       $inputWrap.on('click.addtask','#addTaskButton', _handleAddTask);  //將資料存進去出來 處理過後並交由todolist印出來
    }

    function _handleAddTask(){
        var text = $inputWrap.find('#newtaskText').val();

        $.ajax({
          url:`${BASE_URL}tasks`,
          type:'POST',
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify({
            text
          }),
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          success:function(data){
            todoList.addNewTask(data);
            $inputWrap.find("#newtaskText").val("");
          }
      });
    }

    return {
      init
    }

})();
