module.exports = {
    presets: [
        [
            'next/babel',
            {
                'preset-react': {
                    runtime: 'automatic',
                    importSource: '@emotion/react'
                }
            }
        ]
    ],
    plugins: [
        '@emotion/babel-plugin',
        'import-directory',
        [
            'wildcard',
            {
                exts: ['js', 'es6', 'es', 'jsx', 'javascript']
            }
        ]
    ],
    env: {
        test: {
            plugins: ['istanbul']
        }
    }
  };
  