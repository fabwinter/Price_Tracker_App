import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../api/supabaseClient';
import { PriceHistoryChart } from '../components/charts/PriceHistoryChart';
export default function ProductDetail(){
  const {id}=useParams();const {data:prod}=useQuery(['product',id],async()=>{
    const {data,error}=await supabase.from('products')
      .select('id,name,url,image_url,retailer,target_price,last_checked,price_history(price,recorded_at)')
      .eq('id',Number(id)).single();
    if(error)throw error;
    const hist=prod?.priceHistory || prod?.price_history;
    return { id:prod.id,name:prod.name,url:prod.url,imageUrl:prod.image_url, retailer:prod.retailer,
      currentPrice:hist.slice(-1)[0]?.price||0, previousPrice:hist.slice(-2,-1)[0]?.price||0,
      targetPrice:prod.target_price, lastChecked:prod.last_checked, priceHistory:hist.map((h:any)=>({price:h.price,date:h.recorded_at}))
    };
  });
  if(!prod)return <div>Loading...</div>;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{prod.name}</h1>
      <img src={prod.imageUrl} alt={prod.name} className="w-full max-w-md"/>
      <p>Retailer: {prod.retailer}</p>
      <p>Current: ${prod.currentPrice.toFixed(2)}</p>
      <p>Target: ${prod.targetPrice.toFixed(2)}</p>
      <PriceHistoryChart priceHistory={prod.priceHistory}/>
    </div>
  );
}
