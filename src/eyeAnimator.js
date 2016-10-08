/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 05:22 PM
* To change this template use Tools | Templates.
*/
define(['eye'], function(Eye) {
    
    var eyeAnimator = function() {
        this.createEye = function(selector, options) {
            return new Eye(selector, options);        
        }        
    }
    
    return eyeAnimator;
});