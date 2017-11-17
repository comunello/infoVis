function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}
preload([
	'img/fundoGraf.png',
	'img/normal.png',
	'img/click.png',
	'img/over.png'
]);

function _chamada() {
    $(document).on('mouseover mouseout', '.boxGraf', function(){
		var $div = $("<div>", {id: "viz"}); 
		$(".boxGraf").append($div);
		
		
		alert("Chamada");
		//$(".infoDir").children( ".botao:eq(0)").attr({id: "botao0"});
		//$(".infoDir").children( ".botao:eq(1)").attr({id: "botao1"});
		//$(".infoDir").children( ".botao:eq(2)").attr({id: "botao2"});
		
		 
		
     	if (document.contains(document.getElementById("viz"))) {
            $(document).off('mouseover mouseout');
			alert("Chamada2");
           
			var retorno = grafica3($('.containerID').text(),"total");
			alert("Teste3: "+retorno.Compra);
			
		}else{
			  alert("Problemas con a criacao da DIV!!");
             $(document).off('mouseover mouseout');
		}
	});
}

$(".infoDir").children( ".botao").click(function() {
    if ($(this).text() == "total" || $(this).text() =="promedio"){
		alert("Existe");
		_chamadaBotao(text); 
	}else
		alert("NoExiste");
});

function _chamadaBotao(_recebo) {
	
	

	if (document.contains(document.getElementById("viz"))) {

		$("#boxEsq p span").empty();
	  //grafica($('.containerID').text(),text,_recebo);

	}else{
		 alert("Problemas con a DIV grafica!!");
	}
};

var url = 'https://comunello.github.io/infoVis/TPfinal/dadosTabela.tsv';
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

function grafica3(_id,_type) {

  var filterId2 ;
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
				 


		//console.log(filterId2);
		var _Compra 	=  d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Compra");}), 
							function(d) {return d.Value; });
		var _Venda 		=  d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Venda");}), 
							function(d) {return d.Value; });
		var _PosVenda 	=  d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("PosVenda");}), 
							function(d) {return d.Value; });

		alert("Teste1: "+_Compra + " " + _Venda + " " + _PosVenda);

       //   var visualization = d3plus.viz()
		//						.container("#viz")  // container DIV to hold the visualization
			//					.data(filterId2)  // data to use with the visualization
				//				.type("line")       // visualization type
                  //              .id(["Descrip"])
					//			.y("Value")         // key to use for y-axis
						//		.x("date")          // key to use for x-axis
							//	.draw();  
     
		return {
        type: _type,
        compra: _Compra,
        venda: _Venda,
		posVenda:_PosVenda
    };
   
	});	
}
//grafica3(1,"total");
