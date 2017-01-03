/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-09
* Time: 08:52 AM
* To change this template use Tools | Templates.
*/
define(function() {
    
    var BottomEyelid = function (parent, options) {
        this.parent = parent;
        
        this.options = {
            //from 0 when open to 1 when closed
            size                    : 0,
            color                   : 'white',
            borderColor             : '#000000',
            borderSize              : 5,
            //from 0 to 1, 0 if straight, 1 if rounded
            topArcRadius            : 0,
            //arc direction, 0  or 1
            topArcRadiusSweep       : 0,
            //eyelid angle, from -30 to 30
            rotate                  : 0
        };
                
        this._setOptions(options);
        
        this._render();
    };
    
    BottomEyelid.prototype.change = function (options) {
        var self = this;
        self._setOptions(options);        
        self._setNodeAttributes(self.eyelidNode)
    };
    
    BottomEyelid.prototype._setOptions = function (options) {
        // Replace default optinos
        this.options.color = options.color || this.options.color;
        this.options.borderColor = options.borderColor || this.options.borderColor;
        this.options.borderSize = options.borderSize || this.options.borderSize;
        this.options.topArcRadiusSweep = options.topArcRadiusSweep != undefined ? options.topArcRadiusSweep : this.options.topArcRadiusSweep;
        this._setRotate(options.rotate || this.options.rotate);
        this._setTopArcRadius(options.topArcRadius || this.options.topArcRadius);
        this._setSize(options.size || this.options.size);   
    };
    
    BottomEyelid.prototype._render = function () {
        this.eyelidNode = this._createEyelidNode();
        return this;
    };
    
    BottomEyelid.prototype._setTopArcRadius = function (param) {
        this.options.topArcRadius = this._normolizeParam(param);        
    };
    
    BottomEyelid.prototype._setRotate = function (param) {
        if(param < -30){
            param = -30;
        } else if(param > 30){
            param  = 30;
        }        
        this.options.rotate = param;        
    };
    
    BottomEyelid.prototype._setSize = function (param) {
        this.options.size = this._normolizeParam(param);        
    };
        
    BottomEyelid.prototype._normolizeParam = function (param) {
        if(param >= 1){
            param = 0.999;
        }
        if(param < 0){
            param = 0;
        }
        return param;
    };
    
    BottomEyelid.prototype._createEyelidNode = function () {
        var eyelidNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathNode.setAttribute('name', 'bottom-eyelid');
        eyelidNode.appendChild(pathNode);
        this._setNodeAttributes(eyelidNode);
        this.parent.append(eyelidNode); 
        
        return eyelidNode;
    };
    
    BottomEyelid.prototype._setNodeAttributes = function (eyelidNode) {
        var eyelidPath = eyelidNode.querySelector("[name=bottom-eyelid]");
                
        eyelidPath.setAttribute("fill", this.options.color);
        eyelidPath.setAttribute("stroke", this.options.borderColor);
        eyelidPath.setAttribute("stroke-width", this.options.borderSize);
        eyelidPath.setAttribute("transform", "rotate("+this.options.rotate + ", 90, 90)");
        var d = this._createPath();
        eyelidPath.setAttribute('d', d);
        return eyelidPath;
    };
    
    BottomEyelid.prototype._createPath = function ( ) {
        var angle = (Math.PI/2) - (Math.PI * this.options.size);
                
        var startPointX = 90 - (Math.cos(angle) * 50 );
        var startPointY = 90 + (Math.sin(angle) * 50 );
        
        var endPointX = (90 + 90 - startPointX);
        var endPointY = startPointY;
        var d = "";
        //left start point
        d = d + "M"+startPointX+","+startPointY;
        d = this._createTopArc(d, endPointX, endPointY);
        d = this._createBottomArc(d, startPointX, startPointY);        
        
        d = d + 'z'; //close path
        return d;
    };
    
    BottomEyelid.prototype._createTopArc = function (d, endPointX, endPointY) {
        if (this.options.topArcRadius != 0){
            //bottom arc
            var arcRadius = 50 / this.options.topArcRadius;
            d = d + " A" + arcRadius + "," + arcRadius + " 0 0 " + this.options.topArcRadiusSweep;
            //back to start point
            d = d + endPointX + "," + endPointY;
        }
        else{
            //bottom line
            d = d + " L" + endPointX + ',' + endPointY;
        }     
        return d;
    };
    
    BottomEyelid.prototype._createBottomArc = function (d, endPointX, endPointY) {
        var largeArcFlag = this.options.size > 0.5 ? 1 : 0;
        //top arc
        d = d + " A50,50 0 " + largeArcFlag + " 1 ";
        //right end point
        d = d + endPointX + "," + endPointY;
        return d;
    };
    
    return BottomEyelid;
});