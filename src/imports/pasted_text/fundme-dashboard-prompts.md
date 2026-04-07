# Figma Make Prompt — Fundme Investor Dashboard (Arabic RTL)

Copy and paste the sections below as prompts into Figma Make's chat. Build them one at a time for best results.

---

## PROMPT 1 — Dashboard Shell & Top Nav

```
Create a full investor dashboard overview page for "Fundme" (فند مي) in Arabic, RTL direction. This is a mobile-first app screen at 390×844 frame size.

Top section:
- Status bar at top (time, battery, signal — standard iOS)
- Below that, a greeting bar with:
  - Right side: "مرحباً، أحمد 👋" in Poppins SemiBold 18px color #002E83
  - Left side: notification bell icon (outline, 2px stroke, #002E83) with a small green dot (#80FF00) indicator
- Below greeting: a short subtitle "نظرة عامة على محفظتك" in Poppins Regular 13px color #8896AD

Use white (#FFFFFF) background. All text alignment is RTL (right-aligned).
```

---

## PROMPT 2 — Portfolio Value Card

```
Create a portfolio value hero card below the greeting. Full width with 16px horizontal margins.

Card specs:
- Background: linear gradient from #002E83 (top-right) to #1A4A9E (bottom-left)
- Border radius: 20px
- Padding: 24px
- RTL layout (right-aligned text)

Content inside the card:
- Label: "إجمالي المحفظة" in Poppins Medium 12px color rgba(255,255,255,0.5)
- Main value: "٢٤٥,٨٠٠ ر.س" in Poppins Bold 32px color #FFFFFF
- Below value, a green badge pill: "+١٢.٤٪ هذا الشهر" — background #80FF00, text #002E83, Poppins SemiBold 11px, border-radius 100px, padding 4px 12px
- Below the badge, a row of 3 mini stat boxes (horizontal, equal width, 8px gap):
  - Box 1: "الأرباح" label, "٢٣,٤٠٠ ر.س" value
  - Box 2: "المستثمر" label, "٨ صفقات" value
  - Box 3: "العائد" label, "١٢.٤٪" value
  - Each box: background rgba(255,255,255,0.08), border-radius 12px, padding 12px
  - Label: Poppins Regular 10px rgba(255,255,255,0.4)
  - Value: Poppins SemiBold 14px #FFFFFF

Add a subtle decorative element: the Fundme connectivity shape (two circles connected by a pinched bridge) as a stroke outline in rgba(128,255,0,0.12) positioned at the top-left corner of the card, partially clipped.
```

---

## PROMPT 3 — Quick Actions Row

```
Create a horizontal row of 4 quick action buttons below the portfolio card. 16px top margin, 16px horizontal margins.

Each button:
- Vertical layout (icon on top, label below)
- Width: equal (fill container, 4 columns, 10px gap)
- Background: #EAF0FA
- Border radius: 14px
- Padding: 16px vertical, 8px horizontal
- Icon: 24×24px, 2px stroke, color #002E83
- Label: Poppins Medium 11px, color #002E83, centered

The 4 buttons (RTL order, right to left):
1. Icon: wallet → Label: "إيداع"
2. Icon: transfer arrows → Label: "تحويل"
3. Icon: growth chart → Label: "استثمر"
4. Icon: document → Label: "كشف حساب"
```

---

## PROMPT 4 — Performance Chart Section

```
Create a performance chart section below quick actions. 24px top margin.

Section header (RTL):
- Right side: "أداء المحفظة" in Poppins SemiBold 16px color #002E83
- Left side: a filter pill with "٦ أشهر" text, background #EAF0FA, border-radius 100px, padding 6px 14px, Poppins Medium 11px color #002E83

Chart area:
- Height: 180px
- Background: white
- Show a smooth curved area chart / line chart
- Line color: #0D82F9 (2px stroke)
- Fill below line: linear gradient from rgba(13,130,249,0.15) to transparent
- X-axis labels (RTL): "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو" — Poppins Regular 10px #8896AD
- Y-axis labels (right side since RTL): "٥٠ ألف", "١٠٠ ألف", "١٥٠ ألف", "٢٠٠ ألف", "٢٥٠ ألف" — same styling
- Show a highlighted point on the latest data point: a circle (8px) in #0D82F9 with a white center
- A vertical dashed line from the point down, with a tooltip box above showing "٢٤٥,٨٠٠ ر.س" in Poppins SemiBold 12px
```

---

## PROMPT 5 — Active Investments List

