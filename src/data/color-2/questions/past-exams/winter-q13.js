import { defineWinterGroup } from './utils.js'

export const wq13 = defineWinterGroup({
  "number": 13,
  "questionPage": 41,
  "answerPage": 67,
  "defaultPoints": 1,
  "caution": "オーソドックスとエレガントの形態・素材・基調色・アクセント色を対応づける。",
  "items": [
    {"part":"A","prompt":"インテリアスタイルのオーソドックスに当てはまる説明はどれか。","choices":["落ち着きのある中立的な","西洋風の伝統様式","シャープでクール","重厚で様式的"],"correctIndex":0,"explanation":"オーソドックスは落ち着きのある中立的なスタイルである。"},
    {"part":"B","prompt":"オーソドックスの床材として適切なものはどれか。","choices":["明るいフローリング","暖色系の堅い木材","無彩色タイル","低・中明度のフローリングやカーペット"],"correctIndex":3,"explanation":"床は低〜中明度のフローリングやカーペットで落ち着かせる。"},
    {"part":"C","prompt":"オーソドックスの建具・家具・窓まわりに適する色はどれか。","choices":["中明度・中彩度の寒色","ブラウンやベージュ系の低彩度トーン","床と明度差のある無彩色","高彩度の橙や緑"],"correctIndex":1,"explanation":"ブラウン・ベージュ系の低彩度色が適する。"},
    {"part":"D","prompt":"エレガントの形態的特徴はどれか。","choices":["優雅な曲線","直線的でシャープ","重厚で様式的","直線的でシンプル"],"correctIndex":0,"explanation":"エレガントは優雅な曲線と上品で繊細な装飾が特徴である。"},
    {"part":"E","prompt":"エレガントの主な基調色として適切なものはどれか。","choices":["高・中彩度の暖色","明度差のある無彩色","高明度のベージュ","グレイッシュな低彩度色"],"correctIndex":3,"explanation":"グレイッシュな低彩度色を主体に上品にまとめる。"},
    {"part":"F","prompt":"エレガントのアクセントカラーとして効果的な色相範囲はどれか。","choices":["GY〜G","PB〜P","RP〜R","YR〜Y"],"correctIndex":2,"explanation":"RP〜R系の色をアクセントとして使うと効果的である。"}
  ]
})
