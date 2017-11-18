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

var retorno = function(a,b,c,d) {
    return {
		styl: a,
        compra: b,
        venda: c,
		posVenda:d
    };
};

function _chamada() {
    $(document).on('mouseover mouseout', '.boxGraf', function(){
		var $div = $("<div>", {id: "viz"}); 
		$(".boxGraf").append($div);

		$(".infoDir").attr("id","infoDir");
		var codes;
		
     	if (document.contains(document.getElementById("viz"))) {
            $(document).off('mouseover mouseout');
				
			 retornoGraf = grafica3($('.containerID').text(),"total");
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
		$(".boxEsq p span").empty();
		grafica3($('.containerID').text(),_recebo);
	}else
		alert("Problemas con a DIV grafica!!");
};

function _fdp(code){
	$(".textCont:eq(0)").children( ".visualText:eq(0)").children( "span").text(code.styl);
	$(".textCont:eq(0)").children( ".visualText:eq(1)").children( "span").text(code.compra);
	$(".textCont:eq(1)").children( ".visualText:eq(0)").children( "span").text(code.styl);
	$(".textCont:eq(1)").children( ".visualText:eq(1)").children( "span").text(code.venda);
	$(".textCont:eq(2)").children( ".visualText:eq(0)").children( "span").text(code.styl);
	$(".textCont:eq(2)").children( ".visualText:eq(1)").children( "span").text(code.posVenda);
}

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

		var codes = retorno(_type,_Compra,_Venda,_PosVenda);
		
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
