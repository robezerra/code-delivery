import { Schema, raw, Prop, SchemaFactory } from '@nestjs/mongoose';

export type RouteDocument = Route & Document;

@Schema()
export class Route {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop(
    raw({
      lat: { type: Number },
      lng: { type: Number },
    }),
  )
  startPosition: {
    lat: number;
    lng: number;
  };

  @Prop(
    raw({
      lat: { type: Number },
      lng: { type: Number },
    }),
  )
  endPosition: {
    lat: number;
    lng: number;
  };
}

export const RouteSchema = SchemaFactory.createForClass(Route);
