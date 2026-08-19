你是日文教材編輯，正在把一份重新排版的 JLPT N4~N2 歷屆真題 PDF（文字・語彙／聴解／読解・文法 三大節 + 最後幾頁的「参考答案」掃描表格），轉換成本專案的過去試題資料格式。請依照下面的完整流程執行，不要跳步驟。

## 前置：找檔案

到 `resources/past-exams/` 底下找：
- `*題+答+聽.pdf`（或類似命名）：題目、答案卡、聽力原文（部分年份聽力原文會缺失，見下方「已知陷阱」）
- `*聽.mp3`：整段聽力音檔
- 若資料夾裡還有 `*聽原文.doc`（舊版 Word 二進位格式）：這通常是聽力逐字稿的補充檔，PDF 本身聽力部分若標示「原文欠奉」就要靠這份 doc 補完整。

先把 PDF/mp3/doc 複製一份到 scratchpad（純英數路徑），因為原始資料夾路徑含中文全形括號，Bash/pdftotext 對這種路徑常會編碼錯誤。

## 第一步：抽取純文字（不是 OCR）

用 PyMuPDF（`pip install pymupdf`）逐頁 `page.get_text()` 輸出成一個 UTF-8 txt 檔（不要直接 print 到 Windows 終端機，cp950 編碼會炸掉中日文字元，一定要寫檔案再用 Read 工具讀）。這些 PDF 文字層是乾淨可選取的文字，不是掃描圖，所以 `get_text()` 會給出精確結果，不需要真的做圖像 OCR。`pdftotext` 在這幾份 PDF 上經常抽不出日文（字型編碼問題），不要浪費時間在它上面，直接用 PyMuPDF。

如果某段文字（常見於聴解もんだいII 或答案卡對照表）在 PDF 文字層直接寫「原文欠奉」，代表原始文件本身就沒收錄，這不是你的擷取失敗——去檢查資料夾裡有沒有 `.doc`／`.docx` 補充檔：
- `.docx` 用 python-docx 或直接當 zip 解壓讀 `word/document.xml`。
- 舊版二進位 `.doc` 在這個環境下用 `antiword -m UTF-8.txt 檔名.doc` 通常可以抽出正確的中日文（比 python-docx 更可靠，因為那些檔案不是 `.docx` 格式）。
若真的完全找不到任何補充來源，該題就整題標記 `needsReview: true`，`script`/`question`/`options` 留 `null`，並在 `reviewNote` 寫清楚「原始PDF該部分標示原文欠奉，需尋找更完整版本」，絕對不要自己編造聽力對話或選項內容。

## 第二步：抽取もんだいI 聽力圖片選項的原圖

もんだいI（絵を見ながらもんだいをきく）每題有一張圖，通常落在題目卷的 page 5 開始，一路到 page 14~15 左右（page 4 結尾會有「問（1）.」這種提示下一頁題號的殘留文字）。用 `page.get_images(full=True)` + `doc.extract_image(xref)` 把這些頁面裡的內嵌圖片存成 PNG。

已知陷阱：
- 有些年份一頁會塞兩題的圖（image 數量會多於題數），要用 `page.get_text()` 的內容去判斷這頁到底對應哪一題。
- 有些年份同一張圖會被重複置入兩個不同頁碼（byte-for-byte 完全相同，可以用 `md5sum` 檢查去重），這種要合併成同一題，不要當成兩題。
- 抽出來後務必用 Read 工具（多模態視覺）逐張實際看過，把圖片內容跟聽力逐字稿的情境交叉核對，確認頁面順序＝題號順序沒有跳號或錯位，同時順手寫一句 `imageDescription`（給看不到圖的情境當文字備援）。

## 第三步：讀答案卡（這一步才是「類OCR」）

PDF 最後幾頁的「参考答案」是掃描圖片，不是文字層，所以要用 `page.get_pixmap(dpi=400~600, clip=...)` 把答案卡裁成幾個可讀的區塊存 PNG，再用 Read 工具直接視覺讀出表格裡的數字（1~4）。不要整頁一次塞給自己看，日文小字表格解析度不夠會看錯，要分段裁切、必要時裁到 dpi 500~600 再看一次確認。

## 第四步：逐題交叉驗證（最重要，不能省略）

每一題都要拿「答案卡數字」對照「用日文語感自己推導出的正確答案」，兩者吻合才算過關。這樣做的理由：
- 答案卡本身偶爾會有印刷錯誤（例如某年「来ました」被答案卡誤標成「米ました」這種不存在的漢字）。
- 選項文字偶爾會重複或缺字（例如兩個選項印刷成完全一樣的字、或某個選項印成星號佔位符「＊」）。
- 答案卡的欄位分組有時跟題目卷的子題數對不上（需要自己算出正確的題數再對齊）。

