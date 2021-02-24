;( function( $, window, document, undefined )
{
    'use strict';
    

    var s = document.body || document.documentElement, s = s.style;
    if( s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '' ) return true;
 
    var $list       = $( '.news-list--home' ),
        $items      = $list.find( 'article' ),
        setHeights  = function()
        {
            $items.css( 'height', 'auto' );
 
            var perRow = Math.floor( $list.width() / $items.width() );
            if( perRow == null || perRow < 2 ) return true;
 
            for( var i = 0, j = $items.length; i < j; i += perRow )
            {
                var maxHeight   = 0,
                    $row        = $items.slice( i, i + perRow );
 
                $row.each( function()
                {
                    var itemHeight = parseInt( $( this ).outerHeight() );
                    if ( itemHeight > maxHeight ) maxHeight = itemHeight;
                });
                $row.css( 'height', maxHeight );
            }
        };
 
    setHeights();
    $( window ).on( 'resize', setHeights );
    $list.find( 'img' ).on( 'load', setHeights );
 



     var $list       = $( '.info-box' ),
        $items      = $list.find( '> div' ),
        setHeights  = function()
        {
            $items.css( 'height', 'auto' );
 
            var perRow = Math.floor( $list.width() / $items.width() );
            if( perRow == null || perRow < 2 ) return true;
 
            for( var i = 0, j = $items.length; i < j; i += perRow )
            {
                var maxHeight   = 0,
                    $row        = $items.slice( i, i + perRow );
 
                $row.each( function()
                {
                    var itemHeight = parseInt( $( this ).outerHeight() );
                    if ( itemHeight > maxHeight ) maxHeight = itemHeight;
                });
                $row.css( 'height', maxHeight );
            }
        };
 
    setHeights();
    $( window ).on( 'resize', setHeights );
    $list.find( 'img' ).on( 'load', setHeights );




     var $list       = $( '.resources-list__group' ),
        $items      = $list.find( 'article' ),
        setHeights  = function()
        {
            $items.css( 'height', 'auto' );
 
            var perRow = Math.floor( $list.width() / $items.width() );
            if( perRow == null || perRow < 2 ) return true;
 
            for( var i = 0, j = $items.length; i < j; i += perRow )
            {
                var maxHeight   = 0,
                    $row        = $items.slice( i, i + perRow );
 
                $row.each( function()
                {
                    var itemHeight = parseInt( $( this ).outerHeight() );
                    if ( itemHeight > maxHeight ) maxHeight = itemHeight;
                });
                $row.css( 'height', maxHeight );
            }
        };
 
    setHeights();
    $( window ).on( 'resize', setHeights );
    $list.find( 'img' ).on( 'load', setHeights );
})( jQuery, window, document );