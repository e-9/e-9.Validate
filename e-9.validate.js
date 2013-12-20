$( document ).ready( function() {

	var
		settings = {
			patterns : {
				alpha: /[a-zA-Z]+/,
		        alpha_numeric: /[a-zA-Z0-9]+/,
		        integer: /^-?\d+$/,
		        decimal: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
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
			icon : {
				ok: "<i class='glyphicon glyphicon-ok'></i> ",
				err: "<i class='glyphicon glyphicon-remove'></i> "
			},
			class : {
				has_success: "has-success",
				has_error: "has-error",
				success_block: ".text-success",
				danger_block: ".text-danger"
			},
			attribute : {
				integer_msg: "mtr-msg-integer",
				decimal_msg: "mtr-msg-decimal",
				mail_msg: "mtr-msg-mail"
			},
			enums : {
				integer: 0,
				decimal: 1,
				mail: 2
			},
			trigger : 'keyup'
		},

		// Objetos del DOM
		$hiddenBlock = $(".mtr-js-hidden-block"),
		$validateInteger = $(".mtr-js-valid-integer"),
		$validateDecimal = $(".mtr-js-valid-decimal"),
		$validateMail = $(".mtr-js-valid-email"),

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

			// Limpia los estilos y oculta los bloques de ayuda
			var $grandpa = $successBlock.parent().parent();
			clear( $grandpa, $successBlock, $dangerBlock );

			// Validacion del input.val contra expresion regular
			if ( regexp.exec( value ) !== null ) {
				// Muestra help block
				$grandpa.addClass( settings.class.has_success );	
			 	$successBlock.html( settings.icon.ok + msgOk );
			 	$successBlock.show();
			 }
			 else {	
			 	// Muestra help block
			 	$grandpa.addClass( settings.class.has_error );
			 	$dangerBlock.html( settings.icon.err + msgError );
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
			$grandpa.removeClass( settings.class.has_success ).removeClass( settings.class.has_error );
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
	$validateInteger.on( settings.trigger, function( event ) {
		var
			$this = $(this),
			$successBlock = $this.parent().find( settings.class.success_block ),
			$dangerBlock = $this.parent().find( settings.class.danger_block );

		if ( $this.val() === "" ) {
			clear( $successBlock.parent().parent(), $successBlock, $dangerBlock );			
		}
		else {
			validate( 
			 	$this.val(), 
			 	$successBlock, 
			 	$dangerBlock,
			 	settings.patterns.integer,
			 	getMessageOk( $successBlock, settings.attribute.integer_msg, settings.enums.integer ),
			 	getMessageError( $dangerBlock, settings.attribute.integer_msg, settings.enums.integer ) 
			 );			
		}
	});

	// ************************************************************************
	// Listener de campo de tipo decimal
	$validateDecimal.on( settings.trigger, function( event ) {
		var
			$this = $(this),
			$successBlock = $this.parent().find( settings.class.success_block ),
			$dangerBlock = $this.parent().find( settings.class.danger_block );

		if ( $this.val() === "" ) {
			clear( $successBlock.parent().parent(), $successBlock, $dangerBlock );			
		}
		else {
			validate( 
			 	$this.val(), 
			 	$successBlock, 
			 	$dangerBlock,
			 	settings.patterns.decimal,
			 	getMessageOk( $successBlock, settings.attribute.decimal_msg, settings.enums.decimal ),
			 	getMessageError( $dangerBlock, settings.attribute.decimal_msg, settings.enums.decimal ) 
			 );
		}
	});

	// ************************************************************************
	// Listener de campo de tipo decimal
	$validateMail.on( settings.trigger, function( event ) {
		var
			$this = $(this),
			$successBlock = $this.parent().find( settings.class.success_block ),
			$dangerBlock = $this.parent().find( settings.class.danger_block );

		if ( $this.val() === "" ) {
			clear( $successBlock.parent().parent(), $successBlock, $dangerBlock );			
		}
		else {
			validate( 
			 	$this.val(), 
			 	$successBlock, 
			 	$dangerBlock,
			 	settings.patterns.mail,
			 	getMessageOk( $successBlock, settings.attribute.mail_msg, settings.enums.mail ),
			 	getMessageError( $dangerBlock, settings.attribute.mail_msg, settings.enums.mail ) 
			 );
		}
	});

	// ************************************************************************
	// Oculta todos los elementos al terminar de cargar la pagina
	$hiddenBlock.hide();
});