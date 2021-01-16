(function(t){function e(e){for(var n,r,s=e[0],l=e[1],c=e[2],d=0,h=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&h.push(a[r][0]),a[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(h.length)h.shift()();return o.push.apply(o,c||[]),i()}function i(){for(var t,e=0;e<o.length;e++){for(var i=o[e],n=!0,s=1;s<i.length;s++){var l=i[s];0!==a[l]&&(n=!1)}n&&(o.splice(e--,1),t=r(r.s=i[0]))}return t}var n={},a={app:0},o=[];function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;o.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("cd49")},"034f":function(t,e,i){"use strict";i("85ec")},"0c7b":function(t,e,i){"use strict";i("caa2")},4598:function(t,e,i){},5613:function(t,e,i){"use strict";i("4598")},"591c":function(t,e,i){"use strict";i("74c7")},"74c7":function(t,e,i){},"85ec":function(t,e,i){},caa2:function(t,e,i){},cd49:function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("Grid",{attrs:{tiles:t.tiles,"tile-size":512,"tile-cells":16,time:t.time}}),t._m(0)],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app__overlay"},[i("div",{staticClass:"top-left"},[i("h1",{staticClass:"app__heading"},[t._v("Membrane")]),i("span",{staticClass:"app__subheading"},[t._v(" inspired by "),i("a",{attrs:{href:"https://tixy.land/",target:"_blank"}},[t._v("tixy.land")])])])])}],r=i("d4ec"),s=i("bee2"),l=i("262e"),c=i("2caf"),u=i("9ab4"),d=i("1b40"),h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"grid",class:{editing:t.isEditing},on:{wheel:t.onWheel}},[i("svg",{ref:"background",staticClass:"grid__background"},[i("defs",[i("pattern",{attrs:{id:"gridPattern",width:t.tileSize,height:t.tileSize,x:t.position.x,y:t.position.y,patternTransform:"scale("+t.zoom+")",patternUnits:"userSpaceOnUse"}},[i("rect",{staticClass:"grid__pattern",attrs:{x:0,y:0,width:t.tileSize,height:t.tileSize}})])]),i("rect",{staticClass:"grid__background",attrs:{width:"150%",height:"150%",fill:"url(#gridPattern)"}})]),i("div",{staticClass:"grid__foreground",style:{transform:"scale("+t.zoom+") translate("+t.position.x+"px, "+t.position.y+"px)"}},t._l(t.tiles,(function(e,n){return i("Tile",{key:e.name,ref:"tiles",refInFor:!0,attrs:{tile:e,position:t.getTilePosition(e),"grid-zoom":t.zoom,size:t.tileSize,cells:t.tileCells,time:t.time},on:{grab:function(){return t.onTileGrab(n)},release:function(e){return t.onTileRelease(n,e)}}})})),1)])},f=[],p=i("b255"),b=i("9393");function v(t,e,i){return Math.min(Math.max(e,t),i)}function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Math.round(t/e)*e}var y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tile",class:{dragging:t.isDragging},style:{left:t.tilePosition.x+"px",top:t.tilePosition.y+"px"}},[i("canvas",{ref:"canvas",staticClass:"tile__canvas",attrs:{width:t.size,height:t.size}}),i("div",{staticClass:"tile__overlay",style:{borderRadius:t.cellWidth/2+"px"}})])},O=[],m=(i("cb29"),"#FFE600"),j="#FFFFFF",w=.9,_=function(t){Object(l["a"])(i,t);var e=Object(c["a"])(i);function i(){var t;return Object(r["a"])(this,i),t=e.apply(this,arguments),t.dragHandler=null,t.dragOffset=new b["a"],t.context=null,t.paused=!1,t}return Object(s["a"])(i,[{key:"mounted",value:function(){this.dragHandler=new p["b"](this.$refs.canvas,{onDragGrab:this.onTileGrab.bind(this),onDragMove:this.onTileMove.bind(this),onDragCancel:this.onTileRelease.bind(this),onDragEnd:this.onTileRelease.bind(this)});var t=this.$refs.canvas;this.context=t.getContext("2d"),this.draw()}},{key:"clear",value:function(){this.context&&this.context.clearRect(0,0,this.size,this.size)}},{key:"draw",value:function(){if(this.context&&!this.paused){this.clear();for(var t=0;t<this.cells;t+=1)for(var e=0;e<this.cells;e+=1){var i=this.cellWidth/2,n=t*this.cellWidth+i,a=e*this.cellWidth+i,o=this.getCellValue(t,e),r=this.getCellRadius(o);this.context.beginPath(),this.context.arc(n,a,r,0,2*Math.PI,!1),this.context.fillStyle=o>0?j:m,this.context.fill()}}}},{key:"getCellValue",value:function(t,e){var i=this.tile.eval(t,e,this.time);return v(i,-1,1)}},{key:"getCellRadius",value:function(t){return Math.abs(t*w)*(this.cellWidth/2)}},{key:"onTileGrab",value:function(t){this.$emit("grab")}},{key:"onTileMove",value:function(t){var e=t.dragOffsetDelta;if(e){this.paused=!0;var i=e.multiplyByScalar(1/this.gridZoom);this.dragOffset=this.dragOffset.add(i)}}},{key:"onTileRelease",value:function(){this.clear(),this.paused=!1,this.$emit("release",this.dragOffset),this.dragOffset=new b["a"]}},{key:"cellWidth",get:function(){return this.size/this.cells}},{key:"tilePosition",get:function(){return this.position.add(this.dragOffset)}},{key:"isDragging",get:function(){var t;return(null===(t=this.dragHandler)||void 0===t?void 0:t.dragState)===p["a"].Dragging}}]),i}(d["c"]);Object(u["a"])([Object(d["b"])()],_.prototype,"tile",void 0),Object(u["a"])([Object(d["b"])()],_.prototype,"size",void 0),Object(u["a"])([Object(d["b"])()],_.prototype,"cells",void 0),Object(u["a"])([Object(d["b"])()],_.prototype,"position",void 0),Object(u["a"])([Object(d["b"])()],_.prototype,"gridZoom",void 0),Object(u["a"])([Object(d["b"])()],_.prototype,"time",void 0),Object(u["a"])([Object(d["d"])("time")],_.prototype,"draw",null),_=Object(u["a"])([d["a"]],_);var x=_,z=x,k=(i("591c"),i("2877")),S=Object(k["a"])(z,y,O,!1,null,"9a89cc98",null),T=S.exports,C=function(t){Object(l["a"])(i,t);var e=Object(c["a"])(i);function i(){var t;return Object(r["a"])(this,i),t=e.apply(this,arguments),t.position=new b["a"],t.zoom=1,t.dragHandler=null,t.isEditing=!1,t}return Object(s["a"])(i,[{key:"mounted",value:function(){this.dragHandler=new p["b"](this.$refs.background,{onDragMove:this.onGridMove.bind(this)})}},{key:"getTilePosition",value:function(t){return new b["a"](t.gridX*this.tileSize,t.gridY*this.tileSize)}},{key:"windowToView",value:function(t){var e=this.$refs.background,i=e.getBoundingClientRect();return t.subtract(new b["a"](i.left,i.top))}},{key:"zoomToTarget",value:function(t,e){var i=v(this.zoom+t,this.minZoom,this.maxZoom),n=e.multiplyByScalar(1/this.zoom),a=e.multiplyByScalar(1/i),o=a.subtract(n);this.zoom=i,this.position=this.position.add(o)}},{key:"onWheel",value:function(t){t.deltaY&&this.zoomToTarget((t.deltaY>1?-1:1)*this.zoomSpeed,this.windowToView(new b["a"](t.clientX,t.clientY))),t.deltaX&&(this.position=this.position.add(new b["a"](-t.deltaX,0)))}},{key:"onGridMove",value:function(t){var e=t.dragOffsetDelta;if(e){var i=e.multiplyByScalar(1/this.zoom);this.position=this.position.add(i)}}},{key:"onTileGrab",value:function(t){this.isEditing=!0}},{key:"onTileRelease",value:function(t,e){this.isEditing=!1;var i=this.tiles[t];i.gridX+=g(e.x,this.tileSize)/this.tileSize,i.gridY+=g(e.y,this.tileSize)/this.tileSize}}]),i}(d["c"]);Object(u["a"])([Object(d["b"])()],C.prototype,"tiles",void 0),Object(u["a"])([Object(d["b"])()],C.prototype,"tileSize",void 0),Object(u["a"])([Object(d["b"])()],C.prototype,"tileCells",void 0),Object(u["a"])([Object(d["b"])()],C.prototype,"time",void 0),Object(u["a"])([Object(d["b"])({default:.1})],C.prototype,"minZoom",void 0),Object(u["a"])([Object(d["b"])({default:2})],C.prototype,"maxZoom",void 0),Object(u["a"])([Object(d["b"])({default:.1})],C.prototype,"zoomSpeed",void 0),C=Object(u["a"])([Object(d["a"])({components:{Tile:T}})],C);var M=C,P=M,D=(i("5613"),Object(k["a"])(P,h,f,!1,null,"63fd1ee7",null)),$=D.exports,E=function(){function t(e,i){Object(r["a"])(this,t),this.gridX=e,this.gridY=i}return Object(s["a"])(t,[{key:"eval",value:function(t,e,i){return Math.sin(i-Math.sqrt(Math.pow(t-7.5,2)+Math.pow(e-7.5,2)))}}]),t}(),R=60,F=function(t){Object(l["a"])(i,t);var e=Object(c["a"])(i);function i(){var t;return Object(r["a"])(this,i),t=e.apply(this,arguments),t.tiles=[new E(0,0),new E(1,0),new E(0,1),new E(1,1)],t.time=Date.now(),t}return Object(s["a"])(i,[{key:"mounted",value:function(){var t=this;setInterval((function(){t.time=Date.now()/1e3}),1e3/R)}}]),i}(d["c"]);F=Object(u["a"])([Object(d["a"])({components:{Grid:$}})],F);var G=F,W=G,X=(i("034f"),i("0c7b"),Object(k["a"])(W,a,o,!1,null,"7cf414f7",null)),Y=X.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(Y)}}).$mount("#app")}});
//# sourceMappingURL=app.cf95f025.js.map