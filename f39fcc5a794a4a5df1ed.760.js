"use strict";(self.webpackChunk_risc_v_web_simulator_app=self.webpackChunk_risc_v_web_simulator_app||[]).push([[760],{8760:(e,t,n)=>{n.r(t),n.d(t,{EditorImpure:()=>Z,EditorPure:()=>j});var r=n(2903),i=n(2784),o=n(529);const s=()=>(0,r.tZ)("div",{children:(0,r.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}))});var a=n(4511);const c=()=>(0,r.tZ)("div",{children:(0,r.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}))});var l=n(1605);const d=(0,o.Uu)((({executionOutput:e})=>{const[t,n]=(0,i.useState)(!1),o=(0,i.useRef)(!0),s=(0,i.useRef)(null);return(0,i.useEffect)((()=>{o.current?o.current=!1:(s.current&&window.clearTimeout(s.current),n((e=>!e)),s.current=window.setTimeout((()=>{n(!1)}),1e3))}),[e]),(0,r.tZ)(u,Object.assign({},{executionOutput:e,animate:t}))}))(c),u=(0,o.Uu)((({executionOutput:e,animate:t})=>{const n=(0,a.a)();return(0,r.tZ)("section",Object.assign({css:{padding:"0 0 0 0.5rem",width:"100%",height:"100%"}},{children:(0,r.BX)(l.mQ,{children:[(0,r.tZ)(l.td,{children:(0,r.tZ)(l.OK,{children:"Latest execution output"})}),(0,r.tZ)(l.x4,{children:(0,r.tZ)("pre",Object.assign({css:{border:t?"2px solid rgb(61, 225, 61)":`2px solid ${n.background}`,background:n.background,borderRadius:"0.3rem",padding:"0.5rem",overflowY:"scroll",height:"calc(100% - 0.5rem)",width:"calc(100% - 1.5rem)",color:n.text,fontSize:"0.85rem",whiteSpace:"pre-wrap",transition:t?"none":"all 1.5s ease-out"}},{children:null!=e?e:"Execution output will appear here once you run the code."}))})]})}))}))(c),g=()=>(0,r.tZ)("div",{children:(0,r.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}))}),h=(0,o.Uu)((({codeState:e,registerState:t,memoryState:n,kiteWasmRequestResult:o,setExecutionOutput:s,RVSSettings:a})=>{const c=null!==o.current&&!(o.current instanceof Error),l=(0,i.useCallback)((()=>{if(!o.current)return;if(o.current instanceof Error)return;const{_run_kite_once:r,allocate:i,ALLOC_NORMAL:c,intArrayFromString:l,_free:d,UTF8ToString:u,_get_exception_message:g,_malloc:h,setValue:b}=o.current,{is_debug_on:p,is_data_fwd_on:m,is_br_pred_on:k}=a,x=i(l(e),"i8",c),f=i(l(n),"i8",c),O=i(l(t),"i8",c),S=h(1),y=h(1),w=h(1);b(S,p,"i8"),b(y,m,"i8"),b(w,k,"i8");const Z=`Latest execution time: ${(new Date).toLocaleString()}`;let j=null,v=null;try{j=r(x,f,O,S,y,w);const e=u(j);s(`${Z}\n${e}`)}catch(e){v=e,j=g(v),s(`${Z}\n${u(j)}`)}finally{[x,f,O,S,y,w].forEach(d),[j,v].forEach((e=>{e&&d(e)}))}}),[e,t,n,a]);return(0,i.useEffect)((()=>{function e(e){"KeyR"===e.code&&e.altKey&&e.ctrlKey&&l()}return document.addEventListener("keypress",e),()=>document.removeEventListener("keypress",e)}),[l]),(0,r.tZ)(b,Object.assign({},{onClickRunButton:l,isKiteWasmAvailable:c}))}))(g),b=(0,o.Uu)((({onClickRunButton:e,isKiteWasmAvailable:t})=>{const n=(0,a.a)();return(0,r.tZ)("button",Object.assign({css:{display:"inline-block",borderBottom:"none",bottom:"-1px",position:"absolute",listStyle:"none",padding:"6px 12px",cursor:"pointer",right:0,top:0,height:35,background:n.linkText,color:n.background,borderRadius:"5px",border:`1px solid ${n.buttonBorder}`,marginLeft:"auto",transition:"all 0.3s ease-out","&:hover":{background:n.buttonBgHover}},onClick:e},{children:t?"Run (Ctrl + Alt + R)":"Wait.."}))}))(g);var p=n(9156);const m=({isEditorStateNewlySaved:e})=>{const t=(0,a.a)();return(0,r.BX)("header",Object.assign({css:{height:"2rem",width:"100%",background:t.background,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},{children:[(0,r.BX)("h1",Object.assign({css:{fontSize:"0.8rem",padding:0,margin:0,display:"inline"}},{children:[(0,r.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/9oelM/risc-v-web-simulator",rel:"noreferrer"},{children:"RISC-V Web simulator"}))," ","/"]})),(0,r.BX)("p",Object.assign({css:{color:t.text,fontSize:"0.8rem",padding:0,margin:0,display:"inline"}},{children:[" ","Creator:"," ",(0,r.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/9oelM",rel:"noreferrer"},{children:"@9oelM"}))," ","/"," ","Credits:"," ",(0,r.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/yonsei-icsl/kite",rel:"noreferrer"},{children:"Kite"}))," ","by"," ",(0,r.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/wjhsong",rel:"noreferrer"},{children:"@wjhsong"}))," ","/"," ",(0,r.tZ)("a",Object.assign({css:{color:t.linkText,fontSize:"0.8rem",padding:0,margin:0,display:"inline"},target:"_blank",href:"https://github.com/9oelM/risc-v-web-simulator",rel:"noreferrer"},{children:"This project"}))," ","runs on"," ",(0,r.tZ)("a",Object.assign({css:{color:t.linkText,fontSize:"0.8rem",padding:0,margin:0,display:"inline"},target:"_blank",href:"https://webassembly.org",rel:"noreferrer"},{children:"WebAssembly"})),"!",(0,r.tZ)("a",Object.assign({css:{fontSize:"0.8rem",top:"6px",left:"5px",position:"relative"},href:"#"},{children:(0,r.tZ)("img",{src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io%2Frisc-v-web-simulator%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"})})),(0,r.tZ)("span",Object.assign({css:{marginLeft:"1rem",transition:"all 1s ease-out",color:e?t.text:t.background}},{children:"auto-saved"}))]}))]}))};var k=n(6768),x=n(7140),f=n(6170);const O=(0,o.Uu)((({memoryState:e,codeState:t,registerState:n})=>{const[o,s]=(0,i.useState)(!1),a=(0,i.useRef)(null),c=(0,i.useCallback)((()=>{var e;a.current&&window.clearTimeout(a.current),function(e){const t=document.createElement("input");t.setAttribute("value",e),document.body.appendChild(t),t.select();document.execCommand("copy");document.body.removeChild(t)}(`${"localhost:8080"===window.location.host?"http://localhost:8080/":"https://9oelm.github.io/risc-v-web-simulator/"}?s=t&c=${e=t,window.btoa(window.unescape(encodeURIComponent(e)))}`),s(!0),a.current=window.setTimeout((()=>{s(!1)}),1e4)}),[e,t,n]);return(0,r.tZ)(S,Object.assign({},{onClickCopyButton:c,isCopyButtonJustClicked:o}))}))(),S=(0,o.Uu)((({onClickCopyButton:e,isCopyButtonJustClicked:t})=>{const n=(0,a.a)();return(0,r.tZ)("section",Object.assign({css:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},{children:(0,r.tZ)("button",Object.assign({css:{borderRadius:"0.5rem",padding:"1rem",width:"20rem",height:"15rem",background:n.buttonBg,cursor:"pointer",border:`1px solid ${n.buttonBorder}`,color:n.background,"&:hover":{background:n.buttonBgHover}},onClick:e},{children:t?(0,r.tZ)("p",{children:"Link copied to your clipboard"}):(0,r.BX)(r.HY,{children:["Click here to share link to",(0,r.tZ)("span",Object.assign({css:{display:"block"}},{children:"your code (excluding memory and register, for technical reasons)"})),(0,r.BX)("p",Object.assign({css:{color:n.background,margin:0,padding:0}},{children:["(BTW If your code is really long,",(0,r.tZ)("span",Object.assign({css:{display:"block"}},{children:"it might not work or not everything may get shared)"}))]}))]})}))}))}))();const y=i.lazy((()=>n.e(220).then(n.bind(n,2220)).then((({SettingsPanelImpure:e})=>({default:e}))))),w=i.lazy((()=>n.e(171).then(n.bind(n,2171)).then((({ExamplesPanelImpure:e})=>({default:e}))))),Z=(0,o.Uu)((e=>{var{setRegisterState:t,setCodeState:n,setMemoryState:o}=e,s=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]])}return n}(e,["setRegisterState","setCodeState","setMemoryState"]);const a=(0,i.useCallback)((({target:e})=>{t(e.value)}),[t]),c=(0,i.useCallback)((({target:e})=>{n(e.value)}),[t]),l=(0,i.useCallback)((({target:e})=>{o(e.value)}),[t]),[d,u]=(0,p.l)(0),g=(0,i.useCallback)((e=>()=>{t(f.a.examples[e].reg_state),n(f.a.examples[e].program_code),o(f.a.examples[e].memory_state),u(0)}),[t,n,o,u]),[h,b]=(0,p.l)(null);return(0,r.tZ)(j,Object.assign({},Object.assign(Object.assign({},s),{onCodeStateChange:c,onMemoryStateChange:l,onRegisterStateChange:a,onClickLoadExample:g,executionOutput:h,setExecutionOutput:b,tabIndex:d,onSelectTabIndex:u})))}))(s),j=(0,o.Uu)((({codeState:e,registerState:t,memoryState:n,onCodeStateChange:o,onMemoryStateChange:s,onRegisterStateChange:c,kiteWasmRequestResult:u,executionOutput:g,setExecutionOutput:b,RVSSettings:p,setRVSSettings:f,onClickLoadExample:S,onSelectTabIndex:Z,tabIndex:j,isEditorStateNewlySaved:v})=>{const C=(0,a.a)();return(0,r.BX)("main",Object.assign({css:{display:"flex",flexDirection:"column",width:"100%",height:"100%",background:C.background}},{children:[(0,r.tZ)(h,Object.assign({},{codeState:e,registerState:t,memoryState:n,setExecutionOutput:b,kiteWasmRequestResult:u,RVSSettings:p})),(0,r.tZ)(m,Object.assign({},{isEditorStateNewlySaved:v})),(0,r.BX)("div",Object.assign({css:{display:"flex",width:"100%",height:"calc(100% - 2rem)",background:C.background,"@media (max-width: 710px)":{flexDirection:"column"}}},{children:[(0,r.tZ)("section",Object.assign({css:{display:"flex",width:"55%",height:"100%",background:C.background,"@media (max-width: 710px)":{width:"100%",height:"65%"}}},{children:(0,r.BX)(l.mQ,Object.assign({selectedIndex:j,onSelect:Z},{children:[(0,r.BX)(l.td,{children:[(0,r.tZ)(l.OK,{children:"Code"}),(0,r.tZ)(l.OK,{children:"Memory"}),(0,r.tZ)(l.OK,{children:"Register"}),(0,r.tZ)(l.OK,{children:"Settings"}),(0,r.tZ)(l.OK,{children:"Examples"}),(0,r.tZ)(l.OK,{children:"Share"})]}),(0,r.tZ)(l.x4,{children:(0,r.tZ)("textarea",{value:e,onChange:o,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:C.background,color:C.text}})}),(0,r.tZ)(l.x4,{children:(0,r.tZ)("textarea",{value:n,onChange:s,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:C.background,color:C.text}})}),(0,r.tZ)(l.x4,{children:(0,r.tZ)("textarea",{value:t,onChange:c,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:C.background,color:C.text}})}),(0,r.tZ)(l.x4,{children:(0,r.tZ)(k.SV,Object.assign({Fallback:(0,r.tZ)("div",Object.assign({css:{color:"red"}},{children:"Settings failed to load."}))},{children:(0,r.tZ)(i.Suspense,Object.assign({fallback:(0,r.tZ)(x.k,{})},{children:(0,r.tZ)(y,Object.assign({},{RVSSettings:p,setRVSSettings:f}))}))}))}),(0,r.tZ)(l.x4,{children:(0,r.tZ)(k.SV,Object.assign({Fallback:(0,r.tZ)("div",Object.assign({css:{color:"red"}},{children:"Examples failed to load."}))},{children:(0,r.tZ)(i.Suspense,Object.assign({fallback:(0,r.tZ)(x.k,{})},{children:(0,r.tZ)(w,Object.assign({},{onClickLoadExample:S}))}))}))}),(0,r.tZ)(l.x4,{children:(0,r.tZ)(k.SV,Object.assign({Fallback:(0,r.tZ)("div",Object.assign({css:{color:"red"}},{children:"Share panel failed to load."}))},{children:(0,r.tZ)(i.Suspense,Object.assign({fallback:(0,r.tZ)(x.k,{})},{children:(0,r.tZ)(O,Object.assign({},{memoryState:n,codeState:e,registerState:t}))}))}))})]}))})),(0,r.tZ)("section",Object.assign({css:{display:"flex",width:"45%",height:"calc(100% - 2rem)",background:C.background,borderLeft:`1px solid ${C.buttonBorder}`,"@media (max-width: 710px)":{position:"absolute",bottom:0,left:0,width:"100%",height:"30%",borderLeft:"none",paddingTop:"0.5rem",borderTop:`1px solid ${C.buttonBorder}`}}},{children:(0,r.tZ)(d,Object.assign({},{executionOutput:g}))}))]}))]}))}))(s)}}]);