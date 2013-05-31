/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

cs.ns("app.ui.widget.rationales")

app.ui.widget.rationales.model = cs.clazz({
    mixin: [ cs.marker.model ],
    protos: {
        create: function () {
            /*  presentation model for items  */
            cs(this).model({
                'data:tuple': { value: null, valid: '(null | {time: number, source: string, sourceType: string, origin: string, originType: string, operation: string, parameters: any})'},
                'data:rationales' : { value: [], valid: '[{ title: string, rationale: string }*]'}
            })
        }
    }
})

app.ui.widget.rationales.view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            var self = this
            var rationales = $.markup('rationales')

            cs(self).plug(rationales)

            cs(self).observe({
                name: 'data:rationales', spool: 'rendered',
                touch: true,
                func: function (ev, nVal) {
                    if (nVal === null) {
                        return
                    }
                    $('tr', rationales).remove()
                    for (var i = 0; i < nVal.length; i++) {
                        var item = nVal[i]
                        $('.table', rationales).append($.markup('rationales/rationales-item', item))
                    }
                }
            })
        },
        release: function () {
            cs(this).unspool('rendered')
        }
    }
})