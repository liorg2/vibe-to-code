// Minimal typing for webpack's require.context, which Remotion's bundler supports natively.
// Root.tsx uses it to auto-register every file in src/videos without a types package.
declare const require: {
  context(directory: string, useSubdirectories?: boolean, regExp?: RegExp): {
    keys(): string[];
    (id: string): unknown;
  };
};
