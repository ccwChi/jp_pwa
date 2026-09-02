import Link from 'next/link';

const features = [
  { num: '一', name: '文章閱讀', desc: '逐句假名注音與翻譯，附閱讀測驗與文法整理', href: '/reading', accent: 'ai' },
  { num: '二', name: '文法學習', desc: '依等級與分類系統整理文法點，附例句與練習題', href: '/grammar', accent: 'seal' },
  { num: '三', name: '分級測驗', desc: '依你的程度出題，附文法解析與進度', href: '/practice' },
  { num: '四', name: '個人筆記', desc: '收藏句子與文法，建立可複習的語感庫', href: '/notes', accent: 'good' },
  { num: '五', name: '文化背景', desc: '搞笑套路、地域差異、社會潛規則等小知識，補上語言之外的理解落差', href: '/culture', accent: 'good' },
  { num: '六', name: '歌詞解析', desc: '歌詞片段的文法拆解與聽力重點', soon: true },
  { num: '七', name: '情境聽力短劇', desc: '原創連載對話劇本，練生活情境與口語節奏（非動畫台詞）', soon: true },
];

export default function Home() {
  return (
    <main className="container">
      <div className="mark">NIHONGO JOURNEY</div>

      <div className="rows">
        {features.map(f => {
          const content = (
            <>
              <span className={`num${f.accent ? ` num-${f.accent}` : ''}`}>{f.num}</span>
              <div>
                <div className="name">{f.name}</div>
                <div className="desc">{f.desc}</div>
              </div>
              {f.soon && <span className="tag">規劃中</span>}
            </>
          );

          return f.href ? (
            <Link href={f.href} className="row" key={f.name}>
              {content}
            </Link>
          ) : (
            <div className={`row${f.soon ? ' soon' : ''}`} key={f.name}>
              {content}
            </div>
          );
        })}
      </div>
    </main>
  );
}
