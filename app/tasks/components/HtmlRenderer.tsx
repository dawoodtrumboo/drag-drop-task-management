import React from "react";
import DOMPurify from "dompurify";

const HtmlRenderer = ({ htmlString }) => {
  // Sanitize the HTML string
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      className="html-rederer"
    />
  );
};

export default HtmlRenderer;
