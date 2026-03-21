# Upload UI Removal Plan

## Overview

The base project (Family Plot) includes GEDCOM upload functionality that is no longer needed for this family project. Since we're bundling a single GEDCOM file at build time (Story 1.4), users cannot upload files at runtime.

This document tracks what needs to be removed in a future story.

---

## Components to Remove

### 1. Load.js Component

**File:** `src/Load.js` (or `src/Load.jsx`)

**Purpose:** Landing page with file upload functionality

**What to Remove:**
- Entire file can be deleted
- OR refactored to simply redirect to Graph view with bundled GEDCOM

**References to Update:**
- `src/index.jsx` - Remove import and conditional render of Load component
- Remove logic that switches between Load and Graph views

---

### 2. SampleButton.js Component

**File:** `src/SampleButton.jsx`

**Purpose:** Button component for loading sample GEDCOM files

**What to Remove:**
- Entire file - no longer needed since we bundle one GEDCOM

**References to Update:**
- Check `src/Load.js` (if kept) for imports

---

### 3. GEDCOM Upload UI in Load.js

**Location:** Within `src/Load.js`

**Elements to Remove:**
- File input (`<input type="file" />`)
- Upload button
- Drag-and-drop zone (if exists)
- File validation error messages
- "Or load a sample" section with SampleButton

---

## Code to Remove

### File Reader Logic

Search for and remove:
```javascript
// Look for these patterns:
FileReader
reader.readAsText()
reader.onload()
handleFileUpload()
```

### Upload State Management

Remove state variables related to file uploads:
```javascript
// Examples (check actual variable names):
const [uploadedGedcom, setUploadedGedcom] = useState(null);
const [error, setError] = useState(null);
const [fileName, setFileName] = useState(null);
```

---

## Files to Keep

### DO NOT Remove These:

1. **GEDCOM Parser Utilities**
   - `src/gedcom/parse.js` - Still used to parse bundled GEDCOM
   - `src/gedcom/d3ize.js` - Still used to transform data for graph
   - `src/gedcomExport.jsx` - Keep if used elsewhere

2. **Sample GEDCOM Files** (Optional)
   - `src/gedcoms/` directory contains sample files
   - Can be kept for development/testing
   - Or removed to reduce repo size if not needed

3. **Core Graph Rendering**
   - `src/Graph.jsx` - Main visualization, unchanged
   - `src/Controls.jsx` - UI controls, unchanged

---

## Files to Modify

### src/index.jsx (or src/App.jsx)

**Current Behavior:**
- Shows Load component on initial load
- Waits for user to upload/select GEDCOM
- Then shows Graph+Controls view

**New Behavior:**
- Auto-load bundled GEDCOM from `/gedcom/family.ged`
- Skip Load screen entirely
- Go straight to Graph+Controls view

**Changes Needed:**
```javascript
// Remove:
import Load from './Load';

// Remove conditional render:
// {!gedcomData ? <Load /> : <Graph />}

// Replace with:
// Auto-fetch bundled GEDCOM on mount
useEffect(() => {
  fetch('/gedcom/family.ged')
    .then(res => res.text())
    .then(gedcomText => {
      const parsed = parse(gedcomText);
      const d3Data = d3ize(parsed);
      setGedcomData(d3Data);
    });
}, []);
```

---

## Implementation Checklist

When ready to remove upload UI:

- [ ] Read this entire document
- [ ] Create backup branch before making changes
- [ ] Remove `src/Load.js` (or refactor)
- [ ] Remove `src/SampleButton.jsx`
- [ ] Update `src/index.jsx` to auto-load bundled GEDCOM
- [ ] Remove file upload state and handlers
- [ ] Remove any unused imports
- [ ] Run `npm run dev` to verify app loads with bundled GEDCOM
- [ ] Run `npm run build` to verify build succeeds
- [ ] Test that 3D graph renders correctly
- [ ] Update this document if additional cleanup needed

---

## Future Story Notes

**Story Assignment:** This work should be done in a dedicated story after Story 1.4 (GEDCOM Bundling) is complete.

**Why Not Now:** Story 1.4 focuses on establishing the data architecture (bundled GEDCOM). Upload UI removal is a separate concern that can be handled in isolation.

**Dependencies:**
- Story 1.4 must be complete first (bundled GEDCOM working)
- GEDCOM loading from bundle must be verified
- Future story should test that app loads correctly without upload UI

---

## Related Files Reference

| File | Status | Notes |
|------|--------|-------|
| `src/Load.js` | Remove | Upload UI component |
| `src/SampleButton.jsx` | Remove | Sample data loader |
| `src/gedcoms/*.ged` | Optional | Sample GEDCOM files - can keep for testing |
| `src/gedcom/parse.js` | Keep | Parser still used |
| `src/gedcom/d3ize.js` | Keep | Data transformer still used |
| `src/index.jsx` | Modify | Remove Load import, add auto-fetch |
| `src/Graph.jsx` | Keep | Core visualization |
| `src/Controls.jsx` | Keep | UI controls |

---

**Document Created:** 2026-03-21 (Story 1.4)
**Last Updated:** 2026-03-21
