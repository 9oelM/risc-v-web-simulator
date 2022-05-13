"use strict";(self.webpackChunk_risc_v_web_simulator_app=self.webpackChunk_risc_v_web_simulator_app||[]).push([[957],{2957:(e,t,i)=>{i.r(t),i.d(t,{EditorImpure:()=>k,EditorPure:()=>w});var o=i(2903),r=i(2784),n=i(529);const a=()=>(0,o.tZ)("div",{children:(0,o.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}),void 0)},void 0);var s=i(4511);const c=()=>(0,o.tZ)("div",{children:(0,o.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}),void 0)},void 0);var l=i(1605);const d=(0,n.Uu)((({executionOutput:e})=>{const[t,i]=(0,r.useState)(!1),n=(0,r.useRef)(!0),a=(0,r.useRef)(null);return(0,r.useEffect)((()=>{n.current?n.current=!1:(a.current&&window.clearTimeout(a.current),i((e=>!e)),a.current=window.setTimeout((()=>{i(!1)}),1e3))}),[e]),(0,o.tZ)(u,Object.assign({},{executionOutput:e,animate:t}),void 0)}))(c),u=(0,n.Uu)((({executionOutput:e,animate:t})=>{const i=(0,s.a)();return(0,o.tZ)("section",Object.assign({css:{padding:"0 0 0 0.5rem",width:"100%",height:"100%"}},{children:(0,o.BX)(l.mQ,{children:[(0,o.tZ)(l.td,{children:(0,o.tZ)(l.OK,{children:"Latest execution output"},void 0)},void 0),(0,o.tZ)(l.x4,{children:(0,o.tZ)("pre",Object.assign({css:{border:t?"2px solid rgb(61, 225, 61)":`2px solid ${i.background}`,background:i.background,borderRadius:"0.3rem",padding:"0.5rem",overflowY:"scroll",height:"calc(100% - 0.5rem)",width:"calc(100% - 1.5rem)",color:i.text,fontSize:"0.85rem",whiteSpace:"pre-wrap",transition:t?"none":"all 1.5s ease-out"}},{children:null!=e?e:"Execution output will appear here once you run the code."}),void 0)},void 0)]},void 0)}),void 0)}))(c),g=()=>(0,o.tZ)("div",{children:(0,o.tZ)("p",Object.assign({style:{color:"red"}},{children:"Oops. Something went wrong. Please try again."}),void 0)},void 0),h=(0,n.Uu)((({codeState:e,registerState:t,memoryState:i,kiteWasmRequestResult:n,setExecutionOutput:a,RVSSettings:s})=>{const c=null!==n.current&&!(n.current instanceof Error),l=(0,r.useCallback)((()=>{if(!n.current)return;if(n.current instanceof Error)return;console.log(n.current);const{_run_kite_once:o,allocate:r,ALLOC_NORMAL:c,intArrayFromString:l,_free:d,UTF8ToString:u,_get_exception_message:g,_malloc:h,setValue:b}=n.current,{is_debug_on:p,is_data_fwd_on:m,is_br_pred_on:v}=s,x=r(l(e),"i8",c),f=r(l(i),"i8",c),O=r(l(t),"i8",c);console.log(`is_debug_on ${p}`);const S=h(1),k=h(1),w=h(1);b(S,p,"i8"),b(k,m,"i8"),b(w,v,"i8");const y=`Latest execution time: ${(new Date).toLocaleString()}`;let Z=null,j=null;try{Z=o(x,f,O,S,k,w),console.log(Z);const e=u(Z);a(`${y}\n${e}`)}catch(e){j=e,Z=g(j),a(`${y}\n${u(Z)}`)}finally{[x,f,O,S,k,w].forEach(d),[Z,j].forEach((e=>{e&&d(e)}))}}),[e,t,i,s]);return(0,r.useEffect)((()=>{document.addEventListener("keypress",(e=>{console.log(e),"KeyR"===e.code&&e.altKey&&e.ctrlKey&&l()}))}),[l]),(0,o.tZ)(b,Object.assign({},{onClickRunButton:l,isKiteWasmAvailable:c}),void 0)}))(g),b=(0,n.Uu)((({onClickRunButton:e,isKiteWasmAvailable:t})=>{const i=(0,s.a)();return(0,o.tZ)("button",Object.assign({css:{display:"inline-block",borderBottom:"none",bottom:"-1px",position:"absolute",listStyle:"none",padding:"6px 12px",cursor:"pointer",right:0,top:0,height:35,background:i.linkText,color:i.text,borderRadius:"5px",border:`1px solid ${i.buttonBorder}`,marginLeft:"auto",transition:"all 0.3s ease-out","&:hover":{background:i.buttonBgHover}},onClick:e},{children:t?"Run (Ctrl + Alt + R)":"Wait.."}),void 0)}))(g);var p=i(9156);const m=({isEditorStateNewlySaved:e})=>{const t=(0,s.a)();return(0,o.BX)("header",Object.assign({css:{height:"2rem",width:"100%",background:t.background,color:t.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},{children:[(0,o.BX)("h1",Object.assign({css:{fontSize:"0.8rem",padding:0,margin:0,display:"inline"}},{children:[(0,o.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/9oelM/risc-v-web-simulator",rel:"noreferrer"},{children:"RISC-V Web simulator"}),void 0)," ","/"]}),void 0),(0,o.BX)("p",Object.assign({css:{color:t.text,fontSize:"0.8rem",padding:0,margin:0,display:"inline"}},{children:[" ","Creator:"," ",(0,o.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/9oelM",rel:"noreferrer"},{children:"@9oelM"}),void 0)," ","/"," ","Credits:"," ",(0,o.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/yonsei-icsl/kite",rel:"noreferrer"},{children:"Kite"}),void 0)," ","by"," ",(0,o.tZ)("a",Object.assign({css:{color:t.linkText},target:"_blank",href:"https://github.com/wjhsong",rel:"noreferrer"},{children:"@wjhsong"}),void 0)," ","/"," ",(0,o.tZ)("a",Object.assign({css:{color:t.linkText,fontSize:"0.8rem",padding:0,margin:0,display:"inline"},target:"_blank",href:"https://github.com/9oelM/risc-v-web-simulator",rel:"noreferrer"},{children:"This project"}),void 0)," ","runs on"," ",(0,o.tZ)("a",Object.assign({css:{color:t.linkText,fontSize:"0.8rem",padding:0,margin:0,display:"inline"},target:"_blank",href:"https://webassembly.org",rel:"noreferrer"},{children:"WebAssembly"}),void 0),"!",(0,o.tZ)("a",Object.assign({css:{fontSize:"0.8rem",top:"6px",left:"5px",position:"relative"},href:"#"},{children:(0,o.tZ)("img",{src:"https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2F9oelm.github.io%2Frisc-v-web-simulator%2F&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"},void 0)}),void 0),(0,o.tZ)("span",Object.assign({css:{marginLeft:"1rem",transition:"all 1s ease-out",color:e?t.text:t.background}},{children:"auto-saved"}),void 0)]}),void 0)]}),void 0)};var v=i(6768),x=i(7140),f=i(6170);const O=r.lazy((()=>i.e(220).then(i.bind(i,2220)).then((({SettingsPanelImpure:e})=>({default:e}))))),S=r.lazy((()=>i.e(171).then(i.bind(i,2171)).then((({ExamplesPanelImpure:e})=>({default:e}))))),k=(0,n.Uu)((e=>{var{setRegisterState:t,setCodeState:i,setMemoryState:n}=e,a=function(e,t){var i={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(i[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(i[o[r]]=e[o[r]])}return i}(e,["setRegisterState","setCodeState","setMemoryState"]);const s=(0,r.useCallback)((({target:e})=>{t(e.value)}),[t]),c=(0,r.useCallback)((({target:e})=>{i(e.value)}),[t]),l=(0,r.useCallback)((({target:e})=>{n(e.value)}),[t]),[d,u]=(0,p.l)(0),g=(0,r.useCallback)((e=>()=>{t(f.a.examples[e].reg_state),i(f.a.examples[e].program_code),n(f.a.examples[e].memory_state),u(0)}),[t,i,n,u]),[h,b]=(0,p.l)(null);return(0,o.tZ)(w,Object.assign({},Object.assign(Object.assign({},a),{onCodeStateChange:c,onMemoryStateChange:l,onRegisterStateChange:s,onClickLoadExample:g,executionOutput:h,setExecutionOutput:b,tabIndex:d,onSelectTabIndex:u})),void 0)}))(a),w=(0,n.Uu)((({codeState:e,registerState:t,memoryState:i,onCodeStateChange:n,onMemoryStateChange:a,onRegisterStateChange:c,kiteWasmRequestResult:u,executionOutput:g,setExecutionOutput:b,RVSSettings:p,setRVSSettings:f,onClickLoadExample:k,onSelectTabIndex:w,tabIndex:y,isEditorStateNewlySaved:Z})=>{const j=(0,s.a)();return(0,o.BX)("main",Object.assign({css:{display:"flex",flexDirection:"column",width:"100%",height:"100%",background:j.background}},{children:[(0,o.tZ)(h,Object.assign({},{codeState:e,registerState:t,memoryState:i,setExecutionOutput:b,kiteWasmRequestResult:u,RVSSettings:p}),void 0),(0,o.tZ)(m,Object.assign({},{isEditorStateNewlySaved:Z}),void 0),(0,o.BX)("div",Object.assign({css:{display:"flex",width:"100%",height:"calc(100% - 2rem)",background:j.background,"@media (max-width: 710px)":{flexDirection:"column"}}},{children:[(0,o.tZ)("section",Object.assign({css:{display:"flex",width:"55%",height:"100%",background:j.background,"@media (max-width: 710px)":{width:"100%",height:"65%"}}},{children:(0,o.BX)(l.mQ,Object.assign({selectedIndex:y,onSelect:w},{children:[(0,o.BX)(l.td,{children:[(0,o.tZ)(l.OK,{children:"Code"},void 0),(0,o.tZ)(l.OK,{children:"Memory"},void 0),(0,o.tZ)(l.OK,{children:"Register"},void 0),(0,o.tZ)(l.OK,{children:"Settings"},void 0),(0,o.tZ)(l.OK,{children:"Examples"},void 0)]},void 0),(0,o.tZ)(l.x4,{children:(0,o.tZ)("textarea",{value:e,onChange:n,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:j.background,color:j.text}},void 0)},void 0),(0,o.tZ)(l.x4,{children:(0,o.tZ)("textarea",{value:i,onChange:a,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:j.background,color:j.text}},void 0)},void 0),(0,o.tZ)(l.x4,{children:(0,o.tZ)("textarea",{value:t,onChange:c,spellCheck:!1,css:{overflowY:"scroll",height:"calc(100% - 1.5rem)",padding:"0.5rem",width:"calc(100% - 0.5rem)",background:j.background,color:j.text}},void 0)},void 0),(0,o.tZ)(l.x4,{children:(0,o.tZ)(v.SV,Object.assign({Fallback:(0,o.tZ)("div",Object.assign({css:{color:"red"}},{children:"Settings failed to load."}),void 0)},{children:(0,o.tZ)(r.Suspense,Object.assign({fallback:(0,o.tZ)(x.k,{},void 0)},{children:(0,o.tZ)(O,Object.assign({},{RVSSettings:p,setRVSSettings:f}),void 0)}),void 0)}),void 0)},void 0),(0,o.tZ)(l.x4,{children:(0,o.tZ)(v.SV,Object.assign({Fallback:(0,o.tZ)("div",Object.assign({css:{color:"red"}},{children:"Examples failed to load."}),void 0)},{children:(0,o.tZ)(r.Suspense,Object.assign({fallback:(0,o.tZ)(x.k,{},void 0)},{children:(0,o.tZ)(S,Object.assign({},{onClickLoadExample:k}),void 0)}),void 0)}),void 0)},void 0)]}),void 0)}),void 0),(0,o.tZ)("section",Object.assign({css:{display:"flex",width:"45%",height:"calc(100% - 2rem)",background:j.background,borderLeft:`1px solid ${j.buttonBorder}`,"@media (max-width: 710px)":{position:"absolute",bottom:0,left:0,width:"100%",height:"30%",borderLeft:"none",paddingTop:"0.5rem",borderTop:`1px solid ${j.buttonBorder}`}}},{children:(0,o.tZ)(d,Object.assign({},{executionOutput:g}),void 0)}),void 0)]}),void 0)]}),void 0)}))(a)}}]);