# 株式会社 WITH HOLDINGS — Corporate Website

ブランドコピー： **今の選択を、未来の価値へ。**
ブランドテーマ： **今が未来と手をつなぐ**

静的なHTML/CSS/JS のコーポレートサイトです。ビルド工程はありません。
GitHub Pages, Netlify, Vercel, Cloudflare Pages などの静的ホスティングにそのまま公開できます。

---

## ページ構成

| URL | ファイル | 内容 |
|---|---|---|
| `/` | `index.html` | TOP（HERO・BUSINESS・CONTACT） |
| `/company.html` | `company.html` | 会社概要・代表メッセージ・理念 |
| `/contact.html` | `contact.html` | お問い合わせフォーム |
| `/privacy.html` | `privacy.html` | プライバシーポリシー |
| `/terms.html` | `terms.html` | サイトポリシー |
| `/cookie.html` | `cookie.html` | Cookieポリシー |
| `/anti-social.html` | `anti-social.html` | 反社会的勢力排除に関する基本方針 |
| `/security.html` | `security.html` | 情報セキュリティ基本方針 |
| `/social-media.html` | `social-media.html` | ソーシャルメディアポリシー |
| `/accessibility.html` | `accessibility.html` | ウェブアクセシビリティ方針 |
| `/loading.html` | `loading.html` | ローディングアニメーション |
| `/404.html` | `404.html` | 404 ページ |
| `/500.html` | `500.html` | 500 ページ |

`contact.html` は URL クエリ `?type=general | press | career | partnership | other` で種別が自動選択されます。

---

## ローカルでの確認

```bash
# 任意のローカルサーバで配信
npx serve .
# または
python3 -m http.server 8080
```

---

## GitHub Pages での公開

1. リポジトリにこの一式を push
2. GitHub の **Settings → Pages**
3. **Source: Deploy from a branch**
4. **Branch: `main` / `(root)`** を選択して Save
5. 数分後、`https://<USER>.github.io/<REPO>/` で公開されます

### 独自ドメインを当てる場合

リポジトリ直下に `CNAME` ファイルを作り、独自ドメインを 1 行で記述。
DNS 側は CNAME レコードで `<USER>.github.io` を指す。

---

## ディレクトリ

```
.
├── index.html               TOP
├── company.html             会社概要
├── contact.html             お問い合わせ
├── privacy.html             プライバシーポリシー
├── terms.html               サイトポリシー
├── cookie.html              Cookieポリシー
├── anti-social.html         反社会的勢力排除に関する基本方針
├── security.html            情報セキュリティ基本方針
├── social-media.html        ソーシャルメディアポリシー
├── accessibility.html       ウェブアクセシビリティ方針
├── loading.html             ローディング演出
├── 404.html                 404
├── 500.html                 500
├── README.md
└── assets/
    ├── whd-cursor.js              カスタムカーソル
    ├── with-holdings-logo*.png    ロゴ
    ├── hero-forest.jpg            HERO 背景
    ├── dawn-forest.png            CONTACT 背景
    ├── philosophy-water.jpg       理念背景
    ├── biz-*.png                  事業カード画像
    └── ...
```

---

## ブランドルール

- 主色：深緑 `#0F3D34`
- アクセント：ゴールド `#D4A24A`
- 背景：ペーパー `#FAFAF7` / クリーム `#F2F4F3`
- 見出し：Noto Serif JP
- 本文：Noto Sans JP

---

## ライセンス

© WITH HOLDINGS Inc. All rights reserved.
