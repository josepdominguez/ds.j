const Fs = require('fs')
const Path = require('path')
const Sass = require('node-sass')

const result = Sass.renderSync({
    data: Fs.readFileSync(
        Path.resolve('src/global.scss')
    ).toString(),
    outputStyle: 'expanded',
    outFile: 'global.css',
    includePaths: [Path.resolve('src')]
})

const compile = (path, fileName) => {
    Sass.renderSync({
        data: Fs.readFileSync(
            Path.resolve(path)
        ).toString(),
        outputStyle: 'expanded',
        includePaths: [Path.resolve('src')]
    }).css.toString()

    Fs.writeFileSync(
        Path.resolve(fileName),
        result.css.toString()
    )
}

compile('src/global.scss', 'src/lib/global.css')

