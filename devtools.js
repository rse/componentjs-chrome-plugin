/*
**  ComponentJS -- Component System for JavaScript <http://componentjs.com>
**  Copyright (c) 2009-2013 Ralf S. Engelschall <http://engelschall.com>
**
**  This Source Code Form is subject to the terms of the Mozilla Public
**  License, v. 2.0. If a copy of the MPL was not distributed with this
**  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var console = {
    log: function (message) {
        chrome.runtime.sendMessage({ command: "sendToConsole", args: message });
    }
};

chrome.devtools.panels.create("ComponentJS", "icon-19x19.png", "devtools-panel/index.html", function (panel) {
    panel.onShown.addListener(function (panel_window) {
        console.log("ComponentJS: tracing: panel show");
    });
    return panel;
});

/*chrome.devtools.panels.elements.createSidebarPane("ComponentJS", function(sidebar) {
    sidebar.setPage("devtools-sidebar.html")
    sidebar.setHeight("8ex")
    sidebar.onShown.addListener(function(panel_window) {
        console.log("ComponentJS: tracing: sidebar show")
    })
    sidebar.onHide.addListener(function(panel_window) {
        console.log("ComponentJS: tracing: sidebar hide")
    })
    return sidebar
})*/

chrome.devtools.inspectedWindow.onResourceAdded.addListener(function (resource) {
    console.log("ComponentJS: tracing: onResourceAdded");
});