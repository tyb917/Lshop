var swatchOptionVisualDefaultInputType = 'radio',
    swatchVisualOption = {
        table: $('swatch-visual-options-table'),
        itemCount: 0,
        totalItems: 0,
        rendered: 0,
        isReadOnly: config.isReadOnly,
        template: html('#swatch-visual-row-template'),

        /**
         * Add new option using template
         *
         * @param {Object} data
         * @param {Object} render
         */
        add: function (data, render) {
            var isNewOption = false,
                element;
            if (typeof data.id == 'undefined') {
                data = {
                    'id': 'option_' + this.itemCount,
                    'sort_order': this.itemCount + 1,
                    'empty_class': 'unavailable'
                };
                isNewOption = true;
            } else if (data.defaultswatch0 === '') {
                data['empty_class'] = 'unavailable';
            }

            if (!data.intype) {
                data.intype = swatchOptionVisualDefaultInputType;
            }

            if (!this.totalItems) {
                data.checked = 'checked';
            }
            element = this.template({
                data: data
            });

            if (isNewOption && !this.isReadOnly) {
                this.enableNewOptionDeleteButton(data.id);
            }
            this.itemCount++;
            this.totalItems++;
            this.elements += element;

            if (render) {
                this.render();
            }
        },

        /**
         * ColorPicker initialization process
         */
        initColorPicker: function (event) {
            var element = event,
                hiddenColorPicker = !$(element).data('colorpickerId');

            $(event).ColorPicker({

                /**
                 * ColorPicker onShow action
                 */
                onShow: function () {
                    var color = $(element).parent().parent().prev().prev('input').val(),
                        menu = $(this).parents('.swatch_sub-menu_container');

                    menu.hide();
                    $(element).ColorPickerSetColor(color);
                },

                /**
                 * ColorPicker onSubmit action
                 *
                 * @param {String} hsb
                 * @param {String} hex
                 * @param {String} rgb
                 * @param {String} el
                 */
                onSubmit: function (hsb, hex, rgb, el) {
                    var container = $(el).parent().parent().prev();

                    $(el).ColorPickerHide();
                    container.parent().removeClass('unavailable');
                    container.prev('input').val('#' + hex);
                    container.css('background', '#' + hex);
                }
            });

            if (hiddenColorPicker) {
                $(event).ColorPickerShow();
            }
        },

        /**
         * Remove action
         *
         * @param {Object} event
         */
        remove: function (event) {
            var element = $(event).parents('tr'),
                elementFlags; // !!! Button already have table parent in safari
            // Safari workaround
            element.parents().each(function (parentItem) {
                if ($(parentItem).hasClass('option-row')) {
                    element = parentItem;
                    throw $break;
                } else if ($(parentItem).hasClass('box')) {
                    throw $break;
                }
            });


            if (element) {
                elementFlags = element.find('.delete-flag');

                if (elementFlags[0]) {
                    elementFlags[0].value = 1;
                }
                element.addClass('no-display');
                element.addClass('template');
                element.hide();
                this.totalItems--;
                this.updateItemsCountField();
            }
        },

        /**
         * Update items count field
         */
        updateItemsCountField: function () {
            $('swatch-visual-option-count-check').value = this.totalItems > 0 ? '1' : '';
        },

        /**
         * Enable delete button for new option
         *
         * @param {String} id
         */
        enableNewOptionDeleteButton: function (id) {
            $('#delete_button_swatch_container_' + id + ' button').each(function (button) {
                button.enable();
                button.removeClass('disabled');
            });
        },

        /**
         * Bind remove button
         */
        bindRemoveButtons: function () {
            $(document).on('click', '#swatch-visual-options-panel .delete-option', function(){
                swatchVisualOption.remove(this);
            });
        },

        /**
         * Render options
         */
        render: function () {
            $('[data-role=swatch-visual-options-container]:eq(0)').append(this.elements);
            this.elements = '';
        },

        /**
         * Render elements with delay (performance fix)
         *
         * @param {Object} data
         * @param {Number} from
         * @param {Number} step
         * @param {Number} delay
         * @returns {Boolean}
         */
        renderWithDelay: function (data, from, step, delay) {
            var arrayLength = data.length,
                len;

            for (len = from + step; from < len && from < arrayLength; from++) {
                this.add(data[from]);
            }
            this.render();

            if (from === arrayLength) {
                this.updateItemsCountField();
                this.rendered = 1;
                $('body').trigger('processStop');

                return true;
            }
            setTimeout(this.renderWithDelay.bind(this, data, from, step, delay), delay);
        },

        /**
         * Ignore validate action
         */
        ignoreValidate: function () {
            var ignore = '.ignore-validate input, ' +
                '.ignore-validate select, ' +
                '.ignore-validate textarea';

            $.validator.setDefaults({ignore: ignore});
        }
    };

