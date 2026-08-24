import './color2PeopleMemory.css'

const MEMORY_ID = 'color2-people-memory'

function createMemorySection() {
  const section = document.createElement('section')
  section.id = MEMORY_ID
  section.className = 'color2-people-memory'
  section.setAttribute('aria-labelledby', `${MEMORY_ID}-title`)
  section.innerHTML = `
    <div class="color2-people-memory__heading">
      <div>
        <span>PERSON / THEORY</span>
        <h2 id="${MEMORY_ID}-title">人物で固定する</h2>
      </div>
      <p>人名・国・理論を一対一で覚えるための補助メモ。</p>
    </div>

    <div class="color2-people-memory__list">
      <article>
        <div class="color2-people-memory__name">
          <strong>A.H. マンセル</strong>
          <span>アメリカ</span>
        </div>
        <p><b>マンセル表色系</b>を考案したアメリカの画家・美術教育者。色相・明度・彩度の三属性で物体色を整理する。</p>
      </article>

      <article>
        <div class="color2-people-memory__name">
          <strong>ヤング ＋ ヘルムホルツ</strong>
          <span>イギリス ＋ ドイツ</span>
        </div>
        <p><b>三色説</b>。ヤングはイギリス人、ヘルムホルツはドイツ人。3種類の受容系で色覚を説明する考え方。</p>
      </article>

      <article>
        <div class="color2-people-memory__name">
          <strong>S・M・L錐体</strong>
          <span>人名ではない</span>
        </div>
        <p><b>S = Short / M = Medium / L = Long</b>。短・中・長波長側に感度のピークをもつ3タイプの錐体で、三色説に対応する現代的な整理。</p>
      </article>
    </div>

    <p class="color2-people-memory__mnemonic">暗記：マンセル＝米 / ヤング＝英 / ヘルムホルツ＝独 / SML＝Short・Medium・Long</p>
  `
  return section
}

function injectPeopleMemory() {
  const screen = document.querySelector('.color2-reference-screen')
  if (!screen || screen.querySelector(`#${MEMORY_ID}`)) return

  const section = createMemorySection()
  const library = screen.querySelector('.color2-reference-library')

  if (library) library.before(section)
  else screen.append(section)
}

let scheduled = false
function scheduleInjection() {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => {
    scheduled = false
    injectPeopleMemory()
  })
}

scheduleInjection()

const root = document.querySelector('#root')
if (root) {
  const observer = new MutationObserver(scheduleInjection)
  observer.observe(root, { childList: true, subtree: true })
}
