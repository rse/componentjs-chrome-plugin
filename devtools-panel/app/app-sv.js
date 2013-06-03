/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

app.sv = cs.clazz({
    mixin: [ cs.marker.service ],
    protos: {
        create: function () {
            var self = this

            cs(self).register('parseLogfile', function (content, callback) {
                tupleParser.parseLog(content, function (tuples) {
                    callback(tuples)
                })
            })

            cs(self).register('parseConstraintset', function (content, callback) {
                try {
                    var constraintSet = constraint_parser.parse(content)
                    callback({
                        success: true,
                        constraints: constraintSet
                    })
                } catch (err) {
                    callback({
                        success: false,
                        error: err
                    })
                }
            })
        }
    }
})