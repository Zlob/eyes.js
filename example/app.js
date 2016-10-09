/**
* Created with EyeAnimator.
* User: vamakin
* Date: 2016-10-08
* Time: 04:50 PM
* To change this template use Tools | Templates.
*/

require.config({
    baseUrl: "/eyeAnimator/src",
    paths: {
        "eyeAnimator": "eyeAnimator"
    },
    waitSeconds: 15
});

require( ['eyeAnimator'], function( EyeAnimator ){
    var animator = new EyeAnimator();
    var firstEye = animator.createEye(
        '#img1',
        {
            x : 60,
            y : 30,
            size          : 50,
            color         : "red",
            borderColor   : "brown",
            borderSize    : 10,
            "eyeballSize"       : 12,
            "eyeballShift"      : 10,
        });
    
    window.addEventListener("mousemove", function( e ) {
                firstEye.track({x: e.x, y: e.y, shift: 10});
            }, false);
//     setInterval(function()  {
//         firstEye.move(100,100)
//     }, 1000)
    }
);