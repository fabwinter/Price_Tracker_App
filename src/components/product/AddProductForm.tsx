import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'sonner';
import { supabase } from '../../api/supabaseClient';
export function AddProductForm({onAdded}:{onAdded:()=>void}) {
  const [url, setUrl] = useState(''); const [target,setTarget]=useState<number>();
  const scrape = useMutation(async ()=>{
    const res=await supabase.functions.invoke('scrape-product',{body:JSON.stringify({url})});
    if(res.error)throw new Error(res.error.message); return res.data;
  },{
    onSuccess:d=>{setTarget(d.currentPrice);toast.success('Fetched!');},
    onError:e=>toast.error(e.message)
  });
  const add = useMutation(async ()=>{
    const {data,error}=await supabase.from('products').upsert({url,target_price:target}).single();
    if(error)throw error;
    await supabase.from('price_history').insert({product_id:data.id,price:target});
  },{
    onSuccess:()=>{toast.success('Added');onAdded();},onError:e=>toast.error(e.message)
  });
  return (
    <div className="p-4 bg-white rounded shadow space-y-2">
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="URL" className="w-full p-2 border rounded"/>
      <button onClick={()=>scrape.mutate()} disabled={!url} className="px-4 py-2 bg-green-600 text-white rounded">Fetch</button>
      <input type="number" value={target||''} onChange={e=>setTarget(Number(e.target.value))} placeholder="Target" className="w-full p-2 border rounded"/>
      <button onClick={()=>add.mutate()} disabled={!url||target===undefined} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
    </div>
  );
}
