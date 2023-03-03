const { GoogleSpreadsheet } = require('google-spreadsheet')
const { Command } = require('commander')
require('dotenv').config()
const credential = require(process.env.SPREADSHEET_CREDENTIAL_FILE)

const program = new Command()
program
  .option('-n, --sheetName <string>', '書き込み対象のシート名')

program.parse(process.argv)
const options = program.opts()
const sheetName = options.sheetName 
if (sheetName !== undefined) { 
  writeSpreadSheet(options.sheetName)
}

/**
 * スプレッドシートに書き込む
 * @param {string} sheetName 書き込むシート名
 */
async function writeSpreadSheet(sheetName) {
  // スプレッドシートIDでインスタンス化
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID)
  // JWT認証
  await doc.useServiceAccountAuth(credential)
  // スプレッドシートファイルのロード
  await doc.loadInfo()

  try {
    // 書き込みむシートを取得
    let sheet = doc.sheetsByTitle[sheetName]
    // 取得できなかった場合は、シートを新規作成
    if (sheet === undefined) {
      // テンプレートシートからコピーして作成
      sheet = doc.sheetsByTitle[process.env.DEFAULT_SHEET]
      sheet = await sheet.duplicate({ title: sheetName, index: 1 })
    }

    const today = new Date()
    const formattedToday = `${today.getFullYear()}/${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`

    // ヘッダーを読み込んでから、書き込み
    await sheet.loadHeaderRow(2)
    const row = {
      検査日: formattedToday,
      パフォーマンス: Math.floor(Math.random() * 100),
      ユーザー補助: Math.floor(Math.random() * 100),
      おすすめの方法: Math.floor(Math.random() * 100),
      SEO: Math.floor(Math.random() * 100),
      PWA: Math.floor(Math.random() * 100),
    }
    await sheet.addRow(row)

    console.log(row)
    console.log('done!')
  } catch (e) {
    console.log('error!')
    console.error(e)
  }
}