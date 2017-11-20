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
			 
			 $("#infoDir").children( ".botao").click(function() {
				if ($(this).text() == "total" || $(this).text() =="promedio"){
					$( "#viz" ).remove();
					var $div = $("<div>", {id: "viz"}); 
					$(".boxGraf").append($div);
					_chamadaBotao($(this).text()); 
				}else
					alert("NoExiste");
			});
			 
		}else{
			  alert("Problemas con a criacao da DIV!!");
             $(document).off('mouseover mouseout');
		}
	});
}

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