import { type Locale } from "@/infrastructure/i18n/config";
import { LocalizedLink } from "../LocalizedLink/LocalizedLink";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  locale: Locale;
}

export const TemplateCard = ({
  title,
  description,
  buttonText,
  href,
  locale,
}: Props) => {
  return (
    <Card data-testid="template-card-container" className="justify-between">
      <CardHeader data-testid="template-card-header">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter data-testid="template-card-footer" className="justify-center">
        <LocalizedLink href={href} locale={locale} className="w-full">
          <Button variant="default" className="w-full">
            {buttonText}
          </Button>
        </LocalizedLink>
      </CardFooter>
    </Card>
  );
};
