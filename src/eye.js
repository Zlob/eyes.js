/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 03:52 PM
* To change this template use Tools | Templates.
*/
define(function() {
    
    var SVG_HTML_TEMPLATE = [
        '<svg width="50" height="50" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">',
        ' <g>',
        '  <circle name="eye"   fill="#ffffff" stroke="#000000" stroke-width="5" cx="60" cy="60" r="50" />',
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
            "x"             : 0,
            "y"             : 0,
            "size"          : 50,
            "color"         : "#FFFFFF",
            "borderColor"   : "#000000",
            'borderSize'    : '5'
        };
        
        // Replace default optinos
        for( var key in options ) {
            this.options[key] = options[key];
        };
        
        this._render();
    }
    
    // Relactive to parent image
    Eye.prototype.move = function( x, y ) {
        var parentPostion = this._element.getBoundingClientRect();        
        this.handlerNode.style.position = "absolute";
        this.handlerNode.style.left = parentPostion["left"] + (x + pageXOffset) + "px";
        this.handlerNode.style.top  = parentPostion["top"]  + (y + pageYOffset) + "px";
    }
    
    Eye.prototype._render = function() {
        var self = this;
        
        this.handlerNode = this._createHandlerNode(this.options["size"]);
        this.eyeNode = this._createEyeNode(this.handlerNode, this.options["size"]);
                
        document.body.appendChild( this.handlerNode );

        this.move( this.options.x, this.options.y );             
        
//         Set visible AFTER change position
        this.handlerNode.style.display = "block";   
    }
    
    Eye.prototype._createHandlerNode = function (size) {
        //create node
        var handlerNode = document.createElement("object");
        //hide node
        handlerNode.style.display  = "none";
        //set params
        handlerNode.style.position = "absolute";    
        handlerNode.setAttribute("width", size);
        handlerNode.setAttribute("height", size);
        return handlerNode;
    }
    
    Eye.prototype._createEyeNode = function (parent, size, color, borderColor, borderSize) {
        //create node
        var eyeNode = document.createElement("object");
        //set params
        eyeNode.style.position = "absolute";    
        eyeNode.innerHTML = SVG_HTML_TEMPLATE;        
        eyeNode.setAttribute("width", size);
        eyeNode.setAttribute("height", size);        
        eyeNode.setAttribute("fill", color);
        eyeNode.setAttribute("stroke", borderColor);
        eyeNode.setAttribute("stroke-width", borderSize);        
        parent.appendChild(eyeNode);        
        return eyeNode;
    }
    
    return Eye;
});