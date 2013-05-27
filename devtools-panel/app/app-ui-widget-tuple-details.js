/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

cs.ns("app.ui.widget.tuple.details")

app.ui.widget.tuple.details.model = cs.clazz({
    mixin: [ cs.marker.model ],
    protos: {
        create: function () {
            /*  presentation model for items  */
            cs(this).model({
                "data:tuple"  : { value: null, valid: '(null | {source: string, sourceType: string, origin: string, originType: string, operation: string, parameters: any})' }
            })
        }
    }
})

app.ui.widget.tuple.details.view = cs.clazz({
    mixin: [ cs.marker.view ],
    protos: {
        render: function () {
            var self = this
            var details = $.markup('tuple-details')

            cs(self).plug(details)

            cs(self).value('data:tuple', {
                source: 'testS',
                sourceType: 'testST',
                origin: 'testO',
                originType: 'testOT',
                operation: 'op',
                parameters: { test: 'test' }
            })

            cs(self).observe({
                name: 'data:tuple', spool: 'rendered',
                touch: true,
                func: function (ev, nVal) {
                    if (nVal !== null) {
                        $('.source', details).text(nVal.source)
                        $('.source-type', details).text(nVal.sourceType)
                        $('.origin', details).text(nVal.origin)
                        $('.origin-type', details).text(nVal.originType)
                        $('.operation', details).text(nVal.operation)
                        $('.parameters', details).text(JSON.stringify(nVal.parameters))
                    }
                }
            })
        },
        release: function () {
            cs(this).unspool('rendered')
        }
    }
})