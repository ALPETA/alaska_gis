//Layer Group
var alaska_layer_group = new ol.layer.Group();

//Layer Array
var send_array = Array();
var send_array_num = -1;

//checkbox Array
var checked_layer = $(".checkSelect");

$(document).ready(function() {

	$.ajax({
		url: "/list/raster",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[i] = newTileLayer(Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[i]);
				send_array_num++
			}
		}
	})

	$.ajax({
		url: "/list/polygon",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[send_array_num] = newVectorLayer_polygon(Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[send_array_num]);
				send_array_num++
			}
		}
	})

	$.ajax({
		url: "/list/point",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[send_array_num] = newVectorLayer_point(Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[send_array_num]);
				send_array_num++
			}
		}
	})

	$.ajax({
		url: "/list/line",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[send_array_num] = newVectorLayer_line(Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[send_array_num]);
				send_array_num++
			}
		}
	})
});

//changeStyle test
$(document).on("click", "#changeStyle", function() {
	var style_layer_data = this.value;
	style_layer_data = style_layer_data.split(',');
	var data_length = style_layer_data.length;

	if (style_layer_data[data_length - 1] == 'polygon') {
		$('#dialog-message2').dialog({
			title: style_layer_data[1],
			buttons: {
				"SAVE": function() { $(this).dialog('close'); },
			}
		});
		
		$('#dialog-message1').dialog('close');
		$('#dialog-message3').dialog('close');
	}
	else if (style_layer_data[data_length - 1] == 'point') {
		$('#dialog-message1').dialog({
			title: style_layer_data[1],
			buttons: {
				"SAVE": function() { $(this).dialog('close'); },
			}
		});
		$('#dialog-message2').dialog('close');
		$('#dialog-message3').dialog('close');
	}
	else if (style_layer_data[data_length - 1] == 'line') {
		$('#dialog-message3').dialog({
			title: style_layer_data[1],
			buttons: {
				"SAVE": function() { $(this).dialog('close'); },
			}
		});
		$('#dialog-message1').dialog('close');
		$('#dialog-message2').dialog('close');
	}


});

//checkbox 체크 여부에 따른 setVisible 처리
$(document).on("change", ".checkSelect", function() {
	var datas = this.value;
	datas = datas.split(',');
	var layer_name = datas[1];

	if ($(this).attr("class").split(" ")[1] == "active") {
		for (var i = 0; i < send_array.length; i++) {
			if (send_array[i].values_.layerName == layer_name) {
				send_array[i].setVisible(false)
				$("#allCheckbox").prop("checked", false);
				$("#allCheckbox").removeClass("active");
			}
		}
		$(this).removeClass("active")
	}
	else {
		for (var i = 0; i < send_array.length; i++) {
			if (send_array[i].values_.layerName == layer_name) {
				send_array[i].setVisible(true);
				$(this).addClass("active")
			}
		}
	}
});

