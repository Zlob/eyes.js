/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-09
* Time: 08:52 AM
* To change this template use Tools | Templates.
*/
define(function() {
    var SVG_HTML_TEMPLATE = [
        '<svg width="50" height="50" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">',
        ' <g>',
        '  <path name="top-eyelid" stroke-width="5" stroke="#000000" fill="yellow" d="m60,10a50,50 0 1 0 0,0"/>',
        ' </g>',
        '</svg>'
    ].join("");
    
    var TopEyelid = function (handlerNode, options) {
        var self = this;
                        
        this._handlerNode = handlerNode;
        
        this.options = {
            color                   : 'white',
            borderColor             : '#000000',
            borderSize              : 5,
            bottomArcRadius         : 0,
            bottomArcRadiusSweep    : 0.1,
            size                    : 0.1            
        };
                
        this._setOptions(options);
        
        this._render();
    }
    
    TopEyelid.prototype.change = function (options) {
        var self = this;
        self._setOptions(options);        
        self._setNodeAttributes(self.eyelidNode)
    }
    
    TopEyelid.prototype._setOptions = function (options) {
        // Replace default optinos
        this.options.color = options.color || this.options.color;
        this.options.borderColor = options.borderColor || this.options.borderColor;
        this.options.borderSize = options.borderSize || this.options.borderSize;
        this._setBottomArcRadius(options.bottomArcRadius || this.options.bottomArcRadius);
        this._setSize(options.size || this.options.size);   
    }
    
    TopEyelid.prototype._render = function () {
        var self = this;
        
        this.eyelidNode = this._createEyelidNode();
                
        return this;
    }
    
    TopEyelid.prototype._setBottomArcRadius = function (param) {
        this.options.bottomArcRadius = this._normolizeParam(param);        
    }
    
    TopEyelid.prototype._setSize = function (param) {
        this.options.size = this._normolizeParam(param);        
    }
        
    TopEyelid.prototype._normolizeParam = function (param) {
        if(param >= 1){
            param = 0.999;
        }
        if(param < 0){
            param = 0;
        }
        return param;
    }
    
    TopEyelid.prototype._createEyelidNode = function () {
        var eyelidNode = document.createElement("object");
        
        eyelidNode.style.position = "absolute";    
        eyelidNode.innerHTML = SVG_HTML_TEMPLATE;
        this._setNodeAttributes(eyelidNode);
        this._handlerNode.appendChild(eyelidNode); 
        
        return eyelidNode;
    }
    
    TopEyelid.prototype._setNodeAttributes = function (eyelidNode) {
        var eyelidPath = eyelidNode.querySelector("[name=top-eyelid]");
                
        eyelidPath.setAttribute("fill", this.options.color);
        eyelidPath.setAttribute("stroke", this.options.borderColor);
        eyelidPath.setAttribute("stroke-width", this.options.borderSize);
        var d = this._createPath();
        eyelidPath.setAttribute('d', d);
        return eyelidPath;
    }
    
    TopEyelid.prototype._createPath = function ( ) {
        var angle = (Math.PI/2) - (Math.PI * this.options.size);
                
        var startPointX = 60 - (Math.cos(angle) * 50 );
        var startPointY = 60 - (Math.sin(angle) * 50 );
        
        var endPointX = (60 + 60 - startPointX);
        var endPointY = startPointY;
        var d = "";
        //left start point
        d = d + "M"+startPointX+","+startPointY;
        d = this._createTopArc(d, endPointX, endPointY);
        d = this._createBottomArc(d, startPointX, startPointY);                
        
        d = d + 'z'; //close path
        return d;
    }
    
    TopEyelid.prototype._createTopArc = function (d, endPointX, endPointY) {
        var largeArcFlag = this.options.size > 0.5 ? 1 : 0;
        //top arc
        d = d + " A50,50 0 " + largeArcFlag + " 1 ";
        //right end point
        d = d + endPointX + "," + endPointY;
        return d;
    }
    
    TopEyelid.prototype._createBottomArc = function (d, endPointX, endPointY) {
        if (this.options.bottomArcRadius != 0){
            //bottom arc
            var arcRadius = 50/this.options.bottomArcRadius;
            d = d + " A" + arcRadius + "," + arcRadius + " 0 0 0 ";
            //back to start point
            d = d + endPointX + "," + endPointY;
        }
        else{
            //bottom line
            d = d + " L" + endPointX + ',' + endPointY;
        }     
        return d;
    }
    
    
    return TopEyelid;
});