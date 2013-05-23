/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

cs.ns("app.ui.widget.panel.toolbar")

app.ui.widget.panel.toolbar.model = cs.clazz({
    mixin: [ cs.marker.model ],
    protos: {
        create: function () {
            /*  presentation model for items  */
            cs(this).model({
                "data:items"    : { value: [], valid: 'any' } //FIXME
            })
        }
    }
})

/*  widget view  */
app.ui.widget.panel.toolbar.view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            var self = this

            /*  plug mask into parent  */
            var content = $.markup("widget-toolbar")

            cs(self).plug(content)

            cs(self).socket({
                ctx: $('.items', content),
                type: 'standard'
            })

            cs(self).observe({
                name: 'data:items', spool: 'rendered', touch: true,
                func: function (ev, nVal) {
                    for (var i = 0; i < nVal.length; i++) {
                        var item = nVal[i];
                        if (item.type === 'button') {
                            var btn =  new app.ui.widget.toolbar.items.button(item.label, item.event)
                            cs(self).create('button-' + i, btn)
                        }
                        else if (item.type === 'input') {
                            var input =  new app.ui.widget.toolbar.items.input(item.data)
                            cs(self).create('input-' + i, input)
                        }
                        else if (item.type === 'text') {
                            var text =  new app.ui.widget.toolbar.items.text(item.label)
                            cs(self).create('text-' + i, text)
                        } else if (item.type === 'checkbox') {
                            var checkbox =  new app.ui.widget.toolbar.items.checkbox(item.label)
                            cs(self).create('checkbox-' + i, checkbox)
                        }
                        else {
                            $('.items', content).markup('widget-toolbar/item', { content: item.label })
                        }
                    }
                }
            })
        },
        release: function () {
        }
    }
})