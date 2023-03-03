# sample_spreadsheets
スプレッドシートへの書き込み

```
yarn
yarn write -n [シート名]
```

## GCP上の操作
- Google Sheets APIを有効化する
- サービスアカウントを作成して、キーを発行する
  - credentialsフォルダに、ダウンロードしたJSONを移動

## スプレッドシート上の操作
- スプレッドシートの共有設定に、サービスアカウントを追加する

## プロジェクト上での操作
- .envファイルを修正
