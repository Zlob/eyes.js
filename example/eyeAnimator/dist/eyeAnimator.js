define("eyeball",[],function(){var t=function(t,e){this.parent=t,this.options={size:12,shift:20};for(var o in e)this.options[o]=e[o];this._render()};return t.prototype.track=function(t){t.angle?this._trackByAngle(t.angle,t.shift):t.x&&t.y&&this.trackByCoordinate(t.x,t.y,t.shift)},t.prototype._render=function(){return this.eyeballNode=this._createEyeballNode(),this},t.prototype._createEyeballNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","circle");return e.setAttribute("name","eyeball"),t.appendChild(e),this._setNodeAttributes(t),this.parent.append(t),t},t.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=eyeball]");return e.setAttribute("fill","#000000"),e.setAttribute("stroke","#000000"),e.setAttribute("stroke-width",5),e.setAttribute("stroke-linejoin",null),e.setAttribute("stroke-linecap",null),e.setAttribute("cx",90+parseInt(this.options.shift)),e.setAttribute("cy",90),e.setAttribute("r",this.options.size),e},t.prototype._trackByAngle=function(t,e){e=e||this.options.shift;var o=90+e*Math.cos(t),i=90+e*Math.sin(t);this._setEyeballCoordinates(o,i)},t.prototype.trackByCoordinate=function(t,e,o){o=o||this.options.shift;var i=this._getEyeballCoordinates(),r=Math.sqrt(Math.pow(i.x-t,2)+Math.pow(i.y-e,2));r<=o&&(o=r);var s=90-(i.x-t)/r*o,n=90-(i.y-e)/r*o;this._setEyeballCoordinates(s,n)},t.prototype._setEyeballCoordinates=function(t,e){var o=this.eyeballNode.querySelector("[name=eyeball]");o.setAttribute("cx",t),o.setAttribute("cy",e)},t.prototype._getEyeballCoordinates=function(){var t=this.eyeballNode.getBoundingClientRect(),e=t.left+t.width/2,o=t.top+t.height/2;return{x:e,y:o}},t}),define("topEyelid",[],function(){var t=function(t,e,o){this.parent=t,this.type=e,this.options={size:0,color:"white",borderColor:"#000000",borderSize:5,bottomArcRadius:0,bottomArcRadiusSweep:0,eyelashesStyle:"none",rotate:0},this._setOptions(o),this._render()};return t.prototype.change=function(t){var e=this;e._setOptions(t),e._setNodeAttributes(e.eyelidNode)},t.prototype._setOptions=function(t){this.options.color=t.color||this.options.color,this.options.borderColor=t.borderColor||this.options.borderColor,this.options.borderSize=t.borderSize||this.options.borderSize,this.options.eyelashesStyle=t.eyelashesStyle||this.options.eyelashesStyle,this.options.bottomArcRadiusSweep=t.bottomArcRadiusSweep||this.options.bottomArcRadiusSweep,this._setRotate(t.rotate||this.options.rotate),this._setBottomArcRadius(t.bottomArcRadius||this.options.bottomArcRadius),this._setSize(t.size||this.options.size)},t.prototype._render=function(){return this.eyelidNode=this._createEyelidNode(),this},t.prototype._setBottomArcRadius=function(t){this.options.bottomArcRadius=this._normolizeParam(t)},t.prototype._setRotate=function(t){t<-30?t=-30:t>30&&(t=30),this.options.rotate=t},t.prototype._setSize=function(t){this.options.size=this._normolizeParam(t)},t.prototype._normolizeParam=function(t){return t>=1&&(t=.999),t<0&&(t=0),t},t.prototype._createEyelidNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("name","top-eyelid"),t.appendChild(e);var o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("name","top-eyelashes"),t.appendChild(o),this._setNodeAttributes(t),this.parent.append(t),t},t.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=top-eyelid]");e.setAttribute("fill",this.options.color),e.setAttribute("stroke",this.options.borderColor),e.setAttribute("stroke-width",this.options.borderSize),e.setAttribute("transform","rotate("+this.options.rotate+", 90, 90)");var o=this._createPath();return e.setAttribute("d",o),e},t.prototype._createPath=function(){var t=Math.PI/2-Math.PI*this.options.size,e=90-50*Math.cos(t),o=90-50*Math.sin(t),i=180-e,r=o,s="";return s=s+"M"+e+","+o,s=this._createTopArc(s,i,r),s=this._createBottomArc(s,e,o),"loise"==this.options.eyelashesStyle&&(s+="right"==this.type?this._createEyelashes(i,r,this.type):this._createEyelashes(e,o,this.type)),s+="z"},t.prototype._createTopArc=function(t,e,o){var i=this.options.size>.5?1:0;return t=t+" A50,50 0 "+i+" 1 ",t=t+e+","+o},t.prototype._createBottomArc=function(t,e,o){if(0!=this.options.bottomArcRadius){var i=50/this.options.bottomArcRadius;t=t+" A"+i+","+i+" 0 0 "+this.options.bottomArcRadiusSweep,t=t+" "+e+","+o}else t=t+" L"+e+","+o;return t},t.prototype._createEyelashes=function(t,e,o){var i=this._createFirstEyelash(t,e,o);return i+=this._createSecondEyelash(t,e,o)},t.prototype._createFirstEyelash=function(t,e,o){var i="right"==o?t+10:t-10,r=e,s="right"==o?t+15:t-15,n=e-15;return this._createEyelash(t,e,i,r,s,n)},t.prototype._createSecondEyelash=function(t,e,o){var i="right"==o?t+25:t-25,r=e,s="right"==o?t+25:t-25,n=e-10;return this._createEyelash(t,e,i,r,s,n)},t.prototype._createEyelash=function(t,e,o,i,r,s){var n=" M "+t+","+e;return n+=" Q"+o+","+i+" "+r+","+s+" ",n+=" Q"+o+","+i+" "+t+","+e+" "},t}),define("bottomEyelid",[],function(){var t=function(t,e){this.parent=t,this.options={size:0,color:"white",borderColor:"#000000",borderSize:5,topArcRadius:0,topArcRadiusSweep:0,rotate:0},this._setOptions(e),this._render()};return t.prototype.change=function(t){var e=this;e._setOptions(t),e._setNodeAttributes(e.eyelidNode)},t.prototype._setOptions=function(t){this.options.color=t.color||this.options.color,this.options.borderColor=t.borderColor||this.options.borderColor,this.options.borderSize=t.borderSize||this.options.borderSize,this.options.topArcRadiusSweep=t.topArcRadiusSweep||this.options.topArcRadiusSweep,this._setRotate(t.rotate||this.options.rotate),this._setTopArcRadius(t.topArcRadius||this.options.topArcRadius),this._setSize(t.size||this.options.size)},t.prototype._render=function(){return this.eyelidNode=this._createEyelidNode(),this},t.prototype._setTopArcRadius=function(t){this.options.topArcRadius=this._normolizeParam(t)},t.prototype._setRotate=function(t){t<-30?t=-30:t>30&&(t=30),this.options.rotate=t},t.prototype._setSize=function(t){this.options.size=this._normolizeParam(t)},t.prototype._normolizeParam=function(t){return t>=1&&(t=.999),t<0&&(t=0),t},t.prototype._createEyelidNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","path");return e.setAttribute("name","bottom-eyelid"),t.appendChild(e),this._setNodeAttributes(t),this.parent.append(t),t},t.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=bottom-eyelid]");e.setAttribute("fill",this.options.color),e.setAttribute("stroke",this.options.borderColor),e.setAttribute("stroke-width",this.options.borderSize),e.setAttribute("transform","rotate("+this.options.rotate+", 90, 90)");var o=this._createPath();return e.setAttribute("d",o),e},t.prototype._createPath=function(){var t=Math.PI/2-Math.PI*this.options.size,e=90-50*Math.cos(t),o=90+50*Math.sin(t),i=180-e,r=o,s="";return s=s+"M"+e+","+o,s=this._createTopArc(s,i,r),s=this._createBottomArc(s,e,o),s+="z"},t.prototype._createTopArc=function(t,e,o){if(0!=this.options.topArcRadius){var i=50/this.options.topArcRadius;t=t+" A"+i+","+i+" 0 0 "+this.options.topArcRadiusSweep,t=t+e+","+o}else t=t+" L"+e+","+o;return t},t.prototype._createBottomArc=function(t,e,o){var i=this.options.size>.5?1:0;return t=t+" A50,50 0 "+i+" 1 ",t=t+e+","+o},t}),define("eyebrow",[],function(){var t=function(t,e){this.parent=t,this.options={width:80,height:5,position:.5,color:"#000000",borderColor:"#000000",borderSize:0,rotate:0},this._setOptions(e),this._render()};return t.prototype._setOptions=function(t){this.options.width=t.width||this.options.width,this.options.height=t.height||this.options.height,this.options.color=t.color||this.options.color,this.options.borderColor=t.borderColor||this.options.borderColor,this.options.borderSize=t.borderSize||this.options.borderSize,this._setRotate(t.rotate||this.options.rotate)},t.prototype._setRotate=function(t){t<-25?t=-25:t>25&&(t=25),this.options.rotate=t},t.prototype._render=function(){return this.eyelidNode=this._createEyebrowNode(),this},t.prototype._createEyebrowNode=function(){var t=document.createElementNS("http://www.w3.org/2000/svg","g"),e=document.createElementNS("http://www.w3.org/2000/svg","rect");return e.setAttribute("name","eyebrow"),t.appendChild(e),this._setNodeAttributes(t),this.parent.append(t),t},t.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=eyebrow]");e.setAttribute("width",this.options.width),e.setAttribute("height",this.options.height);var o=90-this.options.width/2;e.setAttribute("x",o);var i=this._getY(this.options.height,this.options.borderSize,this.options.position);return e.setAttribute("y",i),e.setAttribute("stroke",this.options.borderColor),e.setAttribute("stroke-width",this.options.borderSize),e.setAttribute("fill",this.options.color),e.setAttribute("transform","rotate("+this.options.rotate+", 90, 90)"),e},t.prototype._getY=function(t,e,o){return(40-t-e)*o},t}),define("eye",["eyeball","topEyelid","bottomEyelid","eyebrow"],function(t,e,o,i){var r=['<svg name="svg-node" width="50" height="50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">'," <g>",'  <circle name="eye" cx="90" cy="90" r="50" />'," </g>","</svg>"].join(""),s=function(t,e){if(this.selector=t,this._element=document.querySelector(t),!this._element)throw new Error("Not valid image selector");this.options={x:0,y:0,size:50,color:"#FFFFFF",borderColor:"#000000",borderSize:5,type:"left",eyeball:{size:12,shift:20},topEyelid:{size:0,color:"white",borderColor:"#000000",borderSize:5,bottomArcRadius:0,bottomArcRadiusSweep:0,rotate:0,eyelashesStyle:"none"},bottomEyelid:{size:0,color:"white",borderColor:"#000000",borderSize:5,topArcRadius:0,topArcRadiusSweep:0,rotate:0},eyebrow:{width:80,height:5,position:.5,color:"#000000",borderColor:"#000000",borderSize:0,rotate:0}},this._setOptions(e),this._render()};return s.prototype._setOptions=function(t){for(var e in t)this.options[e]=t[e]},s.prototype.moveToPosition=function(){this.move(this.options.x,this.options.y)},s.prototype.move=function(t,e){var o=this._element.getBoundingClientRect();this._handlerNode.style.position="absolute",this._handlerNode.style.left=o.left+(t+pageXOffset)+"px",this._handlerNode.style.top=o.top+(e+pageYOffset)+"px"},s.prototype.append=function(t){this._handlerNode.querySelector("[name=svg-node]").appendChild(t)},s.prototype._render=function(){this._handlerNode=this._createHandlerNode(this.options.size),this._eyeNode=this._createEyeNode(),this.eyeball=new t(this,this.options.eyeball),this.topEyelid=new e(this,this.options.type,this.options.topEyelid),this.bottomEyelid=new o(this,this.options.bottomEyelid),this.eyebrow=new i(this,this.options.eyebrow),document.body.appendChild(this._handlerNode),this.move(this.options.x,this.options.y),this._handlerNode.style.display="block"},s.prototype._createHandlerNode=function(t){var e=document.createElement("object");return e.style.display="none",e.style.position="absolute",e.setAttribute("width",t),e.setAttribute("height",t),e},s.prototype._createEyeNode=function(){var t=document.createElement("object");return t.style.position="absolute",t.innerHTML=r,this._setNodeAttributes(t),this._handlerNode.appendChild(t),t},s.prototype._setNodeAttributes=function(t){var e=t.querySelector("[name=svg-node]");e.setAttribute("width",this.options.size),e.setAttribute("height",this.options.size);var o=t.querySelector("[name=eye]");return o.setAttribute("fill",this.options.color),o.setAttribute("stroke",this.options.borderColor),o.setAttribute("stroke-width",this.options.borderSize),t},s}),define("eyeAnimator",["eye"],function(t){var e=function(){var e=this,o=[];this.createEye=function(e,i){var r=new t(e,i);return o.push(r),r},this._resize=function(){for(var t in o)o[t].moveToPosition()},window.addEventListener("resize",function(t){e._resize()},!1)};return e});