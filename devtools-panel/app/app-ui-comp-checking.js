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
            cs(this).create('toolbarModel/view', app.ui.widget.toolbar.model, app.ui.widget.toolbar.view)
            cs(this).create('gridModel/view', app.ui.widget.grid.model, app.ui.widget.grid.view)

            cs(this).model({
                'event:clear'           : { value: false, valid: 'boolean', autoreset: true },
                'event:check-journal'   : { value: false, valid: 'boolean', autoreset: true },
                'data:continuous'       : { value: false, valid: 'boolean' }
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
                label: 'Continuous check',
                data: 'data:continuous',
                type: 'checkbox'
            }]

            cs(this, 'toolbarModel').value('data:items', toolbarItems)

            var columns = ['Time', 'Source', 'ST', 'Origin', 'OT', 'Operation', 'Parameters']
            var rows = [['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G'],['A','B','C','D','E','F','G']]

            cs(this, 'gridModel').value('data:columns', columns)
            cs(this, 'gridModel').value('data:rows', rows)
        },
        render: function () {
            var content = $.markup("checking-content")
            var self = this

            cs(self).socket({
                scope: 'toolbarModel/view',
                ctx: $('.toolbar', content)
            })

            cs(self).socket({
                scope: 'gridModel/view',
                ctx: $('.grid', content)
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