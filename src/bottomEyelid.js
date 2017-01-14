define(['helper'], function(Helper) {
    
    var BottomEyelid = function (parent, options) {
        this.parent = parent;
        
        this.options = {
            size                   : 0, //from 0 when open to 1 when closed
            color                  : "white",
            borderColor            : "#000000",
            borderSize             : 5,
            topArcRadius           : 0, //from 0 (straight line) to 1 (circle)
            topArcRadiusSweep      : 0, //0 (if bottom arc of circle) or 1 (if top arc of circle)
            rotate                 : 0  //eyelid angle, from -30 to 30
        };
                
        this._setOptions(options);
        
        this._render();
    };
    
    BottomEyelid.prototype.change = function (options) {
        var self = this;
        self._setOptions(options);        
        self._setNodeAttributes(self.eyelidNode)
    };
    
    BottomEyelid.prototype._setOptions = function (newOptions) {
        // Replace default options
        this.options.color = Helper.chooseOption(this.options, newOptions, 'color');
        this.options.borderColor = Helper.chooseOption(this.options, newOptions, 'borderColor');
        this.options.borderSize = Helper.chooseOption(this.options, newOptions, 'borderSize');
        this.options.topArcRadiusSweep = Helper.chooseOption(this.options, newOptions, 'topArcRadiusSweep');
        this._setRotate(Helper.chooseOption(this.options, newOptions, 'rotate'));
        this._setTopArcRadius(Helper.chooseOption(this.options, newOptions, 'topArcRadius'));
        this._setSize(Helper.chooseOption(this.options, newOptions, 'size'));
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
            d = d + " A" + arcRadius + "," + arcRadius + " 0 0 " + this._getRadiusSweep();
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

    BottomEyelid.prototype._getRadiusSweep = function () {
        if (this.options.topArcRadiusSweep <= 0.5) {
            return 0;
        } else {
            return 1;
        }
    };

    BottomEyelid.prototype.changeByDiff = function (diff) {
        var newOptions = {};
        for (var key in diff) {
            newOptions[key] = Helper.getCalculatedOption(this.options[key], diff[key]);
        }
        return newOptions;
    };

    return BottomEyelid;
});