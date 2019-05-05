// ==UserScript==
// @name         ros-dev Expand threaded view inline
// @namespace    https://www.reactos.org/pipermail/ros-dev/
// @version      0.3
// @description  try to take over the world!
// @author       Mark Jansen
// @match        https://www.reactos.org/pipermail/ros-dev/*/thread.html
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

$('li a').each(function() {
    var href = $(this).attr('href');
    var ohref = this.href;
    if (typeof href !== typeof undefined && ohref != href && ohref.indexOf('#') < 0) {
        var span = $('<span>[+]&nbsp;</span>').insertBefore($(this));
        
        var href = this.href; // Full href (for loading)
        var id = $(this).attr('href').replace(/\.[^/.]+$/, "");  // partial href (to use as id)

        var parent = $(this).parent();
        var oth = parent.children('ul');
        var loading = $('<div class="' + id + '" style="display: none;">Loading...</div>');
        if (oth.length > 0) {
            loading.insertBefore(oth.first());
        } else {
            loading.appendTo(parent);
        }
        span.addClass(id).css('font-family', 'Courier, monospace').css('cursor', 'pointer');
        
        span.on('click', {id:id, href:href}, function(e){
            var id = e.data.id;
            var href = e.data.href;
            $('div.' + id).toggle().load(href + ' pre');
            $('span.' + e.data.id).text('[-] ');
            
            $(this).off('click').on('click', {id:id}, function(e){
                elem = $('div.' + e.data.id);
                $('span.' + e.data.id).text(elem.is(":visible") ? '[+] ' : '[-] ');
                elem.toggle();
            });
        });
    }
});
