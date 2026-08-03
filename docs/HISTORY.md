# Project History (V1, 2024)

FloraFlow started as a work experience project at UTC Sheffield Olympic Legacy Park. The goal was a dashboard to monitor mini-greenhouses — built by a teacher and placed around the school and at his home — equipped with sensors reporting real-time environmental data. It was featured in a project showcase for visitors.

This document preserves that original build for reference. The project has since been rebuilt (see the main [README](../README.md)); none of the stack or setup below reflects the current codebase.

## Original Stack

**Frontend:** React, Axios, ChartJS, MUI Gauges

**Backend:** Node.js, Express

**Database:** MySQL (the alpha version used raw SQL via phpMyAdmin)

## Original Setup

```
npm i express mysql2 dotenv cors          # backend
npx create-react-app@latest ./            # frontend
npm i -D tailwindcss && npx tailwindcss init
npm i axios chart.js mui react-router-dom react-icons classnames
```

## Deployment Notes

The original plan was to self-host on a Raspberry Pi 3 to avoid depending on external cloud providers. Limited processing power and the school network's firewall made that impractical, so the setup ran from a laptop instead. AWS RDS, Netlify, and Railway were being evaluated for an eventual cloud migration — which the V2 rebuild carried out (see [README](../README.md)).

## Status at time of writing (2024-07-20)

The main dashboard was ~85% complete; other pages were still in progress. Environmental control features (not just monitoring) were planned but not implemented.
