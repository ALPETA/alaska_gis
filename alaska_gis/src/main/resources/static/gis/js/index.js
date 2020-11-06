var checked_number = null;
var check_count = document.getElementsByName("checked_num").length;

for (var i = 0; i < check_count; i++) {
	if (document.getElementsByName("checked_num")[i].checked == true) {
		checked_number == document.getElementsByName("checked_num")[i].value;
		break;
	}
}