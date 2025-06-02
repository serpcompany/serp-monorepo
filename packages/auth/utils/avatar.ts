interface AvatarOptions {
  identifier?: string;
  path?: string;
  type?: AvatarType;
}

type AvatarType = 'user' | 'team';

export function getAvatarUrl(options: AvatarOptions & { type: AvatarType }): string {
  const { identifier, path, type } = options;
  if (path)
    return path;
  return `https://api.dicebear.com/9.x/${type === 'user' ? 'thumbs' : 'glass'}/svg${identifier ? `?seed=${encodeURIComponent(identifier)}` : ''}`;
}
