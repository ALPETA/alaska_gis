//Layer Group
var alaska_layer_group = new ol.layer.Group();

//Layer Array
var send_array = Array();
var send_array_num = 0;

//checkbox Array
var checked_layer = $(".checkSelect");

var raster_datas = Array();
var polygon_datas = Array();
var point_datas = Array();
var line_datas = Array();

$(document).ready(function() {
	layerinput();
});

function layerinput() {
	$.ajax({
		url: "/list/raster",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[i] = newTileLayer(Object.values(data[i]));
				raster_datas[i] = (Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[i]);
				raster_datas[i] = (Object.values(data[i]));
				send_array_num++
			}
		}
	})

	$.ajax({
		url: "/list/polygon",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[send_array_num] = newVectorLayer_polygon(Object.values(data[i]));
				polygon_datas[i] = (Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[send_array_num]);
				send_array_num++
			}
		}
	})

	$.ajax({
		url: "/list/point",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[send_array_num] = newVectorLayer_point(Object.values(data[i]));
				point_datas[i] = (Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[send_array_num]);
				send_array_num++
			}
		}
	})

	$.ajax({
		url: "/list/line",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				send_array[send_array_num] = newVectorLayer_line(Object.values(data[i]));
				line_datas[i] = (Object.values(data[i]));
				alaska_layer_group.getLayers().push(send_array[send_array_num]);
				send_array_num++
			}
		}
	})
}



