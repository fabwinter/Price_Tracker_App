import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabaseClient';
import { ProductCard } from '../components/product/ProductCard';
export default function Search(){
  const [q,setQ]=useState('');const {data,isLoading,error,refetch}=useQuery(['search',q],async()=>{
    if(!q)throw new Error('Enter search term');
    const res=await supabase.functions.invoke('search-products',{body:JSON.stringify({query:q})});
    if(res.error)throw new Error(res.error.message);
    return res.data;
  },{enabled:false});
  return (
    <div className="p-6 space-y-4">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search" className="w-full p-2 border rounded"/>
      <button onClick={()=>refetch()} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
      {isLoading?<div>Searching...</div>:error?<div className="text-red-600">{error.message}</div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((p:any)=><ProductCard key={p.id} product={p}/>)}
      </div>}
    </div>
  );
}
