var listName = (function() {
  var $listNameWrap;  //辨別他是不是 jqeury元素    因為有可能這個變數 會塞 jquery function

  function init(){
      _cacheDOM();
      _bindEvent();
  }  //繪做到的函數會有哪些    一種寫的格式
  //to cache dom
  //bind event
  function _cacheDOM(){
    $listNameWrap = $('#listNameWrap');
  }

  function _bindEvent(){
    $listNameWrap.on('click.setList', '#btn-setList', _handleSetList);
  }

  function _handleSetList(){
    var listName = $listNameWrap.find("#listName").val();
    alert("List name is "+ listName);

    $.ajax({
       url:`${BASE_URL}lists`,
       type:'POST',
       dataType: 'json',
       data:JSON.stringify({
         listName: listName  //默認為  listName = listName  等於他自己
       }),
       contentType: "application/json; charset=utf-8",
       xhrFields:{
         withCredentials:true
       },
       crossDomain:true,
       success: function(data){
         todoList.render(data.tasks);
         console.log(data);
       },
       error:function(jqXHR){
         console.dir(jqXHR);
       }
    });
  }

  return {
		init,
		handleSetList
	}
})();  //暨德後面要家 () 才會在html載入時注入並執行該閉包的函式
