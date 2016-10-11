/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 05:48 PM
* To change this template use Tools | Templates.
*/
define(function() {
    
    var SVG_HTML_TEMPLATE = [
        '<svg width="50" height="50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">',
        ' <g>',
        '  <circle name="eyeball" fill="#000000" stroke="#000000" stroke-width="5" stroke-linejoin="null" stroke-linecap="null" cx="90" cy="90" r="12"/>',
        ' </g>',
        '</svg>'
    ].join("");
    
    var Eyeball = function (parent, options) {
        var self = this;
                        
        this.parent = parent;
        
        this.options = {
            size       : 12,
            shift      : 20,
        };
               
        // Replace default optinos
        for( var key in options ) {
            this.options[key] = options[key];
        };
        
        this._render();
    }
    
    Eyeball.prototype.track  = function (options) {
        if(options.angle){
            this._trackByAngle(options.angle, options.shift);
        }
        else if(options.x && options.y){
            this.trackByCoordinate(options.x, options.y, options.shift)
        }
    }
    
    Eyeball.prototype._render = function () {
        var self = this;
        
        this.eyeballNode = this._createEyeballNode();
                
        return this;
    }
    
    Eyeball.prototype._createEyeballNode = function () {
        var eyeballNode = document.createElement("object");
        
        eyeballNode.style.position = "absolute";    
        eyeballNode.innerHTML = SVG_HTML_TEMPLATE;
        this._setNodeAttributes(eyeballNode);
        this.parent.append(eyeballNode); 
        
        return eyeballNode;
    }
    
    Eyeball.prototype._setNodeAttributes = function (eyeballNode) {
        var eyeballPath = eyeballNode.querySelector("[name=eyeball]");
        
        eyeballPath.setAttribute("r", this.options["size"]);
        eyeballPath.setAttribute("cx", parseInt(this.options["shift"]) + parseInt(eyeballPath.getAttribute("cx")));

        return eyeballPath;
    }
    
    Eyeball.prototype._trackByAngle = function (angle, shift) {
        var shift = shift || this.options['shift'];
                
        var x = 90 + shift * Math.cos(angle);
        var y = 90 + shift * Math.sin(angle);
        
        this._setEyeballCoordinates(x,y);
    }
    
    Eyeball.prototype.trackByCoordinate = function (x1, y1, shift) {
        var shift = shift || this.options['shift'];
              
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
    }
    
    Eyeball.prototype._setEyeballCoordinates = function (x, y) {
        var eyeballPath = this.eyeballNode.querySelector("[name=eyeball]");
        eyeballPath.setAttribute("cx", x);
        eyeballPath.setAttribute("cy", y)
    }
    
    Eyeball.prototype._getEyeballCoordinates = function () {
        var eyeballNodePosition = this.eyeballNode.getBoundingClientRect();
        var x = eyeballNodePosition.left + eyeballNodePosition.width/2;
        var y = eyeballNodePosition.top  + eyeballNodePosition.height/2;
        return { x: x, y: y };
    }
        
    return Eyeball;
});