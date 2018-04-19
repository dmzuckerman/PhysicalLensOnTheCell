// functions for 'Physical Lens of the Cell' by Daniel M. Zuckerman
// Copyright (C) Daniel M. Zuckerman 2012-2013
// NOTE: true global variables must be declared in global.js and called via window.parent.global_variable_name
var startset = ["contents", "800", "goals", "400", 1, 1]; // second-to-last bit says 'send to history'
                                                          // last bit says allow left frame to change
var stateLength = 4;
lfWidthStd = "600";
rfWidthStd = "600";

// next 4 lines from global.js
//alert('hello from global');
var history = new Array();
var currentPage = -1;
var pageCount = 0;


function firstLoad() {
    toStart();
    alert('Welcome.  And thanks for your patience as this site is constructed.  IMPORTANT: (1) Javascript required.  (2) Adjust browser zoom to size panels correctly.  (3) Supported browsers: Firefox, Safari, Chrome; NOT Internet Explorer.  (4) Hint: Use two side-by-side copies of the same page to study the explanation for a figure or equation.');
}

function info() {
    alert('Basic info: (1) The left frame is considered the main reading frame; (2) Clicking links on the left will change the right frame; (3) Clicking links on the right will also change the right frame.');
}

function exercises() {
    alert('Exercises not yet available.  Email Dan Zuckerman with requests or suggestions: ddmmzz@pitt.edu');
}

function audio() {
    alert('Audio not yet available.  Email Dan Zuckerman with requests or suggestions: ddmmzz@pitt.edu');
}

function transcript() {
    alert('Transcript (of audio) not yet available.  Email Dan Zuckerman with requests or suggestions: ddmmzz@pitt.edu');
}

function nextBio() {
    alert('This link not yet established.  Email Dan Zuckerman with requests or suggestions: ddmmzz@pitt.edu');
}

function nextPhysics() {
    alert('This link not yet established.  Email Dan Zuckerman with requests or suggestions: ddmmzz@pitt.edu');
}

function comment() {
    alert('Email Dan Zuckerman with requests or suggestions: ddmmzz@pitt.edu');
}

function extLink( link ) {
    // external link to right frame
    var rf = window.parent.document.getElementById("right_frame");
    rf.src = link;
}

function searchEngine() {
    extLink('http://www.bing.com');
}

function rightToLeft() {
    // left frame becomes same as right
    var rf = window.parent.document.getElementById("right_frame");
    var rfSrc = rf.src;
    var root = getRoot( rfSrc );
    changeTo( root, root, lfWidthStd, -1 );  // negative width is flag to keep rf
    //changeTo( root, root, lfWidthStd, rfWidthStd );
    //changeTo( root, "notation", lfWidthStd, rfWidthStd );
}

function leftToRight() {
    // right frame becomes same as left
    var lf = window.parent.document.getElementById("left_frame");
    var lfSrc = lf.src;
    var root = getRoot( lfSrc );
    changeTo( root, root ); // 2 args keeps left frame in same scroll position
    //changeTo( root, root, lfWidthStd, rfWidthStd );
    //changeTo( root, "notation", lfWidthStd, rfWidthStd );
}

function refs() {
    var lf = window.parent.document.getElementById("left_frame");
    var fSrc = lf.src;
    //var fWidth = lf.width;
    var root = getRoot( fSrc );
    var refs = root + "Refs";
    changeTo(root, refs);
}

function contentsRight() {
    var lf = window.parent.document.getElementById("left_frame");
    var fSrc = lf.src;
    var root = getRoot( fSrc );
    //changeTo(root, "transcripts/mathjaxtest");
    changeTo(root, "contentsSlim");
}

function notation() {
    var lf = window.parent.document.getElementById("left_frame");
    var fSrc = lf.src;
    var root = getRoot( fSrc );
    //changeTo(root, "transcripts/mathjaxtest");
    changeTo(root, "notation");
}

function toStart() {
    var ff = new Object();
    bf = window.parent.document.getElementById("banner");
    bf.width = "1204";
    changeRaw.apply(this, startset);
}

function stdFrames() { // a function to determine frames - does not make change
    // keeps left frame in place - unless left frame is (main/original) contents
    var args = new Array(2);
    var newlftmp = arguments[0]; // will be changed if not current lf
    var newrftmp = arguments[1];
    var lf = window.parent.document.getElementById("left_frame");
    var lfSrc = lf.src;
    if ( lfSrc.indexOf(newlftmp) == -1 && lfSrc.indexOf("contents") == -1 ) { 
        // check if caller is NOT already lf && lf is NOT contents
        // if lf is contents, we want to change it; if lf is not, we want to keep lf
        newlftmp = getRoot( lfSrc );  // if not, keep lf same as original
    }
    args[0] = newlftmp; args[1] = newrftmp;
    return args;
}