```
Create an active investments section below the chart. 24px top margin.

Section header (RTL):
- Right: "استثماراتك النشطة" in Poppins SemiBold 16px #002E83
- Left: "عرض الكل" link text in Poppins Medium 12px #0D82F9

Show 3 investment cards stacked vertically with 12px gap:

Card specs (each):
- Background: #FFFFFF
- Border: 1px solid #E8ECF2
- Border radius: 16px
- Padding: 16px
- RTL layout

Card 1:
- Left badge: square icon area 44×44px, background #EAF0FA, border-radius 12px, building icon inside (#002E83, 2px stroke)
- Right of icon:
  - Title: "صندوق العقارات التجارية" Poppins SemiBold 14px #002E83
  - Subtitle: "عقارات · ٦ أشهر متبقية" Poppins Regular 11px #8896AD
- Far left:
  - "+٨.٢٪" in Poppins SemiBold 14px #80FF00 (actually use dark green #2D8A00 for readability on white)
  - "٥٠,٠٠٠ ر.س" Poppins Regular 11px #8896AD

Card 2:
- Icon: SME/briefcase icon
- Title: "تمويل شركة تقنية ناشئة"
- Subtitle: "شركات ناشئة · ١٢ شهر متبقية"
- Return: "+١٤.٥٪"
- Amount: "٧٥,٠٠٠ ر.س"

Card 3:
- Icon: fund data / database icon
- Title: "صندوق النمو المتوازن"
- Subtitle: "صناديق · ٣ أشهر متبقية"
- Return: "+٦.٨٪"
- Amount: "١٢٠,٨٠٠ ر.س"
```

---

## PROMPT 6 — Recent Transactions

```
Create a recent transactions section below investments. 24px top margin.

Section header (RTL):
- Right: "آخر المعاملات" Poppins SemiBold 16px #002E83
- Left: "عرض الكل" Poppins Medium 12px #0D82F9

Show 3 transaction rows with 1px #E8ECF2 dividers between them:

Each row:
- RTL layout
- Right: circle icon (40×40px)
- Next to icon: transaction name + date below
- Far left: amount + type label

Row 1:
- Green circle bg rgba(128,255,0,0.12), arrow-down icon #80FF00
- Name: "إيداع" Poppins Medium 13px #002E83
- Date: "٢ أبريل ٢٠٢٦" Poppins Regular 11px #8896AD
- Amount: "+١٠,٠٠٠ ر.س" Poppins SemiBold 14px #002E83

Row 2:
- Blue circle bg rgba(13,130,249,0.1), transfer icon #0D82F9
- Name: "استثمار — صندوق العقارات" Poppins Medium 13px #002E83
- Date: "٢٨ مارس ٢٠٢٦"
- Amount: "−٥٠,٠٠٠ ر.س" Poppins SemiBold 14px #DC3232

Row 3:
- Green circle bg, arrow-down icon
- Name: "أرباح ربع سنوية" Poppins Medium 13px #002E83
- Date: "٢٥ مارس ٢٠٢٦"
- Amount: "+٣,٢٠٠ ر.س" Poppins SemiBold 14px #002E83
```

---

## PROMPT 7 — Bottom Navigation Bar

```
Create a bottom navigation tab bar fixed at the bottom of the screen.

Bar specs:
- Background: #FFFFFF
- Top border: 1px solid #E8ECF2
- Height: 72px (including safe area)
- Padding bottom: 20px (for home indicator)
- 5 tabs, equal width

Tabs (RTL order, right to left):
1. Home icon (filled/active) + "الرئيسية" — color #002E83 (active state)
2. Growth chart icon + "الاستثمارات" — color #8896AD
3. Wallet icon + "المحفظة" — color #8896AD
4. Document icon + "التقارير" — color #8896AD
5. Profile icon + "حسابي" — color #8896AD

Active tab: icon filled with #002E83, label Poppins Medium 10px #002E83
Inactive tabs: icon outline 2px stroke #8896AD, label Poppins Regular 10px #8896AD

Add a small active indicator: a 4px wide, 3px tall rounded rect in #80FF00 centered above the active icon.
```

---

## PROMPT 8 — Featured Opportunity Banner (Optional)

```
Create a promotional banner card between the chart and investments sections. Full width with 16px margins.

Card specs:
- Background: #EAF0FA
- Border radius: 16px
- Padding: 20px
- RTL layout
- Flex row: text content on right, illustration area on left

Right content:
- Tag: "فرصة جديدة 🔥" in a small pill — background #80FF00, text #002E83, Poppins SemiBold 10px, border-radius 100px
- Title: "صندوق التقنية السعودي" Poppins Bold 16px #002E83
- Subtitle: "عائد متوقع ١٥٪ · الحد الأدنى ١٠,٠٠٠ ر.س" Poppins Regular 12px #5588CC
- CTA button: "استثمر الآن" — background #002E83, text #FFFFFF, Poppins SemiBold 12px, border-radius 10px, padding 10px 20px

Left area (40% width):
- A placeholder for the spot illustration (investment opportunity), centered, 80×80px
```

---

# Assembly Notes

After creating all sections, ensure:
1. All text is right-aligned (RTL)
2. The scroll frame is 390px wide, auto-height
3. Consistent 16px horizontal page margins
4. Section spacing is 24px between major sections
5. Colors match the Guidelines.md tokens exactly
6. Font is always Poppins (Arabic glyphs will render correctly in Poppins, or swap to Somar if the kit supports it)