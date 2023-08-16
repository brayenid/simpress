const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const log = console.log

const args = process.argv.slice(2)

const src = 'src'
let outputImagePath = 'compressed'
let compressionQuality = 1200

// Mengelompokkan argumen berdasarkan format -flag value dalam objek kosong
const groupedArgs = {}
let currentFlag

args.map((arg) => {
  if (arg.startsWith('-')) {
    // Blok looping pertama mendeteksi apakah argument punya tanda -, jika iya maka jadikan iya properti dalam objek kosong tadi (groupedArgs)
    currentFlag = arg.slice(1)
    groupedArgs[currentFlag] = []
    // Loping berhenti di sini dengan object groupedArgs yang sudah berisi properti yang bertanda -, namun masih bernilai array kosong. Mis : {to : []}
  } else if (currentFlag) {
    // Blok ini dieksekusi jika current flag sudah diisi dengan properti yang memiliki tanda -, blok ini akan mengisi array kosong pada properti yang dihasilkan dari blok if sebelumnya. Mis : {to: ['compressed']}
    groupedArgs[currentFlag].push(arg)
  }
})

// Menentukan nilai argumen berdasarkan flag
if (groupedArgs.to) {
  outputImagePath = groupedArgs.to[0]
}
if (groupedArgs.size) {
  compressionQuality = parseInt(groupedArgs.size[0])
}

if (!fs.existsSync(outputImagePath)) {
  fs.mkdirSync(outputImagePath)
}

log(chalk.bold.bgMagentaBright(` Compressing (to: /${outputImagePath}, size: ${compressionQuality}) ... `))

fs.readdirSync(src).forEach((image, i) => {
  sharp(`${src}/${image}`)
    .resize(compressionQuality)
    .toFile(path.resolve(__dirname, `${outputImagePath}/${image}`), (err, info) => {
      if (err) {
        log(chalk.bgRed('Error : '), chalk.red(err))
        process.exit(1)
      } else {
        log(chalk.bold.bgGreenBright(' Image Compressed! '))
        process.exit(1)
      }
    })
})
