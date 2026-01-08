# Architecture Overview

This repository follows an enterprise-friendly layout:

- src/app/core — app-wide singletons (services, interceptors, guards)
- src/app/shared — presentational and reusable components
- src/app/features — feature modules (lazy-loaded)
- src/environments — environment configurations
- src/styles — global design tokens and styles
- .github/workflows — CI workflows

Notes:
- Features are lazy-loaded via router for performance and team ownership.
- Core services should be provided in the root and only imported via app bootstrap.
- Unit tests should be co-located with the files they test.
