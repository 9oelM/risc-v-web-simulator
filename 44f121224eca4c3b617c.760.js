"use strict";(self.webpackChunk_risc_v_web_simulator_app=self.webpackChunk_risc_v_web_simulator_app||[]).push([[760],{8760:(e,t,o)=>{o.r(t),o.d(t,{EditorImpure:()=>w,EditorPure:()=>Z});var i=o(2903),n=o(2784),r=o(529);const s=()=>(0,i.tZ)("div",{children:(0,i.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}),void 0)},void 0);var a=o(4511);const c=()=>(0,i.tZ)("div",{children:(0,i.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}),void 0)},void 0);var l=o(1605);const d=(0,r.Uu)((({executionOutput:e})=>{const[t,o]=(0,n.useState)(!1),r=(0,n.useRef)(!0),s=(0,n.useRef)(null);return(0,n.useEffect)((()=>{r.current?r.current=!1:(s.current&&window.clearTimeout(s.current),o((e=>!e)),s.current=window.setTimeout((()=>{o(!1)}),1e3))}),[e]),(0,i.tZ)(u,Object.assign({},{executionOutput:e,animate:t}),void 0)}))(c),u=(0,r.Uu)((({executionOutput:e,animate:t})=>{const o=(0,a.a)();return(0,i.tZ)("section",Object.assign({css:{padding:"0 0 0 0.5rem",width:"100%",height:"100%"}},{children:(0,i.BX)(l.mQ,{children:[(0,i.tZ)(l.td,{children:(0,i.tZ)(l.OK,{children:"Latest execution output"},void 0)},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)("pre",Object.assign({css:{border:t?"2px solid rgb(61, 225, 61)":`2px solid ${o.background}`,background:o.background,borderRadius:"0.3rem",padding:"0.5rem",overflowY:"scroll",height:"calc(100% - 0.5rem)",width:"calc(100% - 1.5rem)",color:o.text,fontSize:"0.85rem",whiteSpace:"pre-wrap",transition:t?"none":"all 1.5s ease-out"}},{children:null!=e?e:"Execution output will appear here once you run the code."}),void 0)},void 0)]},void 0)}),void 0)}))(c),g=()=>(0,i.tZ)("div",{children:(0,i.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}),void 0)},void 0),h=(0,r.Uu)((({codeState:e,registerState:t,memoryState:o,kiteWasmRequestResult:r,setExecutionOutput:s,RVSSettings:a})=>{const c=null!==r.current&&!(r.current instanceof Error),l=(0,n.useCallback)((()=>{if(!r.current)return;if(r.current instanceof Error)return;console.log(r.current);const{_run_kite_once:i,allocate:n,ALLOC_NORMAL:c,intArrayFromString:l,_free:d,UTF8ToString:u,_get_exception_message:g,_malloc:h,setValue:b}=r.current,{is_debug_on:p,is_data_fwd_on:m,is_br_pred_on:v}=a,k=n(l(e),"i8",c),x=n(l(o),"i8",c),O=n(l(t),"i8",c);console.log(`is_debug_on ${p}`);const S=h(1),f=h(1),y=h(1);b(S,p,"i8"),b(f,m,"i8"),b(y,v,"i8");const w=`Latest execution time: ${(new Date).toLocaleString()}`;let Z=null,j=null;try{Z=i(k,x,O,S,f,y),console.log(Z);const e=u(Z);s(`${w}\n${e}`)}catch(e){j=e,Z=g(j),s(`${w}\n${u(Z)}`)}finally{[k,x,O,S,f,y].forEach(d),[Z,j].forEach((e=>{e&&d(e)}))}}),[e,t,o,a]);return(0,n.useEffect)((()=>{document.addEventListener("keypress",(e=>{console.log(e),"KeyR"===e.code&&e.altKey&&e.ctrlKey&&l()}))}),[l]),(0,i.tZ)(b,Object.assign({},{onClickRunButton:l,isKiteWasmAvailable:c}),void 0)}))(g),b=(0,r.Uu)((({onClickRunButton:e,isKiteWasmAvailable:t})=>{const o=(0,a.a)();return(0,i.tZ)("button",Object.assign({css:{display:"inline-block",borderBottom:"none",bottom:"-1px",position:"absolute",listStyle:"none",padding:"6px 12px",cursor:"pointer",right:0,top:0,height:35,background:o.linkText,color:o.background,borderRadius:"5px",border:`1px solid ${o.buttonBorder}`,marginLeft:"auto",transition:"all 0.3s ease-out","&:hover":{background:o.buttonBgHover}},onClick:e},{children:t?"Run (Ctrl + Alt + R)":"Wait.."}),void 0)}))(g);var p=o(9156);const m=({isEditorStateNewlySaved:e})=>{const t=(0,a.a)();return(0,i.BX)("header",Object.assign({css:{height:"2rem",width:"100%",background:t.background,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},{children:[(0,i.BX)("h1",Object.assign({css:{fontSize:"0.8rem",padding:0,margin:0,display:"inline"}},{children:[(0,i.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/9oelM/risc-v-web-simulator",rel:"noreferrer"},{children:"RISC-V Web simulator"}),void 0)," ","/"]}),void 0),(0,i.BX)("p",Object.assign({css:{color:t.text,fontSize:"0.8rem",padding:0,margin:0,display:"inline"}},{children:[" ","Creator:"," ",(0,i.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/9oelM",rel:"noreferrer"},{children:"@9oelM"}),void 0)," ","/"," ","Credits:"," ",(0,i.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/yonsei-icsl/kite",rel:"noreferrer"},{children:"Kite"}),void 0)," ","by"," ",(0,i.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/wjhsong",rel:"noreferrer"},{children:"@wjhsong"}),void 0)," ","/"," ",(0,i.tZ)("a",Object.assign({css:{color:t.linkText,fontSize:"0.8rem",padding:0,margin:0,display:"inline"},target:"_blank",href:"https://github.com/9oelM/risc-v-web-simulator",rel:"noreferrer"},{children:"This project"}),void 0)," ","runs on"," ",(0,i.tZ)("a",Object.assign({css:{color:t.linkText,fontSize:"0.8rem",padding:0,margin:0,display:"inline"},target:"_blank",href:"https://webassembly.org",rel:"noreferrer"},{children:"WebAssembly"}),void 0),"!",(0,i.tZ)("a",Object.assign({css:{fontSize:"0.8rem",top:"6px",left:"5px",position:"relative"},href:"#"},{children:(0,i.tZ)("img",{src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io%2Frisc-v-web-simulator%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"},void 0)}),void 0),(0,i.tZ)("span",Object.assign({css:{marginLeft:"1rem",transition:"all 1s ease-out",color:e?t.text:t.background}},{children:"auto-saved"}),void 0)]}),void 0)]}),void 0)};var v=o(6768),k=o(7140),x=o(6170);const O=(0,r.Uu)((({memoryState:e,codeState:t,registerState:o})=>{const[r,s]=(0,n.useState)(!1),a=(0,n.useRef)(null),c=(0,n.useCallback)((()=>{a.current&&window.clearTimeout(a.current);const i=e=>window.btoa(window.unescape(encodeURIComponent(e)));!function(e){const t=document.createElement("input");t.setAttribute("value",e),document.body.appendChild(t),t.select();document.execCommand("copy");document.body.removeChild(t)}(`${"localhost:8080"===window.location.host?"http://localhost:8080/":"https://9oelm.github.io/risc-v-web-simulator/"}?s=t&c=${i(t)}&m=${i(e)}&r=${i(o)}`),s(!0),a.current=window.setTimeout((()=>{s(!1)}),1e4)}),[e,t,o]);return(0,i.tZ)(S,Object.assign({},{onClickCopyButton:c,isCopyButtonJustClicked:r}),void 0)}))(),S=(0,r.Uu)((({onClickCopyButton:e,isCopyButtonJustClicked:t})=>{const o=(0,a.a)();return(0,i.tZ)("section",Object.assign({css:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},{children:(0,i.tZ)("button",Object.assign({css:{borderRadius:"0.5rem",padding:"1rem",width:"20rem",height:"15rem",background:o.buttonBg,cursor:"pointer",border:`1px solid ${o.buttonBorder}`,color:o.background,"&:hover":{background:o.buttonBgHover}},onClick:e},{children:t?(0,i.tZ)("p",{children:"Link copied to your clipboard"},void 0):(0,i.BX)(i.HY,{children:["Click here to share link to",(0,i.tZ)("span",Object.assign({css:{display:"block"}},{children:"your code, memory and register states with others"}),void 0),(0,i.BX)("p",Object.assign({css:{color:o.background,margin:0,padding:0}},{children:["(If your code is really long,",(0,i.tZ)("span",Object.assign({css:{display:"block"}},{children:"it might not work or not everything may get shared)"}),void 0)]}),void 0)]},void 0)}),void 0)}),void 0)}))();const f=n.lazy((()=>o.e(220).then(o.bind(o,2220)).then((({SettingsPanelImpure:e})=>({default:e}))))),y=n.lazy((()=>o.e(171).then(o.bind(o,2171)).then((({ExamplesPanelImpure:e})=>({default:e}))))),w=(0,r.Uu)((e=>{var{setRegisterState:t,setCodeState:o,setMemoryState:r}=e,s=function(e,t){var o={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(o[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(o[i[n]]=e[i[n]])}return o}(e,["setRegisterState","setCodeState","setMemoryState"]);const a=(0,n.useCallback)((({target:e})=>{t(e.value)}),[t]),c=(0,n.useCallback)((({target:e})=>{o(e.value)}),[t]),l=(0,n.useCallback)((({target:e})=>{r(e.value)}),[t]),[d,u]=(0,p.l)(0),g=(0,n.useCallback)((e=>()=>{t(x.a.examples[e].reg_state),o(x.a.examples[e].program_code),r(x.a.examples[e].memory_state),u(0)}),[t,o,r,u]),[h,b]=(0,p.l)(null);return(0,i.tZ)(Z,Object.assign({},Object.assign(Object.assign({},s),{onCodeStateChange:c,onMemoryStateChange:l,onRegisterStateChange:a,onClickLoadExample:g,executionOutput:h,setExecutionOutput:b,tabIndex:d,onSelectTabIndex:u})),void 0)}))(s),Z=(0,r.Uu)((({codeState:e,registerState:t,memoryState:o,onCodeStateChange:r,onMemoryStateChange:s,onRegisterStateChange:c,kiteWasmRequestResult:u,executionOutput:g,setExecutionOutput:b,RVSSettings:p,setRVSSettings:x,onClickLoadExample:S,onSelectTabIndex:w,tabIndex:Z,isEditorStateNewlySaved:j})=>{const C=(0,a.a)();return(0,i.BX)("main",Object.assign({css:{display:"flex",flexDirection:"column",width:"100%",height:"100%",background:C.background}},{children:[(0,i.tZ)(h,Object.assign({},{codeState:e,registerState:t,memoryState:o,setExecutionOutput:b,kiteWasmRequestResult:u,RVSSettings:p}),void 0),(0,i.tZ)(m,Object.assign({},{isEditorStateNewlySaved:j}),void 0),(0,i.BX)("div",Object.assign({css:{display:"flex",width:"100%",height:"calc(100% - 2rem)",background:C.background,"@media (max-width: 710px)":{flexDirection:"column"}}},{children:[(0,i.tZ)("section",Object.assign({css:{display:"flex",width:"55%",height:"100%",background:C.background,"@media (max-width: 710px)":{width:"100%",height:"65%"}}},{children:(0,i.BX)(l.mQ,Object.assign({selectedIndex:Z,onSelect:w},{children:[(0,i.BX)(l.td,{children:[(0,i.tZ)(l.OK,{children:"Code"},void 0),(0,i.tZ)(l.OK,{children:"Memory"},void 0),(0,i.tZ)(l.OK,{children:"Register"},void 0),(0,i.tZ)(l.OK,{children:"Settings"},void 0),(0,i.tZ)(l.OK,{children:"Examples"},void 0),(0,i.tZ)(l.OK,{children:"Share"},void 0)]},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)("textarea",{value:e,onChange:r,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:C.background,color:C.text}},void 0)},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)("textarea",{value:o,onChange:s,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:C.background,color:C.text}},void 0)},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)("textarea",{value:t,onChange:c,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:C.background,color:C.text}},void 0)},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)(v.SV,Object.assign({Fallback:(0,i.tZ)("div",Object.assign({css:{color:"red"}},{children:"Settings failed to load."}),void 0)},{children:(0,i.tZ)(n.Suspense,Object.assign({fallback:(0,i.tZ)(k.k,{},void 0)},{children:(0,i.tZ)(f,Object.assign({},{RVSSettings:p,setRVSSettings:x}),void 0)}),void 0)}),void 0)},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)(v.SV,Object.assign({Fallback:(0,i.tZ)("div",Object.assign({css:{color:"red"}},{children:"Examples failed to load."}),void 0)},{children:(0,i.tZ)(n.Suspense,Object.assign({fallback:(0,i.tZ)(k.k,{},void 0)},{children:(0,i.tZ)(y,Object.assign({},{onClickLoadExample:S}),void 0)}),void 0)}),void 0)},void 0),(0,i.tZ)(l.x4,{children:(0,i.tZ)(v.SV,Object.assign({Fallback:(0,i.tZ)("div",Object.assign({css:{color:"red"}},{children:"Share panel failed to load."}),void 0)},{children:(0,i.tZ)(n.Suspense,Object.assign({fallback:(0,i.tZ)(k.k,{},void 0)},{children:(0,i.tZ)(O,Object.assign({},{memoryState:o,codeState:e,registerState:t}),void 0)}),void 0)}),void 0)},void 0)]}),void 0)}),void 0),(0,i.tZ)("section",Object.assign({css:{display:"flex",width:"45%",height:"calc(100% - 2rem)",background:C.background,borderLeft:`1px solid ${C.buttonBorder}`,"@media (max-width: 710px)":{position:"absolute",bottom:0,left:0,width:"100%",height:"30%",borderLeft:"none",paddingTop:"0.5rem",borderTop:`1px solid ${C.buttonBorder}`}}},{children:(0,i.tZ)(d,Object.assign({},{executionOutput:g}),void 0)}),void 0)]}),void 0)]}),void 0)}))(s)}}]);