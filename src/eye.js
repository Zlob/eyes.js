/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 03:52 PM
* To change this template use Tools | Templates.
*/
define(['eyeball', 'topEyelid'], function(Eyeball, TopEyelid) {
    
    var SVG_HTML_TEMPLATE = [
        '<svg width="50" height="50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">',
        ' <g>',
        '  <circle name="eye" fill="#ffffff" stroke="#000000" stroke-width="5" cx="90" cy="90" r="50" />',
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
            borderSize    : '5',
            //eyeball options
            eyeballSize       : 12,
            eyeballShift      : 20,
            //top eyelid options
            topEyelidColor              : "white",
            topEyelidBorderColor        : "#000000",
            topEyelidBorderSize         : '5',
            topEyelidEyelashesStyle     : 'none',
            topEyelidEyelashesPosition  : 'none',
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
                
    Eye.prototype._render = function () {
        var self = this;
        
        this._handlerNode = this._create_handlerNode(this.options["size"]);
        this._eyeNode = this._createEyeNode();
        
        this.eyeball = new Eyeball(this._handlerNode, {
            "eyeballSize"   : this.options['eyeballSize'],
            "eyeballShift"  : this.options['eyeballShift'],
        });
        
        this.topEyelid = new TopEyelid(this._handlerNode, {
            "color"             : this.options['topEyelidColor'],
            "borderColor"       : this.options['topEyelidBorderColor'],
            "borderSize"        : this.options['topEyelidBorderSize'],
            "eyelashesStyle"    : this.options['topEyelidEyelashesStyle'],
            "eyelashesPosition" : this.options['topEyelidEyelashesPosition'],
        });
                
        document.body.appendChild( this._handlerNode );

        this.move( this.options.x, this.options.y );             
        
        //Set visible AFTER change position
        this._handlerNode.style.display = "block";   
    }
    
    Eye.prototype._create_handlerNode = function (size) {
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
        var eyePath = eyeNode.querySelector("[name=eye]");
        
        eyePath.setAttribute("width", this.options['size']);
        eyePath.setAttribute("height", this.options['size']);        
        eyePath.setAttribute("fill", this.options['color']);
        eyePath.setAttribute("stroke", this.options['borderColor']);
        eyePath.setAttribute("stroke-width", this.options['borderSize']);
        
        return eyeNode;
    }
    
    return Eye;
});