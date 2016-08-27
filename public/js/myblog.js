$(function() {
    $('.publish').on('click', function() {
        $('.publish-blog').show();
        $('.noPublish').on('click', function() {
            $('.publish-blog').hide();
        })
    });
    $('.inputhidden').each(function(index, element) {
        var title = $(this).parent().siblings('.myblog-title').text();

        $(this).val(title);
    });
});