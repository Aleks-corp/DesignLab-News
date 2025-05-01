import {
  IsString,
  IsUrl,
  IsArray,
  IsOptional,
  IsDateString,
  IsIn,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  sourceUrl: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsIn(['raw', 'underreview', 'approved', 'declined'])
  status?: 'raw' | 'underreview' | 'approved' | 'declined';
}
