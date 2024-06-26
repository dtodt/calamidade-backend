import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user-role.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate
} from 'class-validator';
import { UserStatus } from 'src/modules/user/entities/user-status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';

export class CreateUserSocialDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'Tony' })
  @IsNotEmpty()
  firstName: string | null;

  @ApiProperty({ example: 'Stark' })
  @IsNotEmpty()
  lastName: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'imageNotExists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: UserRole })
  @Validate(IsExist, ['UserRole', 'id'], {
    message: 'roleNotExists',
  })
  role?: UserRole | null;

  @ApiProperty({ type: UserStatus })
  @Validate(IsExist, ['UserStatus', 'id'], {
    message: 'statusNotExists',
  })
  status?: UserStatus;
  
  hash?: string | null;

}
