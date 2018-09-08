# better-regular-expression-test
make the regular expression test more strict.  
  
2018-09-08      
LinWei        
   
Do you like RegExp.prototype.test? I don't like   
it at all. This method is not strict. Why? Look   
at the example:  

```  
var pattern=/abc/;
var str='abc';

console.log(pattern.test(str));
// => true

str='abcdefg';

console.log(pattern.test(str));
// => true 
// not strict.
```    
So, I want check string more strict.  
[RegExp.prototype.strictTest](https://github.com/asilinwei/better-regular-expression-test/blob/master/strictTest.js) can check string more strict, for example:  
  
```
var pattern=/abc/;
var str='abc';

console.log(pattern.strictTest(str));
// => true 

str='abcdefg';

console.log(pattern.strictTest(str));
// => false
// OK
```  