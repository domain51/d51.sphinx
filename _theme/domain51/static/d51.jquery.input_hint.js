(function($) {
    $.fn.input_hint = function() {
        $(this).each(function() {
            var input = $(this); 
            var is_password = this.type === 'password';
            var real_input = null;
            if(is_password) {
                var real_input = $(this);
                var input_container = $('<span class="password-container" style="position:relative;"></span>');
                real_input.after(input_container);
                input = $('<input title="'+real_input.attr('title')+'" type="text" class="'+real_input.attr('class')+' hint" value="'+real_input.attr('title')+'" />');
                real_input.appendTo(input_container);
                real_input.css({
                    'display':'none',
                });
                input.appendTo(input_container);
                real_input.blur(function() {
                    if (this.value != '') {
                        return true;
                    }
                    input.addClass('hint');
                    input.attr('value', real_input.attr('title'));
                    input.show();
                    $(this).hide();
                });
            }

            var hasDefaultValue = function() {
                return input.val() == input.attr('title');
            }
            input.focus(function() {
                if (hasDefaultValue() == false) {
                    return true;
                }
                this.value = '';
                if(is_password) {
                    $(this).css('display', 'none');
                    real_input.css('display', 'inline');
                    real_input.focus();
                }
                $(this).removeClass("hint");
            });
            input.blur(function() {
                if (this.value != '' && !hasDefaultValue()) {
                    return true;
                }
                $(this).addClass("hint");
                this.value = this.title;
            }).blur();
            input.parents("form").submit(function(eventObj) {
                if (hasDefaultValue()) {
                    eventObj.stopPropagation();
                }
            });
        });
    };
})(jQuery);

