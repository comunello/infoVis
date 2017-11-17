function _chamada() {
    $(document).on('mouseover mouseout', '.boxGraf', function(){
		var $div = $("<div>", {id: "viz"}); 
		$(".boxGraf").append($div);
		
		
		
		//$(".infoDir").children( ".botao:eq(0)").attr({id: "botao0"});
		//$(".infoDir").children( ".botao:eq(1)").attr({id: "botao1"});
		//$(".infoDir").children( ".botao:eq(2)").attr({id: "botao2"});
		
		var retorno = {type:"",Compra:0,Venda:0,PosVenda:0};
		
     	if (document.contains(document.getElementById("viz"))) {
            $(document).off('mouseover mouseout');
			
			$(".boxEsq").attr({id: "boxEsq"});
				
			$(".boxEsq").children(".textCont:eq(0)").append($("<p>", {id: "CompraT"}));
			$(".boxEsq").children( ".textCont:eq(0)" ).append($("<p>", {id: "CompraV"}));
			$(".textCont:eq(0)").children( "#CompraV" ).append($("<span>", {id: "Compra",class: "valores"}));
			
			$(".boxEsq").children(".textCont:eq(1)").append($("<p>", {id: "VendaT"}));
			$(".boxEsq").children( ".textCont:eq(1)" ).append($("<p>", {id: "VendaV"}));
			$(".textCont:eq(0)").children( "#CompraV" ).append($("<span>", {id: "Venda",class: "valores"}));
			
			$(".boxEsq").children(".textCont:eq(3)").append($("<p>", {id: "VendaT"}));
			$(".boxEsq").children( ".textCont:eq(3)" ).append($("<p>", {id: "VendaV"}));
			$(".textCont:eq(0)").children( "#CompraV" ).append($("<span>", {id: "VendaPos",class: "valores"}));
			
            grafica3($('.containerID').text(),"total");
			
			
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
	var retorno = {type:"",Compra:0,Venda:0,PosVenda:0};

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

		if(_type=="total"){
			 retorno = {type:"total",Compra:d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Compra");}), 
								function(d) {return d.Value; });,
								Venda:d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Venda");}), 
								function(d) {return d.Value; });
								,PosVenda:d3.sum(filterId2.filter(function(d) { return d.Descrip ==_type.concat("PosVenda");}), 
								function(d) {return d.Value; });};
			sum.PosVenda =
		}else if (_type=="promedio"){
			mean.Compra =  d3.mean(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Compra");}), 
								function(d) {return d.Value; });
			mean.Venda = d3.mean(filterId2.filter(function(d) { return d.Descrip ==_type.concat("Venda");}), 
								function(d) {return d.Value; });
			mean.PosVenda =d3.mean(filterId2.filter(function(d) { return d.Descrip ==_type.concat("PosVenda");}), 
								function(d) {return d.Value; });
		}else
			alert("type incorreto: "+_type);

console.log(filterId2);
          var visualization = d3plus.viz()
								.container("#viz2")  // container DIV to hold the visualization
								.data(filterId2)  // data to use with the visualization
								.type("line")       // visualization type
                                .id(["Descrip"])
								.y("Value")         // key to use for y-axis
								.x("date")          // key to use for x-axis
								.draw();  
     

   
	});	
}
grafica3(1,"total");