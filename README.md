# 技術

- vue.js
- typescript
- laravel

# アプリ概要

スポーツ走行時の G を可視化 or 音声出力して車を操る手助けをするアプリ

## リンク

https://gvisual.homisoftware.net/lp/ja  
https://twitter.com/homing_fd2/status/1521749005360779265?s=20&t=qpOtG8M4-zggtwA0-cncgw
https://twitter.com/homing_fd2/status/1570358896711315456

## 動作環境

iphone(safari, chrome)
android(chrome)

## できる事

G の可視化  
G の音声出力  
G のベクトル回転

## G インジケーター

|                                                                                                                   |                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/72111956/167336480-bb207c66-b289-4197-ba51-4dda7eed0a04.png"> | <img src="https://user-images.githubusercontent.com/72111956/167336769-50288979-6ccf-4dd5-a106-bdcc471ab45d.png"> |

## G ボール

|                                                                                                                   |                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/72111956/167336420-ae7cfb1f-8ceb-4c2b-a7c2-2d58dfcc6bda.png"> | <img src="https://user-images.githubusercontent.com/72111956/166639455-31419185-d52c-4d17-a530-b067ab87962c.PNG"> |

## キャリブレーション

|                                                                                                                   |                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/72111956/166639071-71d8d948-bf4d-42ac-9812-a2ea3610f11d.PNG"> | <img src="https://user-images.githubusercontent.com/72111956/166639066-5c035886-1728-474b-aaf3-951096c15134.PNG"> |

## デモ
https://www.youtube.com/watch?v=_0PG_Q7EbHo&ab_channel=%E3%81%BB%E3%81%BFcar%2Fpuyopuyo%2Fprogram

## 環境構築

### php コンテナ内で実行

```sh
./setup.sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
php artisan migrate:refresh --seed
npm run prod
php artisan serve --host 0.0.0.0:8000
```

### フロントエンド側のコード

https://github.com/ritogk/g-visualization/tree/main/project/resources/ts
