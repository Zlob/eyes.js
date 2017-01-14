define(function () {

    var Obj = {
        isNumeric: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        chooseOption: function (oldOptions, newOptions, optionName) {
            if (newOptions[optionName] != undefined) {
                return newOptions[optionName];
            } else {
                return oldOptions[optionName];
            }
        },

        getOptionDiff: function (oldOption, newOption, duration) {
            var diff = 0;
            if (this.isNumeric(oldOption)) {
                diff = (newOption - oldOption) / duration;
            }
            return diff;
        },

        getOptionsDiff: function (oldOptions, newOptions, duration) {
            var diff = {};
            for (var key in newOptions) {
                diff[key] = this.getOptionDiff(oldOptions[key], newOptions[key], duration);
            }
            return diff;
        },

        getCalculatedOption: function (oldOption, newOption) {
            if (this.isNumeric(oldOption) && this.isNumeric(newOption)) {
                return oldOption + newOption;
            } else {
                return oldOption;
            }
        }


    };

    return Obj;
});