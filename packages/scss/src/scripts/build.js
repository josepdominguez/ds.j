const Fs = require('fs')
const Path = require('path')
const Sass = require('node-sass')
const { compileFunction } = require('vm')

const getComponents = () => {
    let allComponents = []

    const types = ['atoms', 'molecules', 'organisms']

    types.forEach(type => {
        const allFiles = Fs.readdirSync(`src/${type}`).map(file => ({
            input: `src/${type}/${file}`,
            output: `src/lib/${file.slice(0, -4) + 'css'}`
        }))
        allComponents = [
            ...allComponents,
            ...allFiles
        ]
    })

    return allComponents

    
}

const compile = (path, fileName) => {
    const result = Sass.renderSync({
        data: Fs.readFileSync(
            Path.resolve(path)
        ).toString(),
        outputStyle: 'expanded',
        includePaths: [Path.resolve('src')]
    })

    Fs.writeFileSync(
        Path.resolve(fileName),
        result.css.toString()
    )
}

compile('src/global.scss', 'src/lib/global.css')

console.log(getComponents())
getComponents().forEach(component => {
    compile(component.input, component.output)
})
