$( document ).ready( function() {

	var
		settings = {
			patterns : {
				alpha: /[a-zA-Z]+/,
		        alpha_numeric: /[a-zA-Z0-9]+/,
		        integer: /^\d+$/,
		        number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,
		        password: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
		        mail: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
			},
			message : {
				ok: {
					default: " Mensaje default OK",
					integer: " Mensaje OK INTEGER",
					decimal: " Mensaje OK DECIMAL",
					mail: " Mensaje OK MAIL"
				},
				error: {
					default: " Mensaje default ERR",
					integer: " Mensaje ERR INTEGER",
					decimal: " Mensaje ERR DECIMAL",
					mail: " Mensaje ERR MAIL"	
				}
			},
			icons : {
				ok: "<i class='glyphicon glyphicon-ok'></i> ",
				err: "<i class='glyphicon glyphicon-remove'></i> "
			},
			enums : {
				integer: 0,
				decima: 1,
				mail: 2
			}
		},

		// Objetos del DOM
		$hiddenBlock = $(".mtr-js-hidden-block"),
		$validateInteger = $(".mtr-js-valid-integer"),		

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
		validate = function ( value, $successBlock, $dangerBlock, regexp, msgOk, msgError ) {

			// Div que contiene a todos los elementos en proceso de evaluacion
			var $grandpa = $successBlock.
								parent().
								parent().
								removeClass("has-success").
								removeClass("has-error");

			// Limpia los bloques de ayuda
			$successBlock.hide();
			$dangerBlock.hide();

			// Validacion del input.val contra expresion regular
			if ( regexp.exec( value ) !== null ) {
				// Muestra help block
				$grandpa.addClass("has-success");	
			 	$successBlock.html( settings.icons.ok + msgOk );
			 	$successBlock.show();
			 }
			 else {	
			 	// Muestra help block
			 	$grandpa.addClass("has-error");
			 	$dangerBlock.html( settings.icons.err + msgError );
			 	$dangerBlock.show();
			 }
		},

		// ************************************************************************
		// Funcion.
		// Limpia los estilos y oculta los bloques de ayuda
		//
		// Parametros.
		// $grandpa: El div que contiene todos los elementos del groupform que se esta validando
		// $successBlock: El objeto (parrafo) de mensaje de exito.
		// $dangerBlock: EL objeto (parrafo) de mensaje de error.
		clear = function ( $grandpa, $successBlock, $dangerBlock ) {
			$grandpa.removeClass("has-success").removeClass("has-error");
			$successBlock.hide();
			$dangerBlock.hide();
		},

		// ************************************************************************
		// Funcion.
		// Si el objeto contiene el atributo buscado entonces devuelve el 
		// 	mensaje personalizado para el tipo de campo del que se trata.
		// De lo contrario devuelve el mensaje ok default.
		//
		// Parametros.
		// $obj: El objeto (parrafo) de mensaje de exito.
		// attr: El atributo que puede o no estar definido en el $obj.
		// type: El tipo de campo que se esta validando... revisar enums.
		//
		// Regreso.
		// Devuelve el mensaje obtenido.
		getMessageOk = function ( $obj, attr, type ) {
			var x = $obj.attr( attr );
			if ( typeof x === 'undefined' || x === false ) {
				return settings.message.ok.default;
			}
			else {
				switch(type) {
					case settings.enums.integer:
						return settings.message.ok.integer;
					case settings.enums.decimal:
						return settings.message.ok.decimal;
					case settings.enums.mail:
						return settings.message.ok.mail;
				}
			}
		},

		// ************************************************************************
		// Funcion.
		// Si el objeto contiene el atributo buscado entonces devuelve el 
		// 	mensaje personalizado para el tipo de campo del que se trata.
		// De lo contrario devuelve el mensaje error default.
		//
		// Parametros.
		// $obj: El objeto (parrafo) de mensaje de error.
		// attr: El atributo que puede o no estar definido en el $obj.
		// type: El tipo de campo que se esta validando... revisar enums.
		//
		// Regreso.
		// Devuelve el mensaje obtenido.
		getMessageError = function ( $obj, attr, type ) {
			var x = $obj.attr( attr );
			if ( typeof x === 'undefined' || x === false ) {
				return settings.message.error.default;
			}
			else {
				switch(type) {
					case settings.enums.integer:
						return settings.message.error.integer;
					case settings.enums.decimal:
						return settings.message.error.decimal;
					case settings.enums.mail:
						return settings.message.error.mail;
				}
			}
		},

		finVar = '';

	// ************************************************************************
	// Listener de campo de tipo integer
	$validateInteger.on( 'keyup', function( event ) {
		var
			$this = $(this),
			$successBlock = $this.parent().find( ".text-success" ),
			$dangerBlock = $this.parent().find( ".text-danger" );

		if ( $this.val() === "" ){
			clear( $successBlock.parent().parent(), $successBlock, $dangerBlock );			
		}
		else{
			validate( 
			 	$this.val(), 
			 	$successBlock, 
			 	$dangerBlock,
			 	settings.patterns.integer,
			 	getMessageOk( $successBlock, "mtr-integer-msg", settings.enums.integer ),
			 	getMessageError( $dangerBlock, "mtr-integer-msg", settings.enums.integer ) 
			 );			
		}
	});

	// ************************************************************************
	// Oculta todos los elementos al terminar de cargar la pagina
	$hiddenBlock.hide();
});