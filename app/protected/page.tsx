import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return data.claims;
}

export default async function ProtectedPage() {
  const claims = await UserDetails();
  const email = claims?.email || "メールなし";
  const userName = email.split("@")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 左側: プロフィール情報 */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
          {/* プロフィール画像 */}
          <div className="mb-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}"
              alt="プロフィール"
              className="w-full rounded-full border-2 border-gray-300"
            />
          </div>

          {/* ユーザー名 */}
          <h1 className="text-xl font-bold text-gray-900 mb-2">{userName}</h1>

          {/* メールアドレス */}
          <p className="text-sm text-gray-600 mb-4 break-words">{email}</p>

          {/* ログアウトボタン */}
          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>

        {/* 右側: メインコンテンツ */}
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            マイページへようこそ
          </h2>

          {/* ユーザー詳細情報 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              アカウント情報
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ユーザーID:</span>
                <span className="text-gray-900 font-mono text-sm">
                  {claims?.sub}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">メール:</span>
                <span className="text-gray-900">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">登録状態:</span>
                <span className="text-green-600 font-semibold">有効</span>
              </div>
            </div>
          </div>

          {/* 今後の追加機能 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              登録した書籍
            </h3>
            <p className="text-gray-600">
              今後ここに登録した書籍一覧が表示されます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}