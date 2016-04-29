function isSelector(selector) {
    try {
        document.querySelector(selector);

        return true;
    } catch (e) {
        return false;
    }
}

function unescape(str) {
    return str.replace(/&lt;%|%3C%/g, '<%').replace(/%&gt;|%%3E/g, '%>');
}

function getTmplString(tmpl) {
    if (isSelector(tmpl)) {
        tmpl = document.querySelector(tmpl);

        if (tmpl) {
            tmpl = tmpl.innerHTML.trim();
        } else {
            console.warn('No template was found by selector: ' + tmpl);

            tmpl = '';
        }
    }

    return unescape(tmpl);
}

function html(tmpl, data) {
    var render;

    tmpl   = getTmplString(tmpl);
    render = _.template(tmpl);

    return !_.isUndefined(data) ?
        render(data) :
        render;
}