只有在语意驗證後仍然自信滿滿時才直接採用；一旦發現印刷本身有問題（重複選項、缺字選項、漏印說話者標籤、缺空格位置等），該題要整題標記 `needsReview: true` + 具體 `reviewNote` 說明問題，並且**排除在題庫（bank）產出之外**，但仍保留在來源 JSON 裡（不要刪除，未來人工核對後可以修正重跑）。絕對不要為了「湊出一個答案」而自己捏造或悄悄修正題目，所有猜測性的修正都要留痕跡在 `reviewNote`。

## 第五步：組出來源 JSON

參考 `src/lib/past-exams/index.js` 開頭的 schema 註解，以及同目錄下既有的 `jlpt-n4-*.json` 當範例，寫一支 Python 腳本組出以下結構並用 `json.dump(exam, f, ensure_ascii=False, indent=2)` 寫檔：

```
{
  examId, year, level, sourceNote, sourcePdf,
  sections: [
    { sectionId: "vocabulary", title: "文字・語彙", points, minutes, problems: [...] },
    { sectionId: "listening", title: "聴解", points, minutes, audioUrl, notes, problems: [...] },
    { sectionId: "readingGrammar", title: "読解・文法", points, minutes, problems: [...] }
  ],
  openDecisions: [ ... ]
}
```

每個 `problem` 是 `{ problemId, instruction, type, items: [...] }`（もんだいV 這種有共用文章的額外帶 `passage`）。`type` 是 11 個固定值之一（`reading`／`kanji`／`fill-in-blank-vocab`／`paraphrase`／`listening-with-image-options`／`listening-text-only`／`particle-fill-in-blank`／`conjugation-fill-in-blank`／`dialogue-response`／`dialogue-cloze`／`reading-comprehension`），對照題目卷本身的もんだい類型去挑。`items` 每筆物件的欄位形狀依 `type` 不同，直接照抄同目錄既有 JSON 裡同類型的欄位名稱（`context`/`prompt`/`options`/`answerIndex`，或 `script`/`imageDescription`/`imageUrl`，或 `passage`/`question`，等等），不要自創新欄位名。

輸出路徑：`src/lib/past-exams/data/jlpt-n4-{年份}.json`。

## 第六步：搬運音檔與圖檔

```
public/exam-audio/jlpt-n4-{年份}/listening.mp3      ← 從 mp3 複製過來
public/exam-images/jlpt-n4-{年份}/lis-I-{N}.png     ← 第二步抽出的圖，按題號命名
```

JSON 裡 `listening-with-image-options` 每題的 `imageUrl` 欄位填對應的 `/exam-images/jlpt-n4-{年份}/lis-I-{N}.png`；`listening` 這個 section 的 `audioUrl` 欄位填 `/exam-audio/jlpt-n4-{年份}/listening.mp3`。

## 第七步：轉出練習題庫（bank）items

再寫一支 Python 腳本讀剛剛的 JSON，依照 `src/lib/practice/bank/index.js` 註解的欄位形狀，把每個「非 needsReview」的 item 轉成 bank item：

- `id`: `exam-{examId}-{item.id}`
- `pointIds: []`（過去試題不綁文法點）
- `level: "N4"`、`isPastExam: true`
- `examMeta: { examId, year, level, section: 題目卷上的節標題（例：聴解）, sourcePdf, sourceNote, questionNumber: item.id }`
- `section`（bank 頂層欄位，注意跟 `examMeta.section` 不是同一個東西）依 `type` 對照：`reading`/`kanji`/`fill-in-blank-vocab`/`paraphrase` → `"vocabulary"`；`listening-*` → `"listening"`；`reading-comprehension` → `"reading"`；其餘文法類型 → `"grammar"`
- 一般類型（非聽力）帶一個 `meaning: { prompt, options, answerIndex }`，`prompt` 依 type 組合（`reading`/`kanji` 是 `context + "\n\n" + prompt`；`dialogue-cloze`/`reading-comprehension`/`listening-text-only` 是「共用文章或逐字稿 + 該小題文字」）
- `listening-with-image-options`：帶 `script`/`imageDescription`/`imageUrl`/`audioUrl: null`，**除非有把握真的能可靠轉錄出圖片裡的文字選項，否則不要加 `meaning` 欄位**（沒有 `meaning` 的 item 不會出現在可作答的測驗畫面，只是保留素材）
- **絕對不要**幫 `posReviewed` 欄位賦值——這是留給 `/practice/tag` 工具事後人工標註用的，新資料要空著讓它自然進入待處理佇列

寫檔規則：讀取 `src/lib/practice/bank/data/N4-{type對應的檔名}.js` 現有內容，在陣列結尾 `\n];\n` 前插入新項目（用 2 空格縮排格式化成跟現有內容一致的 JS 物件字面量寫法），不要整檔覆寫。每個 `type` 對應的檔名可以直接看 `src/lib/practice/bank/data/` 底下現有的 `N4-*-01.js` 檔名清單對照。

## 第八步：補上 notes／optionExplanations

第七步轉出的 bank items 預設沒有 `notes`（單字／文法註解）跟 `optionExplanations`（逐選項解析）這兩個欄位——這兩個是選用的補充資料，但屬於新增題目時緊接著要做的步驟，不要轉完 bank items 就停手。完整規則見 `src/doc/bank-explanation-prompt.md`，這裡摘要跟這次解析流程特別相關的重點：

