/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 05:48 PM
* To change this template use Tools | Templates.
*/
define(function() {

    var Eyeball = function (parent, options) {
                        
        this.parent = parent;
        
        this.options = {
            size       : 12,
            shift      : 20
        };

        this._setOptions(options);
        this._render();
    };
    
    Eyeball.prototype.track  = function (options) {
        if(options.angle){
            this._trackByAngle(options.angle, options.shift);
        }
        else if(options.x && options.y){
            this.trackByCoordinate(options.x, options.y, options.shift)
        }
    };

    Eyeball.prototype._setOptions = function (options) {
        for( var key in options ) {
            this.options[key] = options[key];
        }
    };

    Eyeball.prototype._render = function () {
        this.eyeballNode = this._createEyeballNode();
        return this;
    };

    Eyeball.prototype.change = function (options) {
        var self = this;
        self._setOptions(options);
        self._setNodeAttributes(this.eyeballNode);
    };
    
    Eyeball.prototype._createEyeballNode = function () {
        var eyeballNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var pathNode = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pathNode.setAttribute('name', 'eyeball');
        eyeballNode.appendChild(pathNode);
        this._setNodeAttributes(eyeballNode);
        this.parent.append(eyeballNode); 
        
        return eyeballNode;
    };
    
    Eyeball.prototype._setNodeAttributes = function (eyeballNode) {
        var eyeballPath = eyeballNode.querySelector("[name=eyeball]");
        
        eyeballPath.setAttribute("fill", "#000000");
        eyeballPath.setAttribute("stroke", "#000000");
        eyeballPath.setAttribute("stroke-width", 5);
        eyeballPath.setAttribute("stroke-linejoin", null);
        eyeballPath.setAttribute("stroke-linecap", null);
        eyeballPath.setAttribute("cx", 90 + parseInt(this.options["shift"]));
        eyeballPath.setAttribute("cy", 90);
        eyeballPath.setAttribute("r", this.options["size"]);

        return eyeballPath;
    };
    
    Eyeball.prototype._trackByAngle = function (angle, shift) {
        shift = shift || this.options['shift'];
                
        var x = 90 + shift * Math.cos(angle);
        var y = 90 + shift * Math.sin(angle);
        
        this._setEyeballCoordinates(x,y);
    };
    
    Eyeball.prototype.trackByCoordinate = function (x1, y1, shift) {
        shift = shift || this.options['shift'];
              
        //eye center
        var eyeCenter = this._getEyeballCoordinates();          
           
        //distance between eye center and point
        var d = Math.sqrt(Math.pow(eyeCenter.x - x1, 2) + Math.pow(eyeCenter.y - y1, 2));
        if (d <= shift) {
            shift = d;
        }
        //eyeball position
        var x = 90 - (eyeCenter.x - x1) / d * shift;
        var y = 90 - (eyeCenter.y - y1) / d * shift;

        this._setEyeballCoordinates(x,y);
    };
    
    Eyeball.prototype._setEyeballCoordinates = function (x, y) {
        var eyeballPath = this.eyeballNode.querySelector("[name=eyeball]");
        eyeballPath.setAttribute("cx", x);
        eyeballPath.setAttribute("cy", y)
    };
    
    Eyeball.prototype._getEyeballCoordinates = function () {
        var eyeballNodePosition = this.eyeballNode.getBoundingClientRect();
        var x = eyeballNodePosition.left + eyeballNodePosition.width/2;
        var y = eyeballNodePosition.top  + eyeballNodePosition.height/2;
        return { x: x, y: y };
    };
        
    return Eyeball;
});