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
            cs(this).create('detailsModel/view', app.ui.widget.tuple.details.model, app.ui.widget.tuple.details.view)
            cs(this).create('rationalesModel/view', app.ui.widget.rationales.model, app.ui.widget.rationales.view)

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
            }]

            cs(this, 'toolbarModel').value('data:items', toolbarItems)

            var columns = [
                { label: 'Time', dataIndex: 'time' },
                { label: 'Source', dataIndex: 'source' },
                { label: 'ST', dataIndex: 'sourceType' },
                { label: 'Origin', dataIndex: 'origin' },
                { label: 'OT', dataIndex: 'originType' },
                { label: 'Operation', dataIndex: 'operation' }
            ]
            var rows = [
                { time: 1, source: 'A1', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } },
                { time: 1, source: 'A2', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } },
                { time: 1, source: 'A3', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } },
                { time: 1, source: 'A4', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } },
                { time: 1, source: 'A5', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } },
                { time: 1, source: 'A6', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } },
                { time: 1, source: 'A7', sourceType: 'B', origin: 'C', originType: 'D', operation: 'E', parameters: { test: 'F' } }
            ]

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

            cs(self).socket({
                scope: 'rationalesModel/view',
                ctx: $('.rationales-container', content)
            })

            cs(self).socket({
                scope: 'detailsModel/view',
                ctx: $('.tuple-details-container', content)
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
                    cs(this, 'gridModel').value('data:rows', [])
                    cs(self, 'rationalesModel').value('data:rationales', [])
                }
            })

            cs(self, 'gridModel').observe({
                name: 'data:selected-obj', spool: '..:rendered',
                touch: true,
                func: function (ev, nVal) {
                    cs(self, 'detailsModel').value('data:tuple', nVal)
                    cs(self, 'rationalesModel').value('data:tuple', nVal)

                    //TODO - get the correct rationales
                    var rationales = [
                        { title: 'view-call-foo', rationale: 'Content blaa' },
                        { title: 'view-call', rationale: 'Content fooo' }
                    ]
                    cs(self, 'rationalesModel').value('data:rationales', rationales)
                }
            })
        },
        release: function () {
            cs(this).unspool('rendered')
        }
    }
})