//레이어 전체 선택/해제 여부에 따른 setVisible 처리
$(document).on("change", "#allCheckbox", function() {
	if ($("#allCheckbox").prop("checked")) {
		$("input[type=checkbox]").prop("checked", true);

		for (var i = 0; i < checked_layer.length; i++) {

			var datas = checked_layer[i].value;
			datas = datas.split(',');
			var data_name = datas[1];

			for (var r = 0; r < send_array.length; r++) {

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
		for (var i = 0; i < checked_layer.length; i++) {

			var datas = checked_layer[i].value;
			datas = datas.split(',');
			var data_name = datas[1];

			for (var r = 0; r < send_array.length; r++) {

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


//레이어 생성 function wfs - polygon
function newVectorLayer_polygon(polygonData) {
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: polygonData[3],
			width: parseInt(polygonData[4]),
		}),
		fill: new ol.style.Fill({
			color: polygonData[5],
		}),
	})

	return new ol.layer.Vector({
		layerName: polygonData[1],
		source: new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: function(extent) {
				return (
					'http://localhost:8088/geoserver/test/wfs?service=WFS&' +
					'version=1.1.0&request=GetFeature&typename=' + polygonData[2] +
					'&outputFormat=application/json&srsname=EPSG:3857&' +
					'bbox=' +
					extent.join(',') +
					',EPSG:3857'
				);
			},
			strategy: ol.loadingstrategy.bbox,
		}),
		style: style,
		opacity: parseInt(polygonData[6]),
		visible: false,
	})
}

//레이어 생성 function wfs - point
function newVectorLayer_point(pointData) {
	var style;

	if (pointData[3] == 'circle') {
		style = new ol.style.Style({
			image: new ol.style.Circle({
				fill: new ol.style.Fill({ color: pointData[4] }),
				radius: parseInt(pointData[5]),
			}),
		});
	}
	else if (pointData[3] == 'square') {
		style = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({ color: pointData[4] }),
				points: 4,
				radius: parseInt(pointData[5]),
				angle: Math.PI / 4,
			}),
		});
	}
	else if (pointData[3] == 'triangle') {
		style = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({ color: pointData[4] }),
				points: 3,
				radius: parseInt(pointData[5]),

			}),
		});
	}
	else if (pointData[3] == 'star') {
		style = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({ color: pointData[4] }),
				points: 5,
				radius: parseInt(pointData[5]),
				radius2: parseInt(pointData[5] / 2),
			}),
		});
	}


	return new ol.layer.Vector({
		layerName: pointData[1],
		source: new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: function(extent) {
				return (
					'http://localhost:8088/geoserver/test/wfs?service=WFS&' +
					'version=1.1.0&request=GetFeature&typename=' + pointData[2] +
					'&outputFormat=application/json&srsname=EPSG:3857&' +
					'bbox=' +
					extent.join(',') +
					',EPSG:3857'
				);
			},
			strategy: ol.loadingstrategy.bbox,
		}),
		style: style,
		opacity: parseInt(pointData[6]),
		visible: false,
	})
}

//레이어 생성 function wfs -line
function newVectorLayer_line(lineData) {
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: lineData[3],
			width: parseInt(lineData[4]),
		}),
	})

	return new ol.layer.Vector({
		layerName: lineData[1],
		source: new ol.source.Vector({
			format: new ol.format.GeoJSON(),
			url: function(extent) {
				return (
					'http://localhost:8088/geoserver/test/wfs?service=WFS&' +
					'version=1.1.0&request=GetFeature&typename=' + lineData[2] +
					'&outputFormat=application/json&srsname=EPSG:3857&' +
					'bbox=' +
					extent.join(',') +
					',EPSG:3857'
				);
			},
			strategy: ol.loadingstrategy.bbox,
		}),
		style: style,
		opacity: parseInt(lineData[5]),
		visible: false,
	})
}

//레이어 생성 function wms
function newTileLayer(rasterData) {

	return new ol.layer.Tile({
		layerName: rasterData[1],
		source: new ol.source.TileWMS({
			url: 'http://localhost:8088/geoserver/wms',
			params: { 'LAYERS': rasterData[2], 'TILED': true },
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


//Overlay
var layer_datas;
var coordElement = document.getElementById('olPopup');

var olPopup = new ol.Overlay({
	element: coordElement,
});
map.addOverlay(olPopup);

map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
		layer_datas = feature.getProperties();
		console.log(layer_datas);

		return feature;
	});
	if (feature) {
		var coordinate = evt.coordinate;

		$(coordElement).popover('destroy');
		olPopup.setPosition(coordinate);

		$(coordElement).popover({
			placement: 'top',
			animation: false,
			html: true,
			content: '<p>데이터?</p><code>' + Object.entries(layer_datas) + '</code>',
		});
		$(coordElement).popover('show');
	} else {
		$(coordElement).popover('destroy');
	}
});

map.on('pointermove', function(e) {
	if (e.dragging) {
		$(coordElement).popover('destroy');
		return;
	}
	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	map.getTarget().style.cursor = hit ? 'pointer' : '';
});
