/*$(".checkSelect").change(function() {
	var send_array = Array();
	var send_cnt = 0;
	var checked_layer = $(".checkSelect");

	for (i = 0; i < checked_layer.length; i++) {
		if (checked_layer[i].checked == true) {
			send_array[send_cnt] = checked_layer[i].value;
			send_cnt++;
		}
	}

	$("#array").val(send_array);

	console.log(send_array);
});*/
var alaska_layer_group = new ol.layer.Group();

$(document).ready(function() {
	var send_array = Array();
	var checked_layer = $(".checkSelect");

	for (i = 0; i < checked_layer.length; i++) {
		send_array[i] = newVectorLayer(checked_layer[i].value,checked_layer[i].value);
		alaska_layer_group.getLayers().push(send_array[i]);
	}

});

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
	})
}

var raster = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}@2x.png?key=hVTaF7m7fWw8xKcPSNzr',
	}),
});

var map = new ol.Map({
	layers: [raster, alaska_layer_group],
	target: document.getElementById('map'),
	view: new ol.View({
		center: [0, 0],
		maxZoom: 19,
		zoom: 0,
	}),
});
