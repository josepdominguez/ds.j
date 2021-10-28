const Fs = require('fs')
const Path = require('path')
const Sass = require('node-sass')

const getComponents = () => {
    let allComponents = []

    const types = ['atoms', 'molecules', 'organisms']

    types.forEach(type => {
        const allFiles = Fs.readdirSync(`src/${type}`).map(file => Path.resolve(file))
    })

    allComponents = [
        ...allComponents,
        ...allFiles
    ]
}

const compile = (path, fileName) => {
    Sass.renderSync({
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

console.log(getComponents)
