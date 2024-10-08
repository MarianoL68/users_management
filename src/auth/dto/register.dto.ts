import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsEmail() 
    @IsNotEmpty()  
    email: string;

    @IsNotEmpty() 
    @IsString() 
    @MinLength(8)
    password: string;

    @IsString() 
    @IsNotEmpty() 
    firstName: string;

    @IsString()  
    @IsNotEmpty()  
    lastName: string;
}
