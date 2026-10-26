# Chrome Web Store Listing: Comic Sans SM

Chrome Web Store公開用メタデータおよび掲載情報です。
本拡張機能は **英語（デフォルト / プライマリ言語）** と **日本語** の2言語で公開します。

### ストア申請用 URL
- **Store URL**: `https://chromewebstore.google.com/detail/fontcomicsanssm/jcklbddlopaaifbclbebocgopndihjhi`
- **Homepage URL**: `https://teacola.github.io/fontComicSansSM/`
- **Privacy Policy URL**: `https://teacola.github.io/fontComicSansSM/#privacy`
- **Repository URL**: `https://github.com/TEACOLA/fontComicSansSM`

---

## 1. 英語（English - Default Language）

### Basic Info
- **Name**: `Comic Sans SM`
- **Short Description** (108/132 chars):
  ```text
  A quiet reminder not to take social media too seriously. Replaces fonts on X and YouTube with Comic Sans MS.
  ```
- **Category**: Lifestyle / Utilities (or Humor)
- **Version**: 3.1.0

### Detailed Description
```text
Social media was never meant to be taken this seriously.

In the physical world, handwritten notes carry emotional cues—frantic scribbles or erratic handwriting naturally tip you off that someone might not be in the best state of mind.
On social media, however, even the most unhinged rant is rendered in crisp, beautiful, and pristine typography. Elegant fonts lend an unearned illusion of sanity, intellect, and authority to words that deserve none of them.

"Comic Sans SM" quietly replaces the display font on X (Twitter) and YouTube with Comic Sans MS.

By replacing that polished facade with Comic Sans, the false authority is instantly stripped away. Words are brought back down to their true, modest weight—helping you take a step back, breathe a little easier, and view the internet with a lighter heart.

Key Features:
- Comic Sans MS Override:
  Replaces timeline posts and YouTube comments/titles with Comic Sans MS.
- Subtle Retro Effects:
  - 90s WordArt rainbow text (toned-down, retro web-safe palette)
  - Classic web links (classic blue #0000FF and visited purple #660099)
- Always On & Per-Site Toggles:
  Works right after installation. Easily toggle X or YouTube on or off anytime.
- Nostalgic Web-Safe UI:
  A compact popup inspired by 90s browsers, styled exclusively with 216 web-safe colors.
```

### Permissions Justification
- `storage`: Used to save user preferences (retro effect toggles and per-site enable/disable status) across sessions.
- `host_permissions` (`*://*.twitter.com/*`, `*://*.x.com/*`, `*://*.youtube.com/*`): Used solely to inject CSS styles to override fonts on the supported web pages. No personal information or browsing history is collected or transmitted.

### Privacy & Data Use
- This extension does not collect, track, or transmit any user data, browsing history, or keystrokes.
- All styling and settings are handled entirely locally within the browser.

---

## 2. 日本語（Japanese）

### 基本情報
- **拡張機能名**: `Comic Sans SM`
- **短い説明** (58/132文字):
  ```text
  ソーシャルメディアを真面目に読みすぎないための拡張機能。XやYouTubeのフォントをComic Sansに置き換えます
  ```
- **カテゴリ**: ライフスタイル / ユーティリティ

### 詳細説明
```text
ソーシャルメディアなんて、そんなに真面目に読む物でもないはずです。

手書きの文字であれば、筆跡の乱れや殴り書きから「この人は今ちょっと精神的に危うい状態なのかもしれない」と察して距離を取ることができます。
しかしソーシャルメディアでは、どんなに偏った言葉や危うい主張であっても、デザイナーが作った美しく洗練されたシステムフォントで均等にタイポグラフィされてしまいます。そのせいで、本来なら真に受ける必要のない言葉まで、まるで理知的で重みのある意見であるかのように錯覚してしまうのです。

「Comic Sans SM」は、X（Twitter）やYouTubeの表示フォントを「Comic Sans MS」に置き換えます。

見慣れたタイムラインの文字がComic Sansになるだけで、フォントがまとっていた過剰な権威や化粧が剥ぎ取られ、言葉が持つ「本来の軽さ」が見えてきます。
SNSを深刻に捉えすぎず、気楽に付き合うための小さなデジタル・フィルターとしてお使いください。

主な機能:
- Comic Sans MS への置き換え:
  X（Twitter）のタイムラインやYouTubeのコメント欄・タイトルのフォントをComic Sans MSで表示します。
- レトロな装飾オプション:
  - ワードアート風 虹色テキスト（ダークトーンのWebセーフグラデーション 🌈）
  - クラシックWebリンク（未読は青 #0000FF ＋ 下線、既読は紫 #660099）
- 常時有効・サイト別切り替え:
  インストール後すぐに動作します。ポップアップからサイトごとのON/OFFも可能です。
- レトロな操作画面:
  Netscape Navigatorや初期のWindowsを思わせる、Webセーフカラーのみで構成されたシンプルなポップアップです。
```

### 権限の理由
- `storage`: 選択されたフォント設定やサイトごとの有効・無効フラグを同期・保存するために使用します。
- `host_permissions` (`*://*.twitter.com/*`, `*://*.x.com/*`, `*://*.youtube.com/*`): 指定されたSNSのWebページ上で、投稿テキストのフォントスタイルを適用するためにのみ使用します。個人情報の収集や外部送信は一切行いません。

### プライバシーとデータの取り扱い
- ユーザーの閲覧履歴、入力内容、個人データ等の収集・送信は一切行いません。
- すべての処理はブラウザ内で完結します。

---

## バージョン履歴 (Version History)
- **v3.1.0** (2026-10-26):
  - ポップアップ最下部に90年代風アクセスカウンターを追加（ゾロ目で点滅する演出付き）
  - プレビュー文言に「orz」を追加
- **v3.0.0** (2026-10-23):
  - 拡張機能の正式名称を「Comic Sans SM」へ刷新
  - YouTubeライブチャット（リアルタイムコメント）のComic Sansおよび虹色ワードアート表示に対応
- **v2.2.0** (2026-10-16):
  - 対象サイトをX（Twitter）とYouTubeに整理
  - 英語（デフォルト）および日本語の多言語公開対応
- **v2.1.0** (2026-10-16):
  - 対象サイトの調整
- **v2.0.0** (2026-10-16):
  - フォントをComic Sans MSに特化
  - アイコンおよびポップアップUIの刷新
  - 常時ON仕様への変更
- **v1.2.0** (2026-10-16):
  - クラシックWebリンク機能を追加
- **v1.1.0** (2026-10-16):
  - ワードアート風テキスト機能を追加
- **v1.0.0** (2026-10-15):
  - 初回リリース
