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
            shift      : 20,
            rotate     : 3.14 //from 0 to 2*PI
        };

        this._setOptions(options);
        this._render();
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
        eyeballPath.setAttribute("cx", this._getEyeballXCoordinate());
        eyeballPath.setAttribute("cy", this._getEyeballYCoordinate());
        eyeballPath.setAttribute("r", this.options["size"]);

        return eyeballPath;
    };

    Eyeball.prototype.trackByCoordinate = function (x1, y1) {
        var eyeCenter = this.parent.getCoordinates();

        var angle = Math.atan2(y1 - eyeCenter.y, x1 - eyeCenter.x);
        this.change({
            rotate  : angle
        });
    };

    Eyeball.prototype._getEyeballXCoordinate = function () {
        return (90 + this.options["shift"] * Math.cos(this.options["rotate"]));
    };

    Eyeball.prototype._getEyeballYCoordinate = function () {
        return (90 + this.options["shift"] * Math.sin(this.options["rotate"]));
    };
        
    return Eyeball;
});