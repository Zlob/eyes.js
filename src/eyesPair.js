define(['eye'], function (Eye) {

    var EyesPair = function (selector, options, center, distance) {
        this.leftEye = this._getEye(selector, options, center, distance, 'left');
        this.rightEye = this._getEye(selector, options, center, distance, 'right');
    };

    EyesPair.prototype._getEye = function (selector, options, center, distance, type) {
        var eyeOptions = JSON.parse(JSON.stringify(options));
        eyeOptions.type = type;
        if (type == 'left') {
            eyeOptions.x = center.x - distance/2;
            eyeOptions.y = center.y;
        } else if (type == 'right') {
            eyeOptions.x = center.x + distance/2;
            eyeOptions.y = center.y;
        }
        return new Eye(selector, eyeOptions);
    };

    EyesPair.prototype.getLeftEye = function() {
        return this.leftEye;
    };

    EyesPair.prototype.getRightEye = function() {
        return this.rightEye;
    };

    EyesPair.prototype.getEye = function(type) {
        if (type == 'left') {
            return this.getLeftEye();
        } else {
            return this.getRightEye();
        }
    };

    EyesPair.prototype.moveToPosition = function() {
        this.leftEye.moveToPosition();
        this.rightEye.moveToPosition();
    };

    EyesPair.prototype.animate = function(options, duration) {
        return {
            leftEyeAnimation : this.leftEye.animate(options, duration),
            rightEyeAnimation : this.rightEye.animate(options, duration)
        };
    };

    EyesPair.prototype.stopAnimation = function() {
        this.leftEye.stopAnimation();
        this.rightEye.stopAnimation();
    };

    return EyesPair;
});