- `notes[].surface` 必須是該題 `meaning.prompt`（或聽力的 `script`）裡逐字出現的原始文字，包含原文實際寫的形式（假名/漢字）；找不到可逐字比對的日文原文（例如 `usage-choice` 這種 `prompt` 是純中文情境描述、日文只出現在 `options` 裡的類型）就跳過該題的 `notes`，不要為了湊欄位硬選一個對不上原文的片段。
- **不要只框「這題考的目標文法點」本身**：題目（`prompt`/`script`，選擇性也包含 `options`）裡只要出現了超出這份考卷等級、屬於更高等級（例如 N4 考卷裡出現 N3、N2 程度）的單字或文法，也要另外列一則 `notes`（`type: "vocab"` 或 `"grammar"`）加以說明，不能因為它不是這題的考點就跳過不管——對正在準備這個等級的學習者來說，讀懂題目本身用到的超綱字才是他真正卡住的地方。判斷等級可以憑教材經驗抓大概（常見生活詞彙、初階文法屬於該等級或以下；書面語、複雜句型、少用漢字詞通常偏高階），拿不準的話標保守一點、寧可多列一則。
- `optionExplanations` 陣列的順序、長度要跟 `meaning.options` 完全一致；正解要講清楚「為什麼是它」，錯的選項要講「為什麼跟題目語意/文法不合」，不要只是重複翻譯選項字面意思。
- 這次新解析的題目通常是同一個 `examId` 一次新增幾十題到同一個 bank 檔案，逐題用 Edit 工具手改效率太差、也容易漏改欄位順序。改用腳本化流程：寫一支 Node ESM 腳本 `import` 該 bank 檔案現有內容 → 在記憶體裡建一個 `{ id: { notes, opt } }` 的 mapping（人工逐題判斷、寫出正確的 notes/optionExplanations 內容） → 用 `JSON.stringify(newItems, null, 2)` 整個重新序列化寫回檔案。這個檔案格式本身就是 `JSON.stringify(items, null, 2)` 的輸出風格，所以重新序列化不會破壞既有排版或欄位順序（除了新插入的欄位本身）。**只新增 `notes`/`optionExplanations` 這兩個欄位，寫回時明確排除掉舊的 `notes`/`optionExplanations`（如果有）再重新賦值，避免腳本重跑時把新值又蓋回舊值。**
- 每次寫回檔案後都要驗證：
  1. Node `import()` 該檔案，檢查 `optionExplanations.length === meaning.options.length`、`notes` 存在的題目其 `surface` 都能在 `prompt` 裡 `.includes()` 找到。
  2. `git diff` 檢查改動範圍——正常應該只看到新增的 `notes`/`optionExplanations` 區塊（加上因為插入內容而位移的括號行），不該看到其他既有欄位的內容被改掉；如果看到不相關欄位也被改動（例如 `sourceNote` 文字被動到），要停下來查清楚原因，不要當作正常現象忽略。
  3. `npm run lint`，確認沒有新增 error。

## 第九步：驗證（每一步都要做，不能只做一部分）

1. 用 Node 逐一 `import()` 剛剛改過的每個 bank `.js` 檔，確認語法正確、印出 item 數量。
2. `grep -c "^{$"` 檢查有沒有縮排跑掉的物件（正常應該是 0，因為每個插入的物件開頭都應該帶 2 空格縮排）。
3. 用 Node 的 `JSON.parse` 讀一次剛寫出的 `jlpt-n4-{年份}.json`，確認語法正確。
4. `npm run lint`，確認沒有新增 error（既有的 `import/no-anonymous-default-export` warning 是舊有的，不用管）。
5. 啟動 `npm run dev`（**先確認 port 3000 沒有殘留的舊 dev server 在跑**，`netstat -ano | grep ":3000"` 有東西的話先 `taskkill //F //PID` 掉，不然新啟動的會跳到 3001 或連到舊的殘留伺服器），用 curl 打：
   - `/exam-audio/jlpt-n4-{年份}/listening.mp3` → 應該 200
   - `/exam-images/jlpt-n4-{年份}/lis-I-1.png`（跟最後一題）→ 應該 200
   - `/practice/exam/jlpt-n4-{年份}` → 應該 200
   驗證完務必把 dev server 關掉（找 port 3000 的 PID `taskkill //F //PID`），不要留著背景執行。

## 收尾

跟使用者回報：這次解析了幾題、有幾題因為原始文件本身的問題（不是你的擷取失敗）被標記 needsReview 排除在題庫外，並具體說明每個 needsReview 的原因；以及第八步幫幾題加上了 `notes`／`optionExplanations`、有幾題因為找不到可逐字比對的日文原文而跳過 notes。不要在沒有把握的地方悄悄「腦補」修正題目或編造解析內容——所有存疑之處都要留在 `reviewNote` 裡讓人工事後核對。
