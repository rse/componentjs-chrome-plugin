/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

app.ui.comp.tracing = cs.clazz({
    mixin: [ cs.marker.controller ],
    protos: {
        create: function () {
            cs(this).create('model/toolbar', app.ui.widget.panel.toolbar.model, app.ui.widget.panel.toolbar.view)

            cs(this).model({
                'event:record'  : { value: false, valid: 'boolean', autoreset: true },
                'event:load'    : { value: false, valid: 'boolean', autoreset: true },
                'event:save'    : { value: false, valid: 'boolean', autoreset: true },
                'event:clear'   : { value: false, valid: 'boolean', autoreset: true },
                'data:filter'   : { value: '', valid: 'string' }
            })
        },
        prepare: function () {
            var toolbarItems = [{
                label: 'Record',
                event: 'event:record',
                type: 'button'
            }, {
                label: 'Load',
                event: 'event:load',
                type: 'button'
            }, {
                label: 'Save',
                event: 'event:save',
                type: 'button'
            }, {
                label: 'Clear',
                event: 'event:clear',
                type: 'button'
            }, {
                type: 'fill'
            }, {
                label: 'Filter:',
                type: 'text'
            }, {
                type: 'input',
                data: 'data:filter'
            }]

            cs(this, 'model').value('data:items', toolbarItems)
        },
        render: function () {
            var content = $.markup("tracing-content")
            var self = this

            cs(self).socket({
                ctx: content
            })

            cs(self).plug(content)

            cs(self).observe({
                name: 'data:filter', spool: 'rendered',
                func: function (ev, nVal, oVal) {
                    console.log('new: ' + nVal + ', old: ' + oVal)
                }
            })

            cs(self).observe({
                name: 'event:record', spool: 'rendered',
                func: function () {
                    console.log('record now')
                }
            })

            cs(self).observe({
                name: 'event:load', spool: 'rendered',
                func: function () {
                    console.log('load now')
                }
            })

            cs(self).observe({
                name: 'event:save', spool: 'rendered',
                func: function () {
                    console.log('save now')
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