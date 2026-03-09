# Issue #1: Google Font の日本語フォント対応

## 方針

- 日本語フォントは Google Fonts から動的ロード
- 既存の英語フォント選択とは独立した日本語フォントセレクターを追加
- `fontFamily` を `"{en-font}, {ja-font}, monospace"` に変更
- 日本語サンプルテキストも追加

## Sub-issues

| # | タイトル | 概要 |
|---|---------|------|
| S1 | 日本語フォントデータと Google Fonts ローダー | `ja-fonts.json` 作成、`<link>` タグ動的挿入で Google Fonts CSS をロード |
| S2 | 日本語フォントセレクター UI | サイドバーに日本語フォント用ドロップダウンを追加 |
| S3 | フォント組み合わせロジックと状態永続化 | `selectFont()` を拡張し en + ja を結合。Cookie で ja 選択を保存 |
| S4 | 日本語サンプルテキスト | Language モジュールに日本語コメント付きサンプルを追加 |

## 依存関係

```
S1 → S2 → S3 （順次）
S4 （独立、並列可）
```

## 対象候補フォント

- BIZ UDGothic
- BIZ UDMincho
- Noto Sans JP
- Noto Sans Mono (日本語対応)
- M PLUS 1 Code
- M PLUS 2
- Kosugi Maru
- Sawarabi Gothic
- Zen Kaku Gothic New
