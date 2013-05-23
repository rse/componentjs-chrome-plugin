/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

app.ui.comp.checking = cs.clazz({
    mixin: [ cs.marker.controller ],
    protos: {
        create: function () {
            cs(this).create('model/toolbar', app.ui.widget.panel.toolbar.model, app.ui.widget.panel.toolbar.view)

            cs(this).model({
                'event:clear'           : { value: false, valid: 'boolean', autoreset: true },
                'event:check-journal'   : { value: false, valid: 'boolean', autoreset: true },
                'data:continuous'      : { value: false, valid: 'boolean' }
            })
        },
        prepare: function () {
            var toolbarItems = [{
                label: 'Clear',
                event: 'event:clear',
                type: 'button'
            }, {
                label: 'Check Journal',
                event: 'event:check-journal',
                type: 'button'
            }, {
                type: 'fill'
            }, {
                label: 'Continuous check',
                data: 'data:continuous',
                type: 'checkbox'
            }]

            cs(this, 'model').value('data:items', toolbarItems)
        },
        render: function () {
            var content = $.markup("checking-content")
            var self = this

            cs(self).socket({
                ctx: content
            })

            cs(self).plug(content)

            cs(self).observe({
                name: 'data:continuous', spool: 'rendered',
                func: function (ev, nVal, oVal) {
                    console.log('new: ' + nVal + ', old: ' + oVal)
                }
            })

            cs(self).observe({
                name: 'event:check-journal', spool: 'rendered',
                func: function () {
                    console.log('check journal now')
                }
            })

            cs(self).observe({
                name: 'event:clear', spool: 'rendered',
                func: function () {
                    console.log('clear now')
                }
            })
        },
        release: function () {
            cs(this).unspool('rendered')
        }
    }
})