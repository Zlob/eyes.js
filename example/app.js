/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 04:50 PM
* To change this template use Tools | Templates.
*/

require.config({
    // baseUrl: "../src",
    paths: {
        "eyeAnimator": "eyeAnimator/dist/eyeAnimator",
        "jquery"    : "bower_components/jquery/dist/jquery.min"
    },
    waitSeconds: 15
});

require( ['eyeAnimator', 'jquery'], function( EyeAnimator ){
    var animator = new EyeAnimator();
    var firstEye = animator.createEye(
        '#img1',
        {
            x             : 44,
            y             : 20,
            size          : 50,
            color         : "white",
            borderColor   : "black",
            borderSize    : 5,
            type          : "left",
            //eyeball options
            eyeball: {
                size     : 12,
                shift    : 20
            },
            //top eyelid options
            topEyelid: {
                size                   : 0.5,
                color                  : "#f7b6a4",
                borderColor            : "#000000",
                borderSize             : 5,
                bottomArcRadius        : 0.3,
                bottomArcRadiusSweep   : 1,
                eyelashesStyle         : 'loise',
            },
            //bottom eyelid options
            bottomEyelid: {
                size                   : 0.5,
                color                  : "#f7b6a4",
                borderColor            : "#000000",
                borderSize             : 5,
                topArcRadius           : 0.3,
                topArcRadiusSweep      : 1
            },
            eyebrow: {
                rotate: -20
            }
        });
    
    
    var secondEye = animator.createEye(
        '#img1',
        {
            x             : 83,
            y             : 20,
            size          : 50,
            color         : "white",
            borderColor   : "black",
            borderSize    : 5,
            type          : "right",
            //eyeball options
            eyeball: {
                size     : 12,
                shift    : 20
            },
            //top eyelid options
            topEyelid: {
                size                   : 0.3,
                color                  : "#f7b6a4",
                borderColor            : "#000000",
                borderSize             : 5,
                bottomArcRadius        : 0,
                bottomArcRadiusSweep   : 0,
                eyelashesStyle         : 'loise'
            },
            //bottom eyelid options
            bottomEyelid: {
                size                   : 0.3,
                color                  : "#f7b6a4",
                borderColor            : "#000000",
                borderSize             : 5,
                topArcRadius           : 0,
                topArcRadiusSweep      : 0
            },
            eyebrow: {
                rotate: 20
            }
        });
    
//     window.addEventListener("mousemove", function( e ) {
//         firstEye.eyeball.track({x: e.x, y: e.y});
//         secondEye.eyeball.track({x: e.x, y: e.y});
//     }, false);

    }
);