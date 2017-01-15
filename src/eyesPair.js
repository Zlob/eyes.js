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

    EyesPair.prototype.emote = function(type, duration) {
        duration = duration || 1000;
        if (type == 'angry') {
            var options = {
                eyeball: {
                    rotate: 3.14
                },
                topEyelid: {
                    size: 0.3,
                    rotate: 20,
                    bottomArcRadiusSweep: 1,
                    bottomArcRadius: 0
                },
                bottomEyelid: {
                    size: 0.3,
                    rotate: -20,
                    topArcRadius: 0,
                    topArcRadiusSweep: 0
                },
                eyebrow: {
                    position: 0.8,
                    rotate: 20
                }
            };
            this.animate(options, duration);
        } else if (type == 'suspecting') {
            var options = {
                eyeball: {
                    rotate: 3.14
                },
                topEyelid: {
                    size: 0.4,
                    rotate: 0,
                    bottomArcRadiusSweep: 1,
                    bottomArcRadius: 0
                },
                bottomEyelid: {
                    size: 0.4,
                    rotate: 0,
                    topArcRadius: 0,
                    topArcRadiusSweep: 0
                },
                eyebrow: {
                    position: 0.9,
                    rotate: 0
                }
            };
            this.animate(options, duration);
        } else if (type == 'happy') {
            var options = {
                eyeball: {
                    rotate: 3.14
                },
                topEyelid: {
                    size: 0.4,
                    rotate: 0,
                    bottomArcRadiusSweep: 1,
                    bottomArcRadius: 0.3
                },
                bottomEyelid: {
                    size: 0.4,
                    rotate: 0,
                    topArcRadius: 0.3,
                    topArcRadiusSweep: 0
                },
                eyebrow: {
                    position: 0.5,
                    rotate: 0
                }
            };
            this.animate(options, duration);
        } else if (type == 'tempting') {
            var options = {
                eyeball: {
                    rotate: 3.14
                },
                topEyelid: {
                    size: 0.4,
                    rotate: 0,
                    bottomArcRadiusSweep: 1,
                    bottomArcRadius: 0.3
                },
                bottomEyelid: {
                    size: 0,
                    rotate: 0,
                    topArcRadius: 0,
                    topArcRadiusSweep: 0
                },
                eyebrow: {
                    position: 0.5,
                    rotate: 0
                }
            };
            this.animate(options, duration);
        } else if (type == 'sad') {
            var options = {
                eyeball: {
                    rotate: 1.7
                },
                topEyelid: {
                    size: 0.3,
                    rotate: -20,
                    bottomArcRadiusSweep: 1,
                    bottomArcRadius: 0.5
                },
                bottomEyelid: {
                    size: 0,
                    rotate: 0
                },
                eyebrow: {
                    position: 0.9,
                    rotate: -20
                }
            };
            this.animate(options, duration);
        }
    };

    return EyesPair;
});