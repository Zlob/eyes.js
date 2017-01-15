define("helper",[],function(){var t={isNumeric:function(t){return!isNaN(parseFloat(t))&&isFinite(t)},chooseOption:function(t,e,o){return void 0!=e[o]?e[o]:t[o]},getOptionDiff:function(t,e,o){var i=0;return this.isNumeric(t)&&(i=(e-t)/o),i},getOptionsDiff:function(t,e,o){var i={};for(var r in e)i[r]=this.getOptionDiff(t[r],e[r],o);return i},getCalculatedOption:function(t,e){return this.isNumeric(t)&&this.isNumeric(e)?t+e:t}};return t}),define("eyeball",["helper"],function(t){var e=function(t,e){this.parent=t,this.options={size:12,shift:20,rotate:3.14},this._setOptions(e),this._render()};return e.prototype._setOptions=function(e){this.options.size=t.chooseOption(this.options,e,"size"),this.options.shift=t.chooseOption(this.options,e,"shift"),this.options.rotate=t.chooseOption(this.options,e,"rotate")},e.prototype._render=function(){return this.eyeballNode=this._createEyeballNode(),this},e.prototype.change=function(t){var e=this;e._setOptions(t),e._setNodeAttributes(this.eyeballNode)},e.prototype._createEyeballNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","circle");return e.setAttribute("name","eyeball"),t.appendChild(e),this._setNodeAttributes(t),this.parent.append(t),t},e.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=eyeball]");return e.setAttribute("fill","#000000"),e.setAttribute("stroke","#000000"),e.setAttribute("stroke-width",5),e.setAttribute("stroke-linejoin",null),e.setAttribute("stroke-linecap",null),e.setAttribute("cx",this._getEyeballXCoordinate()),e.setAttribute("cy",this._getEyeballYCoordinate()),e.setAttribute("r",this.options.size),e},e.prototype.trackByCoordinate=function(t,e){var o=this.parent.getCoordinates(),i=Math.atan2(e-o.y,t-o.x);this.change({rotate:i})},e.prototype._getEyeballXCoordinate=function(){return 90+this.options.shift*Math.cos(this.options.rotate)},e.prototype._getEyeballYCoordinate=function(){return 90+this.options.shift*Math.sin(this.options.rotate)},e.prototype.changeByDiff=function(e){var o={};for(var i in e)o[i]=t.getCalculatedOption(this.options[i],e[i]);return o},e}),define("topEyelid",["helper"],function(t){var e=function(t,e,o){this.parent=t,this.type=e,this.options={size:0,color:"white",borderColor:"#000000",borderSize:5,bottomArcRadius:0,bottomArcRadiusSweep:0,rotate:0,eyelashesStyle:"none"},this._setOptions(o),this._render()};return e.prototype.change=function(t){var e=this;e._setOptions(t),e._setNodeAttributes(e.eyelidNode)},e.prototype._setOptions=function(e){this.options.color=t.chooseOption(this.options,e,"color"),this.options.borderColor=t.chooseOption(this.options,e,"borderColor"),this.options.borderSize=t.chooseOption(this.options,e,"borderSize"),this.options.eyelashesStyle=t.chooseOption(this.options,e,"eyelashesStyle"),this.options.bottomArcRadiusSweep=t.chooseOption(this.options,e,"bottomArcRadiusSweep"),this._setRotate(t.chooseOption(this.options,e,"rotate")),this._setBottomArcRadius(t.chooseOption(this.options,e,"bottomArcRadius")),this._setSize(t.chooseOption(this.options,e,"size"))},e.prototype._render=function(){return this.eyelidNode=this._createEyelidNode(),this},e.prototype._setBottomArcRadius=function(t){this.options.bottomArcRadius=this._normolizeParam(t)},e.prototype._setRotate=function(t){t<-30?t=-30:t>30&&(t=30),this.options.rotate=t},e.prototype._setSize=function(t){this.options.size=this._normolizeParam(t)},e.prototype._normolizeParam=function(t){return t>=1&&(t=.999),t<0&&(t=0),t},e.prototype._createEyelidNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("name","top-eyelid"),t.appendChild(e);var o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("name","top-eyelashes"),t.appendChild(o),this._setNodeAttributes(t),this.parent.append(t),t},e.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=top-eyelid]");e.setAttribute("fill",this.options.color),e.setAttribute("stroke",this.options.borderColor),e.setAttribute("stroke-width",this.options.borderSize),e.setAttribute("transform","rotate("+this.options.rotate+", 90, 90)");var o=this._createPath();return e.setAttribute("d",o),e},e.prototype._createPath=function(){var t=Math.PI/2-Math.PI*this.options.size,e=90-50*Math.cos(t),o=90-50*Math.sin(t),i=180-e,r=o,s="";return s=s+"M"+e+","+o,s=this._createTopArc(s,i,r),s=this._createBottomArc(s,e,o),"loise"==this.options.eyelashesStyle&&(s+="right"==this.type?this._createEyelashes(i,r,this.type):this._createEyelashes(e,o,this.type)),s+="z"},e.prototype._createTopArc=function(t,e,o){var i=this.options.size>.5?1:0;return t=t+" A50,50 0 "+i+" 1 ",t=t+e+","+o},e.prototype._createBottomArc=function(t,e,o){if(0!=this.options.bottomArcRadius){var i=50/this.options.bottomArcRadius;t=t+" A"+i+","+i+" 0 0 "+this._getRadiusSweep(),t=t+" "+e+","+o}else t=t+" L"+e+","+o;return t},e.prototype._createEyelashes=function(t,e,o){var i=this._createFirstEyelash(t,e,o);return i+=this._createSecondEyelash(t,e,o)},e.prototype._createFirstEyelash=function(t,e,o){var i="right"==o?t+10:t-10,r=e,s="right"==o?t+15:t-15,n=e-15;return this._createEyelash(t,e,i,r,s,n)},e.prototype._createSecondEyelash=function(t,e,o){var i="right"==o?t+25:t-25,r=e,s="right"==o?t+25:t-25,n=e-10;return this._createEyelash(t,e,i,r,s,n)},e.prototype._createEyelash=function(t,e,o,i,r,s){var n=" M "+t+","+e;return n+=" Q"+o+","+i+" "+r+","+s+" ",n+=" Q"+o+","+i+" "+t+","+e+" "},e.prototype._getRadiusSweep=function(){return this.options.bottomArcRadiusSweep<=.5?0:1},e.prototype.changeByDiff=function(e){var o={};for(var i in e)o[i]=t.getCalculatedOption(this.options[i],e[i]);return o},e}),define("bottomEyelid",["helper"],function(t){var e=function(t,e){this.parent=t,this.options={size:0,color:"white",borderColor:"#000000",borderSize:5,topArcRadius:0,topArcRadiusSweep:0,rotate:0},this._setOptions(e),this._render()};return e.prototype.change=function(t){var e=this;e._setOptions(t),e._setNodeAttributes(e.eyelidNode)},e.prototype._setOptions=function(e){this.options.color=t.chooseOption(this.options,e,"color"),this.options.borderColor=t.chooseOption(this.options,e,"borderColor"),this.options.borderSize=t.chooseOption(this.options,e,"borderSize"),this.options.topArcRadiusSweep=t.chooseOption(this.options,e,"topArcRadiusSweep"),this._setRotate(t.chooseOption(this.options,e,"rotate")),this._setTopArcRadius(t.chooseOption(this.options,e,"topArcRadius")),this._setSize(t.chooseOption(this.options,e,"size"))},e.prototype._render=function(){return this.eyelidNode=this._createEyelidNode(),this},e.prototype._setTopArcRadius=function(t){this.options.topArcRadius=this._normolizeParam(t)},e.prototype._setRotate=function(t){t<-30?t=-30:t>30&&(t=30),this.options.rotate=t},e.prototype._setSize=function(t){this.options.size=this._normolizeParam(t)},e.prototype._normolizeParam=function(t){return t>=1&&(t=.999),t<0&&(t=0),t},e.prototype._createEyelidNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","path");return e.setAttribute("name","bottom-eyelid"),t.appendChild(e),this._setNodeAttributes(t),this.parent.append(t),t},e.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=bottom-eyelid]");e.setAttribute("fill",this.options.color),e.setAttribute("stroke",this.options.borderColor),e.setAttribute("stroke-width",this.options.borderSize),e.setAttribute("transform","rotate("+this.options.rotate+", 90, 90)");var o=this._createPath();return e.setAttribute("d",o),e},e.prototype._createPath=function(){var t=Math.PI/2-Math.PI*this.options.size,e=90-50*Math.cos(t),o=90+50*Math.sin(t),i=180-e,r=o,s="";return s=s+"M"+e+","+o,s=this._createTopArc(s,i,r),s=this._createBottomArc(s,e,o),s+="z"},e.prototype._createTopArc=function(t,e,o){if(0!=this.options.topArcRadius){var i=50/this.options.topArcRadius;t=t+" A"+i+","+i+" 0 0 "+this._getRadiusSweep(),t=t+e+","+o}else t=t+" L"+e+","+o;return t},e.prototype._createBottomArc=function(t,e,o){var i=this.options.size>.5?1:0;return t=t+" A50,50 0 "+i+" 1 ",t=t+e+","+o},e.prototype._getRadiusSweep=function(){return this.options.topArcRadiusSweep<=.5?0:1},e.prototype.changeByDiff=function(e){var o={};for(var i in e)o[i]=t.getCalculatedOption(this.options[i],e[i]);return o},e}),define("eyebrow",["helper"],function(t){var e=function(t,e){this.parent=t,this.options={width:80,height:5,position:.5,color:"#000000",borderColor:"#000000",borderSize:0,rotate:0},this._setOptions(e),this._render()};return e.prototype._setOptions=function(e){this.options.width=t.chooseOption(this.options,e,"width"),this.options.height=t.chooseOption(this.options,e,"height"),this.options.color=t.chooseOption(this.options,e,"color"),this.options.borderColor=t.chooseOption(this.options,e,"borderColor"),this.options.borderSize=t.chooseOption(this.options,e,"borderSize"),this.options.position=t.chooseOption(this.options,e,"position"),this._setRotate(t.chooseOption(this.options,e,"rotate"))},e.prototype._setRotate=function(t){t<-25?t=-25:t>25&&(t=25),this.options.rotate=t},e.prototype._render=function(){return this.eyebrowNode=this._createEyebrowNode(),this},e.prototype.change=function(t){var e=this;e._setOptions(t),e._setNodeAttributes(e.eyebrowNode)},e.prototype._createEyebrowNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","rect");return e.setAttribute("name","eyebrow"),t.appendChild(e),this._setNodeAttributes(t),this.parent.append(t),t},e.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=eyebrow]");e.setAttribute("width",this.options.width),e.setAttribute("height",this.options.height);var o=90-this.options.width/2;e.setAttribute("x",o);var i=this._getY(this.options.height,this.options.borderSize,this.options.position);return e.setAttribute("y",i),e.setAttribute("stroke",this.options.borderColor),e.setAttribute("stroke-width",this.options.borderSize),e.setAttribute("fill",this.options.color),e.setAttribute("transform","rotate("+this.options.rotate+", 90, 90)"),e},e.prototype._getY=function(t,e,o){return(40-t-e)*o},e.prototype.changeByDiff=function(e){var o={};for(var i in e)o[i]=t.getCalculatedOption(this.options[i],e[i]);return o},e}),define("eye",["eyeball","topEyelid","bottomEyelid","eyebrow","helper"],function(t,e,o,i,r){var s=['<svg name="svg-node" width="50" height="50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">'," <g>",'  <circle name="eye" cx="90" cy="90" r="50" />'," </g>","</svg>"].join(""),n=function(t,e){if(this.selector=t,this._element=document.querySelector(t),!this._element)throw new Error("Not valid image selector");this.options={x:0,y:0,size:50,color:"#FFFFFF",borderColor:"#000000",borderSize:5,type:"left",eyeball:{size:12,shift:20,rotate:3.14},topEyelid:{size:0,color:"white",borderColor:"#000000",borderSize:5,bottomArcRadius:0,bottomArcRadiusSweep:0,rotate:0,eyelashesStyle:"none"},bottomEyelid:{size:0,color:"white",borderColor:"#000000",borderSize:5,topArcRadius:0,topArcRadiusSweep:0,rotate:0},eyebrow:{width:80,height:5,position:.5,color:"#000000",borderColor:"#000000",borderSize:0,rotate:0}},this.animationIntervalId=null,this._setOptions(e),this._render()};return n.prototype._setOptions=function(t){for(var e in t)this.options[e]=t[e]},n.prototype.moveToPosition=function(){this.move(this.options.x,this.options.y)},n.prototype.move=function(t,e){var o=this._element.getBoundingClientRect();this._handlerNode.style.position="absolute",this._handlerNode.style.left=o.left+(t+pageXOffset)+"px",this._handlerNode.style.top=o.top+(e+pageYOffset)+"px"},n.prototype.append=function(t){this._handlerNode.querySelector("[name=svg-node]").appendChild(t)},n.prototype.change=function(t){for(var e in t)"eyeball"==e?this.eyeball.change(t[e]):"topEyelid"==e?this.topEyelid.change(t[e]):"bottomEyelid"==e?this.bottomEyelid.change(t[e]):"eyebrow"==e?this.eyebrow.change(t[e]):void 0!==this.options[e]&&(this.options[e]=t[e]);this._setNodeAttributes(this._eyeNode),this.moveToPosition()},n.prototype.changeByDiff=function(t){var e={};for(var o in t)"object"==typeof t[o]?e[o]=this[o].changeByDiff(t[o]):e[o]=r.getCalculatedOption(this.options[o],t[o]);this.change(e)},n.prototype.animate=function(t,e){var o=10,i=this._getOptionsDiff(t,e/o);return this._startAnimation(i,e,o)},n.prototype.stopAnimation=function(){var t=this;clearInterval(t.animationIntervalId)},n.prototype._getOptionsDiff=function(t,e){var o={};for(var i in t)"object"==typeof t[i]?o[i]=r.getOptionsDiff(this[i].options,t[i],e):o[i]=r.getOptionDiff(this.options[i],t[i],e);return o},n.prototype._startAnimation=function(t,e,o){var i=this,r=0;i.animationIntervalId&&this.stopAnimation();var s=new Promise(function(s,n){var p=setInterval(function(){r+=o,i.changeByDiff(t),r>=e&&i.animationIntervalId==p&&(i.stopAnimation(),s())},o);i.animationIntervalId=p});return s},n.prototype.getCoordinates=function(){var t=this,e=t._eyeNode.getBoundingClientRect(),o=e.left+e.width/2,i=e.top+e.height/2;return{x:o,y:i}},n.prototype._render=function(){this._handlerNode=this._createHandlerNode(this.options.size),this._eyeNode=this._createEyeNode(),this.eyeball=new t(this,this.options.eyeball),this.topEyelid=new e(this,this.options.type,this.options.topEyelid),this.bottomEyelid=new o(this,this.options.bottomEyelid),this.eyebrow=new i(this,this.options.eyebrow),document.body.appendChild(this._handlerNode),this.move(this.options.x,this.options.y),this._handlerNode.style.display="block"},n.prototype._createHandlerNode=function(t){var e=document.createElement("object");return e.style.display="none",e.style.position="absolute",e.setAttribute("width",t),e.setAttribute("height",t),e},n.prototype._createEyeNode=function(){var t=document.createElement("object");return t.style.position="absolute",t.innerHTML=s,this._setNodeAttributes(t),this._handlerNode.appendChild(t),t},n.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=svg-node]");e.setAttribute("width",this.options.size),e.setAttribute("height",this.options.size);var o=t.querySelector("[name=eye]");return o.setAttribute("fill",this.options.color),o.setAttribute("stroke",this.options.borderColor),o.setAttribute("stroke-width",this.options.borderSize),t},n}),define("eyesPair",["eye"],function(t){var e=function(t,e,o,i){this.leftEye=this._getEye(t,e,o,i,"left"),this.rightEye=this._getEye(t,e,o,i,"right")};return e.prototype._getEye=function(e,o,i,r,s){var n=JSON.parse(JSON.stringify(o));return n.type=s,"left"==s?(n.x=i.x-r/2,n.y=i.y):"right"==s&&(n.x=i.x+r/2,n.y=i.y),new t(e,n)},e.prototype.getLeftEye=function(){return this.leftEye},e.prototype.getRightEye=function(){return this.rightEye},e.prototype.getEye=function(t){return"left"==t?this.getLeftEye():this.getRightEye()},e.prototype.moveToPosition=function(){this.leftEye.moveToPosition(),this.rightEye.moveToPosition()},e.prototype.animate=function(t,e){return{leftEyeAnimation:this.leftEye.animate(t,e),rightEyeAnimation:this.rightEye.animate(t,e)}},e.prototype.stopAnimation=function(){this.leftEye.stopAnimation(),this.rightEye.stopAnimation()},e}),define("eyes",["eye","eyesPair"],function(t,e){var o=function(){var o=this,i=[];this.createEye=function(e,o){var r=new t(e,o);return i.push(r),r},this.createEyesPair=function(t,o,r,s){var n=new e(t,o,r,s);return i.push(n),n},this._resize=function(){for(var t in i)i[t].moveToPosition()},window.addEventListener("resize",function(t){o._resize()},!1)};return o});