import{a as y,b as T,c as A,d as $,e as q,f as w}from"./chunk-5GHKSCR5.js";import{a as S}from"./chunk-7G7IADDR.js";import{ha as L,o as E,v as F}from"./chunk-KPJZN6DE.js";import"./chunk-UVSGBOMG.js";import{j as B}from"./chunk-2IZ7IHI6.js";import{Ab as a,Bb as l,Cb as g,Hb as x,Ma as c,Pb as r,Qb as I,Rb as d,Tb as C,Vb as h,Wb as M,Ya as i,hc as D,ma as O,pb as k,qa as m,ra as _,rb as P,wb as b}from"./chunk-M53VWNKG.js";import"./chunk-55KE2TB7.js";function N(t,e){t&1&&g(0,"spinner")}function z(t,e){if(t&1&&(a(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),r(3),l()(),a(4,"mat-card-content")(5,"p"),r(6),l(),a(7,"p"),r(8),l(),a(9,"p"),r(10),l(),a(11,"p"),r(12),l(),a(13,"p"),r(14),l()()()),t&2){let f,s,n,o,p,v,u=x(2);i(3),I((f=u.book())==null?null:f.title),i(3),d("\u0410\u0432\u0442\u043E\u0440: ",(s=u.book())==null?null:s.author,""),i(2),d("\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446: ",(n=u.book())==null?null:n.pages,""),i(2),d("\u042F\u0437\u044B\u043A: ",(o=u.book())==null?null:o.language,""),i(2),d("\u0416\u0430\u043D\u0440: ",(p=u.book())==null?null:p.genre,""),i(2),d("\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: ",(v=u.book())==null?null:v.description,"")}}function G(t,e){t&1&&g(0,"no-data")}function J(t,e){if(t&1&&k(0,z,15,6,"mat-card")(1,G,1,0),t&2){let f=x();b(0,f.book()?0:1)}}var j=(()=>{let e=class e{constructor(){this.book=c.required(),this.bookLoadingStatus=c.required()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=_({type:e,selectors:[["book"]],inputs:{book:[m.SignalBased,"book"],bookLoadingStatus:[m.SignalBased,"bookLoadingStatus"]},standalone:!0,features:[C],decls:2,vars:1,template:function(n,o){if(n&1&&k(0,N,1,0,"spinner")(1,J,2,1),n&2){let p;b(0,(p=o.bookLoadingStatus())!=null&&p.loading?0:1)}},dependencies:[w,T,$,q,A,F,L],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;gap:0;flex:1}[_nghost-%COMP%]   .assigner-field[_ngcontent-%COMP%]{align-items:center;display:flex;gap:var(--margin-m)}[_nghost-%COMP%]   .assigner-field[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .assigner-field-input[_ngcontent-%COMP%]{margin-top:var(--margin-m)}"],changeDetection:0});let t=e;return t})();var lt=(()=>{let e=class e{constructor(){this.store=O(E),this.bookId=c(null,{alias:"bookID",transform:D}),this.book$=this.store.select(y.book.data),this.bookLoadingStatus$=this.store.select(y.book.loadingStatus)}ngOnInit(){this.store.dispatch(S.getBook.requested({payload:this.bookId()??null}))}ngOnDestroy(){this.store.dispatch(S.destroyPage())}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=_({type:e,selectors:[["book-container"]],inputs:{bookId:[m.SignalBased,"bookID","bookId"]},standalone:!0,features:[C],decls:3,vars:6,consts:[[3,"book","bookLoadingStatus"]],template:function(n,o){n&1&&(g(0,"book",0),h(1,"async"),h(2,"async")),n&2&&P("book",M(1,2,o.book$))("bookLoadingStatus",M(2,4,o.bookLoadingStatus$))},dependencies:[j,B],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;gap:0;flex:1}[_nghost-%COMP%]   .assigner-field[_ngcontent-%COMP%]{align-items:center;display:flex;gap:var(--margin-m)}[_nghost-%COMP%]   .assigner-field[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%]{flex:1}[_nghost-%COMP%]   .assigner-field-input[_ngcontent-%COMP%]{margin-top:var(--margin-m)}"],changeDetection:0});let t=e;return t})();export{lt as default};
