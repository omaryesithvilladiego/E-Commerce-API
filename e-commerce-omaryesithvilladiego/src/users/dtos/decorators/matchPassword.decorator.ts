import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name:'MatchValidator',
    async:false
})
export class MatchPassword implements ValidatorConstraintInterface {
    validate(password: any, args: ValidationArguments): boolean | Promise<boolean> {
    
            if(password !== (args.object as any)[args.constraints[0]]) return false
            return true
    }
    defaultMessage(args?: ValidationArguments): string {
        return 'Las contrasenas no coinciden'
    }
}