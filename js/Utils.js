Utils = {};

Utils.getSize = function () {
    return {
    	h:window.innerHeight - $('.header').outerHeight() - $('.footer').outerHeight(),
    	w:window.innerWidth
    };
}





