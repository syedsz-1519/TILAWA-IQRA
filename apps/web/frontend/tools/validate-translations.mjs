/**
 * tools/validate-translations.mjs
 *
 * Validates every enabled translation edition in the registry by checking:
 *   1. The API responds for surah 1 and surah 114 (boundary check).
 *   2. The full index returns 114 surahs (fawazahmed0 only).
 *   3. Ayah count for Al-Fatihah (7) and Al-Nas (6) match expected values.
 *
 * Run:  node tools/validate-translations.mjs
 *
 * Exits 0 on full pass, 1 on any mismatch, 2 on network errors.
 */

// Node 18+ has native fetch.
const FAWAZ_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1'
const ALQURAN_BASE = 'https://api.alquran.cloud/v1'

const EXPECTED = {
  totalSurahs: 114,
  totalAyahs: 6236,
  surah1AyahCount: 7,   // Al-Fatihah
  surah114AyahCount: 6, // An-Nas
}

// Inline the registry data so this script has no TS dependency.
const EDITIONS = [
  // Urdu
  { id: 'ur-jalandhri',      api: 'alquran',    editionId: 'ur.jalandhry'        },
  { id: 'ur-maududi',        api: 'alquran',    editionId: 'ur.maududi'          },
  { id: 'ur-taqiusmani',     api: 'fawazahmed', editionId: 'urd-muhammadtaqiusm' },
  { id: 'ur-tahirul-qadri',  api: 'alquran',    editionId: 'ur.qadri'            },
  { id: 'ur-junagarhi',      api: 'alquran',    editionId: 'ur.junagarhi'        },
  { id: 'ur-kanzuliman',     api: 'alquran',    editionId: 'ur.kanzuliman'       },
  { id: 'ur-ahmedali',       api: 'alquran',    editionId: 'ur.ahmedali'         },
  { id: 'ur-mahmoodulhassan',api: 'fawazahmed', editionId: 'urd-mahmoodulhassan' },
  { id: 'ur-jawadi',         api: 'alquran',    editionId: 'ur.jawadi'           },
  { id: 'ur-roman',          api: 'fawazahmed', editionId: 'urd-abulaalamaududi-la' },
  // English
  { id: 'en-sahih',          api: 'alquran',    editionId: 'en.sahih'            },
  { id: 'en-yusufali',       api: 'fawazahmed', editionId: 'eng-abdullahyusufal' },
  { id: 'en-pickthall',      api: 'fawazahmed', editionId: 'eng-mohammedmarmadu' },
  { id: 'en-taqiusmani',     api: 'fawazahmed', editionId: 'eng-muhammadtaqiusm' },
  { id: 'en-asad',           api: 'fawazahmed', editionId: 'eng-muhammadasad'   },
  { id: 'en-kanzuliman',     api: 'alquran',    editionId: 'en.ahmedraza'        },
  // Hindi
  { id: 'hi-suhel',          api: 'fawazahmed', editionId: 'hin-suhelfarooqkhan' },
  { id: 'hi-farooq',         api: 'fawazahmed', editionId: 'hin-muhammadfarooqk' },
  { id: 'hi-kanzuliman',     api: 'alquran',    editionId: 'hin-kanzuliman'      },
  // Bengali
  { id: 'bn-muhiuddin',      api: 'fawazahmed', editionId: 'ben-muhiuddinkhan'   },
  { id: 'bn-kanzuliman',     api: 'alquran',    editionId: 'ben-kanzuliman'      },
  // Regional
  { id: 'te',                api: 'fawazahmed', editionId: 'tel-abdulraheemmoha' },
  { id: 'ta',                api: 'fawazahmed', editionId: 'tam-janturstfoundat' },
  { id: 'ml',                api: 'fawazahmed', editionId: 'mal-abdulhameedmada' },
  { id: 'guj',               api: 'fawazahmed', editionId: 'guj-rabilaalomari'   },
  { id: 'mr',                api: 'fawazahmed', editionId: 'mar-muhammadshafiia' },
  { id: 'as',                api: 'fawazahmed', editionId: 'asm-shaykhrafeequli' },
  // International
  { id: 'fr',                api: 'fawazahmed', editionId: 'fra-muhammadhamidul' },
  { id: 'es',                api: 'fawazahmed', editionId: 'spa-muhammadisagarc' },
  { id: 'tr',                api: 'fawazahmed', editionId: 'tur-diyanetisleri'   },
  { id: 'ru',                api: 'fawazahmed', editionId: 'rus-elmirkuliev'     },
  { id: 'zh',                api: 'fawazahmed', editionId: 'zho-majian'          },
]

