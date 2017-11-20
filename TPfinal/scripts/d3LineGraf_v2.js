function grafica3(_id,_type) {
	var url = 'https://comunello.github.io/infoVis/TPfinal/dadosTabela.tsv';

	d3.tsv(url,
        function(error, data) {
            callbackError = error;
			callbackData = data;
			data.forEach(function(d) {
            d.id = +d.id;
			d.Value = +d.Value;
			d.date= +d.date; //identificar como colocar a data aqui
            d.Descrip=d.Descrip;
			});
		function _subst(check1,check2) {
			var _n = check2.length;
			var i = check1.substr(0,_n);
			  if (i == check2) { 
				return true; 
			  }
			return false;
		}
  
		filterId2 = data.filter(function(d) { return d.id ==_id && 
                 _subst(d.Descrip,_type); });
		_Compra 	=  d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Compra");}), 
							function(d) {return d.Value; });
		_Venda 		=  d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Venda");}), 
							function(d) {return d.Value; });
		_PosVenda 	=  d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("PosVenda");}), 
							function(d) {return d.Value; });
							
							
							
							

		var codes = retorno(_type,new Intl.NumberFormat('de-DE',{ maximumFractionDigits :2 }).format(_Compra),
								new Intl.NumberFormat('de-DE',{ maximumFractionDigits :2 }).format(_Venda),
								new Intl.NumberFormat('de-DE',{ maximumFractionDigits :2 }).format(_PosVenda));
		
		_fdp(codes);
		
		var visualization = d3plus.viz()
							.container("#viz")  // container DIV to hold the visualization
							.data(filterId2)  // data to use with the visualization
							.type("line")       // visualization type
							.id(["Descrip"])
							.y("Value")         // key to use for y-axis
							.x("date")          // key to use for x-axis
							.draw();  
	});	
}