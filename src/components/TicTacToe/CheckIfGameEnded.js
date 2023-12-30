// assuming 1 for chance taken by computer and -1 for chance taken by user and 0 for empty
const checkRow=(rowNo,board)=>{
    if(board[rowNo][0]===board[rowNo][1] && board[rowNo][1]===board[rowNo][2]){
        return true;
    }
    return false;
}
const checkColumn=(columnNo,board)=>{
    if(board[0][columnNo]===board[1][columnNo] && board[1][columnNo]===board[2][columnNo]){
        return true;
    }
    return false;
}
const checkPrimaryDiagonal=(board)=>{
    if(board[0][0]===board[1][1] && board[1][1]===board[2][2]){
        return true;
    }
    return false;
}
const checkSecondaryDiagonal=(board)=>{
    if(board[0][2]===board[1][1] && board[1][1]===board[2][0]){
        return true;
    }
    return false;
}
const CheckIfGameEnded=(board)=>{
    console.log(board);
    let i,n;
    n=3;
    for(i=0;i<n;i++){
        if(checkRow(i,board)===true && board[i][0]!==0){
            return {
                gameEnded:true,
                winner:board[i][0]
            }
        }
        else if(checkColumn(i,board)===true && board[0][i]!==0){
            return {
                gameEnded:true,
                winner:board[0][i]
            }
        }
    }
    if(checkPrimaryDiagonal(board)===true && board[1][1]!==0){
        return {
            gameEnded:true,
            winner:board[0][0]
        }
    }
    if(checkSecondaryDiagonal(board)===true && board[1][1]!==0){
        return {
            gameEnded:true,
            winner:board[0][2]
        }
    }
    return {
        gameEnded:false,
        winner:'none'
    }
}

module.exports={
    CheckIfGameEnded,
}