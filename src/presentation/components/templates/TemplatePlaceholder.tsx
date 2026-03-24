import React from "react";

export const TemplatePlaceholder = (): React.JSX.Element => {
  return (
    <div data-testid="template-placeholder" className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Template Placeholder</h1>
      <p className="text-muted-foreground">
        This is a dummy template to validate the full routing flow. Real
        templates will be implemented soon.
      </p>
    </div>
  );
};
