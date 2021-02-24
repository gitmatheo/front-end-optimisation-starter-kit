requirejs.config({
    paths: {
        "jquery"     : "vendor/jquery",
        "tweenmax"   : "vendor/TweenMax.min",
        "async"      : "components/async",
        "google"     : "components/google",
        "waypoints"  : "components/waypoints.min"
    },

    shim: {
        'bxslider': {
          deps: ['jquery']
        },
        'waypoints': {
          deps: ['jquery']
        }
    }

});