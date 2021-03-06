$(document).ready(function() {

});

//raster list
$.ajax({
	url: "/list/raster",
	async: false,
	success: function(data) {
		for (var i = 0; i < data.length; i++) {
			$(".leftCol").append(`<li>
						<div class="row">
						<div class="col-md-1 ">
						<input value="${data[i].layer_num},${data[i].local_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
						</div>
						<div class="col-md-6">
								<label class="jbtlabel">${data[i].local_name}</label>
						</div>
						<div class="input-group-btn">
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										<i class="fa fa-pencil-square"></i></button>
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-trash-o"></i></button>
										<input type="hidden" value="${data[i].layer_type}">
						</div>
								<br>
						</div>
							</li>`)

		}
	}
});

//polygon list
$.ajax({
	url: "/list/polygon",
	async: false,
	success: function(data) {
		for (var i = 0; i < data.length; i++) {
			$(".leftCol").append(`<li>
						<div class="row">
						<div class="col-md-1 ">
						<input value="${data[i].layer_num},${data[i].local_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
						</div>
						<div class="col-md-6">
								<label class="jbtlabel">${data[i].local_name}</label>
						</div>
						<div class="input-group-btn">
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										<i class="fa fa-pencil-square"></i></button>
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-trash-o"></i></button>
									<input type="hidden" value="${data[i].layer_type}">
									<!--style 변경-->	
									<button id="changeStyle" name="changeStyle[]" class="btn btn-success btn-sm" 
										value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
						</div>
								<br>
							</div>
							</li>`)

		}
	}
});

//point list
$.ajax({
	url: "/list/point",
	async: false,
	success: function(data) {
		for (var i = 0; i < data.length; i++) {
			$(".leftCol").append(`<li>
						<div class="row">
						<div class="col-md-1 ">
						<input value="${data[i].layer_num},${data[i].local_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
						</div>
						<div class="col-md-6">
								<label class="jbtlabel">${data[i].local_name}</label>
						</div>
						<div class="input-group-btn">
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										<i class="fa fa-pencil-square"></i></button>
										
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-trash-o"></i></button>
									<input type="hidden" value="${data[i].layer_type}">
									<!--style 변경-->	
									<button id="changeStyle" name="changeStyle[]" class="btn btn-success btn-sm" 
											value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
							</div>
								<br>
							</div>
							</li>`)

		}
	}
});

//line list
$.ajax({
	url: "/list/line",
	async: false,
	success: function(data) {
		for (var i = 0; i < data.length; i++) {
			$(".leftCol").append(`<li>
						<div class="row">
						<div class="col-md-1 ">
						<input value="${data[i].layer_num},${data[i].local_name}" type="checkbox"
								name="checked_layer[]" id="checked_layer" class="checkSelect" data-value=""> 
						</div>
						<div class="col-md-6">
								<label class="jbtlabel">${data[i].local_name}</label>
						</div>
						<div class="input-group-btn">
									<button id="updatelayer" name="updatelayer"
										class="btn btn-info btn-sm"
										value="${data[i].layer_num},${data[i].local_name},${data[i].data_name},${data[i].layer_type}">
										<i class="fa fa-pencil-square"></i></button>
										
									<button id="deleteLayer" name="deleteLayer"
										class="btn btn-danger btn-sm" value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-trash-o"></i></button>
									<input type="hidden" value="${data[i].layer_type}">
									<!--style 변경-->	
									<button id="changeStyle" name="changeStyle[]" class="btn btn-success btn-sm" 
											value="${data[i].layer_num},${data[i].layer_type}">
										<i class="fa fa-gear"></i>
									</button>
							</div>
								<br>
							</div>
							</li>`)

		}
	}
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
			$("#updateForm").attr("action", "/update/name/raster");
		}
		else if (z == "polygon") {
			$("#updateForm").attr("action", "/update/name/polygon")
		}
		else if (z == "point") {
			$("#updateForm").attr("action", "/update/name/point")
		}
		else if (z == "line") {
			$("#updateForm").attr("action", "/update/name/line")
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





//layer insert validation
function validateinsertForm() {
	var ifrm = $("#insertForm");
	var x = document.forms["insertForm"]["insert_local_name"].value;
	var y = document.forms["insertForm"]["insert_data_name"].value;

	var radios = $('input[name="insert_layer_type"]:checked').val();

	console.log(radios);
	if (x == "") {
		alert("local_name을 입력해 주세요");
		return false;
	}
	else if (y == "") {
		alert("data_name을 입력해 주세요");
		return false;
	} else {

		$("#insertForm").attr("action", "/insert/" + radios);
		alert("레이어가 추가되었습니다.");
		ifrm.submit();
	}
}


