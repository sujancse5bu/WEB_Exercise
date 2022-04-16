$(function() {
    var $link = $('#header .container .row nav ul li a');
    $link.on('click', function(e) {
        e.preventDefault();
        var url = this.href;
        $('a.current').removeClass('current');
        alert($('a.current'));
        /*$(this).addClass('current');

        $('#main .container .row').remove();
        $('#main .container').load(url + '.row').hide().fadeIn('slow');*/
    });
});