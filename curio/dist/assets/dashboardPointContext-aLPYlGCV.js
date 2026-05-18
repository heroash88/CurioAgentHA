const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./jspdf.es.min-BT3RSwHj.js","./main-C2chIEfX.js","./react-CPkiFScu.js","./main-BXp5FjPG.css","./browser-CXh1ITwj.js"])))=>i.map(i=>d[i]);
import{r as qe}from"./randomId-suUo7Lgn.js";import{a0 as Ve,a1 as Ue,a2 as je,Z as Ke,$ as Je,_ as ne}from"./main-C2chIEfX.js";import{r as P}from"./react-CPkiFScu.js";import{L as Xe,ae as Ze,N as Ye,af as Qe,g as et}from"./CardErrorBoundary-BqZLhDOx.js";const tt=new Set(["amber","black","blue","brown","cyan","gray","green","grey","indigo","lime","magenta","orange","pink","purple","red","rose","sky","slate","teal","violet","white","yellow"]),ae={amber:"#f59e0b",rose:"#f43f5e",sky:"#0ea5e9",slate:"#64748b"},rt=/^<span\s+style=(["'])\s*color\s*:\s*([^;"']+)\s*;?\s*\1\s*>([\s\S]*?)<\/span>$/i,ot=e=>{const t=e.trim(),r=t.toLowerCase();return ae[r]?ae[r]:tt.has(r)?r:/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(t)||/^(?:rgb|rgba|hsl|hsla)\(\s*[-+0-9.%\s,/]+\s*\)$/i.test(t)?t:null},nt=e=>{const t=e.trim().match(rt);if(!t)return null;const r=ot(t[2]);return r?{text:t[3],color:r}:null},X={ActionButton:["label","message","tone"],Accordion:["children","title"],AccordionItem:["title","child","open"],AreaChart:["labels","series","title","options"],BarChart:["labels","series","title","options"],Badge:["label","tone"],Button:["label","action","tone","variant"],Buttons:["children"],Callout:["tone","title","detail"],CalendarHeatmap:["values","title","options"],Card:["children","variant","effects","surface","tone","density","accent"],CardHeader:["title","subtitle","icon"],Carousel:["children","label"],Checklist:["children","title"],ChecklistItem:["label","done","detail"],Col:["header","values","type"],CodeBlock:["code","language","title"],DashboardGrid:["children","columns","density"],DashboardWidget:["title","children","size","tone","shape","icon"],DateTimeInput:["name","label","mode","value"],Divider:["label"],DonutChart:["labels","values","title","options"],Drawer:["label","title","child"],EmptyState:["title","detail","icon"],ActionSheet:["title","actions","detail"],ActionSheetItem:["label","detail","icon","tone","action"],ContextualToolbar:["title","actions","detail"],ExpressiveHero:["title","subtitle","metric","icon","tone","actionLabel"],FloatingActionCluster:["actions","label"],GlanceTile:["label","value","detail","icon","tone"],LargeMetricCard:["label","value","detail","trend","tone","icon"],FilterChips:["label","options","defaultValue"],FilterDropdown:["label","options","defaultValue"],FunnelChart:["labels","values","title","options"],Form:["name","buttons","children"],FormControl:["label","child","help"],Gauge:["label","value","max","tone","detail"],Grid:["children","columns"],Heatmap:["rows","columns","values","title","options"],ForecastBand:["labels","low","high","actual","title","options"],GanttTimeline:["items","title"],HeroPanel:["title","subtitle","metric","icon","tone"],ImagePanel:["title","detail","icon"],Insight:["title","detail","tone","icon"],InsightStack:["children","title"],Input:["name","placeholder","type","value"],TextArea:["name","placeholder","value","rows"],JsonTree:["value","title"],KeyValueList:["rows","title"],LineChart:["labels","series","title","options"],LiveUpdateCard:["title","status","detail","progress","icon","tone"],MetricCompare:["label","leftValue","rightValue","winner","detail"],Modal:["label","title","child"],Page:["title","subtitle","children","tone","layout"],PieChart:["labels","values","title","options"],PivotTable:["data","rowKey","columnKey","valueKey","title"],PrimaryActionPill:["label","action","icon","tone"],ProgressBar:["label","value","max","detail","tone"],RadarChart:["labels","values","title","options"],RouteMap:["stops","title"],RouteProgress:["stops","title","activeIndex"],Section:["title","children","subtitle","tone"],SankeyFlow:["flows","title"],Select:["name","value","items","placeholder"],SelectItem:["value","label"],SegmentedTabs:["children","defaultTab"],Series:["name","data"],Slider:["name","label","min","max","step","value"],SnackToast:["title","detail","tone","actionLabel","action"],SkeletonBlock:["label","lines","height"],SortableTable:["headers","rows","title","sortBy"],ScatterChart:["points","title","options"],Sparkline:["values","title","options"],StatCard:["label","value","detail","tone"],StatGrid:["children"],Tab:["label","child"],Tabs:["children","defaultTab"],Table:["headers","rows","title"],TaskList:["children","title"],TextContent:["text","size"],TonalContainer:["title","children","tone","shape"],Timeline:["children","title"],TimelineItem:["time","title","detail","tone"],Toggle:["name","label","value"],Treemap:["labels","values","title","options"],WaterfallChart:["labels","values","title","options"],Swimlane:["lanes","title"],CorrelationMatrix:["labels","matrix","title","options"],AnomalyStrip:["labels","values","threshold","title","options"],StatusTimeline:["items","title"],SuggestionChips:["options","label","active"]},at={AreaChart:{categories:"labels",data:"series",dataset:"series",datasets:"series",months:"labels",points:"series",temps:"series",temperatures:"series",values:"series",x:"labels",xLabels:"labels",y:"series",yValues:"series"},CalendarHeatmap:{data:"values",dates:"values",rows:"values"},BarChart:{categories:"labels",data:"series",dataset:"series",datasets:"series",months:"labels",points:"series",temps:"series",temperatures:"series",values:"series",x:"labels",xLabels:"labels",y:"series",yValues:"series"},CardHeader:{caption:"subtitle",description:"subtitle",heading:"title",name:"title"},Carousel:{title:"label"},CodeBlock:{content:"code",text:"code"},Col:{data:"values",field:"values",label:"header",title:"header"},DonutChart:{categories:"labels",data:"values",dataset:"values",months:"labels",series:"values",shares:"values"},DashboardGrid:{content:"children",items:"children",widgets:"children"},DashboardWidget:{content:"children",items:"children",label:"title",name:"title",widgetSize:"size"},DateTimeInput:{defaultValue:"value",type:"mode"},FunnelChart:{categories:"labels",data:"values",dataset:"values",steps:"labels",series:"values"},Heatmap:{cols:"columns",data:"values",matrix:"values"},ForecastBand:{data:"actual",highValues:"high",labels:"labels",lowValues:"low",series:"actual",values:"actual"},GanttTimeline:{data:"items",rows:"items",tasks:"items"},HeroPanel:{description:"subtitle",value:"metric"},Insight:{description:"detail",subtitle:"detail"},InsightStack:{insights:"children",items:"children"},LineChart:{categories:"labels",data:"series",dataset:"series",datasets:"series",months:"labels",points:"series",temps:"series",temperatures:"series",values:"series",x:"labels",xLabels:"labels",y:"series",yValues:"series"},Page:{content:"children",items:"children",sections:"children",widgets:"children"},PieChart:{categories:"labels",data:"values",dataset:"values",months:"labels",series:"values",shares:"values"},PivotTable:{columns:"columnKey",dataKey:"valueKey",rows:"rowKey",values:"valueKey"},ProgressBar:{current:"value",total:"max"},RadarChart:{axes:"labels",categories:"labels",data:"values",scores:"values",series:"values"},RouteMap:{data:"stops",items:"stops",route:"stops"},SankeyFlow:{data:"flows",items:"flows",links:"flows"},ScatterChart:{data:"points",values:"points"},Section:{child:"children",content:"children"},Select:{defaultValue:"value",options:"items"},Slider:{defaultValue:"value"},SortableTable:{columns:"headers",data:"rows",items:"rows"},Sparkline:{data:"values",series:"values"},Treemap:{categories:"labels",data:"values",series:"values"},WaterfallChart:{categories:"labels",data:"values",series:"values"},Swimlane:{data:"lanes",items:"lanes"},CorrelationMatrix:{data:"matrix",values:"matrix"},AnomalyStrip:{data:"values",series:"values"},StatCard:{name:"label",subtitle:"detail",title:"label"},Table:{columns:"headers",data:"rows",items:"rows"},TaskList:{data:"children",items:"children",label:"title",name:"title",rows:"children",tasks:"children"},TextContent:{body:"text",content:"text"}},Z=/[A-Za-z_$]/,Y=/[A-Za-z0-9_$]/,it=/^[A-Za-z_$][A-Za-z0-9_$]*$/,st=new Set(["AnomalyStrip","AreaChart","BarChart","CalendarHeatmap","CorrelationMatrix","DonutChart","ForecastBand","FunnelChart","Heatmap","LineChart","PieChart","RadarChart","ScatterChart","Sparkline","Treemap","WaterfallChart"]),q=new Set(["Accordion","Buttons","Card","Carousel","Checklist","DashboardGrid","DashboardWidget","Form","Grid","InsightStack","Page","Section","StatGrid","Tabs","TaskList","Timeline"]),lt=/```(?:openui|openui-lang|oui)\s*\n([\s\S]*?)```/i,ct=/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/,dt=new Set(["Query","Mutation"]),E=(e,t)=>{const r=e[t];let o=t+1;for(;o<e.length;){const n=e[o];if(n==="\\"){o+=2;continue}if(n===r)return o;o+=1}return e.length-1},Q=(e,t)=>{let r=0;for(let o=t;o<e.length;o+=1){const n=e[o];if(n==='"'||n==="'"){o=E(e,o);continue}if(n==="(")r+=1;else if(n===")"&&(r-=1,r===0))return o}return-1},ut=e=>new Set([...e.matchAll(/^\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*=/gm)].map(t=>t[1])),pt=(e,t)=>{if(!e.has(t))return e.add(t),t;let r=2;for(;e.has(`${t}${r}`);)r+=1;const o=`${t}${r}`;return e.add(o),o},mt=e=>/^\s*[A-Za-z_$][A-Za-z0-9_$]*\s*=\s*$/.test(e),gt=e=>{const t=[];for(let c=0;c<e.length;c+=1){const p=e[c];if(p==='"'||p==="'"){c=E(e,c);continue}if(!Z.test(p))continue;const u=c;for(c+=1;c<e.length&&Y.test(e[c]);)c+=1;const m=e.slice(u,c);if(!dt.has(m)){c-=1;continue}let d=c;for(;d<e.length&&/\s/.test(e[d]);)d+=1;if(e[d]!=="("){c-=1;continue}const y=e.lastIndexOf(`
`,u-1)+1;if(mt(e.slice(y,u))){c-=1;continue}const g=Q(e,d);if(g<0){c-=1;continue}t.push({start:u,end:g+1,componentName:m,callSource:e.slice(u,g+1)}),c=g}if(t.length===0)return e;const r=ut(e),o=new Map,n=[];let a="",i=0;for(const c of t){let p=o.get(c.callSource);p||(p=pt(r,c.componentName==="Mutation"?"mutation":"data"),o.set(c.callSource,p),n.push(`${p} = ${c.callSource}`)),a+=e.slice(i,c.start),a+=p,i=c.end}a+=e.slice(i);const s=a.replace(/\r\n?/g,`
`).split(`
`);let l=0;for(;/^\s*\$[A-Za-z_$][A-Za-z0-9_$]*\s*=/.test(s[l]||"");)l+=1;return s.splice(l,0,...n),s.join(`
`)},$=e=>{const t=[];let r=0,o=0;for(let a=0;a<e.length;a+=1){const i=e[a];if(i==='"'||i==="'"){a=E(e,a);continue}if(i==="("||i==="["||i==="{"){r+=1;continue}if(i===")"||i==="]"||i==="}"){r=Math.max(0,r-1);continue}i===","&&r===0&&(t.push(e.slice(o,a).trim()),o=a+1)}const n=e.slice(o).trim();return n&&t.push(n),t},xe=e=>{let t=0;for(let r=0;r<e.length;r+=1){const o=e[r];if(o==='"'||o==="'"){r=E(e,r);continue}if(o==="("||o==="["||o==="{"){t+=1;continue}if(o===")"||o==="]"||o==="}"){t=Math.max(0,t-1);continue}if(o==="="&&t===0&&e[r-1]!=="="&&e[r+1]!=="=")return r}return-1},we=e=>{let t=0;for(let r=0;r<e.length;r+=1){const o=e[r];if(o==='"'||o==="'"){r=E(e,r);continue}if(o==="("||o==="["||o==="{"){t+=1;continue}if(o===")"||o==="]"||o==="}"){t=Math.max(0,t-1);continue}if(o===":"&&t===0)return r}return-1},ee=e=>{const t=e.trim();if(!t.startsWith("{")||!t.endsWith("}"))return null;let r=0;for(let o=0;o<t.length;o+=1){const n=t[o];if(n==='"'||n==="'"){o=E(t,o);continue}if(n==="{")r+=1;else if(n==="}"&&(r-=1,r===0&&o<t.length-1))return null}return r===0?t.slice(1,-1).trim():null},Se=e=>{const t=e.trim();if(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'"))try{return JSON.parse(t.replace(/^'/,'"').replace(/'$/,'"'))}catch{return t.slice(1,-1)}return t},N=e=>ee(e)!==null,ht=e=>{const t=e.map(r=>ee(r)).filter(r=>r!==null&&r.length>0);return t.length===0?null:`{ ${t.join(", ")} }`},ie=(e,t)=>{if(!st.has(e))return t;const r=X[e],o=r.indexOf("title"),n=r.indexOf("options");if(o<0||n!==o+1)return t;const a=[...t];a.length>o&&N(a[o])&&a.splice(o,0,'""');const i=a[n],s=[...i&&N(i)?[i]:[],...a.slice(n+1).filter(N)],l=ht(s);return l&&(a[n]=l),a.slice(0,r.length)},ft=(e,t)=>{var o;if(e!=="Form"||t.length!==2)return t;const r=((o=t[1])==null?void 0:o.trim())||"";return r.startsWith("[")||/^FormControl\s*\(/.test(r)?[t[0],"null",t[1]]:t},bt=(e,t)=>t==="children"&&q.has(e)?"[]":null,yt=(e,t)=>{const r=xe(e),o=r>=0?r:we(e);return o<0?!1:t.has(Se(e.slice(0,o)))},xt=(e,t)=>{var y;const r=X[e];if(!r)return t;const o=$(t),n=o.length===1?ee(o[0]):null,a=n===null?o:$(n),i=new Map,s=new Map;let l=[];for(const g of a){const x=xe(g),A=x>=0?x:n===null?-1:we(g);if(A<0){l.push(g);continue}const I=Se(g.slice(0,A)),W=g.slice(A+1).trim();if(!it.test(I)||!W){l.push(g);continue}const D=((y=at[e])==null?void 0:y[I])||I;if(!r.includes(D)){s.set(I,W),l.push(g);continue}i.set(D,W)}if(e==="Card"&&!i.has("children")){const g=s.get("title")||s.get("heading")||s.get("name");if(g){i.set("children",`[CardHeader(${g})]`);const x=new Set(["title","heading","name"]);l=l.filter(A=>!yt(A,x))}}if(i.size===0){const g=ie(e,ft(e,l));return g.length===0&&q.has(e)&&r.includes("children")?"[]":g.join(", ")}const c=Math.max(...[...i.keys()].map(g=>r.indexOf(g))),p=q.has(e)&&!i.has("children")?r.indexOf("children"):-1,u=Math.max(c,p,l.length-1),m=[];let d=0;for(let g=0;g<=u&&g<r.length;g+=1){const x=r[g];if(i.has(x)){m.push(i.get(x)||"null");continue}if(d<l.length){m.push(l[d]),d+=1;continue}m.push(bt(e,x)||"null")}for(;d<l.length;)m.push(l[d]),d+=1;return ie(e,m).join(", ")},ve=e=>{let t="",r=0;for(;r<e.length;){const o=e[r];if(o==='"'||o==="'"){const p=E(e,r);t+=e.slice(r,p+1),r=p+1;continue}if(!Z.test(o)){t+=o,r+=1;continue}const n=r;for(r+=1;r<e.length&&Y.test(e[r]);)r+=1;const a=e.slice(n,r);let i=r;for(;i<e.length&&/\s/.test(e[i]);)i+=1;if(e[i]!=="("||!Object.prototype.hasOwnProperty.call(X,a)){t+=e.slice(n,r);continue}const s=Q(e,i);if(s<0){t+=e.slice(n,r);continue}const l=e.slice(i+1,s),c=ve(l);t+=`${a}(${xt(a,c)})`,r=s+1}return t},Ae=e=>{const t=e.trim(),r=t[0];if(r!=='"'&&r!=="'"||t.at(-1)!==r)return null;let o="";for(let n=1;n<t.length-1;n+=1){const a=t[n];if(a!=="\\"){o+=a;continue}const i=t[n+1];if(!i)break;i==="n"?o+=`
`:i==="r"?o+="\r":i==="t"?o+="	":o+=i,n+=1}return o},wt=e=>{const t=e.trim();if(!t.startsWith("[")||!t.endsWith("]"))return null;const r=t.slice(1,-1).trim();if(!r)return[];const o=[];for(const n of $(r)){const a=Ae(n);if(a===null)return null;o.push(a)}return o},St=e=>/^(?:null|undefined|\[\s*\])$/i.test((e||"").trim()),vt=(e,t)=>e.length<3?!1:/\b(?:decision|matrix|comparison|compare|versus|vs\.?)\b/i.test(t)?!0:/^(?:criteria|criterion|factor|feature|attribute|category|item)$/i.test(e[0]||""),At=e=>{const t=e[1]||"Option A",r=e[2]||"Option B";return[["Portability",`${t} is better for a fixed setup`,`${r} is easier to carry`],["Performance","Best for desktop-class work","Best for lighter everyday tasks"],["Input",`${t} favors keyboard and trackpad work`,`${r} favors touch-first use`],["App fit",`${t} supports full desktop apps`,`${r} fits mobile apps, notes, and media`],["Best choice",`Choose ${t} for multitasking and files`,`Choose ${r} for travel and casual use`]].map(n=>{const a=n.slice(0,e.length);for(;a.length<e.length;)a.push("");return a})},Ct=e=>{const t=$(e);if(t.length<2||!St(t[1]))return null;const r=wt(t[0]);if(!r||r.length<3)return null;const o=t[2]&&Ae(t[2])||"";if(!vt(r,o))return null;const n=[...t];return n[1]=JSON.stringify(At(r)),(!n[2]||/^(?:null|undefined|"")$/i.test(n[2].trim()))&&(n[2]=JSON.stringify("Decision Matrix")),n.join(", ")},Et=e=>{let t="",r=0;for(;r<e.length;){const o=e[r];if(o==='"'||o==="'"){const p=E(e,r);t+=e.slice(r,p+1),r=p+1;continue}if(!Z.test(o)){t+=o,r+=1;continue}const n=r;for(r+=1;r<e.length&&Y.test(e[r]);)r+=1;if(e.slice(n,r)!=="Table"){t+=e.slice(n,r);continue}let i=r;for(;i<e.length&&/\s/.test(e[i]);)i+=1;if(e[i]!=="("){t+=e.slice(n,r);continue}const s=Q(e,i);if(s<0){t+=e.slice(n,r);continue}const l=e.slice(i+1,s),c=Ct(l);t+=c===null?e.slice(n,s+1):`Table(${c})`,r=s+1}return t},S=e=>Et(ve(gt(e))).replace(/\r\n?/g,`
`).trim(),se=e=>e.trim().replace(/^\|/,"").replace(/\|$/,"").split("|").map(t=>te(t)),te=e=>{const t=nt(e);if(t){const r=te(t.text);return r?`<span style="color:${t.color};">${r}</span>`:""}return e.replace(/<br\s*\/?>/gi," ").replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/`([^`]+)`/g,"$1").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim()},le=e=>te(e).replace(/^#+\s*/,"").replace(/^[-*]\s+/,"").replace(/[:\s]+$/g,"").trim(),Tt=e=>e.replace(/\bMacbook\b/g,"MacBook").replace(/\bIpad\b/g,"iPad").replace(/\bIphone\b/g,"iPhone").replace(/\bIos\b/g,"iOS").replace(/\bIpados\b/g,"iPadOS").replace(/\bMacos\b/g,"macOS").replace(/\bAi\b/g,"AI"),F=e=>Tt(e.replace(/\s+/g," ").trim().split(" ").map((t,r)=>{const o=t.toLowerCase();return r>0&&/^(?:a|an|and|as|at|by|for|from|in|of|on|or|the|to|vs\.?|with)$/.test(o)?o==="vs."?"vs":o:o.replace(/^\w/,n=>n.toUpperCase())}).join(" ")),It=(e,t,r,o)=>{const n=le(o||"");if(n&&!/^(?:pinned reply|temporary visual reply|generated visual|generated preview)$/i.test(n))return n.slice(0,64);if(/^criteria$/i.test(t[0]||"")&&t[1]&&t[2])return`${t[1]} vs ${t[2]} Decision Matrix`.slice(0,64);const i=e.replace(/\r\n?/g,`
`).split(`
`).slice(0,r).map(le).filter(Boolean).at(-1)||"",s=i.match(/\b(?:buying|choosing|compare|comparing|between)\s+(?:a\s+|an\s+|the\s+)?(.+?)\s+(?:vs\.?|versus)\s+(?:a\s+|an\s+|the\s+)?(.+?)(?:[.:!?]|$)/i);return s!=null&&s[1]&&(s!=null&&s[2])?`${F(s[1])} vs ${F(s[2])} Decision Matrix`.slice(0,64):i&&F(i.replace(/^here(?:'s| is)\s+(?:a\s+)?/i,"").replace(/\b(?:quick|simple|help you|compare)\b/gi,"").replace(/\s+/g," ").trim()).slice(0,64)||"Generated Table"},kt=(e,t={})=>{const r=e.replace(/\r\n?/g,`
`).split(`
`);for(let o=0;o<r.length-1;o+=1){const n=r[o],a=r[o+1];if(!n.includes("|")||!ct.test(a))continue;const i=se(n).filter(Boolean).slice(0,8);if(i.length<2)continue;const s=[];let l=o+2;for(;l<r.length&&r[l].trim()&&r[l].includes("|");){const u=se(r[l]).slice(0,i.length);for(;u.length<i.length;)u.push("");u.some(Boolean)&&s.push(u),l+=1}if(s.length===0)continue;const c=It(e,i,o,t.title),p=/\bmatrix\b/i.test(c)?"Decision Matrix":c;return S([`header = CardHeader(${JSON.stringify(c)}, "Saved table", "table")`,`table = Table(${JSON.stringify(i)}, ${JSON.stringify(s)}, ${JSON.stringify(p)})`,'root = Card([header, table], "showcase", ["none"])'].join(`
`))}return""},Ce=(e,t={})=>{var a,i;const o=((i=(a=e.match(lt))==null?void 0:a[1])==null?void 0:i.trim())||e,n=S(o);return/\broot\s*=/.test(n)?n:kt(o,t)||n},_t=[{severity:"critical",rule:"no-direct-fetch",pattern:/\bfetch\s*\(/,message:"Use the data prop or Data Source step instead of direct fetch()."},{severity:"critical",rule:"no-document-access",pattern:/\bdocument\b/,message:"Custom widgets cannot access document."},{severity:"critical",rule:"no-window-access",pattern:/\bwindow\b/,message:"Custom widgets cannot access window."},{severity:"critical",rule:"no-network-web-apis",pattern:/\b(XMLHttpRequest|WebSocket|EventSource|Worker|SharedWorker)\b|\bnavigator\s*\.\s*sendBeacon\b/,message:"Custom widgets cannot use browser network APIs; use the Data Source step."},{severity:"critical",rule:"no-browser-globals",pattern:/\b(navigator|location|history|indexedDB|caches|BroadcastChannel)\b/,message:"Custom widgets cannot access browser globals outside the sandbox."},{severity:"critical",rule:"no-custom-timers",pattern:/\b(setInterval|setTimeout|requestAnimationFrame)\s*\(/,message:"Custom widgets cannot create their own timers; use useSyncedDashboardTime or dashboard data refresh."},{severity:"critical",rule:"no-local-storage",pattern:/\blocalStorage\b|\bsessionStorage\b/,message:"Custom widgets cannot access browser storage."},{severity:"critical",rule:"no-eval",pattern:/\beval\s*\(/,message:"Custom widgets cannot use eval()."},{severity:"critical",rule:"no-function-constructor",pattern:/\bnew\s+Function\b|\bFunction\s*\(/,message:"Custom widgets cannot create dynamic functions."},{severity:"critical",rule:"no-imports",pattern:/(^|\n)\s*import\s+|\bimport\s*\(/,message:"Custom widgets must not include import statements or dynamic imports."},{severity:"critical",rule:"no-require",pattern:/\brequire\s*\(/,message:"Custom widgets must not use require()."}],Wt=(e,t)=>{const r=e.findIndex(o=>(t.lastIndex=0,t.test(o)));return r>=0?r+1:void 0},Dt=e=>/\b(isCompact|sizeClass|size\.|size\[|gridWidth|gridHeight|pixelWidth|pixelHeight)\b/.test(e),Pt=new Set(["FitText","InlineQuickAdd","WidgetBody","WidgetContent","WidgetCounter","WidgetEmptyState","WidgetFooter","WidgetHero","WidgetIconButton","WidgetStatusPill","WidgetSurface","WidgetMetricTile","WidgetProgress","WidgetBarChart","WidgetLineChart","WidgetDonutChart","WidgetStructuredReply","WidgetList","WidgetSkeleton","WidgetStatGrid","WidgetText","Activity","Add","AlertCircle","AlertTriangle","Archive","ArrowDown","ArrowLeft","ArrowRight","ArrowUp","Bell","BookOpen","Bookmark","Calendar","Check","CheckCircle","CheckCircle2","Checkmark","ChevronDown","ChevronLeft","ChevronRight","Circle","CircleCheck","CirclePlus","CircleX","Clock","Cloud","Code2","Cpu","Database","Delete","DeleteIcon","DollarSign","Edit3","ExternalLink","FileText","Flag","Flame","Footprints","Gauge","Globe2","Heart","Home","Image","ImageIcon","ImagePlus","Info","Lightbulb","List","ListChecks","Mail","MapPin","MessageCircle","Minus","Music","Newspaper","Palette","Pencil","Pin","PinOff","Plus","PlusCircle","PlusIcon","Quote","RefreshCcw","Reload","Remove","Save","Search","Send","Server","Settings","Shield","SlidersHorizontal","Sparkles","Square","Star","StickyNote","Sun","Tag","Thermometer","Timer","Trophy","Trash","Trash2","TrashIcon","TrendingUp","Upload","Users","Wifi","X","XCircle","Zap"]),Lt=e=>{const t=new Set;for(const r of e.matchAll(/\b(?:const|let|var|function|class)\s+([A-Z][A-Za-z0-9_$]*)\b/g))t.add(r[1]);return t},v=(e,t,r,o,n)=>{e.push({severity:t,rule:r,message:o,line:n})},Rt=e=>{const t=e||"",r=t.split(/\r?\n/),o=[],n=Lt(t);for(const u of _t)u.pattern.lastIndex=0,u.pattern.test(t)&&v(o,u.severity,u.rule,u.message,Wt(r,u.pattern));/\b(WidgetBody|WidgetContent)\b/.test(t)||v(o,"error","requires-widget-body","Render through WidgetBody or WidgetContent so dashboard guardrails apply.",1),/\buseWidgetSize\b|\bsize\.|\bsize\[/.test(t)||v(o,"error","requires-widget-size","Reference useWidgetSize or size.* so the widget adapts to dashboard sizes.",1),/\bloading\b/.test(t)||v(o,"warning","handles-loading","Handle the loading prop with WidgetSkeleton or an equivalent loading state.",1),/\berror\b/.test(t)||v(o,"warning","handles-error","Handle the error prop with WidgetEmptyState or an equivalent error state.",1);const a=r.findIndex(u=>/<WidgetBody\b/.test(u)&&/justify-between/.test(u));a>=0&&v(o,"warning","no-widget-body-justify-between","Avoid justify-between on WidgetBody; use WidgetFooter for pinned actions.",a+1);const i=r.findIndex(u=>/\btext-(?:2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/.test(u)?!Dt(u):!1);i>=0&&v(o,"warning","guard-large-text","Guard large text classes with size checks so compact widgets do not clip.",i+1);for(const u of t.matchAll(/<([A-Z][A-Za-z0-9_$]*)\b/g)){const m=u[1];if(Pt.has(m)||n.has(m))continue;const d=t.slice(0,u.index).split(/\r?\n/).length;v(o,"error","unknown-sandbox-symbol",`${m} is not available in the custom widget sandbox. Use an approved widget primitive or icon.`,d);break}const s=t.search(/<InlineQuickAdd\b/),l=s>=0?t.slice(s,s+800):"";s>=0&&(!/\bparser=/.test(l)||!/\bonSubmit=/.test(l))&&v(o,"warning","inline-quick-add-contract","InlineQuickAdd should include parser and onSubmit props so add actions work predictably.",t.slice(0,s).split(/\r?\n/).length);const c=o.some(u=>u.severity==="critical"||u.severity==="error"),p=o.some(u=>u.severity==="critical");return{valid:!c,violations:o,canSave:!p&&!c}},V="curio:settings-changed",U="curio:custom-widgets-changed",M=e=>e?`curio_custom_widgets_${e}`:"curio_custom_widgets",b=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Ee=()=>new Date().toISOString(),Te=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"").slice(0,48)||"widget",$t=()=>Math.random().toString(36).replace(/[^a-z0-9]/g,"").slice(2,8).padEnd(6,"0"),Mt=()=>{typeof window>"u"||(window.dispatchEvent(new Event("storage")),window.dispatchEvent(new CustomEvent(V)),window.dispatchEvent(new CustomEvent(U)))},ce=e=>{const t=b(e)?e:{},r=t.type==="rest"||t.type==="graphql"||t.type==="mcp"?t.type:"static",o=t.authType==="api_key"||t.authType==="bearer"||t.authType==="oauth"?t.authType:"none",n={...t,type:r,authType:o,method:r==="rest"?t.method==="POST"?"POST":"GET":void 0,headers:b(t.headers)?Object.fromEntries(Object.entries(t.headers).filter(a=>typeof a[0]=="string"&&typeof a[1]=="string")):void 0,mcpArgs:b(t.mcpArgs)?t.mcpArgs:void 0,responseMapping:b(t.responseMapping)?Object.fromEntries(Object.entries(t.responseMapping).filter(a=>typeof a[0]=="string"&&typeof a[1]=="string")):void 0,refreshIntervalSeconds:Math.max(0,Number(t.refreshIntervalSeconds??0)||0)};return Object.fromEntries(Object.entries(n).filter(([,a])=>a!==void 0))},de=e=>Array.isArray(e)?e.filter(b).map(t=>{const r=t.type==="number"||t.type==="boolean"||t.type==="select"||t.type==="color"||t.type==="secret"?t.type:"text",o={key:typeof t.key=="string"?t.key.trim():"",label:typeof t.label=="string"?t.label.trim():"",type:r,default:t.default,options:Array.isArray(t.options)?t.options.filter(b).map(n=>({label:String(n.label??n.value??""),value:String(n.value??n.label??"")})):void 0,min:typeof t.min=="number"?t.min:void 0,max:typeof t.max=="number"?t.max:void 0,step:typeof t.step=="number"?t.step:void 0,placeholder:typeof t.placeholder=="string"?t.placeholder:void 0};return Object.fromEntries(Object.entries(o).filter(([,n])=>n!==void 0))}).filter(t=>t.key&&t.label):[],z=e=>{if(!b(e))return null;const t=typeof e.label=="string"&&e.label.trim()?e.label.trim():"Custom Widget",r=typeof e.type=="string"&&e.type.startsWith("custom_")?e.type:Ht(t),o=typeof e.id=="string"&&e.id.startsWith("custom_")?e.id:We(t),n=Ee(),a=e.defaultSize==="small"||e.defaultSize==="large"||e.defaultSize==="xlarge"?e.defaultSize:"medium",i=e.origin==="ai"||e.origin==="template"||e.origin==="fork"?e.origin:"manual";return{id:o,type:r,label:t,icon:typeof e.icon=="string"&&e.icon.trim()?e.icon.trim():"Sparkles",description:typeof e.description=="string"?e.description:"",category:typeof e.category=="string"&&e.category.trim()?e.category.trim():"Custom",keywords:Array.isArray(e.keywords)?e.keywords.filter(s=>typeof s=="string"):[],defaultSize:a,minW:typeof e.minW=="number"?e.minW:void 0,minH:typeof e.minH=="number"?e.minH:void 0,maxW:typeof e.maxW=="number"?e.maxW:void 0,maxH:typeof e.maxH=="number"?e.maxH:void 0,sourceCode:typeof e.sourceCode=="string"?e.sourceCode:"",dataSource:ce(e.dataSource),settingsSchema:de(e.settingsSchema),origin:i,version:Math.max(1,Number(e.version||1)),versionHistory:Array.isArray(e.versionHistory)?e.versionHistory.filter(b).map(s=>({sourceCode:typeof s.sourceCode=="string"?s.sourceCode:"",dataSource:ce(s.dataSource),settingsSchema:de(s.settingsSchema),updatedAt:typeof s.updatedAt=="string"?s.updatedAt:n})).slice(-3):[],createdAt:typeof e.createdAt=="string"?e.createdAt:n,updatedAt:typeof e.updatedAt=="string"?e.updatedAt:n}},O=e=>{if(typeof window>"u")return[];const t=localStorage.getItem(M(e));if(!t&&e)return O(null);if(!t)return[];try{const r=JSON.parse(t);return Array.isArray(r)?r.map(z).filter(o=>!!o):[]}catch{return[]}},j=(e,t)=>{typeof window>"u"||(localStorage.setItem(M(e),JSON.stringify(t)),Ie(t),Mt())},zt=e=>({type:e.type,label:e.label,icon:e.icon,defaultSize:e.defaultSize,description:e.description,category:e.category,keywords:e.keywords,minW:e.minW,minH:e.minH,maxW:e.maxW,maxH:e.maxH,custom:!0,origin:e.origin,updatedAt:e.updatedAt}),Ie=e=>{Ve(),Ue(e.map(zt))},ke=e=>{const t=O(e);return Ie(t),t},Nr=(e,t)=>ke(e).find(r=>r.type===t)||null,Ot=(e,t)=>{const r=z(t);if(!r)throw new Error("Invalid custom widget definition.");const o=O(e),n=o.findIndex(s=>s.id===r.id),a=Ee();if(n>=0){const s=o[n],l={sourceCode:s.sourceCode,dataSource:s.dataSource,settingsSchema:s.settingsSchema,updatedAt:s.updatedAt},c={...r,id:s.id,createdAt:s.createdAt,version:s.version+1,updatedAt:a,versionHistory:[...s.versionHistory,l].slice(-3)};return o[n]=c,j(e,o),c}const i={...r,version:Math.max(1,r.version||1),versionHistory:r.versionHistory.slice(-3)};return j(e,[...o,i]),i},Nt=e=>{if(typeof window>"u")return;const t=[`curio_custom_widget_key:${e}`,`curio_custom_widget_setting:${e}:`];for(const r of Object.keys(localStorage))t.some(o=>r.startsWith(o))&&localStorage.removeItem(r)},Ft=e=>{if(typeof window>"u")return;const t=[`curio_widget_state_${e}`,`curio_custom_widget_state:${e}`];for(const r of Object.keys(localStorage))t.some(o=>r.includes(o))&&localStorage.removeItem(r)},Fr=(e,t)=>{const o=O(e).filter(n=>n.id!==t);Nt(t),Ft(t),j(e,o)},Br=e=>{const t=z(e);if(!t)throw new Error("Invalid custom widget definition.");const r={schemaVersion:1,widget:{...t,dataSource:{...t.dataSource,secretKey:t.dataSource.secretKey}}};return JSON.stringify(r,null,2)},_e=e=>{try{return JSON.parse(e)}catch{throw new Error("Custom widget import must be valid JSON.")}},Bt=e=>{const t=Rt(e.sourceCode).violations.filter(r=>r.severity==="critical");if(t.length>0)throw new Error(`Custom widget import failed guardrails: ${t[0].message}`)},B=e=>{const t=_e(e);if(b(t)&&"schemaVersion"in t&&t.schemaVersion!==1)throw new Error("Unsupported custom widget schemaVersion.");const r=b(t)&&t.schemaVersion===1&&b(t.widget)?t.widget:t,o=z(r);if(!o)throw new Error("Imported custom widget is missing required fields.");return Bt(o),o},Hr=e=>{const t=_e(e);if(b(t)&&"schemaVersion"in t&&t.schemaVersion!==1)throw new Error("Unsupported custom widget schemaVersion.");return b(t)&&t.schemaVersion===1&&Array.isArray(t.widgets)?t.widgets.map(r=>B(JSON.stringify(r))):Array.isArray(t)?t.map(r=>B(JSON.stringify(r))):[B(e)]},We=e=>`custom_${Te(e)}_${$t()}`,Ht=e=>`custom_${Te(e)}`,Gr=e=>{const t=P.useRef(void 0),r=P.useRef([]),o=P.useMemo(()=>a=>typeof window>"u"?()=>{}:(window.addEventListener("storage",a),window.addEventListener(V,a),window.addEventListener(U,a),()=>{window.removeEventListener("storage",a),window.removeEventListener(V,a),window.removeEventListener(U,a)}),[]),n=P.useCallback(()=>{if(typeof window>"u")return[];const a=localStorage.getItem(M(e)),i=!a&&e?localStorage.getItem(M(null)):null,s=`${e||""}:${a??i??"\0__absent__"}`;return s!==t.current&&(t.current=s,r.current=ke(e)),r.current},[e]);return P.useSyncExternalStore(o,n,()=>[])},qr="curio:ai-chat-structured-reply-widget",Gt="curio:generated-dashboard-widget-reveal",K="curio_pending_generated_widget_reveal",qt=[[/\b(?:temp|temperature|weather|climate|celsius|fahrenheit)\b/i,"Thermometer"],[/\b(?:money|revenue|sales|cost|price|budget|profit|dollar|\$)\b/i,"DollarSign"],[/\b(?:winner|league|trophy|score|sport|rank)\b/i,"Trophy"],[/\b(?:calendar|schedule|event|meeting)\b/i,"Calendar"],[/\b(?:health|heart|activity|steps|fitness)\b/i,"Activity"],[/\b(?:trend|chart|growth|metric|kpi)\b/i,"TrendingUp"],[/\b(?:table|list|comparison|matrix)\b/i,"List"]],Vt=(...e)=>{const t=e.filter(Boolean).join(`
`);for(const[r,o]of qt)if(r.test(t))return o;return"PanelTop"},Ut=/```(?:openui|openui-lang|oui)\s*\n([\s\S]*?)```/gi,jt=e=>{try{const t=JSON.parse(e);return typeof t=="string"?t.trim():null}catch{return null}},k=(e,t)=>{const r=e.indexOf(`${t}(`);if(r<0)return null;const n=e.slice(r+t.length+1).match(/^\s*("(?:\\.|[^"\\])*")/);return n?jt(n[1]):null},Kt=new Set(["generated preview","generated visual","pinned reply","temporary visual reply","untitled"]),J=e=>{const t=String(e||"").trim().toLowerCase();return!t||Kt.has(t)},Jt=/\b(?:Page|DashboardGrid|DashboardWidget|HeroPanel|ExpressiveHero|LiveUpdateCard|GlanceTile|LargeMetricCard|TonalContainer|SnackToast|PrimaryActionPill|FloatingActionCluster|SuggestionChips|RouteProgress|StatusTimeline|ContextualToolbar|ActionSheet|ActionSheetItem|Insight|InsightStack|TextContent|Section|Grid|Divider|Badge|Tabs|SegmentedTabs|Accordion|Modal|Drawer|Checklist|TaskList|KeyValueList|EmptyState|ImagePanel|CodeBlock|JsonTree|MetricCompare|Carousel|StatCard|StatGrid|ProgressBar|Form|FormControl|Input|TextArea|DateTimeInput|Select|Toggle|Slider|Button|Buttons|Callout|SkeletonBlock|Table|SortableTable|PivotTable|Col|Gauge|Timeline|ActionButton|BarChart|LineChart|AreaChart|DonutChart|PieChart|ScatterChart|RadarChart|Heatmap|FunnelChart|Sparkline|CalendarHeatmap|Treemap|WaterfallChart|GanttTimeline|Swimlane|RouteMap|CorrelationMatrix|ForecastBand|AnomalyStrip|SankeyFlow)\s*\(/,De=e=>{const t=Ce(e);return/\broot\s*=/.test(t)&&Jt.test(t)},Vr=e=>[...e.matchAll(Ut)].map(t=>{var r;return((r=t[1])==null?void 0:r.trim())||""}).filter(Boolean),T=e=>{const t=S(e),r=(k(t,"CardHeader")||k(t,"Page")||k(t,"DashboardWidget")||k(t,"HeroPanel")||k(t,"TextContent")||k(t,"StatCard")||"").trim();return(r&&!J(r)?r:"Generated Visual").slice(0,48)},Xt=e=>`function Widget({ widget, data, loading, error }) {
  const size = useWidgetSize(widget);
  const embeddedSource = ${JSON.stringify(e)};
  const source = typeof data?.source === "string" ? data.source : embeddedSource;
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Reply unavailable" description={error} variant="error" /></WidgetBody>;
  if (!source) return <WidgetBody><WidgetEmptyState title="No reply" description="This pinned reply is empty." /></WidgetBody>;
  return (
    <WidgetBody scroll={size.isCompact ? "none" : "y"} gap={size.isCompact ? "sm" : "md"}>
      <WidgetStructuredReply source={source} widgetId={widget.id} data={data} />
      {!size.isCompact && (
        <WidgetFooter right={<WidgetText variant="caption" tone="muted">Generated visual reply</WidgetText>} />
      )}
    </WidgetBody>
  );
}`,Zt=(e,t={})=>{var l,c;const r=Ce(e,{title:t.title});if(!De(r))throw new Error("Generated visual replies need real chart, table, metric, or text content before they can be pinned.");const o=((l=t.title)==null?void 0:l.trim())||"",n=T(r),a=(o&&!J(o)?o:n&&!J(n)?n:"Generated Visual").trim()||"Generated Visual",i=We(a),s=new Date().toISOString();return{id:i,type:i,label:a,icon:((c=t.icon)==null?void 0:c.trim())||Vt(a,r),description:"Saved generated visual reply.",category:"Custom",keywords:["pinned","reply","structured","visual"],defaultSize:"medium",minW:2,minH:2,maxW:Je,maxH:Ke,sourceCode:Xt(r),dataSource:{type:"static",authType:"none",staticData:t.data===void 0?{source:r,surfaceId:t.surfaceId}:{source:r,data:t.data,surfaceId:t.surfaceId},refreshIntervalSeconds:0},settingsSchema:[],origin:"ai",version:1,versionHistory:[],createdAt:s,updatedAt:s}},Yt=()=>et().activeProfileId??null,Qt=e=>{if(!(typeof window>"u"||!e)){try{window.sessionStorage.setItem(K,e)}catch{}window.dispatchEvent(new CustomEvent(Gt,{detail:{widgetId:e}}))}},Ur=()=>{if(typeof window>"u")return null;try{const e=window.sessionStorage.getItem(K);return e&&window.sessionStorage.removeItem(K),e||null}catch{return null}},jr=(e,t={})=>{const r=t.profileId??Yt(),o=Zt(e,{title:t.title,sourceWidgetId:t.sourceWidgetId,data:t.data,icon:t.icon,surfaceId:t.surfaceId}),n=Ot(r,o),a=Xe(r),i=Ze(r),s=Math.max(0,a.findIndex(d=>d.id===i)),c=(a[s]||a[0]).widgets.reduce((d,y)=>Math.max(d,Number.isFinite(y.position)?y.position:-1),-1),p=je(n.type,c+1,{size:n.defaultSize}),u=Date.now(),m=a.map((d,y)=>y===s?{...d,widgets:[...d.widgets,p],updatedAt:u}:d);return Ye(m,r),t.reveal!==!1&&(Qe("dashboard"),Qt(p.id)),{definition:n,widget:p,profileId:r}},Pe="curio_generated_artifacts_v1",er=50,Le=e=>(e==null?void 0:e.trim())||"default",Re=()=>typeof window<"u"&&typeof window.localStorage<"u",$e=()=>{if(!Re())return{};try{const e=JSON.parse(window.localStorage.getItem(Pe)||"{}");return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}catch{return{}}},tr=e=>{if(!e||typeof e!="object")return null;const t=e,r=typeof t.id=="string"?t.id.trim():"",o=typeof t.title=="string"?t.title.trim():"",n=typeof t.source=="string"?t.source:"",a=t.sourceKind==="dashboard_widget"?"dashboard_widget":"structured_reply",i=typeof t.originSurface=="string"?t.originSurface:"tool",s=typeof t.createdAt=="string"?t.createdAt:"",l=typeof t.updatedAt=="string"?t.updatedAt:s;return!r||!n||!s||!l?null:{id:r,title:o||"Generated Visual",surfaceId:typeof t.surfaceId=="string"?t.surfaceId:void 0,source:n,sourceKind:a,originSurface:i,createdAt:s,updatedAt:l,createdFrom:typeof t.createdFrom=="string"?t.createdFrom:void 0,pinnedWidgetId:typeof t.pinnedWidgetId=="string"?t.pinnedWidgetId:void 0,sourceWidgetId:typeof t.sourceWidgetId=="string"?t.sourceWidgetId:void 0,lastError:typeof t.lastError=="string"?t.lastError:void 0}},rr=e=>{if(Re())try{window.localStorage.setItem(Pe,JSON.stringify(e)),window.dispatchEvent(new Event("storage")),window.dispatchEvent(new CustomEvent("curio:settings-changed"))}catch{}},Me=e=>e.slice().sort((t,r)=>r.updatedAt.localeCompare(t.updatedAt)).slice(0,er),or=e=>{const t=new Date().toISOString();if(!e||t>e)return t;const r=Date.parse(e);return Number.isFinite(r)?new Date(r+1).toISOString():t},re=e=>{const r=$e()[Le(e)]||[];return Me(r.map(tr).filter(o=>!!o))},nr=(e,t)=>re(e).find(r=>r.id===t)||null,Kr=e=>re(e)[0]||null,ar=(e,t)=>{const r=$e(),o=Le(e),n=re(e),a=t.id?n.find(l=>l.id===t.id):void 0,i=or(a==null?void 0:a.updatedAt),s={id:(a==null?void 0:a.id)||t.id||`artifact_${qe()}`,surfaceId:t.surfaceId??(a==null?void 0:a.surfaceId),title:t.title.trim()||(a==null?void 0:a.title)||"Generated Visual",source:t.source,sourceKind:t.sourceKind,originSurface:t.originSurface,createdAt:(a==null?void 0:a.createdAt)||i,updatedAt:i,createdFrom:t.createdFrom??(a==null?void 0:a.createdFrom),pinnedWidgetId:t.pinnedWidgetId??(a==null?void 0:a.pinnedWidgetId),sourceWidgetId:t.sourceWidgetId??(a==null?void 0:a.sourceWidgetId),lastError:t.lastError};return r[o]=Me([s,...n.filter(l=>l.id!==s.id)]),rr(r),s},ir=(e,t,r)=>{const o=nr(e,t);return o?ar(e,{...o,...r,id:t,title:r.title??o.title,surfaceId:r.surfaceId??o.surfaceId,source:r.source??o.source,sourceKind:r.sourceKind??o.sourceKind,originSurface:r.originSurface??o.originSurface,createdFrom:r.createdFrom??o.createdFrom,pinnedWidgetId:r.pinnedWidgetId??o.pinnedWidgetId,sourceWidgetId:r.sourceWidgetId??o.sourceWidgetId,lastError:r.lastError}):null},Jr=(e,t,r)=>ir(e,t,{pinnedWidgetId:r,lastError:void 0}),sr=1,ue=9e5,ze="application/vnd.openxmlformats-officedocument.wordprocessingml.document",w=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),Oe=e=>w(e).replace(/'/g,"&apos;"),_=e=>e.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,72)||"generated-visual",lr=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:null,cr=e=>{const t=lr(e),r=typeof(t==null?void 0:t.source)=="string"?S(t.source):"";return r&&De(r)?r:""},Xr=e=>cr(e==null?void 0:e.dataSource.staticData),Ne=()=>{if(typeof window>"u"||typeof document>"u")return"";const e=window.getComputedStyle(document.documentElement),t=[];for(let r=0;r<e.length;r+=1){const o=e.item(r);(o.startsWith("--ether-")||o.startsWith("--dashboard-")||o.startsWith("--curio-"))&&t.push(`${o}: ${e.getPropertyValue(o).trim()};`)}return t.length>0?`:root{${t.join("")}}`:""},Fe=()=>{if(typeof document>"u")return"";let e="";for(const t of Array.from(document.styleSheets)){let r;try{r=t.cssRules}catch{continue}if(r){for(const o of Array.from(r))if(e+=`${o.cssText}
`,e.length>=ue)return e.slice(0,ue)}}return e},pe=e=>((e==null?void 0:e.textContent)||"").trim(),Be=e=>{if(!e)return"";const t=r=>r.nodeType===Node.TEXT_NODE?r.textContent||"":r.nodeType!==Node.ELEMENT_NODE?"":Array.from(r.childNodes).map(t).filter(Boolean).join(" ");return t(e).replace(/\s+/g," ").trim()},me=e=>e.getAttribute("data-testid")||"",ge=e=>{const t=e.match(/^structured-chart-point-(\d+)-(\d+)$/);if(t)return{seriesIndex:t[1],pointIndex:t[2]};const r=e.match(/^structured-chart-line-(\d+)$/);if(r)return{seriesIndex:r[1]};const o=e.match(/^structured-donut-slice-(\d+)$/);return o?{seriesIndex:o[1],pointIndex:o[1]}:null},dr=e=>{e.querySelectorAll("[data-testid^='structured-chart-point-'], [data-testid^='structured-donut-slice-']").forEach(t=>{const r=ge(me(t));r&&(t.dataset.curioSeriesIndex=r.seriesIndex,r.pointIndex&&(t.dataset.curioPointIndex=r.pointIndex)),t.dataset.curioChartItem="true",t.getAttribute("tabindex")||t.setAttribute("tabindex","0"),t.getAttribute("role")||t.setAttribute("role","button")}),e.querySelectorAll("[data-testid^='structured-chart-line-']").forEach(t=>{const r=ge(me(t));r&&(t.dataset.curioSeriesIndex=r.seriesIndex),t.dataset.curioChartLine="true";const o=t.parentElement;o&&(o.dataset.curioSeriesIndex=(r==null?void 0:r.seriesIndex)||o.dataset.curioSeriesIndex||"")}),e.querySelectorAll("select").forEach(t=>{t.dataset.curioExportControl="filter",t.dataset.curioFilterOptions=Array.from(t.options).map(r=>r.value||r.textContent||"").filter(Boolean).join("|")}),e.querySelectorAll("button[aria-pressed]").forEach(t=>{const r=t.getAttribute("aria-label")||"";if(/^(?:hide|show)\s+.+\s+(?:series|slice)$/i.test(r)){t.dataset.curioExportControl="legend";return}t.dataset.curioExportControl="filter-chip"}),e.querySelectorAll("[data-testid='structured-chart-shell'], [data-testid='structured-donut-chart-shell']").forEach(t=>{t.querySelectorAll("button[data-curio-export-control='legend']").forEach((r,o)=>{r.dataset.curioSeriesIndex=String(o)})}),e.querySelectorAll("details").forEach(t=>{t.dataset.curioExportControl="details"}),e.querySelectorAll("input[type='checkbox']").forEach(t=>{t.readOnly=!1,t.dataset.curioExportControl="checkbox"}),e.querySelectorAll("button").forEach(t=>{if(t.closest("[data-generated-export-action]"))return;const r=Be(t)||t.getAttribute("aria-label")||t.title||"Action";if(t.dataset.curioExportButtonLabel=r,t.disabled&&(t.disabled=!1,t.dataset.curioExportOriginallyDisabled="true",t.setAttribute("aria-disabled","true")),t.getAttribute("role")==="tab"){t.dataset.curioExportControl="tab",t.dataset.curioExportTabActive=t.getAttribute("aria-selected")==="true"?"true":"false";return}if(t.getAttribute("role")==="switch"){t.dataset.curioExportControl="switch";return}t.dataset.curioExportControl||(t.dataset.curioExportControl="action")}),e.querySelectorAll("[role='tabpanel']").forEach((t,r)=>{t.dataset.curioExportPanelIndex=String(r)}),e.querySelectorAll("svg[role='img']").forEach(t=>{Array.from(t.querySelectorAll("text")).filter(o=>pe(o).length>0).forEach(o=>{o.setAttribute("data-curio-axis-text",pe(o))})})},He=e=>{if(!e)return"";const t=e.cloneNode(!0);return t.removeAttribute("data-generated-source"),t.querySelectorAll("[data-generated-source]").forEach(r=>r.removeAttribute("data-generated-source")),t.querySelectorAll("[data-generated-export-action]").forEach(r=>r.remove()),t.querySelectorAll("[contenteditable]").forEach(r=>r.removeAttribute("contenteditable")),dr(t),t.outerHTML},ur=e=>{if(!e)return"";const t=e.cloneNode(!0);return t.removeAttribute("data-generated-source"),t.querySelectorAll("script, style, [data-generated-export-action]").forEach(r=>r.remove()),t.querySelectorAll("[contenteditable]").forEach(r=>r.removeAttribute("contenteditable")),t.querySelectorAll("select").forEach(r=>{var a,i;const o=((i=(a=r.selectedOptions[0])==null?void 0:a.textContent)==null?void 0:i.trim())||r.value||"All",n=document.createElement("span");n.className="curio-document-control",n.textContent=o,r.replaceWith(n)}),t.querySelectorAll("input[type='checkbox']").forEach(r=>{const o=document.createElement("span");o.className="curio-document-checkbox",o.textContent=r.checked?"✓":"",r.replaceWith(o)}),t.querySelectorAll("input:not([type='checkbox']), textarea").forEach(r=>{const o=document.createElement("span");o.className="curio-document-control",o.textContent=r.value||r.getAttribute("placeholder")||"",r.replaceWith(o)}),t.querySelectorAll("button").forEach(r=>{const o=Be(r)||r.getAttribute("aria-label")||"";if(!o){r.remove();return}const n=document.createElement("span");n.className="curio-document-control",n.textContent=o,r.replaceWith(n)}),t.querySelectorAll("*").forEach(r=>{const o=r;for(const n of Array.from(o.attributes))(/^on/i.test(n.name)||n.name==="contenteditable")&&o.removeAttribute(n.name)}),t.outerHTML},pr=`
* { box-sizing: border-box; }
html {
  min-height: 100%;
  overflow-y: auto;
  color-scheme: light dark;
}
body {
  margin: 0;
  min-height: 100vh;
  display: block;
  overflow-y: auto;
  padding: 32px;
  background:
    radial-gradient(circle at 18% 12%, rgba(56, 189, 248, 0.18), transparent 30%),
    linear-gradient(135deg, #f8fafc 0%, #dbeafe 52%, #fef3c7 100%);
  color: var(--ether-on-surface, #111827);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.curio-export-shell {
  width: min(1120px, 100%);
  margin: 0 auto;
  display: grid;
  gap: 18px;
}
.curio-export-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: clamp(1.15rem, 3vw, 1.8rem);
  letter-spacing: 0;
}
.curio-export-mark {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.78);
  color: #0284c7;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.12);
}
.curio-export-card {
  overflow: visible;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(24px);
  padding: 18px;
}
.curio-export-tooltip {
  position: fixed;
  z-index: 999;
  pointer-events: none;
  max-width: min(260px, calc(100vw - 32px));
  transform: translate(-50%, -112%);
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.94);
  color: #0f172a;
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.18);
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 800;
}
.curio-export-card select,
.curio-export-card button,
.curio-export-card [role="button"],
.curio-export-card input[type="checkbox"] {
  cursor: pointer;
}
.curio-export-card [data-curio-export-hidden="true"] {
  display: none !important;
}
.curio-export-card [data-curio-export-dimmed="true"] {
  opacity: 0.28 !important;
}
.curio-export-card [data-curio-export-selected="true"] {
  filter: drop-shadow(0 0 10px rgba(14, 165, 233, 0.42));
}
.curio-export-card [aria-disabled="true"] {
  opacity: 0.78;
}
.curio-export-card [data-curio-export-control="tab"][data-curio-export-tab-active="true"] {
  background: var(--ether-primary, #38bdf8) !important;
  color: var(--ether-control-active-text, #06111f) !important;
}
.curio-export-card [data-curio-export-control="switch"][aria-checked="true"] {
  outline: 2px solid color-mix(in srgb, var(--ether-primary, #38bdf8) 55%, transparent);
  outline-offset: 2px;
}
.curio-export-toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 1000;
  max-width: min(420px, calc(100vw - 32px));
  transform: translateX(-50%) translateY(16px);
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(15, 23, 42, 0.94);
  color: #f8fafc;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.24);
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 800;
  opacity: 0;
  pointer-events: none;
  transition: opacity 160ms ease, transform 160ms ease;
}
.curio-export-toast[data-visible="true"] {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
@media (prefers-color-scheme: dark) {
  body {
    background:
      radial-gradient(circle at 18% 12%, rgba(56, 189, 248, 0.18), transparent 30%),
      linear-gradient(135deg, #0f172a 0%, #111827 52%, #312e81 100%);
    color: #f8fafc;
  }
  .curio-export-card,
  .curio-export-mark {
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(15, 23, 42, 0.72);
  }
  .curio-export-tooltip {
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(15, 23, 42, 0.94);
    color: #f8fafc;
  }
}
`,mr=`
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 28px;
  background: #f8fafc;
  color: #0f172a;
  font-family: Inter, Arial, sans-serif;
}
.curio-document-shell {
  max-width: 820px;
  margin: 0 auto;
}
.curio-document-title {
  margin: 0 0 18px;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 800;
}
.curio-document-card {
  border: 1px solid #dbeafe;
  border-radius: 20px;
  background: #ffffff;
  padding: 18px;
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.10);
}
.curio-document-card img,
.curio-document-card svg {
  max-width: 100%;
  height: auto;
}
.curio-document-card table {
  width: 100%;
  border-collapse: collapse;
}
.curio-document-card th,
.curio-document-card td {
  border: 1px solid rgba(15, 23, 42, 0.12);
  padding: 8px 10px;
  vertical-align: top;
}
.curio-document-card button,
.curio-document-control {
  display: inline-block;
  border: 1px solid rgba(15, 23, 42, 0.14);
  border-radius: 999px;
  background: #f8fafc;
  padding: 4px 9px;
  font-weight: 700;
}
.curio-document-checkbox {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(15, 23, 42, 0.32);
  text-align: center;
  line-height: 12px;
  font-size: 11px;
}
@page {
  margin: 0.5in;
}
`,gr=`
* { box-sizing: border-box; }
.curio-email-card img,
.curio-email-card svg,
.curio-email-card table {
  max-width: 100%;
}
.curio-email-card table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 14px 0;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
}
.curio-email-card th {
  background: #f1f5f9;
  color: #334155;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.curio-email-card th,
.curio-email-card td {
  border-bottom: 1px solid #e2e8f0;
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
}
.curio-email-card tr:last-child td {
  border-bottom: 0;
}
.curio-email-card h1,
.curio-email-card h2,
.curio-email-card h3,
.curio-email-card p {
  margin-top: 0;
}
.curio-email-card .curio-document-control {
  display: inline-block;
  margin: 2px 4px 2px 0;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: #f8fafc;
  padding: 5px 10px;
  color: #0f172a;
  font-size: 12px;
  font-weight: 700;
}
.curio-email-card .curio-document-checkbox {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #94a3b8;
  border-radius: 4px;
  text-align: center;
  line-height: 12px;
  font-size: 11px;
}
.curio-email-card [data-generated-export-action],
.curio-email-card script {
  display: none !important;
}
.curio-email-card .dashboard-widget-touch-scroll,
.curio-email-card .dashboard-widget-touch-scroll-y {
  max-height: none !important;
  overflow: visible !important;
}
.curio-email-card [class*="rounded-"] {
  overflow-wrap: anywhere;
}
.curio-email-card svg {
  height: auto;
}
`,hr=`
.curio-pdf-capture {
  width: 960px;
  min-height: 1px;
  padding: 32px;
  background:
    radial-gradient(circle at 18% 12%, rgba(56, 189, 248, 0.18), transparent 30%),
    linear-gradient(135deg, #f8fafc 0%, #dbeafe 52%, #fef3c7 100%);
  color: var(--ether-on-surface, #111827);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
.curio-pdf-shell {
  display: grid;
  gap: 18px;
}
.curio-pdf-title {
  margin: 0;
  color: #0f172a;
  font-size: 28px;
  line-height: 1.18;
  font-weight: 900;
}
.curio-pdf-card {
  overflow: visible;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.18);
  padding: 18px;
}
.curio-pdf-card img,
.curio-pdf-card svg {
  max-width: 100%;
}
`,fr=`
(() => {
  const normalize = (value) => String(value || "").trim().toLowerCase();
  const chartItemSelector = '[data-curio-chart-item="true"]';
  const selectedAttribute = "data-curio-export-selected";
  const hiddenAttribute = "data-curio-export-hidden";
  const dimmedAttribute = "data-curio-export-dimmed";
  const activeFilters = new Map();
  const hiddenLegendItems = new Set();

  const tooltip = document.createElement("div");
  tooltip.className = "curio-export-tooltip";
  tooltip.hidden = true;
  document.body.append(tooltip);

  const toast = document.createElement("div");
  toast.className = "curio-export-toast";
  toast.setAttribute("role", "status");
  document.body.append(toast);
  let toastTimer = 0;

  const announce = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.dataset.visible = "true";
    toastTimer = window.setTimeout(() => {
      toast.dataset.visible = "false";
    }, 2200);
  };

  const setHidden = (element, hidden) => {
    if (!element) return;
    if (hidden) element.setAttribute(hiddenAttribute, "true");
    else element.removeAttribute(hiddenAttribute);
  };

  const setDimmed = (element, dimmed) => {
    if (!element) return;
    if (dimmed) element.setAttribute(dimmedAttribute, "true");
    else element.removeAttribute(dimmedAttribute);
  };

  const setSelected = (target, selected) => {
    document.querySelectorAll("[" + selectedAttribute + "='true']").forEach((node) => {
      if (node !== target) node.removeAttribute(selectedAttribute);
    });
    if (selected) target.setAttribute(selectedAttribute, "true");
    else target.removeAttribute(selectedAttribute);
  };

  const show = (target) => {
    const label = target.getAttribute("aria-label") || target.textContent || "";
    if (!label.trim()) return;
    tooltip.textContent = label;
    const rect = target.getBoundingClientRect();
    tooltip.style.left = Math.min(Math.max(rect.left + rect.width / 2, 24), window.innerWidth - 24) + "px";
    tooltip.style.top = Math.min(Math.max(rect.top, 36), window.innerHeight - 24) + "px";
    tooltip.hidden = false;
  };
  const hide = () => { tooltip.hidden = true; };

  const getSeriesIndex = (target) => target.dataset.curioSeriesIndex || "";

  const getChartItems = () => Array.from(document.querySelectorAll(chartItemSelector));

  const getActiveFilterValues = () => Array.from(activeFilters.values())
    .map(normalize)
    .filter((value) => value && value !== "all");

  const itemMatchesFilters = (target, filters) => {
    if (filters.length === 0) return true;
    const text = normalize((target.getAttribute("aria-label") || "") + " " + (target.textContent || ""));
    return filters.every((filter) => text.includes(filter));
  };

  const rowMatchesFilters = (row, filters) => {
    if (filters.length === 0) return true;
    const text = normalize(row.textContent || "");
    return filters.every((filter) => text.includes(filter));
  };

  const applyAxisFilters = (filters) => {
    const optionValues = new Set();
    document.querySelectorAll('[data-curio-filter-options]').forEach((control) => {
      String(control.getAttribute('data-curio-filter-options') || '')
        .split('|')
        .map(normalize)
        .filter((value) => value && value !== 'all')
        .forEach((value) => optionValues.add(value));
    });
    document.querySelectorAll('[data-curio-axis-text]').forEach((node) => {
      const value = normalize(node.getAttribute('data-curio-axis-text'));
      const isFilterLabel = optionValues.has(value);
      setHidden(node, isFilterLabel && filters.length > 0 && !filters.includes(value));
    });
  };

  const applyTableFilters = (filters) => {
    document.querySelectorAll('tbody tr').forEach((row) => {
      setHidden(row, !rowMatchesFilters(row, filters));
    });
  };

  const applyChartState = () => {
    const filters = getActiveFilterValues();
    const chartItems = getChartItems();
    const matchingItemCount = chartItems.filter((target) => itemMatchesFilters(target, filters)).length;
    chartItems.forEach((target) => {
      const hiddenByLegend = hiddenLegendItems.has(getSeriesIndex(target));
      const hiddenByFilter = filters.length > 0 && matchingItemCount > 0 && !itemMatchesFilters(target, filters);
      setHidden(target, hiddenByLegend || hiddenByFilter);
    });
    document.querySelectorAll('[data-curio-chart-line="true"]').forEach((line) => {
      const hiddenByLegend = hiddenLegendItems.has(getSeriesIndex(line));
      setHidden(line.parentElement || line, hiddenByLegend);
      setDimmed(line, filters.length > 0 && !hiddenByLegend);
    });
    document.querySelectorAll('polygon').forEach((polygon) => {
      const parent = polygon.parentElement;
      if (parent?.querySelector('[data-curio-chart-line="true"]')) {
        setDimmed(polygon, filters.length > 0);
      }
    });
    applyAxisFilters(filters);
    applyTableFilters(filters);
  };

  const handleChartActivation = (target) => {
    const selected = target.getAttribute(selectedAttribute) !== "true";
    setSelected(target, selected);
    show(target);
  };

  document.querySelectorAll(chartItemSelector).forEach((target) => {
    target.style.cursor = "pointer";
    target.addEventListener("mouseenter", () => show(target));
    target.addEventListener("focus", () => show(target));
    target.addEventListener("click", () => handleChartActivation(target));
    target.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleChartActivation(target);
    });
    target.addEventListener("mouseleave", hide);
    target.addEventListener("blur", hide);
  });

  document.querySelectorAll('select[data-curio-export-control="filter"]').forEach((control, index) => {
    const key = control.getAttribute("aria-label") || "filter-" + index;
    activeFilters.set(key, control.value);
    control.addEventListener("change", () => {
      activeFilters.set(key, control.value);
      applyChartState();
    });
  });

  document.querySelectorAll('button[data-curio-export-control="filter-chip"]').forEach((button, index) => {
    const group = button.parentElement;
    const key = group?.previousElementSibling?.textContent?.trim() || "chip-filter-" + index;
    if (button.getAttribute("aria-pressed") === "true") {
      activeFilters.set(key, button.textContent || "");
    }
    button.addEventListener("click", () => {
      group?.querySelectorAll('button[data-curio-export-control="filter-chip"]').forEach((entry) => {
        entry.setAttribute("aria-pressed", entry === button ? "true" : "false");
      });
      activeFilters.set(key, button.textContent || "");
      applyChartState();
    });
  });

  document.querySelectorAll('button[data-curio-export-control="legend"]').forEach((button, index) => {
    button.dataset.curioSeriesIndex = button.dataset.curioSeriesIndex || String(index);
    button.addEventListener("click", () => {
      const seriesIndex = button.dataset.curioSeriesIndex || String(index);
      if (hiddenLegendItems.has(seriesIndex)) {
        hiddenLegendItems.delete(seriesIndex);
        button.setAttribute("aria-pressed", "true");
      } else {
        const visibleCount = document.querySelectorAll('button[data-curio-export-control="legend"][aria-pressed="true"]').length;
        if (visibleCount <= 1) return;
        hiddenLegendItems.add(seriesIndex);
        button.setAttribute("aria-pressed", "false");
      }
      applyChartState();
    });
  });

  document.querySelectorAll('input[type="checkbox"][data-curio-export-control="checkbox"]').forEach((input) => {
    input.addEventListener("change", () => {
      const row = input.closest("label");
      if (row) row.style.opacity = input.checked ? "0.7" : "";
    });
  });

  document.querySelectorAll('button[data-curio-export-control="switch"]').forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("aria-checked") !== "true";
      button.setAttribute("aria-checked", next ? "true" : "false");
      announce((button.dataset.curioExportButtonLabel || "Toggle") + (next ? " enabled" : " disabled"));
    });
  });

  document.querySelectorAll('button[data-curio-export-control="tab"]').forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest('[role="tablist"]');
      group?.querySelectorAll('button[data-curio-export-control="tab"]').forEach((entry) => {
        const active = entry === button;
        entry.setAttribute("aria-selected", active ? "true" : "false");
        entry.dataset.curioExportTabActive = active ? "true" : "false";
      });
      announce((button.dataset.curioExportButtonLabel || "Tab") + " selected. This exported preview keeps the currently rendered panel.");
    });
  });

  document.querySelectorAll('button[data-curio-export-control="action"]').forEach((button) => {
    button.addEventListener("click", () => {
      const label = button.dataset.curioExportButtonLabel || button.textContent?.trim() || "Action";
      button.dataset.curioExportSelected = "true";
      window.setTimeout(() => {
        delete button.dataset.curioExportSelected;
      }, 900);
      const disabled = button.getAttribute("aria-disabled") === "true";
      announce(disabled
        ? label + " is a Curio-only safe action. Open the dashboard to run it."
        : label + " clicked in this exported preview.");
    });
  });

  applyChartState();
})();
`,br=({title:e,source:t,element:r})=>{const o=S(t),n=((e==null?void 0:e.trim())||T(o)).slice(0,80),i=He(r)||`<pre>${w(o)}</pre>`,s=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="curio-generated-visual-version" content="${sr}" />
<title>${w(n)}</title>
<style>
${Ne()}
${pr}
${Fe()}
</style>
</head>
<body>
  <main class="curio-export-shell">
    <h1 class="curio-export-title"><span class="curio-export-mark" aria-hidden="true">✦</span>${w(n)}</h1>
    <section class="curio-export-card" aria-label="${w(n)}">
      ${i}
    </section>
  </main>
  <script>${fr}<\/script>
</body>
</html>`;return{fileName:`${_(n)}.html`,html:s,mimeType:"text/html;charset=utf-8"}},yr=({title:e,source:t,element:r})=>{const o=S(t),n=((e==null?void 0:e.trim())||T(o)).slice(0,80),a=ur(r)||`<pre style="white-space:pre-wrap;font:13px/1.5 ui-monospace,Menlo,Consolas,monospace;">${w(o)}</pre>`,i=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${w(n)}</title>
<style>
${Ne()}
${Fe()}
${mr}
${gr}
</style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;color:#0f172a;font-family:Inter,Arial,sans-serif;">
  <main style="max-width:1120px;margin:0 auto;padding:24px 18px;">
    <header style="border:1px solid #dbeafe;border-bottom:0;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#e0f2fe 0%,#f8fafc 58%,#fef3c7 100%);padding:22px 24px;">
      <div style="display:inline-block;margin:0 0 10px;border:1px solid #bae6fd;border-radius:999px;background:#ffffff;padding:5px 10px;color:#0369a1;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;">Curio brief</div>
      <h1 style="margin:0;color:#0f172a;font-size:26px;line-height:1.18;font-weight:900;">${w(n)}</h1>
    </header>
    <section class="curio-email-card" style="border:1px solid #dbeafe;border-radius:0 0 24px 24px;background:#ffffff;padding:20px;box-shadow:0 16px 42px rgba(15,23,42,0.10);">
      ${a}
    </section>
  </main>
</body>
</html>`;return{fileName:`${_(n)}-email.html`,html:i,mimeType:"text/html;charset=utf-8"}},he=e=>new TextEncoder().encode(e),fe=e=>{const t=e.reduce((n,a)=>n+a.byteLength,0),r=new Uint8Array(t);let o=0;return e.forEach(n=>{r.set(n,o),o+=n.byteLength}),r},xr=()=>{const e=new Uint32Array(256);for(let t=0;t<256;t+=1){let r=t;for(let o=0;o<8;o+=1)r=r&1?3988292384^r>>>1:r>>>1;e[t]=r>>>0}return e},wr=xr(),Sr=e=>{let t=4294967295;for(let r=0;r<e.byteLength;r+=1)t=wr[(t^e[r])&255]^t>>>8;return(t^4294967295)>>>0},H=e=>{const t=new Uint8Array(e);return{bytes:t,view:new DataView(t.buffer),offset:0}},h=(e,t)=>{e.view.setUint16(e.offset,t,!0),e.offset+=2},f=(e,t)=>{e.view.setUint32(e.offset,t>>>0,!0),e.offset+=4},G=(e,t)=>{e.bytes.set(t,e.offset),e.offset+=t.byteLength},vr=()=>{const e=new Date,t=e.getHours()<<11|e.getMinutes()<<5|Math.floor(e.getSeconds()/2);return{date:e.getFullYear()-1980<<9|e.getMonth()+1<<5|e.getDate(),time:t}},Ar=e=>{const{date:t,time:r}=vr(),o=[],n=[];let a=0;e.forEach(l=>{const c=he(l.name),p=typeof l.content=="string"?he(l.content):l.content,u=Sr(p),m=H(30+c.byteLength+p.byteLength);f(m,67324752),h(m,20),h(m,2048),h(m,0),h(m,r),h(m,t),f(m,u),f(m,p.byteLength),f(m,p.byteLength),h(m,c.byteLength),h(m,0),G(m,c),G(m,p),o.push(m.bytes);const d=H(46+c.byteLength);f(d,33639248),h(d,20),h(d,20),h(d,2048),h(d,0),h(d,r),h(d,t),f(d,u),f(d,p.byteLength),f(d,p.byteLength),h(d,c.byteLength),h(d,0),h(d,0),h(d,0),h(d,0),f(d,0),f(d,a),G(d,c),n.push(d.bytes),a+=m.bytes.byteLength});const i=fe(n),s=H(22);return f(s,101010256),h(s,0),h(s,0),h(s,e.length),h(s,e.length),f(s,i.byteLength),f(s,a),h(s,0),fe([...o,i,s.bytes])},Ge=(e,t)=>e&&(e.innerText||e.textContent||"").trim()||t,be=(e,t=!1)=>`<w:p><w:pPr><w:spacing w:after="160"/></w:pPr><w:r>${t?"<w:rPr><w:b/></w:rPr>":""}<w:t xml:space="preserve">${Oe(e)}</w:t></w:r></w:p>`,Cr=(e,t,r)=>{const n=Ge(t,r).split(/\n+/).map(c=>c.trim()).filter(Boolean).slice(0,180),a=[be(e,!0),...n.map(c=>be(c))].join(""),i=new Date().toISOString(),s=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    ${a}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`,l=[{name:"[Content_Types].xml",content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`},{name:"_rels/.rels",content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`},{name:"docProps/core.xml",content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${Oe(e)}</dc:title>
  <dc:creator>Curio</dc:creator>
  <cp:lastModifiedBy>Curio</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">${i}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${i}</dcterms:modified>
</cp:coreProperties>`},{name:"docProps/app.xml",content:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Curio</Application>
</Properties>`},{name:"word/document.xml",content:s}];return new Blob([Ar(l)],{type:ze})},Er=({title:e,source:t,element:r})=>{const o=S(t),n=((e==null?void 0:e.trim())||T(o)).slice(0,80);return{fileName:`${_(n)}.docx`,html:"",blob:Cr(n,r,o),mimeType:ze}},Tr=({title:e,source:t})=>{const r=S(t),o=((e==null?void 0:e.trim())||T(r)).slice(0,80);return{fileName:`${_(o)}.md`,html:[`# ${o}`,"","```openui",r,"```",""].join(`
`),mimeType:"text/markdown;charset=utf-8"}},Ir=e=>e.mode==="email"?yr(e):e.mode==="markdown"?Tr(e):e.mode==="word"?Er(e):br(e),kr=e=>{const t=e.blob||new Blob([e.html],{type:e.mimeType||"text/html;charset=utf-8"}),r=URL.createObjectURL(t),o=document.createElement("a");return o.href=r,o.download=e.fileName,document.body.append(o),o.click(),o.remove(),window.setTimeout(()=>URL.revokeObjectURL(r),0),e},ye=()=>new Promise(e=>window.requestAnimationFrame(()=>e())),_r=async({title:e,source:t,element:r})=>{var s,l;const o=S(t),n=((e==null?void 0:e.trim())||T(o)).slice(0,80),a=He(r)||`<pre>${w(o)}</pre>`,i=document.createElement("div");return i.setAttribute("aria-hidden","true"),i.style.position="fixed",i.style.left="-10000px",i.style.top="0",i.style.zIndex="-1",i.style.pointerEvents="none",i.className="curio-pdf-capture",i.innerHTML=[`<style>${hr}</style>`,'<div class="curio-pdf-shell">',`<h1 class="curio-pdf-title">${w(n)}</h1>`,`<section class="curio-pdf-card">${a}</section>`,"</div>"].join(""),document.body.append(i),await((l=(s=document.fonts)==null?void 0:s.ready)==null?void 0:l.catch(()=>{})),await ye(),await ye(),i},L=(e,t)=>{const r=e.trim();if(!r||r==="transparent")return r||t;if(/^(?:#|rgb\(|rgba\(|hsl\(|hsla\()/i.test(r))return r;const o=r.match(/^color\(\s*srgb\s+([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)$/i);if(o){const n=i=>Math.round(Math.max(0,Math.min(1,Number(i)))*255),a=o[4]===void 0?1:Math.max(0,Math.min(1,Number(o[4])));return`rgba(${n(o[1])}, ${n(o[2])}, ${n(o[3])}, ${a})`}return t},Wr=e=>{const t=e.querySelector(".curio-pdf-capture"),r=e.defaultView;!t||!r||(t.querySelectorAll("svg").forEach(o=>{var i,s,l;const n=o.getAttribute("aria-label")||((s=(i=o.querySelector("title"))==null?void 0:i.textContent)==null?void 0:s.trim())||((l=o.textContent)==null?void 0:l.trim())||"Generated chart",a=e.createElement("div");a.textContent=n,a.style.minHeight="140px",a.style.display="grid",a.style.placeItems="center",a.style.border="1px solid rgba(14, 165, 233, 0.28)",a.style.borderRadius="18px",a.style.background="rgba(219, 234, 254, 0.55)",a.style.color="#0f172a",a.style.font="700 13px Inter, Arial, sans-serif",a.style.padding="16px",o.replaceWith(a)}),t.querySelectorAll("*").forEach(o=>{const n=r.getComputedStyle(o),a=o;a.style&&(a.style.backgroundImage="none",a.style.boxShadow="none",a.style.textShadow="none",a.style.filter="none",a.style.backdropFilter="none",a.style.color=L(n.color,"#0f172a"),a.style.setProperty("fill",L(n.fill,"#38bdf8")),a.style.setProperty("stroke",L(n.stroke,"#38bdf8")),a.style.setProperty("stop-color","#38bdf8"),a.style.setProperty("flood-color","#38bdf8"),a.style.setProperty("lighting-color","#38bdf8"),a.style.setProperty("outline-color","rgba(14, 165, 233, 0.36)"),a.style.setProperty("text-decoration-color","rgba(15, 23, 42, 0.24)"),a.style.backgroundColor=L(n.backgroundColor,n.display==="inline"?"transparent":"rgba(255, 255, 255, 0.72)"),a.style.borderColor=L(n.borderColor,"rgba(15, 23, 42, 0.14)"))}),t.querySelectorAll("svg, svg *").forEach(o=>{["fill","stroke"].forEach(n=>{const a=o.getAttribute(n);a&&/^(?:var\(|color\(|oklch\(|lab\(|lch\(|color-mix\()/i.test(a)&&o.setAttribute(n,n==="stroke"?"#38bdf8":"#dbeafe")})}))},Dr=(e,t,r,o)=>{var u,m;const n=new e({orientation:"portrait",unit:"pt",format:"a4",compress:!0}),a=n.internal.pageSize.getWidth(),i=n.internal.pageSize.getHeight(),s=42,l=17;let c=s;(u=n.setFont)==null||u.call(n,"helvetica","bold"),n.setFontSize(18),n.text(r,s,c),c+=28,(m=n.setFont)==null||m.call(n,"helvetica","normal"),n.setFontSize(10),(n.splitTextToSize?n.splitTextToSize(o,a-s*2):o.match(/.{1,90}(?:\s|$)/g)||[o]).forEach(d=>{c>i-s&&(n.addPage(),c=s),n.text(d,s,c),c+=l}),n.save(t)},Pr=async e=>{var n;if(typeof document>"u")throw new Error("PDF export requires a browser document.");const t=S(e.source),r=(((n=e.title)==null?void 0:n.trim())||T(t)).slice(0,80),o=await _r(e);try{const[{default:a},i]=await Promise.all([ne(()=>import("./html2canvas.esm-QH1iLAAe.js"),[],import.meta.url),ne(()=>import("./jspdf.es.min-BT3RSwHj.js").then(C=>C.j),__vite__mapDeps([0,1,2,3,4]),import.meta.url)]),s=i.jsPDF;let l;try{l=await a(o,{backgroundColor:"#f8fafc",foreignObjectRendering:!0,logging:!1,scale:Math.min(2,Math.max(1,window.devicePixelRatio||1)),useCORS:!0,onclone:Wr})}catch(C){console.info("[generatedVisualExport] Visual PDF capture used text fallback.",C);const oe=`${_(r)}.pdf`;return Dr(s,oe,r,Ge(e.element,t)),{fileName:oe,html:"",mimeType:"application/pdf"}}const c=l.width>l.height?"landscape":"portrait",p=new s({orientation:c,unit:"pt",format:"a4",compress:!0}),u=p.internal.pageSize.getWidth(),m=p.internal.pageSize.getHeight(),d=24,y=u-d*2,g=m-d*2,x=y,A=l.height*x/Math.max(1,l.width),I=l.toDataURL("image/png"),W=Math.max(1,Math.ceil(A/g));for(let C=0;C<W;C+=1)C>0&&p.addPage(),p.addImage(I,"PNG",d,d-C*g,x,A);const D=`${_(r)}.pdf`;return p.save(D),{fileName:D,html:"",mimeType:"application/pdf"}}finally{o.remove()}},Zr=async e=>e.mode==="pdf"?Pr(e):kr(Ir({...e,mode:e.mode||"html"})),Lr=15e3,Rr="curio:dashboard-widget-action";let R=null;const Yr=e=>(R={...e,createdAt:e.createdAt??Date.now()},R),Qr=(e=Lr,t=Date.now())=>!R||t-R.createdAt>e?null:R,eo=e=>{if(typeof window>"u")return!1;try{return window.dispatchEvent(new CustomEvent(Rr,{detail:e})),!0}catch{return!1}};export{qr as A,Kr as B,Zt as C,Xr as D,re as E,ke as F,Rr as G,Ur as H,Gt as I,Fr as J,Hr as K,eo as L,ar as a,nt as b,S as c,Zr as d,Vr as e,Nr as f,T as g,De as h,Ot as i,We as j,Ht as k,Br as l,Jr as m,ot as n,J as o,jr as p,Ce as q,Qr as r,Yr as s,Vt as t,Gr as u,Rt as v,Xt as w,Qt as x,ir as y,nr as z};
