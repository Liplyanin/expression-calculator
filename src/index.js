function eval() {
    // Do not use eval!!!
    return;
}
// const expr = " (  38 + 52 + 65 - 19  ) * (  72 * 3 / 36 * (  9 / 2 - 17 * 38 / 28  )  ) / 18 / 84 ";
function expressionCalculator(expr) {
    let str = expr.replace(/\s/g, '');
    const arr = [];
    let leftBrecketCount = 0;
    let rightBrecketCount = 0;
    for(let i=0; i<str.length; i++){
       if(str[i]=="*"||str[i]=="/"||str[i]=="+"||str[i]=="-"||str[i]=="("||str[i]==")") {
           arr.push(str[i]);
           if(str[i]=="(")leftBrecketCount+=1;
           if(str[i]==")")rightBrecketCount+=1
        } else {
           let numb = '';
           while(i<str.length){
            numb+=str[i];
            if(str[i+1]=="*"||str[i+1]=="/"||str[i+1]=="+"||str[i+1]=="-"||str[i+1]=="("||str[i+1]==")"){
               break;
            }else{
               i++;
            }
           }
           arr.push(numb); 
       }
    }
    let brecketCount = 0;
    if(leftBrecketCount!==rightBrecketCount)throw new Error ('ExpressionError: Brackets must be paired');
    else brecketCount+=rightBrecketCount;

    let answer = 0;

  (function calculate (){
      if(arr.length==1)return console.log(arr[1]);
      else if(brecketCount>0){
        let brecket = [];
        let count = 0;  
            let i = arr.indexOf(")") - 1;
            for( i; arr[i]!=='('; i--){
                count++;
                brecket.unshift(arr[i])            
            }
        let calc = function (){
            let delIndex = brecket.indexOf('/');
            let multIndex = brecket.indexOf('*');
            if(delIndex!==-1){
                if(brecket[delIndex+1]=="0")throw new Error ('TypeError: Division by zero.');
                let newNum = brecket[delIndex-1]/brecket[delIndex+1];
                brecket.splice(delIndex-1,3, newNum);
                calc();
            }else if(multIndex!==-1) {
             let newNum = brecket[multIndex-1]*brecket[multIndex+1];
             brecket.splice(multIndex-1,3, newNum)
             calc();
            }
        };
        calc();
        let resultInbBrecket = brecket[0];
        for(let i=1; i<brecket.length; i++){
            if(brecket[i]=="+") {
                resultInbBrecket = parseFloat(resultInbBrecket) + parseFloat(brecket[i+1]);
                i++;
            }else if(brecket[i]=="-") {
                resultInbBrecket-=brecket[i+1];
                i++;
            }
        }
        arr.splice(arr.indexOf(")")-count-1, count+2,resultInbBrecket );  
        brecketCount--;
        return calculate();
      }else if(brecketCount==0){
        ( function calc(){
            let delIndex = arr.indexOf('/');
            let multIndex = arr.indexOf('*');
            if(delIndex!==-1){
                if(arr[delIndex+1]=="0")throw new Error ('TypeError: Division by zero.');
                let newNum = arr[delIndex-1]/arr[delIndex+1];
                arr.splice(delIndex-1,3, newNum)
                calc()
            }else if(multIndex!==-1) {
             let newNum = arr[multIndex-1]*arr[multIndex+1];
             arr.splice(multIndex-1,3, newNum)
             calc()  
             
            }
        }())
        
        let result = arr[0];
        for(let i=1; i<arr.length; i++){
          
            if(arr[i]=="+") {
                result = parseFloat(result) + parseFloat(arr[i+1]);
                i++;
            }else if(arr[i]=="-") {
                result-=arr[i+1];
                i++;
            }
        }
        return  answer+=result;
      }
    }())
    return answer;
}

module.exports = {
    expressionCalculator
}