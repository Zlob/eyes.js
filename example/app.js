require.config({
    paths: {
        "eyes": "eyes/dist/eyes.min",
        "jquery": "bower_components/jquery/dist/jquery.min"
    },
    waitSeconds: 15
});

require(['eyes', 'jquery'], function (Eyes) {
        var eyes = new Eyes();

        var headerEyesOptions = {
            size: 50,
            color: "white",
            borderColor: "black",
            borderSize: 5,
            type: "left",
            //eyeball options
            eyeball: {
                size: 12,
                shift: 15
            },
            //top eyelid options
            topEyelid: {
                size: 0,
                color: "#f7b6a4",
                borderColor: "#000000",
                borderSize: 5,
                bottomArcRadius: 0.3,
                bottomArcRadiusSweep: 1,
                eyelashesStyle: 'loise'
            },
            //bottom eyelid options
            bottomEyelid: {
                size: 0,
                color: "#f7b6a4",
                borderColor: "#000000",
                borderSize: 5,
                topArcRadius: 0.3,
                topArcRadiusSweep: 1
            }
        };

        var headerEyes = eyes.createEyesPair('#header-eyes', headerEyesOptions, {x: 75, y:0}, 50);

        window.addEventListener("mousemove", function (e) {
            var leftEye = headerEyes.getLeftEye();
            var rightEye = headerEyes.getRightEye();

            leftEye.eyeball.track({x: e.x, y: e.y});
            rightEye.eyeball.track({x: e.x, y: e.y});

            //get distance
            var leftEyeCoordinates = leftEye.getCoordinates();
            var rightEyeCoordinates = rightEye.getCoordinates();
            var center = {
                x: (leftEyeCoordinates.x + rightEyeCoordinates.x)/2,
                y: (leftEyeCoordinates.y + rightEyeCoordinates.y)/2
            };
            var d = Math.pow(Math.pow(center.x - e.x, 2) + Math.pow(center.y - e.y, 2), 0.5);
            //get rotation
            var border = 750;
            var coef = d/border;
            var rotate = -30 + 60*coef;
            var topEyelid = (1-coef) * 0.33;
            //set rotation
            var leftOptions = {
                topEyelid: {
                    size: topEyelid
                },
                bottomEyelid: {
                    size: topEyelid
                },
                eyebrow: {
                    //eyebrow angle, from -30 to 30
                    rotate: -rotate
                }
            };
            var rightOptions = {
                topEyelid: {
                    size: topEyelid
                },
                bottomEyelid: {
                    size: topEyelid
                },
                eyebrow: {
                    //eyebrow angle, from -30 to 30
                    rotate: rotate
                }
            };

            leftEye.change(leftOptions);
            rightEye.change(rightOptions);
        }, false);

        var firstEye = eyes.createEye(
            '#img1',
            {
                x: 44,
                y: 20,
                size: 50,
                color: "white",
                borderColor: "black",
                borderSize: 5,
                type: "left",
                //eyeball options
                eyeball: {
                    size: 12,
                    shift: 20
                },
                //top eyelid options
                topEyelid: {
                    size: 0.5,
                    color: "#f7b6a4",
                    borderColor: "#000000",
                    borderSize: 5,
                    bottomArcRadius: 0.3,
                    bottomArcRadiusSweep: 1,
                    eyelashesStyle: 'loise',
                },
                //bottom eyelid options
                bottomEyelid: {
                    size: 0.5,
                    color: "#f7b6a4",
                    borderColor: "#000000",
                    borderSize: 5,
                    topArcRadius: 0.3,
                    topArcRadiusSweep: 1
                },
                eyebrow: {
                    rotate: -20
                }
            });


        var secondEye = eyes.createEye(
            '#img1',
            {
                x: 83,
                y: 20,
                size: 50,
                color: "white",
                borderColor: "black",
                borderSize: 5,
                type: "right",
                //eyeball options
                eyeball: {
                    size: 12,
                    shift: 20
                },
                //top eyelid options
                topEyelid: {
                    size: 0.3,
                    color: "#f7b6a4",
                    borderColor: "#000000",
                    borderSize: 5,
                    bottomArcRadius: 0,
                    bottomArcRadiusSweep: 0,
                    eyelashesStyle: 'loise'
                },
                //bottom eyelid options
                bottomEyelid: {
                    size: 0.3,
                    color: "#f7b6a4",
                    borderColor: "#000000",
                    borderSize: 5,
                    topArcRadius: 0,
                    topArcRadiusSweep: 0
                },
                eyebrow: {
                    rotate: 20
                }
            });


    }
);