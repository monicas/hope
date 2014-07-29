( function( $, undefined ) {
    var counter = 0;
    $( document ).bind( "pagecreate", function( e ) {
        $( "#prepend, #append", e.target ).on( "click", function( e ) {
            counter++;
            var widgetType = $( "[name='radio-widget']:checked" ).attr( "id" ),
                group = $( "#my-controlgroup" ),
                $el,
                action = function() {
                    var action = $( "[name='radio-action']:checked" ).attr( "id" );
                    if ( $( $el[1] ).is( "select" ) && action === "hide" ) {
                        $el = $( $el[1] ).parents( ".ui-select" );
                    }
                    $el[ action ]();
                    group.controlgroup( "refresh" );
                };
            if ( widgetType === "link" ) {
                $el = $( "<a href='#'>Link " + counter + "</a>" ).bind( "click", action );
                $( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
                $el.buttonMarkup();
            } else if ( widgetType === "select" ) {
                $el = $( "<label for='widget" + counter + "'>Select " + counter + "</label><select id='widget" + counter + "'><option value='option1'>Select " + counter + "</option><option value='option2'>Select option</option></select>" );
                $( $el[ 1 ] ).bind( "change", action);
                $( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
                $( $el[ 1 ] ).selectmenu();
            } else {
                $el = $( "<label for='widget" + counter + "'>Checkbox " + counter + "</label><input type='checkbox' id='widget" + counter + "'></input>" );
                $( $el[ 1 ] ).bind( "change", action );
                $( "#my-controlgroup" ).controlgroup( "container" )[ $( this ).attr( "id" ) ]( $el );
                $( $el[ 1 ] ).checkboxradio();
            }
            group.controlgroup( "refresh" );
        });
        $( "[name='radio-orientation']" ).bind( "change", function( e ) {
            $( "#my-controlgroup" ).controlgroup( "option", "type", ( $( "#isHorizontal" ).is( ":checked" ) ? "horizontal" : "vertical" ) );
        });
    });
})( jQuery );