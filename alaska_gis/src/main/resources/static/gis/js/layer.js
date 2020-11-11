var alaska_layer_group = new ol.layer.Group();

//레이어 alaska_layer_group에 탑재
	var send_array = Array();
$(document).ready(function() {
	var checked_layer = $(".checkSelect");

	for (i = 0; i < checked_layer.length; i++) {
		send_array[i] = newVectorLayer(checked_layer[i].value,checked_layer[i].value);
		
		//group에 넣기
		alaska_layer_group.getLayers().push(send_array[i]);
	}
	
	
	//checkbox 체크여부에 따른 setVisible 처리
	$(".checkSelect").change(function() {
		var checked_layer = $(".checkSelect");
		console.log($(this).attr("class").split(" ")[1])
		if($(this).attr("class").split(" ")[1] == "active") {
			for(var i = 0; i < send_array.length; i++) {
				if(send_array[i].values_.layerName == $(this).val()) {
					send_array[i].setVisible(false)
				}
			}
			$(this).removeClass("active")
		}else {
			for(var i = 0; i < send_array.length; i++) {
				if(send_array[i].values_.layerName == $(this).val()) {
					send_array[i].setVisible(true)
				}
			}
			$(this).addClass("active")
		}
	
	});

});

//레이어 생성 function
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
		visible:false,
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
		center: new ol.proj.fromLonLat([-150.28, 60.68]),
		maxZoom: 19,
		zoom: 7,
	}),
});



