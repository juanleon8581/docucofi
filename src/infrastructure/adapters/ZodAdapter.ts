import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Resolver } from "react-hook-form";
import * as z from "zod";

export class ValidationAdapter {
  static getResolver<T extends FieldValues>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: any,
  ): Resolver<T> {
    return zodResolver(schema);
  }

  static string(requiredMessage?: string) {
    let schema = z.string();
    if (requiredMessage) {
      schema = schema.min(1, { message: requiredMessage });
    }
    return schema;
  }

  static email(invalidMessage?: string, requiredMessage?: string) {
    let schema = z.string();
    if (requiredMessage) {
      schema = schema.min(1, { message: requiredMessage });
    }
    return invalidMessage
      ? schema.email({ message: invalidMessage })
      : schema.email();
  }

  static object<T extends z.ZodRawShape>(shape: T) {
    return z.object(shape);
  }

  static boolean() {
    return z.boolean();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferValidationType<T extends z.ZodType<any, any, any>> =
  z.infer<T>;
