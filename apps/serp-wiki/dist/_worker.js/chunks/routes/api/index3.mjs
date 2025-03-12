import{d as e,g as t,c as s}from"../../nitro/nitro.mjs";import{u as o}from"./index5.mjs";import{b as i,s as r}from"./db/schema.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"node:net";import"node:async_hooks";import"node:assert";import"node:util";import"node:url";import"node:stream";import"node:crypto";import"node:dns";import"node:string_decoder";const n=e((async e=>{const{page:n=1,limit:m=100,weightClassSlug:a}=t(e),u=Number(n),d=Math.min(Number(m),100);if(isNaN(u)||u<1||!Number.isInteger(u))throw s({statusCode:400,message:"Page must be a positive integer."});if(isNaN(d)||d<1||!Number.isInteger(d))throw s({statusCode:400,message:"Limit must be a positive integer."});const p=(u-1)*d;let g=o().select({id:i.id,name:i.name,slug:i.slug,division:i.division}).from(i);a&&(g=g.where(r`
        jsonb_path_exists(
          ${i.division},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${a}::text)
        )
      `)),g=g.orderBy(i.name).limit(d).offset(p);let l=o().select({count:r`count(*)`}).from(i);a&&(l=l.where(r`
        jsonb_path_exists(
          ${i.division},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${a}::text)
        )
      `));const[c,[{count:b}]]=await Promise.all([g.execute(),l.execute()]);if(!c.length)throw s({statusCode:404,message:"Not found"});return{boxers:c.map((e=>e)),pagination:{currentPage:u,pageSize:d,totalItems:Number(b)}}}));export{n as default};
//# sourceMappingURL=index3.mjs.map
