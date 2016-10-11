/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-09
* Time: 08:52 AM
* To change this template use Tools | Templates.
*/
define(function() {
    
    var TopEyelid = function (parent, options) {
        var self = this;
                        
        this.parent = parent;
        
        this.options = {
            //from 0 when open to 1 when closed
            size                    : 0,  
            color                   : 'white',
            borderColor             : '#000000',
            borderSize              : 5,
            //from 0 to 1, 0 if straight, 1 if rounded
            bottomArcRadius         : 0,
            //arc direction, 0  or 1
            bottomArcRadiusSweep    : 0,
            //none or loise
            eyelashesStyle          : 'none',
            //none, left or right
            eyelashesPosition       : 'none'
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
        this.options.eyelashesStyle = options.eyelashesStyle || this.options.eyelashesStyle;
        this.options.eyelashesPosition = options.eyelashesPosition || this.options.eyelashesPosition;
        this.options.bottomArcRadiusSweep = options.bottomArcRadiusSweep || this.options.bottomArcRadiusSweep;
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
        var eyelidNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var eyelidPathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
        eyelidPathNode.setAttribute('name', 'top-eyelid');
        eyelidNode.appendChild(eyelidPathNode);
        
        var eyelashesPathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
        eyelashesPathNode.setAttribute('name', 'top-eyelashes');
        eyelidNode.appendChild(eyelashesPathNode);
        
        this._setNodeAttributes(eyelidNode);
        this.parent.append(eyelidNode); 

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
                
        var startPointX = 90 - (Math.cos(angle) * 50 );
        var startPointY = 90 - (Math.sin(angle) * 50 );
        
        var endPointX = (90 + 90 - startPointX);
        var endPointY = startPointY;
        var d = "";
        //left start point
        d = d + "M"+startPointX+","+startPointY;
        d = this._createTopArc(d, endPointX, endPointY);
        d = this._createBottomArc(d, startPointX, startPointY);
        if (this.options.eyelashesStyle == 'loise') {
            if (this.options.eyelashesPosition == 'right') {
                d += this._createEyelashes(endPointX, endPointY, this.options.eyelashesPosition);            
            }
            else {
                d += this._createEyelashes(startPointX, startPointY, this.options.eyelashesPosition);  
            }
        }        
        
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
            var arcRadius = 50 / this.options.bottomArcRadius;
            d = d + " A" + arcRadius + "," + arcRadius + " 0 0 " + this.options.bottomArcRadiusSweep;
            //back to start point
            d = d + " " + endPointX + "," + endPointY;
        }
        else{
            //bottom line
            d = d + " L" + endPointX + ',' + endPointY;
        }     
        return d;
    }
    
    
    TopEyelid.prototype._createEyelashes = function (x, y, position) {
        var d = this._createFirstEyelash(x, y, position);
        d += this._createSecondEyelash(x, y, position);
        return d;
    }
    
    TopEyelid.prototype._createFirstEyelash = function (x, y, position) {
        var d = "";
        var eyeLashCenterX = position == 'right' ? x + 10 : x - 10;
        var eyeLashCenterY = y;
        var eyeLashEndX = position == 'right' ? x + 15 : x -15;
        var eyeLashEndY = y - 15;
        
        return this._createEyelash(x, y, eyeLashCenterX, eyeLashCenterY, eyeLashEndX, eyeLashEndY); 
    }
    
    TopEyelid.prototype._createSecondEyelash = function (x, y, position) {
        var eyeLashCenterX = position == 'right' ? x + 25 : x - 25;
        var eyeLashCenterY = y;
        var eyeLashEndX = position == 'right' ? x + 25 : x - 25;
        var eyeLashEndY = y - 10;

        return this._createEyelash(x, y, eyeLashCenterX, eyeLashCenterY, eyeLashEndX, eyeLashEndY);
    }
    
    TopEyelid.prototype._createEyelash = function (startX, startY, centerX, centerY, endX, endY) {
        var d = " M " + startX + "," + startY;
        d += " Q" + centerX + "," + centerY + " " + endX + "," + endY + " ";
        //way back
        d += " Q" + centerX + "," + centerY + " " + startX + "," + startY + " ";
        return d;
    }

        
    
    return TopEyelid;
});