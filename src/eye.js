define(['eyeball', 'topEyelid', 'bottomEyelid', 'eyebrow', 'helper'], function(Eyeball, TopEyelid, BottomEyelid, Eyebrow, Helper) {
    
    var SVG_HTML_TEMPLATE = [
        '<svg name="svg-node" width="50" height="50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">',
        ' <g>',
        '  <circle name="eye" cx="90" cy="90" r="50" />',
        ' </g>',
        '</svg>'
    ].join("");
    
    var Eye = function (selector, options) {
        this.selector = selector;

        this._element = document.querySelector( selector );

        if ( !this._element ) {
            throw new Error("Not valid image selector");
        }
        
        // Default options
        this.options = {
            x             : 0,
            y             : 0,
            size          : 50,
            color         : "#FFFFFF",
            borderColor   : "#000000",
            borderSize    : 5,
            type          : 'left',     //left or right
            //eyeball options
            eyeball: {
                size     : 12,
                shift    : 20,
                rotate     : 3.14 //from 0 to 2*PI
            },
            //top eyelid options
            topEyelid: {
                size                   : 0, //from 0 when open to 1 when closed
                color                  : "white",
                borderColor            : "#000000",
                borderSize             : 5,
                bottomArcRadius        : 0, //from 0 (straight line) to 1 (circle)
                bottomArcRadiusSweep   : 0, //0 (if top arc of circle) or 1 (if bottom arc of circle)
                rotate                 : 0, //eyelid angle, from -30 to 30
                eyelashesStyle         : 'none' //'none' (without eyelashes) or 'loise' (with eyelashes)
            },
            //bottom eyelid options
            bottomEyelid: {
                size                   : 0, //from 0 when open to 1 when closed
                color                  : "white",
                borderColor            : "#000000",
                borderSize             : 5,
                topArcRadius           : 0, //from 0 (straight line) to 1 (circle)
                topArcRadiusSweep      : 0, //0 (if bottom arc of circle) or 1 (if top arc of circle)
                rotate                 : 0  //eyelid angle, from -30 to 30
            },
            eyebrow: {
                width                   : 80,
                height                  : 5,
                position                : 0.5, //from 0 (very top) to 1 (near eye)
                color                   : '#000000',
                borderColor             : '#000000',
                borderSize              : 0,
                rotate                  : 0  //eyebrow angle, from -30 to 30
            }
        };

        this.animationIntervalId = null;

        this._setOptions(options);
        this._render();
    };

    Eye.prototype._setOptions = function (options) {
        // Replace default options
        for( var key in options ) {
            this.options[key] = options[key];
        }
    };
    
    Eye.prototype.moveToPosition = function ( ) {
        this.move( this.options["x"], this.options["y"] );  
    };
        
    // Relative to parent image
    Eye.prototype.move = function ( x, y ) {
        var parentPosition = this._element.getBoundingClientRect();
        this._handlerNode.style.position = "absolute";
        this._handlerNode.style.left = parentPosition["left"] + (x + pageXOffset) + "px";
        this._handlerNode.style.top  = parentPosition["top"]  + (y + pageYOffset) + "px";
    };
    
    //append node
    Eye.prototype.append = function ( node ) {   
        this._handlerNode.querySelector("[name=svg-node]").appendChild(node);
    };

    Eye.prototype.change = function (options) {
        for (var key in options) {
            if (key == 'eyeball') {
                this.eyeball.change(options[key]);
            } else if (key == 'topEyelid') {
                this.topEyelid.change(options[key]);
            } else if (key == 'bottomEyelid') {
                this.bottomEyelid.change(options[key]);
            } else if (key == 'eyebrow') {
                this.eyebrow.change(options[key]);
            } else {
                if (this.options[key] !== undefined) {
                    this.options[key] = options[key];
                }
            }
        }
        this._setNodeAttributes(this._eyeNode);
        this.moveToPosition();
    };

    Eye.prototype.changeByDiff = function (diff) {
        var newOptions = {};
        for (var key in diff) {
            if (typeof diff[key] === 'object') {
                newOptions[key] = this[key].changeByDiff(diff[key]);
            } else {
                newOptions[key] = Helper.getCalculatedOption(this.options[key], diff[key]);
            }
        }
        this.change(newOptions);
    };

    Eye.prototype.animate = function (options, duration) {
        var period = 10; //ms between changes;
        var diff = this._getOptionsDiff(options, duration / period);
        return this._startAnimation(diff, duration, period);
    };

    Eye.prototype.stopAnimation = function () {
        var self = this;
        clearInterval(self.animationIntervalId);
    };

    Eye.prototype._getOptionsDiff = function (options, duration) {
        var diff = {};
        for (var key in options) {
            if (typeof options[key] === 'object') {
                diff[key] = Helper.getOptionsDiff(this[key].options, options[key], duration);
            } else {
                diff[key] = Helper.getOptionDiff(this.options[key], options[key], duration);
            }
        }
        return diff;
    };

    Eye.prototype._startAnimation = function (diff, duration, period) {
        var self = this;
        var counter = 0;
        if (self.animationIntervalId) {
            this.stopAnimation();
        }
        var internalAnimationIntervalId = setInterval(function () {
            counter += period;
            self.changeByDiff(diff);
            if (counter >= duration) {
                if (self.animationIntervalId == internalAnimationIntervalId) {
                    self.stopAnimation();
                }
            }
        }, period);
        self.animationIntervalId = internalAnimationIntervalId;
    };

    Eye.prototype.getCoordinates = function () {
        var self = this;
        var nodePosition = self._eyeNode.getBoundingClientRect();
        var x = nodePosition.left + nodePosition.width/2;
        var y = nodePosition.top  + nodePosition.height/2;
        return { x: x, y: y };
    };
                
    Eye.prototype._render = function () {
        this._handlerNode = this._createHandlerNode(this.options["size"]);
        this._eyeNode = this._createEyeNode();
        
        this.eyeball = new Eyeball(this, this.options.eyeball);
        
        this.topEyelid = new TopEyelid(this, this.options.type, this.options.topEyelid);
        
        this.bottomEyelid = new BottomEyelid(this, this.options.bottomEyelid);

        this.eyebrow = new Eyebrow(this, this.options.eyebrow);
                
        document.body.appendChild( this._handlerNode );

        this.move( this.options.x, this.options.y );             
        
        //Set visible AFTER change position
        this._handlerNode.style.display = "block";   
    };
    
    Eye.prototype._createHandlerNode = function (size) {
        var _handlerNode = document.createElement("object");
        
        _handlerNode.style.display  = "none";
        _handlerNode.style.position = "absolute";    
        _handlerNode.setAttribute("width", size);
        _handlerNode.setAttribute("height", size);
        
        return _handlerNode;
    };
    
    Eye.prototype._createEyeNode = function () {
        var eyeNode = document.createElement("object");
        
        eyeNode.style.position = "absolute";    
        eyeNode.innerHTML = SVG_HTML_TEMPLATE;
        this._setNodeAttributes(eyeNode);
        this._handlerNode.appendChild(eyeNode); 
        
        return eyeNode;
    };
    
    Eye.prototype._setNodeAttributes = function (eyeNode) {
        var svgNode = eyeNode.querySelector("[name=svg-node]");
        svgNode.setAttribute("width", this.options['size']);
        svgNode.setAttribute("height", this.options['size']);       
        
        var eyePath = eyeNode.querySelector("[name=eye]");
        eyePath.setAttribute("fill", this.options['color']);
        eyePath.setAttribute("stroke", this.options['borderColor']);
        eyePath.setAttribute("stroke-width", this.options['borderSize']);
        
        return eyeNode;
    };

    return Eye;
});