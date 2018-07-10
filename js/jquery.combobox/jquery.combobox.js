// Transform a textbox into a combobox, so users can enter text or select offered text.
//--------------Script-------------
// jQuery('.combo').combobox(['option1', 'option2', 'option3'], {imageUrl : '/images/dropdown.gif'});

;(function($,window, document, undefined) {
    //these variables are placed here so that they are shared between different times of setting up comboboxes

    //keyCode data from http://unixpapa.com/js/key.html
    var keys = { up: 38, down: 40, enter: 13, tab: 9, esc: 27 };
    var hideTimer;
    var showing = false;
    var suggestionsKey = 'combobox_suggestions';
    var optionsContainer;

    /**
     * $('.combo').combobox(['china', 'japan', 'usa', 'russia']);
     *
     * */

    $.fn.combobox = function(suggestions, config) {

        config = $.extend({}, config);

        if(arguments.length != 2){
            throw new Error("参数个数不正确");
        }

        if(!$.isArray(suggestions)){
            throw new Error("参数格式不正确");
        }


        if(!optionsContainer) {
					optionsContainer = $('<ul id="comboboxDropdown" />').appendTo($('body'));
		    //if there is jquery.bgiframe plugin, use it to fix ie6 select/z-index bug.
		    //search "z-index ie6 select bug" for more infomation
            //下面这一行是解决IE6的情况下的问题，没用到IE6可以忽略
		    if ($.fn.bgiframe)
		        optionsContainer.bgiframe();
		}

        return  $(this).each(function(i) {
                    var $$ = this;
                    var textBox = $($$);

                    var oldSuggestions = $.data($$, suggestionsKey);
                    $.data($$, suggestionsKey, suggestions);    //设置缓存 将下拉框的值存入到对应的插件调用者身上

                    //这里oldSuggestions就是获取到的缓存，第一次肯定是没有的，所以必须执行下面的几行，第二次有，就不执行了。这样能提升性能
                    if (oldSuggestions)
                        return ;

                    //turn off browser auto complete feature for textbox
                    //keydown to process Up,Down,Enter,Tab,Esc
                    //keyup to see if text changed
                    //textBox.attr('autocomplete', 'off').focus(function() { show(''); }).blur(blur).keydown(keydown).keyup(keyup);
                    textBox.attr('autocomplete','off')
                        .focus(function(){
                            show(''); //选中后触发展示
                        })
                        .blur(function(){
                            blur();
                        })
                        .keydown(function(){
                            keydown();
                        })
                        .keyup(function(){
                            keyup();
                        });

                    var container = textBox.wrap('<div class="combobox" />').parent();

                    var additionalHeight = $.browser.msie ? 5 : 3;




                    //keep the original value of textbox so we can recove it if use presses esc
                    var oriValue;
                    function show(filter) {
                        if (hideTimer) {
                            window.clearTimeout(hideTimer);
                            hideTimer = 0;
                        }
                        oriValue = textBox.val();
                        hide();

                        //generate the options (li inside ul)
                        var html = '';
                        var suggestions = $.data($$, suggestionsKey);
                        console.log($.isArray(suggestions));

                        //suggestions可能是字符串数组或者对象数组，这两个要进行区分
                        if($.isArray(suggestions)){
                            for (var k in suggestions) {
                                var v = suggestions[k];
                                if(v instanceof Object){
                                    if ((!filter) || (filter && v.toLowerCase().indexOf(filter.toLowerCase()) >= 0)) {
                                        html += "<li data-obj = '" + JSON.stringify(v) + "'>" + v[config.InpshowId] + "</li>"
                                    }
                                }
                                else{
                                    if ((!filter) || (filter && v.toLowerCase().indexOf(filter.toLowerCase()) >= 0)) {
                                        html += '<li data-obj = "' + v + '">' + v + '</li>';
                                    }
                                }
                            }
                        }


                        //position and size of the options UI
                        var loc = { left: textBox.offset().left, top: textBox.offset().top + textBox.height() + 3, width: textBox.width()};


                        //设置滚动条
                        /*
                            if(suggestions.length > 2){
                                loc = $.extend(loc , {
                                    height:'100px',
                                    overflow:'auto'
                                });
                            }
                        */

                        optionsContainer.html(html).css(loc);

                        //decide which option is currently selected
                        selIndex = 0;
                        var found = false;
                        var options = optionsContainer.children('li').each(function(i) {
                            if (found) return;
                            if ($(this).text().toLowerCase() == oriValue.toLowerCase()) {
                                $(this).addClass('selected');
                                selIndex = i;
                                found = true;
                            }
                        });
                        //if there is no items matched, hide the empty select list, so user can show options with down key
                        if (!options.size()) {
                            hide();
                            return;
                        }
                        if (!found)
                            options.eq(0).addClass('selected');

                        //mouse hover to change the highlight option, clicking to select it
                        options.click(function() {
                            textBox.val($(this).text());
                            if(config.callback && typeof config.callback == 'function'){
                                var value = "";
                                try{
                                    value = JSON.parse($(this).attr('data-obj'));
                                }catch(e){
                                    value = $(this).attr('data-obj');
                                }
                                config.callback(value);
                            }

                            hide();
                        }).hover(function() {
                            options.each(function() {
                                $(this).removeClass('selected');
                            });
                            $(this).addClass('selected');
                            selIndex = options.index(this);
                        });

                        if (!filter)
                        //showing all the options
                            optionsContainer.slideDown();
                        else
                        //showing filtered options, happens when textbox.value changed, should not flick
                            optionsContainer.show();
                        showing = true;
                    }

                    var selIndex;
                    function keydown(evt) {
                        switch (evt.keyCode) {
                            case keys.esc:
                                hide();
                                textBox.val(oriValue);
                                //fixes esc twice clears the textbox value bug in ie
                                evt.preventDefault();
                                return;
                            case keys.enter:
                                choose();
                                //don't submit the form
                                evt.preventDefault();
                                return;
                            case keys.tab:
                                choose();
                                return;
                            case keys.up:
                                goup();
                                return;
                            case keys.down:
                                godown();
                                return;
                        }
                    }

                    var oldVal = '';
                    function keyup(evt) {
                        var v = $(this).val();
                        if (v != oldVal) {
                            show(oldVal = v);
                        }
                    }

                    function godown() {
                        if (showing) {
                            var options = optionsContainer.children('li');
                            var n = options.size();
                            if (!n)
                                return;
                            selIndex++;

                            if (selIndex > n - 1)
                                selIndex = 0;

                            var v = options.eq(selIndex);
                            if (v.size()) {
                                options.each(function() { $(this).removeClass('selected') });
                                v.addClass('selected');
                            }
                        } else {
                            show('');
                        }
                    }

                    function goup() {
                        if (showing) {
                            var options = optionsContainer.children('li');
                            var n = options.size();
                            if (!n)
                                return;
                            selIndex--;

                            if (selIndex < 0)
                                selIndex = n - 1;

                            var v = options.eq(selIndex);
                            if (v.size()) {
                                options.each(function() { $(this).removeClass('selected') });
                                v.addClass('selected');
                            }
                        } else {
                            show('');
                        }
                    }

                    function choose() {
                        if (showing) {
                            var v = $('li', optionsContainer).eq(selIndex);
                            if (v.size()) {
                                textBox.val(v.text());
                                oldVal = v.text();
                                hide();
                            }
                        }
                    }

                    function hide() {
                        if (showing) {
                            optionsContainer.hide().children('li').each(function() { $(this).remove(); });
                            showing = false;
                        }
                    }

                    function blur() {
                        //if there's no setTimeout, when clicking option li,
                        //textBox.blur comes first, so hide is called, and the ul.select is removed
                        //so li.click won't fire
                        if (!hideTimer) {
                            hideTimer = window.setTimeout(hide, 300);
                        }
                    }

                });

    };
})(jQuery, window, document);
