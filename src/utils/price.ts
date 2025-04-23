export function formatPrice(p: number): string { return `$${p.toFixed(2)}`; }
export function getPriceChangeStatus(c:number,p:number){if(c>p)return 'up';if(c<p)return 'down';return 'same';}
export function isTargetPriceMet(c:number,t:number){return c<=t;}
export function isTargetPriceClose(c:number,t:number){return Math.abs(c-t)/t<0.05;}
