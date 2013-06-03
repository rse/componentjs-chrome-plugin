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
            var gridView = new app.ui.widget.grid.view(false)
            cs(this).create('toolbarModel/view', app.ui.widget.toolbar.model, app.ui.widget.toolbar.view)
            cs(this).create('gridModel/view', app.ui.widget.grid.model, gridView)

            cs(this).model({
                'event:record'          : { value: false, valid: 'boolean', autoreset: true },
                'event:load'            : { value: false, valid: 'boolean', autoreset: true },
                'event:save'            : { value: false, valid: 'boolean', autoreset: true },
                'event:clear'           : { value: false, valid: 'boolean', autoreset: true },
                'event:filterKeyUp'     : { value: -1, valid: 'number', autoreset: true },
                'event:check-journal'   : { value: false, valid: 'boolean', autoreset: true },
                'data:continuous'       : { value: false, valid: 'boolean' },
                'data:filter'           : { value: '', valid: 'string' }
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
                label: 'Check Journal',
                event: 'event:check-journal',
                type: 'button'
            }, {
                label: 'Check continuously',
                data: 'data:continuous',
                type: 'checkbox'
            }, {
                type: 'fill'
            }, {
                label: 'Filter:',
                type: 'text'
            }, {
                type: 'input',
                data: 'data:filter',
                event: 'event:filterKeyUp'
            }]

            cs(this, 'toolbarModel').value('data:items', toolbarItems)

            var columns = [
                { label: 'Time', dataIndex: 'time', width: 50, align: 'center' },
                { label: 'Source', dataIndex: 'source' },
                { label: 'ST', dataIndex: 'sourceType', width: 50, align: 'center' },
                { label: 'Origin', dataIndex: 'origin' },
                { label: 'OT', dataIndex: 'originType', width: 50, align: 'center' },
                { label: 'Operation', dataIndex: 'operation', width: 100, align: 'center' },
                { label: 'Parameters', dataIndex: 'parameters' }
            ]

            cs(this, 'gridModel').value('data:columns', columns)
        },
        render: function () {
            var self = this
            var content = $.markup("tracing-content")

            cs(self).socket({
                scope: 'toolbarModel/view',
                ctx: $('.toolbar', content)
            })

            cs(self).socket({
                scope: 'gridModel/view',
                ctx: $('.grid', content)
            })

            cs(self).plug(content)

            $('#tracing_upload').change(function (evt) {
                var files = evt.target.files;

                for (var i = 0, f; f = files[i]; i++) {
                    var reader = new FileReader()
                    reader.onload = (function () {
                        return function (e) {
                            var content = e.target.result.split('\n')
                            cs('/sv').call('parseLogfile', content, function (tuples) {
                                cs(self, 'gridModel').value('data:rows', tuples, true)
                            })
                        }
                    })(f)

                    reader.readAsText(f)
                    $('#tracing_upload').val('')
                }
            })

            cs(self).observe({
                name: 'data:filter', spool: 'rendered',
                func: function (ev, nVal) {
                    cs(self, 'gridModel').value('state:filter', nVal)
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
                    $('#tracing_upload').trigger('click')
                }
            })

            cs(self).observe({
                name: 'event:save', spool: 'rendered',
                func: function () {
                    window.location = 'data:application/octet-stream;base64,' + btoa(cs(self, 'gridModel').value('data:savable'))
                }
            })

            cs(self).observe({
                name: 'event:clear', spool: 'rendered',
                func: function () {
                    cs(this, 'gridModel').value('data:rows', [])
                }
            })

            cs(self).observe({
                name: 'data:continuous', spool: 'rendered',
                func: function (ev, nVal, oVal) {
                    console.log('nVal: ' + nVal + ', oVal:' + oVal)
                }
            })

            cs(self).observe({
                name: 'event:filterKeyUp', spool: 'rendered',
                func: function (ev, nVal) {
                    if (nVal === 27) {
                        cs(self).value('data:filter', '')
                    }
                }
            })

            cs(self).observe({
                name: 'event:check-journal', spool: 'rendered',
                func: function () {
                    var tuples = cs(self, 'gridModel').value('data:rows')
                    for (var i = 0; i < tuples.length; i++) {
                        window.constraintChecker.checkTuple(constraintSet, tuples[i]);
                    }

                    window.constraintChecker.displayStats();
                }
            })
        },
        release: function () {
            cs(this).unspool('rendered')
        }
    }
})