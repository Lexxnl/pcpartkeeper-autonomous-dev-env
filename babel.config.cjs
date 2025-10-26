module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { 
      isTSX: true,
      allExtensions: true,
      allowDeclareFields: true
    }],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }],
        ['@babel/preset-typescript', { 
          isTSX: true,
          allExtensions: true,
          allowDeclareFields: true
        }],
      ],
    },
  },
};
