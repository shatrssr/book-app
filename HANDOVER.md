# プロジェクト概要
このプロジェクトは、書籍の管理アプリケーションです。ユーザーが書籍を追加、編集、削除できる機能を提供します。

# セットアップ手順
1. リポジトリをクローンします。
   ```bash
   git clone https://github.com/shatrssr/book-app.git
   ```
2. 依存関��をインストールします。
   ```bash
   cd book-app
   npm install
   ```
3. アプリケーションを起動します。
   ```bash
   npm start
   ```

# ファイル構造
```
book-app/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
└── package.json
```

# 実装機能
- 書籍の追加、編集、削除
- 書籍リストの表示
- 書籍の検索機能

# 現在の問題
- 書籍の削除機能が時々正常に動作しない。

# 解決策
- 状態管理を見直し、書籍削除後に状態を再レンダリングする。 

# 開発ガイド
1. 新しい機能を追加する場合は、`feature/新機能名`というブランチを作成して作業します。
2. コードの変更が完了したら、マージリクエストを作成してください。

# 参考文献
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)