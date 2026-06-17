declare module '*.css';
declare module '*.scss';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.avif';
declare module '*.webp';

interface ImportMeta {
  readonly env: Record<string, string>;
}