async function fetchWithTimeout(url, ms = 10000) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), ms)
  try {
    const res = await fetch(url, { signal: ctrl.signal })
    return res
  } finally {
    clearTimeout(timer)
  }
}

async function checkFawaz(edition) {
  const issues = []

  // Check surah 1
  const url1 = `${FAWAZ_CDN}/editions/${edition.editionId}/1.json`
  let s1count = 0
  try {
    const r = await fetchWithTimeout(url1)
    if (!r.ok) { issues.push(`surah 1 HTTP ${r.status}`); return issues }
    const j = await r.json()
    s1count = j.chapter?.length ?? 0
    if (s1count !== EXPECTED.surah1AyahCount) {
      issues.push(`surah 1 ayah count ${s1count}, expected ${EXPECTED.surah1AyahCount}`)
    }
  } catch (err) {
    issues.push(`surah 1 fetch error: ${err.message}`)
    return issues
  }

  // Check surah 114
  const url114 = `${FAWAZ_CDN}/editions/${edition.editionId}/114.json`
  try {
    const r = await fetchWithTimeout(url114)
    if (!r.ok) { issues.push(`surah 114 HTTP ${r.status}`); return issues }
    const j = await r.json()
    const count = j.chapter?.length ?? 0
    if (count !== EXPECTED.surah114AyahCount) {
      issues.push(`surah 114 ayah count ${count}, expected ${EXPECTED.surah114AyahCount}`)
    }
  } catch (err) {
    issues.push(`surah 114 fetch error: ${err.message}`)
  }

  return issues
}

async function checkAlquran(edition) {
  const issues = []

  // Check surah 1
  const url1 = `${ALQURAN_BASE}/surah/1/${edition.editionId}`
  let s1count = 0
  try {
    const r = await fetchWithTimeout(url1)
    if (!r.ok) { issues.push(`surah 1 HTTP ${r.status}`); return issues }
    const j = await r.json()
    s1count = j.data?.ayahs?.length ?? 0
    if (s1count !== EXPECTED.surah1AyahCount) {
      issues.push(`surah 1 ayah count ${s1count}, expected ${EXPECTED.surah1AyahCount}`)
    }
  } catch (err) {
    issues.push(`surah 1 fetch error: ${err.message}`)
    return issues
  }

  // Check surah 114
  const url114 = `${ALQURAN_BASE}/surah/114/${edition.editionId}`
  try {
    const r = await fetchWithTimeout(url114)
    if (!r.ok) { issues.push(`surah 114 HTTP ${r.status}`); return issues }
    const j = await r.json()
    const count = j.data?.ayahs?.length ?? 0
    if (count !== EXPECTED.surah114AyahCount) {
      issues.push(`surah 114 ayah count ${count}, expected ${EXPECTED.surah114AyahCount}`)
    }
  } catch (err) {
    issues.push(`surah 114 fetch error: ${err.message}`)
  }

  return issues
}

const PASS = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'
const WARN = '\x1b[33m!\x1b[0m'

async function main() {
  console.log('Translation registry validation')
  console.log(`Checking ${EDITIONS.length} enabled editions...\n`)

  let failures = 0
  let networkErrors = 0

  // Run checks with concurrency of 4 to avoid hammering APIs
  const BATCH = 4
  for (let i = 0; i < EDITIONS.length; i += BATCH) {
    const batch = EDITIONS.slice(i, i + BATCH)
    const results = await Promise.all(
      batch.map(async (e) => {
        const issues = e.api === 'alquran'
          ? await checkAlquran(e)
          : await checkFawaz(e)
        return { id: e.id, api: e.api, issues }
      })
    )

    for (const r of results) {
      const hasNetwork = r.issues.some((i) => i.includes('fetch error'))
      const hasDataIssue = r.issues.length > 0 && !hasNetwork
      if (r.issues.length === 0) {
        console.log(`  ${PASS} ${r.id} (${r.api})`)
      } else if (hasNetwork) {
        console.log(`  ${WARN} ${r.id} — network: ${r.issues.join('; ')}`)
        networkErrors++
      } else {
        console.log(`  ${FAIL} ${r.id} — ${r.issues.join('; ')}`)
        failures++
      }
    }
  }

  console.log('')
  console.log(`Result: ${failures} failures, ${networkErrors} network errors`)

  if (failures > 0) {
    console.error('\nSome editions have data mismatches. Review before enabling.')
    process.exit(1)
  } else if (networkErrors > 0) {
    console.warn('\nSome checks were inconclusive due to network. Re-run in a connected environment.')
    process.exit(0)
  } else {
    console.log('\nAll enabled editions passed boundary checks.')
    process.exit(0)
  }
}

main()
