function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {


    let str = expr.replace(/\s/g, '');
    let arr = [];

    for(let i=0; i<str.length; i++){
       if(str[i]=="*"||str[i]=="/"||str[i]=="+"||str[i]=="-"||str[i]=="("||str[i]==")") {
           arr.push(str[i]);
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
    return result;
}

module.exports = {
    expressionCalculator
}