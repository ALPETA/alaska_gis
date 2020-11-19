//레이어 그룹
var alaska_layer_group = new ol.layer.Group();

//개별 레이어 Array
var send_array = Array();

$(document).ready(function() {

	var checked_layer = $(".checkSelect");

	for (i = 1; i < checked_layer.length; i++) {
		var layer_values = checked_layer[i].value;
		layer_values = layer_values.split(',');

		if (layer_values[1] == 'raster') {
			send_array[i] = newTileLayer(layer_values[0], layer_values[0]);
			console.log(layer_values[0]);
		}
		else {
			send_array[i] = newVectorLayer(layer_values[0], layer_values[0]);
			console.log(layer_values[0]);
		}

		//group에 넣기
		alaska_layer_group.getLayers().push(send_array[i]);
	}


	//checkbox 체크 여부에 따른 setVisible 처리
	$(".checkSelect").change(function() {

		if ($(this).attr("class").split(" ")[1] == "active") {
			for (var i = 1; i < send_array.length; i++) {
				if (send_array[i].values_.layerName == $(this).val()) {
					send_array[i].setVisible(false)
					$("#allCheckbox").prop("checked", false);
					$("#allCheckbox").removeClass("active");
				}
			}
			$(this).removeClass("active")
		}
		else {
			for (var i = 1; i < send_array.length; i++) {
				if (send_array[i].values_.layerName == $(this).val()) {
					console.log(send_array[i].values_.layerName);
					send_array[i].setVisible(true);
				}
			}
			console.log(this.value);
			$(this).addClass("active")
		}

	});

	//레이어 전체 선택/해제 여부에 따른 setVisible 처리
	$("#allCheckbox").change(function() {
		if ($("#allCheckbox").prop("checked")) {
			$("input[type=checkbox]").prop("checked", true);
			for (i = 1; i < checked_layer.length; i++) {
				for (var i = 1; i < send_array.length; i++) {
					if (send_array[i].values_.layerName == $(checked_layer[i]).val()) {
						if ($(checked_layer[i]).attr("class").split(" ")[1] == "active") {
							continue;
						}
						else {
							send_array[i].setVisible(true)
							$(checked_layer[i]).addClass("active")
						}
					}
				}
			}
		}

		else {
			$("input[type=checkbox]").prop("checked", false);
			for (i = 1; i < checked_layer.length; i++) {
				for (var i = 1; i < send_array.length; i++) {
					if (send_array[i].values_.layerName == $(checked_layer[i]).val()) {
						if ($(checked_layer[i]).attr("class").split(" ")[1] == "active") {
							send_array[i].setVisible(false)
							$(checked_layer[i]).removeClass("active")
						}
						else {
							continue;
						}
					}
				}
			}
		}
	});

});

//레이어 생성 function wfs
function newVectorLayer(layerName, geoServerLayer) {
	return new ol.layer.Vector({
		layerName: layerName,
		source: new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: function(extent) {
				return (
					'http://localhost:8088/geoserver/test/wfs?service=WFS&' +
					'version=1.1.0&request=GetFeature&typename=' + geoServerLayer +
					'&outputFormat=application/json&srsname=EPSG:3857&' +
					'bbox=' +
					extent.join(',') +
					',EPSG:3857'
				);
			},
			strategy: ol.loadingstrategy.bbox,
		}),
		visible: false,
	})
}

//레이어 생성 function wms
function newTileLayer(layerName, geoServerLayer) {
	return new ol.layer.Tile({
		layerName: layerName,
		source: new ol.source.TileWMS({
			url: 'http://localhost:8088/geoserver/wms',
			params: { 'LAYERS': geoServerLayer, 'TILED': true },
			serverType: 'geoserver',
		}),
		visible: false,
	})

}


//Tile Layer
var base = new ol.layer.Tile({
	source: new ol.source.XYZ({
		attributions: '<a href="https://www.maptiler.com/copyright/">&copy; MapTiler</a>' +
			' <a href="https://www.openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>',
		url: 'https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}@2x.png?key=hVTaF7m7fWw8xKcPSNzr',
	}),
});

//Accessible Map 
var map = new ol.Map({
	layers: [base, alaska_layer_group],
	target: document.getElementById('map'),
	view: new ol.View({
		center: new ol.proj.fromLonLat([-151, 60.68]),
		maxZoom: 19,
		zoom: 7,
	}),
});



