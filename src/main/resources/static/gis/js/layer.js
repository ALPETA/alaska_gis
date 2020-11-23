//Layer Group
var alaska_layer_group = new ol.layer.Group();

//Layer Array
var send_array = Array();

//checkbox Array
var checked_layer = $(".checkSelect");


$(document).ready(function() {

	for (i = 1; i < checked_layer.length; i++) {
		var layer_values = checked_layer[i].value;
		layer_values = layer_values.split(',');

		if (layer_values[1] == 'raster') {
			send_array[i] = newTileLayer(layer_values[0], layer_values[0]);
		}
		else {
			send_array[i] = newVectorLayer(layer_values[0], layer_values[0]);
		}

		//group에 넣기
		alaska_layer_group.getLayers().push(send_array[i]);
	}


});

//checkbox 체크 여부에 따른 setVisible 처리
$(".checkSelect").change(function() {
	var datas = this.value;
	datas = datas.split(',');
	var data_name = datas[0];

	if ($(this).attr("class").split(" ")[1] == "active") {
		for (var i = 1; i < send_array.length; i++) {
			if (send_array[i].values_.layerName == data_name) {
				send_array[i].setVisible(false)
				$("#allCheckbox").prop("checked", false);
				$("#allCheckbox").removeClass("active");
			}
		}
		$(this).removeClass("active")
	}
	else {
		for (var i = 1; i < send_array.length; i++) {
			if (send_array[i].values_.layerName == data_name) {
				send_array[i].setVisible(true);
			}
		}
		$(this).addClass("active")
	}

});

//레이어 전체 선택/해제 여부에 따른 setVisible 처리
$("#allCheckbox").change(function() {
	if ($("#allCheckbox").prop("checked")) {
		$("input[type=checkbox]").prop("checked", true);

		for (var i = 1; i < checked_layer.length; i++) {

			var datas = checked_layer[i].value;
			datas = datas.split(',');
			var data_name = datas[0];

			for (var r = 1; r < send_array.length; r++) {

				if (send_array[r].values_.layerName == data_name) {

					if ($(checked_layer[r]).attr("class").split(" ")[1] == "active") {
						continue;
					}
					else {
						send_array[r].setVisible(true)
						$(checked_layer[r]).addClass("active")
					}
				}
			}

		}
	}

	else {
		$("input[type=checkbox]").prop("checked", false);
		for (var i = 1; i < checked_layer.length; i++) {

			var datas = checked_layer[i].value;
			datas = datas.split(',');
			var data_name = datas[0];

			for (var r = 1; r < send_array.length; r++) {

				if (send_array[r].values_.layerName == data_name) {

					if ($(checked_layer[r]).attr("class").split(" ")[1] == "active") {
						send_array[r].setVisible(false)
						$(checked_layer[r]).removeClass("active")
					}
					else {
						continue;
					}
				}
			}
		}
	}
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

var view = new ol.View({
	center: new ol.proj.fromLonLat([-151, 60.68]),
	maxZoom: 19,
	zoom: 7,
});


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
	view: view,
});



var layer_datas;
var element = document.getElementById('popup');
var coordElement = document.getElementById('olPopup');

var olPopup = new ol.Overlay({
	element:coordElement,
});
map.addOverlay(olPopup);

map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
		layer_datas = feature.getProperties();
		console.log(layer_datas);

		return feature;
	});
	if(feature){
		var coordinate = evt.coordinate;
		var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(coordinate, 'EPSG:3857','EPSG:4326'));
		
		$(coordElement).popover('destroy');
		olPopup.setPosition(coordinate);
		
		$(coordElement).popover({
			placement:'top',
			animation:false,
			html:true,
			content:'<p>지금 위치?</p><code>'+ hdms+'</code>',
		});
		$(coordElement).popover('show');
	}else{
		$(coordElement).popover('destroy');
	}
});

map.on('pointermove', function(e){
		if(e.dragging){
			$(coordElement).popover('destroy');
			return;
		}
		var pixel = map.getEventPixel(e.originalEvent);
		var hit = map.hasFeatureAtPixel(pixel);
		map.getTarget().style.cursor = hit ? 'pointer' : '';
	});
