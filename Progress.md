# Progress.md - Book App プロジェクト進捗書

## プロジェクト概要
このプロジェクトは Next.js と Supabase を使用したユーザー認証機能付きの書籍アプリケーションです。
主な機能はユーザー登録、ログイン、パスワード忘却、マイページ表示などです。

## 環境構成
- フレームワーク: Next.js 16.2.1
- 言語: TypeScript (97.3%)
- スタイル: Tailwind CSS
- データベース: Supabase
- 認証: Supabase Auth

## 初期セットアップ
1. プロジェクトをダウンロード
   git clone https://github.com/shatrssr/book-app.git
   cd book-app

2. 依存パッケージをインストール
   npm install

3. 環境変数を設定
   .env.local ファイルを作成し、以下を入力:
   NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_KEY
   
   Supabase ダッシュボードの Settings → API から値を取得できます。

4. 開発サーバーを起動
   npm run dev
   
   ブラウザで http://localhost:3000 にアクセスするとアプリが表示されます。

## 発生した問題と対応

### 問題1: 最初のトップページがデモ画面で見づらかった
内容: Supabase テンプレートのデフォルトページがチュートリアルメッセージで埋まっていた
対応: app/page.tsx を編集し、シンプルなウェルカムページに変更しました

### 問題2: トップページ変更後、Sign in/Sign up リンクがなくなった
内容: 全コード置換時にナビゲーションリンクが削除されてしまった
対応: app/page.tsx に以下のリンクを追加しました:
  <Link href="/auth/sign-up">Sign Up</Link>
  <Link href="/auth/login">Sign In</Link>

### 問題3: Hydration mismatch エラーがコンソール表示された
内容: ブラウザ拡張機能(Grammarly など)が HTML 属性を追加したため、サーバー側とクライアント側の HTML が不一致だった
対応: app/layout.tsx の <body> タグに suppressHydrationWarning を追加

### 問題4: ログイン後、/protected ページへの画面遷移が実行されない
内容: ログイン処理は成功しているが、ページ遷移が即座に実行されず、セッション情報が未確立のままマイページにアクセスしようとしていた
原因: Supabase のセッション確立に時間がかかるため、router.push が早すぎるタイミングで実行されていた

対応: components/login-form.tsx の handleLogin 関数を修正

**修正内容:**
- FormEvent の型を React.FormEvent<HTMLFormElement> に修正
- setTimeout を 500ms → 2000ms に増加させ、セッション確立を待つ時間を長くした
- router.refresh() を追加してセッション情報を更新

**修正後のコード:**
```typescript
const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const supabase = createClient();
  setIsLoading(true);
  setError(null);

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    console.log("ログイン成功、ページ遷移中...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    router.push("/protected");
    router.refresh();
    
  } catch (error: unknown) {
    setError(error instanceof Error ? error.message : "An error occurred");
  } finally {
    setIsLoading(false);
  }
};
問題5: WebSocket 接続エラーがコンソール表示
内容: WebSocket connection to 'ws://172.21.100.36:3000/_next/webpack-hmr?id=...' failed 原因: これはネットワークアドレスでアクセ���した場合の HMR(Hot Module Reload)接続エラーで、開発環境の警告 対応: 不要な警告なので無視してOK。localhost:3000 でアクセスする場合は表示されません。

実装済み機能
トップページ(カスタマイズ版): ウェルカムメッセージと Sign Up/Sign In ボタン
ユーザー登録: /auth/sign-up で新規ユーザーを登録できる
ログイン: /auth/login でユーザーがログインできる
マイページ: /protected でログイン後のユーザー情報を表示
パスワード忘却: ログインページから "Forgot your password?" で reset リンクに移動
ログアウト: マイページ上部の AuthButton でログアウト可能
今後の作業
ページ遷移の安定性を確認(現在修正中)
マイページのデザイン改善
エラーハンドリングの充実
テストユーザーでの動作確認
本番デプロイ準備
ファイル構造
Code
app/
  page.tsx: トップページ(カスタマイズ版)
  layout.tsx: ルートレイアウト
  auth/
    login/: ログインページ
    sign-up/: ユーザー登録ページ
    forgot-password/: パスワードリセット
  protected/
    page.tsx: マイページ(認証が必要)
    layout.tsx: マイページレイアウト

components/
  login-form.tsx: ログインフォーム(修正完了)
  sign-up-form.tsx: 登録フォーム
  forgot-password-form.tsx: パスワードリセットフォーム
  logout-button.tsx: ログアウトボタン
  auth-button.tsx: 認証状態に応じた表示
手動でファイル修正する方法
VSCode でファイルを開く
Ctrl+F (Mac: Cmd+F) で検索ボックスを開く
探したいキーワード(例: router.push)を入力してEnter
該当箇所がハイライトされるので、該当部分を確認して修正する
Ctrl+H で置換ボックスを開くと、一括置換も可能
コマンドラインで確認できる主要なコマンド
npm run dev: 開発サーバー起動
npm run build: ビルド実行
npm run start: 本番サーバー起動
npm run lint: ESLint で静的解析実行
ブラウザでの確認方法
開発中は以下の2つのURLでアクセス可能:

http://localhost:3000: ローカルからのアクセス(推奨)
http://172.21.100.36:3000: ネットワークから他のデバイスでアクセスする場合
ログインテスト
http://localhost:3000 にアクセス
"Sign Up" ボタンをクリック
メールアドレスとパスワードで登録
"Sign In" ボタンをクリック
登録したメールアドレスとパスワードでログイン
2秒待機後、/protected ページに移動してマイページが表示される
今後の修正や機能追加の際の注意点
React.FormEvent は型を明確に指定する(React.FormEvent<HTMLFormElement>推奨)
非推奨機能は IDE の警告に従って最新の方法に置き換える
Supabase のセッション確立に時間がかかるため、ページ遷移前に待機時間を設ける
ローカル開発時と WebSocket HMR エラーは別問題なので混同しない
