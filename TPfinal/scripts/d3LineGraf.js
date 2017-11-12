function _chamada(teste) {
    $(document).on('mouseover mouseout', '.boxGraf', function(){
     var $div = $("<div>", {id: "viz"}); 
    $(".boxGraf").append($div);
     	if (document.contains(document.getElementById("viz"))) {
            $(document).off('mouseover mouseout');
            var text = $('.containerID').text();
            grafica(text);
		}else{
			  alert("Problemas con a criacao da DIV!!");
             $(document).off('mouseover mouseout');
		}
	});
}
var url = 'https://comunello.github.io/infoVis/dadosTabela.tsv';
function grafica(_id) {
	d3.tsv(url,
        function(error, data) {
            callbackError = error;
			callbackData = data;
			data.forEach(function(d) {
			d.cant = +d.cant;
			d.valorCompra = +d.valorCompra;
			d.valorPromedio= +d.valorPromedio;
			d.valorTotalVenda= +d.valorTotalVenda;
			d.valorVendaProme= +d.valorVendaProme;
			d.date= +d.date; //identificar como colocar a data aqui
			});
			var filterId = data.filter(function(d) { return d.id ==_id; });
		//console.log(filterId)
  
			var visualization = d3plus.viz()
								.container("#viz")  // container DIV to hold the visualization
								.data(filterId)  // data to use with the visualization
								.type("line")       // visualization type
								.y("valorCompra")         // key to use for y-axis
								.x("date")          // key to use for x-axis
								.draw();             // finally, draw the visualization!
	});	
}