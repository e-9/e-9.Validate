$( document ).ready( function() {

	var
		settings = {
			patterns : {
				alpha: /[a-zA-Z]+/,
		        alpha_numeric : /[a-zA-Z0-9]+/,
		        integer: /^\d+$/,
		        number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,
		        password : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
		        email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
			},
			message : {
				ok: " Mensaje default OK",
				err: " Mensaje default ERROR"
			}
		},

		$hiddenBlock = $(".mtr-js-hidden-block"),

		$validateInteger = $(".mtr-js-valid-integer"),

		fin = '';

	// ************************************************************************
	// Funcion.
	// Si la validacion contra la expresion regular es true entonces
	// 	muestra el parrafo de exito en el formulario.
	// De lo contrario muestra el parrafo de error en el formulario.
	//
	// Parametros.
	// value: El valor original que se evaluara.
	// $successBlock: El objeto (parrafo) de mensaje de exito.
	// $dangerBlock: EL objeto (parrafo) de mensaje de error.
	// regexp: La expresiono regular contra la que se hara la validacion.
	var validate = function ( value, $successBlock, $dangerBlock, regexp) {

		// Limpia los bloques de ayuda
		$successBlock.hide();
		$dangerBlock.hide();

		// Validacion del input.val contra expresion regular
		if ( regexp.exec(value) !== null ) {

			// Encuentra mensajes custom

			// Muestra help block
		 	$successBlock.html(
		 		"<i class='glyphicon glyphicon-ok'></i>" + 
		 		settings.message.ok);
		 	$successBlock.show();
		 }
		 else {

		 	// Encuentra mensajes custom

			// Muestra help block			
		 	$dangerBlock.html(
		 		"<i class='glyphicon glyphicon-remove'></i>" + 
		 		settings.message.err);
		 	$dangerBlock.show();
		 }
	}

	// ************************************************************************
	// Oculta todos los elementos al terminar de cargar la pagina
	$hiddenBlock.hide();

	// ************************************************************************
	// Validacion de campo te tipo integer
	$validateInteger.on( 'keyup', function( event ) {
		var
			$this = $(this),
			$successBlock = $this.parent().find(".text-success"),
			$dangerBlock = $this.parent().find(".text-danger");

		 validate( 
		 	$this.val(), 
		 	$successBlock, 
		 	$dangerBlock,
		 	settings.patterns.integer );			
	});


});