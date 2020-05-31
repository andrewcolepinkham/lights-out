//takes a boolean matrix and outputs a list of 0s and 1s to represent moves
export function gaussianSolver(inputMatrix){
    //console.log('inputMatrix: ' + inputMatrix)
    var matrix = binaryMatrixConverter(inputMatrix)
    //console.log('matrix: ' + matrix)
    var mat = gassuianMatrixBuilder(matrix)
    //console.log('mat: ' + mat)
    var rowLength = mat.length;
        //for each column...
        for (var i = 0; i < rowLength; i++){
          var nonZeroEntryFound = false;
          var colIdx = i;
          while(!nonZeroEntryFound){//search for non-zero entry until we found one
              if(mat[colIdx][i]===1){
                //swapRows
                var temp = mat[colIdx];
                mat[colIdx] = mat[i];
                mat[i] = temp;
                nonZeroEntryFound = true;
              }
              if(colIdx<rowLength-1){
                colIdx++;
              }
              else{
                break;
              }
          }
          //for each row below i
          for(var k = i+1; k < rowLength; k++){ //k is the current row we are checking
            if(mat[k][i]!== 0){
              subtractRow(mat[k], mat[i]); // A[k] = A[k]-topRow
            }
          }
        }
        for(var i = rowLength-1; i >= 0; i--){
          for(var j = i-1; j >= 0; j--){
            if(mat[j][i]===1){
             subtractRow(mat[j], mat[i]);
            }
          }
        }
  
        var returnList = [];
        for(var row = 0; row < mat.length; row ++){
          returnList.push(mat[row][mat.length+1])
        }
        return returnList;
  }
//Takes a binary matrix of original size and explodes it into a squared version with augmented column
function gassuianMatrixBuilder(input){
    var inputMatrix = input
    var dimension = ( inputMatrix.length * inputMatrix.length );
    var size = 3;
    //init the augmented column with the values from the input matrix
    var augCol = [];
    for(var row = 0; row < inputMatrix.length; row++){
        for(var col = 0; col < inputMatrix.length; col++){
        augCol.push(inputMatrix[row][col]);
        }
    }
    //init a new matrix of n^2xn^2+1
    var mat = [];
    for(let i = 0; i < dimension; i++) {
        mat.push(new Array(dimension+1));
    }
    //fill with zeros
    for(var col = 0; col < dimension+1; col++){
        for(var row = 0; row < dimension; row++){
        mat[row][col] = 0;
        }
    }
    //logic to fill with 1s
    for(var col = 0; col < dimension; col++){
        mat[col][col] = 1;
        if(col===0){
            mat[col+1][col] = 1;
            mat[col+(Math.sqrt(dimension))][col] = 1;
        }
        else{
            if(col===1){
            mat[col-1][col] = 1;
            }
            if(col%size!==0){//not at a left wall
            mat[col-1][col] = 1;
            }
            if((col+1)%size!==0){//not at a right wall
            if(col!==(dimension-1)){
                mat[col+1][col] = 1;
            }
            }
            if(col>=size){//not at a top wall
            mat[col-size][col] = 1;
            }
            if(col<(dimension-size)){//not at a bottom wall
            mat[col+size][col] = 1;
            }
        }
    }

    //fill augmented column with the filled in lights from the newBoard of squares
    for(var row = 0; row < dimension; row++){
        mat[row][dimension+1] = augCol[row];
    }
    return mat;

}
function subtractRow(destinationArr, topArr){
    for(var i = 0; i < destinationArr.length; i++){
        if(destinationArr[i]-topArr[i]===-1){
        destinationArr[i] = 1;
        }
        else{
        destinationArr[i] = (destinationArr[i]-topArr[i])%2;
        }
    }
}
//converts a boolean matrix to a binary matrix
function binaryMatrixConverter(matrix){
    var matrixCopy = arrayClone(matrix)
    var returnMatrix = Array(matrixCopy.length).fill().map(() => Array(matrixCopy.length).fill(0));
    for(var i = 0; i < matrix.length; i++){
        for(var j = 0; j < matrix[0].length; j++){
        matrixCopy[i][j] = matrixCopy[i][j] ? 1 : 0;
        }
    }
    return matrixCopy
}

function arrayClone(arr){
    return JSON.parse(JSON.stringify(arr));
}