import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabaseClient';
import { AddProductForm } from '../components/product/AddProductForm';
import { ProductCard } from '../components/product/ProductCard';
export default function Dashboard(){
  const {data,refetch,isLoading} = useQuery(['products'],async()=>{
    const res=await supabase.functions.invoke('search-products',{body:JSON.stringify({query:''})});
    if(res.error)throw new Error(res.error.message);
    return res.data;
  });
  return (
    <div className="p-6 space-y-4">
      <AddProductForm onAdded={()=>refetch()}/>
      {isLoading?<div>Loading...</div>:<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((p:any)=><ProductCard key={p.id} product={p}/>)}
      </div>}
    </div>
  );
}
