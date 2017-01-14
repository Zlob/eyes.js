define(['helper'], function(Helper) {

   var Eyebrow = function (parent, options) {
       this.parent = parent;

       this.options = {
           width                   : 80,
           height                  : 5,
           position                : 0.5, //from 0 (very top) to 1 (near eye)
           color                   : '#000000',
           borderColor             : '#000000',
           borderSize              : 0,
           rotate                  : 0  //eyebrow angle, from -30 to 30
       };

       this._setOptions(options);

       this._render();
   };

    Eyebrow.prototype._setOptions = function (newOptions) {
        // Replace default options
        this.options.width = Helper.chooseOption(this.options, newOptions, 'width');
        this.options.height = Helper.chooseOption(this.options, newOptions, 'height');
        this.options.color = Helper.chooseOption(this.options, newOptions, 'color');
        this.options.borderColor = Helper.chooseOption(this.options, newOptions, 'borderColor');
        this.options.borderSize = Helper.chooseOption(this.options, newOptions, 'borderSize');
        this._setRotate(Helper.chooseOption(this.options, newOptions, 'rotate'));
    };

    Eyebrow.prototype._setRotate = function (param) {
        if(param < -25){
            param = -25;
        } else if(param > 25){
            param = 25;
        }
        this.options.rotate = param;
    };

    Eyebrow.prototype._render = function () {
        this.eyebrowNode = this._createEyebrowNode();
        return this;
    };

    Eyebrow.prototype.change = function (options) {
        var self = this;
        self._setOptions(options);
        self._setNodeAttributes(self.eyebrowNode);
    };

    Eyebrow.prototype._createEyebrowNode = function () {
        var eyebrowNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var eyebrowPathNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        eyebrowPathNode.setAttribute('name', 'eyebrow');
        eyebrowNode.appendChild(eyebrowPathNode);

        this._setNodeAttributes(eyebrowNode);
        this.parent.append(eyebrowNode);

        return eyebrowNode;
    };

    Eyebrow.prototype._setNodeAttributes = function (eyelidNode) {
        var eyelidPath = eyelidNode.querySelector("[name=eyebrow]");


        eyelidPath.setAttribute("width", this.options.width);
        eyelidPath.setAttribute("height", this.options.height);
        var x = 90 - this.options.width / 2;
        eyelidPath.setAttribute("x", x);
        var y = this._getY(this.options.height, this.options.borderSize, this.options.position);
        eyelidPath.setAttribute("y", y);
        eyelidPath.setAttribute("stroke", this.options.borderColor);
        eyelidPath.setAttribute("stroke-width", this.options.borderSize);
        eyelidPath.setAttribute("fill", this.options.color);
        eyelidPath.setAttribute("transform", "rotate(" + this.options.rotate + ", 90, 90)");
        return eyelidPath;
    };

    Eyebrow.prototype._getY = function (h, borderSize, position)  {
        return (90 - 50 - h - borderSize) * position;
    };

    Eyebrow.prototype.changeByDiff = function (diff) {
        var newOptions = {};
        for (var key in diff) {
            newOptions[key] = Helper.getCalculatedOption(this.options[key], diff[key]);
        }
        return newOptions;
    };

    return Eyebrow;
});