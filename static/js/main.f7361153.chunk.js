(this["webpackJsonpcsf-gddtool-v4"]=this["webpackJsonpcsf-gddtool-v4"]||[]).push([[0],{247:function(e,t,a){},248:function(e,t,a){},254:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(11),s=a.n(r),i=a(20),c=a(21),l=a(24),d=a(23),h=a(144),u=a(295),p=a(6),g=a(303),f=a(69),b=a.n(f),m=a(67),j=a(13),O=a(294),y=a(301),_=a(287),v=a(16),x=a.n(v),D=a(71),I=a.n(D),C=a(4),w=a.n(C),Y=window.location.protocol,z=function(e){var t=e.param;return fetch("".concat(Y,"//grid2.rcc-acis.org/GridData"),t).then((function(e){return e.json()})).then((function(e){return e||null}))};z.propTypes={param:w.a.object.isRequired};var L=z,W=a(51),k=a(28),F=a.n(k),M=a(138),S=a.n(M),E=a(111),P=a.n(E),T=a(139),R=a.n(T),G=a(140),A=a.n(G),N=a(286),B=a(283),V=a(5);S()(F.a),P()(F.a),R()(F.a),window.Highcharts=F.a;var H=function(e){var t,a,n=e.chartWeatherData.dates_for_summary[0].split("-")[0],o=function(e,t){var a,n=0;for(a=0;a<t.length;++a)t[a]===e&&n++;return n},r=[];for(t=0;t<e.chartWeatherData.datesOfFirstFreeze_15yr.length;t++)a=o(e.chartWeatherData.datesOfFirstFreeze_15yr[t],e.chartWeatherData.datesOfFirstFreeze_15yr),r.push({x:x.a.utc(e.chartWeatherData.datesOfFirstFreeze_15yr[t],"YYYY-MM-DD").valueOf(),y:a,color:"rgb(0,0,255)"});var s=[];for(t=0;t<e.chartWeatherData.datesOfLastFreeze_15yr.length;t++)a=o(e.chartWeatherData.datesOfLastFreeze_15yr[t],e.chartWeatherData.datesOfLastFreeze_15yr),s.push({x:x.a.utc(e.chartWeatherData.datesOfLastFreeze_15yr[t],"YYYY-MM-DD").valueOf(),y:a,color:"rgb(0,0,255)"});function i(){var e,t,a='<span style="font-size:14px;font-weight:bold;text-align:center">'+F.a.dateFormat("%b %d, %Y",this.x)+"</span>",n="";for(e=0;e<this.points.length;e++)"Period of Record"!==(t=this.points[e]).series.name&&(n+="<br/>"+t.y.toFixed(0)+' : <span style="color:'+t.color+';font-size:12px;font-weight:bold">'+t.series.name+"</span>"),"Period of Record"===t.series.name&&(n+="<br/>"+t.point.low.toFixed(0)+"-"+t.point.high.toFixed(0)+' : <span font-size:12px;">Period of Record</span>');return a+n}var c,l=e.locInfo.planting_date.slice(6),d=e.chartWeatherData.gdd_ytd_por_min[-62]<100?4:1,h=[];e.targetIsEnabled&&(c=function(){var t,a,n,o;return e.chartWeatherData.gdd_ytd_selected.length>0?Math.max.apply(Math,Object(W.a)(e.chartWeatherData.gdd_ytd_selected))>=e.locInfo.gdd_target?(t=e.chartWeatherData.gdd_ytd_selected.findIndex((function(t){return t>e.locInfo.gdd_target})),n=x.a.utc(e.chartWeatherData.dates_selected_year[t],"YYYY-MM-DD").valueOf(),o="Target Observed"):(a=e.chartWeatherData.gdd_ytd_selected.indexOf(Math.max.apply(Math,Object(W.a)(e.chartWeatherData.gdd_ytd_selected))),t=e.chartWeatherData.gdd_ytd_15yr_ave.findIndex((function(t){return t+e.chartWeatherData.gdd_ytd_selected[a]-e.chartWeatherData.gdd_ytd_15yr_ave[a]>e.locInfo.gdd_target})),n=x.a.utc(e.chartWeatherData.dates_for_summary[t],"YYYY-MM-DD").valueOf(),o="Target Fcst"):(t=e.chartWeatherData.gdd_ytd_15yr_ave.findIndex((function(t){return t>e.locInfo.gdd_target})),n=x.a.utc(e.chartWeatherData.dates_for_summary[t],"YYYY-MM-DD").valueOf(),o="Target Fcst"),{value:n,label:o}}(),h.push({label:{text:c.label,y:30},color:"#4caf50",width:4,zIndex:6,value:c.value}));return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(A.a,{containerProps:{style:{height:"100%"}},highcharts:F.a,options:{plotOptions:{line:{animation:!0},series:{type:"line",animation:!1,lineWidth:4,marker:{symbol:"circle"},states:{hover:{enabled:!0,halo:{size:0}}}}},exporting:{menuItemDefinitions:{downloadCSV:{text:"Download as CSV table"},downloadXLS:{text:"Download as XLS table"}},buttons:{contextButton:{menuItems:["printChart","separator","downloadPNG","downloadJPEG","downloadPDF","downloadSVG","separator","downloadCSV","downloadXLS","openInCloud"]}}},chart:{marginTop:60,backgroundColor:null},credits:{href:"http://www.rcc-acis.org",text:"Powered by ACIS"},title:{text:l+" Cumulative Growing Degree Days (Base "+e.locInfo.gdd_base+")"},subtitle:{text:e.locInfo.address,style:{"font-size":"14px",color:"#000000"}},tooltip:{useHtml:!0,shared:!0,borderColor:"#000000",borderWidth:2,borderRadius:8,shadow:!1,backgroundColor:"#ffffff",xDateFormat:"%b %d, %Y",positioner:function(){return{x:80,y:60}},shape:"rect",crosshairs:{width:1,color:"#ff0000",snap:!0,zIndex:d},formatter:i},legend:{align:"left",symbolRadius:0,floating:!0,verticalAlign:"top",layout:"vertical",x:65,y:50},xAxis:{type:"datetime",startOnTick:!1,endOnTick:!1,min:x.a.utc(e.locInfo.planting_date,"MM/DD/YYYY").valueOf(),max:"season-outlook"===e.view?x.a.utc(n+"-12-31","YYYY-MM-DD").valueOf():x.a.utc(e.chartWeatherData.dates_selected_year[e.chartWeatherData.dates_selected_year.length-1],"YYYY-MM-DD").valueOf(),labels:{align:"center",x:0,y:20},plotLines:h,dateTimeLabelFormats:{day:"%d %b",week:"%d %b",month:"%b<br/>%Y",year:"%Y"}},yAxis:[{title:{text:"Cumulative GDD",style:{"font-size":"14px",color:"#000000"}},min:0,gridZIndex:1,labels:{style:{color:"#000000"}}},{title:{text:"First/Last Freeze (# yrs)",align:"low",style:{"font-size":"14px",color:"#0000FF"}},min:0,max:8,visible:e.freezeIsEnabled,labels:{style:{color:"#0000FF"}},opposite:!0}],series:[{name:"Season to Date",data:e.chartWeatherData.gdd_ytd_selected.map((function(t,a){return[x.a.utc(e.chartWeatherData.dates_selected_year[a],"YYYY-MM-DD").valueOf(),t]})),type:"line",zIndex:24,lineWidth:2,color:"#00dd00",shadow:!1,marker:{enabled:!0,fillColor:"#00dd00",lineWidth:2,lineColor:"#00dd00",radius:2,symbol:"circle"}},{name:"6 Day Forecast",data:[],type:"line",zIndex:24,lineWidth:2,color:"#dd0000",shadow:!1,marker:{enabled:!0,fillColor:"#dd0000",lineWidth:2,lineColor:"#dd0000",radius:2,symbol:"circle"}},{name:"15 Year Average",data:e.chartWeatherData.gdd_ytd_15yr_ave.map((function(t,a){return[x.a.utc(e.chartWeatherData.dates_for_summary[a],"YYYY-MM-DD").valueOf(),t]})),type:"line",zIndex:23,lineWidth:2,color:"#0000ff",marker:{enabled:!1,states:{hover:{enabled:!1}}}},{name:'30 Year "Normal"',data:e.chartWeatherData.gdd_ytd_30yr_nor.map((function(t,a){return[x.a.utc(e.chartWeatherData.dates_for_summary[a],"YYYY-MM-DD").valueOf(),t]})),type:"line",zIndex:22,lineWidth:2,color:"#B041FF",marker:{enabled:!1,states:{hover:{enabled:!1}}}},{name:"Period of Record",data:e.chartWeatherData.gdd_ytd_por_min.map((function(t,a){return[x.a.utc(e.chartWeatherData.dates_for_summary[a],"YYYY-MM-DD").valueOf(),e.chartWeatherData.gdd_ytd_por_min[a],e.chartWeatherData.gdd_ytd_por_max[a]]})),type:"arearange",showInLegend:!0,zIndex:10,lineWidth:2,color:"#444444",fillColor:"#eeeeee",fillOpacity:.1,marker:{enabled:!1,states:{hover:{enabled:!1}},symbol:"square",lineWidth:2,lineColor:"#444444",radius:12}},{name:"First/Last Freezes (last 15 yrs)",type:"column",pointWidth:1,borderWidth:0,zIndex:"season-outlook"===e.view?1:25,visible:e.freezeIsEnabled,yAxis:1,showInLegend:e.freezeIsEnabled,enableMouseTracking:!1,data:s.concat(r)}]}}),e.dataIsLoading&&Object(V.jsx)(B.a,{style:{zIndex:1e3},invisible:!0,open:e.dataIsLoading,children:Object(V.jsx)(N.a,{size:200,color:"primary"})})]})},U=a(258),X=a(298),J=a(112),Q=a.n(J),q=a(10),$=a.n(q);a(227),a(228),a(229),a(230),a(231),a(131),a(237),a(247),a(248);window.jQuery=$.a;var K="".concat("https://maps.google.com/maps/api/js","?key=").concat("AIzaSyDv5pQYe9kRbolVUt0o8XSXSQl4g8BHrrQ"),Z=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).initMapDialog=function(){if(!n.state.mapDialogInitialized){var e={width:600,height:500,google:window.google};$()(".csftool-location-dialog").CsfToolLocationDialog(e),n.map_dialog=$()(".csftool-location-dialog").CsfToolLocationDialog(),n.map_dialog("bind","close",(function(e,t){var a=t.all_locations,o=t.selected_location;n.props.handleOutput(a,o)})),n.setState({mapDialogInitialized:!0})}},n.openMap=function(){n.map_dialog("locations",n.props.locations),n.map_dialog("open",n.props.selected)},n.handleScriptsLoaded=function(){n.state.googleMapsReady&&n.state.locationDialogReady&&n.initMapDialog()},n.handleLocationDialogLoad=function(){console.log("location dialog script loaded"),n.setState({locationDialogReady:!0}),n.handleScriptsLoaded()},n.handleGoogleMapsLoad=function(){console.log("google maps script loaded"),n.setState({googleMapsReady:!0}),n.handleScriptsLoaded()},n.state={googleMapsReady:!!window.google,locationDialogReady:!1,mapDialogInitialized:!1},n}return Object(c.a)(a,[{key:"render",value:function(){return Object(V.jsxs)("div",{className:"location-input-div",children:[!this.state.googleMapsReady&&Object(V.jsx)(Q.a,{isHydrating:!1,type:"text/javascript",src:K,onLoad:this.handleGoogleMapsLoad}),!this.state.locationDialogReady&&Object(V.jsx)(Q.a,{isHydrating:!1,type:"text/javascript",src:"https://nrcc-cornell.github.io/csf-location-picker-react/assets/location-dialog-min.js",onLoad:this.handleLocationDialogLoad}),this.state.mapDialogInitialized&&Object(V.jsx)(_.a,{variant:"contained",color:"primary",size:"small",onClick:this.openMap,children:"Edit"})]})}}]),a}(n.Component),ee=a(143),te=a(18),ae=a(296),ne=Object(p.a)((function(e){return{}}))((function(e){return Object(V.jsx)(te.a,{utils:ee.a,children:Object(V.jsx)(ae.a,{disableToolbar:!0,views:["date"],variant:"inline",format:"MM/dd/yyyy",minDate:"01/01/1980",maxDate:"12/31/2022",PopoverProps:{style:Object(j.a)({},{left:"180px",top:"-140px"})},margin:"normal",id:"date-picker-inline",label:"Planting Date",value:e.value,onChange:e.onchange,autoOk:!0,InputProps:{readOnly:!0},KeyboardButtonProps:{"aria-label":"change planting date"},style:{width:160}})})})),oe=a(299),re=a(292),se=a(307),ie=a(308),ce=function(e){return e+"\xb0F"},le=Object(p.a)((function(e){return{root:{display:"flex",flexWrap:"wrap"},formControl:{minWidth:160},menuPaper:{maxHeight:190,backgroundColor:b.a[600],color:"#ffffff"}}}))((function(e){var t=e.classes;return Object(V.jsx)("form",{className:t.root,autoComplete:"off",children:Object(V.jsxs)(re.a,{className:t.formControl,children:[Object(V.jsx)(se.a,{htmlFor:"gdd_base",children:"GDD Base"}),Object(V.jsx)(oe.a,{value:e.value,onChange:e.onchange,margin:"normal",MenuProps:{classes:{paper:t.menuPaper}},inputProps:{name:"gdd_base",id:"gdd_base"},children:e.values&&e.values.map((function(e,t){return Object(V.jsx)(ie.a,{value:e,children:ce(e)},t)}))})]})})})),de=a(306),he=Object(p.a)((function(e){return{root:{display:"flex",flexWrap:"wrap"},formControl:{minWidth:100,maxWidth:120}}}))((function(e){var t=e.classes;return Object(V.jsx)("form",{className:t.root,autoComplete:"off",children:Object(V.jsx)(re.a,{className:t.formControl,children:Object(V.jsx)(de.a,{fullWidth:!0,color:"primary",label:"GDD Target",margin:"none",value:e.value,disabled:!e.enabled,onChange:e.onchange,inputProps:{name:"gdd_target",id:"gdd_target"}})})})})),ue=a(302),pe=a(89),ge=a(293),fe=Object(p.a)({root:{color:pe.a[600],"&$checked":{color:pe.a[800]}},checked:{}})((function(e){return Object(V.jsx)(ue.a,Object(j.a)({color:"default"},e))})),be=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return Object(V.jsx)(ge.a,{control:Object(V.jsx)(fe,{checked:this.props.value,onChange:this.props.onchange,name:"enableTarget"}),label:""})}}]),a}(n.Component),me=Object(p.a)((function(e){return{root:{display:"flex",flexWrap:"wrap"},formControl:{minWidth:100,maxWidth:120}}}))((function(e){var t=e.classes;return Object(V.jsx)("form",{className:t.root,autoComplete:"off",children:Object(V.jsx)(re.a,{className:t.formControl,children:Object(V.jsx)(de.a,{fullWidth:!0,color:"primary",label:"Frost Temp (\xb0F)",margin:"none",value:e.value,disabled:!e.enabled,onChange:e.onchange,inputProps:{name:"freeze_threshold",id:"freeze_threshold"}})})})})),je=Object(p.a)({root:{color:pe.a[600],"&$checked":{color:pe.a[800]}},checked:{}})((function(e){return Object(V.jsx)(ue.a,Object(j.a)({color:"default"},e))})),Oe=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return Object(V.jsx)(ge.a,{control:Object(V.jsx)(je,{checked:this.props.value,onChange:this.props.onchange,name:"enableTarget"})})}}]),a}(n.Component),ye=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return Object(V.jsx)(X.a,{paddingTop:1,border:2,borderRadius:4,borderColor:"primary.main",children:Object(V.jsxs)(O.a,{container:!0,item:!0,direction:"column",spacing:3,children:[Object(V.jsxs)(O.a,{container:!0,item:!0,direction:"column",spacing:0,children:[Object(V.jsx)(O.a,{item:!0,container:!0,justify:"center",alignItems:"center",children:Object(V.jsxs)(U.a,{style:{marginRight:30,marginLeft:30},children:[Object(V.jsx)("b",{children:"Current Location:"}),Object(V.jsx)("br",{}),this.props.locations[this.props.selected].address]})}),Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"row",justify:"center",alignItems:"center",spacing:1,children:[Object(V.jsx)(O.a,{item:!0,children:Object(V.jsx)(Z,{namespace:"CSF-GDDTOOL",locations:this.props.locations,selected:this.props.selected,handleOutput:this.props.onchange_locationPicker})}),Object(V.jsx)(O.a,{item:!0,children:Object(V.jsx)(_.a,{variant:"summary"===this.props.view?"contained":"outlined",color:"primary",size:"small",disabled:!0,onClick:function(){return e.props.onchange_view("summary")},children:"Summary"})})]})]}),Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"column",justify:"center",alignItems:"center",spacing:2,children:[Object(V.jsx)(O.a,{item:!0,children:Object(V.jsx)(ne,{value:this.props.locations[this.props.selected].planting_date,onchange:this.props.onchange_plantingDate})}),Object(V.jsx)(O.a,{item:!0,children:Object(V.jsx)(le,{value:this.props.locations[this.props.selected].gdd_base,values:this.props.gdd_list,onchange:this.props.onchange_locInfo})}),Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"row",justify:"center",alignItems:"flex-end",children:[Object(V.jsx)(be,{value:this.props.targetIsEnabled,onchange:this.props.onchange_targetIsEnabled}),Object(V.jsx)(he,{value:this.props.locations[this.props.selected].gdd_target,enabled:this.props.targetIsEnabled,onchange:this.props.onchange_locInfo})]}),Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"row",justify:"center",alignItems:"flex-end",children:[Object(V.jsx)(Oe,{value:this.props.freezeIsEnabled,onchange:this.props.onchange_freezeIsEnabled}),Object(V.jsx)(me,{value:this.props.locations[this.props.selected].freeze_threshold,enabled:this.props.freezeIsEnabled,onchange:this.props.onchange_locInfo})]})]})]})})}}]),a}(o.a.Component),_e=a(142),ve=a.n(_e),xe=a(304),De=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={anchorEl:null},e.handleClick=function(t){e.setState({anchorEl:t.currentTarget})},e.handleClose=function(){e.setState({anchorEl:null})},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this.state.anchorEl,t=Boolean(e);return Object(V.jsxs)("div",{children:[Object(V.jsxs)(_.a,{variant:"text",color:"secondary",size:"small",onClick:this.handleClick,children:[Object(V.jsx)(ve.a,{}),"Select chart details"]}),Object(V.jsx)(xe.a,{id:"simple-popper",open:t,anchorEl:e,onClose:this.handleClose,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},children:this.props.content})]})}}]),a}(o.a.Component),Ie=Object(p.a)((function(e){return{typography:{margin:e.spacing(2)}}}))(De);function Ce(e,t,a){var n={};return n=Object(j.a)(Object(j.a)(Object(j.a)(Object(j.a)({},n),function(e,t){var a=t.slice(6,10)+"-"+t.slice(0,2)+"-"+t.slice(3,5),n=t.slice(6,10),o=null;return{dates_selected_year:(o=e.filter((function(e,t,o){return e[0].split("-")[0]===n&&a<=e[0]}))).map((function(e){return e[0]})),gdd_ytd_selected:o.map((function(e){return-999!==e[1]?e[1]:null}))}}(e,t)),function(e,t){var a=t.slice(6,10)+"-"+t.slice(0,2)+"-"+t.slice(3,5),n=t.slice(6,10),o=x()().format("YYYY"),r=x()([n]).isLeapYear(),s=null,i=null,c=[],l=[],d=[],h=[],u=[],p=function(e){return e.reduce((function(e,t){return e+t}),0)/e.length};function g(e,t,a){return e[0].slice(5)===this}return s=e.filter((function(e,t,n){var r=e[0].split("-")[0]!==o,s=a.slice(5)<=e[0].slice(5);return r&&s})),(i=Object(W.a)(new Set(s.map((function(e){return e[0].slice(5)}))))).sort(),i.forEach((function(e){if("02-29"!==e||r){var t=s.filter(g,e).map((function(e){return e[1]}));c.push(n+"-"+e),l.push(Math.max.apply(Math,Object(W.a)(t))),d.push(Math.min.apply(Math,Object(W.a)(t))),h.push(p(t.slice(-15))),u.push(p(t.slice(1991-parseInt(o,10),2020-parseInt(o,10))))}})),{dates_for_summary:c,gdd_ytd_por_max:l,gdd_ytd_por_min:d,gdd_ytd_15yr_ave:h,gdd_ytd_30yr_nor:u}}(e,t)),function(e,t,a){if(!a)return{datesOfFirstFreeze_15yr:[],datesOfLastFreeze_15yr:[]};for(var n,o,r,s,i=t.slice(6,10),c=x()().format("YYYY"),l=[],d=[],h=[],u=e.map((function(e){return e[0]})),p=1;p<16;p++)l.push(parseInt(c,10)-p);function g(e,t,n){return e[2]<=parseInt(a,10)}return(n=l.map((function(e){return e.toString()+"-06-30"}))).sort(),n.forEach((function(t){o=u.indexOf(t),(r=e.slice(o-180,o).filter(g)).length>0?h.push(r.slice(-1)[0][0]):h=[],(s=e.slice(o,o+180).filter(g)).length>0?d.push(s[0][0]):d=[]})),d=d.map((function(e){return i+e.slice(4)})),h=h.map((function(e){return i+e.slice(4)})),d.length>0&&d.sort(),h.length>0&&h.sort(),{datesOfFirstFreeze_15yr:d,datesOfLastFreeze_15yr:h}}(e,t,a))}var we=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).getAcisParamsGDD=function(){return{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({loc:[n.state.locations[n.state.selected].lng,n.state.locations[n.state.selected].lat].join(),sdate:"1980-01-01",edate:x()().format("YYYY-MM-DD"),grid:"nrcc-model",elems:[{name:"gdd",base:"86/50"===n.state.locations[n.state.selected].gdd_base?50:parseInt(n.state.locations[n.state.selected].gdd_base,10),limit:"86/50"===n.state.locations[n.state.selected].gdd_base?[86,50]:[1e3,-1e3],interval:[0,0,1],duration:"std",season_start:[parseInt(n.state.locations[n.state.selected].planting_date.slice(0,2),10),parseInt(n.state.locations[n.state.selected].planting_date.slice(3,5),10)],reduce:"sum",maxmissing:"0"},{name:"mint",interval:[0,0,1]}]})}},n.handleSelectedLocationChange=function(e){n.setState({selected:e})},n.handleLocationInfoChange=function(e){var t=e.target.name,a=e.target.value;n.setState((function(e){return Object(j.a)(Object(j.a)({},e),{},{locations:Object(j.a)(Object(j.a)({},e.locations),Object(m.a)({},e.selected,Object(j.a)(Object(j.a)({},e.locations[e.selected]),{},Object(m.a)({},t,a))))})}))},n.handleLocationPickerOutput=function(e,t){var a={};for(var o in e)e.hasOwnProperty(o)&&(n.state.locations.hasOwnProperty(o)?a[o]=Object(j.a)(Object(j.a)(Object(j.a)({},n.defaultLocation),n.state.locations[o]),e[o]):a[o]=Object(j.a)(Object(j.a)({},n.defaultLocation),e[o]));n.setState({locations:a,selected:t.id})},n.handleDataChange=function(e){n.setState({pointData:e})},n.handleViewChange=function(e){n.setState({view:e})},n.handleDataIsLoadingChange=function(e){n.setState({dataIsLoading:e})},n.handlePlantingDateChange=function(){var e={target:{name:"planting_date",value:arguments.length<=1?void 0:arguments[1]}};n.handleLocationInfoChange(e)},n.handleTargetIsEnabledChange=function(){n.setState((function(e){return{targetIsEnabled:!e.targetIsEnabled}}))},n.handleFreezeIsEnabledChange=function(){n.setState((function(e){return{freezeIsEnabled:!e.freezeIsEnabled}}))},n.gdd_list=["86/50","50","49","48","47","46","45","44","43","42","41","40","39","38","37","36","35","34","33","32"],n.defaultLocation={address:"Cornell University, Ithaca, NY",lat:42.45,lng:-76.48,id:"default",planting_date:"01/01/2022",gdd_base:"50",gdd_target:"1500",freeze_threshold:"32"},n.defaultLocations={default:n.defaultLocation},n.state={locations:I()("CSF-GDDTOOL.locations")||n.defaultLocations,selected:I()("CSF-GDDTOOL.selected")||n.defaultLocation.id,pointData:null,dataIsLoading:!1,targetIsEnabled:!1,freezeIsEnabled:!1,view:"season-outlook"},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.state.locations&&this.state.selected&&(this.handleDataIsLoadingChange(!0),setTimeout((function(){L({param:e.getAcisParamsGDD()}).then((function(t){e.handleDataChange(t),e.handleDataIsLoadingChange(!1)}))}),1e3))}},{key:"componentDidUpdate",value:function(e,t){var a=this;t.selected===this.state.selected&&t.locations[t.selected].planting_date===this.state.locations[this.state.selected].planting_date&&t.locations[t.selected].gdd_base===this.state.locations[this.state.selected].gdd_base||(this.handleDataIsLoadingChange(!0),setTimeout((function(){L({param:a.getAcisParamsGDD()}).then((function(e){a.handleDataChange(e),a.handleDataIsLoadingChange(!1)}))}),1e3)),t.locations!==this.state.locations&&I.a.set("CSF-GDDTOOL.locations",this.state.locations),t.selected!==this.state.selected&&I.a.set("CSF-GDDTOOL.selected",this.state.selected)}},{key:"render",value:function(){var e,t,a,n=this;return this.state.pointData&&(e=Object(V.jsx)(H,{locInfo:this.state.locations[this.state.selected],freezeIsEnabled:this.state.freezeIsEnabled,targetIsEnabled:this.state.targetIsEnabled,chartWeatherData:Ce(this.state.pointData.data,this.state.locations[this.state.selected].planting_date,this.state.locations[this.state.selected].freeze_threshold),view:this.state.view,dataIsLoading:this.state.dataIsLoading})),t=Object(V.jsx)(ye,{locations:this.state.locations,selected:this.state.selected,view:this.state.view,targetIsEnabled:this.state.targetIsEnabled,freezeIsEnabled:this.state.freezeIsEnabled,gdd_list:this.gdd_list,onchange_locationPicker:this.handleLocationPickerOutput,onchange_view:this.handleViewChange,onchange_plantingDate:this.handlePlantingDateChange,onchange_locInfo:this.handleLocationInfoChange,onchange_targetIsEnabled:this.handleTargetIsEnabledChange,onchange_freezeIsEnabled:this.handleFreezeIsEnabledChange}),a=Object(V.jsx)(Ie,{content:t}),Object(V.jsxs)(V.Fragment,{children:[Object(V.jsxs)(O.a,{container:!0,direction:"row",justify:"stretch",spacing:0,children:[Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"column",justify:"top",alignItems:"center",spacing:1,md:!0,children:[Object(V.jsx)(y.a,{mdUp:!0,children:a}),Object(V.jsx)(y.a,{smDown:!0,children:t})]}),Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"column",justify:"center",alignItems:"center",spacing:1,md:9,children:[Object(V.jsx)(O.a,{item:!0,style:{width:"100%",height:"70vh"},children:this.state.pointData&&e}),Object(V.jsxs)(O.a,{item:!0,container:!0,direction:"row",justify:"center",alignItems:"center",spacing:1,children:[Object(V.jsx)(O.a,{item:!0,children:this.state.pointData&&Object(V.jsx)(_.a,{variant:"season-to-date"===this.state.view?"contained":"outlined",color:"primary",size:"small",onClick:function(){return n.handleViewChange("season-to-date")},children:"Season To Date"})}),Object(V.jsx)(O.a,{item:!0,children:this.state.pointData&&Object(V.jsx)(_.a,{variant:"season-outlook"===this.state.view?"contained":"outlined",color:"primary",size:"small",onClick:function(){return n.handleViewChange("season-outlook")},children:"Season Outlook"})})]})]})]}),Object(V.jsx)("div",{className:"csftool-location-dialog"})]})}}]),a}(n.Component),Ye=Object(h.a)({shadows:Array(25).fill("none"),palette:{primary:{main:b.a[800]},alternativeTextColor:b.a[800]},overrides:{MUIDataTableBodyRow:{root:{"&:nth-child(odd)":{backgroundColor:"#D3D3D3"}}}},typography:{body2:{fontSize:"0.8rem","@media (min-width:960px)":{fontSize:"1.0rem"}}}}),ze=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return Object(V.jsx)(u.a,{theme:Ye,children:Object(V.jsx)("div",{id:"container",className:"App",children:Object(V.jsx)(we,{})})})}}]),a}(n.Component),Le=Object(p.a)((function(e){return{root:{}}}))(Object(g.a)(ze));s.a.render(Object(V.jsx)(Le,{}),document.getElementById("csftool-content"))}},[[254,1,2]]]);
//# sourceMappingURL=main.f7361153.chunk.js.map