import { IsBoolean } from 'class-validator';

export class UpdateFileTempStatusDto {
  @IsBoolean()
  temp: boolean;
}
