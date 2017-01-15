define(['helper'], function(Helper) {
    
    var TopEyelid = function (parent, type, options) {

        this.parent = parent;

        this.type = type;
        
        this.options = {
            size                   : 0, //from 0 when open to 1 when closed
            color                  : "white",
            borderColor            : "#000000",
            borderSize             : 5,
            bottomArcRadius        : 0, //from 0 (straight line) to 1 (circle)
            bottomArcRadiusSweep   : 0, //from 0 to 0.5 (if top arc of circle) or from 0.5 to 1 (if bottom arc of circle)
            rotate                 : 0, //eyelid angle, from -30 to 30
            eyelashesStyle         : 'none' //'none' (without eyelashes) or 'loise' (with eyelashes)
        };
                
        this._setOptions(options);
        
        this._render();
    };
    
    TopEyelid.prototype.change = function (options) {
        var self = this;
        self._setOptions(options);        
        self._setNodeAttributes(self.eyelidNode)
    };
    
    TopEyelid.prototype._setOptions = function (newOptions) {
        // Replace default options
        this.options.color = Helper.chooseOption(this.options, newOptions, 'color');
        this.options.borderColor = Helper.chooseOption(this.options, newOptions, 'borderColor');
        this.options.borderSize = Helper.chooseOption(this.options, newOptions, 'borderSize');
        this.options.eyelashesStyle = Helper.chooseOption(this.options, newOptions, 'eyelashesStyle');
        this.options.bottomArcRadiusSweep = Helper.chooseOption(this.options, newOptions, 'bottomArcRadiusSweep');
        this._setRotate(Helper.chooseOption(this.options, newOptions, 'rotate'));
        this._setBottomArcRadius(Helper.chooseOption(this.options, newOptions, 'bottomArcRadius'));
        this._setSize(Helper.chooseOption(this.options, newOptions, 'size'));
    };

    TopEyelid.prototype._render = function () {
        this.eyelidNode = this._createEyelidNode();
        return this;
    };
    
    TopEyelid.prototype._setBottomArcRadius = function (param) {
        this.options.bottomArcRadius = this._normolizeParam(param);        
    };
    
    TopEyelid.prototype._setRotate = function (param) {
        if(param < -30){
            param = -30;
        } else if(param > 30){
            param  = 30;
        }        
        this.options.rotate = param;        
    };
        
    TopEyelid.prototype._setSize = function (param) {
        this.options.size = this._normolizeParam(param);        
    };
        
    TopEyelid.prototype._normolizeParam = function (param) {
        if(param >= 1){
            param = 0.999;
        }
        if(param < 0){
            param = 0;
        }
        return param;
    };

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
    };
    
    TopEyelid.prototype._setNodeAttributes = function (eyelidNode) {
        var eyelidPath = eyelidNode.querySelector("[name=top-eyelid]");
                
        eyelidPath.setAttribute("fill", this.options.color);
        eyelidPath.setAttribute("stroke", this.options.borderColor);
        eyelidPath.setAttribute("stroke-width", this.options.borderSize);
        var rotate = this.parent.options.type == 'left' ? this.options.rotate : -this.options.rotate;
        eyelidPath.setAttribute("transform", "rotate("+rotate + ", 90, 90)");
        var d = this._createPath();
        eyelidPath.setAttribute('d', d);
        return eyelidPath;
    };
    
    TopEyelid.prototype._createPath = function ( ) {
        var angle = (Math.PI / 2) - (Math.PI * this.options.size);

        var startPointX = 90 - (Math.cos(angle) * 50 );
        var startPointY = 90 - (Math.sin(angle) * 50 );

        var endPointX = (90 + 90 - startPointX);
        var endPointY = startPointY;
        var d = "";
        //left start point
        d = d + "M" + startPointX + "," + startPointY;
        d = this._createTopArc(d, endPointX, endPointY);
        d = this._createBottomArc(d, startPointX, startPointY);
        if (this.options.eyelashesStyle == 'loise') {
            if (this.type == 'right') {
                d += this._createEyelashes(endPointX, endPointY, this.type);
            }
            else {
                d += this._createEyelashes(startPointX, startPointY, this.type);
            }
        }

        d = d + 'z'; //close path
        return d;
    };
    
    TopEyelid.prototype._createTopArc = function (d, endPointX, endPointY) {
        var largeArcFlag = this.options.size > 0.5 ? 1 : 0;
        //top arc
        d = d + " A50,50 0 " + largeArcFlag + " 1 ";
        //right end point
        d = d + endPointX + "," + endPointY;
        return d;
    };
    
    TopEyelid.prototype._createBottomArc = function (d, endPointX, endPointY) {
        if (this.options.bottomArcRadius != 0){
            //bottom arc
            var arcRadius = 50 / this.options.bottomArcRadius;
            d = d + " A" + arcRadius + "," + arcRadius + " 0 0 " + this._getRadiusSweep();
            //back to start point
            d = d + " " + endPointX + "," + endPointY;
        }
        else{
            //bottom line
            d = d + " L" + endPointX + ',' + endPointY;
        }     
        return d;
    };
    
    
    TopEyelid.prototype._createEyelashes = function (x, y, position) {
        var d = this._createFirstEyelash(x, y, position);
        d += this._createSecondEyelash(x, y, position);
        return d;
    };
    
    TopEyelid.prototype._createFirstEyelash = function (x, y, position) {
        var eyeLashCenterX = position == 'right' ? x + 10 : x - 10;
        var eyeLashCenterY = y;
        var eyeLashEndX = position == 'right' ? x + 15 : x -15;
        var eyeLashEndY = y - 15;
        
        return this._createEyelash(x, y, eyeLashCenterX, eyeLashCenterY, eyeLashEndX, eyeLashEndY); 
    };
    
    TopEyelid.prototype._createSecondEyelash = function (x, y, position) {
        var eyeLashCenterX = position == 'right' ? x + 25 : x - 25;
        var eyeLashCenterY = y;
        var eyeLashEndX = position == 'right' ? x + 25 : x - 25;
        var eyeLashEndY = y - 10;

        return this._createEyelash(x, y, eyeLashCenterX, eyeLashCenterY, eyeLashEndX, eyeLashEndY);
    };
    
    TopEyelid.prototype._createEyelash = function (startX, startY, centerX, centerY, endX, endY) {
        var d = " M " + startX + "," + startY;
        d += " Q" + centerX + "," + centerY + " " + endX + "," + endY + " ";
        //way back
        d += " Q" + centerX + "," + centerY + " " + startX + "," + startY + " ";
        return d;
    };

    TopEyelid.prototype._getRadiusSweep = function () {
        if (this.options.bottomArcRadiusSweep <= 0.5) {
            return 0;
        } else {
            return 1;
        }
    };

    TopEyelid.prototype.changeByDiff = function (diff) {
        var newOptions = {};
        for (var key in diff) {
            newOptions[key] = Helper.getCalculatedOption(this.options[key], diff[key]);
        }
        return newOptions;
    };

    return TopEyelid;
});