const a = [1,2,3,545,89739,457]
let b =[]
for(let i=0;i<a.length;i++){
    b.push(a[i]+1)
}
let temp =0
for(let i=0;i<a.length;i++) temp+=a[i]
const sum = a.reduce((previous,next)=>{
   if(next%2===0) {
       previous.even = previous.even || []
       previous.even.push(next)
    }else {
        previous.odd = previous.odd || []
        previous.odd.push(next)

   }
   return previous
},{})
const c = a.map((i,index)=> index)
console.info(sum)