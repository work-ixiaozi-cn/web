import{d as B,v as N,g,x as k,y as w,r as f,o as r,e as h,f as t,a as c,w as s,t as l,b,F as y,p as C,c as L}from"./index-c09176cc.js";import{c as M}from"./index-3ba92ab7.js";import"./axios-35611c58.js";const T={class:"container mx-auto"},V={href:"/"},F={class:"container mx-auto"},H={class:"text-center"},I=["innerHTML"],j=B({__name:"cate",setup(D){const u=N(),e=g(),_=a=>{M(a).then(i=>e.value=i.data.data)};return _(parseInt(u.params.id)),k(()=>{w(()=>u.params.id,a=>_(parseInt(a)))}),(a,i)=>{var d,m;const n=f("el-breadcrumb-item"),v=f("el-breadcrumb");return r(),h("div",null,[t("section",T,[c(v,{separator:"/"},{default:s(()=>{var p;return[c(n,{to:{path:"/"}},{default:s(()=>[b("首页")]),_:1}),(r(!0),h(y,null,C((p=e.value)==null?void 0:p.cates,(o,x)=>(r(),L(n,{key:x},{default:s(()=>[t("a",V,l(o.name),1)]),_:2},1024))),128)),c(n,null,{default:s(()=>{var o;return[b(l((o=e.value)==null?void 0:o.title),1)]}),_:1})]}),_:1})]),t("section",F,[t("h1",H,l((d=e.value)==null?void 0:d.title),1),t("article",{innerHTML:(m=e.value)==null?void 0:m.content},null,8,I)])])}}});export{j as default};
