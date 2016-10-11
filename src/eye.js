/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 03:52 PM
* To change this template use Tools | Templates.
*/
define(['eyeball', 'topEyelid', 'bottomEyelid',], function(Eyeball, TopEyelid, BottomEyelid) {
    
    var SVG_HTML_TEMPLATE = [
        '<svg name="svg-node" width="50" height="50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">',
        ' <g>',
        '  <circle name="eye" cx="90" cy="90" r="50" />',
        ' </g>',
        '</svg>'
    ].join("");
    
    var Eye = function (selector, options) {
        var self = this;
                        
        this.selector = selector;

        this._element = document.querySelector( selector );

        if ( !this._element ) {
            throw new Error("Not valid image selector");
            return;
        }
        
        // Default options
        this.options = {
            x             : 0,
            y             : 0,
            size          : 50,
            color         : "#FFFFFF",
            borderColor   : "#000000",
            borderSize    : 5,
            //left or right eye
            type          : 'left',
            //eyeball options
            eyeball: {
                size     : 12,
                shift    : 20
            },
            //top eyelid options
            topEyelid: {
                size                   : 0,
                color                  : "white",
                borderColor            : "#000000",
                borderSize             : 5,
                bottomArcRadius        : 0,
                bottomArcRadiusSweep   : 0,
                eyelashesStyle         : 'none',
                eyelashesPosition      : 'none'
            },
            //bottom eyelid options
            bottomEyelid: {
                size                   : 0,
                color                  : "white",
                borderColor            : "#000000",
                borderSize             : 5,
                topArcRadius           : 0,
                topArcRadiusSweep      : 0
            }
        };
        
        // Replace default optinos
        for( var key in options ) {
            this.options[key] = options[key];
        };
        
        this._render();
    }
    
    Eye.prototype.moveToPosition = function ( ) {
        this.move( this.options["x"], this.options["y"] );  
    }
        
    // Relactive to parent image
    Eye.prototype.move = function ( x, y ) {
        var parentPostion = this._element.getBoundingClientRect();        
        this._handlerNode.style.position = "absolute";
        this._handlerNode.style.left = parentPostion["left"] + (x + pageXOffset) + "px";
        this._handlerNode.style.top  = parentPostion["top"]  + (y + pageYOffset) + "px";
    }
    
    //append node
    Eye.prototype.append = function ( node ) {   
        this._handlerNode.querySelector("[name=svg-node]").appendChild(node);
    }
                
    Eye.prototype._render = function () {
        var self = this;
        
        this._handlerNode = this._createHandlerNode(this.options["size"]);
        this._eyeNode = this._createEyeNode();
        
        this.eyeball = new Eyeball(this, this.options.eyeball);
        
        this.topEyelid = new TopEyelid(this, this.options.topEyelid);
        
        this.bottomEyelid = new BottomEyelid(this, this.options.bottomEyelid);
                
        document.body.appendChild( this._handlerNode );

        this.move( this.options.x, this.options.y );             
        
        //Set visible AFTER change position
        this._handlerNode.style.display = "block";   
    }
    
    Eye.prototype._createHandlerNode = function (size) {
        var _handlerNode = document.createElement("object");
        
        _handlerNode.style.display  = "none";
        _handlerNode.style.position = "absolute";    
        _handlerNode.setAttribute("width", size);
        _handlerNode.setAttribute("height", size);
        
        return _handlerNode;
    }
    
    Eye.prototype._createEyeNode = function () {
        var eyeNode = document.createElement("object");
        
        eyeNode.style.position = "absolute";    
        eyeNode.innerHTML = SVG_HTML_TEMPLATE;
        this._setNodeAttributes(eyeNode);
        this._handlerNode.appendChild(eyeNode); 
        
        return eyeNode;
    }
    
    Eye.prototype._setNodeAttributes = function (eyeNode) {
        var svgNode = eyeNode.querySelector("[name=svg-node]");
        svgNode.setAttribute("width", this.options['size']);
        svgNode.setAttribute("height", this.options['size']);       
        
        var eyePath = eyeNode.querySelector("[name=eye]");
        eyePath.setAttribute("fill", this.options['color']);
        eyePath.setAttribute("stroke", this.options['borderColor']);
        eyePath.setAttribute("stroke-width", this.options['borderSize']);
        
        return eyeNode;
    }
    
    return Eye;
});