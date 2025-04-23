import { ResponsiveContainer,LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid } from 'recharts';
import { PricePoint } from '../../utils/types';
export function PriceHistoryChart({priceHistory}:{priceHistory:PricePoint[]}) {
  const data=priceHistory.map(p=>({date:new Date(p.date).toLocaleDateString(),price:p.price}));
  return (
    <div className="p-4 bg-white rounded shadow" style={{width:'100%',height:300}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{top:10,right:30,left:0,bottom:0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="date" tick={{fontSize:12}}/>
          <YAxis tick={{fontSize:12}} domain={['auto','auto']}/>
          <Tooltip formatter={(v:number)=>`$${v.toFixed(2)}`}/>
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={{r:3}} activeDot={{r:6}}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
