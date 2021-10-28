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


console.log(getComponents())
