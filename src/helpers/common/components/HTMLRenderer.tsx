import parseHtmlStringToHtml, { domToReact } from 'html-react-parser';
import Link from 'next/link';
import styles from './richtext/jodit.module.css';
import { useMemo } from 'react';

export const HTMLRenderer = ({ htmlString }: { htmlString: string }) => {
  // Check if htmlString is a valid string, otherwise default to empty string
  const safeHtmlString = typeof htmlString === 'string' ? htmlString : '';

  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(safeHtmlString, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      replace: (domNode: any) => {
        if (domNode.attribs && domNode.attribs.href && domNode.name === 'a') {
          return <Link href={domNode.attribs.href}>{domToReact(domNode.children)}</Link>;
        } else if (domNode.name === 'script') {
          return <></>; // Prevent script execution
        }
      },
    });
  }, [safeHtmlString]);

  return <div className={`${styles.richtextRuntimeWrapper} text-xs`}>{parsedElement}</div>;
};
