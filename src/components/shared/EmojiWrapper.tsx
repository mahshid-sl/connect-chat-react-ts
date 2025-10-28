import { catEmojis } from '@/data/catEmoji';

type EmojiWrapperProps = {
  text: string;
};

const EmojiWrapper = ({
  text,
  dir,
  className,
}: EmojiWrapperProps & { dir: 'ltr' | 'rtl'; className?: string }) => {
  const parts = text.split(/(\s+)/);

  return (
    <span
      className={`bg inline-flex flex-wrap items-center gap-1 ${className}`}
      dir={dir}
    >
      {parts.map((part, index) => {
        const cat = catEmojis.find((e) =>
          e.names.some((name) => name.toLowerCase() === part.toLowerCase()),
        );

        return cat ? (
          <img
            key={index}
            src={cat.imgUrl}
            alt={cat.names[0]}
            className="inline-block h-6 w-6 align-middle"
          />
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default EmojiWrapper;
