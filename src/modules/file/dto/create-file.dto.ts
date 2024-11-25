import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsBoolean()
  public?: boolean;

  @IsOptional()
  @IsBoolean()
  temp?: boolean;
}
