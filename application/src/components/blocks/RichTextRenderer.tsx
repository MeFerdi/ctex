interface PortableTextBlock {
  _type: string;
  children?: Array<{
    _type: string;
    text: string;
    marks?: string[];
  }>;
}

interface RichTextRendererProps {
  content: PortableTextBlock[];
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {content.map((block, blockIndex) => {
        if (block._type === 'block' && block.children) {
          const hasStrongMark = block.children.some((child) => 
            child.marks?.includes('strong')
          );

          // Check if this is a heading (strong mark) or regular paragraph
          const Element = hasStrongMark ? 'h3' : 'p';
          const className = hasStrongMark 
            ? 'text-xl font-semibold text-foreground mt-8 mb-4 first:mt-0' 
            : 'text-muted-foreground mb-4 leading-relaxed';

          return (
            <Element key={blockIndex} className={className}>
              {block.children.map((child, childIndex) => {
                const isStrong = child.marks?.includes('strong');
                const isEm = child.marks?.includes('em');

                let content = child.text;
                
                if (isStrong && isEm) {
                  return <strong key={childIndex}><em>{content}</em></strong>;
                }
                if (isStrong) {
                  return <strong key={childIndex}>{content}</strong>;
                }
                if (isEm) {
                  return <em key={childIndex}>{content}</em>;
                }
                
                return <span key={childIndex}>{content}</span>;
              })}
            </Element>
          );
        }

        return null;
      })}
    </div>
  );
}
