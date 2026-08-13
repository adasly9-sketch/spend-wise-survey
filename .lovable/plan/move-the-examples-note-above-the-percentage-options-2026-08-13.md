# Move the examples note above the percentage options

Right now the "These purchases include, for example:" block sits *below* the percentage buttons in Question 2, and shows each example as a rounded pill/bubble. That reads as a separate section and the bubbles wrap awkwardly.

## What changes

- Move the examples block so it appears **directly under the Question 2 text and above the percentage choices** — people read the definition before answering.
- Drop the bubble/pill styling. Instead use a quieter, text-first note:
  - A thin vertical accent line on the left instead of a filled grey box.
  - A small label "Includes, for example" followed by the examples as one flowing, comma-separated sentence: hair trimming & hair care, makeup, skincare, anti-aging products, fitness & body-composition products, cosmetics, clothing, accessories.
  - The "Think about recurring and occasional spending together..." line stays, as a small italic note under it.
- No wording changes to the questions themselves, no change to answers, validation, or the Next button.

## Technical notes

Edit only `src/routes/index.tsx`: relocate the examples `<div>` from after the `Field` for Q2 into the top of that `Field`'s children, before the options grid. Replace the `<ul>` of pill `<li>`s with a single `<p>` joining `EXAMPLE_ITEMS` with commas, wrapped in a container using a `border-l` accent and semantic tokens (`border-primary/40`, `text-muted-foreground`) — no hardcoded colors.