function changeTo() {
    // changes from links - not forward or back buttons
    var args = new Array();
    var tmpargs = new Array(2);
    var newlf = arguments[0];
    var newrf = arguments[1];
    var lfWidth = lfWidthStd;
    var rfWidth = rfWidthStd;
    var lf = window.parent.document.getElementById("left_frame");
    var lfSrc = lf.src;
    var changeLeft = 1; // 1 indicates change left frame - value may get changed below
    // 4 arguments means two files and two widths
    if      ( arguments.length == 2 ) { // default sizes for two frames
        var bf = window.parent.document.getElementById("banner");
        bf.width = "1204";  // (top) banner size to match frames below
        var tmpargs = stdFrames( newlf, newrf  );
        newlf = tmpargs[0];
        newrf = tmpargs[1];
        if ( lfSrc.indexOf("contents") == -1 ) { // if main contents are NOT at left
            changeLeft = 0; // don't change left frame - this is definition of std change
                            // this will prevent left frame from reloading, which resets scroll position
        }
    }
    else if ( arguments.length == 3 ) { // dummy as 3rd argument allows left frame to change
        //var tmpargs = stdFrames( newlf, newrf  );
        //newlf = tmpargs[0];
        //newrf = tmpargs[1];
    }
    else if ( arguments.length == 4 ) {
        lfWidth = arguments[2];
        rfWidth = arguments[3];
    }
    args.push( newlf, lfWidth, newrf, rfWidth );
    var toHistory = 1; // include in history list
    args.push( toHistory );
    args.push( changeLeft );
    changeRaw.apply(this, args);
    //alert('changeTo: after change'); // often silent
}

function styleChange() {
    // http://www.w3schools.com/jsref/dom_obj_style.asp
    alert('styleChange');
    // load left frame
    var lf = window.parent.document.getElementById("left_frame");
    var lDoc = (lf.contentWindow || lf.contentDocument);
    if (lDoc.document) lDoc = lDoc.document;
    // load right frame
    var rf = window.parent.document.getElementById("right_frame");
    var rDoc = (rf.contentWindow || rf.contentDocument);
    if (rDoc.document) rDoc = rDoc.document;
    // changes follow
    lDoc.body.style.backgroundColor = "#00f";
    rDoc.body.style.backgroundColor = "#00f";
    return true;
    //lf.style.background = "black";
}

function backButton() {
    // display previous page in history
    if ( window.parent.currentPage > 0 ) {
        var args = new Array();
        window.parent.currentPage -- ;
        var page = window.parent.currentPage;
        var index = stateLength * page;
        for ( i=0; i<stateLength; i++ ) { // get prev state from history array
            args.push(window.parent.history[index+i]);
        }
        var toHistory = 0; // do NOT include in history list
        args.push( toHistory );
        args.push( 0 );
        changeRaw.apply(this, args);
    }
}

function fwdButton() {
    // display next page in history
    var max = window.parent.history.length/stateLength - 1;
    if ( window.parent.currentPage < max ) {
        var args = new Array();
        window.parent.currentPage ++ ;
        var page = window.parent.currentPage;
        var index = stateLength * page;
        for ( i=0; i<stateLength; i++ ) { // get next state from history array
            args.push(window.parent.history[index+i]);
        }
        var toHistory = 0; // do NOT include in history list
        args.push( toHistory );
        args.push( 0 );
        changeRaw.apply(this, args);
    }
}

function changeRaw( lfName, lfWidth, rfName, rfWidth, toHistory, changeLeft ) {
    // assumes 2 frames; uses (name, width) pairs
    var lf = new Object();
    lf = window.parent.document.getElementById("left_frame");
    //var lf = window.parent.document.getElementById("left_frame");
    var rf = new Object();
    rf = window.parent.document.getElementById("right_frame");
    //var rf = window.parent.document.getElementById("right_frame");
    var ff = new Object();
    ff = window.parent.document.getElementById("footer");
    //var ff = window.parent.document.getElementById("footer");
    if ( lfName=="contents" ) { 
        lf.height = "600";
        rf.height = "600";
        ff.height = "0";
    }
    else {
        lf.height = "535";
        rf.height = "535";
        ff.height = "45";
    }
    if ( changeLeft==1 ) { // prevents left frame from reloading in a std change
        lf.src = lfName + ".html";
    }
    if ( rfWidth >= 0 ) { // rfWidth<0 is a flag to keep right frame unchanged
        rf.src = rfName + ".html";
        rf.width = rfWidth;
    }
    lf.width = lfWidth; // this line executes 'silently' - not seen in debugger
    if ( toHistory==1 ) {
        window.parent.pageCount ++;
        window.parent.currentPage ++;
        window.parent.history.push(lfName, lfWidth, rfName, rfWidth);
    }
    //if ( lfWidth==lfWidthStd && rfWidth==rfWidthStd ) {
        //alert('std widths');
        //styleChange();
    //}
    //return true;
}

function getRoot( htmlName ) {
    var len = htmlName.length;
    return htmlName.substring(0,len-5);
}

/*
function getFrame(e) {
    var clicked = e.target.parent;
    alert('getFrame: ' + clicked);
}
*/

