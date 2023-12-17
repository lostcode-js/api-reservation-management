/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{vue,html,js}", "index.html"],
    darkMode: "class",
    theme: {
        extend: {
            maxHeight: {
                '0': '0',
                xl: '36rem',
            },
            colors: {
                'primary-color': '#002776', //blue option: #172554
                'second-color': '#EAB308', //yellow
                'third-color': '#ca8a04', //darkYellow
                'fourth-color': '#009c3b', //green
                'fifth-color': '#008249', //darkGreen
                'sixth-color': '#00b84e', // lightGreen
                button: {
                    cta: '#fff',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        function ({ addVariant }) {
            addVariant("initial", "html :where(&)");
          }
    ]
}