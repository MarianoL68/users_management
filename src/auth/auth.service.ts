import { HttpException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { hash, compare } from 'bcrypt';
import { UserModel } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>
  ) {}

  async register(userObject: RegisterUserDto) {
    const { password } = userObject;

    //Encriptar la contraseña
    const plainToHash = await hash(password, 10);

    //registrar/crear usuario
    const newUser = this.userRepository.create({
      ...userObject,
      password: plainToHash,
    });

    //guardar el usuario en la bd
    return this.userRepository.save(newUser);
  }
  
  async login(userObject: LoginUserDto) {
    const {email, password} = userObject;

    //verifica si el usuario existe
    const findUser = await this.userRepository.findOne({where: {email}});

    //si no existe se lanza error
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    //se compara la contraseña hasehada con la ingresada
    const checkPassword = await compare(password, findUser.password);

    //si no coinicide se lanza error
    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

    const data = findUser;

    return data;
  }
}
