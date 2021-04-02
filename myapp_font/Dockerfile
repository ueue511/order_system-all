# nodeよりvue-cil作成 ※公式でないため
FROM node:14.16.0-alpine AS build-stage

# 作業用ディレクタ
WORKDIR /usr/src/app

# `package.json` と `package-lock.json` をコピーする
COPY package*.json ./

# プロジェクト依存のライブラリーをインストール
RUN yarn install

# プロジェクトファイルのコピー
COPY . .

# 本番向けに圧縮しながらアプリケーションをビルド化
RUN yarn run build

########
# 開発 #
########
# alpine-linuxにvue/cliをインストール
# RUN apk update \ 
#   && npm install -g @vue/cli


# 立ち上げ後、ローカルサーバ起動
# ENTRYPOINT ["yarn", "serve"]

########
# 本番 #
########
FROM nginx:1.17.4-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /usr/src/app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]