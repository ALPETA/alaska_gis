$(document).ready(function() {
	//update modal data
	$("button[name='updatelayer']").click(function() {
		var layer_data = this.value;
		layer_data = layer_data.split(',');

		$("#update_local_name").val(layer_data[0]);
		$("#update_data_name").val(layer_data[1]);

		$("#updatemodal").modal();

	});

	//layer delete
	$("button[name='deleteLayer']").click(function() {
		var layernum = this.value;

		if (confirm("해당 레이어를 삭제하시겠습니까??") == true) {
			alert("삭제되었습니다.");
			location.href = "/delete/" + layernum;
		} else {
			return false;
		}
	});

});

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
		alert("레이어가 추가되었습니다.")
	}
}

//layer update validation
function validateupdateForm() {
	var x = document.forms["updateForm"]["update_local_name"].value;
	var y = document.forms["updateForm"]["update_data_name"].value;
	if (x == "") {
		alert("local_name을 입력해 주세요");
		return false;
	}
	else if (y == "") {
		alert("data_name을 입력해 주세요");
		return false;
	} else {
		alert("레이어가 수정되었습니다.")
	}
}


