module.exports = {
    theme: {
      extend: {
       
      }
    },
    plugins: [
      function({ addUtilities }) {
        const newUtilities = {
          '.image-rendering-auto': {
            'image-rendering': 'auto',
          },
          '.image-rendering-crisp-edges': {
            'image-rendering': 'crisp-edges',
          },
          '.image-rendering-pixelated': {
            'image-rendering': 'pixelated',
          },
        }
  
        addUtilities(newUtilities, ['responsive', 'hover'])
      }
    ]
  }