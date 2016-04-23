function test(){
	alert("hello");
}

 $(document).ready(function() { 

    $('#addproduct').click(function() { 
	     $.blockUI({ 
	     	// message: '<div>歡迎來到 jsGears.com !</div>'
            message: $('.newProduct'),
            css: {
	           	top:'70px',
	           	width:'80%',
	           	margin:'0 auto',
	           	left:'10%',
	           	backgroundColor: '#FFFFFF', 
	               '-webkit-border-radius': '10', 
	               '-moz-border-radius': '10px'
       		}            
   		});
	}); 

	$('#tab_pro1 a').click(function (e) {
	 // var feature = "#pro_feature_" + this.slice(-1);
	 var test = JSON.parse(e);
	 alert(test);
	 // var standard = "#standard" + this.slice(-1);
	 // var number = "#pro_number_" + this.slice(-1);
	 // $(feature).css("display:none");
	 // $(standard).css("display:none");
	 // $(number).css("display:none");
	
	  e.preventDefault()
	  $(this).tab('show')
	  // $(this).css("display:block);
	})


}); 

function addpage(){

}

// function addProduct(){
// 	$(document).ready(function() {  
// 	     $.blockUI({ 
// 	           message: $('#newProduct'),
// 	           css: {
// 	           	top:'70px',
// 	           	width:'80%',
// 	           	margin:'0 auto',
// 	           	left:'10%',
// 	           	backgroundColor: '#FFFFFF', 
// 	               '-webkit-border-radius': '40px', 
// 	               '-moz-border-radius': '40px'
// 	        }            
// 	    });
// 	});  
// }

