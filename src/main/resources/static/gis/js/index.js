$(document).ready(function() {

	//raster list
	$.ajax({
		url: "/list/raster",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				$(".leftCol").append(`<li>
						<input value="${data[i].data_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
								
								<label>${data[i].local_name}</label>
								
								<span class="input-group-btn">
								
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										레이어 수정</button>
										
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										레이어 삭제</button>
									<input type="hidden" value="${data[i].layer_type}">
										
									<!--style 변경-->	
									<button id="changeStyle" class="btn btn-success btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
									
								</span>
							</li>`)

			}
		}
	});

	//polygon list
	$.ajax({
		url: "/list/polygon",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				$(".leftCol").append(`<li>
						<input value="${data[i].data_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
								
								<label>${data[i].local_name}</label>
								
								<span class="input-group-btn">
								
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										레이어 수정</button>
										
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										레이어 삭제</button>
									<input type="hidden" value="${data[i].layer_type}">
										
									<!--style 변경-->	
									<button id="changeStyle" class="btn btn-success btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
									
								</span>
							</li>`)

			}
		}
	});

	//point list
	$.ajax({
		url: "/list/point",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				$(".leftCol").append(`<li>
						<input value="${data[i].data_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
								
								<label>${data[i].local_name}</label>
								
								<span class="input-group-btn">
								
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										레이어 수정</button>
										
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										레이어 삭제</button>
									<input type="hidden" value="${data[i].layer_type}">
										
									<!--style 변경-->	
									<button id="changeStyle" class="btn btn-success btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
									
								</span>
							</li>`)

			}
		}
	});

	//line list
	$.ajax({
		url: "/list/line",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				$(".leftCol").append(`<li>
						<input value="${data[i].data_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
								
								<label>${data[i].local_name}</label>
								
								<span class="input-group-btn">
								
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										레이어 수정</button>
										
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										레이어 삭제</button>
									<input type="hidden" value="${data[i].layer_type}">
										
									<!--style 변경-->	
									<button id="changeStyle" class="btn btn-success btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
									
								</span>
							</li>`)

			}
		}
	});


});




//update modal data
$(document).on("click", "#updatelayer", function() {
	var update_layer_data = this.value;
	update_layer_data = update_layer_data.split(',');

	$("#update_layer_num").val(update_layer_data[0]);
	$("#update_local_name").val(update_layer_data[1]);
	$("#update_data_name").val(update_layer_data[2]);
	$("#update_layer_type").val(update_layer_data[3]);


	$("#updatemodal").modal();

});

//layer update validation
function validateupdateForm() {
	var frm = $("#updateForm");
	var x = document.forms["updateForm"]["update_local_name"].value;
	var y = document.forms["updateForm"]["update_data_name"].value;
	var z = document.forms["updateForm"]["update_layer_type"].value;


	if (x == "") {
		alert("local_name을 입력해 주세요");
		return false;
	}
	else if (y == "") {
		alert("data_name을 입력해 주세요");
		return false;
	}
	else {
		if (z == "raster") {
			console.log(z);
			$("#updateForm").attr("action", "/update/raster/name");
		}
		else if (z == "polygon") {
			$("#updateForm").attr("action", "/update/polygon/name")
		}
		else if (z == "point") {
			$("#updateForm").attr("action", "/update/point/name")
		}
		else if (z == "line") {
			$("#updateForm").attr("action", "/update/line/name")
		}
		
		frm.submit();
		alert("레이어가 수정되었습니다.");
		
	}
}




//layer delete
$(document).on("click", "#deleteLayer", function() {
	var delete_layer_data = this.value;
	var deltype = "/delete/";

	delete_layer_data = delete_layer_data.split(',');
	console.log(delete_layer_data[1]);

	if (delete_layer_data[1] == "raster") {
		deltype += "raster/";
	}
	else if (delete_layer_data[1] == "polygon") {
		deltype += "polygon/";
	}
	else if (delete_layer_data[1] == "point") {
		deltype += "point/";
	}
	else if (delete_layer_data[1] == "line") {
		deltype += "line/";
	}


	if (confirm("해당 레이어를 삭제하시겠습니까??") == true) {
		alert("삭제되었습니다.");
		location.href = deltype + delete_layer_data[0];
	} else {
		return false;
	}
})



/*
//insert data
var insertsubmit = document.forms["insertForm"]["insertsubmit"];
	var intype = "dd";
$(document).on("click", insertsubmit, function() {
	var radios = $("#insert_layer_type");

	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked == true) {
			intype = radios[i].value;
		}
	}

	$("#insertForm").attr("action", "/insert/" + intype).submit(validateinsertForm());
})

//layer insert validation
function validateinsertForm() {
	var x = document.forms["insertForm"]["local_name"].value;
	var y = document.forms["insertForm"]["data_name"].value;

	if (x == "") {
		alert("local_name을 입력해 주세요");
		return false;
	}
	else if (y == "") {
		alert("data_name을 입력해 주세요");
		return false;
	} else {
		alert("레이어가 추가되었습니다.");
	}
}
*/

