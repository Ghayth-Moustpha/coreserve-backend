import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

  
  }

  // Login user
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return new UserResponseDto(user.id, user.name, user.email, token);

   
  }

  // Validate user from JWT
  async validateUser(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // Helper function to generate JWT token
  private generateToken(user: { id: number; email: string }) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }


}
