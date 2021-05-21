// ==UserScript==
// @name         Pipermail: Expand threaded view inline
// @namespace    https://github.com/azizLIGHT/Pipermail-Expand-threaded-view-inline
// @version      0.3.3
// @description  read, expand and collapse mailing list posts inline in a single page without unnecessary browser navigation.
// @author       Mark Jansen
// @author       azizLIGHT <github@azizlight.net> (github.com/azizLIGHT)
// @match        https://www.reactos.org/pipermail/ros-dev/*/thread.html
// @match        https://lists.zx2c4.com/pipermail/wireguard/*/thread.html
// @match        https://lists.wikimedia.org/pipermail/wikipedia-l/*/thread.html
// @match        https://lists.gnupg.org/pipermail/gnupg-users/*/thread.html
// @match        http://lists.thunderbird.net/pipermail/maildev_lists.thunderbird.net/*/thread.html
// @match        https://lists.freebsd.org/pipermail/*/*/thread.html
// @match        https://mail.haskell.org/pipermail/*/*/thread.html
// @match        https://mail.python.org/pipermail/*/*/thread.html
// @match        https://lists.linuxfoundation.org/pipermail/*/*/thread.html
// @match        https://lists.manjaro.org/pipermail/*/*/thread.html
// @match        https://lists.archlinux.org/pipermail/*/*/thread.html
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