if ($('add_new_swatch_visual_option_button')) {
    $(document).on('click','#add_new_swatch_visual_option_button', function(){
        swatchVisualOption.add(swatchVisualOption, true)
    });
}

$('#swatch-visual-options-panel').on('render', function () {
    swatchVisualOption.ignoreValidate();

    if (swatchVisualOption.rendered) {
        return false;
    }
    $('body').trigger('processStart');
    swatchVisualOption.renderWithDelay(config.attributesData, 0, 100, 300);
    swatchVisualOption.bindRemoveButtons();
    $(document).on('click','#swatch-visual-options-panel .colorpicker_handler',function(){
        swatchVisualOption.initColorPicker(this)
    });
});
$('body').on('click', function (event) {
    var element = $(event.target);

    if (
        element.parents('.swatch_sub-menu_container').length === 1 ||
        element.next('div.swatch_sub-menu_container').length === 1
    ) {
        return true;
    }
    $('.swatch_sub-menu_container').hide();
});

if (config.isSortable) {

    $(function () {
        if($('[data-role=swatch-visual-options-container]').html()){
            Sortable.create($('[data-role=swatch-visual-options-container]'),{
                onUpdate: function () {
                    $('[data-role=options-container] [data-role=order]').each(function (index, element) {
                        $(element).val(index + 1);
                    });
                }
            });
        }
    });
}

window.swatchVisualOption = swatchVisualOption;
window.swatchOptionVisualDefaultInputType = swatchOptionVisualDefaultInputType;

$('#swatch-visual-options-panel', swatchVisualOption);

$(function ($) {

    var swatchComponents = {

        /**
         * div wrapper for to hide all evement
         */
        wrapper: null,

        /**
         * iframe component to perform file upload without page reload
         */
        iframe: null,

        /**
         * form component for upload image
         */
        form: null,

        /**
         * Input file component for upload image
         */
        inputFile: null,

        /**
         * Create swatch component for upload files
         *
         * @this {swatchComponents}
         * @public
         */
        create: function () {
            this.wrapper = $('<div>').css({
                display: 'none'
            }).appendTo($('body'));

            this.iframe = $('<iframe />', {
                id: 'upload_iframe',
                name: 'upload_iframe'
            }).appendTo(this.wrapper);

            this.form = $('<form />', {
                id: 'swatch_form_image_upload',
                name: 'swatch_form_image_upload',
                target: 'upload_iframe',
                method: 'post',
                enctype: 'multipart/form-data',
                class: 'ignore-validate',
                action: config.uploadActionUrl
            }).appendTo(this.wrapper);

            this.inputFile = $('<input />', {
                type: 'file',
                name: 'datafile',
                class: 'swatch_option_file'
            }).appendTo(this.form);

            $('<input />', {
                type: 'hidden',
                name: 'form_key',
                value: config.FORM_KEY
            }).appendTo(this.form);
        }
    };

    /**
     * Create swatch components
     */
    swatchComponents.create();

    /**
     * Register event for swatch input[type=file] change
     */
    swatchComponents.inputFile.change(function () {
        var container = $('#' + $(this).attr('data-called-by')).parents().eq(2).children('.swatch_window'),

            /**
             * @this {iframe}
             */
            iframeHandler = function () {
                var imageParams = $.parseJSON($(this).contents().find('body').html()),
                    fullMediaUrl = imageParams['swatch_path'] + imageParams['file_path'];

                container.prev('input').val(imageParams['file_path']);
                container.css({
                    'background-image': 'url(' + fullMediaUrl + ')',
                    'background-size': 'cover'
                });
                container.parent().removeClass('unavailable');
            };

        swatchComponents.iframe.off('load');
        swatchComponents.iframe.load(iframeHandler);
        swatchComponents.form.submit();
        $(this).val('');
    });

    /**
     * Register event for choose "upload image" option
     */
    $(document).on('click', '.btn_choose_file_upload', function () {
        swatchComponents.inputFile.attr('data-called-by', $(this).attr('id'));
        swatchComponents.inputFile.click();
    });

    /**
     * Register event for remove option
     */
    $(document).on('click', '.btn_remove_swatch', function () {
        var optionPanel = $(this).parents().eq(2);

        optionPanel.children('input').val('');
        optionPanel.children('.swatch_window').css('background', '');

        optionPanel.hide();
        optionPanel.addClass('unavailable');
    });

    /**
     * Toggle color upload chooser
     */
    $(document).on('click', '.swatch_window', function () {
        $(this).next('div').toggle();
    });
});

