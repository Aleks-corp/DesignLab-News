import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  sourceUrl: string;

  @Prop()
  imageUrl?: string;

  @Prop({ type: [String] })
  categories?: string[];

  @Prop()
  author?: string;

  @Prop()
  source?: string;

  @Prop()
  publishedAt?: Date;

  @Prop({
    enum: ['raw', 'underreview', 'approved', 'declined'],
    default: 'raw',
  })
  status: 'raw' | 'underreview' | 'approved' | 'declined';

  @Prop({
    type: {
      title: String,
      content: String,
    },
    required: false,
  })
  original?: {
    title: string;
    content: string;
  };
}

export type ArticleDocument = Article & Document;
export const ArticleSchema = SchemaFactory.createForClass(Article);
