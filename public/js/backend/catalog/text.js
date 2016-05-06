var swatchOptionTextDefaultInputType = 'radio',
    swatchTextOption = {
        table: $('swatch-text-options-table'),
        itemCount: 0,
        totalItems: 0,
        rendered: 0,
        isReadOnly: config.isReadOnly,
        template: html('#swatch-text-row-template'),

        /**
         * Add option
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
                    'sort_order': this.itemCount + 1
                };
                isNewOption = true;
            }

            if (!data.intype) {
                data.intype = swatchOptionTextDefaultInputType;
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
         * Remove option
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
                elementFlags = element.getElementsByClassName('delete-flag');

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
            $('swatch-text-option-count-check').value = this.totalItems > 0 ? '1' : '';
        },

        /**
         * Enable delete button for new option
         *
         * @param {String} id
         */
        enableNewOptionDeleteButton: function (id) {
            $('#delete_button_swatch_container_' + id + ' button').each(function (button) {
                button.show();
                button.removeClass('disabled');
            });
        },

        /**
         * Bind remove button
         */
        bindRemoveButtons: function () {
            $(document).on('click', '#swatch-text-options-panel .delete-option', function(){
                attributeOption.remove(this);
            });
        },

        /**
         * Render action
         */
        render: function () {
            $('[data-role=swatch-text-options-container]:eq(0)').append(this.elements);
            this.elements = '';
        },

        /**
         * Render action with delay (performance fix)
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

if ($('add_new_swatch_text_option_button')) {
    $(document).on('click','#add_new_swatch_text_option_button',function(){
        swatchTextOption.add(swatchTextOption, true)
    })
}
$('#swatch-text-options-panel').on('render', function () {
    swatchTextOption.ignoreValidate();

    if (swatchTextOption.rendered) {
        return false;
    }
    $('body').trigger('processStart');
    swatchTextOption.renderWithDelay(config.attributesData, 0, 100, 300);
    swatchTextOption.bindRemoveButtons();
});

if (config.isSortable) {
    $(function () {
        if($('[data-role=swatch-text-options-container]').html()){
            Sortable.create($('[data-role=options-container]'),{
                onUpdate: function () {
                    $('[data-role=swatch-text-options-container] [data-role=order]').each(
                        function (index, element) {
                            $(element).val(index + 1);
                        }
                    );
                }
            });
        }
    });
}

$(document).ready(function () {
    if ($('#frontend_input').val() !== 'swatch_text') {
        $('.swatch-text-field-0').removeClass('required-option');
    }
});

window.swatchTextOption = swatchTextOption;
window.swatchOptionTextDefaultInputType = swatchOptionTextDefaultInputType;

$('#swatch-text-options-panel', swatchTextOption);

