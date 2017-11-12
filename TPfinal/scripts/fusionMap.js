var layer;
function initialize() {
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
		(navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}
	var mapDiv = document.getElementById('googft-mapCanvas');
	mapDiv.style.width = isMobile ? '100%' : '800px';
	mapDiv.style.height = isMobile ? '100%' : '500px';
	var map = new google.maps.Map(mapDiv, {
		center: new google.maps.LatLng(-34.533789716173615, -58.592607968750016),
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	layer = new google.maps.FusionTablesLayer({
		map: map,
		heatmap: { enabled: false },
		query: {
			select: "col0",
			from: "1ppTgdaqd9wNUbM0SsyPWwcviC5CgKQOxpoAKwPzl",
			where: ""
		},
		options: {
			styleId: 4,
			templateId: 5
		}
	});
	google.maps.event.addListener(layer, 'click', function(e) {
	if (document.contains(document.getElementById("viz"))) {
		document.getElementById("viz").remove();
	  }   
   
	_chamada();
		
	});
	if (isMobile) {
		var legend = document.getElementById('googft-legend');
		var legendOpenButton = document.getElementById('googft-legend-open');
		var legendCloseButton = document.getElementById('googft-legend-close');
		legend.style.display = 'none';
		legendOpenButton.style.display = 'block';
		legendCloseButton.style.display = 'block';
		legendOpenButton.onclick = function() {
			legend.style.display = 'block';
			legendOpenButton.style.display = 'none';
		}
		legendCloseButton.onclick = function() {
		legend.style.display = 'none';
		legendOpenButton.style.display = 'block';
	}
	}
}
google.maps.event.addDomListener(window, 'load', initialize);