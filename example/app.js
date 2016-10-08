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
    var firstEye = animator.createEye('#img1');
    }
);