import { format, parse, isValid } from "date-fns";
import { es } from "date-fns/locale";

const ISO_FORMAT = "yyyy-MM-dd";

export class DateAdapter {
  static toISOString(date: Date): string {
    return format(date, ISO_FORMAT);
  }

  static fromISOString(value: string): Date | null {
    if (!value) return null;
    const parsed = parse(value, ISO_FORMAT, new Date());
    return isValid(parsed) ? parsed : null;
  }

  static toISOStringMultiple(dates: Date[]): string {
    return dates.map((d) => DateAdapter.toISOString(d)).join(",");
  }

  static fromISOStringMultiple(value: string): Date[] {
    if (!value) return [];
    return value
      .split(",")
      .map((s) => DateAdapter.fromISOString(s.trim()))
      .filter((d): d is Date => d !== null);
  }

  static formatDisplay(date: Date): string {
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  }

  static formatDisplayFromString(value: string): string {
    const date = DateAdapter.fromISOString(value);
    if (!date) return "";
    return DateAdapter.formatDisplay(date);
  }
}
