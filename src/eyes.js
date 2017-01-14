define(['eye', 'eyesPair'], function(Eye, EyesPair) {
    
    var Eyes = function () {
        var self = this;
        
        var eyes = [];
        
        this.createEye = function (selector, options) {
            var eye = new Eye(selector, options);
            eyes.push(eye);
            return eye
        };

        this.createEyesPair = function (selector, options, center, distance) {
            var eyesPair = new EyesPair(selector, options, center, distance);
            eyes.push(eyesPair);
            return eyesPair
        };
        
        this._resize = function () {
            for( var idx in eyes ) {
                eyes[idx].moveToPosition();
            }
        };
        
        window.addEventListener("resize", function( e ) {
            self._resize();
        }, false);
        
    };
    
    return Eyes;
});