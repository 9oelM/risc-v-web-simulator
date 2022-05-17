"use strict";(self.webpackChunk_risc_v_web_simulator_app=self.webpackChunk_risc_v_web_simulator_app||[]).push([[220],{2220:(e,n,i)=>{i.r(n),i.d(n,{SettingsPanelImpure:()=>o,SettingsPanelPure:()=>c});var r=i(2903),a=i(4511),t=i(2784),s=i(529);const o=(0,s.Uu)((({RVSSettings:e,setRVSSettings:n})=>{const i=(0,t.useCallback)((e=>()=>n((n=>Object.assign(Object.assign({},n),{[e]:!n[e]})))),[n]),a=(0,t.useCallback)(i("is_br_pred_on"),[i]),s=(0,t.useCallback)(i("is_data_fwd_on"),[i]),o=(0,t.useCallback)(i("is_debug_on"),[i]);return(0,r.tZ)(c,Object.assign({},Object.assign(Object.assign({},e),{onToggleDebug:o,onToggleDataFwd:s,onToggleBrPred:a})))}))(),c=(0,s.Uu)((({is_br_pred_on:e,is_debug_on:n,is_data_fwd_on:i,onToggleBrPred:t,onToggleDataFwd:s,onToggleDebug:o})=>{const c=(0,a.a)();return(0,r.BX)("article",{children:[(0,r.BX)("div",Object.assign({css:{padding:"0.5rem",margin:"0.5rem",border:`1px solid ${c.buttonBorder}`}},{children:[(0,r.tZ)("input",{css:{cursor:"pointer"},type:"checkbox",name:"Enable debug mode",onChange:o,checked:Boolean(n)}),(0,r.tZ)("label",Object.assign({css:{cursor:"pointer"},onClick:o,htmlFor:"scales"},{children:"Enable debug mode"})),(0,r.tZ)("p",Object.assign({css:{margin:0,padding:0,fontSize:"0.8rem"}},{children:"Gives more detailed output in 'Latest Execution Output'. Equivalent to -DDEBUG flag in Kite."}))]})),(0,r.BX)("div",Object.assign({css:{padding:"0.5rem",margin:"0.5rem",border:`1px solid ${c.buttonBorder}`}},{children:[(0,r.tZ)("input",{css:{cursor:"pointer"},type:"checkbox",name:"Enable data forwarding",checked:Boolean(i),onChange:s}),(0,r.tZ)("label",Object.assign({css:{cursor:"pointer"},onClick:s,htmlFor:"Enable data forwarding"},{children:"Enable data forwarding"})),(0,r.BX)("p",Object.assign({css:{margin:0,padding:0,fontSize:"0.8rem"}},{children:["You may see improved performance if this is enabled. Equivalent to -DDATA_FWD flag in Kite. "," ",(0,r.tZ)("a",Object.assign({css:{color:c.linkText,fontSize:"0.8rem"},href:"https://en.wikipedia.org/wiki/Operand_forwarding",target:"_blank",rel:"noreferrer"},{children:"What is data forwarding?"}))]}))]})),(0,r.BX)("div",Object.assign({css:{padding:"0.5rem",margin:"0.5rem",border:`1px solid ${c.buttonBorder}`}},{children:[(0,r.tZ)("input",{css:{cursor:"pointer"},type:"checkbox",name:"Enable branch prediction",checked:Boolean(e),onChange:t}),(0,r.tZ)("label",Object.assign({css:{cursor:"pointer"},onClick:t,htmlFor:"Enable branch prediction"},{children:"Enable branch prediction"})),(0,r.BX)("p",Object.assign({css:{margin:0,padding:0,fontSize:"0.8rem"}},{children:["You may see improved performance if this is enabled. Equivalent to -DBR_PRED flag in Kite. "," ",(0,r.tZ)("a",Object.assign({css:{color:c.linkText,fontSize:"0.8rem"},href:"https://en.wikipedia.org/wiki/Branch_predictor",target:"_blank",rel:"noreferrer"},{children:"What is branch prediction?"}))]}))]})),(0,r.tZ)("div",Object.assign({css:{padding:"0.5rem",margin:"0.5rem"}},{children:(0,r.tZ)("p",Object.assign({css:{fontSize:"0.8rem",textAlign:"right"}},{children:"RISC-V Web Simulator is based on Kite version 1.8."}))}))]})}))()}}]);