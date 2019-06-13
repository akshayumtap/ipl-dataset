const { readFile,writeFile } = require('fs')

const fileName = './dataset/Ball_by_Ball.csv'
readFile(fileName, 'utf8', (err, data) => {
    if (err) console.log("err", err)
    const record = data.split('\n')
    const headers = record[0].split(',')
    const ballsDeliverd = record
                            .slice(1)
                            .map(details => details.split(','))
                            .reduce((previous,next)=>{
                                let temp = {}
                                
                                next.forEach((x,index)=>{
                                    temp[headers[index]] = x
                                })
                                // console.info(temp,"x")
                                previous.push(temp)
                                return previous
                            },[])
    const matches = ballsDeliverd.reduce((previous,next)=>{
        previous[next.Match_Id] = previous[next.Match_Id]|| {}
        previous[next.Match_Id][next.Bowler_Id] = previous[next.Match_Id][next.Bowler_Id] || {}
        previous[next.Match_Id][next.Bowler_Id].runs = previous[next.Match_Id][next.Bowler_Id].runs || 0
        previous[next.Match_Id][next.Bowler_Id].balls = previous[next.Match_Id][next.Bowler_Id].balls || 0
        previous[next.Match_Id][next.Bowler_Id].balls +=1
        previous[next.Match_Id][next.Bowler_Id].runs += Number(next.Batsman_Scored) ||0
        return previous
    },{})        
    console.info(ballsDeliverd[6].Batsman_Scored)       
    writeFile('data.json',JSON.stringify(matches,null,2),(err)=>{
        if(err) console.error("err",err)
        console.info('success')
    })
})