var vectorSource = new ol.source.Vector({
	format: new ol.format.GeoJSON(),
	url: function(extent) {
		return (
			'http://localhost:8088/geoserver/test/wfs?service=WFS&' +
			'version=1.1.0&request=GetFeature&typename=test:Boundary&' +
			'outputFormat=application/json&srsname=EPSG:3857&' +
			'bbox=' +
			extent.join(',') +
			',EPSG:3857'
		);
	},
	strategy: ol.loadingstrategy.bbox,
});

var vector = new ol.layer.Vector({
	source: vectorSource,
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgba(0, 0, 255, 1.0)',
			width: 2,
		}),
	}),
});

var raster = new ol.layer.Tile({
	source: new ol.source.XYZ({
		url: 'https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}@2x.png?key=hVTaF7m7fWw8xKcPSNzr',
	}),
});

var map = new ol.Map({
	layers: [raster, vector],
	target: document.getElementById('map'),
	view: new ol.View({
		center: [0, 0],
		maxZoom: 19,
		zoom: 0,
	}),
});
