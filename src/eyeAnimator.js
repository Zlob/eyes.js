/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 05:22 PM
* To change this template use Tools | Templates.
*/
define(['eye'], function(Eye) {
    
    var eyeAnimator = function () {
        var self = this;
        
        var eyes = [];
        
        this.createEye = function (selector, options) {
            var eye = new Eye(selector, options);
            eyes.push(eye);
            return eye
        }
        
        this._resize = function () {
            for( var idx in eyes ) {
                eyes[idx].moveToPosition();
            }
        }
        
        window.addEventListener("resize", function( e ) {
            self._resize();
        }, false);
        
    }
    
    return eyeAnimator;
});