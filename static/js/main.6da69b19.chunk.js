(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,n,t){e.exports=t(45)},35:function(e,n,t){},37:function(e,n,t){},39:function(e,n,t){},41:function(e,n,t){},43:function(e,n,t){},45:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(13),i=t.n(a),c=t(3),u=(t(35),function(e){var n=e.children,t=e.height,r=e.src,a=e.width,i=e.matrixTransform;return r?o.a.createElement("div",{className:"skewer"},n,o.a.createElement("img",{alt:"skewable",style:{transform:i},src:r,width:a,height:t})):null});u.defaultProps={children:null};var s=u,l=t(16),d=t.n(l),h="tl",f=[h,"bl","tr","br"],m=t(11),g=(t(23),window.numeric),v=function(e,n,t){for(var r=[{x:0,y:0},{x:0,y:n},{x:e,y:0},{x:e,y:n}],o=t.map(function(e,n){var t=r[n];return{x:t.x+e.x,y:t.y+e.y}}),a=function(e,n){var t=e.reduce(function(e,t,r){var o=t.x,a=t.y,i=n[r];return Object(m.a)(e).concat([[o,a,1,0,0,0,-o*i.x,-a*i.x],[0,0,0,o,a,1,-o*i.y,-a*i.y]])},[]),r=n.reduce(function(e,n){var t=n.x,r=n.y;return Object(m.a)(e).concat([t,r])},[]),o=g.solve(t,r);return[[o[0],o[1],0,o[2]],[o[3],o[4],0,o[5]],[0,0,1,0],[o[6],o[7],0,1]]}(r,o),i=[],c=0;c<4;c++)for(var u=0;u<4;u++)i.push(a[u][c]);return"matrix3d(".concat(i.join(","),")")},w=function(e){return e.image.corners.tr.x-e.image.corners.tl.x},y=function(e){return e.image.corners.bl.y-e.image.corners.tl.y},b=function(e,n){return e.handles[n]},p=(d()(function(e,n){return[{x:0,y:0},{x:0,y:n},{x:e,y:0},{x:e,y:n}]}),function(e){var n=w(e),t=y(e),r=f.map(function(n){return function(e,n){var t=function(e,n){return e.image.corners[n]}(e,n),r=b(e,n);return{x:r.x-t.x,y:r.y-t.y}}(e,n)});return v(n,t,r)}),E=Object(c.b)(function(e){return{src:function(e){return e.image.src}(e),width:w(e),height:y(e),matrixTransform:p(e)}})(s),x=t(1),O=function(e){return{type:"SET_IMAGE",payload:e}},j=t(17),M=t(18),D=t(24),k=t(19),_=t(25),N=t(4),L=t(20),S=t.n(L),T=t(21),U=t.n(T),A=(t(37),function(e){function n(e){var t;return Object(j.a)(this,n),(t=Object(D.a)(this,Object(k.a)(n).call(this,e))).state={dragging:!1},t.dragging=!1,t.onDrag=S()(t.onDrag,16),t.onMouseDown=t.onMouseDown.bind(Object(N.a)(Object(N.a)(t))),t.onMouseMove=t.onMouseMove.bind(Object(N.a)(Object(N.a)(t))),t.onMouseUp=t.onMouseUp.bind(Object(N.a)(Object(N.a)(t))),t}return Object(_.a)(n,e),Object(M.a)(n,[{key:"componentDidMount",value:function(){window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)}},{key:"onDrag",value:function(e,n){this.state.dragging&&"function"===typeof this.props.onDrag&&this.props.onDrag(e,n)}},{key:"onMouseDown",value:function(e){e.preventDefault(),this.setState({dragging:!0}),this.x=e.clientX,this.y=e.clientY}},{key:"onMouseMove",value:function(e){this.state.dragging&&this.onDrag(e.clientX,e.clientY)}},{key:"onMouseUp",value:function(e){this.state.dragging&&this.onDrag(e.clientX,e.clientY),this.setState({dragging:!1})}},{key:"render",value:function(){var e=this,n=this.props,t=n.x,r=n.y,a=this.state.dragging;return o.a.createElement("div",{className:U()("draghandle",{dragging:a}),ref:function(n){e.el=n},style:{top:r,left:t},onMouseDown:this.onMouseDown})}}]),n}(r.PureComponent)),I=Object(c.b)(function(e,n){return{x:function(e,n){return b(e,n).x}(e,n.corner),y:function(e,n){return b(e,n).y}(e,n.corner)}},function(e,n){return{onDrag:function(t,r){e(function(e,n,t){return{type:"MOVE_HANDLE",payload:{corner:e,x:n,y:t}}}(n.corner,t,r))}}})(A),X=t(6),F=function(e,n){var t,r=window.innerWidth,o=window.innerHeight,a=Math.min(e,.9*r)/e,i=Math.min(n,.9*o)/n,c=Math.min(a,i),u=c*e,s=c*n,l=(o-s)/2,d=(r-u)/2;return t={},Object(x.a)(t,h,{x:d,y:l}),Object(x.a)(t,"tr",{x:d+u,y:l}),Object(x.a)(t,"bl",{x:d,y:l+s}),Object(x.a)(t,"br",{x:d+u,y:l+s}),t},V=function(e){return new Promise(function(n,t){var r=new FileReader;r.onload=function(e){var r;(r=e.target.result,new Promise(function(e,n){var t=new Image;t.onload=function(){e({width:this.width,height:this.height,src:r})},t.onerror=function(e){return n(e)},t.src=r})).then(n).catch(t)},r.onabort=function(){return t("File read aborted")},r.onerror=function(){return t("File read failed")},r.readAsDataURL(e)})},C=(t(39),function(){return o.a.createElement("div",{className:"dropzone-placeholder"})}),P=Object(c.b)(null,function(e){return{onChange:function(n){V(n.target.files[0]).then(function(n){return e(O(n))})}}})(function(e){var n=e.onChange;return o.a.createElement(r.Fragment,null,o.a.createElement(C,null),o.a.createElement("input",{className:"image-upload-button",type:"file",onChange:n}))}),R=t(22),W=t.n(R),G=Object(c.b)(null,function(e){return{onDrop:function(n){V(n[0]).then(function(n){return e(O(n))})}}})(function(e){var n=e.children,t=e.onDrop;return o.a.createElement(W.a,{className:"dropzone",onDrop:t},n)}),H=(t(41),Object(c.b)(function(e){return{imageLoaded:!!e.image.src}})(function(e){var n=e.imageLoaded;return o.a.createElement(G,null,o.a.createElement("div",{className:"App"},n?o.a.createElement(r.Fragment,null,o.a.createElement(E,null),f.map(function(e){return o.a.createElement(I,{key:"handle-".concat(e),corner:e})})):o.a.createElement("header",{className:"App-header"},o.a.createElement("h1",null,"Image Kebab",o.a.createElement("em",null,"!")),o.a.createElement(P,null),o.a.createElement("p",null,"Drag-and-drop the image to skewer into this browser window."),o.a.createElement("small",{className:"attribution"},o.a.createElement("a",{href:"https://www.vexels.com/vectors/preview/132102/shish-kebab-icon"},"Shish kebab icon")," designed by Vexels"))))})),Y=t(5),z={src:"",width:0,height:0,corners:f.reduce(function(e,n){return Object(X.a)({},e,Object(x.a)({},n,{x:0,y:0}))},{})},B=Object(Y.b)({handles:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("SET_IMAGE"===n.type){if(e)return e;var t=n.payload,r=t.width,o=t.height;return F(r,o)}if("MOVE_HANDLE"===n.type){var a=n.payload,i=a.corner,c=a.x,u=a.y;return e&&e[i].x===c&&e[i].y===u?e:Object(X.a)({},e,Object(x.a)({},i,{x:c,y:u}))}return e},image:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("SET_IMAGE"===n.type){var t=n.payload,r=t.src,o=t.width,a=t.height;return{src:r,width:o,height:a,corners:F(o,a)}}return e}}),J=Object(Y.c)(B,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(43);i.a.render(o.a.createElement(c.a,{store:J},o.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.6da69b19.chunk.js.map