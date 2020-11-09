$(document).ready(function() {
	$("button[name='updatelayer']").click(function() {
		var layer_data = this.value;
		layer_data = layer_data.split(',');
		
		$("#update_local_name").val(layer_data[1]);
		$("#update_data_name").val(layer_data[2]);
		$("#update_layer_num").val(layer_data[0]);
		
		$("#updatemodal").modal();
	});
});