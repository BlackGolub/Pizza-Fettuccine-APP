import{r as i,j as s,c as m,u as x,L as j,a as f,b as v,P as N,A as z,H as y}from"./index-DWodoykK.js";const b="_input_1bpsm_1",k="_icon_1bpsm_35",l={input:b,"input-wrapper":"_input-wrapper_1bpsm_27",icon:k},w=i.forwardRef(function({isValid:e=!0,className:n,...a},c){return s.jsxs("div",{className:l["input-wrapper"],children:[s.jsx("input",{ref:c,className:m(l.input,n,{[l.invalid]:e}),...a}),s.jsx("img",{className:l.icon,src:"/search-icon.svg",alt:"Иконка лупы"})]})}),F="_head_zhpgd_1",$={head:F},E="_head_sshz5_1",S="_card_sshz5_13",L="_footer_sshz5_27",P="_title_sshz5_35",I="_description_sshz5_51",M="_link_sshz5_67",A="_price_sshz5_75",C="_currency_sshz5_103",R="_rating_sshz5_111",t={head:E,card:S,footer:L,title:P,description:I,link:M,price:A,currency:C,rating:R,"add-to-cart":"_add-to-cart_sshz5_141"};function D({id:r,name:e,ingredients:n,image:a,price:c,rating:u}){const d=x(),h=p=>{p.preventDefault(),d(f.add(r))};return s.jsx(j,{to:`/product/${r}`,className:t.link,children:s.jsxs("div",{className:m(t.card),children:[s.jsxs("div",{className:t.head,style:{backgroundImage:`url('${a}')`,backgroundPosition:"center",backgroundSize:"cover"},children:[s.jsxs("div",{className:t.price,children:[c," ",s.jsx("span",{className:t.currency,children:"₽"})]}),s.jsx("button",{className:t["add-to-cart"],onClick:h,children:s.jsx("img",{src:"/cart-button-icon.svg",alt:"Добавить в корзину"})}),s.jsxs("div",{className:t.rating,children:[u," ",s.jsx("img",{src:"/star-icon.svg",alt:"Иконка звезды"})]})]}),s.jsxs("div",{className:t.footer,children:[s.jsx("div",{className:t.title,children:e}),s.jsx("div",{className:t.description,children:n})]})]})})}const H="_wrapper_1stuc_1",V={wrapper:H};function X({products:r}){return s.jsx("div",{className:V.wrapper,children:r.map(e=>s.jsx(D,{id:e.id,name:e.name,ingredients:e.ingredients.join(", "),rating:e.rating,price:e.price,image:e.image},e.id))})}function B(){const[r,e]=i.useState([]),[n,a]=i.useState(!1),[c,u]=i.useState(),[d,h]=i.useState();i.useEffect(()=>{p(d)},[d]);const p=async _=>{try{a(!0);const{data:o}=await v.get(`${N}/products`,{params:{name:_}});e(o),a(!1)}catch(o){a(!1),o instanceof z&&u(o.message),console.error(o);return}},g=_=>{h(_.target.value)};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:$.head,children:[s.jsx(y,{children:"Menu"}),s.jsx(w,{placeholder:"Введите блюдо или состав",onChange:g,isValid:!0})]}),s.jsxs("div",{children:[c&&s.jsx(s.Fragment,{children:c}),!n&&r.length>0&&s.jsx(X,{products:r}),n&&s.jsx(s.Fragment,{children:"Загрузка..."}),!n&&r.length===0&&s.jsx(s.Fragment,{children:"Не найдело блюд по запросу"})]})]})}export{B as default};