//changeStyle polygon
$(document).on("click", "#changeStyle", function() {
	var style_layer_data = this.value;
	style_layer_data = style_layer_data.split(',');
	var title;

	if (style_layer_data[1] == 'polygon') {
		for (var i = 0; i < polygon_datas.length; i++) {
			if (polygon_datas[i][0] == parseInt(style_layer_data[0])) {
				title = polygon_datas[i][1];
				$("#plline_fill_color").val(polygon_datas[i][3]);
				$("#pllline_width").val(polygon_datas[i][4]);
				$("#plfill_color").val(polygon_datas[i][5]);
				$("#plopacity").val(polygon_datas[i][6]);
				$("#polygon_num").val(polygon_datas[i][0]);
				break;
			}
		}
		$('#dialog-message2').dialog({
			title: title,
			buttons: {
				"SAVE": function() {
					var plline_fill_color = $("#plline_fill_color").val()
					var pllline_width = parseFloat($("#pllline_width").val())
					var plfill_color = $("#plfill_color").val()
					var plopacity = parseFloat($("#plopacity").val())
					var polygon_num = parseInt($("#polygon_num").val())
					$.ajax({
						data: {
							"plline_fill_color": plline_fill_color,
							"pllline_width": pllline_width,
							"plfill_color": plfill_color,
							"plopacity": plopacity,
							"polygon_num": polygon_num
						},
						url: "/update/style/polygon",
						success: function(data) {
							var newstyle = new ol.style.Style({
								stroke: new ol.style.Stroke({
									color: plline_fill_color,
									width: parseFloat(pllline_width),
								}),
								fill: new ol.style.Fill({
									color: plfill_color,
								}),
							})
							for (var i = 0; i < send_array.length; i++) {
								
								if (send_array[i].values_.layerName == title) {
									send_array[i].setStyle(newstyle);
									send_array[i].values_.opacity = plopacity;
								}
							}
							listagain()
						}
					});
				},
			}
		});
	}
	//changestyle_point
	else if (style_layer_data[1] == 'point') {

		for (var i = 0; i < polygon_datas.length; i++) {
			if (point_datas[i][0] == parseInt(style_layer_data[0])) {
				title = point_datas[i][1];
				$('[name=point_shape]:radio[value="' + point_datas[i][3] + '"]').prop('checked', true);
				$("#pofill_color").val(point_datas[i][4]);
				$("#point_radius").val(point_datas[i][5]);
				$("#popacity").val(point_datas[i][6]);
				$("#point_num").val(point_datas[i][0]);
				break;
			}
		}

		$('#dialog-message1').dialog({
			title: title,
			buttons: {
				"SAVE": function() {
					var point_shape = $('input[name=point_shape]:checked').val()
					var pofill_color = $("#pofill_color").val()
					var point_radius = parseFloat($("#point_radius").val())
					var popacity = parseFloat($("#popacity").val())
					var point_num = parseInt($("#point_num").val())
					$.ajax({
						data: {
							"point_shape": point_shape,
							"pofill_color": pofill_color,
							"point_radius": point_radius,
							"popacity": popacity,
							"point_num": point_num
						},
						url: "/update/style/point",
						success: function(data) {
							var new_point_style;

							if (point_shape == 'circle') {
								console.log("circle")
								new_point_style = new ol.style.Style({
									image: new ol.style.Circle({
										fill: new ol.style.Fill({ color: pofill_color }),
										radius: point_radius,
									}),
								});
							}
							else if (point_shape == 'square') {
								new_point_style = new ol.style.Style({
									image: new ol.style.RegularShape({
										fill: new ol.style.Fill({ color: pofill_color }),
										points: 4,
										radius: point_radius,
										angle: Math.PI / 4,
									}),
								});
							}
							else if (point_shape == 'triangle') {
								new_point_style = new ol.style.Style({
									image: new ol.style.RegularShape({
										fill: new ol.style.Fill({ color: pofill_color }),
										points: 3,
										radius: point_radius,

									}),
								});
							}
							else if (point_shape == 'star') {
								new_point_style = new ol.style.Style({
									image: new ol.style.RegularShape({
										fill: new ol.style.Fill({ color: pofill_color }),
										points: 5,
										radius: point_radius,
										radius2: parseFloat(point_radius / 2.0),
									}),
								});
							}

							for (var i = 0; i < send_array.length; i++) {
								
								if (send_array[i].values_.layerName == title) {
									send_array[i].setStyle(new_point_style);
									send_array[i].values_.opacity = popacity;
								}
							}
							listagain()
						}
					});
				},
			}
		});
	}
	//change style line
	else if (style_layer_data[1] == 'line') {
		for (var i = 0; i < polygon_datas.length; i++) {
			if (line_datas[i][0] == parseInt(style_layer_data[0])) {
				title = line_datas[i][1];
				$("#liline_color").val(line_datas[i][3]);
				$("#liline_width").val(line_datas[i][4]);
				$("#liopacity").val(line_datas[i][5]);
				$("#line_num").val(line_datas[i][0]);
				break;
			}
		}
		$('#dialog-message3').dialog({
			title: title,
			buttons: {
				"SAVE": function() {
					var liline_color = $("#liline_color").val()
					var liline_width = parseFloat($("#liline_width").val())
					var liopacity = parseFloat($("#liopacity").val())
					var line_num = parseInt($("#line_num").val())
					$.ajax({
						data: {
							"liline_color": liline_color,
							"liline_width": liline_width,
							"liopacity": liopacity,
							"line_num": line_num,
						},
						url: "/update/style/line",
						success: function(data) {
							var new_line_style = new ol.style.Style({
								stroke: new ol.style.Stroke({
									color: liline_color,
									width: liline_width,
								}),
							})

							for (var i = 0; i < send_array.length; i++) {
								
								if (send_array[i].values_.layerName == title) {
									send_array[i].setStyle(new_line_style);
									send_array[i].values_.opacity = liopacity;
								}
							}
							listagain()
						}
					});
				},
			}
		});
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
		opacity: parseFloat(polygonData[6]),
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
				radius: parseFloat(pointData[5]),
			}),
		});
	}
	else if (pointData[3] == 'square') {
		style = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({ color: pointData[4] }),
				points: 4,
				radius: parseFloat(pointData[5]),
				angle: Math.PI / 4,
			}),
		});
	}
	else if (pointData[3] == 'triangle') {
		style = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({ color: pointData[4] }),
				points: 3,
				radius: parseFloat(pointData[5]),

			}),
		});
	}
	else if (pointData[3] == 'star') {
		style = new ol.style.Style({
			image: new ol.style.RegularShape({
				fill: new ol.style.Fill({ color: pointData[4] }),
				points: 5,
				radius: parseFloat(pointData[5]),
				radius2: parseFloat(pointData[5] / 2),
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
		opacity: parseFloat(pointData[6]),
		visible: false,
	})
}

//레이어 생성 function wfs -line
function newVectorLayer_line(lineData) {
	var style = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: lineData[3],
			width: parseFloat(lineData[4]),
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
		opacity: parseFloat(lineData[5]),
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


//Overlay
var layer_datas;
var coordElement = document.getElementById('olPopup');
var closer = document.getElementById('popup-closer');
var content = document.getElementById('popup-content');


var olPopup = new ol.Overlay({
	element: coordElement,
	autoPan: true,
	autoPanAnimation: {
		duration: 250,
	},
});

//x버튼 이벤트
closer.onclick = function() {
	olPopup.setPosition(undefined);
	closer.blur();
	return false;
};

//Accessible Map 
var map = new ol.Map({
	layers: [base, alaska_layer_group],
	overlays: [olPopup],
	target: document.getElementById('map'),
	view: view,
});

//peature 클릭 이벤트
map.on('click', function(evt) {
	var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
		layer_datas = feature.getProperties();

		return feature;
	});
	if (feature) {
		var table_data = "<table><tbody>";

		for (let key in layer_datas) {
			if (key == "geometry") {
				continue;
			}
			else {
				var table_data = table_data + `<tr>
								<th>${key}</th>
								<td>${layer_datas[key]}</td>
							  </tr>`;
			}
		}

		table_data = table_data + "</tbody></table>";

		var coordinate = evt.coordinate;

		content.innerHTML = `<code>${table_data}</code>`
		olPopup.setPosition(coordinate);

	}
});

//pointermove 이벤트
map.on('pointermove', function(e) {
	if (e.dragging) {
		$(coordElement).popover('destroy');
		return;
	}
	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.hasFeatureAtPixel(pixel);
	map.getTarget().style.cursor = hit ? 'pointer' : '';
});

//업데이트 휴 data
function listagain() {

	$.ajax({
		url: "/list/raster",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				raster_datas[i] = (Object.values(data[i]));
			}
		}
	});

	//polygon list
	$.ajax({
		url: "/list/polygon",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				polygon_datas[i] = (Object.values(data[i]));
			}
		}
	});

	//point list
	$.ajax({
		url: "/list/point",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				point_datas[i] = (Object.values(data[i]));
			}
		}
	});

	//line list
	$.ajax({
		url: "/list/line",
		async: false,
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				line_datas[i] = (Object.values(data[i]));
			}

		}
	});
}
