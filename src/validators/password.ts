import { FormControl } from '@angular/forms';
 
export class PasswordValidator {

    static isValid(control: FormControl): any {
        let isNumber = null;
        let isUppercase = null;
        let i = 0;
        let character;

        while (i <= control.value.length-1 ){
        
        character = control.value[i];
        
        if(isNaN(character) && isNumber != true){
            isNumber = false
        }else{
            isNumber = true
        }

        if(isNaN(character)){
            if (character == character.toUpperCase() && isUppercase != true) {
            isUppercase = true
            } else{
            isUppercase = false
            }
        }

        if(isNumber == true && isUppercase == true){
            break;
        } else{
            i++
        }
        }

        if(isNumber == true && isUppercase == true){
            return null
        } else{
            return {
                "not valid": true
            };
        }
    }
}