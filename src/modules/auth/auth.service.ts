import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    const { email, password, name } = registerUserDto;

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new UnauthorizedException('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user.id, user.email),
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: this.generateToken(user.id, user.email),
    };
  }

  private generateToken(userId: number, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }
}
