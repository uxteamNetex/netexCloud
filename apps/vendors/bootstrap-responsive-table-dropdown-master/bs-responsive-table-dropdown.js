/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable strict */
/**
 * Bootstrap Responsive Table Dropdown Plugin
 *
 * Currently if you attempt to use the bootstrap dropdown
 * plugin within a table wrapped in the .table-responsive
 * class the dropdown menu will be 'cut-off' (a portion of
 * the menu will be hidden).
 *
 * This plugin fixes this problem using fixed positioning
 * rather than absolute positioning for the elements that
 * need rescuing.
 *
 * @author Jake Wilkinson <jake.wilkinson@backslash.co.nz>
 * @version 1.0.0
 * @license MIT
 */
// eslint-disable-next-line strict
(function ($, window, document) {
    $(document).on('ready', function() {
        var $window = $(window);

        $(document).delegate('.table-responsive [data-toggle=dropdown]', 'click', function() {
            var $this = $(this),
            $group = $this.parent(),
            $menu = $this.next('.dropdown-menu-responsive');

            var offset = $group.offset();

            // Apply the css we want, this will change every time we scroll/resize the screen
            //so we need to calculate this value dynamically.
            $menu.css({
                'top': offset.top - $window.scrollTop() + $group.height(),
                'left': offset.left - $menu.width() + $group.width(),
                'position': 'fixed'
            });

            // We want to hide all of the dropdown menu's when we resize the screen or when we scroll.
            // we apply this behaviour to all of the dropdown menu's on the page, not just the ones
            // we are fixing - for consistency.
            function hideDropdown() {
                var $elem = $('.table-responsive .open > [data-toggle=dropdown]'),
                    $group = $elem.parent(),
                    $menu = $group.find('.dropdown-menu-responsive');

                $group.removeClass('open');
                $menu.prop('aria-expanded', false);
                $elem.blur();
            }
            $(window).scroll(function() {
                hideDropdown();
            });
            $(window).resize(function() {
                hideDropdown();
            });
        });

    });
}(jQuery, window, document));