const FindLeftFreq=(props)=>{
    let i,n,temp;
    n=9;
    let freq=new Array(10).fill(9);
    let blankSpacesPos=[];
    console.log(props.tempSudoku);
    for(i=0;i<n*n;i++){
        if(props.tempSudoku[i]!=='.'){
            freq[props.tempSudoku[i]]--;
        }
        else{
            blankSpacesPos.push(i);
        }
    }
    temp=props.blanks;
    while(temp>0)
    {
        let randomIndex=blankSpacesPos[Math.random()*blankSpacesPos.length];
        blankSpacesPos[randomIndex]=blankSpacesPos[blankSpacesPos.length-1];
        blankSpacesPos.pop();
        props.tempSudoku[randomIndex]=props.originalSudoku[randomIndex];
        temp--;
    }
    return freq;
}

module.exports={
    FindLeftFreq,
}