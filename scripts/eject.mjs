import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { deleteFile, loadFileData } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __rootDir = dirname(__dirname)

const command = process.argv[2]
if (!command) {
    console.error('No command provided')
    console.error('Usage: npm run eject <command>')
    process.exit(1)
}
console.log(`Running command: ${command}`)

if (['tw', 'tailwind'].includes(command)) {
    deleteFile('./tailwind.config.js')
    deleteFile('./postcss.config.js')
    const editorCss = `${__rootDir}/src/editor/editor.css`
    const frontCss = `${__rootDir}/src/front/style.css`
    const editorData = loadFileData(editorCss).replace(
        /(@tailwind|--tw).*\n/g,
        '',
    )
    fs.writeFileSync(editorCss, editorData)
    const frontData = loadFileData(frontCss)
        .replace(/\/* --tw-ring-color: you-may-want-to-update-this; *\/\n/, '')
        .replace(/(@tailwind|--tw).*\n/g, '')
    fs.writeFileSync(frontCss, frontData)
    console.log('Removed Tailwind files and config.')
    process.exit(0)
}
