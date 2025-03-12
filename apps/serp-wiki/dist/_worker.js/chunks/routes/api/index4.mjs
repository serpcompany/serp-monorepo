import{d as e,g as t,c as o}from"../../nitro/nitro.mjs";import{u as s,d as r,a as i}from"./index5.mjs";import{d as n,s as a}from"./db/schema.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"node:net";import"node:async_hooks";import"node:assert";import"node:util";import"node:url";import"node:stream";import"node:crypto";import"node:dns";import"node:string_decoder";const m=e((async e=>{const{page:m=1,limit:u=100,categorySlug:d}=t(e),g=Number(m),c=Math.min(Number(u),100);if(isNaN(g)||g<1||!Number.isInteger(g))throw o({statusCode:400,message:"Page must be a positive integer."});if(isNaN(c)||c<1||!Number.isInteger(c))throw o({statusCode:400,message:"Limit must be a positive integer."});const p=(g-1)*c;let l=s().select({id:n.id,name:n.name,slug:n.slug,oneLiner:n.oneLiner,excerpt:n.excerpt,logo:n.logo,serplyLink:n.serplyLink,categories:n.categories,screenshots:n.screenshots,rating:n.rating,upvotes:n.upvotes,downvotes:n.downvotes,featured:n.featured,featuredOrder:n.featuredOrder}).from(n);d&&(l=l.where(a`
        jsonb_path_exists(
          ${n.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${d}::text)
        )
      `)),l=l.orderBy(r(n.featured),i(n.featuredOrder)).limit(c).offset(p);let f=s().select({count:a`count(*)`}).from(n);d&&(f=f.where(a`
        jsonb_path_exists(
          ${n.categories},
          '$[*] ? (@.slug == $slug)'::jsonpath,
          jsonb_build_object('slug', ${d}::text)
        )
      `));const[b,[{count:h}]]=await Promise.all([l.execute(),f.execute()]);if(!b.length)throw o({statusCode:404,message:"Not found"});const j=b.map((e=>e)),N={currentPage:g,pageSize:c,totalItems:Number(h)},x=(()=>{if(j&&j.length&&j[0].categories){for(const e of j[0].categories)if(e.slug===d)return e.name}else;})();return{companies:j,pagination:N,categoryName:x}}));export{m as default};
//# sourceMappingURL=index4.mjs.map
