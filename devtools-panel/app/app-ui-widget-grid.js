/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

cs.ns("app.ui.widget.grid")

app.ui.widget.grid.model = cs.clazz({
    mixin: [ cs.marker.model ],
    protos: {
        create: function () {
            /*  presentation model for items  */
            cs(this).model({
                "data:columns"  : { value: [], valid: 'any' },
                "data:rows"    : { value: [], valid: 'any' } //FIXME
            })
        }
    }
})

app.ui.widget.grid.view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            var self = this
            var grid = $.markup('grid')

            cs(self).plug(grid)

            cs(self).observe({
                name: 'data:columns', spool: 'rendered', touch: true,
                func: function (ev, nVal) {
                    for (var i = 0; i < nVal.length; i++) {
                        var row = nVal[i];
                        $('.thead > .row', grid).markup('grid/column', { label: row })
                    }
                }
            })

            cs(self).observe({
                name: 'data:rows', spool: 'rendered', touch: true,
                func: function (ev, nVal) {
                    for (var i = 0; i < nVal.length; i++) {
                        var row = $('.tbody', grid).markup('grid/row')
                        for (var x = 0; x < nVal[i].length; x++) {
                            $(row).markup('grid/row/data', { label: nVal[i][x] })
                        }
                    }
                }
            })
        },
        release: function () {
            cs(this).unspool('rendered')
        }
    }
})