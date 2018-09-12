/**
 * 2018-09-08
 * @LinWei
 *
 * This is a better method than RegExp.prototype.test
 * because RegExp.prototype.test is not strict. And it
 * is overkill to me, I don't like RegExp.prototype.test,
 * so I create a better method to check string.
 *
 * Why I don't like RegExp.prototype.test, for example:
 * 
 * var pattern=/abc/;
 * var str='abc';
 * console.log(pattern.test(str));   
 * // => true  
 * // normal
 *
 * But, it makes me angry because:
 * 
 * var pattern=/abc/;
 * var str='abcdefg';
 * console.log(pattern.test(str));
 * // => true
 * // OMG
 *
 * So, I can use my method to improve:
 * 
 * var pattern=/abc/
 * var str='abc';
 * 
 * console.log(pattern.strictTest(str));
 * // => true
 *
 * str='abcdefg';
 * 
 * console.log(pattern.strictTest(str));
 * // => false
 *
 */ 

if(!RegExp.prototype.strictTest){
	RegExp.prototype.strictTest=(function(){
		"use strict";

		// check if it is string.
		var isString=function(value){
			return typeof value;
		};

		var length=function(string){
			return string.length;
		};

		// make pattern string.
		var pattern=function(str){
			var pattern='',
			    i=1;
			while(1){
				pattern+=str[i];
				i+=1;
				if(str[i]==='/'&&str[i-1]!=='\\'){
					break;
				}
			}    
			return '^'+pattern+'$';
		};

		// make flag string.
		var flag=function(reg){
			var flag='';
			if(reg.global){
				flag+='g';
			}
			if(reg.ignoreCase){
				flag+='i';
			}
			if(reg.multiline){
				flag+='m';
			}
			return flag;
		};

		return function(string){
			var str=this+'',
				pat=pattern(str),  // you can also use /pattern/.source
				f=flag(this),
				expression=new RegExp(pat,f),
				i=0,
				test=string+'';
			if(!expression.ignoreCase){
				while(1){
					if(test[i]>='A'&&test[i]<='Z'){
						return false;
					}
					i+=1;
					if(!test[i]){
						break;
					}
				}
			}	
			return expression.test(test);   
			
		};

	})();
}