var attributeOption = {
    table: $('attribute-options-table'),
    itemCount: 0,
    totalItems: 0,
    rendered: 0,
    template: html('#row-template'),
    isReadOnly:config.isReadOnly,
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
            data.intype = this.getOptionInputType();
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
    updateItemsCountField: function () {
        $('option-count-check').value = this.totalItems > 0 ? '1' : '';
    },
    enableNewOptionDeleteButton: function (id) {
        $('#delete_button_container_' + id + ' button').each(function (button) {
            button.enable();
            button.removeClass('disabled');
        });
    },
    bindRemoveButtons: function () {
        $(document).on('click', '#swatch-visual-options-panel .delete-option', function(){
            attributeOption.remove(this);
        });
    },
    render: function () {
        $('[data-role=options-container]:eq(0)').append(this.elements);
        this.elements = '';
    },
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
    ignoreValidate: function () {
        var ignore = '.ignore-validate input, ' +
            '.ignore-validate select, ' +
            '.ignore-validate textarea';

        $.validator.setDefaults({ignore: ignore});
    },
    getOptionInputType: function () {
        var optionDefaultInputType = 'radio';

        if ($('frontend_input') && $('frontend_input').value === 'multiselect') {
            optionDefaultInputType = 'checkbox';
        }

        return optionDefaultInputType;
    }
};

if ($('add_new_option_button')) {
    $(document).on('click','#add_new_option_button', function(){
        attributeOption.add(attributeOption, true)
    });
}

$(document).on('click', '#manage-options-panel .delete-option', function () {
    attributeOption.remove(this);
});

$('#manage-options-panel').on('render', function () {
    attributeOption.ignoreValidate();

    if (attributeOption.rendered) {
        return false;
    }
    $('body').trigger('processStart');
    attributeOption.renderWithDelay(config.attributesData, 0, 100, 300);
    attributeOption.bindRemoveButtons();
});

if (config.isSortable) {
    $(function () {
        if($('[data-role=options-container]').html()){
            Sortable.create($('[data-role=options-container]'),{
                onUpdate: function () {
                    $('[data-role=options-container] [data-role=order]').each(function (index, element) {
                        $(element).val(index + 1);
                    });
                }
            });
        }
    });
}

window.attributeOption = attributeOption;
window.optionDefaultInputType = attributeOption.getOptionInputType();

$('#manage-options-panel', attributeOption);