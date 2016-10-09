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
            borderSize    : 5,
            "eyeballSize"       : 12,
            "eyeballShift"      : 10,
        });
    
    window.addEventListener("mousemove", function( e ) {
                firstEye.eyeball.track({x: e.x, y: e.y, shift: 10});
            }, false);
    
    
    var secondEye = animator.createEye(
        '#img1',
        {
            x : 100,
            y : 30,
            size          : 50,
            color         : "red",
            borderColor   : "brown",
            borderSize    : 5,
            "eyeballSize"       : 12,
            "eyeballShift"      : 10,
        });
    
    var angle = 1;
    window.addEventListener("mousemove", function( e ) {
                secondEye.eyeball.track({angle: angle++, shift: 10});
    }, false);
    
    
    var thirdEye = animator.createEye(
        '#img2',
        {
            x : 100,
            y : 30,
            size          : 50,
            color         : "red",
            borderColor   : "brown",
            borderSize    : 5,
            eyeballSize       : 12,
            eyeballShift      : 10,
        });
    
    var topEyelidSize = 0;
    var topEyelidBottomArc = 0;
    window.addEventListener("mousemove", function( e ) {       
        topEyelidBottomArc+=0.001;
        console.log(topEyelidBottomArc);
        topEyelidSize+=0.001;
        
        thirdEye.topEyelid.change({
            size: topEyelidSize,
            bottomArc: topEyelidBottomArc
        });
    }, false);
    
//     setInterval(function()  {
//         firstEye.move(100,100)
//     }, 1000)
    }
);