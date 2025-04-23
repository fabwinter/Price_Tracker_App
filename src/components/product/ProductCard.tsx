import { Link } from 'react-router-dom';
import { formatPrice,getPriceChangeStatus,isTargetPriceMet,isTargetPriceClose } from '../../utils/price';
import { Product } from '../../utils/types';
export function ProductCard({product}:{product:Product}) {
  const{ id,name,imageUrl,retailer,currentPrice,previousPrice,targetPrice }=product;
  const status=getPriceChangeStatus(currentPrice,previousPrice);
  const met=isTargetPriceMet(currentPrice,targetPrice);
  const close=isTargetPriceClose(currentPrice,targetPrice);
  return (
    <div className="border rounded overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover"/>
      <div className="p-2">
        <h3 className="font-bold">{name}</h3>
        <p>{retailer}</p>
        <p className={status==='down'?'text-green-600':status==='up'?'text-red-600':'text-gray-800'}>
          {formatPrice(previousPrice)} → {formatPrice(currentPrice)}
        </p>
        {met?<span className="text-green-800 font-bold">Met!</span>:close?<span className="text-yellow-800">Close</span>:null}
      </div>
      <div className="p-2 bg-gray-100 text-right">
        <Link to={`/product/${id}`} className="text-blue-600">Details</Link>
      </div>
    </div>
  );
}
