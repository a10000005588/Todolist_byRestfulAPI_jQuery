var todoList = (function(){
   var $list;
   //TOdo  add init  item
   function init() {
      //catch 網頁的dom 網頁的元素
        _cacheDOM();
        _bindEvent();
   }

   function _cacheDOM(){  //前面+   _ 為private funciton
	   $list = $('#todoList');    //綁定一些會常用到的dom  id 並宣告成參數
   }

   function _bindEvent() {
  		//$list.on('click.del', '.btn-del', _handleDel);
  		$list.on('click.changeStatus', '.btn-status', _handleChangeStatus);  //要綁的對象為list 底下的class 叫做btn-status
      $list.on('click.deleteTask', '.btn-delete', _deleteTask);
   }

   function _deleteTask(){
       var id = $(this).parents('.tasks').attr('id');

       $.ajax({
           url:`${BASE_URL}tasks/${id}`,
           type:'DELETE',
           dataType: 'json',
           contentType: "application/json; charset=utf-8",
    		   xhrFields: {
    			  	withCredentials: true
    			 },
    			 crossDomain: true,
    		  	success: function(data) {
    		    	console.log("delete success");
    		   		$list.find(`#${id}`).remove();  //直接把html裡面ID叫做 ${id} 給刪掉
    		   },

       });
   }

   function render(list){
     console.log(JSON.stringify(list));
     $list.find('tbody').html('');  //將tbody中的清單全部清空  並做更新
     list.forEach(function(val, i) {  //將list中的 物件內資料一一取出來
     $list
       .find('tbody')
       .append(   //注意  ${val.id} 這種寫法 要用 ` `  才會區隔出顏色
         `<tr id=${val.id} class="tasks ${val.isDone ? 'success' : 'danger'}">
           <td class="taskStatus">
             <button data-status=${val.isDone ? 'done' : 'yet'} type="button" class="btn btn-default btn-status">${val.isDone ? 'Done' : 'Yet'}</button>
           </td>
           <td class="taskName">
             ${  $('<textarea>').text(val.text).html()  }
             <span class="glyphicon glyphicon-trash btn-delete pull-right" aria-hidden="true"></span>
           </td>

         </tr>`
        );
     });
   }

   function _handleChangeStatus(){
       var $this = $(this);
       var id = $this.parents('.tasks').attr('id');  //取得目前this中的parent dom中的 id的值
       var status = $this.attr('data-status');
       var isDone = status == 'done' ? false : true; //顛倒目前的task狀態 因為點下去取得目前是yet 那就 給isDome為ture 改成 "Done" 已完成

       $.ajax({
           url: `${BASE_URL}tasks/${id}`,
           type: `patch`,
           dataType: `json`,
           contentType: "application/json; charset=utf-8",
           xhrFields: {
              withCredentials: true  //???
           },
           crossDomain:true,
           data: JSON.stringify({  //convert isDone to JSON type
              isDone
           }),
            success: function(data){
              console.log(data);
              $this
                 .text((isDone ? 'Done' : 'Yet'))    //更改文字
                 .attr('data-status', (isDone ? 'done' : 'yet')) //更改 data-status的屬性為done或yet
                 .parents('.tasks')
                 .removeClass('danger success')  //把目前的父dom名為tasks的class 叫做danger和success給移除掉
                 .addClass(`${isDone ? 'success' : 'danger'}`); //新增一個class

            },
            error:function(jqXHR){
               console.dir(jqXHR);
            }

         });
     }

    function addNewTask(data){
        $list
         .find("tbody")
         .append(
           `<tr id=${data.id} class="tasks danger">
           			<td class="taskStatus">
           					<button data-status="yet" type="button" class="btn btn-default btn-status">Yet</button>
           			</td>
           			<td class="taskName">
           					${$('<textarea>').text(data.text).html()}
           					<span class="glyphicon glyphicon-remove btn-del pull-right" aria-hidden="true"></span>
           			</td>
           </tr>`
         );
    }


   return {
         init,
         render,
         addNewTask    //把它給public
   }

})();
//候面的小瓜號 表示javascript被載入時就會直接執行
