/**
 * Created by Zloblin on 13.10.2016.
 */
define(['eye'], function (Eye) {

    var EyesPair = function (options, center, distance) {

        this.leftEyeOptons = this._getEye(options, center, distance, 'left');
        this.rightEyeOptons = this._getEye(options, center, distance, 'right');
    };

    EyesPair.prototype._getEye = function (options, center, distance, type) {
        var eyeOptons = JSON.parse(JSON.stringify(options));
        eyeOptons.type = type;
        if (type == 'left') {
            eyeOptons.x = center.x - distance/2;
            eyeOptons.y = center.y;
        } else if (type == 'right') {
            eyeOptons.x = center.x + distance/2;
            eyeOptons.y = center.y;
        }
        return new Eye(eyeOptons);
    };

    return EyesPair;
});