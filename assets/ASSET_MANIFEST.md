# LA MedSpa — Photography Asset Manifest

Professionally shot library from the client (Natalie at LA MedSpa). 20 curated images, 140MB total. All imagery is warm-toned, editorial, and shot in-facility with real team members — no stock photography.

## How to use this package

Pair this manifest with the design system's handoff README. Every image is pre-categorized by the role it should play in the design system. When you build component examples, use the images flagged for that component type — don't pull arbitrary images from the pool.

## Visual signature across the set

Consistent wardrobe: clinicians in solid black (long-sleeve tops, black trousers, black nitrile gloves). Two shooting environments — a bright white/cream room with herringbone wallpaper and a moodier dark-paneled room. Natural window light, minimal retouching, warm color grade. This wardrobe + palette consistency is the package's biggest strength — anything designed against it will feel like it came from the same world.

## The team members photographed

Three clinicians appear across the set, distinguishable by hair:

- **Clinician A** — brunette, long wavy hair (most frequent subject)
- **Clinician B** — balayage/ombre, long wavy hair
- **Clinician C** — blonde, shoulder-length (appears in the injection shots — likely Sara Rochetta NP)

Don't attribute names in captions without checking with the client first.

---

## Hero candidates (full-width, emotional)

Use these for the homepage hero, section openers, and any full-bleed moment. All have strong negative space for overlay text.

| File | What it is | Why it works for hero |
|---|---|---|
| `28.jpg` | Clinician treating client on bed with hydrafacial equipment | Cinematic, clear "treatment in action" narrative, warm lighting |
| `30.jpg` | Clinician standing over client, black gloves, treatment bed | Premium, confident, hands-on craft |
| `121.jpg` | **Standout.** Blonde clinician performing injectable, face-line-drawing art in background | The single best image in the library. Editorial, unmistakably medical-aesthetics, not clinical. Use this as a hero or the injectables category hero. |
| `157.jpg` | Clinician wand treatment, client relaxed, equipment visible | Full scene — excellent for a two-column "the treatment" layout |
| `245.jpg` | Clinician portrait, smiling, holding laser, huge negative space | Best for hero with overlay headline — warm, human, inviting |
| `250.jpg` | Environmental clinician portrait with laser equipment | Secondary hero, good for About section |

---

## Treatment close-ups (service cards, category thumbnails)

Use these for the 6 service-category cards (Face, Body, Hair, Medical, Wellness, Skin Care) and for individual treatment feature sections.

| File | Category | Notes |
|---|---|---|
| `19.jpg` | Equipment/Tech | Clinician portrait holding tool, good product-focus shot |
| `40.jpg` | Face | Clinician performing laser/treatment on face, client in safety goggles |
| `49.jpg` | Face / Laser | Same treatment context, different angle |
| `62.jpg` | Laser / Medical | Clinician + equipment environmental portrait |
| `70.jpg` | Face | Close-up of clinician working on client's face |
| `72.jpg` | Skin Care | Same treatment session, wider frame |

---

## Editorial / moody portraits (testimonial backgrounds, section transitions)

These are shot in the dark-paneled room with natural window light. Use for atmospheric breaks between content-dense sections, testimonial backgrounds, or dark-mode cards.

| File | Notes |
|---|---|
| `80.jpg` | Clean clinician portrait against dark panel — great for provider card |
| `82.jpg` | Two clinicians together doing treatment — good for team/about section |
| `90.jpg` | Window light, profile — moody editorial moment |
| `92.jpg` | Darker portrait — testimonial section background |

---

## Consultation & facility (About, Contact, "Your First Visit")

| File | Notes |
|---|---|
| `328.jpg` | Clean reception/mirror shot — good for Contact page hero or footer background |
| `330.jpg` | Two women at consultation table with iPad — literal consultation scene |
| `332.jpg` | **Standout.** Consultation at glass table, olive tree, warm natural light. Best "Your First Visit" / About image in the package. |

---

## Equipment (editorial detail shots, "Technology" section)

| File | Notes |
|---|---|
| `-2.jpg` | Fotona laser in clean empty treatment room. Use as a quiet editorial break between people-focused sections, or as the "Technology / Equipment" spotlight. Note the leading dash in filename — reference it with quotes or rename to `equipment-fotona.jpg` in the Astro public folder if it causes import issues. |

---

## Recommended component mapping

Which image goes in which primitive:

- **Hero primitive (desktop full-bleed):** `245.jpg` or `121.jpg`
- **Hero primitive (alt — moodier):** `90.jpg`
- **Treatment card pattern (the example):** `70.jpg` or `157.jpg`
- **Provider card pattern (the example):** `80.jpg`
- **Testimonial card background (dark):** `92.jpg`
- **Before/after slider primitive:** needs B&A imagery — not included in this set. **Ask the client for their B&A library separately.**
- **Concern-based finder form:** use `40.jpg` as the Face concern image, `157.jpg` for Skin Care, `-2.jpg` for Laser/Medical
- **About / consultation section:** `332.jpg`
- **Technology spotlight:** `-2.jpg`

---

## Gaps — what's NOT in this package

Flag these to the client when handing off the mockup:

1. **No logo files.** Design system references the LA MedSpa logo (horizontal, monogram, reversed variants). None are in this zip. Use a text wordmark ("LA MEDSPA" in Figtree 500 capitalized) as placeholder.
2. **No before/after imagery.** Critical for the B&A component pattern and for conversion. Confirm the client has a consented B&A library. Demo uses a styled placeholder slider with "Real client results. Coming soon."
3. **No body-treatment imagery.** The set skews heavily toward face/laser. The Body category will need supplementary imagery or creative cropping.
4. **No hair-treatment imagery.** The Hair service category has no representative photo in this set.
5. **No wellness/hormone-therapy imagery.** The Wellness category (Hormone Therapy, etc.) has no representative photo.
6. **No video.** The original brief referenced hero video — none was included in this asset drop. The homepage falls back to a still hero (245.jpg or 121.jpg work) or a Ken Burns animation on a still until video assets arrive.

## Image orientation reference

All images are shot vertically (portrait orientation, ~3024×4032). For landscape hero use, they'll need to be cropped aggressively — keep that in mind when selecting which to use full-bleed vs. in a side-by-side column layout.
